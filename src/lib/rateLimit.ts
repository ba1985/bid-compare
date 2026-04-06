interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  ip: string,
  route: 'extract' | 'waitlist'
): { allowed: boolean; retryAfter?: number } {
  const limits = { extract: 5, waitlist: 10 }
  const max = limits[route]
  const windowMs = 60 * 60 * 1000 // 1 hour
  const key = `${route}:${ip}`
  const now = Date.now()

  const entry = store.get(key)

  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.count++
  return { allowed: true }
}

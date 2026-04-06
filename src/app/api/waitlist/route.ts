import { NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { checkRateLimit } from "@/lib/rateLimit";

const WAITLIST_PATH = join(process.cwd(), "data", "waitlist.json");
const MAX_EMAIL_LENGTH = 254;

function readWaitlist(): string[] {
  try {
    const raw = readFileSync(WAITLIST_PATH, "utf-8");
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function writeWaitlist(emails: string[]): void {
  writeFileSync(WAITLIST_PATH, JSON.stringify(emails, null, 2), "utf-8");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeEmail(raw: string): string {
  // Strip HTML tags and control characters, then trim and lowercase
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .trim()
    .toLowerCase();
}

export async function GET() {
  const emails = readWaitlist();
  return Response.json({ count: emails.length });
}

export async function POST(request: NextRequest) {
  // Rate limiting by IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, retryAfter } = checkRateLimit(ip, "waitlist");
  if (!allowed) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const raw = body.email ?? "";

  if (!raw) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  if (raw.length > MAX_EMAIL_LENGTH) {
    return Response.json({ error: "Email address is too long" }, { status: 400 });
  }

  const email = sanitizeEmail(raw);

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const emails = readWaitlist();

  if (emails.includes(email)) {
    return Response.json({ success: true, message: "already_registered" });
  }

  emails.push(email);
  writeWaitlist(emails);

  return Response.json({ success: true, message: "added", count: emails.length });
}

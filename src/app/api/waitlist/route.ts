import { NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const WAITLIST_PATH = join(process.cwd(), "data", "waitlist.json");

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

export async function GET() {
  const emails = readWaitlist();
  return Response.json({ count: emails.length });
}

export async function POST(request: NextRequest) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();

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

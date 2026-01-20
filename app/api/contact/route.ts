import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestCounts = new Map<string, { count: number; start: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const existing = requestCounts.get(ip);
  if (!existing || now - existing.start > RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(ip, { count: 1, start: now });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX) {
    return false;
  }
  existing.count += 1;
  return true;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const honeypot = formData.get("company");
  if (honeypot) {
    return NextResponse.json({ status: "ok" });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  console.log("Contact form submission", payload);

  return NextResponse.redirect(new URL("/contact?submitted=true", request.url));
}

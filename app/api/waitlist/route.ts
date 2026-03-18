import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function validateFields(body: { firstName?: string; email?: string; shoeSize?: string }) {
  const errors: Record<string, string> = {};

  const firstName = body.firstName?.trim();
  if (!firstName) errors.firstName = "First name is required.";

  const email = body.email?.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  const shoeSize = body.shoeSize?.trim();
  if (!shoeSize) errors.shoeSize = "Please select your shoe size.";

  return {
    errors,
    valid: Object.keys(errors).length === 0,
    data: { firstName: firstName || "", email: email || "", shoeSize: shoeSize || "" },
  };
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(req);
    const lastRequest = rateLimitMap.get(ip);
    if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: "Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { errors, valid, data } = validateFields(body);

    if (!valid) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Update rate limit timestamp
    rateLimitMap.set(ip, Date.now());

    // Forward to Google Apps Script
    // Apps Script processes the POST then returns a 302 redirect to the response.
    // Use redirect: "manual" — a 302 means the script executed successfully.
    const payload = JSON.stringify(data);
    const res = await fetch(GOOGLE_SCRIPT_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      redirect: "manual",
    });

    if (res.status !== 302 && !res.ok) {
      throw new Error(`Google Script responded with ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Waitlist API error:", message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", debug: message },
      { status: 500 }
    );
  }
}

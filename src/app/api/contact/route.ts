import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { assertDb, hasDatabase } from "@/db";
import { contactMessages } from "@/db/schema";
import { profile } from "@/lib/cv-data";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: silently accept bot submissions without storing them.
  if (clean(body.website, 50)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 4000);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Message should be at least 10 characters." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  if (!resendApiKey || !from) {
    return NextResponse.json(
      {
        ok: false,
        error: "Email delivery is not configured yet. Please email directly.",
      },
      { status: 503 },
    );
  }

  const emailSubject = (subject || `Portfolio enquiry from ${name}`)
    .replace(/[\r\n]+/g, " ")
    .slice(0, 200);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: emailSubject,
        text: `${message}\n\nFrom: ${name}\nReply to: ${email}`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Email provider rejected a contact message", {
        status: response.status,
        details,
      });
      return NextResponse.json(
        {
          ok: false,
          error: "The message could not be sent. Please email directly.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Failed to send contact message", error);
    return NextResponse.json(
      {
        ok: false,
        error: "The message could not be sent. Please email directly.",
      },
      { status: 502 },
    );
  }

  if (!hasDatabase) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const db = assertDb();
    await db.insert(contactMessages).values({
      name,
      email,
      subject: emailSubject,
      message,
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch (error) {
    console.error("Email was delivered, but the contact message was not saved", error);
    return NextResponse.json({
      ok: true,
      stored: false,
      warning: "Email delivered, but message archiving is temporarily unavailable.",
    });
  }
}

/** Lists messages (protected by ADMIN_KEY when configured). */
export async function GET(request: Request) {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return NextResponse.json(
      { ok: false, error: "Admin access is not configured." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const provided =
    url.searchParams.get("key") ?? request.headers.get("x-admin-key") ?? "";
  if (provided !== adminKey) {
    return NextResponse.json(
      { ok: false, error: "Unauthorised." },
      { status: 401 },
    );
  }

  try {
    const db = assertDb();
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(200);

    return NextResponse.json({ ok: true, messages });
  } catch (error) {
    console.error("Failed to read contact messages", error);
    return NextResponse.json(
      { ok: false, error: "Database not configured." },
      { status: 500 },
    );
  }
}

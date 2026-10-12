import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { Inbox, Mail } from "lucide-react";
import { assertDb } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inbox — Contact messages",
  robots: { index: false, follow: false },
};

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <div className="glass max-w-md rounded-3xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white">
            Admin access unavailable
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Configure <code className="text-cyan-200">ADMIN_KEY</code> before
            opening the contact inbox.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm text-cyan-300">
            ← Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  if (key !== adminKey) {
    return (
      <main className="grid min-h-screen place-items-center px-6">
        <div className="glass max-w-md rounded-3xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white">
            Unauthorised
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Append <code className="text-cyan-200">?key=YOUR_ADMIN_KEY</code>{" "}
            to the URL to view the inbox.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm text-cyan-300">
            ← Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  let messages: Array<{
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    createdAt: Date;
  }> = [];

  try {
    const db = assertDb();
    messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(200);
  } catch {
    return (
      <main className="grid min-h-screen place-items-center px-6 py-12">
        <div className="glass max-w-lg rounded-3xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-white">
            Database unavailable
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Add <code className="text-cyan-200">DATABASE_URL</code> to your
            environment to enable contact message storage.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm text-cyan-300">
            ← Back to portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12 md:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Admin
            </p>
            <h1 className="font-display mt-2 flex items-center gap-3 text-3xl font-bold text-white">
              <Inbox className="h-7 w-7 text-cyan-300" /> Contact inbox
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {messages.length} message{messages.length === 1 ? "" : "s"} stored
              in PostgreSQL.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40"
          >
            ← Back to portfolio
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="glass mt-10 rounded-3xl p-12 text-center text-slate-400">
            No messages yet. Submissions from the contact form will appear
            here.
          </div>
        ) : (
          <ul className="mt-10 space-y-4">
            {messages.map((m) => (
              <li key={m.id} className="glass rounded-3xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">
                      {m.subject || "(no subject)"}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                      <span>{m.name}</span>
                      <span className="text-slate-600">·</span>
                      <a
                        href={`mailto:${m.email}`}
                        className="inline-flex items-center gap-1 text-cyan-200"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {m.email}
                      </a>
                    </p>
                  </div>
                  <time
                    dateTime={m.createdAt.toISOString()}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
                  >
                    {m.createdAt.toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                  {m.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

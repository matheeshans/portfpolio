"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { profile } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { LinkedInIcon } from "./linkedin-icon";

type Status = "idle" | "sending" | "sent" | "sent-unarchived" | "error";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300/70 focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-400/25";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result: {
        ok?: boolean;
        stored?: boolean;
        error?: string;
      } = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The message could not be sent. Please email directly.");
      }

      setStatus(result.stored === false ? "sent-unarchived" : "sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please email directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/it-support.svg"
        objectPosition="center"
        strength={0.15}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something fast, secure and user-focused."
          description={`Available for an ${profile.availability.toLowerCase()} — ${profile.workAuthorization.toLowerCase()}. Send a message directly using the form below.`}
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Info */}
          <Reveal>
            <div
              className="glass glow-border relative overflow-hidden rounded-[2rem] p-7 md:p-8"
              style={{ backgroundColor: "rgba(5, 7, 13, 0.92)" }}
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl"
              />
              <div className="relative">
                <p className="font-display text-2xl font-bold text-white">
                  {profile.name}
                </p>
                <p className="mt-1 text-sm text-cyan-200">{profile.title}</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${profile.email}`}
                      className="group flex items-center gap-4 text-slate-200"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-cyan-400/20">
                        <Mail className="h-4 w-4 text-cyan-300" />
                      </span>
                      {profile.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={profile.phoneHref}
                      className="group flex items-center gap-4 text-slate-200"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-cyan-400/20">
                        <Phone className="h-4 w-4 text-cyan-300" />
                      </span>
                      {profile.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-4 text-slate-200">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                      <MapPin className="h-4 w-4 text-cyan-300" />
                    </span>
                    {profile.location}
                  </li>
                  <li>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 text-slate-200"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-cyan-400/20">
                        <LinkedInIcon className="h-4 w-4 text-cyan-300" />
                      </span>
                      {profile.linkedinLabel}
                      <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                    </a>
                  </li>


                </ul>

                <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  </span>
                  Open to {profile.title} roles · {profile.availability}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              onChange={() => {
                setStatus("idle");
                setErrorMessage("");
              }}
              className="glass relative rounded-[2rem] p-7 md:p-8"
              style={{ backgroundColor: "rgba(5, 7, 13, 0.92)" }}
            >
              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                Your message will be sent directly to my email. Your email
                address is used only so I can reply.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                  Subject
                </span>
                <input
                  name="subject"
                  maxLength={200}
                  placeholder="Web Developer opportunity"
                  className={inputClass}
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={1500}
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  className={`${inputClass} resize-y`}
                />
              </label>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Your message is sent securely.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>

              <AnimatePresence>
                {(status === "sent" ||
                  status === "sent-unarchived" ||
                  status === "error") && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className={`mt-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                      status === "error"
                        ? "border-rose-300/20 bg-rose-400/10 text-rose-100"
                        : "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    {status === "sent" &&
                      "Your message has been sent. Thank you — I’ll get back to you soon."}
                    {status === "sent-unarchived" &&
                      "Your message was sent, but could not be archived. Thank you — I’ll get back to you soon."}
                    {status === "error" && errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

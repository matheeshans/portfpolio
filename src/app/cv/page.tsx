import type { Metadata } from "next";
import Link from "next/link";
import {
  certificationGroups,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/lib/cv-data";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: `CV — ${profile.name}`,
  description: `Curriculum vitae of ${profile.name}, ${profile.title}.`,
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-8 border-b-2 border-slate-900 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
      {children}
    </h2>
  );
}

export default function CvPage() {
  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 print:bg-white">
      <div className="no-print mx-auto flex w-full max-w-[210mm] items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
          ← Back to portfolio
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto w-full max-w-[210mm] bg-white px-8 py-10 shadow-2xl print:max-w-none print:px-0 print:py-0 print:shadow-none md:px-12">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {profile.name}
          </h1>
          <p className="mt-1 text-base font-medium text-slate-700">
            {profile.title}
          </p>
          <p className="mt-2 text-xs text-slate-600">
            {profile.location} | {profile.phone} | {profile.email}
          </p>
          <p className="mt-1 text-xs text-sky-700">
            <a href={profile.linkedin} className="underline">
              {profile.linkedinLabel}
            </a>
          </p>
        </header>

        <SectionTitle>Professional Summary</SectionTitle>
        <p className="mt-3 text-[13px] leading-relaxed text-slate-800">
          {profile.summary}
        </p>

        <SectionTitle>Core Skills</SectionTitle>
        <dl className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-slate-800">
          {skillGroups.map((g) => (
            <div key={g.id}>
              <dt className="inline font-semibold">{g.title}: </dt>
              <dd className="inline">{g.skills.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <SectionTitle>Projects</SectionTitle>
        <div className="mt-3 space-y-4">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-bold text-slate-900">
                  {project.name}
                </h3>
                <span className="text-xs italic text-slate-600">
                  {project.category}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-800">
                {project.summary}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-700">
                <span className="font-semibold">Focus areas: </span>
                {project.focus.join(", ")}.
              </p>
            </div>
          ))}
        </div>

        <SectionTitle>Professional Experience</SectionTitle>
        <div className="mt-3 space-y-4">
          {experience.map((job) => (
            <div key={job.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[13px] font-bold text-slate-900">
                  {job.role} | {job.company}
                </h3>
                <span className="text-xs italic text-slate-600">{job.period}</span>
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-slate-800">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-700">
                <span className="font-semibold">Skills: </span>
                {job.skills.join(", ")}.
              </p>
            </div>
          ))}
        </div>

        <SectionTitle>Education</SectionTitle>
        <div className="mt-3 space-y-3">
          {education.map((e) => (
            <div key={e.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-900">{e.degree}</h3>
                  <p className="text-[13px] text-slate-700">{e.institution}</p>
                </div>
                <span className="text-xs italic text-slate-600">{e.period}</span>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-700">
                <span className="font-semibold">Skills covered: </span>
                {e.skills.join(", ")}.
              </p>
            </div>
          ))}
        </div>

        <SectionTitle>Certificates & Courses</SectionTitle>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-slate-800">
          {certificationGroups.map((g) => (
            <li key={g.id}>
              <span className="font-semibold">{g.provider}</span> —{" "}
              {g.items.join(", ")}
            </li>
          ))}
        </ul>

        <SectionTitle>Additional Information</SectionTitle>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-slate-800">
          <li>
            <span className="font-semibold">Work Authorisation:</span>{" "}
            {profile.workAuthorization}.
          </li>
          <li>
            <span className="font-semibold">Availability:</span>{" "}
            {profile.availability}.
          </li>
          <li>
            <span className="font-semibold">Preferred roles:</span>{" "}
            {profile.preferredRoles.join(", ") }.
          </li>
          <li>
            <span className="font-semibold">Languages:</span>{" "}
            {profile.languages.map((l) => `${l.name} (${l.level})`).join(", ")}.
          </li>

        </ul>
      </article>

      <div className="h-10 print:hidden" />
    </div>
  );
}

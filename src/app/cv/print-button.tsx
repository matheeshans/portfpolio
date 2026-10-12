"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-slate-700"
    >
      <Printer className="h-4 w-4" /> Print / Save as PDF
    </button>
  );
}

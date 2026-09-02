"use client";

import { useState } from "react";
import type { JournalEntry } from "@/lib/journalData";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function JournalView({ entries }: { entries: JournalEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0].id);
  const active = entries.find((entry) => entry.id === activeId) ?? entries[0];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:gap-14">
      <nav
        aria-label="Journal entries"
        className="flex gap-1 overflow-x-auto pb-2 md:sticky md:top-24 md:h-fit md:flex-col md:overflow-visible md:border-l md:border-line/50 md:pb-0"
      >
        {entries.map((entry) => {
          const isActive = entry.id === active.id;
          return (
            <button
              key={entry.id}
              onClick={() => setActiveId(entry.id)}
              aria-current={isActive}
              className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-left font-display text-sm transition-colors md:whitespace-normal md:border-b-0 md:border-l-2 md:-ml-[2px] md:px-4 ${
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-paper"
              }`}
            >
              <span className="text-accentDim">{pad(entry.id)}</span>{" "}
              <span>{entry.title}</span>
            </button>
          );
        })}
      </nav>

      <article className="border border-line/50 bg-paper px-7 py-10 text-paperInk shadow-[0_0_60px_-15px_rgba(111,214,255,0.15)] md:px-12 md:py-14">
        <p className="font-display text-sm text-accentDim">{pad(active.id)} / {pad(entries.length)}</p>
        <h2 className="mt-2 font-display text-3xl font-medium md:text-4xl">{active.title}</h2>
        <div className="mx-auto mt-8 max-w-[62ch] space-y-5 text-[1.05rem] leading-[1.85]">
          {active.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

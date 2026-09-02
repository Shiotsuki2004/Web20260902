import type { Metadata } from "next";
import JournalView from "@/components/JournalView";
import { journalEntries } from "@/lib/journalData";

export const metadata: Metadata = {
  title: "Journal — Shiotsuki",
};

export default function Journal() {
  return (
    <section className="bg-blueprint">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-display text-sm text-accentDim">Journal</p>
        <h1 className="mt-2 font-display text-4xl font-medium text-paper md:text-5xl">
          17 short entries about who I am
        </h1>
        <p className="mt-4 max-w-[60ch] text-muted">
          Notes on my personality, my hobbies, and how I ended up studying computers, drawing
          characters, and reading late into the night.
        </p>

        <div className="mt-14">
          <JournalView entries={journalEntries} />
        </div>
      </div>
    </section>
  );
}

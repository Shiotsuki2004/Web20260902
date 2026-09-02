import type { Metadata } from "next";
import { getDiaryList } from "@/lib/microcms";
import DiaryList from "@/components/DiaryList";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Diary — Arisa",
};

export default async function Diary() {
  const { contents: entries } = process.env.MICROCMS_SERVICE_DOMAIN
    ? await getDiaryList()
    : { contents: [] };

  return (
    <section className="bg-blueprint">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p className="font-display text-sm text-accentDim">Diary</p>
        <h1 className="mt-2 font-display text-4xl font-medium text-paper md:text-5xl">
          Notes & updates
        </h1>
        <p className="mt-4 max-w-[56ch] text-muted">
          A loose log of what I&apos;m reading, drawing, studying, and thinking about.
        </p>

        <div className="mt-12">
          <DiaryList entries={entries} />
        </div>
      </div>
    </section>
  );
}

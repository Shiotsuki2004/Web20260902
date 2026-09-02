"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { DiaryEntry, DiaryTag } from "@/lib/microcms";
import { TAG_LABELS, formatDate } from "@/lib/microcms";

const TAGS: DiaryTag[] = ["drawing", "reading", "daily", "tech"];

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&[^;]+;/g, " ").trim();
}

function tagStyle(tag: DiaryTag): string {
  const base = "inline-block px-2 py-0.5 font-display text-xs border";
  const map: Record<DiaryTag, string> = {
    drawing: `${base} border-accent/50 text-accent`,
    reading: `${base} border-green-400/50 text-green-400`,
    daily: `${base} border-line text-muted`,
    tech: `${base} border-accentDim/70 text-accentDim`,
  };
  return map[tag];
}

export default function DiaryList({ entries }: { entries: DiaryEntry[] }) {
  const [activeTag, setActiveTag] = useState<DiaryTag | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return entries;
    return entries.filter((e) => e.tags?.includes(activeTag));
  }, [entries, activeTag]);

  return (
    <div>
      {/* タグフィルター */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line/40 pb-6">
        <button
          onClick={() => setActiveTag(null)}
          className={`font-display text-sm transition-colors ${
            activeTag === null ? "text-paper" : "text-muted hover:text-paper"
          }`}
        >
          All
        </button>
        <span className="text-line">|</span>
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`font-display text-sm transition-colors ${
              activeTag === tag ? "text-paper" : "text-muted hover:text-paper"
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        ))}
        <span className="ml-auto font-display text-xs text-muted">
          {filtered.length} entries
        </span>
      </div>

      {/* エントリー一覧 */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">No entries yet.</p>
      ) : (
        <ul className="mt-2 divide-y divide-line/30">
          {filtered.map((entry) => {
            const preview = stripHtml(entry.body).slice(0, 100);
            const hasMore = stripHtml(entry.body).length > 100;
            return (
              <li key={entry.id}>
                <Link
                  href={`/diary/${entry.id}`}
                  className="group flex items-start gap-6 py-7 transition-colors"
                >
                  <time
                    dateTime={entry.publishedAt}
                    className="mt-0.5 w-24 shrink-0 font-display text-xs text-muted"
                  >
                    {formatDate(entry.publishedAt)}
                  </time>

                  <div className="min-w-0 flex-1">
                    {entry.title && (
                      <p className="font-display text-base text-paper transition-colors group-hover:text-accent">
                        {entry.title}
                      </p>
                    )}
                    <p
                      className={`text-sm leading-relaxed text-muted ${
                        entry.title ? "mt-1" : "text-paper/80 group-hover:text-accent transition-colors"
                      }`}
                    >
                      {preview}
                      {hasMore && "…"}
                    </p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span key={tag} className={tagStyle(tag)}>
                            {TAG_LABELS[tag]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {entry.image && (
                    <div className="relative ml-4 h-16 w-16 shrink-0 overflow-hidden border border-line/50">
                      <Image
                        src={entry.image.url}
                        alt={entry.title ?? "diary image"}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDiaryEntry, formatDate, TAG_LABELS } from "@/lib/microcms";
import type { DiaryTag } from "@/lib/microcms";

// 記事ページはリクエスト時にサーバーレンダリング（ISRではなくSSR）
// → 投稿直後にリロードで即反映、静的ビルド時のAPI呼び出しもなし
export const dynamic = "force-dynamic";

type Props = { params: { contentId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getDiaryEntry(params.contentId);
  return {
    title: entry.title ? `${entry.title} — Arisa` : `Diary — Arisa`,
  };
}

function tagStyle(tag: DiaryTag): string {
  const base = "inline-block px-2.5 py-1 font-display text-xs border";
  const map: Record<DiaryTag, string> = {
    drawing: `${base} border-accent/50 text-accent`,
    reading: `${base} border-green-400/50 text-green-400`,
    daily: `${base} border-line text-muted`,
    tech: `${base} border-accentDim/70 text-accentDim`,
  };
  return map[tag];
}

export default async function DiaryEntryPage({ params }: Props) {
  const entry = await getDiaryEntry(params.contentId);

  return (
    <section className="bg-blueprint">
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* ← 戻るリンク */}
        <Link
          href="/diary"
          className="font-display text-sm text-muted transition-colors hover:text-paper"
        >
          ← Diary
        </Link>

        <article className="mt-8 border border-line/50 bg-paper px-7 py-10 text-paperInk shadow-[0_0_60px_-15px_rgba(111,214,255,0.15)] md:px-12 md:py-14">
          {/* ヘッダー */}
          <header>
            <time
              dateTime={entry.publishedAt}
              className="font-display text-sm text-accentDim"
            >
              {formatDate(entry.publishedAt)}
            </time>

            {entry.title && (
              <h1 className="mt-2 font-display text-3xl font-medium md:text-4xl">
                {entry.title}
              </h1>
            )}

            {entry.tags && entry.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className={tagStyle(tag)}>
                    {TAG_LABELS[tag]}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* メイン画像（あれば） */}
          {entry.image && (
            <div className="relative mt-8 w-full overflow-hidden">
              <Image
                src={entry.image.url}
                alt={entry.title ?? "diary image"}
                width={entry.image.width}
                height={entry.image.height}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* 本文（microCMS リッチテキスト） */}
          <div
            className="diary-body mt-8"
            dangerouslySetInnerHTML={{ __html: entry.body }}
          />
        </article>

        <div className="mt-8">
          <Link
            href="/diary"
            className="font-display text-sm text-muted transition-colors hover:text-paper"
          >
            ← Back to diary
          </Link>
        </div>
      </div>
    </section>
  );
}

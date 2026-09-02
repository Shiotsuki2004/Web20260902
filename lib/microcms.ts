import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSListResponse } from "microcms-js-sdk";

/**
 * クライアントを都度生成する（モジュールロード時には生成しない）。
 * createClient はサービスドメイン/APIキーが空だとバリデーションエラーになるため、
 * 実際にAPIを叩くリクエスト時まで初期化を遅延させる。
 */
function getClient() {
  if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
    throw new Error(
      "MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が未設定です。.env.local を確認してください。"
    );
  }
  return createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  });
}

export type DiaryTag = "drawing" | "reading" | "daily" | "tech";

export type DiaryEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title?: string;
  body: string; // microCMS リッチテキスト → HTML string
  tags?: DiaryTag[];
  image?: MicroCMSImage;
};

export type DiaryListResponse = MicroCMSListResponse<DiaryEntry>;

// 一覧取得
export async function getDiaryList(tag?: DiaryTag): Promise<DiaryListResponse> {
  return getClient().getList<DiaryEntry>({
    endpoint: "diary",
    queries: {
      limit: 100,
      orders: "-publishedAt",
      ...(tag ? { filters: `tags[contains]${tag}` } : {}),
    },
  });
}

// 1件取得
export async function getDiaryEntry(contentId: string): Promise<DiaryEntry> {
  return getClient().getListDetail<DiaryEntry>({
    endpoint: "diary",
    contentId,
  });
}

// 全IDを返す（静的生成用）
export async function getAllDiaryIds(): Promise<string[]> {
  const data = await getClient().getList<DiaryEntry>({
    endpoint: "diary",
    queries: { limit: 100, fields: "id" },
  });
  return data.contents.map((entry) => entry.id);
}

// 日付フォーマット
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export const TAG_LABELS: Record<DiaryTag, string> = {
  drawing: "Drawing",
  reading: "Reading",
  daily: "Daily",
  tech: "Tech",
};

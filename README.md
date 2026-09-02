# Arisa — personal site

A small Next.js (App Router + TypeScript + Tailwind CSS) site.

| ページ | 内容 |
|---|---|
| `/` | ヒーロー・短い自己紹介 |
| `/about` | 長い自己紹介 |
| `/journal` | 17本の固定エッセイ（サイドバー切り替え） |
| `/diary` | microCMS連携の日記（随時追加） |

## Getting started

### 1. 環境変数を設定

```bash
cp .env.local.example .env.local
# .env.local を編集して microCMS のキーを入力
```

microCMSのスキーマ設定は [`MICROCMS_SETUP.md`](./MICROCMS_SETUP.md) を参照。

### 2. 依存インストール → 起動

```bash
npm install
npm run dev
```

http://localhost:3000 で確認。

## Build for production

```bash
npm run build
npm start
```

## Notes

- アイコンは `public/icon.jpg`（ファビコン兼ホームページ表示）
- Journalの文章は `lib/journalData.ts` で管理（コード直編集）
- Diaryの記事は microCMS 管理画面から投稿・編集
- `/diary` と `/diary/[contentId]` は ISR（60秒）でキャッシュされる

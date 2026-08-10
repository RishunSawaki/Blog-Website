export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ja: "日本語"
};

export const dictionary = {
  en: {
    siteName: "Solo Notes",
    navHome: "Home",
    navPosts: "Posts",
    navSearch: "Search",
    navAbout: "About",
    heroTitle: "A personal blog for shipping ideas in public.",
    heroBody:
      "Long-form notes, technical writeups, architecture sketches, and small experiments published from one place.",
    featuredPosts: "Featured posts",
    latestPosts: "Latest posts",
    allPosts: "All posts",
    searchPlaceholder: "Search by title, tag, category, or body",
    searchLabel: "Search posts",
    noResults: "No posts matched your search.",
    tocTitle: "On this page",
    tagsTitle: "Tags",
    categoryTitle: "Category",
    relatedTitle: "Related posts",
    architectureTitle: "Interactive architecture",
    demoTitle: "Live code demo",
    languageTitle: "Language",
    themeTitle: "Theme",
    readingTime: "min read",
    updatedAt: "Updated",
    publishedAt: "Published"
  },
  ja: {
    siteName: "Solo Notes",
    navHome: "ホーム",
    navPosts: "投稿一覧",
    navSearch: "検索",
    navAbout: "このサイトについて",
    heroTitle: "アイデアをそのまま公開できる個人ブログ。",
    heroBody:
      "技術メモ、設計メモ、アーキテクチャ図、小さな実験をひとつの場所から発信します。",
    featuredPosts: "注目記事",
    latestPosts: "新着記事",
    allPosts: "すべての記事",
    searchPlaceholder: "タイトル、タグ、カテゴリ、本文で検索",
    searchLabel: "記事を検索",
    noResults: "該当する記事が見つかりませんでした。",
    tocTitle: "目次",
    tagsTitle: "タグ",
    categoryTitle: "カテゴリー",
    relatedTitle: "関連記事",
    architectureTitle: "インタラクティブな構成図",
    demoTitle: "ライブコードデモ",
    languageTitle: "言語",
    themeTitle: "テーマ",
    readingTime: "分で読める",
    updatedAt: "更新日",
    publishedAt: "公開日"
  }
} satisfies Record<Locale, Record<string, string>>;

export type Dictionary = (typeof dictionary)[Locale];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
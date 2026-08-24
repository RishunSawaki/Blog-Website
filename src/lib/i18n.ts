export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ja: "日本語"
};

export const dictionary = {
  en: {
    siteName: "Uri's room",
    navHome: "Home",
    navPosts: "Posts",
    navSearch: "Search",
    navAbout: "About",
    navCategory: "Category",
    heroTitle: "Uri's personal blog",
    heroBody: "Posting about various things!",
    featuredPosts: "Featured posts",
    featuredPostsSentence: "These are some of our featured posts.",
    homeCategorySentence: "Browse posts by topic from the home page.",
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
    publishedAt: "Published",
    aboutStatement: `This is a personal blog site built to publish various things.
                    If you want to know more about me, please check out the link below.`
  },
  ja: {
    siteName: "Uriの部屋",
    navHome: "ホーム",
    navPosts: "投稿一覧",
    navSearch: "検索",
    navAbout: "このサイトについて",
    navCategory: "カテゴリー",
    heroTitle: "Uriの個人ブログ",
    heroBody:
      "様々なことについて発信していきます!",
    featuredPosts: "注目記事",
    featuredPostsSentence: "こちらは注目記事の一覧です。",
    homeCategorySentence: "ホームからカテゴリー別に記事を探せます。",
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
    publishedAt: "公開日",
    aboutStatement: `このサイトは様々なことについて発信するための個人ブログです。
                    私が何者かについては以下のリンクをご覧ください。`
  }
} satisfies Record<Locale, Record<string, string>>;

export type Dictionary = (typeof dictionary)[Locale];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
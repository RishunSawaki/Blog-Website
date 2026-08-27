import { SearchClient } from "@/components/search-client";
import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: dictionary[locale].navSearch };
}

export default async function SearchPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const messages = dictionary[locale as Locale];
  const posts = await getAllPosts(locale as Locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-foreground/50">{messages.navSearch}</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">{messages.searchLabel}</h1>
        <p className="text-foreground/65">{messages.searchDescription}</p>
      </div>

      <div className="mt-8">
        <SearchClient
          posts={posts}
          locale={locale as Locale}
          placeholder={messages.searchPlaceholder}
          emptyLabel={messages.noResults}
        />
      </div>
    </div>
  );
}
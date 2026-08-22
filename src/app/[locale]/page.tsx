import Link from "next/link";

import { ArrowRight, BookOpenText, Search } from "lucide-react";

import { PostCard } from "@/components/post-card";
import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getFeaturedPosts } from "@/lib/posts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: dictionary[locale].siteName };
}

export default async function LocaleHome({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const messages = dictionary[locale as Locale];
  const featuredPosts = await getFeaturedPosts(locale as Locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <section className="grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:items-end">
        <div className="space-y-6">
          <h1 className="max-w-3xl font-display text-5xl leading-[1.02] font-semibold text-foreground sm:text-6xl lg:text-7xl">
            {messages.heroTitle}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-foreground/70">{messages.heroBody}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/posts`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:-translate-y-0.5"
            >
              <BookOpenText className="h-4 w-4" />
              {messages.allPosts}
            </Link>
            <Link
              href={`/${locale}/search`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-accent/40"
            >
              <Search className="h-4 w-4" />
              {messages.searchLabel}
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="mt-16 space-y-6 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground">{messages.featuredPosts}</h2>
            <p className="mt-2 text-sm text-foreground/60">{messages.featuredPostsSentence}</p>
          </div>
          <Link href={`/${locale}/posts`} className="inline-flex items-center gap-2 text-sm text-accent">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale as Locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
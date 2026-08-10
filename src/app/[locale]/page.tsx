import Link from "next/link";

import { ArrowRight, BookOpenText, Search } from "lucide-react";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { LiveCodeDemo } from "@/components/live-code-demo";
import { PostCard } from "@/components/post-card";
import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";

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
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(locale as Locale),
    getAllPosts(locale as Locale)
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/55">
            Personal blog / MDX / Next.js
          </p>
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

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: messages.featuredPosts, value: `${featuredPosts.length}` },
              { label: messages.latestPosts, value: `${latestPosts.length}` },
              { label: messages.languageTitle, value: locale.toUpperCase() }
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-border bg-surface p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/45">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.25em] text-foreground/50">SEO + MDX</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-foreground/70">
            <p>Localized metadata</p>
            <p>Searchable content index</p>
            <p>Shiki-powered syntax highlighting</p>
            <p>Static routes for tags and categories</p>
            <p>Dark and light theme persistence</p>
          </div>
        </div>
      </section>

      <section id="featured" className="mt-16 space-y-6 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground">{messages.featuredPosts}</h2>
            <p className="mt-2 text-sm text-foreground/60">A curated set of posts from the current locale.</p>
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

      <section id="architecture" className="mt-16 scroll-mt-24">
        <ArchitectureDiagram title={messages.architectureTitle} />
      </section>

      <section id="demo" className="mt-16 scroll-mt-24">
        <LiveCodeDemo title={messages.demoTitle} />
      </section>
    </div>
  );
}
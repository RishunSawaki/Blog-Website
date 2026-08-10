import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: dictionary[locale].navPosts };
}

export default async function PostsPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const messages = dictionary[locale as Locale];
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(locale as Locale),
    getCategories(locale as Locale),
    getTags(locale as Locale)
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.25em] text-foreground/50">{messages.navPosts}</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">{messages.latestPosts}</h1>
        <p className="max-w-2xl text-foreground/65">
          Browse every article, then filter by category or jump to a tagged route.
        </p>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_280px]">
        <div className="grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale as Locale} />
          ))}
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-border bg-surface p-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/55">{messages.categoryTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/${locale}/categories/${encodeURIComponent(category)}`}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/70 transition hover:border-accent/40 hover:text-accent"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/55">{messages.tagsTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/70 transition hover:border-accent/40 hover:text-accent"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
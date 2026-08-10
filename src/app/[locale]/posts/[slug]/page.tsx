import Link from "next/link";
import { notFound } from "next/navigation";

import { TableOfContents } from "@/components/toc";
import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/date";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";

export function generateStaticParams() {
  return Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllPosts(locale);
      return posts.map((post) => ({ locale, slug: post.slug }));
    })
  ).then((items) => items.flat());
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = await getPostBySlug(locale as Locale, slug).catch(() => null);
  if (!post) return {};

  return {
    title: post.summary.title,
    description: post.summary.description
  };
}

export default async function PostPage({ params }: Readonly<{ params: Promise<{ locale: string; slug: string }> }>) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const post = await getPostBySlug(locale as Locale, slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const messages = dictionary[locale as Locale];
  const relatedPosts = await getRelatedPosts(locale as Locale, slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article className="space-y-8 rounded-[2.5rem] border border-border bg-surface p-6 shadow-glow sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/50">
            <span>{post.summary.category}</span>
            <span>{formatDate(post.summary.date, locale as Locale)}</span>
            <span>
              {post.summary.readingTime} {messages.readingTime}
            </span>
          </div>

          <header className="space-y-4">
            <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">{post.summary.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-foreground/70">{post.summary.description}</p>
          </header>

          <div className="flex flex-wrap gap-2">
            {post.summary.tags.map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/tags/${encodeURIComponent(tag)}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/70 transition hover:border-accent/40 hover:text-accent"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="prose prose-invert max-w-none prose-headings:scroll-mt-28 prose-a:underline prose-a:underline-offset-4">
            {post.body}
          </div>
        </article>

        <div className="space-y-6">
          <TableOfContents headings={post.headings} />

          <section className="rounded-[2rem] border border-border bg-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/55">
              {messages.relatedTitle}
            </h2>
            <div className="mt-4 space-y-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/posts/${related.slug}`}
                  className="block rounded-2xl border border-border px-4 py-3 transition hover:border-accent/40 hover:text-accent"
                >
                  <p className="font-medium text-foreground">{related.title}</p>
                  <p className="mt-1 text-sm text-foreground/60">{related.description}</p>
                </Link>
              ))}

              {relatedPosts.length === 0 && (
                <p className="text-sm text-foreground/55">No related posts yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
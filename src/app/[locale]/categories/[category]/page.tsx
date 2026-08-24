import Link from "next/link";

import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getAllPosts, getCategories } from "@/lib/posts";

export function generateStaticParams() {
  return Promise.all(
    locales.map(async (locale) => {
      const categories = await getCategories(locale);
      return categories.map((category) => ({ locale, category }));
    })
  ).then((items) => items.flat());
}

export default async function CategoryPage({ params }: Readonly<{ params: Promise<{ locale: string; category: string }> }>) {
  const { locale, category } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const messages = dictionary[locale as Locale];
  const posts = (await getAllPosts(locale as Locale)).filter((post) => post.category === category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <p className="text-sm uppercase tracking-[0.25em] text-foreground/50">{messages.categoryTitle}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-foreground">{category}</h1>

      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/posts/${post.slug}`}
            className="rounded-[1.5rem] border border-border bg-surface p-5 transition hover:border-accent/40"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-foreground/45">{post.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">{post.title}</h2>
            <p className="mt-2 text-sm text-foreground/65">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
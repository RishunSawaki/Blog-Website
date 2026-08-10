"use client";

import { useDeferredValue, useMemo, useState } from "react";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import Link from "next/link";

import { formatDate } from "@/lib/date";
import type { Locale } from "@/lib/i18n";
import type { PostSummary } from "@/lib/posts";

export function SearchClient({
  posts,
  locale,
  placeholder,
  emptyLabel
}: {
  posts: PostSummary[];
  locale: Locale;
  placeholder: string;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "category", "tags", "excerpt", "searchText"],
        threshold: 0.35,
        ignoreLocation: true
      }),
    [posts]
  );

  const results = deferredQuery
    ? fuse.search(deferredQuery).map((entry) => entry.item)
    : posts;

  return (
    <div className="space-y-6">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-border bg-surface pl-11 pr-4 text-base text-foreground outline-none transition placeholder:text-foreground/35 focus:border-accent"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/posts/${post.slug}`}
            className="rounded-[1.75rem] border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-foreground/50">
              <span>{post.category}</span>
              <span>{formatDate(post.date, locale)}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">{post.title}</h3>
            <p className="mt-2 text-sm leading-6 text-foreground/65">{post.description}</p>
          </Link>
        ))}

        {results.length === 0 && (
          <div className="rounded-[1.75rem] border border-dashed border-border bg-surface p-8 text-sm text-foreground/60">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  );
}
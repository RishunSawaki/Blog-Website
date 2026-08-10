import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { formatDate } from "@/lib/date";
import type { Locale } from "@/lib/i18n";
import type { PostSummary } from "@/lib/posts";

export function PostCard({ post, locale }: { post: PostSummary; locale: Locale }) {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-border bg-surface p-6 shadow-glow transition hover:-translate-y-1 hover:border-accent/40">
      <div className="mb-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-foreground/50">
        <span>{post.category}</span>
        <span>{formatDate(post.date, locale)}</span>
      </div>
      <h3 className="text-xl font-semibold leading-tight text-foreground transition group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-foreground/70">{post.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/60">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-foreground/55">
          {post.readingTime} min read
        </p>
        <Link
          href={`/${locale}/posts/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          Read <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
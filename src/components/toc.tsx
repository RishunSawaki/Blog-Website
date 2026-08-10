import Link from "next/link";

import type { HeadingItem } from "@/lib/posts";

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  if (!headings.length) {
    return null;
  }

  return (
    <aside className="rounded-[2rem] border border-border bg-surface p-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-foreground/60">On this page</h2>
      <nav className="mt-4 space-y-2 text-sm">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={`block rounded-xl px-3 py-2 text-foreground/70 transition hover:bg-accent-soft hover:text-accent ${
              heading.level === 3 ? "ml-4" : ""
            }`}
          >
            {heading.text}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
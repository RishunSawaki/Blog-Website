import Link from "next/link";

import { Menu } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary, Locale } from "@/lib/i18n";

const navItems = [
  { href: "/", labelKey: "navHome" },
  { href: "/#featured", labelKey: "featuredPosts" },
  { href: "/posts", labelKey: "navPosts" },
  { href: "/search", labelKey: "navSearch" },
] as const;

export function SiteHeader({ locale, messages }: { locale: Locale; messages: Dictionary }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-sm font-semibold text-accent shadow-glow">
            Blog
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-foreground/70 uppercase">
              {messages.siteName}
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface p-1 text-sm lg:flex">
          {navItems.map((item) => {
            const href = item.href.startsWith("#") ? item.href : `/${locale}${item.href}`;

            return (
              <Link
                key={item.labelKey}
                href={href}
                className="rounded-full px-3 py-1.5 text-foreground/70 transition hover:bg-accent-soft hover:text-accent"
              >
                {messages[item.labelKey]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <ThemeToggle label={messages.themeTitle} />
          <details className="relative lg:hidden">
            <summary
              className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-border bg-surface text-foreground/70 [&::-webkit-details-marker]:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-4 w-4" />
            </summary>
            <nav className="absolute top-15 right-0 flex w-56 flex-col gap-1 rounded-2xl border border-border bg-[#E6D7AD] p-2 text-sm shadow-glow backdrop-blur-xl">
              {navItems.map((item) => {
                const href = `/${locale}${item.href}`;

                return (
                  <Link
                    key={`mobile-${item.labelKey}`}
                    href={href}
                    className="rounded-xl px-3 py-2 text-foreground/80 transition hover:bg-accent-soft hover:text-accent"
                  >
                    {messages[item.labelKey]}
                  </Link>
                );
              })}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
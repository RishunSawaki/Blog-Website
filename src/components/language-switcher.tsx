"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeLabels, locales, type Locale } from "@/lib/i18n";

function replaceLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="inline-flex rounded-full border border-border bg-surface p-1 text-sm">
      {locales.map((entry) => {
        const active = entry === locale;
        return (
          <Link
            key={entry}
            href={replaceLocale(pathname, entry)}
            className={`rounded-full px-3 py-1.5 transition ${
              active
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:text-foreground"
            }`}
            aria-label={localeLabels[entry]}
          >
            {entry.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
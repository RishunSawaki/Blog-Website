import type { Locale } from "@/lib/i18n";

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}
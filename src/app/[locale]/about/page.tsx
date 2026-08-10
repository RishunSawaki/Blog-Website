import { dictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return null;
  }

  const messages = dictionary[locale as Locale];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <p className="text-sm uppercase tracking-[0.25em] text-foreground/50">{messages.navAbout}</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-foreground">{messages.siteName}</h1>
      <div className="mt-6 space-y-4 text-lg leading-8 text-foreground/70">
        <p>
          This is a personal blog site built to publish technical notes, design sketches, and experiments quickly.
        </p>
        <p>
          The stack emphasizes TypeScript, Next.js, Tailwind CSS, MDX, shiki, and deployment-friendly conventions.
        </p>
      </div>
    </div>
  );
}
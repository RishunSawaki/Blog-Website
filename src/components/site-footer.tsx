import type { Dictionary } from "@/lib/i18n";

export function SiteFooter({ messages }: { messages: Dictionary }) {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-foreground/65 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>{messages.siteName}</p>
        <p>Built with Next.js, Tailwind CSS, MDX, shiki, and Vercel-ready conventions.</p>
      </div>
    </footer>
  );
}
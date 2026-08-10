"use client";

import { useMemo, useState } from "react";

const accents = [
  { label: "Cyan", value: "#22d3ee" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Rose", value: "#fb7185" },
  { label: "Lime", value: "#a3e635" }
];

export function LiveCodeDemo({ title }: { title: string }) {
  const [headline, setHeadline] = useState("Design systems that stay readable.");
  const [accent, setAccent] = useState(accents[0].value);
  const [density, setDensity] = useState(2);

  const code = useMemo(
    () => `function DemoCard() {
  return (
    <article style={{ borderColor: "${accent}" }}>
      <h3>${headline}</h3>
      <p>Density level: ${density}</p>
    </article>
  );
}`,
    [accent, density, headline]
  );

  return (
    <section className="grid gap-6 rounded-[2rem] border border-border bg-surface p-6 shadow-glow xl:grid-cols-[1.2fr_0.8fr]">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-foreground/60">
              A small interactive preview that updates as you tweak the controls.
            </p>
          </div>
          <div className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.25em] text-foreground/50">
            Live
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-foreground/70 sm:col-span-2">
            <span>Headline</span>
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-accent"
            />
          </label>

          <label className="space-y-2 text-sm text-foreground/70">
            <span>Accent</span>
            <select
              value={accent}
              onChange={(event) => setAccent(event.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-accent"
            >
              {accents.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-foreground/70">
            <span>Density</span>
            <input
              type="range"
              min={1}
              max={4}
              value={density}
              onChange={(event) => setDensity(Number(event.target.value))}
              className="w-full accent-current"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className="rounded-[1.75rem] border p-5"
          style={{ borderColor: accent, background: `color-mix(in oklab, ${accent} 12%, transparent)` }}
        >
          <div className="text-xs uppercase tracking-[0.25em] text-foreground/50">Preview</div>
          <h4 className="mt-4 text-2xl font-semibold text-foreground">{headline}</h4>
          <p className="mt-3 text-sm leading-6 text-foreground/65">
            A card layout driven by the current settings. This keeps the demo safe while still feeling live.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {Array.from({ length: density }).map((_, index) => (
              <span
                key={index}
                className="rounded-full border px-3 py-1 text-xs"
                style={{ borderColor: accent, color: accent }}
              >
                Chip {index + 1}
              </span>
            ))}
          </div>
        </div>

        <pre className="overflow-x-auto rounded-[1.75rem] border border-border bg-background p-5 text-xs leading-6 text-foreground/75">
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}
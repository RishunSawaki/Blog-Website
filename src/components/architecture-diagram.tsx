"use client";

import { useState } from "react";

import { ArrowRight } from "lucide-react";

type NodeId = "content" | "mdx" | "pages" | "search" | "deploy";

const nodes: Array<{
  id: NodeId;
  title: string;
  detail: string;
  x: string;
  y: string;
}> = [
  {
    id: "content",
    title: "MDX content",
    detail: "Posts live in locale-specific folders, so writing stays close to the source of truth.",
    x: "6%",
    y: "18%"
  },
  {
    id: "mdx",
    title: "MDX pipeline",
    detail: "remark and rehype plugins handle syntax highlighting, slugs, and headings.",
    x: "38%",
    y: "14%"
  },
  {
    id: "pages",
    title: "Next.js pages",
    detail: "Locale-prefixed routes render home, search, tag, category, and post pages.",
    x: "68%",
    y: "18%"
  },
  {
    id: "search",
    title: "Search index",
    detail: "Fuse.js powers instant filtering across title, tags, category, excerpt, and content.",
    x: "24%",
    y: "58%"
  },
  {
    id: "deploy",
    title: "Vercel deploy",
    detail: "Static output, metadata routes, and image-safe rendering are ready for deployment.",
    x: "64%",
    y: "62%"
  }
];

const edges: Array<[NodeId, NodeId]> = [
  ["content", "mdx"],
  ["mdx", "pages"],
  ["mdx", "search"],
  ["pages", "deploy"],
  ["search", "deploy"]
];

export function ArchitectureDiagram({ title }: { title: string }) {
  const [selected, setSelected] = useState<NodeId>("mdx");

  const activeNode = nodes.find((node) => node.id === selected) ?? nodes[1];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border bg-surface p-6 shadow-glow">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-foreground/60">
            Tap a node to inspect how the stack is wired together.
          </p>
        </div>
        <div className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.25em] text-foreground/50">
          Interactive
        </div>
      </div>

      <div className="relative mt-6 h-[28rem] overflow-hidden rounded-[2rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,_rgba(120,184,255,0.18),_transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-4">
        <div className="absolute inset-0 bg-grid-fine bg-[size:42px_42px] opacity-20" />
        <svg className="absolute inset-0 h-full w-full">
          {edges.map(([from, to]) => {
            const fromNode = nodes.find((node) => node.id === from);
            const toNode = nodes.find((node) => node.id === to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={`${from}-${to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="rgba(148,163,184,0.35)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const active = selected === node.id;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelected(node.id)}
              className={`absolute w-64 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border p-4 text-left transition ${
                active
                  ? "border-accent bg-accent-soft text-accent shadow-glow"
                  : "border-border bg-background/85 text-foreground/80 hover:border-accent/40 hover:bg-accent-soft/70"
              }`}
              style={{ left: node.x, top: node.y }}
            >
              <p className="text-sm font-semibold">{node.title}</p>
              <p className="mt-2 text-xs leading-5 text-inherit/80">{node.detail}</p>
            </button>
          );
        })}

        <div className="absolute bottom-4 right-4 w-full max-w-sm rounded-[1.5rem] border border-border bg-background/90 p-5 backdrop-blur">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/50">
            <ArrowRight className="h-4 w-4" />
            Selected node
          </div>
          <h4 className="mt-3 text-lg font-semibold text-foreground">{activeNode.title}</h4>
          <p className="mt-2 text-sm leading-6 text-foreground/65">{activeNode.detail}</p>
        </div>
      </div>
    </section>
  );
}
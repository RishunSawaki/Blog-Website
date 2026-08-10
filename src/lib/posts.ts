import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { defaultLocale, type Locale, locales } from "@/lib/i18n";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  locale: Locale;
  slug: string;
  featured?: boolean;
}

export interface PostSummary extends PostFrontmatter {
  readingTime: string;
  excerpt: string;
  searchText: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

const prettyCodeOptions = {
  theme: {
    dark: "github-dark-default",
    light: "github-light-default"
  },
  keepBackground: false
};

function estimateReadingTime(source: string) {
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))}`;
}

function createExcerpt(content: string) {
  const plainText = content
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`\[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.slice(0, 180);
}

function normalizeHeadingId(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractHeadings(source: string): HeadingItem[] {
  return source.split("\n").flatMap((line) => {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) {
      return [];
    }

    return [
      {
        id: normalizeHeadingId(match[2]),
        text: match[2].replace(/\s+#+$/, ""),
        level: match[1].length
      }
    ];
  });
}

async function readPostFile(filePath: string) {
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as Partial<PostFrontmatter>;

  if (!frontmatter.slug || !frontmatter.locale || !frontmatter.title) {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }

  return {
    frontmatter: frontmatter as PostFrontmatter,
    content,
    source
  };
}

export async function getPostSlugs(locale?: Locale) {
  const localesToRead = locale ? [locale] : locales;
  const files = await Promise.all(
    localesToRead.map(async (currentLocale) => {
      const directory = path.join(postsDirectory, currentLocale);

      try {
        const items = await fs.readdir(directory);
        return items
          .filter((item) => item.endsWith(".mdx"))
          .map((item) => ({
            locale: currentLocale,
            slug: item.replace(/\.mdx$/, "")
          }));
      } catch {
        return [] as Array<{ locale: Locale; slug: string }>;
      }
    })
  );

  return files.flat();
}

export async function getAllPosts(locale?: Locale) {
  const slugs = await getPostSlugs(locale);
  const posts = await Promise.all(
    slugs.map(async ({ locale: currentLocale, slug }) => {
      const post = await getPostBySlug(currentLocale, slug);
      return post.summary;
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedPosts(locale?: Locale) {
  const posts = await getAllPosts(locale);
  return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getPostBySlug(locale: Locale, slug: string) {
  const filePath = path.join(postsDirectory, locale, `${slug}.mdx`);
  const { frontmatter, content, source } = await readPostFile(filePath);
  const headings = extractHeadings(content);

  const { content: body } = await compileMDX<PostFrontmatter>({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeSlug], [rehypePrettyCode, prettyCodeOptions]]
      }
    }
  });

  return {
    summary: {
      ...frontmatter,
      readingTime: estimateReadingTime(source)
      ,
      excerpt: createExcerpt(content),
      searchText: [
        frontmatter.title,
        frontmatter.description,
        frontmatter.category,
        frontmatter.tags.join(" "),
        createExcerpt(content)
      ]
        .join(" ")
        .toLowerCase()
    } satisfies PostSummary,
    body,
    headings
  };
}

export async function getRelatedPosts(locale: Locale, slug: string) {
  const posts = await getAllPosts(locale);
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== slug)
    .filter(
      (post) =>
        post.category === current.category ||
        post.tags.some((tag) => current.tags.includes(tag))
    )
    .slice(0, 3);
}

export async function getCategories(locale?: Locale) {
  const posts = await getAllPosts(locale);
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export async function getTags(locale?: Locale) {
  const posts = await getAllPosts(locale);
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

export function pickLocale(locale: string | undefined) {
  if (!locale || !locales.includes(locale as Locale)) {
    return defaultLocale;
  }

  return locale as Locale;
}
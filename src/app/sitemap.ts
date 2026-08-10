import type { MetadataRoute } from "next";

import { locales } from "@/lib/i18n";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://example.com";
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push({ url: `${baseUrl}/${locale}`, lastModified: new Date() });
    routes.push({ url: `${baseUrl}/${locale}/posts`, lastModified: new Date() });
    routes.push({ url: `${baseUrl}/${locale}/search`, lastModified: new Date() });

    const [posts, categories, tags] = await Promise.all([
      getAllPosts(locale),
      getCategories(locale),
      getTags(locale)
    ]);

    posts.forEach((post) => {
      routes.push({ url: `${baseUrl}/${locale}/posts/${post.slug}`, lastModified: new Date(post.date) });
    });

    categories.forEach((category) => {
      routes.push({ url: `${baseUrl}/${locale}/categories/${encodeURIComponent(category)}`, lastModified: new Date() });
    });

    tags.forEach((tag) => {
      routes.push({ url: `${baseUrl}/${locale}/tags/${encodeURIComponent(tag)}`, lastModified: new Date() });
    });
  }

  return routes;
}
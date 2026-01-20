import fs from "fs";
import path from "path";

import pages from "@/data/pages.json";
import site from "@/data/site.json";
import posts from "@/data/posts.json";

export type PostMeta = (typeof posts)[number];

export function getSiteData() {
  return site;
}

export function getPageData() {
  return pages;
}

export function getPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) return null;
  const filePath = path.join(process.cwd(), "content", "posts", `${slug}.md`);
  const body = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  return { ...post, body };
}

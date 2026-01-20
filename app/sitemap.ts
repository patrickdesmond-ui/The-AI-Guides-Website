import type { MetadataRoute } from "next";
import posts from "@/data/posts.json";

const baseUrl = "https://theaiguides.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/executive-training",
    "/ai-readiness-survey",
    "/resources",
    "/sme-ai-upskilling-playbook-2025",
    "/about",
    "/contact",
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...postEntries];
}

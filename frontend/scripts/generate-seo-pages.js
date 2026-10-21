import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { loadEnv } from "vite";
import { seoPages } from "../src/seoPages.js";

const outputDirectory = join(process.cwd(), "dist");
const viteEnv = loadEnv("production", process.cwd(), "VITE_");
const siteUrl = (process.env.VITE_SITE_URL || viteEnv.VITE_SITE_URL || "https://acrearch.com").replace(/\/$/, "");
const baseHtml = (await readFile(join(outputDirectory, "index.html"), "utf8"))
  .replaceAll("https://acrearch.com", siteUrl);

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function setMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />`;
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key}["'][^>]*\\/?\\s*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function pageHtml(page) {
  let html = baseHtml.replace(/<title>.*?<\/title>/is, `<title>${page.title}</title>`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "name", "robots", page.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", `${siteUrl}${page.path}`);
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);

  const canonicalPattern = /\s*<link\s+rel=["']canonical["'][^>]*\/?\s*>/i;
  html = html.replace(canonicalPattern, "");
  if (!page.noindex) {
    html = html.replace("</head>", `    <link rel="canonical" href="${siteUrl}${page.path}" />\n  </head>`);
  }
  return html;
}

for (const page of Object.values(seoPages)) {
  const routeDirectory = page.path === "/"
    ? outputDirectory
    : join(outputDirectory, page.path.slice(1));
  const routeFile = join(routeDirectory, "index.html");
  await mkdir(dirname(routeFile), { recursive: true });
  await writeFile(routeFile, pageHtml(page));
}

for (const fileName of ["robots.txt", "sitemap.xml", "llms.txt"]) {
  const filePath = join(outputDirectory, fileName);
  const contents = await readFile(filePath, "utf8");
  await writeFile(filePath, contents.replaceAll("https://acrearch.com", siteUrl));
}
import { useEffect } from "react";

const siteUrl = (import.meta.env.VITE_SITE_URL || "https://acrearch.com").replace(/\/$/, "");

function updateMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
}

export default function SEO({
  title,
  description,
  path = window.location.pathname,
  image = "/logo.png",
  type = "website",
  noindex = false,
}) {
  useEffect(() => {
    const pageUrl = siteUrl ? new URL(path, `${siteUrl}/`).href : "";
    const imageUrl = image
      ? new URL(image, `${siteUrl || window.location.origin}/`).href
      : "";

    document.title = title;
    updateMeta('meta[name="description"]', { name: "description", content: description });
    updateMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    });
    updateMeta('meta[property="og:type"]', { property: "og:type", content: type });
    updateMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "AcreArch" });
    updateMeta('meta[property="og:title"]', { property: "og:title", content: title });
    updateMeta('meta[property="og:description"]', { property: "og:description", content: description });
    updateMeta('meta[property="og:url"]', { property: "og:url", content: pageUrl || window.location.href });
    if (imageUrl) updateMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    updateMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    updateMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    updateMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (siteUrl && !noindex) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = pageUrl;
    } else {
      canonical?.remove();
    }
  }, [description, image, noindex, path, title, type]);

  return null;
}
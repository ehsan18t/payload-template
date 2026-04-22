const fallbackSiteUrl = "https://webcrafts.dev";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const normalizedSiteUrl = configuredSiteUrl?.replace(/\/+$/, "");

export const siteConfig = {
  applicationName: "WebCrafts.dev",
  category: "technology",
  description:
    "WebCrafts is an elite engineering agency specializing in scalable system architecture, high-performance web platforms, and native applications.",
  email: "hello@webcrafts.dev",
  foundedYear: "2024",
  locale: "en_US",
  name: "WebCrafts",
  title: "WebCrafts | Engineered Digital Solutions",
  titleTemplate: "%s | WebCrafts",
  url:
    normalizedSiteUrl && /^https?:\/\//.test(normalizedSiteUrl)
      ? normalizedSiteUrl
      : fallbackSiteUrl
} as const;

export const siteKeywords = [
  "WebCrafts",
  "software engineering agency",
  "system architecture",
  "React development",
  "Next.js development",
  "Rust development",
  "Kotlin development",
  "microservices architecture",
  "high performance web applications",
  "native application development"
] as const;

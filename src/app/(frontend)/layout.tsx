import type { Metadata, Viewport } from "next";
import { siteConfig, siteKeywords } from "../site-config";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./styles.css";

const metadataBase = new URL(siteConfig.url);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate
  },
  description: siteConfig.description,
  applicationName: siteConfig.applicationName,
  category: siteConfig.category,
  alternates: {
    canonical: "/"
  },
  referrer: "origin-when-cross-origin",
  keywords: [...siteKeywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    address: false,
    email: false,
    telephone: false
  },
  icons: {
    icon: [
      {
        url: "/logo-light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml"
      },
      {
        url: "/logo-dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml"
      }
    ],
    apple: [{ url: "/logo-light.svg", type: "image/svg+xml" }],
    shortcut: ["/logo-light.svg"]
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.applicationName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WebCrafts digital engineering agency"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/twitter-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" }
  ]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

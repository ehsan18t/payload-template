import Script from "next/script";
import { siteConfig, siteKeywords } from "../site-config";
import App from "./App";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}#organization`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo-light.svg`,
  email: siteConfig.email,
  foundingDate: siteConfig.foundedYear
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}#website`,
  name: siteConfig.applicationName,
  description: siteConfig.description,
  url: siteConfig.url,
  inLanguage: "en",
  keywords: siteKeywords.join(", "),
  publisher: {
    "@id": `${siteConfig.url}#organization`
  }
};

const toJsonLd = (value: object) => JSON.stringify(value).replace(/</g, "\\u003c");

export default function HomePage() {
  return (
    <>
      <Script id="organization-jsonld" type="application/ld+json">
        {toJsonLd(organizationSchema)}
      </Script>
      <Script id="website-jsonld" type="application/ld+json">
        {toJsonLd(websiteSchema)}
      </Script>
      <App />
    </>
  );
}

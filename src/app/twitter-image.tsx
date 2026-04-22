import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

export const runtime = "edge";
export const alt = `${siteConfig.applicationName} | High-performance software agency`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 80% 20%, rgba(0, 149, 130, 0.2), transparent 45%), linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        color: "#18181b",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: "56px 72px",
        textAlign: "center",
        width: "100%"
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1,
          marginBottom: 20
        }}
      >
        WebCrafts.dev
      </div>
      <div
        style={{
          color: "#52525b",
          fontSize: 34,
          lineHeight: 1.35,
          maxWidth: 980
        }}
      >
        System architecture, high-performance web platforms, and native apps.
      </div>
    </div>,
    size
  );
}

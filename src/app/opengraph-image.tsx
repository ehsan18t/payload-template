import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

export const runtime = "edge";
export const alt = `${siteConfig.applicationName} | Engineered Digital Solutions`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.2), transparent 45%), linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)",
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
          border: "1px solid #e4e4e7",
          borderRadius: 999,
          fontSize: 28,
          letterSpacing: 3,
          marginBottom: 36,
          padding: "12px 24px",
          textTransform: "uppercase"
        }}
      >
        Since 2024
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1,
          marginBottom: 24,
          maxWidth: 980
        }}
      >
        WebCrafts.dev
      </div>
      <div
        style={{
          color: "#52525b",
          fontSize: 36,
          lineHeight: 1.35,
          maxWidth: 980
        }}
      >
        Engineered for humans. Built for scale.
      </div>
    </div>,
    size
  );
}

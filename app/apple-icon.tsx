import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #5b21b6, #2e1065)",
          color: "#e9c766",
          fontSize: 96,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}

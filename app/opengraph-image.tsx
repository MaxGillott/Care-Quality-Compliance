import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "Care Quality Compliance. Professional expertise. Compassionate care.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const displayFont = await readFile(
  join(process.cwd(), "public/fonts/ibm-plex-sans-og.ttf"),
);
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#20372c",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 70px",
        color: "#e8e3ef",
      }}
    >
      <div
        style={{ display: "flex", fontFamily: "IBM Plex Sans", fontSize: 35 }}
      >
        Care Quality Compliance.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "IBM Plex Sans",
          fontSize: 79,
          lineHeight: 1.07,
          letterSpacing: "-1px",
        }}
      >
        <span>Professional expertise.</span>
        <span>Compassionate care.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #7d7887",
          paddingTop: 25,
          fontSize: 19,
          color: "#c9bce0",
        }}
      >
        <span>Independent health & social care consultancy</span>
        <span>People. Quality. Opportunity.</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: displayFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_DESCRIPTION_EN, SITE_NAME } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [logoData, apparelBold] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "public/images/GREEN COMMODITIES LOGO_Plan de travail 1-1.png",
      ),
    ),
    readFile(join(process.cwd(), "public/fonts/apparel/Apparel Bold.ttf")),
  ]);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          backgroundColor: "#f7ece0",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={620} height={133} alt="" />
        <div
          style={{
            display: "flex",
            fontFamily: "Apparel",
            fontSize: 30,
            color: "#5d5d5d",
            maxWidth: 820,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {SITE_DESCRIPTION_EN}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 16,
            backgroundColor: "#f39116",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Apparel", data: apparelBold, weight: 700, style: "normal" },
      ],
    },
  );
}

export const alt = `${SITE_NAME} — Premium Cameroonian Cocoa Export`;

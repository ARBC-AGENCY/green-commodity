import localFont from "next/font/local";

export const lovelace = localFont({
  src: [
    {
      path: "../public/fonts/lovelace/lovelace-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/lovelace/lovelace-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/lovelace/lovelace-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/lovelace/lovelace-bolditalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-lovelace",
  display: "swap",
});

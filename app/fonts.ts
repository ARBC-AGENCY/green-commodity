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

export const apparel = localFont({
  src: [
    {
      path: "../public/fonts/apparel/Apparel Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Thin It.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Light It.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Regular It.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Bold It.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Black It.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-apparel",
  display: "swap",
});

export const apparelDisplay = localFont({
  src: [
    {
      path: "../public/fonts/apparel/Apparel Display Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Thin It.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Light It.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Regular It.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Bold It.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Apparel Display Black It.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-apparel-display",
  display: "swap",
});

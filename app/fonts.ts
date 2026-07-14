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
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-thinit.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-lightit.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-regularit.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-boldit.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-apparel-blackit.otf",
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
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-thinit.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-lightit.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-regularit.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-boldit.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/apparel/Fontspring-DEMO-appareldisplay-blackit.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-apparel-display",
  display: "swap",
});

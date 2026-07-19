import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { lovelace, apparel, apparelDisplay } from "./fonts";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { IntroGate } from "@/components/intro/IntroGate";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { LenisProvider } from "@/components/scroll/LenisProvider";
import { Header } from "@/components/layout/Header";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import {
  SITE_DESCRIPTION_EN,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SOCIAL_PROFILES,
  SITE_URL,
} from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium Cameroonian Cocoa Export`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION_EN,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Premium Cameroonian Cocoa Export`,
    description: SITE_DESCRIPTION_EN,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Premium Cameroonian Cocoa Export`,
    description: SITE_DESCRIPTION_EN,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE_LOGO_PATH}`,
  description: SITE_DESCRIPTION_EN,
  ...(SITE_SOCIAL_PROFILES.length > 0 && { sameAs: SITE_SOCIAL_PROFILES }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getInitialLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${lovelace.variable} ${apparel.variable} ${apparelDisplay.variable} min-h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteBackground />
        <LenisProvider>
          <LocaleProvider initialLocale={locale}>
            <TransitionProvider>
              <Header />
              <IntroGate>
                <main className="flex flex-1 flex-col">
                  {children}
                </main>
              </IntroGate>
            </TransitionProvider>
          </LocaleProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/",
    locale,
    en: {
      title: "Premium Cameroonian Cocoa Export Partner",
      description:
        "Green Commodities works hand in hand with Cameroonian producers to supply master chocolatiers with exceptional, traceable, EUDR-compliant cocoa.",
    },
    fr: {
      title: "Partenaire d'Export de Cacao Camerounais Premium",
      description:
        "Green Commodities travaille main dans la main avec les producteurs camerounais pour offrir aux maîtres chocolatiers un cacao d'exception, traçable et conforme EUDR.",
    },
  });
}

export default function Home() {
  return (
    <HorizontalScrollSections>
      <HeroSection />
      <StatsSection />
    </HorizontalScrollSections>
  );
}

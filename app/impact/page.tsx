import type { Metadata } from "next";
import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { ImpactHeroSection } from "@/components/impact/ImpactHeroSection";
import { AxesSection } from "@/components/impact/AxesSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/impact",
    locale,
    en: {
      title: "Our Impact — Social & Environmental Charter",
      description:
        "Financial inclusion, agroforestry-based ecosystem preservation, and education: how Green Commodities invests in the communities and land behind our cocoa.",
    },
    fr: {
      title: "Notre Impact — Charte Sociale et Environnementale",
      description:
        "Inclusion financière, préservation de l'écosystème par l'agroforesterie et éducation : comment Green Commodities investit dans les communautés et la terre derrière notre cacao.",
    },
  });
}

export default function ImpactPage() {
  return (
    <HorizontalScrollSections>
      <ImpactHeroSection />
      <AxesSection />
    </HorizontalScrollSections>
  );
}

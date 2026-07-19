import type { Metadata } from "next";
import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { ChainHeroSection } from "@/components/the-chain/ChainHeroSection";
import { GreenFarmersSection } from "@/components/the-chain/GreenFarmersSection";
import { GreenCommoditiesSection } from "@/components/the-chain/GreenCommoditiesSection";
import { SecureProcessSection } from "@/components/the-chain/SecureProcessSection";
import { ProcessStepsSection } from "@/components/the-chain/ProcessStepsSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/the-chain",
    locale,
    en: {
      title: "The Chain — Our Integrated Supply Ecosystem",
      description:
        "Green Farmers and Green Commodities work end-to-end — from secure sourcing and quality control to financing, logistics, and export — for a fully traceable supply chain.",
    },
    fr: {
      title: "La Chaîne — Notre Écosystème d'Approvisionnement Intégré",
      description:
        "Green Farmers et Green Commodities agissent de bout en bout — sourcing sécurisé, contrôle qualité, financement, logistique et export — pour une chaîne d'approvisionnement pleinement traçable.",
    },
  });
}

export default function TheChainPage() {
  return (
    <HorizontalScrollSections>
      <ChainHeroSection />
      <GreenFarmersSection />
      <GreenCommoditiesSection />
      <SecureProcessSection />
      <ProcessStepsSection />
    </HorizontalScrollSections>
  );
}

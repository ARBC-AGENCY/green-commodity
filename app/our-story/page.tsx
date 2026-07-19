import type { Metadata } from "next";
import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { StoryIntroSection } from "@/components/our-story/StoryIntroSection";
import { LegacySection } from "@/components/our-story/LegacySection";
import { MissionSection } from "@/components/our-story/MissionSection";
import { PurchaseSection } from "@/components/our-story/PurchaseSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/our-story",
    locale,
    en: {
      title: "Our Story",
      description:
        "From a family cocoa plantation in Obala to Green Farmers and Green Commodities: the story behind our mission to rebuild Cameroon's cocoa communities.",
    },
    fr: {
      title: "Notre Histoire",
      description:
        "D'une plantation familiale à Obala à la naissance de Green Farmers et Green Commodities : l'histoire de notre mission pour rebâtir les communautés cacaoyères du Cameroun.",
    },
  });
}

export default function OurStoryPage() {
  return (
    <HorizontalScrollSections>
      <StoryIntroSection />
      <LegacySection />
      <PurchaseSection />
      <MissionSection />
    </HorizontalScrollSections>
  );
}

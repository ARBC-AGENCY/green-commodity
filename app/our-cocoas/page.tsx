import type { Metadata } from "next";
import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { CocoaHeroSection } from "@/components/our-cocoas/CocoaHeroSection";
import { GradeQualitySection } from "@/components/our-cocoas/GradeQualitySection";
import { QualityCriteriaSection } from "@/components/our-cocoas/QualityCriteriaSection";
import { SpecificationsSection } from "@/components/our-cocoas/SpecificationsSection";
import { CertificationsSection } from "@/components/our-cocoas/CertificationsSection";
import { getInitialLocale } from "@/lib/i18n/get-locale";
import { buildPageMetadata } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  return buildPageMetadata({
    path: "/our-cocoas",
    locale,
    en: {
      title: "Our Cocoas — Grade 1 Premium Export Quality",
      description:
        "Discover the aromatic signature of our Cameroonian terroir: Grade 1 premium cocoa beans, rigorously graded and guaranteed to strict technical specifications.",
    },
    fr: {
      title: "Nos Cacaos — Qualité Export Grade 1 Premium",
      description:
        "Découvrez la signature aromatique de notre terroir camerounais : des fèves de cacao Grade 1 premium, rigoureusement calibrées et garanties selon des spécifications techniques strictes.",
    },
  });
}

export default function OurCocoasPage() {
  return (
    <HorizontalScrollSections>
      <CocoaHeroSection />
      <GradeQualitySection />
      <QualityCriteriaSection />
      <SpecificationsSection />
      <CertificationsSection />
    </HorizontalScrollSections>
  );
}

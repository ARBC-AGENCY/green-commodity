import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { CocoaHeroSection } from "@/components/our-cocoas/CocoaHeroSection";
import { GradeQualitySection } from "@/components/our-cocoas/GradeQualitySection";
import { QualityCriteriaSection } from "@/components/our-cocoas/QualityCriteriaSection";
import { SpecificationsSection } from "@/components/our-cocoas/SpecificationsSection";

export default function OurCocoasPage() {
  return (
    <HorizontalScrollSections>
      <CocoaHeroSection />
      <GradeQualitySection />
      <QualityCriteriaSection />
      <SpecificationsSection />
    </HorizontalScrollSections>
  );
}

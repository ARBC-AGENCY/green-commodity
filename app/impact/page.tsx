import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { ImpactHeroSection } from "@/components/impact/ImpactHeroSection";
import { AxesSection } from "@/components/impact/AxesSection";

export default function ImpactPage() {
  return (
    <HorizontalScrollSections>
      <ImpactHeroSection />
      <AxesSection />
    </HorizontalScrollSections>
  );
}

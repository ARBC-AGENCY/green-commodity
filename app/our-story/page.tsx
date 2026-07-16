import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { StoryIntroSection } from "@/components/our-story/StoryIntroSection";
import { LegacySection } from "@/components/our-story/LegacySection";
import { PurchaseSection } from "@/components/our-story/PurchaseSection";

export default function OurStoryPage() {
  return (
    <HorizontalScrollSections>
      <StoryIntroSection />
      <LegacySection />
      <PurchaseSection />
    </HorizontalScrollSections>
  );
}

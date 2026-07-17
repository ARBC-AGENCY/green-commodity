import { HorizontalScrollSections } from "@/components/home/HorizontalScrollSections";
import { ChainHeroSection } from "@/components/the-chain/ChainHeroSection";
import { GreenFarmersSection } from "@/components/the-chain/GreenFarmersSection";
import { GreenCommoditiesSection } from "@/components/the-chain/GreenCommoditiesSection";
import { SecureProcessSection } from "@/components/the-chain/SecureProcessSection";

export default function TheChainPage() {
  return (
    <HorizontalScrollSections>
      <ChainHeroSection />
      <GreenFarmersSection />
      <GreenCommoditiesSection />
      <SecureProcessSection />
    </HorizontalScrollSections>
  );
}

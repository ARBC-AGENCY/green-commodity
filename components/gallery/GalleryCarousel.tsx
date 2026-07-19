"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Each page is one 3-col x 2-row slide. New photos can be appended as
 * additional pages (6 images each) as the gallery grows.
 */
const GALLERY_PAGES: { src: string; alt: string }[][] = [
  [
    { src: "/images/GREEN FARMERS INCRUSTATION.webp", alt: "" },
    { src: "/images/GREEN COMMODITIES INCRUSTATION.webp", alt: "" },
    { src: "/images/fermentation chocolat.webp", alt: "" },
    { src: "/images/INCRUSTATION MAIN CACAO 1.webp", alt: "" },
    { src: "/images/INCRUSTATION IMAGE PORTRAIT 4.webp", alt: "" },
    { src: "/images/GREEN COMMODITIES INCRUSTATION 1.webp", alt: "" },
  ],
  [
    { src: "/images/HOMME TRIE.webp", alt: "" },
    { src: "/images/INCRUSTATION IMAGE PORTRAIT.webp", alt: "" },
    { src: "/images/CACAOO.webp", alt: "" },
    { src: "/images/GREEN FARMERS INCRUSTATION 3.webp", alt: "" },
    { src: "/images/FRAME 1.webp", alt: "" },
    { src: "/images/INCRUSTATION MAIN CACAO 2.webp", alt: "" },
  ],
];

export function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Embla is already initialized by the time emblaApi is non-null, so an
    // "init" listener would miss that first event — sync once here instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full homesection:h-full">
      <div ref={emblaRef} className="overflow-hidden homesection:h-full">
        <div className="flex homesection:h-full">
          {GALLERY_PAGES.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid min-w-0 shrink-0 grow-0 basis-full grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 gap-4 pr-1 homesection:h-full"
            >
              {page.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="relative aspect-square w-full homesection:aspect-auto homesection:h-full"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 860px) 20vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {GALLERY_PAGES.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous"
            className="absolute -left-10 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-orange/60 bg-background text-orange transition-colors hover:border-orange disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next"
            className="absolute -right-10 top-1/2 -translate-y-1/2 translate-x-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-orange/60 bg-background text-orange transition-colors hover:border-orange disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {GALLERY_PAGES.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => emblaApi?.scrollTo(pageIndex)}
                aria-label={`Go to slide ${pageIndex + 1}`}
                aria-current={pageIndex === selectedIndex}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  pageIndex === selectedIndex
                    ? "w-6 bg-orange"
                    : "w-2 bg-orange/30 hover:bg-orange/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

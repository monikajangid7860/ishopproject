"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard2 from "./ProductCard2";

export default function BestSellerCarouselClient({ products, imgurl }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,              // ✅ smooth swipe
    containScroll: "trimSnaps",  // ✅ prevents over-scroll
  });

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevEnabled(embla.canScrollPrev());
    setNextEnabled(embla.canScrollNext());
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="relative">
      {/* SLIDER */}
      <div
        ref={emblaRef}
        className="overflow-hidden px-4 md:px-0 touch-pan-x /* ✅ important for mobile swipe * "
      >
        <div className="flex gap-4 md:gap-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="shrink-0 w-[85%] sm:w-[48%] md:w-[32%] lg:w-[24%]"
            >
              <ProductCard2 product={p} imgurl={imgurl} />
            </div>
          ))}
        </div>
      </div>

      {/* PREV (DESKTOP ONLY) */}
      <button
        onClick={scrollPrev}
        disabled={!prevEnabled}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow w-9 h-9 rounded-full items-center justify-center text-xl z-20 disabled:opacity-40"
      >
        ‹
      </button>

      {/* NEXT (DESKTOP ONLY) */}
      <button
        onClick={scrollNext}
        disabled={!nextEnabled}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow w-9 h-9 rounded-full items-center justify-center text-xl z-20 disabled:opacity-40"
      >
        ›
      </button>
    </div>
  );
}

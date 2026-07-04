// "use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard2 from "./ProductCard2.jsx";

export default function BestSellerSlider({ products, imgurl }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((i) => embla?.scrollTo(i), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <section className="pb-10">
      <h2 className="text-2xl lg:text-[25px] font-semibold text-gray-900 mb-3 px-4 md:px-0">
        BEST SELLER IN THIS CATEGORY
      </h2>

      <div className="relative">
        {/* PREV BUTTON — DESKTOP ONLY */}
        <button
          onClick={scrollPrev}
          aria-label="Previous product"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center text-xl"
        >
          ‹
        </button>

        {/* NEXT BUTTON — DESKTOP ONLY */}
        <button
          onClick={scrollNext}
          aria-label="Next product"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center text-xl"
        >
          ›
        </button>

        {/* SLIDER */}
        <div
          ref={emblaRef}
          className="overflow-hidden px-4 md:px-0 touch-pan-x"
        >
          <div className="flex gap-4 lg:gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
              >
                <ProductCard2 product={item} imgurl={imgurl} />
              </div>
            ))}
          </div>
        </div>

        {/* DOT INDICATORS — MOBILE ONLY */}
        <div className="flex md:hidden justify-center gap-1.5 mt-4">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-4 bg-gray-900" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
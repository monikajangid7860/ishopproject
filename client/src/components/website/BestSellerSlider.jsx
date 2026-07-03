"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard2 from "./ProductCard2.jsx";

export default function BestSellerSlider({ products, imgurl }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true, // ✅ smooth swipe
    containScroll: "trimSnaps", // ✅ prevents overscroll
  });

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="pb-10">
      <h2 className="text-2xl lg:text-[25px] font-semibold text-gray-900 mb-3 px-3">
        BEST SELLER IN THIS CATEGORY
      </h2>

      <div className="relative overflow-x-hidden">
        {/* PREV BUTTON — DESKTOP ONLY */}
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center text-xl"
        >
          ‹
        </button>

        {/* NEXT BUTTON — DESKTOP ONLY */}
        <button
          onClick={scrollNext}
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
      </div>
    </section>
  );
}

// "use client";

// import React, { useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import ProductCard2 from "./ProductCard2.jsx";

// export default function BestSellerSlider({ products, imgurl }) {
//   const [emblaRef, embla] = useEmblaCarousel({
//     loop: false,
//     align: "start",
//     dragFree: true, // ✅ smooth swipe
//     containScroll: "trimSnaps", // ✅ prevents overscroll
//   });

//   const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
//   const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

//   return (
//     <section className="pb-10">
//       <h2 className="text-2xl lg:text-[25px] font-semibold text-gray-900 mb-3 px-3">
//         BEST SELLER IN THIS CATEGORY
//       </h2>

//       <div className="relative overflow-x-hidden">
//         {/* PREV BUTTON — DESKTOP ONLY */}
//         <button
//           onClick={scrollPrev}
//           className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center text-xl"
//         >
//           ‹
//         </button>

//         {/* NEXT BUTTON — DESKTOP ONLY */}
//         <button
//           onClick={scrollNext}
//           className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-md items-center justify-center text-xl"
//         >
//           ›
//         </button>

//         {/* SLIDER */}
//         <div
//           ref={emblaRef}
//           className="overflow-hidden px-4 md:px-0 touch-pan-x"
//         >
//           <div className="flex gap-4 lg:gap-6">
//             {products.map((item) => (
//               <div
//                 key={item._id}
//                 className="shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%]"
//               >
//                 <ProductCard2 product={item} imgurl={imgurl} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard2 from "./ProductCard2.jsx";

export default function BestSellerSlider({ products, imgurl }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    skipSnaps: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
  const scrollTo = useCallback((index) => embla?.scrollTo(index), [embla]);

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
      <h2 className="text-2xl lg:text-[25px] font-semibold text-gray-900 mb-4 px-4 md:px-0">
        BEST SELLER IN THIS CATEGORY
      </h2>

      <div className="relative">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

        {/* PREV */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-md hover:shadow-lg items-center justify-center text-xl"
        >
          ‹
        </button>

        {/* NEXT */}
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow-md hover:shadow-lg items-center justify-center text-xl"
        >
          ›
        </button>

        {/* SLIDER */}
        <div
          ref={emblaRef}
          className="overflow-hidden pl-4 pr-2 md:px-0 touch-pan-x"
        >
          <div className="flex gap-3 md:gap-5 lg:gap-6 pb-2">
            {products.map((item) => (
              <div
                key={item._id}
                className="
                  shrink-0
                  w-[72%]
                  min-[420px]:w-[58%]
                  sm:w-[46%]
                  md:w-[31%]
                  lg:w-[23%]
                "
              >
                <ProductCard2
                  product={item}
                  imgurl={imgurl}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex md:hidden justify-center mt-5 gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? "w-6 h-2 bg-black"
                  : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
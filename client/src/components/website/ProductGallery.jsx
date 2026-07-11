"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images = [] }) {
  const [index, setIndex] = useState(0);

  const main = images[index] || "/placeholder.png";

  const previous = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return null;

  return (
    <div className="w-full">

      {/* Main Image */}

      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50">

        <div className="flex aspect-square items-center justify-center p-8 lg:p-12">

          <img
            src={main}
            alt={`Product ${index + 1}`}
            className="
              max-h-[520px]
              w-full
              object-contain
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

        </div>

        {/* Previous */}

        {images.length > 1 && (
          <button
            onClick={previous}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/90
              shadow-lg
              transition
              hover:scale-105
            "
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Next */}

        {images.length > 1 && (
          <button
            onClick={next}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/90
              shadow-lg
              transition
              hover:scale-105
            "
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Thumbnails */}

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

        {images.map((src, i) => (

          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              relative
              flex-shrink-0
              overflow-hidden
              rounded-2xl
              border-2
              transition-all
              duration-300

              ${
                index === i
                  ? "border-[#01A49E] shadow-lg scale-105"
                  : "border-slate-200 hover:border-[#01A49E]/40 hover:shadow-md"
              }
            `}
          >

            <div className="flex h-24 w-24 items-center justify-center bg-white p-3">

              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="max-h-full object-contain transition duration-300 hover:scale-105"
              />

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}
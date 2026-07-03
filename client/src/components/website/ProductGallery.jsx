"use client";

import { useState } from "react";

/**
 * Simple gallery: large image on left, thumbnails below.
 * Keeps aspect/spacing similar to screenshot.
 */
export default function ProductGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const main = images[index];
  console.log(images)
   
  return (
    <div className="w-full max-w-md">
      <div className="bg-[#f7fbff] rounded-lg p-4 border border-[#e9f1fb] flex items-center justify-center">
        <img src={main} alt={`Product image ${index + 1}`} className="h-[300px] object-contain" />
      </div>

      <div className="mt-3 flex gap-3 justify-start items-center">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            className={`w-16 h-16 rounded-md overflow-hidden border ${
              i === index ? "ring-2 ring-emerald-400 border-transparent" : "border-[#e9f1fb]"
            } bg-white flex-shrink-0`}
          >
            <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  );
}

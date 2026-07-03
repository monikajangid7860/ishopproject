// src/components/categories/ProductCircleCard.jsx
import Image from "next/image";

/**
 * Server component: pure presentational.
 * Renders circular icon with label and count.
 */
export default function ProductCircleCard({ item }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm"
        aria-hidden="true"
      >
        
        <Image src={item.img} alt={item.alt || item.label} width={72} height={72} className="object-contain cursor-pointer" />
      </div>
      <div className="mt-3 cursor-pointer">
        <p className="text-sm font-medium text-gray-700 ">{item.label}</p>
        <p className="text-xs text-gray-400 mt-1">{item.count} Items</p>
      </div>
    </div>
  );
}

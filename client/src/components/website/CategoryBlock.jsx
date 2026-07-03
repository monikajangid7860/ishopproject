// src/components/categories/CategoryBlock.jsx
import ProductCircleCard from "./ProductCircleCard";
import CategoryBlockClient from "./CategoryBlockClient";

/**
 * Server component - renders a single category block (card)
 * - banner: image on top
 * - circular product icons in a 2x2 grid
 * - "View All" link
 * - This component is static on server; only small-screen toggle is client (CategoryBlockClient)
 */
export default function CategoryBlock({ block }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xs md:text-sm font-bold text-gray-800">{block.title}</h2>
        <a href={`/categories/${block.id}`} className="text-xs text-gray-500 hover:text-gray-700">View All</a>
      </div>

      {/* Banner */}
      <div className="rounded-lg overflow-hidden mb-4">
        <div className="bg-gray-50 h-28 md:h-32 flex items-center justify-center">
          {/* Decorative banner image */}
          <img src={block.banner.img} alt={block.banner.alt} className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Desktop / tablet grid: visible on md and up */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-6">
        {block.items.map((it) => (
          <ProductCircleCard key={it.id} item={it} />
        ))}
      </div>

      {/* Mobile: client component handles toggling */}
      <CategoryBlockClient block={block} />
    </article>
  );
}

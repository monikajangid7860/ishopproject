
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product: p }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 w-[220px] md:w-[280px] shrink-0">
      
      
      <div className="relative h-44 rounded-t-2xl overflow-hidden bg-gray-50">
        {p.badge && (
          <span
            className={`absolute z-10 top-3 left-3 text-[11px] font-bold text-white px-2 py-1 rounded ${p.badge.color}`}
          >
            {p.badge.text}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-28 sm:w-36 aspect-square">
            <Image src={p.img} alt={p.title} fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 leading-snug">
          {p.title}
        </h3>

        <div className="flex items-baseline gap-3 mb-3">
          {p.priceRange ? (
            <div className="text-sm font-semibold text-gray-900">
              {p.priceRange}
            </div>
          ) : (
            <>
              <div className="text-sm font-semibold text-gray-900">
                ${p.price?.toFixed(2)}
              </div>
              {p.oldPrice && (
                <div className="text-sm line-through text-gray-400">
                  ${p.oldPrice?.toFixed(2)}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
            {p.shipping}
          </span>
          <span className="text-[11px] text-gray-500">{p.stock}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <AddToCartButton product={p} />

          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
            👁
          </button>
        </div>

      </div>
    </article>
  );
}

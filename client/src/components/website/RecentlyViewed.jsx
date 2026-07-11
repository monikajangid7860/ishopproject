"use client";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import useRecentlyViewedProducts from "@/hooks/useRecentlyViewedProducts";
import { getThumbnail } from "@/helper/getProductImage";

export default function RecentlyViewed() {
  const { products, loading } = useRecentlyViewedProducts();

  // Do not render if nothing to show
  if (!loading && !products.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-slate-400" />
          <h2 className="text-[15px] font-semibold tracking-tight text-slate-900">
            Recently Viewed
          </h2>
        </div>

        <Link
          href="/products"
          className="group flex items-center gap-0.5 text-sm text-gray-500 hover:text-black transition-colors"
        >
          View All
          <ChevronRight
            size={15}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      {/* Scroll area with edge fade to hint scrollability */}
      <div className="relative">
        <div
          className="
            flex gap-3 sm:gap-4
            overflow-x-auto scrollbar-hide
            snap-x snap-mandatory
            -mx-4 sm:-mx-6 lg:-mx-8
            px-4 sm:px-6 lg:px-8
            pb-2
          "
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[148px] sm:w-[168px] lg:w-[188px] rounded-xl border border-slate-100 overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-slate-100" />
                  <div className="p-3.5 space-y-2">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                    <div className="h-3.5 bg-slate-100 rounded w-1/2 mt-2" />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="
                    group shrink-0 snap-start
                    w-[148px] sm:w-[168px] lg:w-[188px]
                    bg-white
                    rounded-xl
                    border border-slate-100
                    shadow-sm
                    hover:shadow-md hover:border-slate-200
                    hover:-translate-y-0.5
                    transition-all duration-200
                    overflow-hidden
                  "
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={getThumbnail(
                        product,
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/`
                      )}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-3.5">
                    <h3 className="text-[13px] font-medium text-slate-700 leading-snug line-clamp-2 min-h-[34px]">
                      {product.name}
                    </h3>

                    <div className="mt-1.5 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{product.final_price}
                      </p>

                      <span
                        className="
                          text-[11px] font-medium text-indigo-600 bg-indigo-50
                          px-2 py-1 rounded-full
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-200
                        "
                      >
                        View
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        {/* Fade hints on the edges (desktop only, subtle nudge that more items exist) */}
        <div className="hidden sm:block pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}

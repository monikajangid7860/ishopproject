"use client";

import Image from "next/image";
import Link from "next/link";
import useRecentlyViewedProducts from "@/hooks/useRecentlyViewedProducts";

export default function RecentlyViewed() {
  const { products, loading } = useRecentlyViewedProducts();
  console.log(products)

  // Do not render if nothing to show
  if (loading || !products.length) return null;

  return (
    <div className="max-w-7xl mx-auto p-7">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-semibold tracking-tight">
          YOUR RECENTLY VIEWED
        </h2>

        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-black"
        >
          View All
        </Link>
      </div>

      {/* Items */}
      <div className="flex items-start gap-2 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-transparent min-w-60"
          >
            <div className="bg-slate-50 rounded-lg p-3 flex flex-col lg:flex-row items-start md:gap-3 h-60 lg:h-auto shadow-sm border border-slate-100">

              {/* Image */}
              <div className="shrink-0 relative w-[86px] h-[86px] rounded-md overflow-hidden bg-white">
                   <img src={`{process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/main_images/${product.thumbnail}`} alt={product.name} />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mt-2">
                  <p className="text-sm font-medium text-slate-800">
                    ₹{product.final_price}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-3">
                  <Link
                    href={`/product/${product._id}`}
                    className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100"
                  >
                    View
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

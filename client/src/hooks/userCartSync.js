"use client";

import Link from "next/link";
import useRecentlyViewedProducts from "@/hooks/useRecentlyViewedProducts";
import { getThumbnail } from "@/helper/getProductImage";
import { ArrowRight } from "lucide-react";

export default function RecentlyViewed() {
  const { products, loading } = useRecentlyViewedProducts();

  if (loading || !products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-medium">
            Continue Shopping
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Recently Viewed
          </h2>
        </div>

        <Link
          href="/products"
          className="group flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
        >
          View All
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Cards */}
      <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">

        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="group shrink-0 snap-start"
          >
            <article
              className="
              w-[290px]
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-gray-300
            "
            >

              {/* Image */}
              <div
                className="
                h-40
                rounded-2xl
                bg-gray-50
                flex
                items-center
                justify-center
                overflow-hidden
              "
              >
                <img
                  src={getThumbnail(
                    product,
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/`
                  )}
                  alt={product.name}
                  className="
                    h-32
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Content */}
              <div className="mt-5">

                <h3
                  className="
                  text-[15px]
                  font-semibold
                  leading-6
                  text-gray-900
                  line-clamp-2
                  min-h-[48px]
                "
                >
                  {product.name}
                </h3>

                <p className="mt-4 text-2xl font-bold text-gray-900">
                  ₹{product.final_price}
                </p>

                <div
                  className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-gray-300
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  group-hover:bg-black
                  group-hover:text-white
                  group-hover:border-black
                "
                >
                  View Product

                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>

              </div>

            </article>
          </Link>
        ))}

      </div>

    </section>
  );
}
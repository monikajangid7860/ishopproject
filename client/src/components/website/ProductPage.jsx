import {
  Truck,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";

import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import PurchaseBox from "./PurchaseBox";
import Badge from "./ProductBadge";

export default function ProductPage({ product }) {
  return (
    <section
      aria-label="Product Detail"
      className="bg-slate-50 py-8 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* ================= GALLERY ================= */}

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ProductGallery images={product.other_images} />
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}

          <div className="space-y-8 lg:col-span-4">

            {/* Badge */}

            {product.discount_percentage > 0 && (
              <Badge text="SALE" tone="black" />
            )}

            {/* Title */}

            <div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 lg:text-4xl">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="mt-3 text-base leading-7 text-slate-500">
                  {product.subtitle}
                </p>
              )}

            </div>

            {/* Price */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <div className="flex items-end gap-3">

                <span className="text-4xl font-black text-slate-900">
                  ₹{product.price}
                </span>

                {product.original_price && (
                  <span className="pb-1 text-lg text-slate-400 line-through">
                    ₹{product.original_price}
                  </span>
                )}

              </div>

              {product.discount_percentage > 0 && (
                <div className="mt-4 inline-flex rounded-full bg-[#01A49E]/10 px-4 py-2 text-sm font-semibold text-[#01A49E]">
                  Save {product.discount_percentage}%
                </div>
              )}

            </div>

            {/* Trust */}

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <Truck
                  className="mb-3 text-[#01A49E]"
                  size={22}
                />

                <h4 className="font-semibold text-slate-900">
                  Free Delivery
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Fast & secure shipping.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <ShieldCheck
                  className="mb-3 text-[#01A49E]"
                  size={22}
                />

                <h4 className="font-semibold text-slate-900">
                  Secure Payment
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Safe encrypted checkout.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <RotateCcw
                  className="mb-3 text-[#01A49E]"
                  size={22}
                />

                <h4 className="font-semibold text-slate-900">
                  Easy Returns
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Hassle-free return policy.
                </p>

              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">

                <BadgeCheck
                  className="mb-3 text-[#01A49E]"
                  size={22}
                />

                <h4 className="font-semibold text-slate-900">
                  Genuine Product
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  100% authentic guarantee.
                </p>

              </div>

            </div>

            {/* Product Options */}

            <ProductOptions product={product} />

            {/* Why You'll Love It */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <h3 className="mb-5 text-lg font-bold text-slate-900">
                Why You'll Love It
              </h3>

              <div className="space-y-4">

                <div className="flex gap-3">

                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#01A49E]" />

                  <p className="text-slate-600">
                    Premium quality materials built to last.
                  </p>

                </div>

                <div className="flex gap-3">

                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#01A49E]" />

                  <p className="text-slate-600">
                    Carefully crafted for everyday reliability.
                  </p>

                </div>

                <div className="flex gap-3">

                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#01A49E]" />

                  <p className="text-slate-600">
                    Trusted quality with excellent customer support.
                  </p>

                </div>

              </div>

            </div>

            {/* Product Details */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <h3 className="mb-5 text-lg font-bold text-slate-900">
                Product Details
              </h3>

              <div className="space-y-4">

                {product.brand && (
                  <div className="flex justify-between border-b border-slate-100 pb-3">

                    <span className="text-slate-500">
                      Brand
                    </span>

                    <span className="font-semibold text-slate-900">
                      {product.brand}
                    </span>

                  </div>
                )}

                {product.sku && (
                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      SKU
                    </span>

                    <span className="font-semibold text-slate-900">
                      {product.sku}
                    </span>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* ================= PURCHASE ================= */}

          <aside className="lg:col-span-3">

            <div className="sticky top-24">

              <PurchaseBox product={product} />

            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}
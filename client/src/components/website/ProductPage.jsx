import {
  Truck,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  BadgePercent,
  Check,
  Sparkles,
  ClipboardList,
  ShoppingCart,
} from "lucide-react";

import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import PurchaseBox from "./PurchaseBox";
import Badge from "./ProductBadge";

export default function ProductPage({ product }) {
  return (
    <section
      aria-label="Product Detail"
      className="bg-slate-50 pt-8 pb-28 lg:pt-14 lg:pb-14"
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

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 lg:text-xl">
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

              <div className="flex flex-wrap items-end gap-3">

                <span className="text-xl font-black text-slate-900">
                  ₹{product.price}
                </span>

                {product.original_price && (
                  <span className="pb-1 text-lg text-slate-400 line-through">
                    ₹{product.original_price}
                  </span>
                )}

                {product.discount_percentage > 0 && (
                  <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-[#01A49E]/10 px-3 py-1 text-xs font-bold text-[#01A49E]">
                    <BadgePercent size={13} />
                    {product.discount_percentage}% OFF
                  </span>
                )}

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Inclusive of all taxes
              </p>

            </div>

            {/* Trust */}

            <div className="grid grid-cols-2 gap-4">

              <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#01A49E]/10">
                  <Truck className="text-[#01A49E]" size={20} />
                </div>

                <h4 className="font-semibold text-slate-900">
                  Free Delivery
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Fast & secure shipping.
                </p>

              </div>

              <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#01A49E]/10">
                  <ShieldCheck className="text-[#01A49E]" size={20} />
                </div>

                <h4 className="font-semibold text-slate-900">
                  Secure Payment
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Safe encrypted checkout.
                </p>

              </div>

              <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#01A49E]/10">
                  <RotateCcw className="text-[#01A49E]" size={20} />
                </div>

                <h4 className="font-semibold text-slate-900">
                  Easy Returns
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Hassle-free return policy.
                </p>

              </div>

              <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#01A49E]/10">
                  <BadgeCheck className="text-[#01A49E]" size={20} />
                </div>

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

              <div className="mb-5 flex items-center gap-2">
                <Sparkles size={18} className="text-[#01A49E]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Why You'll Love It
                </h3>
              </div>

              <div className="space-y-4">

                <div className="flex gap-3">

                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#01A49E]/10">
                    <Check size={13} className="text-[#01A49E]" />
                  </div>

                  <p className="text-slate-600">
                    Premium quality materials built to last.
                  </p>

                </div>

                <div className="flex gap-3">

                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#01A49E]/10">
                    <Check size={13} className="text-[#01A49E]" />
                  </div>

                  <p className="text-slate-600">
                    Carefully crafted for everyday reliability.
                  </p>

                </div>

                <div className="flex gap-3">

                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#01A49E]/10">
                    <Check size={13} className="text-[#01A49E]" />
                  </div>

                  <p className="text-slate-600">
                    Trusted quality with excellent customer support.
                  </p>

                </div>

              </div>

            </div>

            {/* Product Details */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <div className="mb-5 flex items-center gap-2">
                <ClipboardList size={18} className="text-[#01A49E]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Product Details
                </h3>
              </div>

              <div className="divide-y divide-slate-100">

                {product.brand && (
                  <div className="flex justify-between py-3 first:pt-0 last:pb-0">

                    <span className="text-slate-500">
                      Brand
                    </span>

                    <span className="font-semibold text-slate-900">
                      {product.brand}
                    </span>

                  </div>
                )}

                {product.sku && (
                  <div className="flex justify-between py-3 first:pt-0 last:pb-0">

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

            <div
              id="purchase-box"
              className="scroll-mt-24 lg:sticky lg:top-24"
            >

              <PurchaseBox product={product} />

            </div>

          </aside>

        </div>

      </div>

      {/* ============ MOBILE STICKY BUY BAR ============ */}

      <a
        href="#purchase-box"
        className="
          fixed inset-x-4 bottom-4 z-40
          flex items-center justify-between gap-4
          rounded-2xl bg-slate-300
          px-5 py-3.5
          text-white
          shadow-xl shadow-slate-900/20
          lg:hidden
        "
      >
        <div>
          <p className="text-[11px] text-slate-300">Price</p>
          <p className="text-lg font-bold leading-none">
            ₹{product.price}
          </p>
        </div>

        <span className="flex items-center gap-1.5 rounded-xl bg-[#01A49E] px-4 py-2.5 text-sm font-semibold">
          <ShoppingCart size={16} />
          Buy Now
        </span>
      </a>

    </section>
  );
}

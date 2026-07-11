"use client";

import { useMemo, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function PurchaseBox({ product }) {
  const [qty, setQty] = useState(1);

  const inStock = Boolean(product.stock);
  const price = Number(product.price || 0);

  const subtotal = useMemo(() => {
    return (price * qty).toFixed(2);
  }, [price, qty]);

  const savings = useMemo(() => {
    if (!product.original_price) return 0;
    return ((product.original_price - price) * qty).toFixed(2);
  }, [product.original_price, price, qty]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      {/* Header */}
      <div className="border-b border-slate-100 p-6">

        <div className="flex items-start justify-between gap-3">

          <div>
            <div className="flex flex-wrap items-end gap-2">
              <p className="text-xl font-bold text-slate-900">
                ₹{subtotal}
              </p>

              {product.original_price && (
                <p className="pb-1 text-sm text-slate-400 line-through">
                  ₹{(product.original_price * qty).toFixed(2)}
                </p>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Inclusive of all taxes
            </p>

            {savings > 0 && (
              <p className="mt-1 text-xs font-semibold text-[#01A49E]">
                You save ₹{savings}
              </p>
            )}
          </div>

          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              inStock
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                inStock ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

        </div>

      </div>

      <div className="p-6 space-y-6">

        {/* Quantity */}

        <div>

          <p className="mb-3 text-sm font-semibold text-slate-800">
            Quantity
          </p>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-1">

            <button
              onClick={() =>
                setQty((q) => Math.max(1, q - 1))
              }
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="
                flex h-11 w-11 items-center justify-center rounded-xl
                transition hover:bg-white
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
              "
            >
              <Minus size={18} />
            </button>

            <span className="text-lg font-semibold tabular-nums">
              {qty}
            </span>

            <button
              onClick={() =>
                setQty((q) => Math.min(99, q + 1))
              }
              disabled={qty >= 99}
              aria-label="Increase quantity"
              className="
                flex h-11 w-11 items-center justify-center rounded-xl
                transition hover:bg-white
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent
              "
            >
              <Plus size={18} />
            </button>

          </div>

        </div>

        {/* Buttons */}

        <div className="space-y-3">

          <button
            disabled={!inStock}
            className="
            flex h-14 w-full items-center justify-center gap-2
            rounded-2xl
            bg-[#01A49E]
            text-white
            font-semibold
            transition-all
            duration-300
            hover:bg-[#01857F]
            hover:shadow-lg
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <button
            disabled={!inStock}
            className="
            flex h-14 w-full items-center justify-center gap-2
            rounded-2xl
            border
            border-[#01A49E]/30
            bg-[#01A49E]/5
            font-semibold
            text-[#01A49E]
            transition-all
            duration-300
            hover:bg-[#01A49E]/10
            hover:border-[#01A49E]
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          >
            <Zap size={19} />
            Buy Now
          </button>

        </div>

        {/* Benefits */}

        <div className="rounded-2xl bg-slate-50 p-4">

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Truck
                  size={18}
                  className="text-[#01A49E]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Free Delivery
                </p>

                <p className="text-xs text-slate-500">
                  Fast & secure shipping
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <RotateCcw
                  size={18}
                  className="text-[#01A49E]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Easy Returns
                </p>

                <p className="text-xs text-slate-500">
                  Hassle-free return policy
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <ShieldCheck
                  size={18}
                  className="text-[#01A49E]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Secure Checkout
                </p>

                <p className="text-xs text-slate-500">
                  100% protected payments
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

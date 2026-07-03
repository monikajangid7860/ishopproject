"use client";

import { useState, useMemo } from "react";

/**
 * Sticky purchase box
 * Assumes NORMALIZED product object
 */
export default function PurchaseBox({ product }) {
  const [qty, setQty] = useState(1);

  const inStock = Boolean(product.stock);
  const price = Number(product.price || 0);

  const subtotal = useMemo(() => {
    return (price * qty).toFixed(2);
  }, [price, qty]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
      {/* PRICE SUMMARY */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Total price
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            ₹{subtotal}
          </p>
          <p className="text-xs text-slate-400">
            Incl. taxes (est.)
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Rating</p>
          <p className="mt-1 text-sm font-medium text-emerald-600">
            ★★★★★
          </p>
        </div>
      </div>

      {/* STOCK + QTY */}
      <div className="flex items-center justify-between gap-3">
        <span
          className={`text-sm font-medium ${
            inStock ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>

        <div className="inline-flex items-center rounded-md border overflow-hidden">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-sm hover:bg-slate-50"
          >
            −
          </button>

          <span className="px-4 py-2 text-sm min-w-[2rem] text-center">
            {qty}
          </span>

          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="px-3 py-2 text-sm hover:bg-slate-50"
          >
            +
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="space-y-3">
        <button
          disabled={!inStock}
          className="
            w-full rounded-lg py-3
            bg-emerald-600 text-white
            font-medium
            hover:bg-emerald-700
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Add to cart
        </button>

        <button
          className="
            w-full rounded-lg py-3
            border border-slate-200
            font-medium
            flex items-center justify-center gap-2
            hover:bg-slate-50
          "
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4 7h3l1 7"
              stroke="#111827"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 7h8l-1 7h-8z"
              stroke="#111827"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Buy with PayPal
        </button>
      </div>

      {/* META */}
      <div className="text-sm text-slate-500 space-y-1">
        <p>
          Ships from:{" "}
          <span className="font-medium text-slate-700">
            United States
          </span>
        </p>
        <p>
          Warranty:{" "}
          <span className="font-medium text-slate-700">
            1 year
          </span>
        </p>
      </div>

      {/* FOOTER */}
      <div className="pt-3 border-t flex items-center justify-between text-sm">
        <span className="text-slate-500">Have a question?</span>
        <span className="font-semibold text-slate-900">
          (+025) 3886 25 16
        </span>
      </div>

      {/* TRUST */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            fill="#f8fafc"
          />
          <path
            d="M8 12h8"
            stroke="#64748b"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        Guaranteed Safe Checkout
      </div>
    </div>
  );
}

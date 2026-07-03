"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function OrderSummary({ items = [] }) {
  const router = useRouter();

  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = items.reduce((sum, it) => {
      const unitPrice = Number(
        it.original_price ?? it.price ?? 0
      );
      const qty = Number(it.quantity ?? 1);
      return sum + unitPrice * qty;
    }, 0);

    const shipping = subtotal > 0 ? 20 : 0;
    const tax = +(subtotal * 0.1).toFixed(2);
    const total = +(subtotal + shipping + tax).toFixed(2);

    return { subtotal, shipping, tax, total };
  }, [items]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push("/checkout");
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <h4 className="text-sm font-semibold text-gray-900 mb-4">
        Order Summary
      </h4>

      {/* BREAKDOWN */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            ${shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span className="font-medium text-gray-900">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      {/* TOTAL + CTA */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Total
          </p>
          <p className="text-lg font-semibold text-gray-900">
            ${total.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="
            rounded-md bg-emerald-600 px-4 py-2
            text-sm font-medium text-white
            hover:bg-emerald-700
            focus:outline-none focus:ring-2 focus:ring-emerald-300
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

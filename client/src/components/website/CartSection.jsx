"use client";

import { useSelector } from "react-redux";
import ProductRow from "./ProductRow.jsx";
import OrderSummary from "./OrderSummary.jsx";
import Badge from "./Badge";

export default function CartSection() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <section
      aria-label="Shopping cart"
      className="bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">
            
            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  {cartItems.length} item{cartItems.length !== 1 && "s"}
                </p>
              </div>

              <Badge text="SAVE 10%" tone="green" />
            </div>

            {/* CART LIST */}
            <div className="divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-gray-500">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="py-4">
                    <ProductRow item={item} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-80 shrink-0">
            <div
              className="
                sticky top-24
                bg-white
                border border-gray-200
                rounded-lg
                p-4 sm:p-5
              "
            >
              <OrderSummary items={cartItems} />
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

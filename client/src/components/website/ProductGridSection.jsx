"use client";

import { useState } from "react";
import ProductCard2 from "./ProductCard2.jsx";

export default function ProductGridSection({ products, imgurl }) {
  const ITEMS_PER_PAGE = 8;

  const safeProducts = Array.isArray(products) ? products : [];
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(safeProducts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visibleProducts = safeProducts.slice(start, end);

  return (
    /* 🔒 Prevent horizontal overflow */
    <section className="max-w-full overflow-x-hidden border-t-2 border-gray-200 pt-10 px-2 md:px-4">
      <h2 className="text-2xl font-semibold mb-6 px-1">All Products</h2>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-10 max-w-full">
        {visibleProducts.map((p) => (
          <div key={p._id} className="min-w-0">
            <ProductCard2 product={p} imgurl={imgurl} />
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap px-2">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            className={`px-2 py-1 text-xs rounded border ${
              page === 1
                ? "text-gray-300 border-gray-200"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const active = pageNum === page;

            return (
              <button
                key={idx}
                onClick={() => setPage(pageNum)}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm border ${
                  active
                    ? "bg-[#00C263] text-white border-[#00C263]"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            className={`px-2 py-1 text-xs rounded border ${
              page === totalPages
                ? "text-gray-300 border-gray-200"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

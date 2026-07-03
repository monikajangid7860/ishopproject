// src/components/categories/CategoryBlockClient.jsx
"use client";

import { useState } from "react";
import ProductCircleCard from "./ProductCircleCard";

/**
 * Client component: mobile interaction only.
 * - Renders toggle button visible on small screens to expand/collapse the icon grid.
 */
export default function CategoryBlockClient({ block }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">{block.title}</h3>
        <button
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100"
        >
          {open ? "Collapse" : "View All"}
        </button>
      </div>

      <div className={`transition-max-h duration-300 overflow-hidden ${open ? "max-h-[400px]" : "max-h-0"}`}>
        <div className="grid grid-cols-2 gap-4">
          {block.items.map((it) => (
            <ProductCircleCard key={it.id} item={it} />
          ))}
        </div>
      </div>
    </div>
  );
}

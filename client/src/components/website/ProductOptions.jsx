"use client";

import { useState } from "react";
import Badge from "./ProductBadge.jsx";

/**
 * Handles color swatches, memory selection and small promotions.
 * Local state only.
 */
export default function ProductOptions({ product }) {
  
   // default middle option

  return (
    <div>
      

      <div className="mt-4 p-3 rounded-md bg-[#f8fffb] border border-emerald-50 text-sm text-slate-700 flex items-start gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#ecfdf5"/>
          <path d="M8 12h8" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8v8" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div>
          <div className="font-medium">Bundle Deal</div>
          <div className="text-xs text-slate-600">Buy 2 boxes get a Snack Tray — limited time</div>
        </div>
      </div>
    </div>
  );
}

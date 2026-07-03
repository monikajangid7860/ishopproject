// src/components/website/AddToCartButton.jsx
"use client";

import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      onClick={() => {
        setAdded(true);
        
      }}
      className={`
        flex-1 text-sm font-semibold px-3 py-2 rounded-full transition 
        ${added ? "bg-green-500 text-white" : "bg-[#01A49E] text-white"}
      `}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}

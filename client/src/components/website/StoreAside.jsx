"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/api-calls/category";
import { getBrands } from "@/api-calls/brand";
import { getColors } from "@/api-calls/color";

import CategoryList from "./CategoryList";
import FilterControlsDesktop from "./FilterControlsDesktop";
import FilterControlsMobile from "./FilterControlsMobile";

export default function StoreAside() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryJSON = await getCategories({ status: true });
        setCategories(categoryJSON?.categories || []);

        const brandJSON = await getBrands({ status: true });
        setBrands(brandJSON?.brands || []);

        const colorJSON = await getColors({ status: true });
        setColors(colorJSON?.colors || []);
      } catch (error) {
        console.error("StoreAside fetch error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-w-0">
      {/* MOBILE FILTER BAR */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-2">
        <FilterControlsMobile
          categories={categories}
          brands={brands}
          colors={colors}
        />
      </div>

      {/* DESKTOP ASIDE */}
      <aside className="hidden lg:block sticky top-20 space-y-6">
        
        {/* FILTER CARD */}
        <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
          <FilterControlsDesktop
            categories={categories}
            brands={brands}
            colors={colors}
          />
        </div>

        {/* BANNER */}
        <div className="overflow-hidden rounded border border-gray-200">
          <img
            src="/images/storeimg.png"
            alt="Store Banner"
            className="w-full object-cover"
          />
        </div>
      </aside>
    </div>
  );
}

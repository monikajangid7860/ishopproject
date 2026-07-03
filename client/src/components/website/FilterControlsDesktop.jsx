"use client";

import { useState, useEffect, useRef } from "react";
import FilterCheckbox from "./FilterCheckbox.jsx";
import CategoryList from "./CategoryList.jsx";
import {
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";

const DEFAULT_PRICE = {
  min: 0,
  max: 10000,
  from: 0,
  to: 10000,
};

function makeSlug(value = "") {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function FilterControlsDesktop({
  categories = [],
  brands = [],
  colors = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRenderRef = useRef(true);

  // ------------------------------------------------
  // FILTER STATE
  // ------------------------------------------------
  const [filters, setFilters] = useState({
    selectedCategory: null,
    brands: [],
    colors: [],
    priceRange: DEFAULT_PRICE,
  });

  // ------------------------------------------------
  // 1️⃣ RESET FILTERS WHEN CATEGORY PATH CHANGES
  // (NO router.replace here ❗)
  // ------------------------------------------------
  useEffect(() => {
    setFilters({
      selectedCategory: null,
      brands: [],
      colors: [],
      priceRange: DEFAULT_PRICE,
    });
  }, [pathname]);

  // ------------------------------------------------
  // 2️⃣ HYDRATE FROM URL (GUARDED)
  // ------------------------------------------------
  useEffect(() => {
    const urlBrands = searchParams.get("brands")?.split("_") || [];
    const urlColors = searchParams.get("colors")?.split("_") || [];
    const urlPrice = searchParams.get("price");

    setFilters((prev) => {
      const sameBrands =
        JSON.stringify(prev.brands) === JSON.stringify(urlBrands);
      const sameColors =
        JSON.stringify(prev.colors) === JSON.stringify(urlColors);

      if (sameBrands && sameColors) return prev; // ⛔ prevent loop

      return {
        ...prev,
        brands: urlBrands,
        colors: urlColors,
        priceRange: urlPrice
          ? {
              ...prev.priceRange,
              from: Number(urlPrice.split("_")[0]),
              to: Number(urlPrice.split("_")[1]),
            }
          : prev.priceRange,
      };
    });
  }, [searchParams]);

  // ------------------------------------------------
  // 3️⃣ PUSH FILTERS → URL (ONE WAY)
  // ------------------------------------------------
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const query = new URLSearchParams();

    if (filters.brands.length) {
      query.set("brands", filters.brands.join("_"));
    }

    if (filters.colors.length) {
      query.set("colors", filters.colors.join("_"));
    }

    if (filters.priceRange.from || filters.priceRange.to) {
      query.set(
        "price",
        `${filters.priceRange.from}_${filters.priceRange.to}`
      );
    }

    router.replace(`${pathname}?${query.toString()}`, {
      scroll: false,
    });
  }, [filters.brands, filters.colors, filters.priceRange]);

  // ------------------------------------------------
  // TOGGLES
  // ------------------------------------------------
  function toggleBrand(slug) {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(slug)
        ? prev.brands.filter((s) => s !== slug)
        : [...prev.brands, slug],
    }));
  }

  function toggleColor(slug) {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(slug)
        ? prev.colors.filter((s) => s !== slug)
        : [...prev.colors, slug],
    }));
  }

  function resetAll() {
    setFilters({
      selectedCategory: null,
      brands: [],
      colors: [],
      priceRange: DEFAULT_PRICE,
    });

    router.replace(pathname, { scroll: false });
  }

  // ------------------------------------------------
  // UI
  // ------------------------------------------------
  return (
    <div className="hidden lg:block bg-[#eeeff6] rounded-2xl shadow-sm p-4 h-full overflow-y-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-slate-800">FILTERS</h3>
        <button
          onClick={resetAll}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          Reset All
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="mb-4">
        <CategoryList
          categories={categories}
          selected={filters.selectedCategory}
          onSelect={(cat) =>
            setFilters((s) => ({ ...s, selectedCategory: cat }))
          }
        />
      </div>

      {/* BRANDS */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-slate-700 mb-2">By Brands</h4>
        <div className="bg-[#eeeff6] border border-gray-50 rounded-lg p-2">
          {brands.map((b) => (
            <FilterCheckbox
              key={b._id}
              id={`brand-${b.slug}`}
              label={b.name}
              checked={filters.brands.includes(b.slug)}
              onChange={() => toggleBrand(b.slug)}
            />
          ))}
        </div>
      </div>

      {/* COLORS */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-slate-700 mb-2">By Color</h4>
        <div className="bg-[#eeeff6] border border-gray-50 rounded-lg p-2">
          {colors.map((c) => {
            const colorSlug = c.slug || makeSlug(c.name);
            return (
              <FilterCheckbox
                key={c._id}
                id={`color-${colorSlug}`}
                label={c.name}
                checked={filters.colors.includes(colorSlug)}
                onChange={() => toggleColor(colorSlug)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

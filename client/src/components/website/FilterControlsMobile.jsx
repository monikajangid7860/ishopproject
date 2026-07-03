"use client";

import { useEffect, useState } from "react";
import {
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import FilterCheckbox from "./FilterCheckbox.jsx";
import CategoryList from "./CategoryList.jsx";

function makeSlug(value = "") {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

export default function FilterControlsMobile({
  categories = [],
  brands = [],
  colors = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  /* ---------------- URL DERIVED STATE ---------------- */

  const selectedBrands =
    searchParams.get("brands")?.split("_") || [];

  const selectedColors =
    searchParams.get("colors")?.split("_") || [];

  const sortBy = Number(searchParams.get("sortby")) || 1;
  const limit = Number(searchParams.get("limit")) || 2;

  /* ---------------- URL HELPERS ---------------- */

  function updateParam(key, values) {
    const params = new URLSearchParams(searchParams.toString());

    if (!values.length) params.delete(key);
    else params.set(key, values.join("_"));

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function updateSingleParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 0 || value === null) params.delete(key);
    else params.set(key, value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function toggleBrand(slug) {
    updateParam(
      "brands",
      selectedBrands.includes(slug)
        ? selectedBrands.filter((s) => s !== slug)
        : [...selectedBrands, slug]
    );
  }

  function toggleColor(slug) {
    updateParam(
      "colors",
      selectedColors.includes(slug)
        ? selectedColors.filter((s) => s !== slug)
        : [...selectedColors, slug]
    );
  }

  function resetAll() {
    router.replace(pathname, { scroll: false });
  }

  /* ---------------- BODY SCROLL LOCK ---------------- */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* ================= BOTTOM BAR ================= */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t">
        <div className="p-3">
          <button
            onClick={() => setOpen(true)}
            className="
              w-full rounded-xl bg-teal-600 py-3
              text-sm font-semibold text-white
              shadow-sm active:scale-[0.99]
            "
          >
            Filter & Sort
          </button>
        </div>
      </div>

      {/* ================= BOTTOM SHEET ================= */}
      {open && (
        <div className="fixed inset-0 z-[9999]">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* SHEET */}
          <div className="absolute inset-x-0 bottom-0 h-[90vh] bg-white rounded-t-2xl flex flex-col overflow-hidden shadow-2xl">
            
            {/* HANDLE */}
            <div className="flex justify-center pt-2">
              <span className="h-1.5 w-10 rounded-full bg-gray-300" />
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-base font-semibold text-gray-900">
                Filters & Sorting
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">

              {/* SORT BY */}
              <div>
  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
    Sort By
  </h4>

  <div className="grid grid-cols-2 gap-2">
    {[
      { label: "Latest", value: 1 },
      { label: "Oldest", value: 2 },
      { label: "Low → High", value: 3 },
      { label: "High → Low", value: 4 },
      { label: "A → Z", value: 5 },
      { label: "Z → A", value: 6 },
    ].map((opt) => {
      const active = sortBy === opt.value;

      return (
        <button
          key={opt.value}
          onClick={() => updateSingleParam("sortby", opt.value)}
          className={`
            rounded-lg border px-2.5 py-2 text-xs font-medium
            leading-tight
            ${
              active
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-gray-50 text-gray-700 border-gray-200"
            }
          `}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
</div>


              {/* LIMIT */}
              <div>
  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
    Show
  </h4>

  <div className="grid grid-cols-4 gap-2">
    {[2, 4, 8, 0].map((val) => {
      const active = limit === val;

      return (
        <button
          key={val}
          onClick={() => updateSingleParam("limit", val)}
          className={`
            rounded-lg border py-2 text-xs font-medium
            leading-tight
            ${
              active
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-gray-50 text-gray-700 border-gray-200"
            }
          `}
        >
          {val === 0 ? "All" : val}
        </button>
      );
    })}
  </div>
</div>


              {/* CATEGORY */}
              <CategoryList
                categories={categories}
                selected={null}
                onSelect={() => {}}
              />

              {/* BRANDS */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Brands
                </h4>
                <div className="space-y-3">
                  {brands.map((b) => (
                    <FilterCheckbox
                      key={b.slug}
                      label={b.name}
                      checked={selectedBrands.includes(b.slug)}
                      onChange={() => toggleBrand(b.slug)}
                    />
                  ))}
                </div>
              </div>

              {/* COLORS */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Colors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => {
                    const slug = c.slug || makeSlug(c.name);
                    const active = selectedColors.includes(slug);

                    return (
                      <button
                        key={slug}
                        onClick={() => toggleColor(slug)}
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-medium border
                          ${
                            active
                              ? "bg-teal-600 text-white border-teal-600"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        `}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t bg-white p-4 flex gap-3">
              <button
                onClick={resetAll}
                className="
                  flex-1 rounded-xl border border-gray-200
                  py-3 text-sm font-medium
                  active:scale-[0.99]
                "
              >
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="
                  flex-1 rounded-xl bg-teal-600 py-3
                  text-sm font-semibold text-white
                  shadow-sm active:scale-[0.99]
                "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPACER */}
      <div className="lg:hidden h-20" />
    </>
  );
}

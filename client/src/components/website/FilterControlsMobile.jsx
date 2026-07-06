"use client";

import { useEffect, useState } from "react";
import {
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import {
  SlidersHorizontal,
  X,
  Clock,
  History,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ArrowDownAZ,
  ArrowUpZA,
  RotateCcw,
  Check,
} from "lucide-react";
import FilterCheckbox from "./FilterCheckbox.jsx";
import CategoryList from "./CategoryList.jsx";

function makeSlug(value = "") {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

const SORT_OPTIONS = [
  { label: "Latest", value: 1, icon: Clock },
  { label: "Oldest", value: 2, icon: History },
  { label: "Low → High", value: 3, icon: ArrowDownWideNarrow },
  { label: "High → Low", value: 4, icon: ArrowUpWideNarrow },
  { label: "A → Z", value: 5, icon: ArrowDownAZ },
  { label: "Z → A", value: 6, icon: ArrowUpZA },
];

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

  const activeCount =
    selectedBrands.length +
    selectedColors.length +
    (sortBy !== 1 ? 1 : 0) +
    (limit !== 2 ? 1 : 0);

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
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-4 pb-4">
        <button
          onClick={() => setOpen(true)}
          className="
            relative w-full flex items-center justify-center gap-2
            rounded-2xl bg-[#0F1115] py-3.5
            text-sm font-semibold text-white tracking-wide
            shadow-[0_8px_24px_-8px_rgba(15,17,21,0.5)]
            active:scale-[0.98] transition-transform
          "
        >
          <SlidersHorizontal size={16} strokeWidth={2.25} />
          Filter & Sort
          {activeCount > 0 && (
            <span
              className="
                absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center
                rounded-full bg-[#FF5A1F] text-[11px] font-bold text-white
                ring-2 ring-white tabular-nums
              "
            >
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* ================= BOTTOM SHEET ================= */}
      {open && (
        <div className="fixed inset-0 z-[9999]">
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fadeIn_.15s_ease-out]"
            onClick={() => setOpen(false)}
          />

          {/* SHEET */}
          <div
            className="
              absolute inset-x-0 bottom-0 h-[90vh] bg-white
              rounded-t-[28px] flex flex-col overflow-hidden
              shadow-[0_-8px_40px_-4px_rgba(0,0,0,0.25)]
              animate-[slideUp_.2s_ease-out]
            "
          >
            {/* HANDLE */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <span className="h-1 w-9 rounded-full bg-zinc-200" />
            </div>

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 shrink-0">
              <div>
                <span className="text-base font-semibold text-[#0F1115]">
                  Filters & Sorting
                </span>
                {activeCount > 0 && (
                  <span className="ml-2 text-xs font-medium text-[#FF5A1F]">
                    {activeCount} active
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="
                  flex h-8 w-8 items-center justify-center rounded-full
                  bg-zinc-100 text-zinc-500 active:scale-95 transition-transform
                "
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">

              {/* SORT BY */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400 mb-3">
                  Sort By
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {SORT_OPTIONS.map((opt) => {
                    const active = sortBy === opt.value;
                    const Icon = opt.icon;

                    return (
                      <button
                        key={opt.value}
                        onClick={() => updateSingleParam("sortby", opt.value)}
                        className={`
                          flex items-center gap-2 rounded-xl border px-3 py-2.5
                          text-xs font-medium leading-tight transition-colors
                          ${
                            active
                              ? "bg-[#0F1115] text-white border-[#0F1115]"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200 active:bg-zinc-100"
                          }
                        `}
                      >
                        <Icon
                          size={14}
                          strokeWidth={2.25}
                          className={active ? "text-[#FF5A1F]" : "text-zinc-400"}
                        />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LIMIT */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400 mb-3">
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
                          rounded-xl border py-2.5 text-xs font-semibold
                          transition-colors
                          ${
                            active
                              ? "bg-[#0F1115] text-white border-[#0F1115]"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200 active:bg-zinc-100"
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
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400 mb-3">
                  Category
                </h4>
                <CategoryList
                  categories={categories}
                  selected={null}
                  onSelect={() => {}}
                />
              </div>

              {/* BRANDS */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400 mb-3">
                  Brands
                </h4>
                <div className="space-y-1">
                  {brands.map((b) => {
                    const active = selectedBrands.includes(b.slug);
                    return (
                      <label
                        key={b.slug}
                        onClick={() => toggleBrand(b.slug)}
                        className={`
                          flex items-center justify-between gap-3 rounded-xl px-3 py-2.5
                          cursor-pointer transition-colors
                          ${active ? "bg-zinc-50" : "hover:bg-zinc-50/60"}
                        `}
                      >
                        <span className="text-sm text-zinc-700">{b.name}</span>
                        <span
                          className={`
                            flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                            transition-colors
                            ${
                              active
                                ? "bg-[#0F1115] border-[#0F1115]"
                                : "border-zinc-300 bg-white"
                            }
                          `}
                        >
                          {active && (
                            <Check size={12} strokeWidth={3} className="text-white" />
                          )}
                        </span>
                        {/* keep original checkbox in DOM but visually hidden, in case
                            FilterCheckbox carries its own accessible input semantics */}
                        <span className="sr-only">
                          <FilterCheckbox
                            label={b.name}
                            checked={active}
                            onChange={() => toggleBrand(b.slug)}
                          />
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* COLORS */}
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400 mb-3">
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
                          flex items-center gap-1.5 rounded-full border pl-2.5 pr-3 py-1.5
                          text-xs font-medium transition-colors
                          ${
                            active
                              ? "bg-[#0F1115] text-white border-[#0F1115]"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200"
                          }
                        `}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex || c.name?.toLowerCase() }}
                        />
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t border-zinc-100 bg-white p-4 flex gap-3 shrink-0">
              <button
                onClick={resetAll}
                className="
                  flex-1 flex items-center justify-center gap-2 rounded-xl
                  border border-zinc-200 py-3.5 text-sm font-medium text-zinc-600
                  active:scale-[0.98] transition-transform
                "
              >
                <RotateCcw size={14} strokeWidth={2.25} />
                Reset
              </button>
              <button
                onClick={() => setOpen(false)}
                className="
                  flex-1 rounded-xl bg-[#0F1115] py-3.5
                  text-sm font-semibold text-white
                  shadow-sm active:scale-[0.98] transition-transform
                "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
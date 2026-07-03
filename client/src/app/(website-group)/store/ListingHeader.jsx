"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ListingHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ DERIVE values from URL
  const sortBy = Number(searchParams.get("sortby")) || 1;
  const limit = Number(searchParams.get("limit")) || 2;

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 0 || value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="hidden lg:flex items-center justify-between gap-6 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">

      {/* LEFT: RESULT INFO */}
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-900">1–40</span> of{" "}
        <span className="font-medium text-gray-900">120</span> results
      </p>

      {/* RIGHT: CONTROLS */}
      <div className="flex items-center gap-4">

        {/* LIMIT */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            Show
          </span>
          <select
            value={limit}
            onChange={(e) => updateParam("limit", Number(e.target.value))}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 hover:border-gray-300 transition"
          >
            <option className="hover:background-gray" value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={0}>All</option>
          </select>
        </div>

        {/* SORT */}
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            Sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => updateParam("sortby", Number(e.target.value))}
            className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value={1}>Latest</option>
            <option value={2}>Oldest</option>
            <option value={3}>Low to high</option>
            <option value={4}>High to low</option>
            <option value={5}>A to Z</option>
            <option value={6}>Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}

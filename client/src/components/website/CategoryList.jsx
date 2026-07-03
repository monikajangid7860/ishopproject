"use client";
import Link from "next/link";
import React from "react";

export default function CategoryList({
  categories = [],
  selected = null,
  onSelect
}) {
  const isAllActive = selected === null;

  return (
    <ul className="space-y-1 hidden lg:block">
      
      {/* ALL CATEGORIES */}
      <Link href="/store">
        <button
          onClick={() => onSelect?.(null)}
          className={
            `w-full text-left text-sm py-1 px-2 rounded-md
             hover:bg-slate-50 focus:outline-none
             focus-visible:ring-2 focus-visible:ring-slate-200 ` +
            (isAllActive
              ? "font-semibold text-slate-800 bg-[#eeeff6] shadow-sm"
              : "text-slate-600")
          }
        >
          All Categories
        </button>
      </Link>

      {/* CATEGORY LIST */}
      {categories.map((cat) => {
        const isActive = selected?._id === cat._id;

        return (
          <Link key={cat._id} href = {`/store/${cat.slug}`}>
            <button
              onClick={() => onSelect?.(cat)}
              className={
                `w-full text-left text-sm py-1 px-2 rounded-md
                 hover:bg-slate-50 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-slate-200 ` +
                (isActive
                  ? "font-semibold text-slate-800 bg-[#eeeff6] shadow-sm"
                  : "text-slate-600")
              }
            >
              {cat.name}
            </button>
          </Link>
        );
      })}
    </ul>
  );
}

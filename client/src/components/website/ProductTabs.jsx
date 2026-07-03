"use client";

import { useState } from "react";
import DescriptionContent from "./DiscriptionContent";
import ReviewsContent from "./ReviewsContent";
import AdditionalInfoContent from "./AdditionalInfoContent";

export default function ProductTabs({ description }) {
  const tabs = [
    "DESCRIPTION",
    "REVIEWS (5)",
    "ADDITIONAL INFORMATION",
  ];

  const [active, setActive] = useState("DESCRIPTION");

  const renderContent = () => {
    switch (active) {
      case "DESCRIPTION":
        return <DescriptionContent description={description} />;

      case "REVIEWS (5)":
        return <ReviewsContent />;

      case "ADDITIONAL INFORMATION":
        return <AdditionalInfoContent />;

      default:
        return null;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      <div className="bg-white rounded-xl border border-slate-200">
        {/* TAB HEADER */}
        <div className="flex gap-6 px-4 pt-4 border-b border-slate-200 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = active === tab;

            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative pb-3 text-sm font-medium whitespace-nowrap ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute left-0 -bottom-px h-0.5 w-full bg-[#01A49E]" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        <div className="p-5 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}

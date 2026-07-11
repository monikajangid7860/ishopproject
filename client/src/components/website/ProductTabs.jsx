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
    <section className="mx-auto max-w-7xl px-4 py-12">

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">

        {/* Header */}

        <div className="border-b border-slate-100 bg-slate-50/60">

          <div className="flex gap-3 overflow-x-auto p-4 scrollbar-hide">

            {tabs.map((tab) => {
              const isActive = active === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`
                    rounded-full
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    whitespace-nowrap
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-[#01A49E] text-white shadow-md"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-[#01A49E] hover:text-[#01A49E]"
                    }
                  `}
                >
                  {tab}
                </button>
              );
            })}

          </div>

        </div>

        {/* Content */}

        <div className="p-6 md:p-10">

          {renderContent()}

        </div>

      </div>

    </section>
  );
}
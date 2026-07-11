"use client";

import {
  Gift,
  BadgePercent,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ProductOptions() {
  return (
    <section className="space-y-5">

      {/* Section Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#01A49E]">
          Exclusive Offers
        </p>

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          Shop With Confidence
        </h3>
      </div>

      {/* Main Offer */}

      <div className="overflow-hidden rounded-3xl border border-[#01A49E]/15 bg-gradient-to-r from-[#01A49E]/5 via-white to-[#01A49E]/10">

        <div className="flex gap-4 p-6">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#01A49E] text-white shadow-md">
            <Gift size={26} />
          </div>

          <div>

            <h4 className="text-lg font-bold text-slate-900">
              Bundle Deal
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Buy <span className="font-semibold">2 boxes</span> and get a
              <span className="font-semibold text-[#01A49E]">
                {" "}FREE Snack Tray
              </span>.
            </p>

            <span className="mt-4 inline-flex rounded-full bg-[#01A49E]/10 px-4 py-1.5 text-xs font-semibold text-[#01A49E]">
              Limited Time Offer
            </span>

          </div>

        </div>

      </div>

      {/* Benefits */}

      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01A49E]/10">
            <BadgePercent
              className="text-[#01A49E]"
              size={22}
            />
          </div>

          <h4 className="font-semibold text-slate-900">
            Best Pricing
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Competitive prices with exciting seasonal offers.
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01A49E]/10">
            <ShieldCheck
              className="text-[#01A49E]"
              size={22}
            />
          </div>

          <h4 className="font-semibold text-slate-900">
            Genuine Product
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Carefully sourced with reliable quality assurance.
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01A49E]/10">
            <Sparkles
              className="text-[#01A49E]"
              size={22}
            />
          </div>

          <h4 className="font-semibold text-slate-900">
            Premium Experience
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Beautiful packaging with trusted customer support.
          </p>

        </div>

      </div>

    </section>
  );
}
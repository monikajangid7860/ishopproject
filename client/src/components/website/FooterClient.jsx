// app/components/footer/FooterClient.jsx
"use client";

import { useState } from "react";
import { Twitter, Facebook, Instagram, Pin } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function FooterClient({ categories }) {


    const currencyOptions = ["USD", "EUR", "INR"];
  const languages = [
    { code: "eng", label: "Eng", flag: "/images/us.png" },
    { code: "esp", label: "Esp", flag: "/images/es.png" },
    { code: "fr",  label: "Fr",  flag: "/images/fr.png" },
  ];
      const [currency, setCurrency] = useState(currencyOptions[0] ?? "USD");
  const [lang, setLang] = useState(languages[0]?.code ?? "eng");

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <footer className="w-full overflow-x-hidden bg-white border-t pt-14 pb-10 text-[14px] text-gray-700">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

        {/* COLUMN 1 */}
        <div className="min-w-0">
          <h2 className="font-semibold text-[15px] wrap-break-words">
            SWOO - 1ST NYC TECH ONLINE MARKET
          </h2>

          <p className="mt-3 leading-6 wrap-break-words">
            <span className="text-red-600 text-[10px] font-semibold block">
              (025) 3686 25 16
            </span>
          </p>

          <p className="mt-4 leading-6 wrap-break-word-words">
            257 Thatcher Road St, Brooklyn, Manhattan,<br />
            NY 10092<br />
            contact@swootechmart.com
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center flex-wrap gap-3 mt-5">
            <Twitter className="p-2 w-8 h-8 bg-gray-200 rounded-full shrink-0" />
            <Facebook className="p-2 w-8 h-8 bg-gray-200 rounded-full shrink-0" />
            <Instagram className="p-2 w-8 h-8 bg-gray-200 rounded-full shrink-0" />
            <Pin className="p-2 w-8 h-8 bg-gray-200 rounded-full shrink-0" />
          </div>

          {/* DROPDOWNS */}
           <div className="flex gap-3  items-center mt-5">
      {/* Currency select */}
      <label className="relative inline-flex items-center rounded-xl border border-gray-200 px-2 py-2 min-w-20 bg-white shadow-sm"
             aria-label="Select currency">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="appearance-none bg-transparent outline-none pr-6 text-xs font-medium"
        >
          {currencyOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* chevron icon on right */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <ChevronDown size={16} />
        </span>
      </label>

      {/* Language select with flag */}
      <label className="relative inline-flex items-center rounded-xl border border-gray-200 px-3 py-1 min-w-20 bg-white shadow-sm"
             aria-label="Select language">
        {/* Flag */}
        <span className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
            {currentLang?.flag ? (
              <Image
                src={currentLang.flag}
                alt={`${currentLang?.label} flag`}
                width={16}
                height={16}
                className="object-cover"
              />
            ) : (
              <span className="inline-block w-5 h-5 bg-gray-200 rounded-full" />
            )}
          </span>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="appearance-none bg-transparent outline-none text-xs font-medium pr-6"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </span>

        {/* chevron icon */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <ChevronDown size={16} />
        </span>
      </label>
    </div>   
        </div>

        {/* CATEGORY COLUMNS */}
        {Object.entries(categories).map(([title, list]) => (
          <div key={title} className="min-w-0">
            <h3 className="font-semibold mb-3 text-black whitespace-nowrap">
              {title.replace(/([A-Z])/g, " $1").toUpperCase()}
            </h3>

            <ul className="space-y-2">
              {list.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-black cursor-pointer wrap-break-words"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* SUBSCRIBE */}
      <div className="max-w-7xl mx-auto px-5 mt-16">
        <p className="font-semibold wrap-break-words">
          SUBSCRIBE & GET <span className="text-red-600 font-bold">10% OFF</span> FOR YOUR FIRST ORDER
        </p>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-1/2 border rounded-md px-4 py-2"
          />
          <button className="mt-3 sm:mt-0 bg-red-600 text-white px-6 py-2 rounded-md text-sm w-full sm:w-auto text-center">
            SUBSCRIBE
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2 break-words">
          By subscribing, you’re accepted the our <span className="underline cursor-pointer">Policy</span>
        </p>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-5 mt-16 flex flex-wrap justify-between items-center text-sm text-gray-500 border-t pt-6 gap-4">
        <p className="whitespace-nowrap">
          © 2024 <span className="font-semibold">Shawonetc3</span>. All Rights Reserved
        </p>

        {/* PAYMENT ICONS */}
        <div className="flex flex-wrap items-center gap-3">
          <img src="images/visa.png" className=" h-3 object-contain" />
          <img src="images/mastercard.png" className="  h-3 object-contain" />
          <img src="images/stripe.png" className="  h-3 object-contain" />
          <img src="images/klarna.png" className="  h-3 object-contain" />
        </div>

        <p className="cursor-pointer whitespace-nowrap">Mobile Site</p>
      </div>

    </footer>
  );
}

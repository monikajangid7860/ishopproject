// src/components/home/PromoBanners.jsx
import Image from "next/image";
import { promoBanners } from "@/api-calls/product";

/**
 * Server component - uses only map()
 * No hooks → stays SSR
 */
export default function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {promoBanners.map((banner) => (
          <div key={banner.id}>
            {banner.type === "left" ? (
              /* LEFT BANNER (Text + Chair) */
              <div
                className={`md:h-50 rounded-2xl overflow-hidden p-6 sm:p-8 flex items-center justify-between ${banner.bgColor}`}
              >
                <div className="text-white max-w-[60%]">
                  <h3 className="text-lg sm:text-xl font-bold leading-tight">
                    {banner.title.map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h3>

                  <p className="text-sm mt-2 opacity-90">
                    {banner.description.map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>

                  <button className="mt-4 bg-white text-gray-900 text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100 transition">
                    {banner.buttonText}
                  </button>
                </div>

                <div className="relative w-28 sm:w-36 md:w-40 h-28 sm:h-36 md:h-40 shrink-0">
                  <Image
                    src={banner.img}
                    alt={banner.imgAlt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            ) : (
              /* RIGHT BANNER (Full Image) */
              <div className="rounded-2xl overflow-hidden relative h-36 sm:h-44 md:h-50">
                <Image
                  src={banner.img}
                  alt={banner.imgAlt}
                  fill
                  className="object-cover"
                  priority
                />


              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

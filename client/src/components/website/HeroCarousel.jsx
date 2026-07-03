import Image from "next/image";
import HeroCarouselClient from "./HeroCarouselClient";

export default function HeroCarousel({ slides, promo }) {
  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start overflow-hidden">

      <div className="lg:col-span-8 min-w-0 overflow-hidden">
  <div className="relative h-[260px] sm:h-[260px] md:h-[400px] overflow-hidden">
  <HeroCarouselClient slides={slides} />
</div>

      </div>

      {promo && (
        <aside className="lg:col-span-4 min-w-0 relative rounded-2xl overflow-hidden h-60 sm:h-72 md:h-80 shadow-lg">
          <Image
            src={promo.img}
            alt={promo.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 z-10">
            <h4 className="text-lg sm:text-xl font-semibold">{promo.title}</h4>
            <p className="text-sm opacity-80 mt-2">{promo.subtitle}</p>
            <button className="mt-4 bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition">
              {promo.cta}
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}


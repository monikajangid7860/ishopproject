// app/store/hero/HeroSection.jsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto bg-white rounded-xl mt-5  overflow-hidden relative">

      {/* FIXED HEIGHT FOR HERO */}
      <div className="relative w-full h-[280px] md:h-[380px] lg:h-[430px]">

        {/* Background Image */}
        <Image
          src="/images/abouthero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />

        {/* Text Content Layer */}
        <div className="absolute inset-0 flex items-center px-6 md:px-10 lg:px-14">
          <div className="max-w-xs md:max-w-sm lg:max-w-md text-gray-700">
            
            <h3 className="text-xl md:text-3xl font-semibold leading-tight drop-shadow-xl">
              Noise Cancelling
              <br /> Headphone
            </h3>

            <p className="text-xs md:text-sm mt-3 opacity-90 leading-relaxed drop-shadow-xl">
              Boost Over Ear Headphone  
              With Super BassBoost.  
              Low Latency Game Mode.
            </p>

            <button className="mt-5 px-5 py-2.5 bg-white text-gray-800 rounded-md text-xs md:text-sm font-semibold shadow-md">
              BUY NOW
            </button>

          </div>
        </div>
      </div>

    </section>
  );
}

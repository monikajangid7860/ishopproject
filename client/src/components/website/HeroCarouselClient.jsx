"use client";

import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";


function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Next slide"
      className="
        absolute right-3 top-1/2 -translate-y-1/2 z-50
        h-9 w-9 rounded-full
        bg-white/90 hover:bg-white
        shadow flex items-center justify-center
        text-gray-700
      "
    >
      <ChevronRight size={18} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Previous slide"
      className="
        absolute left-3 top-1/2 -translate-y-1/2 z-50
        h-9 w-9 rounded-full
        bg-white/90 hover:bg-white
        shadow flex items-center justify-center
        text-gray-700
      "
    >
      <ChevronLeft size={18} />
    </button>
  );
}


export default function HeroCarouselClient({ slides }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i} className="relative overflow-hidden">
            <div className="relative h-60 sm:h-72 md:h-80 rounded-2xl overflow-hidden w-full">
              <div
                style={{
                  backgroundImage: `url(${slide.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="absolute inset-0"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col justify-center px-14 sm:px-14 md:px-16 w-full md:w-1/2 max-w-full text-center lg:text-left text-white">
                <h3 className="text-2xl md:text-3xl font-semibold whitespace-pre-line">
                  {slide.headline}
                </h3>
                <p className="text-sm mt-2 opacity-90">{slide.sub}</p>
                <button className="mt-4 bg-white text-black px-4 py-2 rounded-md text-sm font-semibold">
                  {slide.ctaText || "Shop Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

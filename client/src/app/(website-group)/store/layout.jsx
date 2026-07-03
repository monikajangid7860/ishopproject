import React from "react";
import HeroCarousel from '@/components/website/HeroCarousel'
import {topCellData, storecategories} from '@/api-calls/product'
import FilterControlsMobile from "@/components/website/FilterControlsMobile";
import StoreAside from "@/components/website/StoreAside";

const exampleBrands = [
  { id: "apple", name: "Apple", count: 12 },
  { id: "samsung", name: "Samsung", count: 8 },
];

const exampleColors = ["Red", "Blue", "Black", "White"];

function layout({ children }) {
  return (
    <>
      {/* Hero */}
      <div className="w-full overflow-x-hidden">
        <HeroCarousel {...topCellData} />
      </div>

      

      {/* Store Layout */}
      <div className="
        relative 
        w-full 
        max-w-7xl 
        mx-auto 
        px-4 
        py-8
        grid 
        grid-cols-1 
        lg:grid-cols-4 
        gap-6
      ">
        {/* Aside (desktop only) */}
        <div className=" lg:block lg:col-span-1">
          <StoreAside />
        </div>

        {/* Main content */}
        <section className="col-span-1 lg:col-span-3 min-w-0">
          {children}
        </section>
      </div>
    </>
  );
}


export default layout

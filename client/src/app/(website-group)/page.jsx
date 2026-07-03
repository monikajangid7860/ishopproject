import React from "react";
import Hero from "@/components/website/Hero";
import Section2 from "@/components/website/Section2";
import Section3 from "@/components/website/Section3";
import PromoSection from "@/components/website/PromoSection";
import BestSellerCarousel from "@/components/website/BestSellerCarousel";
import TopCellphonesSection from "@/components/website/TopCellphonesSection";
import { phoneSection } from "@/api-calls/product/";
import { laptopSection } from "@/api-calls/product/";
import  { computerproducts,productsData  } from "@/api-calls/product";
import { products } from "@/api-calls/product";
import CategoryBlockSection from "@/components/website/CategoryBlockSection";
import PromoBanners from "@/components/website/PromoBanners";
import RecentlyViewed from "@/components/website/RecentlyViewed";
import BrandDetail from "@/components/website/BrandDetail";
import { topbrands } from "@/api-calls/product";
import { topcategories } from "@/api-calls/product";
import { getProducts } from "@/api-calls/products";
import MotionWrapper from "@/components/common/MotionWrapper";
import ScrollReveal from "@/components/animations/ScrollReveal";

async function page()
{
  const productsJson = await getProducts()
  const products = productsJson.products
  const imgurl = productsJson.imageUrl
  console.log(imgurl)
  return (
    <MotionWrapper>
    <main>
      <Hero />
      <ScrollReveal>
      <Section2  brandsData={topbrands} categoriesData={topcategories}/>
      </ScrollReveal>
      <ScrollReveal>
      <Section3 />
      </ScrollReveal>
      <ScrollReveal>
      <PromoSection />
      </ScrollReveal>
      <ScrollReveal>
      <BestSellerCarousel products={products}  imgurl={imgurl} />
      </ScrollReveal>
      <ScrollReveal>
      <TopCellphonesSection {...phoneSection} />
      </ScrollReveal>
      <ScrollReveal>
      <BestSellerCarousel products={products} imgurl={imgurl} />
      </ScrollReveal>
      <ScrollReveal>
      <TopCellphonesSection {...laptopSection} />
      </ScrollReveal>
      <ScrollReveal>
      <BestSellerCarousel products={products} imgurl={imgurl} />
      </ScrollReveal>
      <ScrollReveal>
      <CategoryBlockSection />
      </ScrollReveal>
      <ScrollReveal>
      <PromoBanners />
      </ScrollReveal>
      <ScrollReveal>
      <RecentlyViewed />
      </ScrollReveal>
      <ScrollReveal>
      <BrandDetail />
      </ScrollReveal>
    </main>
    </MotionWrapper>
  );
}

export default page;

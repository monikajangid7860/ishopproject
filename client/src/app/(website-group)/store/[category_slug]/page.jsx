import React from "react";
import BestSellerSlider from "@/components/website/BestSellerSlider";
import ProductGridSection from "@/components/website/ProductGridSection";
import { getProducts } from "@/api-calls/products";
import ListingHeader from "../ListingHeader";
import { Scroll } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default async function page({params , searchParams}) {
  const query = {status:true}
  const {category_slug} = await params
  const UrlSearchParams = await searchParams
  if(UrlSearchParams.colors){
    query.colors = await UrlSearchParams.colors
  }
  if(UrlSearchParams.brands){
    query.brands = await UrlSearchParams.brands
  }
  if (UrlSearchParams.sortby) {
    query.sortby = await UrlSearchParams.sortby;
  }
  if (UrlSearchParams.limit) {
    query.limit = await UrlSearchParams.limit;
  }
  

  if(category_slug){
    query.category_slug = category_slug
  }

  const productsJson = await getProducts(query); 
  const productsData = productsJson.products; 
  const imgurl = productsJson.imageUrl
   
  return (
        <main className="col-span-12 lg:col-span-9 space-y-10">
       {productsData.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          <>
          <ListingHeader/>
          <ScrollReveal>
            <BestSellerSlider products={productsData} imgurl={imgurl} />
          </ScrollReveal>
            <ProductGridSection products={productsData} imgurl={imgurl} />
          </>
        )}

        </main>
  );
}

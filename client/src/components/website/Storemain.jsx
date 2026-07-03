"use client";

import React from "react";
import BestSellerSlider from "./BestSellerSlider";
import ProductGridSection from "./ProductGridSection";
import ScrollReveal from "../animations/ScrollReveal";

const exampleCategories = ["Tablets", "iPads", "Android Tablets", "Gaming Tablets", "Accessories"];
const exampleBrands = [
  { id: "apple", name: "Apple", count: 12 },
  { id: "samsung", name: "Samsung", count: 8 },
];
const exampleColors = ["Red", "Blue", "Black", "White"];

export default function Storemain(props) {
  const { products , imgurl} = props;
  
  return (
    <> 
    <BestSellerSlider products={products} imgurl={imgurl} />
    <ScrollReveal>
        <ProductGridSection products={products} imgurl={imgurl} /> 
      </ScrollReveal> </>
  ); 
}

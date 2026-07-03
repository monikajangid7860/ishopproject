"use client";

import useTrackRecentlyViewed from "@/hooks/useTrackRecentlyViewed";
import ProductPage from "./ProductPage";
import ProductTabs from "./ProductTabs";
import RecentlyViewed from "./RecentlyViewed";

export default function ProductPageClient({ product, description }) {
  // 🔥 THIS is where tracking belongs
  useTrackRecentlyViewed(product.id);

  return (
    <>
      <ProductPage product={product} />
      <RecentlyViewed/>
      <ProductTabs description={description} />
    </>
  );
}

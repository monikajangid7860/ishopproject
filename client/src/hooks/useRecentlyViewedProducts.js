"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";
import { selectRecentlyViewedIds } from "@/redux/selector/recentlyViewedSelectors";

export default function useRecentlyViewedProducts() {
  const ids = useSelector(selectRecentlyViewedIds);
  console.log("ids", ids);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // nothing to fetch
    if (!ids || ids.length === 0) {
      setProducts([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    axiosApiInstance
      .post("/product/by-ids", { ids })
      .then((res) => {
        if (!cancelled) {
          setProducts(res.data.products || []);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ids.join(",")]); // 🔑 IMPORTANT

  return { products, loading };
}

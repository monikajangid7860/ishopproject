"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRecentlyViewed } from "@/redux/reducer/RecentlyViewedSlice";

export default function useTrackRecentlyViewed(productId) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addRecentlyViewed(productId));
    }
  }, [productId, dispatch]);
}

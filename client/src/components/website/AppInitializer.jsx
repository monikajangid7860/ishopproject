"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeRecentlyViewed } from "@/redux/reducer/RecentlyViewedSlice";
import useCartSync from "@/hooks/userCartSync";
import useWishlistSync from "@/hooks/useWishlistSync";

export default function AppInitializer() {
  const dispatch = useDispatch();
  useCartSync();
  useWishlistSync();

  useEffect(() => {
    dispatch(initializeRecentlyViewed());
  }, [dispatch]);

  return null;
}

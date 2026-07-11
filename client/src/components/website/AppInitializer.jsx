"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeRecentlyViewed } from "@/redux/reducer/RecentlyViewedSlice";
import useCartSync from "@/hooks/userCartSync";

export default function AppInitializer() {
  const dispatch = useDispatch();
  useCartSync();

  useEffect(() => {
    dispatch(initializeRecentlyViewed());
  }, [dispatch]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeRecentlyViewed } from "@/redux/reducer/RecentlyViewedSlice";

export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeRecentlyViewed());
  }, [dispatch]);

  return null;
}

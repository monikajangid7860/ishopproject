import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";

export default function useWishlistSync() {
  const { items, hydrated } = useSelector((state) => state.wish);
  const user = useSelector((state) => state.user.user);

  const didInitialSync = useRef(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    /* ---------------- GUEST ---------------- */
    if (!user) {
      localStorage.setItem("wish", JSON.stringify(items));
      return;
    }

    /* ❌ BLOCK UNTIL HYDRATED */
    if (!hydrated) return;

    /* ❌ BLOCK FIRST RUN AFTER LOGIN */
    if (!didInitialSync.current) {
      didInitialSync.current = true;
      return;
    }

    /* ---------------- LOGGED IN ---------------- */
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      axiosApiInstance.post("/wishlist/update", {
        user_id: user._id,
        items: items.map((i) => ({ product_id: i.id })),
      });
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [items, user, hydrated]);
}

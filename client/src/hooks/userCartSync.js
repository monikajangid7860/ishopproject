import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";

export default function useCartSync() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  const previousUserRef = useRef(null);
  const skipNextSyncRef = useRef(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    /* ---------------- GUEST MODE ---------------- */
    if (!user?._id) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      previousUserRef.current = null;
      skipNextSyncRef.current = false;

      return;
    }

    /* ---------------- USER JUST LOGGED IN ---------------- */
    if (previousUserRef.current !== user._id) {
      previousUserRef.current = user._id;

      // Ignore the next cart update because it will come
      // from dispatch(loadCart()) after fetching DB cart.
      skipNextSyncRef.current = true;

      return;
    }

    /* ---------------- IGNORE INITIAL DB HYDRATION ---------------- */
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false;
      return;
    }

    /* ---------------- DEBOUNCE ---------------- */
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const payload = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      price_snapshot:
        item.final_price ??
        item.price ??
        item.price_snapshot ??
        null,
    }));

    debounceRef.current = setTimeout(async () => {
      try {
        await axiosApiInstance.post("/cart/update", {
          user_id: user._id,
          items: payload,
        });
      } catch (err) {
        console.error("Cart sync failed:", err);
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [cart, user]);
}
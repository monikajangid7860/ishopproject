import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";

export default function useCartSync() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  const isFirstRun = useRef(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    // 🟢 GUEST MODE → localStorage
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }

    // 🔒 SKIP FIRST RUN (login hydration)
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // 🟢 LOGGED-IN MODE → DB (DEBOUNCED)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      axiosApiInstance.post("/cart/update", {
        user_id: user._id,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price_snapshot: item.final_price,
        })),
      });
    }, 500); // ⏱️ debounce delay

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [cart, user]);
}

"use client";

import { ShoppingCart, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromwish } from "@/redux/reducer/WishReducer";
import { addTocart } from "@/redux/reducer/CartReducer";
import { axiosApiInstance } from "@/helper/helper";

export default function WishlistRow({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const wish = useSelector((state) => state.wish.items);

  // Defensive image normalization (UNCHANGED)
const imageSrc =item.image || "/placeholder.png";
  /* ===============================
     🔥 LOGIC FIX ONLY (NO UI)
     =============================== */
  const syncWishlistToDB = async (updatedWishlist) => {
    if (!user) return;

    try {
      if (updatedWishlist.length === 0) {
        // ✅ ONLY valid way to clear DB
        await axiosApiInstance.post("/wishlist/clear", {
          user_id: user._id,
        });
      } else {
        await axiosApiInstance.post("/wishlist/update", {
          user_id: user._id,
          items: updatedWishlist.map((i) => ({
            product_id: i.id,
          })),
        });
      }
    } catch (err) {
      console.error("Wishlist DB sync failed", err);
    }
  };

  const handleRemove = async () => {
    const updatedWishlist = wish.filter((i) => i.id !== item.id);

    dispatch(removeFromwish(item)); // UI
    await syncWishlistToDB(updatedWishlist); // DB
  };

const handleMoveToCart = async () => {
  const updatedWishlist = wish.filter((i) => i.id !== item.id);

  const cartItem = {
    id: item.id,
    title: item.title,
    image: item.image,
    price: item.price,   // ✅ THIS IS CRITICAL
    quantity: 1,
  };

  // 1️⃣ Update UI
  dispatch(addTocart(cartItem));
  dispatch(removeFromwish(item));

  // 2️⃣ Sync wishlist to DB
  await syncWishlistToDB(updatedWishlist);

  // 3️⃣ Sync cart to DB
};
  /* ===============================
     UI BELOW — 100% YOUR CODE
     =============================== */
  return (
    <div
      className="
        group relative
        flex flex-col gap-3
        rounded-xl border border-gray-100
        bg-white p-3
        transition-all
        hover:shadow-md
        sm:flex-row sm:items-center sm:gap-4 sm:p-4
      "
    >
      {/* IMAGE */}
      <div className="w-full sm:w-auto flex justify-center">
        <div
          className="
            w-full aspect-square
            sm:w-24 sm:h-24
            rounded-lg overflow-hidden
            bg-gray-50
            flex items-center justify-center
          "
        >
          <img
            src={imageSrc}
            alt={item.title}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        <h3
          className="
            text-sm font-medium text-gray-900
            line-clamp-2
            text-center
            sm:text-left
          "
        >
          {item.title}
        </h3>

        {item.price && (
  <p>₹{item.price }</p>
)}

        {/* ACTIONS */}
        <div
          className="
            flex items-center justify-center gap-3
            sm:justify-start
          "
        >
          <button
            onClick={handleMoveToCart}
            aria-label="Move to cart"
            className="
              flex items-center justify-center
              h-10 w-10
              rounded-lg bg-teal-500 text-white
              transition
              hover:bg-teal-600
              active:scale-95
              focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30
              sm:h-auto sm:w-auto sm:px-2 sm:py-2
            "
          >
            <ShoppingCart size={14} />
            <span className="hidden sm:inline ml-2 text-sm font-medium">
              Move to Cart
            </span>
          </button>

          <button
            onClick={handleRemove}
            aria-label="Remove from wishlist"
            className="
              flex items-center justify-center
              h-10 w-10
              rounded-lg text-red-600
              transition
              hover:bg-red-50 hover:text-red-700
              active:scale-95
              focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30
              sm:h-auto sm:w-auto sm:px-3 sm:py-2
            "
          >
            <Trash size={14} />
            <span className="hidden sm:inline ml-2 text-sm font-medium">
              Remove
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

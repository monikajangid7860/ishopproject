"use client";

import { useDispatch, useSelector } from "react-redux";
import Badge from "@/components/website/Badge";
import WishlistRow from "./WishlistRow";
import { clearWish } from "@/redux/reducer/WishReducer";
import { axiosApiInstance } from "@/helper/helper";

export default function WishlistSection() {
  const dispatch = useDispatch();
  const wishItems = useSelector((state) => state.wish.items);
  const user = useSelector((state) => state.user.user);

  const handleClearAll = async () => {
    dispatch(clearWish()); // ✅ UI update

    if (!user) return; // guest handled by localStorage

    try {
      // 🔥 FIX: use CLEAR endpoint (not update)
      await axiosApiInstance.post("/wishlist/clear", {
        user_id: user._id,
      });
    } catch (err) {
      console.error("Failed to clear wishlist", err);
    }
  };

  return (
    <section
      aria-label="Wishlist"
      className="max-w-full overflow-x-hidden bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8 flex flex-col gap-8 overflow-hidden">
          
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
              Your Wishlist
            </h2>

            <div className="flex items-center gap-3 shrink-0">
              <Badge text={`${wishItems.length} ITEMS`} tone="blue" />

              {wishItems.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 rounded"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* LIST */}
          <div
            className="
              grid grid-cols-2 gap-3
              sm:flex sm:flex-col sm:gap-4
              w-full min-w-0
            "
          >
            {wishItems.length === 0 ? (
              <div className="col-span-2 py-12 text-center">
                <p className="text-sm text-gray-500">
                  Your wishlist is empty
                </p>
              </div>
            ) : (
              wishItems.map((item) => (
                <WishlistRow key={item.id} item={item} />
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

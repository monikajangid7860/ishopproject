"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addTocart,
  removeFromcart,
  deleteItem,
} from "@/redux/reducer/CartReducer";
import { addTowish } from "@/redux/reducer/WishReducer";
import Badge from "./Badge";
import { Heart, Trash } from "lucide-react";

export default function ProductRow({ item }) {
  const dispatch = useDispatch();
  const wish = useSelector((state) => state.wish?.items || []);

  const isWished = wish.some((w) => w.id === item.id);

  const increment = () => dispatch(addTocart(item));
  const decrement = () => dispatch(removeFromcart(item));
  const removeProduct = () => dispatch(deleteItem(item));

  const moveToWishlist = () => {
  if (!isWished) {
    dispatch(
      addTowish({
        id: item.id,
        title: item.title || item.name,
        image: item.image,
        price: item.price,   // ✅ ALWAYS USE price
      })
    );
  }

  dispatch(deleteItem({ id: item.id }));
};

  const imageSrc = item.image?.startsWith("http")
    ? item.image
    : `${process.env.REACT_APP_SERVER_URL}/images/product/main_images/${item.image}`;

  return (
    <div
      className="
        flex flex-col sm:flex-row gap-4
        py-4
      "
    >
      {/* IMAGE */}
      <div className="shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-gray-50 border">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        {/* TOP ROW */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {item.isNew && <Badge text="NEW" />}
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.title || item.name}
              </h3>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {item.currency}$
            {String(item.price).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-3 flex items-center justify-between gap-4">
          {/* QUANTITY */}
          <div className="inline-flex items-center rounded-md border border-gray-200 overflow-hidden">
            <button
              onClick={decrement}
              aria-label="Decrease quantity"
              className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              −
            </button>
            <div className="px-3 py-1 text-sm min-w-[2rem] text-center">
              {item.quantity}
            </div>
            <button
              onClick={increment}
              aria-label="Increase quantity"
              className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 text-gray-500">
            <button
              onClick={moveToWishlist}
              aria-label="Move to wishlist"
              className="hover:text-red-500"
            >
              <Heart
                size={18}
                className={isWished ? "fill-red-500 text-red-500" : ""}
              />
            </button>

            <button
              onClick={removeProduct}
              aria-label="Remove item"
              className="hover:text-red-600"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

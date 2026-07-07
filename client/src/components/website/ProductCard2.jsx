"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "@/redux/reducer/CartReducer";
import { addTowish, removeFromwish } from "@/redux/reducer/WishReducer";
import { createPortal } from "react-dom";
import { getThumbnail, getOtherImages } from "@/helper/getProductImage";

export default function ProductCard2({ product, imgurl }) {
  const dispatch = useDispatch();
  const cartBtnRef = useRef(null);

  const wish = useSelector((state) => state.wish?.items || []);
  const [index] = useState(0);
  const [showFly, setShowFly] = useState(false);
  const [flyFrom, setFlyFrom] = useState(null);

  /* ---------------- IMAGES ---------------- */
  const images = [
  getThumbnail(product, imgurl),
  ...getOtherImages(product, imgurl),
].filter(Boolean);

  const mainImage = images[index] || images[0] || "/placeholder.png";

  /* ---------------- PRICE ---------------- */
  const oldPrice = product?.original_price || null;
  const newPrice = Number(product?.final_price || 0);
  const discount = product?.discount_percentage || null;

  /* ---------------- WISHLIST ---------------- */
  const isWished = wish.some((item) => item.id === product._id);

  function handleWish(e) {
  e.preventDefault();
  e.stopPropagation();

  if (isWished) {
    dispatch(removeFromwish({ id: product._id }));
  } else {
    const normalizedProduct = {
      id: product._id,
      title: product.name,
      image: mainImage,
      price: Number(product.final_price),
    };

    dispatch(addTowish(normalizedProduct));
  }
}
  /* ---------------- ADD TO CART ---------------- */
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    if (showFly) return; // prevent animation spam

    const rect = cartBtnRef.current?.getBoundingClientRect();
    if (!rect) return;

    setFlyFrom(rect);
    setShowFly(true);

    const normalizedProduct = {
  id: product._id,
  title: product.name,
  image: mainImage,
  price: Number(product.final_price),
};
dispatch(addTocart({ ...normalizedProduct, quantity: 1 }));

  }

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition hover:shadow-md w-full max-w-[280px] flex flex-col"
    >
      {/* IMAGE */}
      <Link href={`/product/${product._id}`} className="relative block">
        <div className="relative w-full h-[180px] bg-gray-50">
          {discount && (
            <span className="absolute top-3 left-3 z-10 text-[10px] font-medium bg-teal-500 text-white px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}

          <img
            src={mainImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain transition"
          />

          <button
            onClick={handleWish}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur cursor-pointer rounded-full p-1.5 border border-gray-200 hover:bg-white transition"
          >
            <Heart
              className={`w-4 h-4 transition ${
                isWished ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-3">
        <h3 className="text-sm font-medium text-gray-800 leading-snug line-clamp-2 min-h-[32px]">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-gray-900">
              ₹{newPrice.toLocaleString("en-IN")}
            </span>

            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{oldPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            ref={cartBtnRef}
            onClick={handleAddToCart}
            className="w-9 h-9 cursor-pointer rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FLY IMAGE */}
      {showFly &&
        flyFrom &&
        createPortal(
          <motion.img
            src={mainImage}
            className="fixed z-[9999] w-20 h-20 object-contain pointer-events-none"
            initial={{
              top: flyFrom.top,
              left: flyFrom.left,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              top:
                document
                  .getElementById("cart-icon")
                  ?.getBoundingClientRect().top ?? flyFrom.top,
              left:
                document
                  .getElementById("cart-icon")
                  ?.getBoundingClientRect().left ?? flyFrom.left,
              scale: 0.2,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onAnimationComplete={() => {
              setShowFly(false);
              setFlyFrom(null);
            }}
          />,
          document.body
        )}
    </motion.article>
  );
}

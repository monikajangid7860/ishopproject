"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";
import { loadCart } from "@/redux/reducer/CartReducer";

const CART_KEY = "cart";
const MERGE_TOKEN_KEY = "cart_guest_merge_token";

function readGuestCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

function normalizeServerCart(items = []) {
  return items.map((row) => ({
    id: row.product_id?._id || row.product_id,
    title: row.product_id?.name || row.title,
image:
  row.product_id?.thumbnail?.url ||
  row.image?.url ||
  row.image ||
  "/placeholder.png",
    price: Number(row.product_id?.final_price ?? row.price ?? row.final_price),
    final_price: Number(row.product_id?.final_price ?? row.final_price),
    original_price: Number(row.product_id?.original_price ?? row.original_price),
    quantity: Number(row.quantity || 1),
  }));
}

function signature(items) {
  return JSON.stringify(
    items
      .map((item) => ({ id: String(item.id || item._id), quantity: Number(item.quantity || 1) }))
      .sort((a, b) => a.id.localeCompare(b.id))
  );
}

function createMergeToken() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

export default function useCartSync() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const cart = useSelector((state) => state.cart?.items || []);
  const lifecycleRef = useRef({ userId: null, ready: false, initialGuestLoaded: false });
  const currentUserIdRef = useRef(null);
  const lastSyncedRef = useRef("");
  const queueRef = useRef(Promise.resolve());
  const guestPersistenceRef = useRef(true);

  useEffect(() => {
    currentUserIdRef.current = user?._id || null;
  }, [user?._id]);

  useEffect(() => {
    let cancelled = false;
    const userId = user?._id || null;
    const lifecycle = lifecycleRef.current;

    async function initialize() {
      lifecycle.ready = false;
      lifecycle.userId = userId;

      if (!userId) {
        if (!lifecycle.initialGuestLoaded) {
          lifecycle.initialGuestLoaded = true;
          const guestCart = readGuestCart();
          lastSyncedRef.current = signature(guestCart);
          if (!cancelled) dispatch(loadCart(guestCart));
        }
        lifecycle.ready = true;
        return;
      }

      // A logout clears Redux. Do not recreate or overwrite guest storage until
      // the guest intentionally adds a new item.
      guestPersistenceRef.current = false;

      try {
        const guestCart = readGuestCart();
        if (guestCart.length) {
          const mergeToken = localStorage.getItem(MERGE_TOKEN_KEY) || createMergeToken();
          localStorage.setItem(MERGE_TOKEN_KEY, mergeToken);
          await axiosApiInstance.post("/cart/sync-cart", {
            user_id: userId,
            cart_data: guestCart,
            source: "guest",
            merge_token: mergeToken,
          });
          localStorage.removeItem(CART_KEY);
          localStorage.removeItem(MERGE_TOKEN_KEY);
        }

        const response = await axiosApiInstance.get(`/cart/${userId}`);
        const dbCart = normalizeServerCart(response.data?.cart?.items || []);
        if (cancelled || currentUserIdRef.current !== userId) return;

        lastSyncedRef.current = signature(dbCart);
        dispatch(loadCart(dbCart));
        lifecycle.ready = true;
      } catch (error) {
        console.error("Cart initialization failed", error);
      }
    }

    initialize();
    return () => { cancelled = true; };
  }, [user?._id, dispatch]);

  useEffect(() => {
    const lifecycle = lifecycleRef.current;
    const userId = user?._id || null;
    const cartSignature = signature(cart);

    if (!lifecycle.ready || lifecycle.userId !== userId) return;

    if (!userId) {
      if (!guestPersistenceRef.current && cart.length === 0) return;
      guestPersistenceRef.current = true;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      return;
    }

    if (cartSignature === lastSyncedRef.current) return;
    lastSyncedRef.current = cartSignature;
    const payload = cart.map((item) => ({
      product_id: item.id || item._id,
      quantity: Number(item.quantity || 1),
      price_snapshot: item.price ?? item.final_price ?? null,
    }));

    queueRef.current = queueRef.current
      .then(async () => {
        if (currentUserIdRef.current !== userId) return;
        const response = await axiosApiInstance.post("/cart/update", { user_id: userId, items: payload });
        if (currentUserIdRef.current !== userId) return;
        const serverCart = normalizeServerCart(response.data?.cart?.items || []);
        if (signature(serverCart) === cartSignature) return;
        lastSyncedRef.current = signature(serverCart);
        dispatch(loadCart(serverCart));
      })
      .catch((error) => {
        console.error("Cart sync failed", error);
        if (lastSyncedRef.current === cartSignature) lastSyncedRef.current = "";
      });
  }, [cart, user?._id, dispatch]);
}

"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";
import { loadWish } from "@/redux/reducer/WishReducer";

const WISHLIST_KEY = "wish";
const MERGE_TOKEN_KEY = "wishlist_guest_merge_token";

function readGuestWishlist() {
  try {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
    return Array.isArray(wishlist) ? wishlist : [];
  } catch {
    return [];
  }
}

function normalizeServerWishlist(items = []) {
  return items
    .filter((row) => row?.product_id)
    .map((row) => ({
      id: row.product_id?._id || row.product_id,
      title: row.product_id?.name || row.title,
      image: row.product_id?.thumbnail?.url || row.image?.url || row.image || "/placeholder.png",
      price: Number(row.product_id?.final_price ?? row.price),
    }));
}

function signature(items) {
  return JSON.stringify(
    items
      .map((item) => String(item.id || item._id))
      .sort()
  );
}

function createMergeToken() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

// The sole owner of wishlist initialization, guest merge, and DB synchronization.
export default function useWishlistSync() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const items = useSelector((state) => state.wish?.items || []);
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
          const guestWishlist = readGuestWishlist();
          lastSyncedRef.current = signature(guestWishlist);
          if (!cancelled) dispatch(loadWish(guestWishlist));
        }
        lifecycle.ready = true;
        return;
      }

      // Logout clears Redux only. Do not recreate or overwrite guest storage
      // until the guest intentionally adds a new wishlist item.
      guestPersistenceRef.current = false;

      try {
        const guestWishlist = readGuestWishlist();
        if (guestWishlist.length) {
          const mergeToken = localStorage.getItem(MERGE_TOKEN_KEY) || createMergeToken();
          localStorage.setItem(MERGE_TOKEN_KEY, mergeToken);
          await axiosApiInstance.post("/wishlist/merge", {
            user_id: userId,
            items: guestWishlist,
            merge_token: mergeToken,
          });
          localStorage.removeItem(WISHLIST_KEY);
          localStorage.removeItem(MERGE_TOKEN_KEY);
        }

        const response = await axiosApiInstance.get(`/wishlist/${userId}`);
        const dbWishlist = normalizeServerWishlist(response.data?.wishlist?.items || []);
        if (cancelled || currentUserIdRef.current !== userId) return;

        lastSyncedRef.current = signature(dbWishlist);
        dispatch(loadWish(dbWishlist));
        lifecycle.ready = true;
      } catch (error) {
        console.error("Wishlist initialization failed", error);
        // Guest storage remains intact so the next login can retry safely.
      }
    }

    initialize();
    return () => { cancelled = true; };
  }, [user?._id, dispatch]);

  useEffect(() => {
    const lifecycle = lifecycleRef.current;
    const userId = user?._id || null;
    const wishlistSignature = signature(items);

    if (!lifecycle.ready || lifecycle.userId !== userId) return;

    if (!userId) {
      if (!guestPersistenceRef.current && items.length === 0) return;
      guestPersistenceRef.current = true;
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
      return;
    }

    if (wishlistSignature === lastSyncedRef.current) return;
    lastSyncedRef.current = wishlistSignature;
    const payload = items.map((item) => ({ product_id: item.id || item._id }));

    queueRef.current = queueRef.current
      .then(async () => {
        if (currentUserIdRef.current !== userId) return;
        const response = await axiosApiInstance.post("/wishlist/update", {
          user_id: userId,
          items: payload,
        });
        if (currentUserIdRef.current !== userId) return;

        const serverWishlist = normalizeServerWishlist(response.data?.wishlist?.items || []);
        if (signature(serverWishlist) === wishlistSignature) return;
        lastSyncedRef.current = signature(serverWishlist);
        dispatch(loadWish(serverWishlist));
      })
      .catch((error) => {
        console.error("Wishlist sync failed", error);
        if (lastSyncedRef.current === wishlistSignature) lastSyncedRef.current = "";
      });
  }, [items, user?._id, dispatch]);
}

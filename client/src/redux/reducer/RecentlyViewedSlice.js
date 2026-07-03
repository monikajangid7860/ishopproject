import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 10;

const initialState = {
  ids: [],
  initialized: false,
};

const RecentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    initializeRecentlyViewed(state) {
      if (state.initialized) return;

      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        console.log(raw);
        state.ids = raw ? JSON.parse(raw) : [];
      } catch {
        state.ids = [];
      }

      state.initialized = true;
    },

    addRecentlyViewed(state, action) {
      const productId = action.payload;
      console.log(productId);
      if (!productId) return;
      const updated = [
        productId,
        ...state.ids.filter((id) => id !== productId),
      ].slice(0, MAX_ITEMS);

      state.ids = updated;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // silent fail — do NOT break UX
      }
    },

    clearRecentlyViewed(state) {
      state.ids = [];
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    },
  },
});

export const {
  initializeRecentlyViewed,
  addRecentlyViewed,
  clearRecentlyViewed,
} = RecentlyViewedSlice.actions;

export default RecentlyViewedSlice.reducer;
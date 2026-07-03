import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  hydrated: false, // 🔥 IMPORTANT
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    loadWish: (state, { payload }) => {
      state.items = Array.isArray(payload) ? payload : [];
      state.hydrated = true; // ✅ mark ready
    },

    addTowish: (state, { payload }) => {
      if (!payload?.id) return;

      const exists = state.items.some((i) => i.id === payload.id);
      if (!exists) state.items.push(payload);
    },

    removeFromwish: (state, { payload }) => {
      state.items = state.items.filter(
        (i) => i.id !== payload.id
      );
    },

    clearWish: (state) => {
      state.items = [];
      state.hydrated = true; // intentional clear
    },
  },
});

export const {
  loadWish,
  addTowish,
  removeFromwish,
  clearWish,
} = wishSlice.actions;

export default wishSlice.reducer;

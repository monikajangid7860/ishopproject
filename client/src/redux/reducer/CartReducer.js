import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* LOAD CART (FROM DB OR LS) */
    loadCart: (state, { payload }) => {
      state.items = Array.isArray(payload) ? payload : [];
    },

    /* ADD / INCREMENT */
    addTocart: (state, { payload }) => {
      if (!payload) return;

      const id = payload.id || payload._id;
      if (!id) return;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...payload,
          id,
          quantity: 1,
        });
      }

    },

    /* DECREMENT / REMOVE */
    removeFromcart: (state, { payload }) => {
      const id = payload?.id || payload?._id;
      if (!id) return;

      const item = state.items.find((i) => i.id === id);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== id);
      }

    },

    /* DELETE ITEM */
    deleteItem: (state, { payload }) => {
      const id = payload?.id || payload?._id;
      if (!id) return;

      state.items = state.items.filter(
        (item) => item.id !== id
      );

    },

    /* CLEAR CART */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  loadCart,
  addTocart,
  removeFromcart,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

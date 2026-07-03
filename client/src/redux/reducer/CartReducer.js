import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const saveToLocalStorage = (items) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* LOAD CART (FROM DB OR LS) */
    loadCart: (state, { payload }) => {console.log(payload);

      state.items = Array.isArray(payload) ? payload : [];
      saveToLocalStorage(state.items);
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

      saveToLocalStorage(state.items);
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

      saveToLocalStorage(state.items);
    },

    /* DELETE ITEM */
    deleteItem: (state, { payload }) => {
      const id = payload?.id || payload?._id;
      if (!id) return;

      state.items = state.items.filter(
        (item) => item.id !== id
      );

      saveToLocalStorage(state.items);
    },

    /* CLEAR CART */
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
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

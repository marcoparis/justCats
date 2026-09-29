import { createSlice } from "@reduxjs/toolkit";

export const MAX_QUANTITY = 99;

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, { payload }) => {
      const { id, name, image, cost } = payload;
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, MAX_QUANTITY);
      } else {
        state.items.push({ id, name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, { payload: id }) => {
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity: (state, { payload }) => {
      const { id, quantity } = payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = Math.min(quantity, MAX_QUANTITY);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.cost * item.quantity, 0);

export default CartSlice.reducer;

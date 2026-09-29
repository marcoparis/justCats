import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

const STORAGE_KEY = "paradise-nursery-cart";

const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved?.items) ? { cart: saved } : undefined;
  } catch {
    return undefined;
  }
};

export const createStore = (preloadedState) =>
  configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

const store = createStore(loadCart());

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().cart));
  } catch {
    // storage unavailable (private mode, quota): the cart just won't persist
  }
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import adoptionReducer from "./AdoptionSlice";
import { catById } from "./data/cats";

const STORAGE_KEY = "justcats-adoption";

const loadSelection = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved?.selectedIds)) return undefined;
    // drop ids of cats that are no longer in the catalog
    return { adoption: { selectedIds: saved.selectedIds.filter((id) => catById(id)) } };
  } catch {
    return undefined;
  }
};

export const createStore = (preloadedState) =>
  configureStore({
    reducer: { adoption: adoptionReducer },
    preloadedState,
  });

const store = createStore(loadSelection());

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().adoption));
  } catch {
    // storage unavailable (private mode, quota): the selection just won't persist
  }
});

export default store;

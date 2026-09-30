import { createSlice } from "@reduxjs/toolkit";

export const MAX_SELECTED = 3;

export const AdoptionSlice = createSlice({
  name: "adoption",
  initialState: {
    selectedIds: [],
  },
  reducers: {
    toggleCat: (state, { payload: id }) => {
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((s) => s !== id);
      } else if (state.selectedIds.length < MAX_SELECTED) {
        state.selectedIds.push(id);
      }
    },
    removeCat: (state, { payload: id }) => {
      state.selectedIds = state.selectedIds.filter((s) => s !== id);
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleCat, removeCat, clearSelection } = AdoptionSlice.actions;

export const selectSelectedIds = (state) => state.adoption.selectedIds;
export const selectSelectedCount = (state) => state.adoption.selectedIds.length;
export const selectIsFull = (state) => state.adoption.selectedIds.length >= MAX_SELECTED;

export default AdoptionSlice.reducer;

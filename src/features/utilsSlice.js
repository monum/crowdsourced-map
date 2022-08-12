// This slice is used to manage states that wouldn't really make sense in another slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousLocation: {},
  fullSizeMap: true,
  hideMap: true,
};

export const utilsSlice = createSlice({
  name: "Utils",
  initialState,

  reducers: {
    setPreviousLocation: (state, action) => {
      state.previousLocation = action.payload;
    },
    toggleFullSizeMap: (state, action) => {
      if (action.payload) state.fullSizeMap = action.payload;
      else state.fullSizeMap = !state.fullSizeMap;
    },
    setFullSizeMap: (state, action) => {
      state.fullSizeMap = action.payload;
    },
    setHideMap: (state, action) => {
      state.hideMap = action.payload;
    },
  },
});

export const {
  setPreviousLocation,
  toggleFullSizeMap,
  setFullSizeMap,
  setHideMap,
} = utilsSlice.actions;

export default utilsSlice.reducer;

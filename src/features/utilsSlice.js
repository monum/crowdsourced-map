// This slice is used to manage states that wouldn't really make sense in an other slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousLocation: {},
  fullSizeMap: true,
};

export const utilsSlice = createSlice({
  name: "Utils",
  initialState,

  reducers: {
    setPreviousLocation: (state, action) => {
      state.previousLocation = action.payload;
    },
    toggleFullSizeMap: (state) => {
      state.fullSizeMap = !state.fullSizeMap;
    },
    setFullSizeMap: (state, action) => {
      state.fullSizeMap = action.payload;
    },
  },
});

export const { setPreviousLocation, toggleFullSizeMap, setFullSizeMap } =
  utilsSlice.actions;

export default utilsSlice.reducer;

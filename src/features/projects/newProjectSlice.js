import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: { lat: null, lng: null },
  address: {
    isFetching: false,
    isError: false,
    data: "",
  },

  title: "",
  description: "",
  date: "",
  timestamp: "",
  isActive: false,
};

export const newProjectSlice = createSlice({
  name: "New Project",
  initialState,

  reducers: {
    setProjectDetails: (state, action) => {
      const { title, description, address, coords } = action.payload;

      state.title = title ?? state.title;
      state.description = description ?? state.description;
      state.coords.lat = coords?.lat ?? state.coords.lat;
      state.coords.lng = coords?.lng ?? state.coords.lng;

      state.address.isFetching =
        address?.isFetching ?? state.address.isFetching;
      state.address.isError = address?.isError ?? state.address.isError;
      state.address.data = address?.data ?? state.address.data;
    },
    submitProject: (state) => {
      const date = new Date();
      const timestamp = () => Math.round(date.getTime() / 1000);

      state.date = date.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
      });
      state.timestamp = timestamp;
    },
    toggleSuggestingProject: (state, action) => {
      if (action.payload === true) state.isActive = true;
      else if (action.payload === false) state.isActive = false;
      else state.isActive = !state.isActive;
    },
  },
});

export const { setProjectDetails, toggleSuggestingProject, submitProject } =
  newProjectSlice.actions;

export default newProjectSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import data from "../../Boston Locations Data/Boston_Neighborhoods.json";
import * as turf from "@turf/turf";

const initialState = {
  coords: { lat: null, lng: null },
  address: {
    isFetching: false,
    isError: false,
    data: "",
  },
  neighborhood: "",
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
      if (!state.isActive) return;
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
      if (!state.isActive) return;
      const date = new Date();
      const timestamp = () => Math.round(date.getTime() / 1000);
      const features = data.features;
      const point = turf.point([
        state.coords.lng.toFixed(14),
        state.coords.lat.toFixed(14),
      ]);

      state.timestamp = timestamp();
      state.date = date.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
      });
      state.neighborhood = features.find((feature) =>
        turf.booleanWithin(point, feature)
      )?.properties.Name;
    },
    toggleSuggestingProject: (state, action) => {
      state.isActive = action.payload;
    },
    resetProjectDetails: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setProjectDetails,
  toggleSuggestingProject,
  submitProject,
  resetProjectDetails,
} = newProjectSlice.actions;

export default newProjectSlice.reducer;

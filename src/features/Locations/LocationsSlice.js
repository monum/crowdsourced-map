import { createSlice } from "@reduxjs/toolkit";
import Location from "../../Boston Locations Data/Location";
import data from "../../Boston Locations Data/Boston_Neighborhoods.json";

const getNeighborhoods = () => {
  const neighborhoods = data.features.map(
    (feauture) => feauture.properties.Name
  );

  return neighborhoods.map((name, i) => ({
    label: { name, id: i },
    coords: new Location(name).getCenter(),
  }));
};

const initialState = {
  locationsData: getNeighborhoods(),
  selectedLocation: null,
};

export const locationsSlice = createSlice({
  name: "Boston Locations",
  initialState,

  reducers: {
    locationSelected: (state, action) => {
      if (action.payload)
        state.selectedLocation = state.locationsData.find(
          (location) => location.label.name === action.payload
        );
      else {
        state.selectedLocation = null;
        console.log("done");
      }
    },

    // clearSelectedLocation: (state) => {
    //   state.selectedNeighborhood = {};
    // },
  },
});

// export const selectAllNeighborhoods = (state) => state.posts;

export const { locationSelected } = locationsSlice.actions;

export default locationsSlice.reducer;

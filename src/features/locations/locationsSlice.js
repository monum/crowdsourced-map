// this slice holds the location data for the searchable locations
// and the selected locations the map may have to move to
import { createSlice } from "@reduxjs/toolkit";
import data from "../../Boston Locations Data/Boston_Neighborhoods.json";
import * as turf from "@turf/turf";

const getNeighborhoods = () => {
  // get all the necessary data from the neighborhoods json
  const neighborhoods = data.features.map(
    (feauture) => feauture.properties.Name
  );

  return neighborhoods.map((name, i) => ({
    label: { name, id: i },
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
      // take the selected location and find its center
      if (action.payload) {
        const featureCollection = data?.features.find(
          ({ properties: { Name } }) => Name === action.payload
        );

        const coords = turf.center(featureCollection).geometry.coordinates;
        state.selectedLocation = { lat: coords[1], lng: coords[0] };
        console.log(coords);
      } else {
        state.selectedLocation = null;
      }
    },
    setLocationCoords: (state, action) => {
      state.selectedLocation = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
  },
});

export const { locationSelected, setLocationCoords } = locationsSlice.actions;

export default locationsSlice.reducer;

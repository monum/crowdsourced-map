import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import LocationsReducer from "../features/Locations/LocationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    location: LocationsReducer,
  },
});

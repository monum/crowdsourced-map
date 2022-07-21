import { configureStore } from "@reduxjs/toolkit";
import projectsApi from "../features/projects/projectsApi";
import addressApi from "../features/projects/addressApi";
import locationsReducer from "../features/locations/locationsSlice";
import newProjectReducer from "../features/projects/newProjectSlice";
import utilsReducer from "../features/utilsSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    })
      .concat(projectsApi.middleware)
      .concat(addressApi.middleware),

  reducer: {
    location: locationsReducer,
    newProject: newProjectReducer,
    utils: utilsReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
});

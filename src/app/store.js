import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "../features/projects/projectsApi";
import locationsReducer from "../features/locations/locationsSlice";
import newProjectReducer from "../features/projects/newProjectSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }).concat(projectsApi.middleware),

  reducer: {
    location: locationsReducer,
    newProject: newProjectReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
});

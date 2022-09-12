import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";

import utilsReducer from "../features/utilsSlice";
import addressApi from "../features/suggestProject/addressApi";
import projectsApi from "../features/suggestProject/projectsApi";
import projectsReducer from "../features/projects/projectsSlice";
import locationsReducer from "../features/locations/locationsSlice";
import newProjectReducer from "../features/suggestProject/newProjectSlice";

const persistConfig = {
  key: "crowdsourced-map",
  storage,
  whitelist: ["newProject", "utils"],
};

const projectsPersistConfig = {
  key: "projects",
  storage,
  whitelist: ["filteredData", "neighborhoodFilters", "nameFilters"],
};

const reducers = combineReducers({
  projects: persistReducer(projectsPersistConfig, projectsReducer),
  location: locationsReducer,
  newProject: newProjectReducer,
  utils: utilsReducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(projectsApi.middleware)
      .concat(addressApi.middleware),

  reducer: persistedReducer,
});

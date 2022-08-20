import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filteredData: [],
  status: {
    isFetching: false,
    isLoading: false,
    isSuccess: false,
    error: false,
  },
  neighborhoodFilters: [],
  selectedProject: {
    id: "",
    fields: {},
    clickedMarker: false,
  },
  nameFilters: [],
};

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,

  reducers: {
    setProjects: (state, action) => {
      for (let d of state.data) {
        if (action.payload.find((r) => r.id === d.id)) return;
      }

      state.data = [...state.data, ...action.payload];
      state.count = state.data.length;
    },
    refreshProjects: (state) => {
      state.data = [];
    },
    setNeighborhoodFilters: (state, action) => {
      state.neighborhoodFilters = action.payload;
    },
    setNameFilters: (state, action) => {
      console.log(action.payload);
      state.nameFilters = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject.id = action.payload.id ?? state.selectedProject.id;
      state.selectedProject.fields =
        action.payload.fields ?? state.selectedProject.fields;
      state.selectedProject.clickedMarker =
        action.payload.clickedMarker ?? state.selectedProject.clickedMarker;
    },
  },
});

export const {
  setProjects,
  refreshProjects,
  setStatus,
  setNameFilters,
  setNeighborhoodFilters,
  setFilteredData,
  setSelectedProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;

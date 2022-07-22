import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  singleProject: {},
};

export const projectsSlice = createSlice({
  name: "Projects",
  initialState,

  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setSingleProject: (state, action) => {
      state.singleProject = action.payload;
    },
  },
});

export const { setProjects, setSingleProject } = projectsSlice.actions;

export default projectsSlice.reducer;

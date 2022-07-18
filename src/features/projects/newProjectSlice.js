import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  location: "",
  coords: "",
  date: "",
  timeStamp: "",
};

export const newProjectSlice = createSlice({
  name: "New Project",
  initialState,

  reducers: {
    setProject: (state, action) => {
      const { title, description, location, coords } = action.payload;
      const date = new Date();
      const timeStamp = () => Math.round(date.getTime() / 1000);

      state.title = title;
      state.description = description;
      state.location = location;
      state.coords = coords;
      state.date = date.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
      });
      state.timeStamp = timeStamp;
    },
  },
});

export default newProjectSlice.reducer;

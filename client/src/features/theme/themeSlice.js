import { createSlice } from "@reduxjs/toolkit";

// create theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : "teal-400",

    mode: localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode"))
      : "light",
  },
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("theme", JSON.stringify(action.payload));
      state.theme = action.payload;
    },
    setDark: (state, action) => {
      localStorage.setItem("mode", JSON.stringify(action.payload));
      state.mode = action.payload;
    },
  },
});

// selectors
export const theme = (state) => state.theme;
// actions
export const { setTheme, setDark } = themeSlice.actions;

// export
export default themeSlice.reducer;

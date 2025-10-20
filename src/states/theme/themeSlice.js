import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "light",
  },
  reducers: {
    changeDark: (state) => {
      state.value = "dark";
    },
    changeLight: (state) => {
      state.value = "light";
    },
  },
});

export const { changeDark, changeLight } = themeSlice.actions;
export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const fontSlice = createSlice({
  name: "font",
  initialState: {
    value: "roboto-mono",
  },
  reducers: {
    changeFont: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeFont } = fontSlice.actions;
export default fontSlice.reducer;

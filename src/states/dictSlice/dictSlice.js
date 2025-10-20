import { createSlice } from "@reduxjs/toolkit";

export const dictSlice = createSlice({
  name: "dictionary",
  initialState: {
    value: "",
  },
  reducers: {
    updateDict: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateDict } = dictSlice.actions;
export default dictSlice.reducer;

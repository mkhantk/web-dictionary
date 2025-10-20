import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./states/theme/themeSlice";
import dictReducer from "./states/dictSlice/dictSlice";
import fontReducer from "./states/fontSlice/fontSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dictionary: dictReducer,
    font: fontReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    Auth: authSlice,
  },
});

export default store;

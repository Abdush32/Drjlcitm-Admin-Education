import { createSlice } from "@reduxjs/toolkit";

const adminAuth = JSON.parse(localStorage.getItem("admin"));
const initialState = adminAuth ? [adminAuth] : [];

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    updateAuth(state, action) {
      state.push(action.payload);
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    clearAuth(state) {
      state.pop();
      localStorage.removeItem("admin");
    },
  },
});

export const { updateAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

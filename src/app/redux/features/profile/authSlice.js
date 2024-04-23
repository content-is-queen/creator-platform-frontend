import Secure from "@/utils/SecureLs";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: Secure.getToken() || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.loggedUser;
      Secure.setToken(action.payload.token);
      state.token = action.payload.token;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, userLogout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

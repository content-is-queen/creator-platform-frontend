import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.loggedUser;
      state.token = action.payload.token;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token= null;
    },
  },
});

export const { login, userLogout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

"use client";
import { configureStore } from "@reduxjs/toolkit";
import authVerify from "./features/profile/profileSlice";
import authReducer from "./features/profile/authSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      profile: authVerify,
      auth: authReducer,
    },
  });
}

const store = makeStore();

export default store;

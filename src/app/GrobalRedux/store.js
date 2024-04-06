'use client';
import { configureStore } from "@reduxjs/toolkit";
import authVerify from "./features/profile/profileSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authVerify,
    },
  });
}

const store = makeStore();

export default store;

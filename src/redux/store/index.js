import { configureStore } from "@reduxjs/toolkit";
import authVerify from "../feature/verifySlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authVerify,
    },
  });
}

const store = makeStore();

export default store;

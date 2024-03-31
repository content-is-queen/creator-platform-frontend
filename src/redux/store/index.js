import {
  configureStore,
} from '@reduxjs/toolkit';


export function makeStore() {
  return configureStore({
    reducer: {
      // auth: authSReducer,
    },
  });
}

const store = makeStore();

export default store;

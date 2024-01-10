"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducer/cartReducer.js";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;

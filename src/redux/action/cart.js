// cartActions.js
"use client";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../reducer/cartReducer";

// import { addToCart, removeFromCart, updateQuantity } from "./cartSlice";

export const addTocart = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

export const removeProductFromCart = (productId) => (dispatch, getState) => {
  dispatch(removeFromCart(productId));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
};

export const modifyProductQuantity =
  (productId, newQuantity) => (dispatch, getState) => {
    dispatch(updateQuantity({ productId, newQuantity }));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  };

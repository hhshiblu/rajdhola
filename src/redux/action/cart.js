import secureLocalStorage from "react-secure-storage";
import Cookies from "js-cookie";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../reducer/cartReducer";

export const addTocart = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data));
  secureLocalStorage.setItem("c", JSON.stringify(getState().cart.cart));
  return data;
};

export const removeProductFromCart = (productId) => (dispatch, getState) => {
  dispatch(removeFromCart(productId));
  secureLocalStorage.setItem("c", JSON.stringify(getState().cart.cart));
};

export const modifyProductQuantity =
  (productId, newQuantity) => (dispatch, getState) => {
    dispatch(updateQuantity({ productId, newQuantity }));
    secureLocalStorage.setItem("c", JSON.stringify(getState().cart.cart));
  };

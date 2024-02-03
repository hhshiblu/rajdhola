// "use client";
import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
// Define an initial cart state
const initialCart =
  typeof secureLocalStorage !== "undefined"
    ? JSON.parse(secureLocalStorage.getItem("c")) || []
    : [];

const initialState = {
  cart: initialCart,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, color, size } = action.payload;
      const isItemExist = state.cart.find((i) => i.productId === productId);

      const newItem = {
        productId,
        quantity,
        color, // Add color property only if color is provided
        size, // Add size property only if size is provided
      };

      if (isItemExist) {
        const updatedCart = state.cart.map((i) =>
          i.productId === isItemExist.productId ? newItem : i
        );
        state.cart = updatedCart;
      } else {
        state.cart.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      state.cart = state.cart.filter(
        (item) => item.productId !== productIdToRemove
      );
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;

      const itemToUpdate = state.cart.find((i) => i.productId === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;

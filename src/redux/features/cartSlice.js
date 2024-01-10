// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  wishlist: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state?.cart.find(
        (product) => product.id === action.payload.id
      );

      if (existingItem) {
        const updatedCart = state.cart.map((product) =>
          product.id === existingItem.id
            ? { ...product, qty: product.qty + 1 }
            : product
        );
        state.cart = updatedCart;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increment: (state, action) => {
      state.cart = state.cart.map((product) =>
        product.id === action.payload
          ? { ...product, qty: product.qty + 1 }
          : product
      );
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((product) =>
        product.id === action.payload && product.qty > 1
          ? { ...product, qty: product.qty - 1 }
          : product
      );
    },
    setCartLocally: (state, action) => {
      state.cart = action.payload;
    },

    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    setWishlistLocally: (state, action) => {
      state.wishlist = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increment,
  decrement,
  addToWishlist,
  removeFromWishlist,
  setCartLocally,
  setWishlistLocally,
  clearWishlist,
} = cartSlice.actions;
export default cartSlice.reducer;

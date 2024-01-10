import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import sortingReducer from "../features/sortingSlice";

export const store = configureStore({
  reducer: {
    userDetails: userReducer,
    cart: cartReducer,
    sorting: sortingReducer,
  },
});


import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    // Redux Toolkit includes thunk as default middleware
});

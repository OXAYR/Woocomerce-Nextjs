import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { cartSlice } from "./cartSlice/cartSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
    reducer: {
        cart: persistedReducer,
    },
});

export const persistor = persistStore(store);

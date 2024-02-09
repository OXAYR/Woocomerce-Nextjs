import { createSlice } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem("cartState")
    ? JSON.parse(localStorage.getItem("cartState"))
    : {
        lineItems: [],
    };

const initialState = {
    ...persistedState,
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("cartState", serializedState);
    } catch (err) {
        console.error("Error saving state to localStorage:", err);
    }
};

const addLineItemReducer = (state, action) => {
    const index = state.lineItems.findIndex(
        (lineItem) => lineItem.id === action.payload.id
    );
    if (index === -1) {
        action.payload.quantity = 1;
        state.lineItems = [...state.lineItems, action.payload];
    } else {
        state.lineItems[index].quantity++;
    }
    saveState(state); 
};

const decrementQuantityReducer = (state, action) => {
    const index = state.lineItems.findIndex(
        (lineItem) => lineItem.id === action.payload.id
    );
    if (index >= 0 && state.lineItems[index].quantity > 1) {
        state.lineItems[index].quantity -= action.payload.quantity;
    } else if (index >= 0 && state.lineItems[index].quantity === 1) {
        state.lineItems.splice(index, 1);
    }
    saveState(state); 
};

const removeLineItemReducer = (state, action) => {
    const index = state.lineItems.findIndex(
        (lineItem) => lineItem.id === action.payload.id
    );
    if (index >= 0) {
        state.lineItems.splice(index, 1);
    }
    saveState(state); 
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addLineItem: addLineItemReducer,
        decrementLineItemQuantity: decrementQuantityReducer,
        removeLineItem: removeLineItemReducer,
        resetCartState() {
            return initialState;
        },
    },
});

export const {
    addLineItem,
    decrementLineItemQuantity,
    removeLineItem,
    resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;

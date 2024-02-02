import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lineItems: [],
};

const addLineItemReducer = (
    state,
    action
) => {
    console.log("from add line---->", action.payload)
    const index = state.lineItems.findIndex(
        (lineItem) => lineItem.product_id === action.payload.product_id
    );
    if (index === -1) {
        state.lineItems = [...state.lineItems, action.payload];
    } else {
        state.lineItems[index].quantity += action.payload.quantity;
    }
    console.log("After add------------->", state.lineItems)
};


const decrementQuantityReducer = (
    state,
    action
) => {
    const index = state.lineItems.findIndex(
        (lineItem) => lineItem.product_id === action.payload.product_id
    );
    if (index >= 0 && state.lineItems[index].quantity > 1) {

        state.lineItems[index].quantity -= action.payload.quantity;
    } else if (index >= 0 && state.lineItems[index].quantity === 1) {

        state.lineItems.splice(index, 1);
    }
};

const removeLineItemReducer = (
    state,
    action
) => {
    const index = state.lineItems.findIndex(
        (lineItem) => lineItem.product_id === action.payload.product_id
    );
    if (index >= 0) {
        state.lineItems.splice(index, 1);
    }
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
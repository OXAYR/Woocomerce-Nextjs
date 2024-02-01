// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'next-cookies';

const initialState = {
    lineItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addLineItem: (state, action) => {
            // Add logic to handle adding a line item to the cart
            state.lineItems.push(action.payload);
            updateCartInCookies(state.lineItems);
        },
        decrementLineItemQuantity: (state, action) => {
            // Add logic to handle decrementing line item quantity
            const index = state.lineItems.findIndex(
                (lineItem) => lineItem.product_id === action.payload.product_id
            );
            if (index >= 0 && state.lineItems[index].quantity > 1) {
                state.lineItems[index].quantity -= action.payload.quantity;
            } else if (index >= 0 && state.lineItems[index].quantity === 1) {
                state.lineItems.splice(index, 1);
            }
            updateCartInCookies(state.lineItems);
        },
        removeLineItem: (state, action) => {
            // Add logic to handle removing a line item from the cart
            const index = state.lineItems.findIndex(
                (lineItem) => lineItem.product_id === action.payload.product_id
            );
            if (index >= 0) {
                state.lineItems.splice(index, 1);
                updateCartInCookies(state.lineItems);
            }
        },
        resetCartState: () => initialState,
    },
});

export const {
    addLineItem,
    decrementLineItemQuantity,
    removeLineItem,
    resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;

const updateCartInCookies = (updatedCart) => {
    // Set a cookie named 'cart' with the updated cart array
    setCookie(null, 'cart', JSON.stringify(updatedCart), {
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        path: '/', // Set the cookie for the entire domain
    });
};

const setCookie = (context, name, value, options) => {
    // Use Next.js Cookies or any other cookie library here
    Cookies(context).set(name, value, options);
};

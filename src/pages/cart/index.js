// pages/cart.js

import { useSelector } from 'react-redux';
import CartItems from './CartItems';
import { resetCartState } from '../../(store)/cartSlice/cartSlice';
import { useDispatch } from 'react-redux';

const Cart = () => {
    const cart = useSelector((state) => state.cart.lineItems);
    console.log("cart-------->", cart);
    const dispatch = useDispatch();

    const resetCart = () => {
        dispatch(resetCartState());
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart ? (
                <div>
                    {cart.map((item) => (

                        <CartItems key={item.product_id} lineItem={item} />
                    ))}
                    <p>Total Price: £{calculateTotalPrice(cart)}</p>
                    <button onClick={resetCart}>Reset Cart</button>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
        const formattedPrice = parseFloat(item.price) * 100;
        totalPrice += (formattedPrice * item.quantity) / 100;
    });
    return totalPrice.toFixed(2);
};

export default Cart;


import { useDispatch } from "react-redux";
import CartQty from "../../components/cartQty";
import {
    decrementLineItemQuantity,
    addLineItem,
    removeLineItem,
} from "../../(store)/cartSlice/cartSlice"


const calculatePrice = (quantity, price) => {
    console.log(price)
    const formattedPrice = parseFloat(price) * 100;
    const result = (formattedPrice * quantity) / 100;
    return result.toFixed(2);
};

const CartItem = (props) => {
    const dispatch = useDispatch();

    const data = { ...props.lineItem };
    data.quantity = 1;

    const increment = () => {
        dispatch(addLineItem(data));
    };

    const decrement = () => {
        dispatch(decrementLineItemQuantity(data));
    };

    const remove = () => {
        dispatch(removeLineItem(data));
    };



    // CartItems.js

    const placeOrder = async () => {
        try {
            console.log("product id---------->", data.id)
            const orderData = {
                payment_method: "cash",
                payment_method_title: "Cash",
                set_paid: false,
                line_items: [
                    {
                        product_id: data.id,
                        quantity: data.quantity,
                    },
                ],
            };

            const response = await fetch('/api/orders/woocommerce', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order: orderData }),
            });

            if (response.ok) {
                console.log("Order placed successfully:", response);

            }


            const responseGet = await fetch('/api/orders/woocommerce', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const updatedOrders = responseGet;
            console.log("Updated orders:", updatedOrders);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };




    return (
        <div>
            <div onClick={remove}>X</div>
            <div>{props.lineItem.name}</div>
            <CartQty
                quantity={props.lineItem.quantity}
                decrementFunction={decrement}
                incrementFunction={increment}
            />
            <div>
                £{calculatePrice(props.lineItem.quantity, props.lineItem.price)}
            </div>
            <div> <button onClick={placeOrder}>Place Order</button></div>
        </div>
    );
};
export default CartItem;
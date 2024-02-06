
import { useDispatch } from "react-redux";
import CartQty from "./cartQty";
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
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="text-gray-700 font-semibold">
                    {data.name}
                </div>
                <div className="text-gray-500 font-black cursor-pointer mr-8 mt-6" onClick={remove}>
                    X
                </div>
            </div>
            <div className="flex items-center mt-2">
                <CartQty
                    quantity={data.quantity}
                    decrementFunction={decrement}
                    incrementFunction={increment}
                />
                <div className="ml-4">
                    Rs {calculatePrice(data.quantity, data.price)}
                </div>
            </div>
            <button
                onClick={placeOrder}
                className="mt-4 border-black hover:bg-black hover:text-white text-black py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
                Place Order
            </button>
        </div>
    );

};
export default CartItem;
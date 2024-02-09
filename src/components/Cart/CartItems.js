
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


    return (
        <div className="rounded-lg p-4 mb-4">
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
            <div className=" divide-x-8 divide-black ">

            </div>
          
        </div>
    );

};
export default CartItem;

import { useDispatch } from "react-redux";
import CartQty from "../../(components)/cartQty";
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
        </div>
    );
};
export default CartItem;
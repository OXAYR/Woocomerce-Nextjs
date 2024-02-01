const CartQty = ({ quantity, decrementFunction, incrementFunction }) => {
    return (
        <div>
            <button onClick={decrementFunction}>-</button>
            <span>{quantity}</span>
            <button onClick={incrementFunction}>+</button>
        </div>
    );
};

export default CartQty;
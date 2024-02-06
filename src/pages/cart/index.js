
import { useSelector } from 'react-redux';
import CartItems from '../../components/Cart/CartItems';
import { resetCartState } from '../../(store)/cartSlice/cartSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'

const Cart = () => {
    const cart = useSelector((state) => state.cart.lineItems);
    console.log("cart-------->", cart);
    const router = useRouter();
    // const dispatch = useDispatch();

    const handleClick = () => {
        router.push('/checkout');
        // dispatch(resetCartState());
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md m-10">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {cart.length > 0 ? (
                <div>
                    {cart.map((item) => (
                        <CartItems key={item.id} lineItem={item} />
                    ))}
                    <p className="text-gray-600 mb-2">
                        Total Price: Rs{calculateTotalPrice(cart)}
                    </p>
                    <button
                        onClick={handleClick}
                        className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    >
                        Proceed To Checkout
                    </button>
                </div>
            ) : (
                <p className="text-gray-600">Your cart is empty</p>
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

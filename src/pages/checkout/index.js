
import CartItems from '@/components/Cart/CartItems';
import AddressForm from '@/components/Checkout/AddressForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const cart = useSelector((state) => state.cart.lineItems);
    const [billing, setBilling] = useState({
        first_name: '',
        last_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        email: '',
        phone: '',
    });

    const [shipping, setShipping] = useState({
        first_name: '',
        last_name: '',
        company: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        phone: '',
    });

    console.log("cart-------->", cart[0].id)

    const handleCheckout = () => {
        const orders = {
            billing,
            shipping,
            payment_method: paymentMethod,
            payment_method: paymentMethod,
            set_paid: false,
            line_items: cart
        };
        console.log('Orders:', orders);
    };
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBilling((prevBilling) => ({ ...prevBilling, [name]: value }));
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShipping((prevShipping) => ({ ...prevShipping, [name]: value }));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto bg-white rounded-lg shadow-md p-4">
                <div className='bg-gray-100 rounded-lg p-4'>
                    {cart.map((item) => (
                        <CartItems key={item.id} lineItem={item} />
                    ))}
                    <p className="text-gray-600 mb-2">
                        Total Price: Rs{calculateTotalPrice(cart)}
                    </p>
                </div>
                <div className='my-5 flex'>
                    <div>
                        <AddressForm
                            title="Billing Address"
                            address={billing}
                            onChange={handleBillingChange}
                        />
                    </div>
                    <div className='divide-y-2 divide-slate-500 border-dotted'>

                    </div>

                    <div className='pl-5'>
                        <AddressForm
                            title="Shipping Address"
                            address={shipping}
                            onChange={handleShippingChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Payment Method</h2>
                    <label className='mr-4'>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={handlePaymentChange}
                        />
                        Cash
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="ppal"
                            checked={paymentMethod === 'ppal'}
                            onChange={handlePaymentChange}
                        />
                        PaypaL
                    </label>
                </div>
                <button
                    onClick={(handleCheckout)}
                    className="bg-black hover:bg-gray-950 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                    Submit Order
                </button>
            </div>
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

export default CheckoutPage;

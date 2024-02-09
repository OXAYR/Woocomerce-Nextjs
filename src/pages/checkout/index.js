
import CartItems from '@/components/Cart/CartItems';
import AddressForm from '@/components/Checkout/AddressForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPayment from '@/components/Checkout/cardPayment';

const CheckoutPage = () => {

    const stripePromise = loadStripe(
        `${"pk_test_51Oh79uLHaE9JSchrZN6M3Im6tS7jPvj7tV463VSvOiSUuN3ZajNrn6hqB7a0UdWjJOLhCd2DnYWkAPBibUdznV9r00c1IhiJcx"}`
    );
    console.log("strip promise--------->", stripePromise)
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
    const handleCheckout = async () => {
        setLoading(true);
        console.log("payment method------->", paymentMethod)
        try {
            const orderData = {
                billing: billing,
                shipping: shipping,
                payment_method: paymentMethod,
                set_paid: false,
                line_items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity
                }))
            };

            // Always send the order data for posting
            const response = await fetch('/api/orders/woocommerce', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order: orderData }),
            });
            if (response.ok) {
                console.log("Order placed successfully:", response);

            } else {
                console.error("Failed to place order:", response.statusText);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
        setLoading(false);
        // router.push("/checkout/orderplaced");
    };

    const handleStripeCheckout = async (result) => {
        setLoading(true);
        console.log("this is the result from handle stripe checkout------>", result.paymentMethod.id)
        try {
            const response = await fetch('/api/stripe/payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: calculateTotalPrice(cart) * 100,
                    currency: 'usd',
                    paymentMethodId: result.paymentMethod.id
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Payment Intent:', data.paymentIntent);

            } else {
                console.error('Failed to create Payment Intent:', response.statusText);

            }
        } catch (error) {
            console.error('Error creating Payment Intent:', error);

        }

        setLoading(false);
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
                            value="stripe"
                            checked={paymentMethod === 'stripe'}
                            onChange={handlePaymentChange}
                        />
                        Card Payment
                    </label>
                    {paymentMethod === 'stripe' && (
                        <Elements stripe={stripePromise}>
                            <CardPayment handleCheckout={handleStripeCheckout} />
                        </Elements>
                    )}
                </div>
                {loading && <Loader />}
                <button
                    onClick={(handleStripeCheckout)}
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

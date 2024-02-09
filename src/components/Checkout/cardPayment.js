import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CardPayment = ({ handleCheckout }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (result.error) {
            console.error(result.error);
        } else {
            // Payment successful, proceed with checkout
            handleCheckout(result);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

export default CardPayment;

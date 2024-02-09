import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";

const CardPayment = () => {
    return (
        <form className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">
                    Card Number
                </label>
                <CardNumberElement
                    id="cardNumber"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cardExpiry" className="block text-gray-700 font-semibold mb-2">
                    Expiry Date
                </label>
                <CardExpiryElement
                    id="cardExpiry"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cardCvc" className="block text-gray-700 font-semibold mb-2">
                    CVC
                </label>
                <CardCvcElement
                    id="cardCvc"
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
        </form>
    );
};

export default CardPayment;
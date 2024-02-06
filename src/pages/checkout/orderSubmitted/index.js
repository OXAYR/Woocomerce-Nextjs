import React from 'react';

const ThankYouPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-md shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-4">Thank You for Your Order!</h1>
                <p className="text-lg text-gray-700 mb-6">Your order has been successfully placed.</p>
                {/* Additional content, such as order details, can go here */}
                <div className="text-center">
                    <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
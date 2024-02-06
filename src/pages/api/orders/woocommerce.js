// pages/api/woocommerce.js

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
    url: "http://localhost/next-wp",
    consumerKey: process.env.WOOCOMMERCE_KEY,
    consumerSecret: process.env.WOOCOMMERCE_SECRET,
    version: "wc/v3",
});

export default async function handler(req, res) {
    try {

        const { order: orderData } = req.body;
        console.log("request method", req.method);

        if (!orderData) {
            return res.status(400).json({ error: 'Order data is missing' });
        }

        if (req.method === 'POST') {


            console.log("Sending request to WooCommerce API...");

            const response = await api.post("orders", orderData);


            res.status(200).json({ message: 'Order created successfully', data: response });
        } else if (req.method === "GET") {
            try {
                const response = await api.get("orders");
                return response;
            } catch (error) {
                throw new Error(error);
            }
        }
    } catch (error) {
        console.error('Error creating WooCommerce order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

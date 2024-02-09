import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_BASE_URL,
    consumerKey: process.env.WOOCOMMERCE_KEY,
    consumerSecret: process.env.WOOCOMMERCE_SECRET,
    version: "wc/v3",
});

export async function fetchWooCommerceProducts() {
    try {

        const response = await api.get("products");
        return response;
    } catch (error) {
        throw new Error(error);
    }
}



// export async function createWooCommerceOrder({ order }) {
//     try {
//         console.log("Order:", order);

//         if (!order) {
//             throw new Error('Order data is missing or undefined');
//         }

//         // const jsonString = JSON.stringify(order);

//         const defaultHeaders = {
//             'Content-Type': 'application/json',
//         };

//         console.log("Sending request to WooCommerce API...");

//         const response = await api.post("orders", order, { headers: defaultHeaders });
//         // console.log("WooCommerce API response:", response);

//         return response;
//     } catch (error) {
//         console.error("Error creating WooCommerce order:", error.message);
//         throw error;
//     }
// }

// export async function fetchWooCommerceOrder() {
//     try {
//         const response = await api.get("orders");
//         return response;
//     } catch (error) {
//         throw new Error(error);
//     }
// }

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// initialise the WooCommerceRestApi //
const api = new WooCommerceRestApi({
    url: "http://localhost/next-wp",
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
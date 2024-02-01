import { fetchWooCommerceProducts } from "@/utils/woocomerce-api";

export const getStaticProps = async () => {
    const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
        console.error(error)
    );

    if (!wooCommerceProducts) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            products: wooCommerceProducts.data,
        },
        // revalidate: 60 // regenerate page with new data fetch after 60 seconds
    };
};

export default function Home({ products }) {
    console.log("Products------------>", products);
    return (
        <>
            <div>products</div>
        </>
    )
}
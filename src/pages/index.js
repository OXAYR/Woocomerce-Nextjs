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
    };
};

export default function Home({ products }) {
    console.log("Products------------>", products);
    return (
        <>
            <div className=" bg-slate-600">products</div>
        </>
    )
}
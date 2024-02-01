import ProductCard from "@/(components)/ProductsCard";
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
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
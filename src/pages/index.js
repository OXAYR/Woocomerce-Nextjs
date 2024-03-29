import ProductCard from "@/components/Products/ProductsCard";
import { fetchWooCommerceProducts } from "@/pages/api/products/products-api";

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
            <div className=" mx-10 my-10 grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
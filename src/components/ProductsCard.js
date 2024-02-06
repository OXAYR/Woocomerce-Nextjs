// ProductCard.js
import { useDispatch } from "react-redux";
import { addLineItem } from "../(store)/cartSlice/cartSlice";
import { useRouter } from 'next/navigation'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleAddToCart = () => {
        // Dispatch the addLineItem action with the product as payload
        dispatch(addLineItem(product));
        router.push('/cart');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-4">
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-full h-auto rounded-lg"
                />
            </div>
            <div className="text-center">
                <span className="text-gray-700 font-semibold text-lg">
                    {product.name}
                </span>
                <div className="mt-2">
                    <span className="text-gray-500 line-through">
                        Rs {product.regular_price}
                    </span>
                    {product.sale_price && (
                        <span className="text-red-600 ml-2">
                            Rs {product.sale_price}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

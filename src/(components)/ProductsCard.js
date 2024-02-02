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
        <div className="w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
            <div className="relative w-full aspect-w-1 aspect-h-1">
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="w-full px-4 pt-5 pb-7 flex flex-col items-center">
                <span className="text-lg font-bold mb-2">{product.name}</span>
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-500">
                        Rs {product.regular_price}
                    </span>
                    {product.sale_price && (
                        <>
                            <span className="text-red-600 line-through">
                                Rs {product.regular_price}
                            </span>
                            <span className="text-green-600">Rs {product.sale_price}</span>
                        </>
                    )}
                </div>
                <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

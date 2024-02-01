const ProductCard = ({ product }) => {
    return (
        <div className="w-full">
            <div className="relative w-full aspect-w-1 aspect-h-1">
                <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="w-full px-4 pt-5 pb-7 flex justify-center gap-12">
                <span>{product.name}</span>
                <span>--</span>
                <span>
                    <strong>£{product.regular_price}</strong>
                </span>
            </div>
        </div>
    );
};

export default ProductCard;

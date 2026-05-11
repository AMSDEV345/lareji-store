import { useCart } from "../../hooks/useCart"
import formatPrice from "../../utils/formatPrice"

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={onViewDetails}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 space-y-2 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {product.category}
        </p>

        {/* Push button to top */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart()
          }}
          className="bg-forest text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition self-start"
        >
          Add to Cart
        </button>

        {/* Price at bottom */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <span className="text-lg font-bold text-forest">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
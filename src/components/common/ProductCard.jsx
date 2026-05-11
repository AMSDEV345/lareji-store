import { useCart } from "../../hooks/useCart"
import formatPrice from "../../utils/formatPrice"

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={onViewDetails}
    >
      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Content - flex column to push button down */}
      <div className="p-4 flex flex-col flex-grow gap-3">
        {/* Product Info */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="text-base font-semibold text-gray-900">
            {product.name}
          </h3>
        </div>

        {/* Price and Button - pushed to bottom */}
        <div className="mt-auto pt-3 border-t border-gray-100 space-y-3">
          <span className="text-lg font-bold text-green-700 block">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart()
            }}
            className="w-full bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition font-medium"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
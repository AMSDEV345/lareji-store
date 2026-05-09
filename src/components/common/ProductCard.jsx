import { useCart } from "../../hooks/useCart"
import formatPrice from "../../utils/formatPrice"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-charcoal">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-forest">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-forest text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from "react";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import SectionTitle from "../components/common/SectionTitle";
import { PRODUCTS } from "../data/products";

export default function Shop({ navigate, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  useEffect(() => {
    let filtered = PRODUCTS;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = [...filtered].reverse();
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

  return (
    <>
      <style>{`
        /* ── Page ── */
        .shop {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          margin-top: 72px;
          padding-bottom: 80px;
        }

        /* ── Hero ── */
        .shop__hero {
          background: var(--green);
          color: var(--white);
          padding: clamp(60px, 10vw, 100px) clamp(28px, 6vw, 80px);
          text-align: center;
        }

        .shop__hero-title {
          font-family: var(--serif);
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .shop__hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.7);
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Controls ── */
        .shop__controls {
          background: var(--white);
          padding: 24px clamp(16px, 6vw, 80px);
          border-bottom: 1px solid var(--beige-dark);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .shop__filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          background: var(--white);
          border: 1px solid var(--beige-dark);
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 4px;
          font-family: var(--sans);
        }

        .filter-btn:hover { border-color: var(--green); }

        .filter-btn.active {
          background: var(--green);
          color: var(--white);
          border-color: var(--green);
        }

        .shop__sort {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .shop__sort-label {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--muted);
        }

        .shop__sort-select {
          padding: 8px 12px;
          border: 1px solid var(--beige-dark);
          background: var(--white);
          font-family: var(--sans);
          font-size: 12px;
          cursor: pointer;
          border-radius: 4px;
        }

        /* ── Grid ── */
        .shop__body {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .shop__main {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: transparent;
          padding: clamp(40px, 6vw, 60px) clamp(16px, 4vw, 40px) 0;
        }

        .shop__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .shop__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 1200px) {
          .shop__grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 24px;
          }
        }

        /* ── Empty State ── */
        .shop__empty {
          text-align: center;
          padding: 80px 24px;
        }

        .shop__empty-icon {
          font-size: 56px;
          margin-bottom: 16px;
          display: block;
        }

        .shop__empty-title {
          font-family: var(--serif);
          font-size: 26px;
          margin: 0 0 8px 0;
        }

        .shop__empty-text {
          color: var(--muted);
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .shop__controls {
            flex-direction: column;
            align-items: stretch;
          }

          .shop__filters { justify-content: center; }
          .shop__sort { justify-content: center; }

          .shop__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 0 12px;
          }
        }
      `}</style>

      <div className="shop">
        {/* Hero */}
        <div className="shop__hero">
          <h1 className="shop__hero-title">Shop LAREJI</h1>
          <p className="shop__hero-sub">
            Authentic African ingredients, carefully sourced and beautifully
            packaged
          </p>
        </div>

        {/* Controls */}
        <div className="shop__controls">
          <div className="shop__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${selectedCategory === cat ? " active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="shop__sort">
            <label className="shop__sort-label">Sort:</label>
            <select
              className="shop__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="shop__body">
          <Container>
            <div className="shop__main">
              {filteredProducts.length > 0 ? (
                <div className="shop__grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => addToCart(product)}
                      onViewDetails={() => navigate(`product/${product.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="shop__empty">
                  <span className="shop__empty-icon">🔍</span>
                  <h2 className="shop__empty-title">No Products Found</h2>
                  <p className="shop__empty-text">
                    Try a different category or check back soon
                  </p>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import { PRODUCTS } from "../data/products";

export default function Shop({ navigate, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  useEffect(() => {
    let filtered = PRODUCTS;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered = [...filtered].reverse();
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, searchTerm]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setSortBy("featured");
  };

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
          background: var(--beige-light);
        }

        /* ── Hero ── */
        .shop__hero {
          background: linear-gradient(135deg, var(--green) 0%, rgba(30,75,50,0.95) 100%);
          color: var(--white);
          padding: clamp(60px, 10vw, 100px) clamp(28px, 6vw, 80px);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .shop__hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
          pointer-events: none;
        }

        .shop__hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.02);
          border-radius: 50%;
          pointer-events: none;
        }

        .shop__hero-title {
          font-family: var(--serif);
          font-size: clamp(40px, 5vw, 72px);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
          letter-spacing: -0.5px;
        }

        .shop__hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.85);
          max-width: 520px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          line-height: 1.6;
        }

        /* ── Controls ── */
        .shop__controls {
          background: var(--white);
          padding: 24px clamp(16px, 6vw, 80px);
          border-bottom: 1px solid var(--beige-dark);
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 72px;
          z-index: 40;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        /* ── Search ── */
        .shop__search-wrapper {
          width: 100%;
          position: relative;
        }

        .shop__search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid var(--beige-dark);
          border-radius: 6px;
          font-family: var(--sans);
          font-size: 14px;
          transition: all 0.2s ease;
          background: var(--white);
          color: var(--charcoal);
        }

        .shop__search-input::placeholder {
          color: var(--muted);
        }

        .shop__search-input:focus {
          outline: none;
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(30,75,50,0.1);
        }

        .shop__search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-size: 16px;
          pointer-events: none;
        }

        /* ── Filter & Sort Bar ── */
        .shop__bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .shop__filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          flex: 1;
          min-width: 0;
        }

        .filter-btn {
          padding: 8px 16px;
          background: var(--white);
          border: 1px solid var(--beige-dark);
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 6px;
          font-family: var(--sans);
          font-weight: 500;
          white-space: nowrap;
        }

        .filter-btn:hover {
          border-color: var(--green);
          background: rgba(30,75,50,0.04);
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background: var(--green);
          color: var(--white);
          border-color: var(--green);
          box-shadow: 0 4px 12px rgba(30,75,50,0.2);
        }

        .shop__sort-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .shop__sort-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }

        .shop__sort-select {
          padding: 8px 12px;
          border: 1px solid var(--beige-dark);
          background: var(--white);
          font-family: var(--sans);
          font-size: 12px;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
          color: var(--charcoal);
        }

        .shop__sort-select:hover {
          border-color: var(--green);
        }

        .shop__sort-select:focus {
          outline: none;
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(30,75,50,0.1);
        }

        .shop__result-count {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .shop__clear-btn {
          padding: 6px 12px;
          background: transparent;
          border: 1px solid var(--beige-dark);
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          color: var(--muted);
          transition: all 0.2s;
          font-family: var(--sans);
        }

        .shop__clear-btn:hover {
          border-color: var(--charcoal);
          color: var(--charcoal);
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
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          width: 100%;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 640px) {
          .shop__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 1024px) {
          .shop__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }

        @media (min-width: 1280px) {
          .shop__grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 24px;
          }
        }

        /* ── Empty State ── */
        .shop__empty {
          text-align: center;
          padding: 80px 24px;
          grid-column: 1 / -1;
        }

        .shop__empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          display: block;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .shop__empty-title {
          font-family: var(--serif);
          font-size: 28px;
          margin: 0 0 8px 0;
          color: var(--charcoal);
          font-weight: 300;
        }

        .shop__empty-text {
          color: var(--muted);
          margin: 0 0 20px 0;
          font-size: 14px;
        }

        .shop__empty-btn {
          padding: 10px 24px;
          background: var(--green);
          color: var(--white);
          border: none;
          border-radius: 6px;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--sans);
          font-weight: 500;
        }

        .shop__empty-btn:hover {
          background: var(--green-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30,75,50,0.2);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .shop__controls {
            gap: 12px;
          }

          .shop__bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .shop__filters {
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            gap: 6px;
          }

          .filter-btn {
            padding: 6px 12px;
            font-size: 10px;
            flex-shrink: 0;
          }

          .shop__sort-group {
            width: 100%;
            justify-content: space-between;
          }

          .shop__sort-select {
            flex: 1;
            min-width: 120px;
          }

          .shop__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .shop__hero-title {
            font-size: 32px;
          }

          .shop__hero-sub {
            font-size: 14px;
          }

          .shop__controls {
            padding: 16px 12px;
          }

          .shop__search-input {
            padding: 10px 14px 10px 36px;
            font-size: 13px;
          }

          .shop__search-icon {
            left: 12px;
            font-size: 14px;
          }

          .shop__grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .filter-btn {
            padding: 6px 10px;
            font-size: 9px;
          }

          .shop__bar {
            gap: 8px;
          }

          .shop__result-count {
            font-size: 10px;
          }

          .shop__sort-label {
            display: none;
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
          {/* Search Bar */}
          <div className="shop__search-wrapper">
            <span className="shop__search-icon">🔍</span>
            <input
              type="text"
              className="shop__search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter & Sort Bar */}
          <div className="shop__bar">
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

            <div className="shop__sort-group">
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

              <span className="shop__result-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
              </span>

              {(searchTerm || selectedCategory !== "All" || sortBy !== "featured") && (
                <button className="shop__clear-btn" onClick={clearFilters}>
                  Clear
                </button>
              )}
            </div>
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
                      onViewDetails={() => navigate("product", product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="shop__empty">
                  <span className="shop__empty-icon">🔍</span>
                  <h2 className="shop__empty-title">No Products Found</h2>
                  <p className="shop__empty-text">
                    Try a different search, category, or adjust your filters
                  </p>
                  <button className="shop__empty-btn" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
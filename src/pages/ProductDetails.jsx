import { useState } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function ProductDetails({ product, navigate }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product?.sizes?.[1] || product?.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    navigate("shop");
    return null;
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(
      `Hello LAREJI! I'd like to order:\n\n• ${product.name} (${size}) x${qty} = ${fmt(
        product.price * qty
      )}\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/2349161244319?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{`
        /* ── Page ── */
        .pd {
          padding-top: 72px;
        }

        /* ── Back Button ── */
        .pd__back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: none;
          border: 1px solid var(--beige-dark);
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--sans);
          margin-bottom: 20px;
          border-radius: 4px;
          color: var(--charcoal);
          font-weight: 500;
        }

        .pd__back-btn:hover {
          border-color: var(--green);
          color: var(--green);
          background: rgba(30, 75, 50, 0.04);
        }

        /* ── Breadcrumb ── */
        .pd__breadcrumb {
          padding: 20px 0;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--muted);
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 32px;
        }

        .pd__breadcrumb span {
          cursor: pointer;
          transition: color 0.2s;
        }

        .pd__breadcrumb span:hover {
          color: var(--green);
        }

        /* ── Main Grid ── */
        .pd__main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          padding-bottom: 72px;
        }

        /* ── Image ── */
        .pd__img {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 140px;
          position: relative;
          overflow: hidden;
          background: var(--beige-light);
          border-radius: 4px;
        }

        .pd__badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--green);
          color: var(--white);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 2px;
        }

        /* ── Info Section ── */
        .pd__info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pd__cat {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }

        .pd__name {
          font-family: var(--serif);
          font-size: clamp(30px, 4vw, 52px);
          font-weight: 400;
          color: var(--charcoal);
          line-height: 1.1;
          margin: 0;
        }

        .pd__prices {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .pd__price {
          font-size: 30px;
          font-weight: 500;
          color: var(--green);
        }

        .pd__old {
          font-size: 16px;
          color: var(--muted);
          text-decoration: line-through;
        }

        .pd__divider {
          height: 1px;
          background: var(--beige-dark);
        }

        .pd__desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.9;
          font-weight: 300;
          margin: 0;
        }

        .pd__details {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.8;
          font-style: italic;
          font-weight: 300;
          margin: 0;
        }

        /* ── Options ── */
        .pd__label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--charcoal);
          margin: 0 0 10px 0;
          font-weight: 500;
        }

        /* ── Sizes ── */
        .pd__sizes {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pd__sz {
          font-size: 12px;
          padding: 8px 18px;
          border: 1px solid var(--beige-dark);
          background: none;
          cursor: pointer;
          color: var(--muted);
          transition: all 0.15s;
          font-family: var(--sans);
          border-radius: 2px;
        }

        .pd__sz:hover {
          border-color: var(--green);
          color: var(--green);
        }

        .pd__sz.active {
          border-color: var(--green);
          color: var(--green);
          background: rgba(30, 75, 50, 0.07);
        }

        /* ── Quantity ── */
        .pd__qty-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pd__qbtn {
          width: 40px;
          height: 40px;
          border: 1px solid var(--beige-dark);
          background: var(--white);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          border-radius: 2px;
          color: var(--charcoal);
        }

        .pd__qbtn:hover {
          border-color: var(--green);
          background: rgba(30, 75, 50, 0.04);
        }

        .pd__qnum {
          font-size: 18px;
          font-weight: 500;
          min-width: 36px;
          text-align: center;
        }

        /* ── CTA Section ── */
        .pd__total-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-top: 1px solid var(--beige-dark);
          border-bottom: 1px solid var(--beige-dark);
        }

        .pd__total-label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }

        .pd__total-val {
          font-family: var(--serif);
          font-size: 28px;
          color: var(--charcoal);
          font-weight: 500;
        }

        .pd__cta {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pd__wa {
          width: 100%;
          padding: 15px;
          background: #25d366;
          color: var(--white);
          border: none;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-family: var(--sans);
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
          border-radius: 2px;
        }

        .pd__wa:hover {
          background: #1da851;
        }

        /* ── Related Products ── */
        .pd__related {
          padding: 72px 0;
          background: var(--beige-light);
        }

        .pd__related-title {
          font-family: var(--serif);
          font-size: 32px;
          font-weight: 400;
          margin: 0 0 36px 0;
        }

        .pd__related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .pd__rel-card {
          background: var(--white);
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
          border-radius: 4px;
        }

        .pd__rel-card:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .pd__rel-img {
          aspect-ratio: 1;
          background: var(--beige-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }

        .pd__rel-body {
          padding: 14px 16px 18px;
        }

        .pd__rel-cat {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 5px 0;
        }

        .pd__rel-name {
          font-family: var(--serif);
          font-size: 17px;
          font-weight: 400;
          margin: 0 0 8px 0;
        }

        .pd__rel-price {
          font-size: 15px;
          font-weight: 500;
          color: var(--green);
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pd__main {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .pd__related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .pd__breadcrumb {
            display: none;
          }

          .pd__main {
            gap: 24px;
            padding-bottom: 48px;
          }

          .pd__img {
            font-size: 80px;
          }

          .pd__name {
            font-size: 24px;
          }

          .pd__price {
            font-size: 24px;
          }

          .pd__related-title {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .pd__related-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .pd__back-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="pd">
        <Container>
          {/* Back Button */}
          <button className="pd__back-btn" onClick={() => navigate("shop")}>
            ← Back to Shop
          </button>

          {/* Breadcrumb */}
          <div className="pd__breadcrumb">
            <span onClick={() => navigate("home")}>Home</span>
            <span>›</span>
            <span onClick={() => navigate("shop")}>Shop</span>
            <span>›</span>
            <span style={{ color: "var(--charcoal)" }}>{product.name}</span>
          </div>

          {/* Main Content */}
          <div className="pd__main">
            {/* Product Image */}
            <div className="pd__img">
              {product.emoji}
              {product.badge && (
                <span className="pd__badge">{product.badge}</span>
              )}
            </div>

            {/* Product Info */}
            <div className="pd__info">
              <p className="pd__cat">{product.categoryLabel}</p>
              <h1 className="pd__name">{product.name}</h1>

              <div className="pd__prices">
                <span className="pd__price">{fmt(product.price)}</span>
                {product.oldPrice && (
                  <span className="pd__old">{fmt(product.oldPrice)}</span>
                )}
              </div>

              <div className="pd__divider" />

              <p className="pd__desc">{product.description}</p>
              <p className="pd__details">{product.details}</p>

              {/* Size Selection */}
              <div>
                <p className="pd__label">Select Size</p>
                <div className="pd__sizes">
                  {product.sizes?.map((s) => (
                    <button
                      key={s}
                      className={`pd__sz${size === s ? " active" : ""}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <p className="pd__label">Quantity</p>
                <div className="pd__qty-row">
                  <button
                    className="pd__qbtn"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    −
                  </button>
                  <span className="pd__qnum">{qty}</span>
                  <button className="pd__qbtn" onClick={() => setQty(qty + 1)}>
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="pd__total-line">
                <span className="pd__total-label">Total</span>
                <span className="pd__total-val">{fmt(product.price * qty)}</span>
              </div>

              {/* CTA Buttons */}
              <div className="pd__cta">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAdd}
                >
                  {added ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
                <button className="pd__wa" onClick={whatsapp}>
                  📲 Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pd__related">
            <Container>
              <h3 className="pd__related-title">You May Also Like</h3>
              <div className="pd__related-grid">
                {related.map((p) => (
                  <div
                    key={p.id}
                    className="pd__rel-card"
                    onClick={() => navigate("product", p)}
                  >
                    <div className="pd__rel-img">{p.emoji}</div>
                    <div className="pd__rel-body">
                      <p className="pd__rel-cat">{p.categoryLabel}</p>
                      <p className="pd__rel-name">{p.name}</p>
                      <p className="pd__rel-price">{fmt(p.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
}
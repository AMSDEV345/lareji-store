import { useState } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function ProductDetails({ product, navigate }) {
  const { addToCart } = useCart();
  const [size, setSize]   = useState(product?.sizes?.[1] || product?.sizes?.[0]);
  const [qty, setQty]     = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    navigate("shop");
    return null;
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsapp = () => {
    const msg = encodeURIComponent(`Hello LAREJI! I'd like to order:\n\n• ${product.name} (${size}) x${qty} = ${fmt(product.price * qty)}\n\nPlease confirm availability.`);
    window.open(`https://wa.me/2349161244319?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{`
        .pd { padding-top: 72px; }
        .pd__breadcrumb {
          padding: 20px 0; font-size: 11px; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--muted); display: flex; gap: 10px; align-items: center;
        }
        .pd__breadcrumb span { cursor: pointer; transition: color 0.2s; }
        .pd__breadcrumb span:hover { color: var(--green); }
        .pd__main { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; padding-bottom: 72px; }
        .pd__img {
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep); aspect-ratio: 1;
          display: flex; align-items: center; justify-content: center;
          font-size: 140px; position: relative; overflow: hidden;
        }
        .pd__badge {
          position: absolute; top: 20px; left: 20px;
          background: var(--green); color: var(--white);
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px;
        }
        .pd__info   { display: flex; flex-direction: column; gap: 20px; }
        .pd__cat    { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); }
        .pd__name   { font-family: var(--serif); font-size: clamp(30px,4vw,52px); font-weight: 400; color: var(--charcoal); line-height: 1.1; }
        .pd__prices { display: flex; align-items: baseline; gap: 14px; }
        .pd__price  { font-size: 30px; font-weight: 500; color: var(--green); }
        .pd__old    { font-size: 16px; color: var(--muted); text-decoration: line-through; }
        .pd__divider { height: 1px; background: transparent;
background-size: cover;
background-attachment: fixed;-dark); }
        .pd__desc   { font-size: 14px; color: var(--muted); line-height: 1.9; font-weight: 300; }
        .pd__details { font-size: 12px; color: var(--muted); line-height: 1.8; font-style: italic; font-weight: 300; }
        .pd__label  { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--charcoal); margin-bottom: 10px; }
        .pd__sizes  { display: flex; gap: 8px; flex-wrap: wrap; }
        .pd__sz {
          font-size: 12px; padding: 8px 18px; border: 1px solid var(--beige-dark);
          background: none; cursor: pointer; color: var(--muted); transition: all 0.15s; font-family: var(--sans);
        }
        .pd__sz.active { border-color: var(--green); color: var(--green); background: rgba(30,75,50,0.07); }
        .pd__qty-row { display: flex; align-items: center; gap: 14px; }
        .pd__qbtn {
          width: 40px; height: 40px; border: 1px solid var(--beige-dark);
          background: var(--white); font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.15s;
        }
        .pd__qbtn:hover { background: linear-gradient(rgba(156, 120, 34, 0.95), rgba(245, 242, 235, 0.95)), url('/bg-beige.jpg');
background-size: cover;
background-attachment: fixed;-deep); }
        .pd__qnum { font-size: 18px; font-weight: 500; min-width: 36px; text-align: center; }
        .pd__cta  { display: flex; flex-direction: column; gap: 12px; }
        .pd__wa {
          width: 100%; padding: 15px; background: #25D366; color: var(--white);
          border: none; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
          font-family: var(--sans); cursor: pointer; transition: background 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .pd__wa:hover { background: #1da851; }
        .pd__total-line {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 0; border-top: 1px solid var(--beige-dark); border-bottom: 1px solid var(--beige-dark);
        }
        .pd__total-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
        .pd__total-val   { font-family: var(--serif); font-size: 28px; color: var(--charcoal); }
        .pd__related { padding: 72px 0; background: transparent;
background-size: cover;
background-attachment: fixed;-deep); }
        .pd__related-title { font-family: var(--serif); font-size: 32px; font-weight: 400; margin-bottom: 36px; }
        .pd__related-grid  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .pd__rel-card {
          background: var(--white); cursor: pointer; overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .pd__rel-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .pd__rel-img { aspect-ratio: 1; background: transparent;
background-size: cover;
background-attachment: fixed;-deep); display: flex; align-items: center; justify-content: center; font-size: 48px; }
        .pd__rel-body { padding: 14px 16px 18px; }
        .pd__rel-cat  { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
        .pd__rel-name { font-family: var(--serif); font-size: 17px; font-weight: 400; margin-bottom: 8px; }
        .pd__rel-price { font-size: 15px; font-weight: 500; color: var(--green); }
        @media (max-width: 900px) {
          .pd__main { grid-template-columns: 1fr; gap: 32px; }
          .pd__related-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .pd__related-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="pd">
        <Container>
          <div className="pd__breadcrumb">
            <span onClick={() => navigate("home")}>Home</span>
            <span>›</span>
            <span onClick={() => navigate("shop")}>Shop</span>
            <span>›</span>
            <span style={{ color: "var(--charcoal)" }}>{product.name}</span>
          </div>

          <div className="pd__main">
            <div className="pd__img">
              {product.emoji}
              {product.badge && <span className="pd__badge">{product.badge}</span>}
            </div>

            <div className="pd__info">
              <p className="pd__cat">{product.categoryLabel}</p>
              <h1 className="pd__name">{product.name}</h1>
              <div className="pd__prices">
                <span className="pd__price">{fmt(product.price)}</span>
                {product.oldPrice && <span className="pd__old">{fmt(product.oldPrice)}</span>}
              </div>
              <div className="pd__divider" />
              <p className="pd__desc">{product.description}</p>
              <p className="pd__details">{product.details}</p>

              <div>
                <p className="pd__label">Select Size</p>
                <div className="pd__sizes">
                  {product.sizes?.map((s) => (
                    <button key={s} className={`pd__sz${size === s ? " active" : ""}`} onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <p className="pd__label">Quantity</p>
                <div className="pd__qty-row">
                  <button className="pd__qbtn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span className="pd__qnum">{qty}</span>
                  <button className="pd__qbtn" onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              <div className="pd__total-line">
                <span className="pd__total-label">Total</span>
                <span className="pd__total-val">{fmt(product.price * qty)}</span>
              </div>

              <div className="pd__cta">
                <Button variant="primary" size="lg" fullWidth onClick={handleAdd}>
                  {added ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
                <button className="pd__wa" onClick={whatsapp}>📲 Order via WhatsApp</button>
              </div>
            </div>
          </div>
        </Container>

        {related.length > 0 && (
          <div className="pd__related">
            <Container>
              <h3 className="pd__related-title">You May Also Like</h3>
              <div className="pd__related-grid">
                {related.map((p) => (
                  <div key={p.id} className="pd__rel-card" onClick={() => navigate("product", p)}>
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
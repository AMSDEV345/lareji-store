import { useCart } from "../context/CartContext";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function Cart({ navigate }) {
  const { items, removeFromCart, updateQty, clearCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <style>{`
          .cart-empty {
            padding-top: 72px; min-height: 70vh;
            display: flex; flex-direction: column; align-items: center;
            justify-content: center; gap: 20px; text-align: center;
          }
          .cart-empty__icon { font-size: 72px; opacity: 0.3; }
          .cart-empty__title { font-family: var(--serif); font-size: 36px; font-weight: 400; }
          .cart-empty__sub { font-size: 14px; color: var(--muted); }
        `}</style>
        <div className="cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <h2 className="cart-empty__title">Your cart is empty</h2>
          <p className="cart-empty__sub">Add some African essentials to get started</p>
          <Button variant="primary" size="lg" onClick={() => navigate("shop")}>Browse Products</Button>
        </div>
      </>
    );
  }

  const whatsappOrder = () => {
    const lines = items.map((i) => `• ${i.name} (${i.size}) x${i.qty} = ${fmt(i.price * i.qty)}`);
    const msg = encodeURIComponent(
      `Hello LAREJI! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${fmt(cartTotal)}\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/2349161244319?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{`
        .cart { padding-top: 72px; }
        .cart__hero {
          background: var(--green); padding: clamp(32px,5vw,64px) clamp(20px,6vw,80px);
        }
        .cart__hero-label { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
        .cart__hero-title { font-family: var(--serif); font-size: clamp(32px,4vw,56px); font-weight: 300; color: var(--white); line-height: 1.1; }
        .cart__body { display: grid; grid-template-columns: 1fr 340px; gap: 32px; padding: 48px 0 80px; align-items: start; }
        .cart__items { display: flex; flex-direction: column; gap: 0; }
        .cart__item {
          display: grid; grid-template-columns: 80px 1fr auto;
          gap: 20px; align-items: start; padding: 24px 0;
          border-bottom: 1px solid var(--beige-deep);
          animation: fadeUp 0.4s var(--ease-out) both;
        }
        .cart__item-img {
          width: 80px; height: 80px; background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          display: flex; align-items: center; justify-content: center; font-size: 36px;
        }
        .cart__item-cat  { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
        .cart__item-name { font-family: var(--serif); font-size: 22px; font-weight: 400; margin-bottom: 4px; }
        .cart__item-size { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
        .cart__item-qty  { display: flex; align-items: center; gap: 12px; }
        .cart__qbtn {
          width: 30px; height: 30px; border: 1px solid var(--beige-dark);
          background: var(--white); font-size: 18px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.15s;
        }
        .cart__qbtn:hover { background: transparent;
background-size: cover;
background-attachment: fixed;-deep); }
        .cart__qnum  { font-size: 15px; font-weight: 500; min-width: 24px; text-align: center; }
        .cart__item-rm {
          margin-top: 10px; background: none; border: none; font-size: 10px; letter-spacing: 1px;
          text-transform: uppercase; color: var(--muted); cursor: pointer;
          transition: color 0.2s; font-family: var(--sans);
        }
        .cart__item-rm:hover { color: #c0392b; }
        .cart__item-price { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--green); white-space: nowrap; }
        .cart__summary {
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep); padding: 32px 28px;
          display: flex; flex-direction: column; gap: 16px;
          position: sticky; top: 100px;
        }
        .cart__summary-title { font-family: var(--serif); font-size: 24px; font-weight: 400; margin-bottom: 8px; }
        .cart__row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--muted); }
        .cart__row.total { border-top: 1px solid var(--beige-dark); padding-top: 14px; margin-top: 4px; }
        .cart__row.total span:first-child { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; }
        .cart__row.total span:last-child  { font-family: var(--serif); font-size: 30px; color: var(--charcoal); }
        .cart__wa {
          width: 100%; padding: 15px; background: #25D366; color: var(--white);
          border: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          font-family: var(--sans); cursor: pointer; transition: background 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .cart__wa:hover { background: #1da851; }
        .cart__clear {
          background: none; border: none; color: var(--muted); font-size: 10px;
          letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer;
          text-decoration: underline; font-family: var(--sans); text-align: center;
          transition: color 0.2s;
        }
        .cart__clear:hover { color: var(--charcoal); }
        @media (max-width: 768px) {
          .cart__body  { grid-template-columns: 1fr; }
          .cart__summary { position: static; }
        }
      `}</style>

      <div className="cart">
        <div className="cart__hero">
          <p className="cart__hero-label">Your Selection</p>
          <h1 className="cart__hero-title">Your Cart</h1>
        </div>

        <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="cart__body">
            <div className="cart__items">
              {items.map((item, i) => (
                <div key={`${item.id}-${item.size}`} className="cart__item" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="cart__item-img">{item.emoji || "🌾"}</div>
                  <div>
                    <p className="cart__item-cat">{item.categoryLabel}</p>
                    <p className="cart__item-name">{item.name}</p>
                    <p className="cart__item-size">{item.size}</p>
                    <div className="cart__item-qty">
                      <button className="cart__qbtn" onClick={() => updateQty(item.id, item.size, item.qty - 1)}>−</button>
                      <span className="cart__qnum">{item.qty}</span>
                      <button className="cart__qbtn" onClick={() => updateQty(item.id, item.size, item.qty + 1)}>+</button>
                    </div>
                    <button className="cart__item-rm" onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                  </div>
                  <span className="cart__item-price">₦{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="cart__summary">
              <h3 className="cart__summary-title">Order Summary</h3>
              <div className="cart__row">
                <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>{fmt(cartTotal)}</span>
              </div>
              <div className="cart__row"><span>Delivery</span><span>Calculated at checkout</span></div>
              <div className="cart__row total">
                <span>Total</span>
                <span>{fmt(cartTotal)}</span>
              </div>
              <Button variant="primary" size="lg" fullWidth onClick={() => navigate("checkout")}>
                Checkout
              </Button>
              <button className="cart__wa" onClick={whatsappOrder}>📲 Order via WhatsApp</button>
              <button className="cart__clear" onClick={clearCart}>Clear cart</button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
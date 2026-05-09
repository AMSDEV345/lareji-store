import { useCart } from "../context/CartContext";
import Button from "./common/Button";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function CartDrawer({ navigate }) {
  const { items, drawerOpen, closeDrawer, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  const whatsappOrder = () => {
    if (!items.length) return;
    const lines = items.map((i) => `• ${i.name} (${i.size}) x${i.qty} = ${fmt(i.price * i.qty)}`);
    const msg = encodeURIComponent(
      `Hello LAREJI! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${fmt(cartTotal)}\n\nPlease confirm availability.`
    );
    window.open(`https://wa.me/2349161244319?text=${msg}`, "_blank");
  };

  const goCheckout = () => { closeDrawer(); navigate("checkout"); };

  return (
    <>
      <style>{`
        .overlay {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.38);
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s ease;
          backdrop-filter: blur(2px);
        }
        .overlay.open { opacity: 1; pointer-events: all; }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 301;
          width: 420px; max-width: 100vw;
          background: transparent;
background-size: cover;
background-attachment: fixed;); display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.4s var(--ease-out);
          box-shadow: -12px 0 48px rgba(0,0,0,0.13);
        }
        .drawer.open { transform: translateX(0); }
        .drawer__head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 28px; border-bottom: 1px solid var(--beige-dark);
        }
        .drawer__title { font-family: var(--serif); font-size: 24px; font-weight: 400; }
        .drawer__close {
          background: none; border: none; font-size: 22px; color: var(--muted);
          cursor: pointer; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .drawer__close:hover { color: var(--charcoal); }
        .drawer__body { flex: 1; overflow-y: auto; padding: 20px 28px; display: flex; flex-direction: column; gap: 16px; }
        .drawer__empty {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 12px; color: var(--muted);
        }
        .drawer__empty-icon { font-size: 52px; opacity: 0.35; }
        .drawer__empty-text { font-family: var(--serif); font-size: 22px; }
        .drawer__empty-sub  { font-size: 13px; }
        .citem {
          display: grid; grid-template-columns: 64px 1fr auto;
          gap: 14px; align-items: start;
          padding-bottom: 16px; border-bottom: 1px solid var(--beige-deep);
          animation: fadeUp 0.3s var(--ease-out) both;
        }
        .citem__img {
          width: 64px; height: 64px; background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          display: flex; align-items: center; justify-content: center; font-size: 28px;
        }
        .citem__name { font-family: var(--serif); font-size: 17px; font-weight: 400; margin-bottom: 4px; }
        .citem__size { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
        .citem__qty  { display: flex; align-items: center; gap: 10px; }
        .citem__qbtn {
          width: 28px; height: 28px; border: 1px solid var(--beige-dark);
          background: var(--white); font-size: 16px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: background 0.15s;
        }
        .citem__qbtn:hover { background: transparent;
background-size: cover;
background-attachment: fixed;-deep); }
        .citem__qnum  { font-size: 14px; font-weight: 500; min-width: 22px; text-align: center; }
        .citem__price { font-size: 15px; font-weight: 500; color: var(--green); white-space: nowrap; }
        .citem__rm {
          background: none; border: none; font-size: 10px; letter-spacing: 1px;
          text-transform: uppercase; color: var(--muted); cursor: pointer;
          margin-top: 6px; transition: color 0.2s; font-family: var(--sans);
        }
        .citem__rm:hover { color: #c0392b; }
        .drawer__foot {
          padding: 20px 28px 28px; border-top: 1px solid var(--beige-dark);
          display: flex; flex-direction: column; gap: 12px;
        }
        .drawer__total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .drawer__total-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
        .drawer__total-val   { font-family: var(--serif); font-size: 30px; color: var(--charcoal); }
        .drawer__wa {
          width: 100%; padding: 15px; background: #25D366; color: var(--white);
          border: none; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
          font-family: var(--sans); cursor: pointer; transition: background 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .drawer__wa:hover { background: #1da851; }
        .drawer__clear {
          background: none; border: none; color: var(--muted); font-size: 10px;
          letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer;
          text-decoration: underline; font-family: var(--sans); text-align: center;
          padding: 4px; transition: color 0.2s;
        }
        .drawer__clear:hover { color: var(--charcoal); }
      `}</style>

      <div className={`overlay${drawerOpen ? " open" : ""}`} onClick={closeDrawer} />

      <aside className={`drawer${drawerOpen ? " open" : ""}`}>
        <div className="drawer__head">
          <h2 className="drawer__title">Your Cart</h2>
          <button className="drawer__close" onClick={closeDrawer}>✕</button>
        </div>

        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="drawer__empty">
              <div className="drawer__empty-icon">🛒</div>
              <p className="drawer__empty-text">Your cart is empty</p>
              <p className="drawer__empty-sub">Add some African essentials</p>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={`${item.id}-${item.size}`} className="citem" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="citem__img">{item.emoji || "🌾"}</div>
                <div>
                  <p className="citem__name">{item.name}</p>
                  <p className="citem__size">{item.size}</p>
                  <div className="citem__qty">
                    <button className="citem__qbtn" onClick={() => updateQty(item.id, item.size, item.qty - 1)}>−</button>
                    <span className="citem__qnum">{item.qty}</span>
                    <button className="citem__qbtn" onClick={() => updateQty(item.id, item.size, item.qty + 1)}>+</button>
                  </div>
                  <button className="citem__rm" onClick={() => removeFromCart(item.id, item.size)}>Remove</button>
                </div>
                <span className="citem__price">{fmt(item.price * item.qty)}</span>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__total-row">
              <span className="drawer__total-label">Total</span>
              <span className="drawer__total-val">{fmt(cartTotal)}</span>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={goCheckout}>
              Proceed to Checkout
            </Button>
            <button className="drawer__wa" onClick={whatsappOrder}>
              📲 Order via WhatsApp
            </button>
            <button className="drawer__clear" onClick={clearCart}>Clear cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function Checkout({ navigate }) {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Flutterwave script on mount
  useEffect(() => {
    const loadFlutterwave = () => {
      // Check if already loaded
      if (window.FlutterWaveCheckout) {
        console.log("✅ Flutterwave already loaded");
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log("✅ Flutterwave script loaded successfully");
        setScriptLoaded(true);
      };
      
      script.onerror = () => {
        console.error("❌ Failed to load Flutterwave script");
        setError("Payment service unavailable. Please try refreshing the page.");
      };
      
      document.head.appendChild(script);
    };

    loadFlutterwave();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const validateForm = () => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!form.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!form.address.trim()) {
      setError("Delivery address is required");
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    if (!scriptLoaded || !window.FlutterWaveCheckout) {
      setError("Payment service is loading. Please wait a moment and try again.");
      return;
    }

    setLoading(true);
    setError("");

    // Generate unique transaction reference
    const txRef = `lareji_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      window.FlutterWaveCheckout({
        public_key: "FLWPUBK-610ac333c8f4ad4d8d8bc479891f1a87-X",
        tx_ref: txRef,
        amount: cartTotal,
        currency: "NGN",
        payment_options: "card,ussd,bank_transfer",
        customer: {
          email: form.email,
          phone_number: form.phone,
          name: form.fullName,
        },
        customizations: {
          title: "LAREJI Store",
          description: "Premium African essentials",
          logo: "https://lareji.co/logo.png",
        },
        callback: function (data) {
          console.log("Payment response:", data);
          setLoading(false);

          if (data.status === "successful") {
            alert("✅ Payment successful! Your order is being processed.");
            clearCart();
            localStorage.removeItem("lareji_cart");
            setTimeout(() => navigate("shop"), 2000);
          } else if (data.status === "cancelled") {
            setError("Payment was cancelled. Please try again.");
          } else {
            setError("Payment failed. Please try again.");
          }
        },
        onclose: function () {
          console.log("Payment modal closed");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  // Empty cart
  if (items.length === 0) {
    return (
      <>
        <style>{`
          .checkout-empty {
            padding-top: 72px;
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            text-align: center;
          }
          .checkout-empty__title {
            font-family: var(--serif);
            font-size: 36px;
            font-weight: 400;
          }
        `}</style>
        <div className="checkout-empty">
          <div style={{ fontSize: "72px", opacity: 0.3 }}>🛒</div>
          <h2 className="checkout-empty__title">Your cart is empty</h2>
          <Button variant="primary" size="lg" onClick={() => navigate("shop")}>
            Continue Shopping
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .checkout {
          padding-top: 72px;
        }

        .checkout__hero {
          background: var(--green);
          padding: clamp(32px, 5vw, 64px) clamp(20px, 6vw, 80px);
          color: var(--white);
        }

        .checkout__hero-label {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 10px;
        }

        .checkout__hero-title {
          font-family: var(--serif);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 300;
          line-height: 1.1;
          margin: 0;
        }

        .checkout__body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          padding: 48px 0 80px;
          align-items: start;
        }

        .checkout__form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .checkout__form-section-title {
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 400;
          margin: 0 0 16px 0;
          color: var(--charcoal);
        }

        .checkout__form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 520px) {
          .checkout__form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--muted);
          font-family: var(--sans);
        }

        .form-group input {
          padding: 12px 16px;
          border: 1px solid var(--beige-dark);
          font-size: 14px;
          font-family: var(--sans);
          background: var(--white);
          outline: none;
          transition: border-color 0.25s;
        }

        .form-group input:focus {
          border-color: var(--green);
        }

        .form-group input::placeholder {
          color: var(--muted);
          opacity: 0.6;
        }

        .checkout__error {
          background: rgba(192, 57, 43, 0.08);
          border: 1px solid #c0392b;
          padding: 12px 16px;
          border-radius: 2px;
          color: #c0392b;
          font-size: 13px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .checkout__summary {
          background: var(--beige-deep);
          padding: 28px;
          position: sticky;
          top: 100px;
          border: 1px solid var(--beige-dark);
        }

        .checkout__summary-title {
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 400;
          margin: 0 0 20px 0;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--beige-dark);
          font-size: 13px;
          color: var(--charcoal);
        }

        .summary-item:last-of-type {
          border-bottom: none;
        }

        .summary-item__name {
          flex: 1;
        }

        .summary-item__price {
          font-weight: 500;
          color: var(--green);
          white-space: nowrap;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 2px solid var(--beige-dark);
          margin-top: 16px;
        }

        .summary-total__label {
          font-family: var(--serif);
          font-size: 16px;
          font-weight: 400;
        }

        .summary-total__amount {
          font-family: var(--serif);
          font-size: 28px;
          font-weight: 400;
          color: var(--green);
        }

        .checkout__loading {
          background: rgba(51, 130, 100, 0.08);
          border: 1px solid var(--green);
          padding: 12px 16px;
          border-radius: 2px;
          color: var(--green);
          font-size: 13px;
          animation: slideDown 0.3s ease-out;
        }

        @media (max-width: 768px) {
          .checkout__body {
            grid-template-columns: 1fr;
          }
          .checkout__summary {
            position: static;
          }
        }
      `}</style>

      <div className="checkout">
        {/* Hero */}
        <div className="checkout__hero">
          <p className="checkout__hero-label">Secure Checkout</p>
          <h1 className="checkout__hero-title">Complete Your Order</h1>
        </div>

        <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="checkout__body">
            {/* Form */}
            <form className="checkout__form" onSubmit={(e) => e.preventDefault()}>
              {error && <div className="checkout__error">❌ {error}</div>}
              {!scriptLoaded && <div className="checkout__loading">⏳ Loading payment service...</div>}

              <div>
                <h3 className="checkout__form-section-title">Delivery Information</h3>

                <div className="checkout__form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      placeholder="Amaka Obi"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="amaka@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="checkout__form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="+234 9161244319"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>City/State</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="Lagos, Nigeria"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handlePayment}
                disabled={loading || !scriptLoaded}
              >
                {!scriptLoaded ? "Loading payment..." : loading ? "Processing..." : `Pay ₦${cartTotal.toLocaleString()}`}
              </Button>

              <p style={{ textAlign: "center", fontSize: "12px", color: "var(--muted)" }}>
                🔒 Secure payment powered by Flutterwave
              </p>
            </form>

            {/* Summary */}
            <div className="checkout__summary">
              <h3 className="checkout__summary-title">Order Summary</h3>

              <div>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="summary-item"
                  >
                    <div className="summary-item__name">
                      <strong>{item.name}</strong>
                      <br />
                      <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                        {item.size} × {item.qty}
                      </span>
                    </div>
                    <div className="summary-item__price">
                      {fmt(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-total">
                <span className="summary-total__label">Total</span>
                <span className="summary-total__amount">{fmt(cartTotal)}</span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                fullWidth
                style={{ marginTop: "16px" }}
                onClick={() => navigate("cart")}
              >
                ← Back to Cart
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
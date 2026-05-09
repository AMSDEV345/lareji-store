import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useCountry } from "../context/CountryContext"
import { COUNTRY_CURRENCIES } from "../utils/geo"
import Container from "../components/common/Container"
import SectionTitle from "../components/common/SectionTitle"
import Button from "../components/common/Button"
import { useScrollReveal } from "../hooks/useScrollReveal"

const fmt = (amount, currency) => {
  const symbols = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    ZAR: "R",
    KES: "KSh",
    GHS: "₵",
    UGX: "USh",
  }
  return `${symbols[currency] || currency} ${amount.toLocaleString()}`
}

export default function Checkout({ navigate }) {
  const { items, cartTotal, clearCart } = useCart()
  const { country, currency } = useCountry()
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  })
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [transactionId, setTransactionId] = useState(null)

  const titleRef = useScrollReveal({ y: 30 })
  const formRef = useScrollReveal({ y: 40, delay: 0.1 })
  const summaryRef = useScrollReveal({ y: 40, delay: 0.2 })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const config = {
    public_key: "FLWPUBK_LIVE_YOUR_PUBLIC_KEY_HERE", // Replace with your actual key
    tx_ref: `LAREJI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    amount: cartTotal,
    currency: currency,
    payment_options: "card,ussd,account_bank",
    customer: {
      email: form.email,
      phone_number: form.phone,
      name: `${form.firstName} ${form.lastName}`,
    },
    customizations: {
      title: "LAREJI Store",
      description: `Order for ${form.firstName} ${form.lastName}`,
      logo: "/logo.png",
    },
  }

  const submitOrder = async (transId) => {
    try {
      setTransactionId(transId)
      setOrderComplete(true)
      clearCart()
      localStorage.removeItem("lareji_cart")
    } catch (error) {
      console.error("Order submission error:", error)
      alert("Error confirming order. Please contact support.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city
    ) {
      alert("Please fill all required fields")
      return
    }

    setLoading(true)

    // Simulate payment success
    setTimeout(() => {
      submitOrder(`TXN-${Date.now()}`)
    }, 1500)
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <section style={{ padding: "100px 0", textAlign: "center" }}>
        <Container>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 32 }}>Your cart is empty</h2>
          <p style={{ color: "var(--muted)", marginTop: 16, marginBottom: 32 }}>
            Add some African essentials before checkout
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate("shop")}>
            Continue Shopping
          </Button>
        </Container>
      </section>
    )
  }

  if (orderComplete) {
    return (
      <section style={{ padding: "100px 0", textAlign: "center" }}>
        <Container>
          <div style={{ animation: "fadeUp 0.6s var(--ease-out)" }}>
            <div style={{ fontSize: 72, marginBottom: 24 }}>✅</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 36, marginBottom: 12 }}>
              Order Confirmed!
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 8 }}>
              Thank you for your purchase, {form.firstName}
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 12 }}>
              We'll send tracking info to <strong>{form.email}</strong>
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 32 }}>
              Transaction ID: <code>{transactionId}</code>
            </p>
            <Button variant="primary" size="lg" onClick={() => navigate("home")}>
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <>
      <style>{`
        .checkout-hero {
          margin-top: 72px;
          background: var(--green);
          padding: clamp(60px, 10vw, 100px) clamp(28px, 6vw, 80px);
          color: var(--white);
        }
        .checkout-hero__title {
          font-family: var(--serif);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 300;
          line-height: 1.2;
        }
        .checkout-hero__sub {
          font-size: 14px;
          opacity: 0.85;
          margin-top: 12px;
        }
        .checkout-main {
          padding: 88px 0;
        }
        .checkout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 56px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .checkout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .checkout-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 520px) {
          .checkout-form__row {
            grid-template-columns: 1fr;
          }
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .field label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--muted);
          font-family: var(--sans);
        }
        .field input {
          padding: 13px 16px;
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          border: 1px solid var(--beige-dark);
          font-family: var(--sans);
          font-size: 13px;
          color: var(--charcoal);
          outline: none;
          transition: border-color 0.25s, background 0.25s;
        }
        .field input:focus {
          border-color: var(--green);
          background: var(--white);
        }
        .field input::placeholder {
          color: var(--muted);
          opacity: 0.7;
        }
        .checkout-summary {
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          padding: 36px 28px;
          position: sticky;
          top: 100px;
        }
        .checkout-summary__title {
          font-family: var(--serif);
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--beige-dark);
        }
        .checkout-item {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--beige-dark);
          margin-bottom: 16px;
        }
        .checkout-item:last-of-type {
          border-bottom: none;
          margin-bottom: 24px;
        }
        .checkout-item__name {
          font-size: 13px;
          font-weight: 500;
          max-width: 180px;
        }
        .checkout-item__size {
          font-size: 10px;
          color: var(--muted);
          margin-top: 2px;
        }
        .checkout-item__qty {
          font-size: 12px;
          color: var(--muted);
        }
        .checkout-item__price {
          font-size: 14px;
          font-weight: 500;
          color: var(--green);
          white-space: nowrap;
        }
        .checkout-totals {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 0;
          border-top: 2px solid var(--green);
          border-bottom: 2px solid var(--green);
          margin-bottom: 24px;
        }
        .checkout-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .checkout-total-label {
          font-size: 12px;
          color: var(--muted);
        }
        .checkout-total-value {
          font-size: 14px;
          font-weight: 500;
        }
        .checkout-grand {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .checkout-grand__label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }
        .checkout-grand__value {
          font-family: var(--serif);
          font-size: 36px;
          color: var(--charcoal);
        }
        .checkout-methods {
          background: rgba(30, 75, 50, 0.06);
          border: 1px solid var(--green);
          padding: 16px;
          margin-bottom: 24px;
          font-size: 12px;
          color: var(--green);
          line-height: 1.7;
        }
        .checkout-methods strong {
          display: block;
          margin-bottom: 8px;
        }
        .checkout-currency {
          background: rgba(30, 75, 50, 0.06);
          border: 1px solid var(--green);
          padding: 12px 16px;
          margin-bottom: 20px;
          font-size: 12px;
          color: var(--green);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .checkout-currency__label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>

      <section className="checkout-hero">
        <Container>
          <div ref={titleRef}>
            <h1 className="checkout-hero__title">Checkout 🛒</h1>
            <p className="checkout-hero__sub">
              Secure payment with Flutterwave • Supports Card, Bank Transfer & USSD
            </p>
          </div>
        </Container>
      </section>

      <section className="checkout-main">
        <Container>
          <div className="checkout-grid">
            <div ref={formRef}>
              <SectionTitle
                label="Shipping Address"
                title="Where Should We"
                italic="Send It?"
                style={{ marginBottom: 36 }}
              />

              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="checkout-form__row">
                  <div className="field">
                    <label>First Name *</label>
                    <input
                      name="firstName"
                      required
                      placeholder="e.g. Amaka"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>Last Name *</label>
                    <input
                      name="lastName"
                      required
                      placeholder="e.g. Obi"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="checkout-form__row">
                  <div className="field">
                    <label>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>Phone Number *</label>
                    <input
                      name="phone"
                      required
                      placeholder="+234 9161244319"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Street Address *</label>
                  <input
                    name="address"
                    required
                    placeholder="e.g. 123 Main Street"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-form__row">
                  <div className="field">
                    <label>City *</label>
                    <input
                      name="city"
                      required
                      placeholder="e.g. Lagos"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>State</label>
                    <input
                      name="state"
                      placeholder="e.g. Lagos State"
                      value={form.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>ZIP / Postal Code</label>
                  <input
                    name="zipcode"
                    placeholder="e.g. 101241"
                    value={form.zipcode}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-methods">
                  <strong>💳 Payment Methods:</strong>
                  Credit/Debit Card • Bank Transfer • USSD • Mobile Money
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay ${fmt(cartTotal, currency)}`}
                </Button>

                <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", lineHeight: 1.6 }}>
                  ✅ Your order is secure and encrypted by Flutterwave
                </p>
              </form>
            </div>

            <div ref={summaryRef}>
              <div className="checkout-summary">
                <h3 className="checkout-summary__title">Order Summary</h3>

                <div className="checkout-currency">
                  <span className="checkout-currency__label">Currency</span>
                  <strong>
                    {COUNTRY_CURRENCIES[country]?.name} ({currency})
                  </strong>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <div>
                      <div className="checkout-item__name">{item.name}</div>
                      <div className="checkout-item__qty">Qty: {item.qty}</div>
                    </div>
                    <div className="checkout-item__price">
                      {fmt(item.price * item.qty, currency)}
                    </div>
                  </div>
                ))}

                <div className="checkout-totals">
                  <div className="checkout-total-row">
                    <span className="checkout-total-label">Subtotal</span>
                    <span className="checkout-total-value">{fmt(cartTotal, currency)}</span>
                  </div>
                  <div className="checkout-total-row">
                    <span className="checkout-total-label">Shipping</span>
                    <span className="checkout-total-value">Free</span>
                  </div>
                </div>

                <div className="checkout-grand">
                  <span className="checkout-grand__label">Total Due</span>
                  <span className="checkout-grand__value">{fmt(cartTotal, currency)}</span>
                </div>

                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 20, lineHeight: 1.6 }}>
                  Powered by <strong>Flutterwave</strong> — PCI DSS Level 1 Compliant
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
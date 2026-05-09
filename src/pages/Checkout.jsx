import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function Checkout({ navigate }) {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep]       = useState(1);
  const [method, setMethod]   = useState("flutterwave");
  const [form, setForm]       = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "",
  });
  const [copied, setCopied]   = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Flutterwave script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    script.onload = () => {
      console.log('Flutterwave script loaded');
    };
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const copyAccount = () => {
    navigator.clipboard.writeText("2349161244319");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const placeOrderViaWhatsApp = () => {
    const lines = items.map((i) => `• ${i.name} (${i.size}) x${i.qty} = ${fmt(i.price * i.qty)}`);
    const msg = encodeURIComponent(
      `*New LAREJI Order*\n\nCustomer: ${form.firstName} ${form.lastName}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address}, ${form.city}, ${form.state}\n\nItems:\n${lines.join("\n")}\n\nTotal: ${fmt(cartTotal)}`
    );
    window.open(`https://wa.me/2349161244319?text=${msg}`, "_blank");
    clearCart();
    setStep(3);
  };

  const payWithFlutterwave = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (!window.FlutterwaveCheckout) {
        alert("Flutterwave payment gateway is temporarily unavailable. Please use WhatsApp Order instead or try again later.");
        setLoading(false);
        setMethod("whatsapp");
        return;
      }

      window.FlutterwaveCheckout({
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `LAREJI-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        amount: cartTotal,
        currency: "NGN",
        payment_options: "card,ussd,bank_transfer",
        customer: {
          email: form.email,
          phonenumber: form.phone,
          name: `${form.firstName} ${form.lastName}`,
        },
        customizations: {
          title: "LAREJI Store",
          description: `Order for ${form.firstName} ${form.lastName}`,
          logo: "/logo.png",
        },
        callback: (data) => {
          console.log("Payment response:", data);
          if (data.status === "completed") {
            clearCart();
            setStep(3);
          } else {
            alert("Payment was not completed. Please try again.");
          }
          setLoading(false);
        },
        onclose: () => {
          console.log("Payment window closed");
          setLoading(false);
        },
      });
    }, 800);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div style={{ paddingTop: 72, minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: 28, marginBottom: 16 }}>Your cart is empty</p>
          <Button variant="primary" onClick={() => navigate("shop")}>Shop Now</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .ck { padding-top: 72px; }
        .ck__hero {
          background: var(--green); padding: clamp(32px,5vw,56px) clamp(20px,6vw,80px);
        }
        .ck__hero-label { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 10px; }
        .ck__hero-title { font-family: var(--serif); font-size: clamp(28px,4vw,52px); font-weight: 300; color: var(--white); line-height: 1.1; }
        .ck__steps {
          display: flex; align-items: center; gap: 0;
          padding: 20px clamp(20px,6vw,80px); background: transparent;
          border-bottom: 1px solid var(--beige-dark);
        }
        .ck__step {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--muted); font-family: var(--sans);
        }
        .ck__step.active { color: var(--green); }
        .ck__step.done   { color: var(--charcoal); }
        .ck__step-num {
          width: 26px; height: 26px; border-radius: 50%;
          background: var(--beige-dark); color: var(--muted);
          display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500;
        }
        .ck__step.active .ck__step-num { background: var(--green); color: var(--white); }
        .ck__step.done .ck__step-num   { background: var(--charcoal); color: var(--white); }
        .ck__step-divider { flex: 1; height: 1px; background: var(--beige-dark); margin: 0 16px; max-width: 48px; }
        .ck__body { display: grid; grid-template-columns: 1fr 360px; gap: 32px; padding: 48px 0 80px; align-items: start; }
        .ck__panel { background: var(--white); padding: 36px; display: flex; flex-direction: column; gap: 20px; }
        .ck__panel-title { font-family: var(--serif); font-size: 26px; font-weight: 400; margin-bottom: 4px; }
        .ck__row   { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ck__field { display: flex; flex-direction: column; gap: 7px; }
        .ck__label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
        .ck__input, .ck__select {
          padding: 12px 16px; border: 1px solid var(--beige-dark);
          background: transparent; font-family: var(--sans); font-size: 13px;
          color: var(--charcoal); outline: none; transition: border-color 0.2s;
        }
        .ck__input:focus, .ck__select:focus { border-color: var(--green); }
        .ck__methods { display: flex; flex-direction: column; gap: 12px; }
        .ck__method {
          padding: 18px 20px; border: 1.5px solid var(--beige-dark);
          cursor: pointer; transition: border-color 0.2s;
          display: flex; align-items: center; gap: 14px;
        }
        .ck__method.active { border-color: var(--green); background: rgba(30,75,50,0.04); }
        .ck__method-radio {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid var(--beige-dark); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .ck__method.active .ck__method-radio { border-color: var(--green); }
        .ck__method-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
        .ck__method-label { font-size: 14px; font-weight: 400; }
        .ck__method-sub   { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .ck__summary {
          background: var(--beige-deep); padding: 28px;
          position: sticky; top: 100px; display: flex; flex-direction: column; gap: 14px;
        }
        .ck__sum-title { font-family: var(--serif); font-size: 22px; font-weight: 400; margin-bottom: 4px; }
        .ck__sum-item  { display: flex; align-items: center; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--beige-dark); }
        .ck__sum-emoji { width: 44px; height: 44px; background: var(--white); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .ck__sum-info  { flex: 1; }
        .ck__sum-name  { font-size: 14px; font-weight: 400; }
        .ck__sum-size  { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-top: 2px; }
        .ck__sum-price { font-size: 14px; font-weight: 500; color: var(--green); white-space: nowrap; }
        .ck__sum-row   { display: flex; justify-content: space-between; font-size: 13px; color: var(--muted); }
        .ck__sum-row.total { border-top: 1px solid var(--beige-dark); padding-top: 12px; }
        .ck__sum-row.total span:first-child { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--charcoal); }
        .ck__sum-row.total span:last-child  { font-family: var(--serif); font-size: 26px; color: var(--charcoal); }

        .ck__success {
          min-height: 70vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px;
          text-align: center; padding: 80px 20px;
        }
        .ck__success-icon { font-size: 80px; animation: scaleIn 0.5s var(--ease-out); }
        .ck__success-title { font-family: var(--serif); font-size: clamp(28px,4vw,48px); font-weight: 400; }
        .ck__success-sub   { font-size: 14px; color: var(--muted); max-width: 440px; line-height: 1.8; font-weight: 300; }

        @media (max-width: 900px) {
          .ck__body { grid-template-columns: 1fr; }
          .ck__summary { position: static; }
          .ck__row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ck">
        <div className="ck__hero">
          <p className="ck__hero-label">Secure Checkout</p>
          <h1 className="ck__hero-title">Complete Your Order</h1>
        </div>

        {step !== 3 && (
          <div className="ck__steps">
            {[["1", "Details", 1], ["2", "Payment", 2]].map(([num, label, s], i) => (
              <>
                {i > 0 && <div key={`d${i}`} className="ck__step-divider" />}
                <div key={num} className={`ck__step${step === s ? " active" : ""}${step > s ? " done" : ""}`}>
                  <span className="ck__step-num">
                    {step > s ? "✓" : num}
                  </span>
                  <span>{label}</span>
                </div>
              </>
            ))}
          </div>
        )}

        {step === 3 ? (
          <div className="ck__success">
            <div className="ck__success-icon">✅</div>
            <h2 className="ck__success-title">Order Placed!</h2>
            <p className="ck__success-sub">
              Thank you for your order. We've received your details and our team will confirm your order via WhatsApp shortly.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
              <Button variant="primary" size="lg" onClick={() => navigate("home")}>Back to Home</Button>
              <Button variant="secondary" size="lg" onClick={() => navigate("shop")}>Continue Shopping</Button>
            </div>
          </div>
        ) : (
          <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="ck__body">
              <div>
                {step === 1 && (
                  <div className="ck__panel">
                    <h3 className="ck__panel-title">Delivery Details</h3>
                    <div className="ck__row">
                      <div className="ck__field">
                        <label className="ck__label">First Name</label>
                        <input className="ck__input" name="firstName" value={form.firstName} onChange={handle} placeholder="Amaka" />
                      </div>
                      <div className="ck__field">
                        <label className="ck__label">Last Name</label>
                        <input className="ck__input" name="lastName" value={form.lastName} onChange={handle} placeholder="Okafor" />
                      </div>
                    </div>
                    <div className="ck__row">
                      <div className="ck__field">
                        <label className="ck__label">Email Address</label>
                        <input className="ck__input" name="email" type="email" value={form.email} onChange={handle} placeholder="you@email.com" />
                      </div>
                      <div className="ck__field">
                        <label className="ck__label">Phone Number</label>
                        <input className="ck__input" name="phone" value={form.phone} onChange={handle} placeholder="+234..." />
                      </div>
                    </div>
                    <div className="ck__field">
                      <label className="ck__label">Delivery Address</label>
                      <input className="ck__input" name="address" value={form.address} onChange={handle} placeholder="Street address" />
                    </div>
                    <div className="ck__row">
                      <div className="ck__field">
                        <label className="ck__label">City</label>
                        <input className="ck__input" name="city" value={form.city} onChange={handle} placeholder="Lagos" />
                      </div>
                      <div className="ck__field">
                        <label className="ck__label">State</label>
                        <input className="ck__input" name="state" value={form.state} onChange={handle} placeholder="Lagos State" />
                      </div>
                    </div>
                    <Button variant="primary" size="lg" onClick={() => setStep(2)}
                      disabled={!form.firstName || !form.lastName || !form.phone || !form.address}>
                      Continue to Payment →
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="ck__panel">
                    <h3 className="ck__panel-title">Payment Method</h3>
                    <div className="ck__methods">
                      {[
                        { id: "flutterwave", label: "Pay with Card (Flutterwave)", sub: "Secure card, USSD & bank transfer payment" },
                        { id: "whatsapp", label: "WhatsApp Order", sub: "Send your order directly via WhatsApp" },
                      ].map((m) => (
                        <div key={m.id} className={`ck__method${method === m.id ? " active" : ""}`} onClick={() => setMethod(m.id)}>
                          <div className="ck__method-radio">
                            {method === m.id && <div className="ck__method-radio-dot" />}
                          </div>
                          <div>
                            <p className="ck__method-label">{m.label}</p>
                            <p className="ck__method-sub">{m.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
                      {method === "flutterwave" ? (
                        <Button variant="primary" size="lg" onClick={payWithFlutterwave} disabled={loading}>
                          {loading ? "Processing..." : `Pay ${fmt(cartTotal)}`}
                        </Button>
                      ) : (
                        <Button variant="primary" size="lg" onClick={placeOrderViaWhatsApp}>Place Order →</Button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="ck__summary">
                <h3 className="ck__sum-title">Your Order</h3>
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="ck__sum-item">
                    <div className="ck__sum-emoji">{item.emoji || "🌾"}</div>
                    <div className="ck__sum-info">
                      <p className="ck__sum-name">{item.name}</p>
                      <p className="ck__sum-size">{item.size} · qty {item.qty}</p>
                    </div>
                    <span className="ck__sum-price">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="ck__sum-row"><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
                <div className="ck__sum-row"><span>Delivery</span><span>Free</span></div>
                <div className="ck__sum-row total"><span>Total</span><span>{fmt(cartTotal)}</span></div>
              </div>
            </div>
          </Container>
        )}
      </div>
    </>
  );
}
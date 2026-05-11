import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Container from "../components/common/Container";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/common/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CONTACT_ITEMS = [
  { icon: "📲", label: "WhatsApp", value: "+234 9161244319", sub: "Mon–Sat, 8am–8pm" },
  { icon: "📧", label: "Email", value: "lareji.co@gmail.com", sub: "We reply within 24hrs" },
  { icon: "📍", label: "Location", value: "Lagos, Nigeria", sub: "Nationwide delivery" },
  { icon: "📦", label: "Delivery", value: "1–3 Business Days", sub: "Express options available" },
];

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/2349161244319", handle: "+234 9161244319" },
  { label: "Instagram", href: "https://instagram.com/lareji.store", handle: "@lareji.store" },
  { label: "TikTok", href: "https://tiktok.com/@lareji.co", handle: "@lareji.co" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const formRef = useScrollReveal({ y: 40 });
  const infoRef = useScrollReveal({ y: 40, delay: 0.15 });
  const socialRef = useScrollReveal({ y: 30, delay: 0.1 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(tagRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2)
      .fromTo(titleRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.36);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  const whatsappDirect = () => {
    const msg = encodeURIComponent("Hello LAREJI! I'd like to get in touch.");
    window.open(`https://wa.me/2349161244319?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .contact-hero {
          margin-top: 72px;
          background: var(--charcoal);
          padding: clamp(40px, 8vw, 100px) clamp(28px, 6vw, 80px);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-height: auto;
        }

        .contact-hero__circle {
          position: absolute;
          right: -80px;
          top: -80px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          pointer-events: none;
          animation: rotateSlow 40s linear infinite;
        }

        .contact-hero__dot {
          position: absolute;
          left: 10%;
          bottom: 15%;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse 2.5s ease infinite;
        }

        .contact-hero__content { position: relative; z-index: 1; }

        .contact-hero__tag {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-family: var(--sans);
          margin-bottom: 22px;
          display: block;
        }

        .contact-hero__title {
          font-family: var(--serif);
          font-size: clamp(44px, 6vw, 88px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.05;
        }

        .contact-hero__title em {
          font-style: italic;
          color: rgba(255,255,255,0.45);
        }

        /* ── Main Grid ── */
        .contact-main { padding: 72px 0; }

        .contact-main__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 860px) {
          .contact-main__grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* ── Form ── */
        .contact-form { display: flex; flex-direction: column; gap: 18px; }

        .contact-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 520px) {
          .contact-form__row { grid-template-columns: 1fr; }
        }

        .field { display: flex; flex-direction: column; gap: 7px; }

        .field label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--muted);
          font-family: var(--sans);
        }

        .field input,
        .field textarea {
          padding: 13px 16px;
          background: var(--white);
          border: 1px solid var(--beige-dark);
          font-family: var(--sans);
          font-size: 13px;
          color: var(--charcoal);
          outline: none;
          transition: border-color 0.25s;
          resize: none;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: var(--green);
          background: var(--white);
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: var(--muted);
          opacity: 0.7;
        }

        .field textarea { min-height: 140px; }

        .contact-form__success {
          background: rgba(30,75,50,0.08);
          border: 1px solid var(--green);
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 14px;
          animation: fadeUp 0.5s var(--ease-out) both;
        }

        .contact-form__success-icon { font-size: 28px; }

        .contact-form__success-text {
          font-size: 14px;
          color: var(--green);
          line-height: 1.6;
        }

        .contact-form__wa {
          width: 100%;
          padding: 15px;
          background: #25D366;
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
          gap: 10px;
        }

        .contact-form__wa:hover { background: #1da851; }

        .contact-form__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          color: var(--muted);
          font-size: 11px;
          letter-spacing: 1px;
        }

        .contact-form__divider::before,
        .contact-form__divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--beige-dark);
        }

        /* ── Info ── */
        .contact-info { display: flex; flex-direction: column; gap: 16px; }

        .contact-info__item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--beige-dark);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-info__item:hover {
          transform: translateX(6px);
          box-shadow: -3px 0 0 var(--green);
        }

        .contact-info__icon {
          font-size: 26px;
          flex-shrink: 0;
          transition: transform 0.4s var(--ease-out);
        }

        .contact-info__item:hover .contact-info__icon {
          transform: scale(1.2) rotate(-5deg);
        }

        .contact-info__label {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
        }

        .contact-info__value {
          font-family: var(--serif);
          font-size: 18px;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 3px;
        }

        .contact-info__sub {
          font-size: 12px;
          color: var(--muted);
          font-weight: 300;
        }

        /* ── Socials ── */
        .contact-socials {
          padding: 72px 0;
          background: var(--beige-deep);
        }

        .contact-socials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 48px;
        }

        @media (max-width: 640px) {
          .contact-socials__grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .social-card {
          background: var(--white);
          border: 1px solid var(--beige-dark);
          padding: 32px 24px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          display: block;
        }

        .social-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.08);
        }

        .social-card__label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
          display: block;
        }

        .social-card__handle {
          font-family: var(--serif);
          font-size: 18px;
          font-weight: 400;
          color: var(--charcoal);
          margin-bottom: 14px;
          display: block;
        }

        .social-card__arrow {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          opacity: 0;
          transition: opacity 0.25s, transform 0.25s;
          display: block;
        }

        .social-card:hover .social-card__arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        /* ── Map ── */
        .contact-map {
          background: var(--beige-dark);
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid var(--beige-dark);
        }

        .contact-map__emoji {
          font-size: 36px;
          animation: floatUp 4s ease-in-out infinite;
        }

        .contact-map__text {
          font-family: var(--serif);
          font-size: 18px;
          color: var(--charcoal);
        }
      `}</style>

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__circle" />
        <div className="contact-hero__dot" />
        <div className="contact-hero__content">
          <span ref={tagRef} className="contact-hero__tag">Get In Touch</span>
          <h1 ref={titleRef} className="contact-hero__title">
            Let's <em>Talk</em>
          </h1>
        </div>
      </section>

      {/* Main */}
      <section className="contact-main">
        <Container>
          <div className="contact-main__grid">

            {/* Form */}
            <div ref={formRef}>
              <SectionTitle label="Send a Message" title="Write" italic="to Us" style={{ marginBottom: 36 }} />
              {sent ? (
                <div className="contact-form__success">
                  <span className="contact-form__success-icon">✅</span>
                  <div className="contact-form__success-text">
                    <strong>Message received!</strong><br />
                    We'll get back to you within 24 hours.
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="field">
                      <label>Your Name</label>
                      <input
                        name="name"
                        required
                        placeholder="e.g. Amaka Obi"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="field">
                      <label>Email Address</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label>Subject</label>
                    <input
                      name="subject"
                      required
                      placeholder="e.g. Order enquiry, Wholesale"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea
                      name="message"
                      required
                      placeholder="Tell us what you need..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <div className="contact-form__divider">or reach us directly</div>
                  <button type="button" className="contact-form__wa" onClick={whatsappDirect}>
                    📲 Chat on WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div ref={infoRef}>
              <SectionTitle label="Contact Details" title="Find" italic="Us Here" style={{ marginBottom: 36 }} />
              <div className="contact-info">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="contact-info__item">
                    <span className="contact-info__icon">{item.icon}</span>
                    <div>
                      <p className="contact-info__label">{item.label}</p>
                      <p className="contact-info__value">{item.value}</p>
                      <p className="contact-info__sub">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Socials */}
      <section className="contact-socials">
        <Container>
          <div ref={socialRef}>
            <SectionTitle label="Follow Us" title="Connect on" italic="Social" center />
          </div>
          <div className="contact-socials__grid">
            {SOCIALS.map((s) => (
              <a key={s.label} className="social-card" href={s.href} target="_blank" rel="noreferrer">
                <span className="social-card__label">{s.label}</span>
                <span className="social-card__handle">{s.handle}</span>
                <span className="social-card__arrow">Visit →</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Map */}
      <div className="contact-map">
        <span className="contact-map__emoji">📍</span>
        <p className="contact-map__text">Lagos, Nigeria</p>
      </div>
    </>
  );
}
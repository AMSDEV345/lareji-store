import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";
import Lifestyle from "../components/home/Lifestyle";
import Container from "../components/common/Container";
import { TESTIMONIALS } from "../data/products";
import { useScrollReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "Premium Quality", "100% Natural", "Freshly Sourced", "Export Ready",
  "African Heritage", "Modern Packaging", "Fast Delivery", "Trusted Farms",
];

export default function Home({ navigate }) {
  const [activeTesti, setActiveTesti] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const testiRef = useRef(null);
  const testiSecRef = useScrollReveal({ y: 30 });
  const ctaRef = useScrollReveal({ y: 40, delay: 0.1 });

  useEffect(() => {
    const t = setInterval(
      () => setActiveTesti((p) => (p + 1) % TESTIMONIALS.length),
      4200
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!testiRef.current) return;
    gsap.fromTo(
      testiRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
    );
  }, [activeTesti]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <style>{`
        /* ── Marquee ── */
        .marquee-wrap {
          background: var(--green);
          overflow: hidden;
          padding: 14px 0;
          display: flex;
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marquee 22s linear infinite;
        }

        .marquee-track:hover { animation-play-state: paused; }

        .marquee-item {
          font-size: 10px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          padding: 0 28px;
          display: flex;
          align-items: center;
          gap: 28px;
          font-family: var(--sans);
        }

        .marquee-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }

        /* ── Testimonials ── */
        .testi {
          padding: 80px 0;
          background: var(--white);
        }

        .testi__inner {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .testi__label {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
          display: block;
        }

        .testi__quote {
          font-family: var(--serif);
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 300;
          line-height: 1.6;
          color: var(--charcoal);
          margin: 28px 0 20px;
          font-style: italic;
        }

        .testi__author {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
        }

        .testi__dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }

        .testi__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--beige-dark);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }

        .testi__dot.active {
          background: var(--green);
          transform: scale(1.4);
        }

        /* ── CTA / Newsletter ── */
        .cta {
          padding: 80px 0;
          background: var(--charcoal);
        }

        .cta__inner {
          max-width: 620px;
          margin: 0 auto;
          text-align: center;
        }

        .cta__label {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 16px;
          display: block;
        }

        .cta__title {
          font-family: var(--serif);
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .cta__title em {
          font-style: italic;
          color: rgba(255,255,255,0.5);
        }

        .cta__sub {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 36px;
          line-height: 1.8;
        }

        .cta__form {
          display: flex;
          max-width: 420px;
          margin: 0 auto;
        }

        .cta__input {
          flex: 1;
          padding: 14px 18px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-right: none;
          font-family: var(--sans);
          font-size: 13px;
          color: var(--white);
          outline: none;
          transition: border-color 0.2s;
          border-radius: 4px 0 0 4px;
        }

        .cta__input:focus {
          border-color: rgba(255,255,255,0.35);
        }

        .cta__input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .cta__btn {
          background: var(--green);
          color: var(--white);
          border: none;
          padding: 14px 24px;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-family: var(--sans);
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          border-radius: 0 4px 4px 0;
        }

        .cta__btn:hover { background: var(--green-mid); }

        .cta__success {
          color: rgba(255,255,255,0.75);
          font-size: 14px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          max-width: 420px;
          margin: 0 auto;
          animation: fadeUp 0.5s var(--ease-out) both;
        }

        @media (max-width: 480px) {
          .cta__form { flex-direction: column; }
          .cta__input {
            border-right: 1px solid rgba(255,255,255,0.12);
            border-bottom: none;
            border-radius: 4px 4px 0 0;
          }
          .cta__btn { border-radius: 0 0 4px 4px; }
        }
      `}</style>

      <Hero navigate={navigate} />

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
              {item} <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      <Categories navigate={navigate} />
      <FeaturedProducts navigate={navigate} />
      <PromoBanner navigate={navigate} />
      <Lifestyle />

      {/* Testimonials */}
      <section className="testi">
        <Container>
          <div ref={testiSecRef} className="testi__inner">
            <span className="testi__label">What Our Customers Say</span>
            <div ref={testiRef}>
              <p className="testi__quote">
                "{TESTIMONIALS[activeTesti].text}"
              </p>
              <p className="testi__author">
                {TESTIMONIALS[activeTesti].name} —{" "}
                {TESTIMONIALS[activeTesti].city}
              </p>
            </div>
            <div className="testi__dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testi__dot${i === activeTesti ? " active" : ""}`}
                  onClick={() => setActiveTesti(i)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="cta">
        <Container>
          <div ref={ctaRef} className="cta__inner">
            <span className="cta__label">Stay Connected</span>
            <h2 className="cta__title">
              Join the LAREJI <em>Community</em>
            </h2>
            <p className="cta__sub">
              Get early access to new products, exclusive deals, and recipes
              straight to your inbox.
            </p>
            {subscribed ? (
              <div className="cta__success">
                ✅ You're subscribed! Welcome to the LAREJI community.
              </div>
            ) : (
              <form className="cta__form" onSubmit={handleSubscribe}>
                <input
                  className="cta__input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="cta__btn" type="submit">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
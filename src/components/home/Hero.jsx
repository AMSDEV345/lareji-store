import { useState, useEffect } from "react";
import Button from "../common/Button";

export default function Hero({ navigate }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const tr = (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.75s var(--ease-out) ${delay}s, transform 0.75s var(--ease-out) ${delay}s`,
  });

  return (
    <>
      <style>{`
        .hero {
          margin-top: 72px;
          min-height: calc(100vh - 72px);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/farm-field.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }
        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(51, 102, 76, 0.8) 0%, rgba(51, 102, 76, 0.6) 50%, rgba(51, 102, 76, 0.4) 100%);
          z-index: 2;
        }
        .hero__content {
          position: relative;
          z-index: 3;
          padding: clamp(40px, 6vw, 88px) clamp(28px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 28px;
          max-width: 700px;
        }
        .hero__grain {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          animation: grain 8s steps(1) infinite;
          pointer-events: none;
          z-index: 4;
        }
        .hero__tag {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          font-family: var(--sans);
        }
        .hero__title {
          font-family: var(--serif);
          font-size: clamp(44px, 5.5vw, 82px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.05;
          margin: 0;
        }
        .hero__title em {
          font-style: italic;
          color: rgba(255,255,255, 0.85);
        }
        .hero__para {
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          line-height: 1.9;
          max-width: 380px;
          font-weight: 300;
        }
        .hero__actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .hero__stats {
          display: flex;
          gap: 36px;
          margin-top: 12px;
        }
        .hero__stat-num {
          font-family: var(--serif);
          font-size: 28px;
          font-weight: 400;
          color: var(--white);
          display: block;
          line-height: 1;
        }
        .hero__stat-label {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-top: 4px;
        }
        .hero__scroll {
          position: absolute;
          bottom: 32px;
          left: clamp(28px,6vw,80px);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 5;
        }
        .hero__scroll-line {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.4);
          animation: pulse 2.4s ease infinite;
        }
        .hero__scroll-text {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        @media (max-width: 900px) {
          .hero__content {
            max-width: 100%;
          }
          .hero::after {
            background: linear-gradient(135deg, rgba(51, 102, 76, 0.9) 0%, rgba(51, 102, 76, 0.8) 50%, rgba(51, 102, 76, 0.7) 100%);
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero__content">
          <div className="hero__grain" />
      
          <p style={tr(0.08)} className="hero__tag">Modern African Food Brand</p>
          <h1 style={tr(0.22)} className="hero__title">
            Authentic<br />
            <em>African</em><br />
            Ingredients,<br />
            Crafted for<br />
            the World.
          </h1>
          <p style={tr(0.38)} className="hero__para">
            Premium quality grains, spices, and essentials — sourced from trusted African farms 
            and delivered to your door, wherever you are.
          </p>
          <div style={tr(0.5)} className="hero__actions">
            <Button variant="white" size="lg" onClick={() => navigate("shop")}>Shop Now</Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("about")}>Our Story</Button>
          </div>
          <div style={tr(0.64)} className="hero__stats">
            {[["7+", "Categories"], ["100%", "Natural"], ["24h", "Dispatch"]].map(([n, l]) => (
              <div key={l}>
                <span className="hero__stat-num">{n}</span>
                <span className="hero__stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll to explore</span>
        </div>
      </section>
    </>
  );
}
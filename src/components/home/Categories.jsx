import { useState, useEffect } from "react";
import Button from "../common/Button";

export default function Hero({ navigate }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const tr= (delay) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.75s var(--ease-out) ${delay}s, transform 0.75s var(--ease-out) ${delay}s`,
  });

  return (
    <>
      <style>{`
        .hero {
          margin-top: 72px; display: grid; grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 72px); overflow: hidden;
        }
        .hero__left {
          background: var(--green); padding: clamp(40px, 6vw, 88px) clamp(28px, 6vw, 80px);
          display: flex; flex-direction: column; justify-content: center; gap: 28px;
          position: relative; overflow: hidden;
        }
        .hero__grain {
          position: absolute; inset: -50%; width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          animation: grain 8s steps(1) infinite; pointer-events: none;
        }
        .hero__tag {
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.45); font-family: var(--sans);
        }
        .hero__title {
          font-family: var(--serif); font-size: clamp(44px, 5.5vw, 82px);
          font-weight: 300; color: var(--white); line-height: 1.05; margin: 0;
        }
        .hero__title em { font-style: italic; color: rgba(255,255,255,0.62); }
        .hero__para {
          font-size: 14px; color: rgba(255,255,255,0.58); line-height: 1.9;
          max-width: 380px; font-weight: 300;
        }
        .hero__actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero__stats { display: flex; gap: 36px; margin-top: 8px; }
        .hero__stat-num {
          font-family: var(--serif); font-size: 28px; font-weight: 400;
          color: var(--white); display: block; line-height: 1;
        }
        .hero__stat-label {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.38); margin-top: 4px;
        }
        .hero__scroll {
          position: absolute; bottom: 32px; left: clamp(28px,6vw,80px);
          display: flex; align-items: center; gap: 12px;
        }
        .hero__scroll-line {
          width: 40px; height: 1px; background: rgba(255,255,255,0.3);
          animation: pulse 2.4s ease infinite;
        }
        .hero__scroll-text {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.32);
        }
        .hero__right {
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep); position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .hero__img-wrap {
          width: 72%; aspect-ratio: 3/4; background: transparent;
background-size: cover;
background-attachment: fixed;-dark);
          display: flex; align-items: center; justify-content: center;
          font-size: 120px; position: relative;
          animation: fadeIn 1s var(--ease-out) 0.6s both;
        }
        .hero__img-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: var(--green); color: var(--white);
          padding: 12px 20px; display: flex; justify-content: space-between;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
        }
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero__right { display: none; }
          .hero__left { min-height: 85vh; }
        }
      `}</style>

      
    </>
  );
}
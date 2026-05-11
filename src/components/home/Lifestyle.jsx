import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import { useScrollReveal } from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { label: "Our Farms", title: "Sourced from Trusted Growers", image: "/farms.jpg" },
  { label: "Our Promise", title: "Prepared for Modern Kitchens", image: "/promise.jpg" },
  { label: "Packaging", title: "Sealed for Perfect Freshness", image: "/packaging.jpg" },
  { label: "Export Ready", title: "Packaged for the World", image: "/export.jpg" },
];

export default function Lifestyle({ navigate }) {
  const titleRef = useScrollReveal({ y: 30 });
  const gridRef = useRef(null);
  const promoRef = useScrollReveal({ y: 40, delay: 0.1 });

  useEffect(() => {
    const smalls = gridRef.current.querySelectorAll(".life-card");
    gsap.fromTo(
      smalls,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .life {
          padding: 64px 0 48px 0;
          overflow: hidden;
          background: var(--white);
        }

        .life__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 32px;
        }

        /* ── Card ── */
        .life-card {
          position: relative;
          overflow: hidden;
          height: 420px;
          transition: transform 0.4s var(--ease-out);
          will-change: transform;
          cursor: pointer;
          border-radius: 4px;
        }

        .life-card:hover {
          transform: scale(1.02);
        }

        /* ── Image ── */
        .life-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        /* ── Overlay ── */
        .life-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.3) 40%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 2;
        }

        /* ── Content ── */
        .life-card__content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 40px 36px;
          color: var(--white);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 100%;
        }

        /* ── Label ── */
        .life-card__label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 10px;
          display: block;
        }

        /* ── Title ── */
        .life-card__title {
          font-family: var(--serif);
          font-size: 24px;
          font-weight: 400;
          line-height: 1.35;
          color: var(--white);
          margin: 0 0 12px 0;
        }

        /* ── Bar Hover ── */
        .life-card__bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--green);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s var(--ease-out);
          z-index: 4;
        }

        .life-card:hover .life-card__bar {
          transform: scaleX(1);
        }

        /* ── Promo Banner ── */
        .life__promo {
          grid-column: 1 / -1;
          background: var(--green);
          padding: 56px clamp(28px, 6vw, 80px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          position: relative;
          overflow: hidden;
          margin: 28px 0 32px 0;
          border-radius: 4px;
        }

        .life__promo-circle1 {
          position: absolute;
          right: -80px;
          top: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          pointer-events: none;
        }

        .life__promo-circle2 {
          position: absolute;
          left: -40px;
          bottom: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          pointer-events: none;
        }

        .life__promo-left {
          position: relative;
          z-index: 1;
        }

        .life__promo-title {
          font-family: var(--serif);
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 300;
          color: var(--white);
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .life__promo-title em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.5);
        }

        .life__promo-right {
          display: flex;
          flex-direction: column;
          gap: 22px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        .life__promo-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.8;
          font-weight: 300;
          max-width: 420px;
        }

        /* ── Tablet ── */
        @media (max-width: 768px) {
          .life {
            padding: 56px 0 40px 0;
          }

          .life__grid {
            gap: 16px;
            margin-top: 28px;
          }

          .life-card {
            height: 340px;
          }

          .life__promo {
            grid-column: 1 / -1;
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px clamp(20px, 5vw, 60px);
            margin: 24px 0 28px 0;
          }

          .life-card__content {
            padding: 28px 20px;
          }

          .life-card__label {
            font-size: 9px;
            margin-bottom: 8px;
          }

          .life-card__title {
            font-size: 18px;
            line-height: 1.3;
            margin-bottom: 8px;
          }

          .life-card__desc {
            font-size: 12px;
            line-height: 1.5;
          }

          .life__promo-title {
            font-size: 32px;
          }

          .life__promo-text {
            font-size: 13px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .life {
            padding: 40px 0 32px 0;
          }

          .life__grid {
            gap: 12px;
            margin-top: 24px;
          }

          .life-card {
            height: 280px;
          }

          .life__promo {
            grid-column: 1 / -1;
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 40px clamp(16px, 4vw, 48px);
            margin: 20px 0 24px 0;
            border-radius: 0;
          }

          .life-card__content {
            padding: 20px 14px;
          }

          .life-card__label {
            font-size: 8px;
            letter-spacing: 2px;
            margin-bottom: 6px;
          }

          .life-card__title {
            font-size: 14px;
            line-height: 1.25;
            margin-bottom: 6px;
          }

          .life-card__desc {
            font-size: 11px;
            line-height: 1.4;
          }

          .life__promo-title {
            font-size: 24px;
          }

          .life__promo-text {
            font-size: 12px;
            line-height: 1.7;
          }
        }
      `}</style>

      <section className="life">
        <Container>
          <div ref={titleRef}>
            <SectionTitle label="Brand Story" title="The LAREJI" italic="Story" />
          </div>

          <div className="life__grid" ref={gridRef}>
            {/* Promo Banner */}
            <div className="life__promo" ref={promoRef}>
              <div className="life__promo-circle1" />
              <div className="life__promo-circle2" />
              
              <div className="life__promo-left">
                <h2 className="life__promo-title">
                  From African <em>Farms to Global Kitchens.</em>
                </h2>
              </div>

              <div className="life__promo-right">
                <p className="life__promo-text">
                  Every product in the LAREJI range begins with a commitment — that
                  authentic African ingredients deserve to be shared with the world,
                  packaged with care, and delivered with pride.
                </p>
                <Button variant="ghost" size="lg" onClick={() => navigate("shop")}>
                  Explore Products
                </Button>
              </div>
            </div>

            {/* Secondary Cards */}
            {CARDS.map((c) => (
              <div key={c.label} className="life-card">
                <img
                  className="life-card__img"
                  src={c.image}
                  alt={c.label}
                />
                <div className="life-card__overlay" />
                <div className="life-card__bar" />
                <div className="life-card__content">
                  <span className="life-card__label">{c.label}</span>
                  <h4 className="life-card__title">{c.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
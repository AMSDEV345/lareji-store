import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
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

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll(".life-card");
    gsap.fromTo(
      cards,
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
        }
      `}</style>

      <section className="life">
        <Container>
          <div ref={titleRef}>
            <SectionTitle label="Brand Story" title="The LAREJI" italic="Story" />
          </div>

          <div className="life__grid" ref={gridRef}>
            {/* Cards */}
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
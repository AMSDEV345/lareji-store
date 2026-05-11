import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import { useScrollReveal } from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_DATA = [
  { name: "Grains & Rice", emoji: "🌾", count: "12+ Products" },
  { name: "Flours & Swallows", emoji: "🥄", count: "8+ Products" },
  { name: "Spices & Seasonings", emoji: "🌶️", count: "15+ Products" },
  { name: "Dried Foods", emoji: "🫘", count: "10+ Products" },
];

export default function Categories({ navigate }) {
  const titleRef = useScrollReveal({ y: 30 });
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll(".cat-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .cat {
          padding: 80px 0;
          background: var(--white);
        }

        .cat__title-section {
          text-align: center;
          margin-bottom: 56px;
        }

        /* ── Grid ── */
        .cat__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .cat__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cat {
            padding: 64px 0;
          }

          .cat__title-section {
            margin-bottom: 40px;
          }

          .cat__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .cat {
            padding: 48px 0;
          }

          .cat__title-section {
            margin-bottom: 32px;
          }

          .cat__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* ── Card ── */
        .cat-card {
          background: linear-gradient(135deg, var(--beige-deep) 0%, var(--beige-dark) 100%);
          border-radius: 8px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .cat-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: translateX(-100%);
          transition: none;
        }

        .cat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
        }

        .cat-card:hover::before {
          animation: shimmerSlide 0.6s ease forwards;
        }

        /* ── Emoji ── */
        .cat-card__emoji {
          font-size: 56px;
          display: block;
          transition: transform 0.4s var(--ease-out);
        }

        .cat-card:hover .cat-card__emoji {
          transform: scale(1.2) rotate(-5deg);
        }

        /* ── Name ── */
        .cat-card__name {
          font-family: var(--serif);
          font-size: 18px;
          font-weight: 400;
          color: var(--charcoal);
          margin: 0;
        }

        /* ── Count ── */
        .cat-card__count {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }

        /* ── Shimmer Animation ── */
        @keyframes shimmerSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      <section className="cat">
        <Container>
          <div ref={titleRef} className="cat__title-section">
            <SectionTitle label="Browse by Category" title="Shop by" italic="Category" />
          </div>

          <div className="cat__grid" ref={gridRef}>
            {CATEGORY_DATA.map((cat) => (
              <div
                key={cat.name}
                className="cat-card"
                onClick={() => navigate("shop")}
              >
                <span className="cat-card__emoji">{cat.emoji}</span>
                <h3 className="cat-card__name">{cat.name}</h3>
                <p className="cat-card__count">{cat.count}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
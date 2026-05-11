import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "../../data/products";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import { useCart } from "../../context/CartContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const fmt = (n) => `₦${n.toLocaleString()}`;

export default function FeaturedProducts({ navigate }) {
  const featured = PRODUCTS.filter((p) => p.featured);
  const titleRef = useScrollReveal({ y: 30, duration: 0.8 });
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll(".pc");
    gsap.fromTo(
      cards,
      { y: 70, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.1,
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
        .feat {
          padding: 80px 0;
          background: var(--beige-deep);
        }

        .feat__head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
        }

        .feat__viewall {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 1px solid var(--green);
          padding-bottom: 2px;
          font-family: var(--sans);
          transition: opacity 0.2s;
        }

        .feat__viewall:hover {
          opacity: 0.65;
        }

        /* ── Grid ── */
        .feat__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .feat__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .feat {
            padding: 64px 0;
          }

          .feat__head {
            margin-bottom: 40px;
          }

          .feat__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .feat {
            padding: 48px 0;
          }

          .feat__head {
            margin-bottom: 32px;
          }

          .feat__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* ── Product Card ── */
        .pc {
          background: var(--white);
          cursor: pointer;
          overflow: hidden;
          border-radius: 4px;
          transition: box-shadow 0.3s ease;
          will-change: transform;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .pc:hover {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.11);
        }

        /* ── Image ── */
        .pc__img {
          width: 100%;
          aspect-ratio: 1;
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .pc__emoji {
          font-size: 64px;
          transition: transform 0.4s var(--ease-out);
          display: inline-block;
        }

        .pc:hover .pc__emoji {
          transform: scale(1.18) rotate(-4deg);
        }

        /* ── Badge ── */
        .pc__badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--green);
          color: var(--white);
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 10px;
          font-family: var(--sans);
          animation: fadeIn 0.4s ease both;
          border-radius: 2px;
        }

        .pc__badge.new {
          background: var(--charcoal);
        }

        .pc__badge.popular {
          background: #b5540a;
        }

        /* ── Hover Button ── */
        .pc__hover-btn {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s;
          background: rgba(245, 242, 235, 0.15);
        }

        .pc:hover .pc__hover-btn {
          opacity: 1;
        }

        .pc__hover-inner {
          background: rgba(245, 242, 235, 0.95);
          color: var(--charcoal);
          border: none;
          padding: 10px 22px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: var(--sans);
          cursor: pointer;
          backdrop-filter: blur(6px);
          transform: translateY(8px);
          transition: transform 0.3s var(--ease-out);
          border-radius: 2px;
        }

        .pc:hover .pc__hover-inner {
          transform: translateY(0);
        }

        /* ── Body ── */
        .pc__body {
          padding: 18px 20px 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          gap: 8px;
        }

        .pc__cat {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0;
        }

        .pc__name {
          font-family: var(--serif);
          font-size: 19px;
          font-weight: 400;
          margin: 0;
          line-height: 1.2;
        }

        /* ── Sizes ── */
        .pc__sizes {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin: 8px 0 0 0;
        }

        .pc__size {
          font-size: 10px;
          letter-spacing: 1px;
          padding: 4px 10px;
          border: 1px solid var(--beige-dark);
          background: none;
          cursor: pointer;
          color: var(--muted);
          transition: all 0.15s;
          font-family: var(--sans);
          border-radius: 2px;
        }

        .pc__size:hover {
          border-color: var(--green);
          color: var(--green);
        }

        .pc__size.active {
          border-color: var(--green);
          color: var(--green);
          background: rgba(30, 75, 50, 0.06);
        }

        /* ── Footer ── */
        .pc__foot {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--beige-dark);
        }

        .pc__price-wrap {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .pc__price {
          font-size: 17px;
          font-weight: 500;
          color: var(--green);
        }

        .pc__old {
          font-size: 12px;
          color: var(--muted);
          text-decoration: line-through;
        }

        /* ── Add Button ── */
        .pc__add {
          background: var(--green);
          color: var(--white);
          border: none;
          padding: 10px 16px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: var(--sans);
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          will-change: transform;
          border-radius: 2px;
          width: 100%;
          text-align: center;
        }

        .pc__add:hover {
          background: var(--green-mid);
        }

        .pc__add.added {
          background: #2d7a50;
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

        .pc__img::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          transform: translateX(-100%);
          transition: none;
        }

        .pc:hover .pc__img::after {
          animation: shimmerSlide 0.7s ease forwards;
        }
      `}</style>

      <section className="feat">
        <Container>
          <div ref={titleRef} className="feat__head">
            <SectionTitle
              label="Handpicked for You"
              title="Featured"
              italic="Products"
            />
            <button
              className="feat__viewall"
              onClick={() => navigate("shop")}
            >
              View All →
            </button>
          </div>

          <div className="feat__grid" ref={gridRef}>
            {featured.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                delay={i * 0.07}
                onView={() => navigate("product", p)}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ProductCard({ product, onView }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product.sizes?.[1] || product.sizes?.[0]);
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;

      gsap.to(card, {
        rotateX: -y,
        rotateY: x,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, size);
    setAdded(true);

    gsap.fromTo(
      e.currentTarget,
      { scale: 0.88 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }
    );

    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pc" ref={cardRef} onClick={onView}>
      <div className="pc__img">
        <span className="pc__emoji">{product.emoji}</span>

        {product.badge && (
          <span className={`pc__badge ${product.badge.toLowerCase()}`}>
            {product.badge}
          </span>
        )}

        <div className="pc__hover-btn">
          <button className="pc__hover-inner">Quick View</button>
        </div>
      </div>

      <div className="pc__body">
        <p className="pc__cat">{product.categoryLabel}</p>
        <h3 className="pc__name">{product.name}</h3>

        <div className="pc__sizes" onClick={(e) => e.stopPropagation()}>
          {product.sizes?.map((s) => (
            <button
              key={s}
              className={`pc__size${size === s ? " active" : ""}`}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="pc__foot">
          <div className="pc__price-wrap">
            <span className="pc__price">{fmt(product.price)}</span>
            {product.oldPrice && (
              <span className="pc__old">{fmt(product.oldPrice)}</span>
            )}
          </div>
          <button
            className={`pc__add${added ? " added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
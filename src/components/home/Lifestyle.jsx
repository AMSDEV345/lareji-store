import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import { useScrollReveal } from "../../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  { label: "Our Farms",    title: "Sourced from Trusted Growers", image: "/farms.jpg" },
  { label: "Our Promise",  title: "Prepared for Modern Kitchens", image: "/promise.jpg" },
  { label: "Packaging",    title: "Sealed for Perfect Freshness", image: "/packaging.jpg" },
  { label: "Export Ready", title: "Packaged for the World",       image: "/export.jpg" },
];

export default function Lifestyle() {
  const titleRef  = useScrollReveal({ y: 30 });
  const gridRef   = useRef(null);
  const mainRef   = useRef(null);

  useEffect(() => {
    gsap.to(mainRef.current, {
      yPercent: -8, ease: "none",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top bottom", end: "bottom top", scrub: 1.2,
      },
    });

    const smalls = gridRef.current.querySelectorAll(".life-card:not(.main)");
    gsap.fromTo(smalls,
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
      }
    );

    gsap.fromTo(mainRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        .life { 
          padding: 88px 0; 
          overflow: hidden; 
        }

        .life__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 52px;
        }

        .life-card {
          position: relative;
          overflow: hidden;
          height: 380px;
          transition: transform 0.4s var(--ease-out);
          will-change: transform;
          cursor: pointer;
        }

        .life-card:hover { 
          transform: scale(1.02); 
        }

        .life-card.main {
          grid-column: 1 / -1;
          height: 520px;
        }

        .life-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .life-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 2;
        }

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

        .life-card.main .life-card__content {
          padding: 60px 48px;
        }

        .life-card__label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 10px;
          display: block;
        }

        .life-card__title {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 400;
          line-height: 1.35;
          color: var(--white);
          margin: 0 0 12px 0;
        }

        .life-card.main .life-card__title {
          font-size: 36px;
          line-height: 1.3;
          margin-bottom: 16px;
        }

        .life-card__desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }

        .life-card__desc + .life-card__desc {
          margin-top: 12px;
        }

        .life-card.main .life-card__desc {
          font-size: 14px;
          max-width: 500px;
        }

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

        /* MOBILE: Keep 2 columns */
        @media (max-width: 768px) {
          .life {
            padding: 64px 0;
          }

          .life__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 40px;
          }

          .life-card {
            height: 300px;
          }

          .life-card.main {
            grid-column: 1 / -1;
            height: 520px;
          }

          .life-card__content {
            padding: 24px 16px;
          }

          .life-card.main .life-card__content {
            padding: 40px 24px;
          }

          .life-card__label {
            font-size: 9px;
            letter-spacing: 2.5px;
            margin-bottom: 8px;
          }

          .life-card__title {
            font-size: 16px;
            line-height: 1.25;
            margin-bottom: 8px;
          }

          .life-card.main .life-card__title {
            font-size: 32px;
            line-height: 1.3;
            margin-bottom: 14px;
          }

          .life-card__desc {
            font-size: 12px;
            line-height: 1.5;
          }

          .life-card.main .life-card__desc {
            font-size: 13px;
            line-height: 1.6;
            max-width: 100%;
          }

          .life-card__desc + .life-card__desc {
            margin-top: 10px;
          }
        }

        @media (max-width: 480px) {
          .life {
            padding: 48px 0;
          }

          .life__grid {
            gap: 12px;
            margin-top: 32px;
          }

          .life-card {
            height: 260px;
          }

          .life-card.main {
            height: 480px;
          }

          .life-card__content {
            padding: 20px 12px;
          }

          .life-card.main .life-card__content {
            padding: 32px 20px;
          }

          .life-card__label {
            font-size: 8px;
            letter-spacing: 2px;
            margin-bottom: 6px;
          }

          .life-card__title {
            font-size: 14px;
            margin-bottom: 6px;
          }

          .life-card.main .life-card__title {
            font-size: 24px;
            line-height: 1.25;
            margin-bottom: 10px;
          }

          .life-card__desc {
            font-size: 11px;
            line-height: 1.4;
          }

          .life-card.main .life-card__desc {
            font-size: 12px;
          }
        }
      `}</style>

      <section className="life">
        <Container>
          <div ref={titleRef}>
            <SectionTitle label="Brand Story" title="The LAREJI" italic="Story" />
          </div>
          <div className="life__grid" ref={gridRef}>
            <div className="life-card main" ref={mainRef}>
              <img className="life-card__img" src="/heritage.jpg" alt="Heritage" />
              <div className="life-card__overlay" />
              <div className="life-card__bar" />
              <div className="life-card__content">
                <span className="life-card__label">Heritage</span>
                <h3 className="life-card__title">
                  Rooted in African Tradition,<br />
                  Refined for You.
                </h3>
                <p className="life-card__desc">
                  We source the finest African ingredients directly from local farmers and producers who share our passion for quality, authenticity and heritage.
                </p>
                <p className="life-card__desc">
                  From our land to your table. Naturally. Responsibly. Carefully selected.
                </p>
              </div>
            </div>
            {CARDS.map((c) => (
              <div key={c.label} className="life-card">
                <img className="life-card__img" src={c.image} alt={c.label} />
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
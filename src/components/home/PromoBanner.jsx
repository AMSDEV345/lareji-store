import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";

export default function PromoBanner({ navigate }) {
  return (
    <>
      <style>{`
        .promo {
          background: var(--green);
          padding: 88px clamp(28px, 6vw, 80px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .promo__circle1 {
          position: absolute;
          right: -80px;
          top: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          pointer-events: none;
        }

        .promo__circle2 {
          position: absolute;
          left: -40px;
          bottom: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          pointer-events: none;
        }

        .promo__left {
          position: relative;
          z-index: 1;
        }

        .promo__right {
          display: flex;
          flex-direction: column;
          gap: 22px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        .promo__text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.9;
          font-weight: 300;
          max-width: 420px;
        }

        .promo__contacts {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .promo__contact-item {
          display: flex;
          flex-direction: column;
        }

        .promo__cl {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 4px;
        }

        .promo__cv {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .promo {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 56px clamp(20px, 5vw, 60px);
          }
        }

        @media (max-width: 480px) {
          .promo {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 40px clamp(16px, 4vw, 48px);
          }

          .promo__text {
            font-size: 13px;
            line-height: 1.7;
          }

          .promo__contacts {
            gap: 20px;
          }
        }
      `}</style>

      <section className="promo">
        <div className="promo__circle1" />
        <div className="promo__circle2" />

        <div className="promo__left">
          <SectionTitle
            label="Our Promise"
            title="From African"
            italic="Farms to Global Kitchens."
            light
          />
        </div>

        <div className="promo__right">
          <p className="promo__text">
            Every product in the LAREJI range begins with a commitment — that
            authentic African ingredients deserve to be shared with the world,
            packaged with care, and delivered with pride.
          </p>
          <Button variant="ghost" size="lg" onClick={() => navigate("shop")}>
            Explore Products
          </Button>
        </div>
      </section>
    </>
  );
}
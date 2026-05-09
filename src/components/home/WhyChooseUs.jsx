import { WHY_CHOOSE } from "../../data/products";
import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        .why { padding: 88px 0; background: transparent;
background-size: cover;
background-attachment: fixed;-deep); }
        .why__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-top: 52px; }
        .why-card { border-top: 2px solid var(--green); padding-top: 26px; }
        .why-card__num {
          font-family: var(--serif); font-size: 44px; font-weight: 300;
          color: var(--beige-dark); line-height: 1; margin-bottom: 14px;
        }
        .why-card__title { font-family: var(--serif); font-size: 20px; font-weight: 400; margin-bottom: 10px; }
        .why-card__text  { font-size: 13px; color: var(--muted); line-height: 1.85; font-weight: 300; }
        @media (max-width: 900px) { .why__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .why__grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="why">
        <Container>
          <SectionTitle label="Why LAREJI" title="Quality You Can" italic="Taste." />
          <div className="why__grid">
            {WHY_CHOOSE.map((w) => (
              <div key={w.num} className="why-card">
                <p className="why-card__num">{w.num}</p>
                <h4 className="why-card__title">{w.title}</h4>
                <p className="why-card__text">{w.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
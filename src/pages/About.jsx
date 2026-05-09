import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/common/Container";
import SectionTitle from "../components/common/SectionTitle";
import Button from "../components/common/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { num: "01", title: "Authenticity",  text: "We source only real, unprocessed African ingredients. No shortcuts, no artificial additives — ever." },
  { num: "02", title: "Community",     text: "Every purchase supports local African farmers and the communities that grow these ingredients." },
  { num: "03", title: "Quality",       text: "From farm to packaging, every step is inspected and held to international export standards." },
  { num: "04", title: "Heritage",      text: "We celebrate African food culture and bring it to modern kitchens around the world with pride." },
];

const TEAM = [
  { name: "Lanrewaju",  role: "Founder & CEO",        emoji: "👩🏾" },
  { name: "Favour",     role: "Head of Sourcing",      emoji: "👨🏾" },
];

export default function About({ navigate }) {
  const heroRef   = useRef(null);
  const titleRef  = useRef(null);
  const tagRef    = useRef(null);
  const paraRef   = useRef(null);
  const btnRef    = useRef(null);
  const valRef    = useScrollReveal({ y: 40, stagger: 0.1, selector: ".val-card" });
  const teamRef   = useScrollReveal({ y: 40, stagger: 0.1, selector: ".team-card" });
  const missionRef = useScrollReveal({ y: 30 });

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(tagRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2)
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0.36)
      .fromTo(paraRef.current,  { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.55)
      .fromTo(btnRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.72);

    gsap.to(heroRef.current, {
      yPercent: -10, ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", end: "bottom top", scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .about-hero {
          margin-top: 72px; min-height: 90vh;
          background: var(--green); position: relative; overflow: hidden;
          display: flex; align-items: center;
          padding: clamp(60px,10vw,120px) clamp(28px,6vw,80px);
        }
        .about-hero__grain {
          position: absolute; inset: -50%; width: 200%; height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          animation: grain 8s steps(1) infinite; pointer-events: none;
        }
        .about-hero__circle {
          position: absolute; right: -100px; top: -100px;
          width: 560px; height: 560px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07); pointer-events: none;
          animation: rotateSlow 30s linear infinite;
        }
        .about-hero__circle2 {
          position: absolute; left: -60px; bottom: -80px;
          width: 340px; height: 340px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05); pointer-events: none;
        }
        .about-hero__content { position: relative; z-index: 1; max-width: 680px; }
        .about-hero__tag {
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
          color: rgba(255,255,255,0.4); font-family: var(--sans); margin-bottom: 24px;
          display: block;
        }
        .about-hero__title {
          font-family: var(--serif); font-size: clamp(48px,6vw,92px);
          font-weight: 300; color: var(--white); line-height: 1.04; margin-bottom: 28px;
        }
        .about-hero__title em { font-style: italic; color: rgba(255,255,255,0.55); }
        .about-hero__para {
          font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.9;
          font-weight: 300; margin-bottom: 36px; max-width: 520px;
        }

        /* ── Story ── */
        .about-story { padding: 100px 0; }
        .about-story__grid {
          display: grid; grid-template-columns: 1fr;
          gap: 80px; align-items: center; margin-top: 56px;
        }
        .about-story__text p {
          font-size: 15px; color: var(--muted); line-height: 1.95;
          font-weight: 300; margin-bottom: 20px;
        }
        .about-story__text p strong {
          color: var(--charcoal); font-weight: 500;
        }
        @media (max-width: 860px) {
          .about-story__grid { grid-template-columns: 1fr; gap: 40px; }
        }

        /* ── Mission ── */
        .about-mission {
          background: url('/bg-beige.jpg') no-repeat fixed;
          background-size: cover;
          background-attachment: fixed;
          padding: 100px 0;
        }
        .about-mission__inner {
          max-width: 780px; margin: 0 auto; text-align: center;
        }
        .about-mission__quote {
          font-family: var(--serif); font-size: clamp(22px,3vw,38px);
          font-weight: 300; font-style: italic; line-height: 1.55;
          color: var(--charcoal); margin: 32px 0 20px;
        }
        .about-mission__quote em { color: var(--green); }
        .about-mission__attr {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Values ── */
        .about-values { padding: 100px 0; }
        .about-values__grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 28px; margin-top: 56px;
        }
        .val-card {
          border-top: 2px solid var(--green); padding-top: 28px;
          transition: transform 0.3s ease;
        }
        .val-card:hover { transform: translateY(-5px); }
        .val-card__num {
          font-family: var(--serif); font-size: 48px; font-weight: 300;
          color: var(--beige-dark); line-height: 1; margin-bottom: 16px;
          transition: color 0.3s;
        }
        .val-card:hover .val-card__num { color: var(--green); }
        .val-card__title { font-family: var(--serif); font-size: 21px; font-weight: 400; margin-bottom: 12px; }
        .val-card__text { font-size: 13px; color: var(--muted); line-height: 1.85; font-weight: 300; }
        @media (max-width: 900px) { .about-values__grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .about-values__grid { grid-template-columns: 1fr; } }

        /* ── Team ── */
        .about-team { 
          background: url('/bg-beige.jpg') no-repeat fixed;
          background-size: cover;
          background-attachment: fixed;
          padding: 200px 0 160px; 
        }
        .about-team__grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 24px; margin-top: 56px;
        }
        .team-card {
          background: var(--white); padding: 36px 24px;
          text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
        }
        .team-card__emoji {
          font-size: 56px; margin-bottom: 16px; display: block;
          transition: transform 0.4s var(--ease-out);
        }
        .team-card:hover .team-card__emoji { transform: scale(1.15); }
        .team-card__name { font-family: var(--serif); font-size: 20px; font-weight: 400; margin-bottom: 6px; }
        .team-card__role { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--muted); }
        @media (max-width: 900px) { .about-team__grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .about-team__grid { grid-template-columns: 1fr; } }

        /* ── CTA Strip ── */
        .about-cta {
          background: var(--green); padding: 72px clamp(28px,6vw,80px);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 32px;
        }
        .about-cta__text {
          font-family: var(--serif); font-size: clamp(26px,3vw,44px);
          font-weight: 300; color: var(--white); line-height: 1.2;
        }
        .about-cta__text em { font-style: italic; color: rgba(255,255,255,0.55); }
      `}</style>

      {/* Hero */}
      <section className="about-hero" ref={heroRef}>
        <div className="about-hero__grain" />
        <div className="about-hero__circle" />
        <div className="about-hero__circle2" />
        <div className="about-hero__content">
          <span ref={tagRef} className="about-hero__tag">Our Story</span>
          <h1 ref={titleRef} className="about-hero__title">
            We Are<br /><em>LAREJI</em>
          </h1>
          <p ref={paraRef} className="about-hero__para">
            Born from a deep love of African food culture, LAREJI was built to bridge the gap
            between authentic African ingredients and modern kitchens — locally and globally.
          </p>
          <div ref={btnRef}>
            <Button variant="white" size="lg" onClick={() => navigate("shop")}>
              Shop Our Products
            </Button>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <Container>
          <SectionTitle label="How It Started" title="The" italic="LAREJI Story" />
          <div className="about-story__grid">
            <div className="about-story__text anim-fade-left">
              <p>
                <strong>LAREJI started in a family kitchen in Lagos.</strong> Our founder,
                Lara, noticed that authentic African ingredients were becoming harder to find —
                and when found, the quality was inconsistent, the packaging poor, and the
                story behind the product completely absent.
              </p>
              <p>
                She set out to change that. Working directly with smallholder farmers across
                Nigeria, she built a supply chain rooted in trust, transparency, and a genuine
                love for African food heritage.
              </p>
              <p>
                Today, LAREJI ships premium African ingredients to customers across Nigeria and
                internationally — each product carefully selected, hygienically packaged, and
                delivered with the story of its origin intact.
              </p>
              <p>
                <strong>This isn't just food. It's culture, memory, and home</strong> — delivered
                to your door wherever you are in the world.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <Container>
          <div className="about-mission__inner" ref={missionRef}>
            <SectionTitle label="Our Mission" title="What Drives Us" center />
            <p className="about-mission__quote">
              "To make authentic African ingredients <em>accessible, trustworthy,
              and beautifully presented</em> — for every kitchen, everywhere."
            </p>
            <p className="about-mission__attr">— Lanrewaju, Founder</p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="about-values">
        <Container>
          <SectionTitle label="What We Stand For" title="Our Core" italic="Values" />
          <div className="about-values__grid" ref={valRef}>
            {VALUES.map((v) => (
              <div key={v.num} className="val-card">
                <p className="val-card__num">{v.num}</p>
                <h4 className="val-card__title">{v.title}</h4>
                <p className="val-card__text">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="about-team">
        <Container>
          <SectionTitle label="The People" title="Meet the" italic="Team" />
          <div className="about-team__grid" ref={teamRef}>
            {TEAM.map((m) => (
              <div key={m.name} className="team-card">
                <span className="team-card__emoji">{m.emoji}</span>
                <p className="team-card__name">{m.name}</p>
                <p className="team-card__role">{m.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Strip */}
      <div className="about-cta">
        <h3 className="about-cta__text">
          Ready to taste <em>real Africa?</em>
        </h3>
        <Button variant="white" size="lg" onClick={() => navigate("shop")}>
          Shop Now
        </Button>
      </div>
    </>
  );
}
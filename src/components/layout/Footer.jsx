import { useState } from "react";
import Container from "../common/Container";

export default function Footer({ navigate }) {
  const [email, setEmail] = useState("");

  const COLS = [
    {
      heading: "Shop",
      links: ["Grains & Rice", "Flours & Swallows", "Spices & Seasonings", "Dried Foods", "Oils & Essentials", "Proteins"],
    },
    {
      heading: "Company",
      links: ["About LAREJI", "Our Story", "Quality Standards", "Contact Us"],
    },
    {
      heading: "Support",
      links: ["WhatsApp Order", "Shipping Info", "Payment Methods", "Privacy Policy", "Returns"],
    },
  ];

  return (
    <>
      <style>{`
        .footer { background: var(--charcoal); color: rgba(255,255,255,0.55); }
        .footer__top { padding: 72px 0 56px; }
        .footer__grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 48px;
        }
        .footer__logo {
          font-family: var(--serif); font-size: 30px; letter-spacing: 8px;
          color: var(--white); text-transform: uppercase; font-weight: 400;
          display: block; cursor: pointer; margin-bottom: 18px;
          transition: opacity 0.2s;
        }
        .footer__logo:hover { opacity: 0.7; }
        .footer__tagline { font-size: 13px; line-height: 1.9; font-weight: 300; max-width: 280px; }
        .footer__contact { margin-top: 24px; font-size: 12px; line-height: 2.1; color: rgba(255,255,255,0.32); }
        .footer__nl { margin-top: 28px; }
        .footer__nl-label { font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 10px; }
        .footer__nl-form { display: flex; }
        .footer__nl-input {
          flex: 1; padding: 11px 14px; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1); border-right: none;
          font-family: var(--sans); font-size: 12px; color: var(--white); outline: none;
          transition: border-color 0.2s;
        }
        .footer__nl-input:focus { border-color: rgba(255,255,255,0.3); }
        .footer__nl-input::placeholder { color: rgba(255,255,255,0.22); }
        .footer__nl-btn {
          background: var(--green); color: var(--white); border: none;
          padding: 11px 18px; font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; font-family: var(--sans); cursor: pointer;
          transition: background 0.2s;
        }
        .footer__nl-btn:hover { background: var(--green-mid); }
        .footer__col-head {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--white); margin-bottom: 22px; font-weight: 500;
        }
        .footer__links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .footer__link {
          font-size: 13px; color: rgba(255,255,255,0.42); cursor: pointer;
          transition: color 0.2s; font-weight: 300;
        }
        .footer__link:hover { color: var(--white); }
        .footer__bottom {
          padding: 24px 0 32px;
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
        }
        .footer__copy { font-size: 11px; color: rgba(255,255,255,0.22); }
        .footer__social { display: flex; gap: 24px; }
        .footer__social-link {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.35); cursor: pointer; transition: color 0.2s; text-decoration: none;
        }
        .footer__social-link:hover { color: var(--white); }
        @media (max-width: 900px) {
          .footer__grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 500px) {
          .footer__grid { grid-template-columns: 1fr; }
          .footer__bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer__top">
          <Container>
            <div className="footer__grid">
              <div>
                <span className="footer__logo" onClick={() => navigate("home")}>Lareji</span>
                <p className="footer__tagline">
                  Authentic African ingredients, carefully sourced and delivered to your door — locally and internationally.
                </p>
                <p className="footer__contact">
                  lareji.co@gmail.com<br />
                  +234 9161244319<br />
                  Nigeria
                </p>
                <div className="footer__nl">
                  <p className="footer__nl-label">Stay in the loop</p>
                  <div className="footer__nl-form">
                    <input
                      className="footer__nl-input"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="footer__nl-btn">Join</button>
                  </div>
                </div>
              </div>

              {COLS.map((col) => (
                <div key={col.heading}>
                  <p className="footer__col-head">{col.heading}</p>
                  <ul className="footer__links">
                    {col.links.map((l) => (
                      <li key={l} className="footer__link">{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="footer__bottom">
              <p className="footer__copy">© 2025 LAREJI. All rights reserved.</p>
              <div className="footer__social">
                <a href="https://wa.me/2349161244319"        target="_blank" rel="noreferrer" className="footer__social-link">WhatsApp</a>
                <a href="https://instagram.com/lareji.store" target="_blank" rel="noreferrer" className="footer__social-link">Instagram</a>
                <a href="https://tiktok.com/@lareji.co"      target="_blank" rel="noreferrer" className="footer__social-link">TikTok</a>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const LINKS = ["Home", "Shop", "About", "Contact", "Track"];

export default function Navbar({ page, navigate }) {
  const { cartCount, openDrawer } = useCart();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [bump, setBump]           = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 600);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const go = (p) => { navigate(p.toLowerCase()); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 72px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 64px);
          transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
          background: var(--white);
        }
        .nav.scrolled {
          background: rgba(245, 242, 235, 0.95);
          backdrop-filter: blur(14px);
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
        }
        .nav__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 8px;
          color: var(--green);
          text-transform: uppercase;
          cursor: pointer;
          transition: opacity 0.2s;
          user-select: none;
          background: none;
          border: none;
          padding: 0;
        }
        .nav__logo:hover { opacity: 0.7; }
        .nav__logo-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .nav__links {
          display: flex;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav__link {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--charcoal);
          cursor: pointer;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.2s;
          background: none;
          border: none;
          font-family: var(--sans);
        }
        .nav__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--green);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s var(--ease-out);
        }
        .nav__link:hover::after, .nav__link.active::after { transform: scaleX(1); }
        .nav__link.active { color: var(--green); }
        .nav__right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nav__cart {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--green);
          color: var(--white);
          border: none;
          padding: 10px 22px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: var(--sans);
          cursor: pointer;
          transition: background 0.2s;
        }
        .nav__cart:hover { background: var(--green-mid); }
        .nav__badge {
          background: var(--white);
          color: var(--green);
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav__badge.bump { animation: cartBounce 0.5s ease; }
        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
        }
        .nav__burger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--charcoal);
          transition: all 0.3s ease;
        }
        .nav__burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav__burger.open span:nth-child(2) { opacity: 0; }
        .nav__burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
        
        .nav__mobile {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--white);
          z-index: 199;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
          transform: translateX(-100%);
          transition: transform 0.4s var(--ease-out);
          box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          padding: 40px 20px;
        }
        .nav__mobile.open { transform: translateX(0); }
        .nav__mobile::before {
          content: '';
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: -1;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s var(--ease-out);
        }
        .nav__mobile.open::before {
          opacity: 1;
          pointer-events: auto;
        }
        .nav__mobile-link {
          font-family: var(--serif);
          font-size: 42px;
          font-weight: 400;
          color: var(--charcoal);
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
        }
        .nav__mobile-link:hover { color: var(--green); }
        .nav__mobile-cart {
          background: var(--green);
          color: var(--white);
          border: none;
          padding: 14px 44px;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-family: var(--sans);
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .nav__mobile-cart:hover {
          background: var(--green-mid);
        }
        @media (max-width: 768px) {
          .nav__links, .nav__cart { display: none; }
          .nav__burger { display: flex; }
        }
      `}</style>

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <button className="nav__logo" onClick={() => go("home")}>
          <img src="/logo.png" alt="LAREJI" className="nav__logo-img" />
          <span>Lareji</span>
        </button>

        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l}>
              <button
                className={`nav__link${page === l.toLowerCase() ? " active" : ""}`}
                onClick={() => go(l)}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav__right">
          <button className="nav__cart" onClick={openDrawer}>
            Cart
            <span className={`nav__badge${bump ? " bump" : ""}`}>{cartCount}</span>
          </button>
          <button
            className={`nav__burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav__mobile${menuOpen ? " open" : ""}`}>
        {LINKS.map((l) => (
          <button key={l} className="nav__mobile-link" onClick={() => go(l)}>
            {l}
          </button>
        ))}
        <button
          className="nav__mobile-cart"
          onClick={() => { openDrawer(); setMenuOpen(false); }}
        >
          Cart ({cartCount})
        </button>
      </div>
    </>
  );
}
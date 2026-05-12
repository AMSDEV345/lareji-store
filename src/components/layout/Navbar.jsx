import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAdmin } from "../../context/AdminContext"; // ← ADD THIS LINE

const LINKS = ["Home", "Shop", "About", "Contact", "Track"];

export default function Navbar({ page, navigate }) {
  const { cartCount, openDrawer } = useCart();
  const { isAdmin } = useAdmin(); // ← ADD THIS LINE
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle cart bounce animation
  useEffect(() => {
    if (cartCount > 0) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest(".nav__burger") && !e.target.closest(".nav__dropdown")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const handleNavigation = (page) => {
    navigate(page.toLowerCase());
    setMenuOpen(false);
  };

  const handleCartClick = () => {
    openDrawer();
    setMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      handleNavigation("admin");
    } else {
      handleNavigation("admin-login");
    }
  };

  return (
    <>
      <style>{`
        /* ============================================
           NAVBAR CONTAINER
           ============================================ */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 200;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 64px);
          background: var(--white);
          transition: background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
        }

        .nav.scrolled {
          background: rgba(245, 242, 235, 0.95);
          backdrop-filter: blur(14px);
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
        }

        /* ============================================
           NAVBAR LOGO
           ============================================ */
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
          padding: 0;
          border: none;
          background: none;
          transition: opacity 0.2s ease;
          user-select: none;
          min-width: fit-content;
        }

        .nav__logo:hover {
          opacity: 0.7;
        }

        .nav__logo:active {
          opacity: 0.5;
        }

        .nav__logo-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        /* ============================================
           DESKTOP NAVIGATION LINKS
           ============================================ */
        .nav__links {
          display: flex;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          justify-content: center;
        }

        .nav__link {
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--charcoal);
          cursor: pointer;
          padding: 0 0 3px 0;
          border: none;
          background: none;
          font-family: var(--sans);
          position: relative;
          transition: color 0.2s ease;
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
          transform-origin: left center;
          transition: transform 0.3s var(--ease-out);
        }

        .nav__link:hover::after,
        .nav__link.active::after {
          transform: scaleX(1);
        }

        .nav__link:hover,
        .nav__link.active {
          color: var(--green);
        }

        /* ============================================
           RIGHT SECTION (CART + BURGER)
           ============================================ */
        .nav__right {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-left: auto;
        }

        /* ============================================
           CART BUTTON
           ============================================ */
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
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
          border-radius: 0;
        }

        .nav__cart:hover {
          background: var(--green-mid);
        }

        .nav__cart:active {
          background: var(--green-light);
        }

        .nav__badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          background: var(--white);
          color: var(--green);
          border-radius: 50%;
          font-size: 10px;
          font-weight: 600;
        }

        .nav__badge.bump {
          animation: cartBounce 0.5s ease;
        }

        /* ============================================
           HAMBURGER MENU BUTTON
           ============================================ */
        .nav__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 8px;
          border: none;
          background: none;
          cursor: pointer;
          position: relative;
          z-index: 101;
          justify-content: center;
          align-items: center;
        }

        .nav__burger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--charcoal);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .nav__burger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }

        .nav__burger.open span:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }

        .nav__burger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ============================================
           DROPDOWN MENU
           ============================================ */
        .nav__dropdown {
          position: fixed;
          top: 72px;
          right: 0;
          background: var(--white);
          border-left: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: -4px 8px 24px rgba(0, 0, 0, 0.1);
          min-width: 220px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-12px);
          transition: all 0.3s var(--ease-out);
          overflow: hidden;
        }

        .nav__dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* ============================================
           DROPDOWN LINKS
           ============================================ */
        .nav__dropdown-link {
          padding: 14px 20px;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--charcoal);
          background: none;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          cursor: pointer;
          text-align: left;
          font-family: var(--sans);
          font-weight: 500;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav__dropdown-link:last-of-type {
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .nav__dropdown-link:hover {
          background: rgba(30, 75, 50, 0.04);
          color: var(--green);
        }

        .nav__dropdown-link:active {
          background: rgba(30, 75, 50, 0.08);
        }

        .nav__dropdown-link.active {
          background: rgba(30, 75, 50, 0.06);
          color: var(--green);
        }

        /* ============================================
           DROPDOWN CART BUTTON
           ============================================ */
        .nav__dropdown-cart {
          padding: 14px 20px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--white);
          background: var(--green);
          border: none;
          cursor: pointer;
          font-family: var(--sans);
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .nav__dropdown-cart:hover {
          background: var(--green-mid);
        }

        .nav__dropdown-cart:active {
          background: var(--green-light);
        }

        /* ============================================
           ADMIN LINK
           ============================================ */
        .nav__dropdown-admin {
          padding: 14px 20px;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--charcoal);
          background: none;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          cursor: pointer;
          text-align: left;
          font-family: var(--sans);
          font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .nav__dropdown-admin:hover {
          background: rgba(30, 75, 50, 0.04);
          color: var(--green);
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 768px) {
          .nav__links,
          .nav__cart {
            display: none;
          }

          .nav__burger {
            display: flex;
          }

          .nav__right {
            margin-left: 0;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        {/* LOGO */}
        <button className="nav__logo" onClick={() => handleNavigation("home")} aria-label="LAREJI Home">
          <img src="/logo.png" alt="LAREJI Logo" className="nav__logo-img" />
          <span>Lareji</span>
        </button>

        {/* DESKTOP LINKS */}
        <ul className="nav__links">
          {LINKS.map((link) => (
            <li key={link}>
              <button
                className={`nav__link${page === link.toLowerCase() ? " active" : ""}`}
                onClick={() => handleNavigation(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* RIGHT SECTION */}
        <div className="nav__right">
          {/* DESKTOP CART */}
          <button className="nav__cart" onClick={handleCartClick} aria-label="Shopping cart">
            Cart
            <span className={`nav__badge${bump ? " bump" : ""}`}>{cartCount}</span>
          </button>

          {/* HAMBURGER MENU */}
          <button
            className={`nav__burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      <div className={`nav__dropdown${menuOpen ? " open" : ""}`} role="navigation">
        {LINKS.map((link) => (
          <button
            key={link}
            className={`nav__dropdown-link${page === link.toLowerCase() ? " active" : ""}`}
            onClick={() => handleNavigation(link)}
          >
            {link}
          </button>
        ))}
        {/* ← ADD ADMIN BUTTON HERE */}
        <button 
          className="nav__dropdown-admin"
          onClick={handleAdminClick}
        >
          {isAdmin ? "Admin" : "Admin Login"}
        </button>
        <button className="nav__dropdown-cart" onClick={handleCartClick}>
          Cart ({cartCount})
        </button>
      </div>
    </>
  );
}
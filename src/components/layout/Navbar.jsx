import { useAdmin } from "../../context/AdminContext"; // Add this import

export default function Navbar({ page, navigate }) {
  const { cartCount, openDrawer } = useCart();
  const { isAdmin } = useAdmin(); // Add this line
  // ... rest of code ...

  const handleNavigation = (page) => {
    navigate(page.toLowerCase());
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        /* ... existing styles ... */
        
        .nav__admin-btn {
          background: var(--green);
          color: var(--white);
          border: none;
          padding: 10px 18px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: var(--sans);
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          border-radius: 0;
        }

        .nav__admin-btn:hover {
          background: var(--green-mid);
        }

        /* Add admin button to mobile dropdown */
        @media (max-width: 768px) {
          .nav__dropdown-admin {
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

          .nav__dropdown-admin:hover {
            background: var(--green-mid);
          }
        }
      `}</style>

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <button className="nav__logo" onClick={() => handleNavigation("home")}>
          <img src="/logo.png" alt="LAREJI Logo" className="nav__logo-img" />
          <span>Lareji</span>
        </button>

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
          
          {/* ADD ADMIN BUTTON HERE - Desktop */}
          {isAdmin && (
            <li>
              <button
                className={`nav__link${page === "admin" ? " active" : ""}`}
                onClick={() => handleNavigation("admin")}
              >
                Admin
              </button>
            </li>
          )}
        </ul>

        <div className="nav__right">
          {/* Admin button for desktop - before cart */}
          {isAdmin && (
            <button 
              className="nav__admin-btn"
              onClick={() => handleNavigation("admin")}
            >
              Dashboard
            </button>
          )}

          <button className="nav__cart" onClick={handleCartClick}>
            Cart
            <span className={`nav__badge${bump ? " bump" : ""}`}>{cartCount}</span>
          </button>

          <button className={`nav__burger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN - ADD ADMIN BUTTON */}
      <div className={`nav__dropdown${menuOpen ? " open" : ""}`}>
        {LINKS.map((link) => (
          <button
            key={link}
            className={`nav__dropdown-link${page === link.toLowerCase() ? " active" : ""}`}
            onClick={() => handleNavigation(link)}
          >
            {link}
          </button>
        ))}
        
        {/* Add Admin button to mobile menu */}
        {isAdmin && (
          <button
            className={`nav__dropdown-link${page === "admin" ? " active" : ""}`}
            onClick={() => handleNavigation("admin")}
          >
            Admin Dashboard
          </button>
        )}

        <button className="nav__dropdown-cart" onClick={handleCartClick}>
          Cart ({cartCount})
        </button>
      </div>
    </>
  );
}
import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { CountryProvider } from "./context/CountryContext";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/CartDrawer";
import CountryModal from "./components/CountryModal";
import { detectCountry, COUNTRY_CURRENCIES } from "./utils/geo";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TrackOrder from "./pages/TrackOrder";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(true);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [detected, setDetected] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("lareji_country");
    if (!stored) {
      detectCountry().then((geo) => {
        setDetected(geo);
        setShowCountryModal(true);
      });
    }
  }, []);

  const navigate = (p, product = null) => {
    setVisible(false);
    setTimeout(() => {
      setPage(p);
      if (product) setSelectedProduct(product);
      window.scrollTo({ top: 0, behavior: "instant" });
      setVisible(true);
    }, 200);
  };

  const handleCountrySelect = (countryCode) => {
    const currencyData = COUNTRY_CURRENCIES[countryCode];
    localStorage.setItem(
      "lareji_country",
      JSON.stringify({
        countryCode,
        currency: currencyData.currency,
      })
    );
    setShowCountryModal(false);
    window.location.reload();
  };

  const renderPage = () => {
    switch (page) {
      case "shop":
        return <Shop navigate={navigate} />;
      case "cart":
        return <Cart navigate={navigate} />;
      case "checkout":
        return <Checkout navigate={navigate} />;
      case "product":
        return <ProductDetails product={selectedProduct} navigate={navigate} />;
      case "about":
        return <About navigate={navigate} />;
      case "contact":
        return <Contact navigate={navigate} />;
      case "track":
        return <TrackOrder navigate={navigate} />;
      case "admin-login":
        return <AdminLogin navigate={navigate} />;
      case "admin":
        return <AdminDashboard navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <AdminProvider>
      <CountryProvider>
        <CartProvider>
          {showCountryModal && (
            <CountryModal onSelect={handleCountrySelect} detected={detected} />
          )}
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar page={page} navigate={navigate} />
            <main
              style={{
                flex: 1,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              {renderPage()}
            </main>
            <Footer navigate={navigate} />
            <CartDrawer navigate={navigate} />
          </div>
        </CartProvider>
      </CountryProvider>
    </AdminProvider>
  );
}
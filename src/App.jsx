import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/CartDrawer";
import CurrencyModal from "./context/CurrencyModal";
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

const CURRENCIES = {
  NGN: { name: "Nigerian Naira", symbol: "₦", code: "NGN" },
  USD: { name: "US Dollar", symbol: "$", code: "USD" },
  GBP: { name: "British Pound", symbol: "£", code: "GBP" },
  EUR: { name: "Euro", symbol: "€", code: "EUR" },
  JPY: { name: "Japanese Yen", symbol: "¥", code: "JPY" },
  SGD: { name: "Singapore Dollar", symbol: "S$", code: "SGD" },
  KRW: { name: "South Korean Won", symbol: "₩", code: "KRW" },
};

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visible, setVisible] = useState(true);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [detected, setDetected] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("lareji_currency");
    if (!stored) {
      setDetected({ currencyCode: "NGN" });
      setShowCurrencyModal(true);
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

  const handleCurrencySelect = (currencyCode) => {
    const currencyData = CURRENCIES[currencyCode];
    localStorage.setItem(
      "lareji_currency",
      JSON.stringify({
        currencyCode,
        currency: currencyData.code,
        symbol: currencyData.symbol,
        name: currencyData.name,
      })
    );
    setShowCurrencyModal(false);
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
      <CartProvider>
        {showCurrencyModal && (
          <CurrencyModal onSelect={handleCurrencySelect} detected={detected} />
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
    </AdminProvider>
  );
}
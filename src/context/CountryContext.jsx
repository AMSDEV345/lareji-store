import { createContext, useContext, useState, useEffect } from "react";
import { detectCountry } from "../utils/geo";

const CountryContext = createContext(null);

export function CountryProvider({ children }) {
  const [country, setCountry] = useState(null);
  const [currency, setCurrency] = useState("NGN");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem("lareji_country");
    if (stored) {
      const data = JSON.parse(stored);
      setCountry(data.countryCode);
      setCurrency(data.currency);
      setLoading(false);
    } else {
      // Auto-detect
      detectCountry().then((geo) => {
        setCountry(geo.countryCode);
        setCurrency(geo.currency);
        localStorage.setItem("lareji_country", JSON.stringify(geo));
        setLoading(false);
      });
    }
  }, []);

  const selectCountry = (countryCode, currency) => {
    setCountry(countryCode);
    setCurrency(currency);
    localStorage.setItem("lareji_country", JSON.stringify({ countryCode, currency }));
  };

  return (
    <CountryContext.Provider value={{ country, currency, selectCountry, loading }}>
      {children}
    </CountryContext.Provider>
  );
}

export const useCountry = () => {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be inside CountryProvider");
  return ctx;
};
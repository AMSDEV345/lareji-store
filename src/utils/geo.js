// Detect user's country by IP
export const detectCountry = async () => {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      countryCode: data.country_code,
      countryName: data.country_name,
      currency: getCurrencyByCountry(data.country_code),
    };
  } catch (error) {
    console.error("Geo-location error:", error);
    return { countryCode: "NG", countryName: "Nigeria", currency: "NGN" };
  }
};

export const getCurrencyByCountry = (countryCode) => {
  const currencyMap = {
    NG: "NGN",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AU: "AUD",
    ZA: "ZAR",
    KE: "KES",
    GH: "GHS",
    UG: "UGX",
    // Add more countries as needed
  };
  return currencyMap[countryCode] || "USD";
};

export const COUNTRY_CURRENCIES = {
  NG: { name: "Nigeria", currency: "NGN", symbol: "₦" },
  US: { name: "United States", currency: "USD", symbol: "$" },
  GB: { name: "United Kingdom", currency: "GBP", symbol: "£" },
  CA: { name: "Canada", currency: "CAD", symbol: "C$" },
  AU: { name: "Australia", currency: "AUD", symbol: "A$" },
  ZA: { name: "South Africa", currency: "ZAR", symbol: "R" },
  KE: { name: "Kenya", currency: "KES", symbol: "KSh" },
  GH: { name: "Ghana", currency: "GHS", symbol: "₵" },
  UG: { name: "Uganda", currency: "UGX", symbol: "USh" },
};
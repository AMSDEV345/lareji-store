// Regional pricing structure
// Nigeria = Local pricing (cheaper)
// Elsewhere = International pricing (higher)

export const PRICING_TIERS = {
  NG: {
    name: "Nigeria",
    multiplier: 1.0, // Base price
  },
  US: {
    name: "United States",
    multiplier: 1.8, // 80% markup
  },
  GB: {
    name: "United Kingdom",
    multiplier: 1.8,
  },
  CA: {
    name: "Canada",
    multiplier: 1.7,
  },
  AU: {
    name: "Australia",
    multiplier: 1.9,
  },
  ZA: {
    name: "South Africa",
    multiplier: 1.5,
  },
  KE: {
    name: "Kenya",
    multiplier: 1.6,
  },
  GH: {
    name: "Ghana",
    multiplier: 1.4,
  },
  UG: {
    name: "Uganda",
    multiplier: 1.5,
  },
  // Default for unmapped countries
  DEFAULT: {
    name: "International",
    multiplier: 1.8,
  },
};

export const getPrice = (basePrice, countryCode) => {
  const tier = PRICING_TIERS[countryCode] || PRICING_TIERS.DEFAULT;
  return Math.round(basePrice * tier.multiplier);
};

export const getConvertedPrice = (ngnPrice, countryCode) => {
  // If already in NGN (local price), apply multiplier
  // Otherwise, assume it's already a base price
  if (countryCode === "NG") {
    return ngnPrice;
  }
  return getPrice(ngnPrice, countryCode);
};
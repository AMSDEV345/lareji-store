import { useState, useEffect } from "react";
import { COUNTRY_CURRENCIES } from "../utils/geo";

export default function CountryModal({ onSelect, detected }) {
  const [selected, setSelected] = useState(detected?.countryCode || "NG");
  const [selectedCurrency, setSelectedCurrency] = useState(
    COUNTRY_CURRENCIES[selected || "NG"].currency
  );

  useEffect(() => {
    setSelectedCurrency(COUNTRY_CURRENCIES[selected].currency);
  }, [selected]);

  const handleSelect = () => {
    onSelect(selected);
  };

  return (
    <>
      <style>{`
        .country-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        }
        .country-modal {
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 40px;
          border-radius: 8px;
          max-width: 480px;
          width: 90%;
          animation: fadeUp 0.4s var(--ease-out) both;
        }
        .country-modal__title {
          font-family: var(--serif);
          font-size: 28px;
          font-weight: 400;
          margin-bottom: 12px;
          color: var(--charcoal);
        }
        .country-modal__sub {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 28px;
          line-height: 1.6;
        }
        .currency-display {
          background: rgba(30, 75, 50, 0.08);
          border: 2px solid var(--green);
          padding: 16px;
          margin-bottom: 24px;
          border-radius: 4px;
          text-align: center;
        }
        .currency-display__label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
          display: block;
        }
        .currency-display__value {
          font-family: var(--serif);
          font-size: 32px;
          color: var(--green);
          font-weight: 400;
        }
        .country-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
          max-height: 320px;
          overflow-y: auto;
          padding-right: 8px;
        }
        .country-btn {
          padding: 16px 14px;
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          border: 2px solid var(--beige-dark);
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          border-radius: 4px;
          font-family: var(--sans);
          font-size: 12px;
        }
        .country-btn:hover {
          border-color: var(--green);
          background: rgba(30, 75, 50, 0.06);
        }
        .country-btn.active {
          background: var(--green);
          color: var(--white);
          border-color: var(--green);
        }
        .country-btn__name {
          font-weight: 500;
          display: block;
          margin-bottom: 4px;
        }
        .country-btn__code {
          font-size: 10px;
          opacity: 0.7;
        }
        .country-modal__actions {
          display: flex;
          gap: 12px;
        }
        .country-modal__btn {
          flex: 1;
          padding: 13px;
          border: none;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--sans);
        }
        .country-modal__confirm {
          background: var(--green);
          color: var(--white);
        }
        .country-modal__confirm:hover {
          background: var(--green-mid);
        }
      `}</style>

      <div className="country-overlay">
        <div className="country-modal">
          <h2 className="country-modal__title">Where are you shopping from?</h2>
          <p className="country-modal__sub">
            Select your country to see prices in your local currency.
          </p>

          {/* Currency Display */}
          <div className="currency-display">
            <span className="currency-display__label">Selected Currency</span>
            <div className="currency-display__value">
              {COUNTRY_CURRENCIES[selected]?.symbol} {selectedCurrency}
            </div>
          </div>

          <div className="country-grid">
            {Object.entries(COUNTRY_CURRENCIES).map(([code, data]) => (
              <button
                key={code}
                className={`country-btn${selected === code ? " active" : ""}`}
                onClick={() => setSelected(code)}
              >
                <span className="country-btn__name">{data.name}</span>
                <span className="country-btn__code">
                  {code} • {data.currency} ({data.symbol})
                </span>
              </button>
            ))}
          </div>

          <div className="country-modal__actions">
            <button
              className="country-modal__btn country-modal__confirm"
              onClick={handleSelect}
            >
              Continue with {selectedCurrency}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
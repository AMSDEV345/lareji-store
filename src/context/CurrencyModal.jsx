import { useState, useEffect } from "react";

const CURRENCIES = {
  NGN: { name: "Nigerian Naira", symbol: "₦", code: "NGN" },
  USD: { name: "US Dollar", symbol: "$", code: "USD" },
  GBP: { name: "British Pound", symbol: "£", code: "GBP" },
  EUR: { name: "Euro", symbol: "€", code: "EUR" },
  JPY: { name: "Japanese Yen", symbol: "¥", code: "JPY" },
  SGD: { name: "Singapore Dollar", symbol: "S$", code: "SGD" },
  KRW: { name: "South Korean Won", symbol: "₩", code: "KRW" },
};

export default function CurrencyModal({ onSelect, detected }) {
  const [selected, setSelected] = useState(detected?.currencyCode || "NGN");
  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCIES[selected || "NGN"]
  );

  useEffect(() => {
    setSelectedCurrency(CURRENCIES[selected]);
  }, [selected]);

  const handleSelect = () => {
    onSelect(selected);
  };

  return (
    <>
      <style>{`
        .currency-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }

        .currency-modal {
          background: var(--white);
          padding: 44px 40px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          animation: fadeUp 0.4s var(--ease-out) both;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .currency-modal__title {
          font-family: var(--serif);
          font-size: 28px;
          font-weight: 400;
          margin-bottom: 10px;
          color: var(--charcoal);
          line-height: 1.3;
        }

        .currency-modal__subtitle {
          font-size: 14px;
          color: var(--muted);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .currency-display {
          background: rgba(30, 75, 50, 0.06);
          border: 2px solid var(--green);
          padding: 20px;
          margin-bottom: 28px;
          border-radius: 6px;
          text-align: center;
        }

        .currency-display__label {
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
          display: block;
          font-weight: 500;
        }

        .currency-display__value {
          font-family: var(--serif);
          font-size: 36px;
          color: var(--green);
          font-weight: 300;
          line-height: 1;
          margin-bottom: 4px;
        }

        .currency-display__code {
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 1px;
        }

        .currency-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 28px;
          max-height: 340px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .currency-btn {
          padding: 16px 14px;
          background: var(--white);
          border: 2px solid var(--beige-dark);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          border-radius: 6px;
          font-family: var(--sans);
          font-size: 11px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          justify-content: center;
          min-height: 70px;
        }

        .currency-btn:hover {
          border-color: var(--green);
          background: rgba(30, 75, 50, 0.04);
        }

        .currency-btn.active {
          background: var(--green);
          color: var(--white);
          border-color: var(--green);
          box-shadow: 0 4px 12px rgba(30, 75, 50, 0.2);
        }

        .currency-btn__symbol {
          font-size: 20px;
          font-weight: 400;
          line-height: 1;
        }

        .currency-btn__code {
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .currency-modal__actions {
          display: flex;
          gap: 12px;
        }

        .currency-modal__btn {
          flex: 1;
          padding: 14px 20px;
          border: none;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--sans);
          font-weight: 600;
          border-radius: 4px;
        }

        .currency-modal__confirm {
          background: var(--green);
          color: var(--white);
        }

        .currency-modal__confirm:hover {
          background: var(--green-mid);
        }
      `}</style>

      <div className="currency-overlay">
        <div className="currency-modal">
          <h2 className="currency-modal__title">Select Your Currency</h2>
          <p className="currency-modal__subtitle">
            Choose your preferred currency to see prices accordingly.
          </p>

          <div className="currency-display">
            <span className="currency-display__label">Selected Currency</span>
            <div className="currency-display__value">
              {selectedCurrency.symbol}
            </div>
            <div className="currency-display__code">
              {selectedCurrency.name}
            </div>
          </div>

          <div className="currency-grid">
            {Object.entries(CURRENCIES).map(([code, data]) => (
              <button
                key={code}
                className={`currency-btn${selected === code ? " active" : ""}`}
                onClick={() => setSelected(code)}
              >
                <span className="currency-btn__symbol">{data.symbol}</span>
                <span className="currency-btn__code">{code}</span>
              </button>
            ))}
          </div>

          <div className="currency-modal__actions">
            <button
              className="currency-modal__btn currency-modal__confirm"
              onClick={handleSelect}
            >
              Continue with {selectedCurrency.code}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
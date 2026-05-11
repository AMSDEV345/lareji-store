import { useState } from "react";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

const ORDERS = [
  {
    id: "12345",
    customer: "Chioma Okafor",
    destination: "London, UK",
    estimatedDelivery: "Jan 25, 2024",
    shippingMethod: "Express International",
    timeline: [
      { id: 1, status: "Order Placed", date: "2024-01-15", icon: "✓", completed: true },
      { id: 2, status: "Processing", date: "2024-01-16", icon: "⏳", completed: true },
      { id: 3, status: "Handed to Courier", date: "2024-01-18", icon: "📦", completed: true },
      { id: 4, status: "In Transit (Lagos)", date: "2024-01-19", icon: "🚚", completed: true, current: true },
      { id: 5, status: "At Airport", date: "Pending", icon: "✈️", completed: false },
      { id: 6, status: "Shipped Internationally", date: "Pending", icon: "🌍", completed: false },
      { id: 7, status: "Out for Delivery", date: "Pending", icon: "🚚", completed: false },
      { id: 8, status: "Delivered", date: "Pending", icon: "✅", completed: false },
    ],
  },
  {
    id: "12346",
    customer: "Kade Williams",
    destination: "Toronto, Canada",
    estimatedDelivery: "Feb 1, 2024",
    shippingMethod: "Standard International",
    timeline: [
      { id: 1, status: "Order Placed", date: "2024-01-17", icon: "✓", completed: true },
      { id: 2, status: "Processing", date: "2024-01-18", icon: "⏳", completed: true },
      { id: 3, status: "Handed to Courier", date: "2024-01-19", icon: "📦", completed: true },
      { id: 4, status: "In Transit (Lagos)", date: "2024-01-20", icon: "🚚", completed: false, current: true },
      { id: 5, status: "At Airport", date: "Pending", icon: "✈️", completed: false },
      { id: 6, status: "Shipped Internationally", date: "Pending", icon: "🌍", completed: false },
      { id: 7, status: "Out for Delivery", date: "Pending", icon: "🚚", completed: false },
      { id: 8, status: "Delivered", date: "Pending", icon: "✅", completed: false },
    ],
  },
];

export default function TrackOrder({ navigate }) {
  const [searchId, setSearchId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = ORDERS.find((o) => o.id === searchId.trim());
    setSelectedOrder(order);
    setSearched(true);
  };

  const getCurrentLocation = () => {
    if (!selectedOrder) return "";
    const current = selectedOrder.timeline.find((t) => t.current);
    return current ? current.status : "Unknown";
  };

  return (
    <>
      <style>{`
        .track-order {
          margin-top: 72px;
          min-height: auto;
          background: transparent;
          padding: 0 0 80px 0;
        }

        .track-hero {
          background: var(--green);
          color: var(--white);
          padding: 60px 20px;
          text-align: center;
        }

        .track-hero__title {
          font-family: var(--serif);
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 300;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .track-hero__subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.75);
          margin-bottom: 36px;
          max-width: 460px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .search-form {
          display: flex;
          gap: 0;
          max-width: 480px;
          margin: 0 auto;
        }

        .search-form input {
          flex: 1;
          padding: 14px 18px;
          border: none;
          background: rgba(255,255,255,0.15);
          color: var(--white);
          font-family: var(--sans);
          font-size: 14px;
          outline: none;
          border-radius: 4px 0 0 4px;
        }

        .search-form input::placeholder {
          color: rgba(255,255,255,0.55);
        }

        .search-form button {
          padding: 14px 28px;
          background: var(--charcoal);
          color: var(--white);
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-weight: 500;
          font-family: var(--sans);
          font-size: 13px;
          letter-spacing: 1px;
          transition: background 0.2s;
          white-space: nowrap;
        }

        .search-form button:hover {
          background: var(--green-mid);
        }

        .tracking-result {
          background: var(--white);
          border-radius: 8px;
          padding: 40px;
          max-width: 860px;
          margin: 48px auto 0;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid var(--beige-dark);
          flex-wrap: wrap;
          gap: 12px;
        }

        .result-header__info h2 {
          font-family: var(--serif);
          font-size: 26px;
          margin: 0 0 6px 0;
        }

        .result-header__info p {
          font-size: 13px;
          color: var(--muted);
          margin: 0;
        }

        .result-header__back {
          padding: 10px 20px;
          background: var(--beige-deep);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-family: var(--sans);
          color: var(--charcoal);
          transition: background 0.2s;
        }

        .result-header__back:hover {
          background: var(--beige-dark);
        }

        .current-location {
          background: linear-gradient(135deg, var(--green) 0%, var(--charcoal) 100%);
          color: var(--white);
          padding: 24px 28px;
          margin-bottom: 36px;
          border-radius: 8px;
        }

        .current-location__label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.75;
          margin-bottom: 8px;
        }

        .current-location__text {
          font-family: var(--serif);
          font-size: 26px;
          font-weight: 400;
          margin: 0;
        }

        .delivery-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 36px;
        }

        .timeline-item {
          display: flex;
          gap: 16px;
          padding: 12px 0 12px 20px;
          border-left: 2px solid var(--beige-dark);
          margin-left: 16px;
          position: relative;
        }

        .timeline-item.completed {
          border-left-color: var(--green);
        }

        .timeline-item.current {
          border-left-color: var(--green);
          border-left-width: 3px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -7px;
          top: 18px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--beige-dark);
        }

        .timeline-item.completed::before {
          background: var(--green);
        }

        .timeline-item.current::before {
          background: var(--green);
          width: 16px;
          height: 16px;
          left: -9px;
          top: 16px;
          box-shadow: 0 0 0 4px rgba(30,75,50,0.15);
        }

        .timeline-icon {
          font-size: 20px;
          min-width: 28px;
        }

        .timeline-content { flex: 1; }

        .timeline-status {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 2px;
          color: var(--charcoal);
        }

        .timeline-item:not(.completed) .timeline-status {
          color: var(--muted);
        }

        .timeline-date {
          font-size: 12px;
          color: var(--muted);
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          padding: 24px;
          background: var(--beige-deep);
          border-radius: 8px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 6px;
        }

        .detail-value {
          font-size: 15px;
          font-weight: 500;
          color: var(--charcoal);
        }

        .not-found {
          text-align: center;
          padding: 60px 24px;
        }

        .not-found__icon { font-size: 56px; margin-bottom: 16px; }

        .not-found__title {
          font-family: var(--serif);
          font-size: 26px;
          margin: 0 0 10px 0;
        }

        .not-found__text {
          color: var(--muted);
          margin-bottom: 24px;
          line-height: 1.7;
          font-size: 14px;
        }

        @media (max-width: 600px) {
          .tracking-result { padding: 24px 16px; margin: 32px 16px 0; }
          .order-details { grid-template-columns: 1fr; }
          .search-form { flex-direction: column; }
          .search-form input { border-radius: 4px; }
          .search-form button { border-radius: 4px; }
        }
      `}</style>

      <div className="track-order">
        {/* Hero */}
        <div className="track-hero">
          <Container>
            <h1 className="track-hero__title">Track Your Order</h1>
            <p className="track-hero__subtitle">
              Enter your order ID to see real-time updates on your delivery
            </p>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter Order ID (e.g. 12345)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                required
              />
              <button type="submit">Track</button>
            </form>
          </Container>
        </div>

        {/* Results */}
        <Container>
          {searched && selectedOrder ? (
            <div className="tracking-result">
              <div className="result-header">
                <div className="result-header__info">
                  <h2>Order #{selectedOrder.id}</h2>
                  <p>{selectedOrder.customer} • {selectedOrder.destination}</p>
                </div>
                <button
                  className="result-header__back"
                  onClick={() => {
                    setSearchId("");
                    setSelectedOrder(null);
                    setSearched(false);
                  }}
                >
                  Search Another
                </button>
              </div>

              <div className="current-location">
                <div className="current-location__label">📍 Current Location</div>
                <p className="current-location__text">{getCurrentLocation()}</p>
              </div>

              <div className="delivery-timeline">
                {selectedOrder.timeline.map((step) => (
                  <div
                    key={step.id}
                    className={`timeline-item${step.completed ? " completed" : ""}${step.current ? " current" : ""}`}
                  >
                    <div className="timeline-icon">{step.icon}</div>
                    <div className="timeline-content">
                      <div className="timeline-status">{step.status}</div>
                      <div className="timeline-date">{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-details">
                <div className="detail-item">
                  <span className="detail-label">Order ID</span>
                  <span className="detail-value">#{selectedOrder.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estimated Delivery</span>
                  <span className="detail-value">{selectedOrder.estimatedDelivery}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Shipping Method</span>
                  <span className="detail-value">{selectedOrder.shippingMethod}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Destination</span>
                  <span className="detail-value">{selectedOrder.destination}</span>
                </div>
              </div>
            </div>

          ) : searched && !selectedOrder ? (
            <div className="tracking-result">
              <div className="not-found">
                <div className="not-found__icon">❌</div>
                <h2 className="not-found__title">Order Not Found</h2>
                <p className="not-found__text">
                  We couldn't find an order with ID "{searchId}".<br />
                  Please check the order ID and try again.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setSearchId("");
                    setSelectedOrder(null);
                    setSearched(false);
                  }}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : null}
        </Container>
      </div>
    </>
  );
}
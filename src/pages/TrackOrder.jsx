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
      { id: 5, status: "At Airport", date: "2024-01-20", icon: "✈️", completed: false },
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
    const order = ORDERS.find(o => o.id === searchId);
    setSelectedOrder(order);
    setSearched(true);
  };

  const getCurrentLocation = () => {
    if (!selectedOrder) return "";
    const current = selectedOrder.timeline.find(t => t.current);
    return current ? current.status : "Unknown";
  };

  return (
    <>
      <style>{`
        .track-order {
          margin-top: 72px;
          min-height: calc(100vh - 72px);
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 60px 0;
        }
        .track-hero {
          background: var(--green);
          color: var(--white);
          padding: 80px 0;
          margin-bottom: 60px;
          text-align: center;
        }
        .track-hero__title {
          font-family: var(--serif);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 300;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        .track-hero__subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        .search-form {
          display: flex;
          gap: 12px;
          max-width: 500px;
          margin: 0 auto;
        }
        .search-form input {
          flex: 1;
          padding: 14px 18px;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: var(--white);
          font-family: var(--sans);
          font-size: 14px;
          border-radius: 4px;
        }
        .search-form input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        .search-form button {
          padding: 14px 32px;
          background: var(--white);
          color: var(--green);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          font-family: var(--sans);
          transition: all 0.3s;
        }
        .search-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        .tracking-result {
          background: var(--white);
          border-radius: 8px;
          padding: 48px;
          max-width: 900px;
          margin: 0 auto;
        }
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 2px solid var(--beige-dark);
        }
        .result-header__info h2 {
          font-family: var(--serif);
          font-size: 28px;
          margin: 0 0 8px 0;
        }
        .result-header__info p {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
        }
        .result-header__back {
          padding: 10px 20px;
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s;
        }
        .result-header__back:hover {
          background: transparent;
background-size: cover;
background-attachment: fixed;-dark);
        }
        .current-location {
          background: linear-gradient(135deg, var(--green) 0%, var(--charcoal) 100%);
          color: var(--white);
          padding: 28px;
          margin-bottom: 40px;
          border-radius: 8px;
        }
        .current-location__label {
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
          margin-bottom: 8px;
        }
        .current-location__text {
          font-family: var(--serif);
          font-size: 28px;
          font-weight: 400;
          margin: 0;
        }
        .delivery-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }
        .timeline-item {
          display: flex;
          gap: 16px;
          padding: 12px 0;
          border-left: 2px solid var(--beige-dark);
          padding-left: 16px;
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
          left: -8px;
          top: 16px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: transparent;
background-size: cover;
background-attachment: fixed;-dark);
        }
        .timeline-item.completed::before {
          background: var(--green);
        }
        .timeline-item.current::before {
          background: var(--green);
          width: 16px;
          height: 16px;
          left: -10px;
          top: 14px;
        }
        .timeline-icon {
          font-size: 24px;
          min-width: 30px;
        }
        .timeline-content {
          flex: 1;
        }
        .timeline-status {
          font-weight: 500;
          font-size: 15px;
          margin-bottom: 2px;
        }
        .timeline-date {
          font-size: 13px;
          color: var(--muted);
        }
        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          padding: 28px;
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
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
          margin-bottom: 8px;
        }
        .detail-value {
          font-size: 16px;
          font-weight: 500;
        }
        .not-found {
          text-align: center;
          padding: 60px 40px;
        }
        .not-found__icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        .not-found__title {
          font-family: var(--serif);
          font-size: 28px;
          margin: 0 0 12px 0;
        }
        .not-found__text {
          color: var(--muted);
          margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          .tracking-result {
            padding: 28px;
          }
          .order-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="track-order">
        {/* Hero Section */}
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

        <Container>
          {/* Results */}
          {searched && selectedOrder ? (
            <div className="tracking-result">
              {/* Header */}
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

              {/* Current Location */}
              <div className="current-location">
                <div className="current-location__label">📍 Current Location</div>
                <p className="current-location__text">{getCurrentLocation()}</p>
              </div>

              {/* Timeline */}
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

              {/* Order Details */}
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
                  We couldn't find an order with ID "{searchId}"<br />
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
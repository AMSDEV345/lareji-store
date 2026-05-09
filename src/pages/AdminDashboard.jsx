import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { PRODUCTS } from "../data/products";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

export default function AdminDashboard({ navigate }) {
  const { logout, adminUser } = useAdmin();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState(PRODUCTS);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "staples",
    description: "",
  });

  const handleLogout = () => {
    logout();
    navigate("home");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSaveEdit = () => {
    setProducts(
      products.map((p) => (p.id === editingId ? editForm : p))
    );
    setEditingId(null);
    alert("Product updated successfully!");
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted!");
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill all fields");
      return;
    }
    const product = {
      ...newProduct,
      id: Math.max(...products.map((p) => p.id)) + 1,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, "-"),
      emoji: "🌾",
      featured: false,
      inStock: true,
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", price: 0, category: "staples", description: "" });
    setShowAddProduct(false);
    alert("Product added successfully!");
  };

  return (
    <>
      <style>{`
        .admin-dashboard {
          margin-top: 72px;
          min-height: calc(100vh - 72px);
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 40px 0;
        }
        .admin-header {
          background: var(--green);
          color: var(--white);
          padding: 32px 0;
          margin-bottom: 40px;
        }
        .admin-header__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-header__title {
          font-family: var(--serif);
          font-size: 36px;
          font-weight: 400;
          margin: 0;
        }
        .admin-header__user {
          font-size: 13px;
          opacity: 0.9;
        }
        .admin-tabs {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          border-bottom: 2px solid var(--beige-dark);
          padding-bottom: 16px;
        }
        .admin-tab {
          background: none;
          border: none;
          padding: 12px 20px;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s;
          font-family: var(--sans);
          position: relative;
        }
        .admin-tab.active {
          color: var(--green);
          font-weight: 500;
        }
        .admin-tab.active::after {
          content: '';
          position: absolute;
          bottom: -18px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--green);
        }
        .admin-products {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .product-item {
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 24px;
          border-radius: 4px;
          display: grid;
          grid-template-columns: 1fr 150px 150px 120px;
          gap: 20px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .product-item {
            grid-template-columns: 1fr;
          }
        }
        .product-name {
          font-weight: 500;
          font-family: var(--serif);
          font-size: 16px;
        }
        .product-price {
          display: flex;
          gap: 8px;
        }
        .product-price input {
          padding: 8px 12px;
          border: 1px solid var(--beige-dark);
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          font-size: 13px;
          width: 100%;
        }
        .product-actions {
          display: flex;
          gap: 8px;
        }
        .product-actions button {
          padding: 8px 14px;
          font-size: 11px;
          border: none;
          cursor: pointer;
          border-radius: 3px;
          transition: all 0.2s;
        }
        .btn-save {
          background: var(--green);
          color: var(--white);
        }
        .btn-save:hover {
          background: var(--green-mid);
        }
        .btn-delete {
          background: #e74c3c;
          color: var(--white);
        }
        .btn-delete:hover {
          background: #c0392b;
        }
        .add-product-form {
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 24px;
          border-radius: 4px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-field label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
        }
        .form-field input,
        .form-field select,
        .form-field textarea {
          padding: 10px 12px;
          border: 1px solid var(--beige-dark);
          background: transparent;
background-size: cover;
background-attachment: fixed;-deep);
          font-family: var(--sans);
          font-size: 13px;
          color: var(--charcoal);
        }
        .form-field textarea {
          grid-column: 1 / -1;
          min-height: 100px;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: transparent;
background-size: cover;
background-attachment: fixed;);
          padding: 24px;
          border-radius: 4px;
          text-align: center;
        }
        .stat-value {
          font-size: 32px;
          font-weight: 500;
          color: var(--green);
          margin-bottom: 8px;
        }
        .stat-label {
          font-size: 12px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="admin-dashboard">
        {/* Header */}
        <div className="admin-header">
          <Container>
            <div className="admin-header__content">
              <h1 className="admin-header__title">Admin Dashboard</h1>
              <div>
                <div className="admin-header__user">Logged in as: <strong>{adminUser?.username}</strong></div>
                <Button variant="ghost" size="sm" onClick={handleLogout} style={{ marginTop: 8 }}>
                  Logout
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          {/* Tabs */}
          <div className="admin-tabs">
            <button
              className={`admin-tab${tab === "products" ? " active" : ""}`}
              onClick={() => setTab("products")}
            >
              Products
            </button>
            <button
              className={`admin-tab${tab === "analytics" ? " active" : ""}`}
              onClick={() => setTab("analytics")}
            >
              Analytics
            </button>
          </div>

          {/* Products Tab */}
          {tab === "products" && (
            <div>
              <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, margin: 0 }}>
                  Manage Products
                </h2>
                <Button variant="primary" size="md" onClick={() => setShowAddProduct(!showAddProduct)}>
                  {showAddProduct ? "Cancel" : "+ Add Product"}
                </Button>
              </div>

              {showAddProduct && (
                <div className="add-product-form">
                  <div className="form-field">
                    <label>Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Garri White"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Price (NGN)</label>
                    <input
                      type="number"
                      placeholder="e.g. 2500"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-field">
                    <label>Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                      <option value="staples">Staples</option>
                      <option value="spices">Spices</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="oils">Oils</option>
                      <option value="protein">Protein</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Description</label>
                    <textarea
                      placeholder="Product description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={handleAddProduct}
                    style={{ gridColumn: "1 / -1" }}
                  >
                    Add Product
                  </Button>
                </div>
              )}

              <div className="admin-products">
                {products.map((product) => (
                  <div key={product.id} className="product-item">
                    <div>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          style={{ padding: "8px 12px", width: "100%", border: "1px solid var(--beige-dark)" }}
                        />
                      ) : (
                        <span className="product-name">{product.name}</span>
                      )}
                    </div>
                    <div className="product-price">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        />
                      ) : (
                        <span>₦{product.price.toLocaleString()}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>
                      {product.category}
                    </div>
                    <div className="product-actions">
                      {editingId === product.id ? (
                        <button className="btn-save" onClick={handleSaveEdit}>
                          Save
                        </button>
                      ) : (
                        <button className="btn-save" onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                      )}
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {tab === "analytics" && (
            <div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, marginBottom: 24 }}>
                Store Analytics
              </h2>
              <div className="stats">
                <div className="stat-card">
                  <div className="stat-value">{products.length}</div>
                  <div className="stat-label">Total Products</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">5</div>
                  <div className="stat-label">Total Orders</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">₦45,600</div>
                  <div className="stat-label">Total Revenue</div>
                </div>
              </div>
              <p style={{ color: "var(--muted)", textAlign: "center", marginTop: 40 }}>
                More analytics coming soon...
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
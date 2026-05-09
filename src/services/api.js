// Base API URL — update this to your Railway backend URL when deployed
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Products
export const getProducts    = ()     => request("/products");
export const getProductById = (id)   => request(`/products/${id}`);
export const getProductsByCategory = (cat) => request(`/products?category=${cat}`);

// Orders
export const createOrder = (orderData) =>
  request("/orders", { method: "POST", body: JSON.stringify(orderData) });

export const getOrderById = (id) => request(`/orders/${id}`);

// Auth
export const register = (data) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(data) });

export const login = (data) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(data) });
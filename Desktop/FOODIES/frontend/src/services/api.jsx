const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function getToken() {
  return sessionStorage.getItem("foodWasteToken");
}

export function setToken(token) {
  sessionStorage.setItem("foodWasteToken", token);
}

export function clearToken() {
  sessionStorage.removeItem("foodWasteToken");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.detail || "Request failed");
  }
  return body;
}

export async function login(email, password) {
  return request(`/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function register(name, email, password, role) {
  return request(`/auth/register`, { method: "POST", body: JSON.stringify({ name, email, password, role }) });
}

export async function getFoodList(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return request(`/food/list?${params}`);
}

export async function addFood(data) {
  return request(`/food/add`, { method: "POST", body: JSON.stringify(data) });
}

export async function completeFood(foodId) {
  return request(`/food/${foodId}/complete`, { method: "POST" });
}

export async function createClaim({ food_id, ngo_id, requested_quantity }) {
  return request(`/claim`, { method: "POST", body: JSON.stringify({ food_id, ngo_id, requested_quantity }) });
}

export async function getAnalytics() {
  return request(`/analytics/summary`);
}

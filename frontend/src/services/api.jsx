const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8005/api/v1";

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
    let message = "Request failed";
    if (body?.detail) {
      if (Array.isArray(body.detail)) {
        message = body.detail.map(d => `${d.loc[d.loc.length - 1]}: ${d.msg}`).join(", ");
      } else {
        message = body.detail;
      }
    } else if (body?.error?.message) {
      message = body.error.message;
    }
    throw new Error(message);
  }
  return body;
}

export async function login(email, password) {
  return request(`/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
}

export async function register(full_name, email, password, role) {
  return request(`/auth/register`, { method: "POST", body: JSON.stringify({ full_name, email, password, role }) });
}

export async function getFoodList(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await request(`/food?${params}`);
  return res.items;
}

export async function addFood(data) {
  return request(`/food`, { method: "POST", body: JSON.stringify(data) });
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

export async function forgotPassword(email) {
  return request(`/auth/forgot-password`, { method: "POST", body: JSON.stringify({ email }) });
}

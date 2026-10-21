import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "acrearch-admin-token";

function readPayload(token) {
  try {
    const encoded = token.split(".")[1];
    if (!encoded) return null;
    const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(normalized));
  } catch {
    return null;
  }
}

function hasValidToken(token) {
  const payload = readPayload(token);
  return Boolean(token && payload?.role === "admin" && payload?.exp && payload.exp * 1000 > Date.now());
}

export const authService = {
  async login(adminId, password) {
    const response = await axios.post(`${API_URL}/auth/login`, { adminId: adminId.trim(), password });
    const token = response.data?.data?.token;
    if (!hasValidToken(token)) throw new Error("The server returned an invalid admin session.");
    localStorage.setItem(TOKEN_KEY, token);
    return response.data.data.admin;
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!hasValidToken(token)) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return token;
  },
  isAuthenticated() {
    return Boolean(this.getToken());
  },
};

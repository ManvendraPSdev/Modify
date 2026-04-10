import { api } from "../../../lib/api.js";

export async function register({ userName, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("register:", error?.response?.status, error?.response?.data);
    return null;
  }
}

export async function login({ userName, email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("login:", error?.response?.status, error?.response?.data);
    return null;
  }
}

/** Returns `{ user }` or `null` when not logged in / network error. */
export async function getMe() {
  try {
    const response = await api.get("/api/auth/getMe");
    return response.data;
  } catch {
    return null;
  }
}

export async function logout() {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("logout:", error?.response?.status, error?.response?.data);
    return null;
  }
}

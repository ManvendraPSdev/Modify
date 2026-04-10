import axios from "axios";

/**
 * Production: set VITE_API_URL on Vercel to your deployed API (https://..., no trailing slash).
 * Example: https://modify-api.railway.app
 */
const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

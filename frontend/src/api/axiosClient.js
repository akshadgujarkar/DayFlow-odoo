/**
 * axiosClient.js
 *
 * Single shared Axios instance for all frontend → backend API calls.
 * Rule: Do not scatter raw fetch() calls across components; all HTTP
 * traffic must go through this client (Rules.md §6).
 *
 * Base URL is read from the VITE_API_BASE_URL env variable (set in .env).
 * Auth header injection and 401 handling are stubbed here and will be
 * wired to AuthContext in Phase 3.
 */

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor ─────────────────────────────────────────────────────
// Phase 3 TODO: retrieve token from AuthContext and attach as:
//   config.headers.Authorization = `Bearer ${token}`;
axiosClient.interceptors.request.use(
  (config) => {
    // Stub: token attachment will be added in Phase 3 when AuthContext exists.
    // const token = getTokenFromAuthContext();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ────────────────────────────────────────────────────
// Phase 3 TODO: redirect to Sign In on 401.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Stub: 401 redirect will be wired to AuthContext / React Router in Phase 3.
    // if (error.response?.status === 401) {
    //   clearAuthContext();
    //   window.location.href = '/signin';
    // }

    // Re-throw so individual callers can handle errors (Rules.md §18).
    return Promise.reject(error);
  }
);

export default axiosClient;

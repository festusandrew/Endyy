// services/authAPI.ts
// ──────────────────────────────────────────────────────────────────────────
// Axios-based API client for the Express /api/auth backend.
// Firebase still manages Google OAuth and session state; this module
// mirrors users into MongoDB and stores a JWT for all server-side calls.
// ──────────────────────────────────────────────────────────────────────────

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL: string =
  (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:5000';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface BackendUser {
  _id: string;
  uid?: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  addresses?: any[];
  wishlist?: string[];
  provider?: 'email' | 'google';
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: BackendUser;
}

// ─── Token helpers ──────────────────────────────────────────────────────────

const TOKEN_KEY = 'endyy_token';

export const saveToken  = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken   = (): string | null => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// ─── Axios instance ────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000, // 10 s
});

// Request interceptor — attach JWT on every request if present
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — unwrap errors into readable messages
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// ─── Public endpoints ───────────────────────────────────────────────────────

/**
 * Register with email + password.
 * Mirrors registerWithEmail() in firebase.ts.
 */
export const apiRegister = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/register', {
    name,
    email,
    password,
  });
  saveToken(data.token);
  return data;
};

/**
 * Login with email + password.
 * Mirrors loginWithEmail() in firebase.ts.
 */
export const apiLogin = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/login', {
    email,
    password,
  });
  saveToken(data.token);
  return data;
};

/**
 * Upsert a Google-authenticated Firebase user into MongoDB.
 * Call this right after loginWithGoogle() resolves.
 */
export const apiGoogleAuth = async (firebaseUser: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/api/auth/google', {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  });
  saveToken(data.token);
  return data;
};

// ─── Private endpoints (JWT required) ──────────────────────────────────────

/** Fetch the current user's MongoDB profile. */
export const apiGetMe = async (): Promise<{ user: BackendUser }> => {
  const { data } = await api.get<{ user: BackendUser }>('/api/auth/me');
  return data;
};

/** Update displayName, photoURL, addresses, or wishlist. */
export const apiUpdateMe = async (
  updates: Partial<Pick<BackendUser, 'displayName' | 'photoURL' | 'addresses' | 'wishlist'>>
): Promise<{ user: BackendUser }> => {
  const { data } = await api.put<{ user: BackendUser }>('/api/auth/me', updates);
  return data;
};

/** Remove the stored JWT (call alongside firebase signOut). */
export const apiLogout = () => removeToken();

/** Expose the configured axios instance for other services if needed. */
export default api;

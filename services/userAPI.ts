// services/userAPI.ts
// ──────────────────────────────────────────────────────────────────────────
// Axios-based client for /api/users backend endpoints.
// Uses the shared axios instance from authAPI so JWT is attached
// automatically on every request.
// ──────────────────────────────────────────────────────────────────────────

import api, { BackendUser } from './authAPI';

/**
 * Fetch all users (Admin use).
 * Requires a valid JWT.
 */
export const apiGetUsers = async (): Promise<BackendUser[]> => {
  const { data } = await api.get<BackendUser[]>('/api/users');
  return data;
};

/**
 * Fetch a single user by their MongoDB _id.
 * Requires a valid JWT.
 */
export const apiGetUserById = async (
  id: string
): Promise<BackendUser> => {
  const { data } = await api.get<BackendUser>(`/api/users/${id}`);
  return data;
};

/**
 * Delete a user by their MongoDB _id.
 * Requires a valid JWT.
 */
export const apiDeleteUser = async (
  id: string
): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`/api/users/${id}`);
  return data;
};

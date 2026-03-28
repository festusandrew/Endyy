// services/orderAPI.ts
// ──────────────────────────────────────────────────────────────────────────
// Axios-based client for /api/orders backend endpoints.
// Uses the shared axios instance from authAPI so JWT is attached
// automatically on every request.
// ──────────────────────────────────────────────────────────────────────────

import api from './authAPI';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface Order {
  _id: string;
  orderId: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: 'Delivery' | 'Pick-Up';
  shippingAddress?: ShippingAddress | null;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface CreateOrderPayload {
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: 'Delivery' | 'Pick-Up';
  shippingAddress?: ShippingAddress | null;
}

// ─── Endpoints ──────────────────────────────────────────────────────────────

/**
 * Place a new order.
 * Works for both guests (no JWT) and logged-in users (JWT auto-attached).
 */
export const apiCreateOrder = async (
  payload: CreateOrderPayload
): Promise<{ order: Order }> => {
  const { data } = await api.post<{ order: Order }>('/api/orders', payload);
  return data;
};

/**
 * Fetch all orders belonging to the currently logged-in user.
 * Requires a valid JWT (user must be logged in).
 */
export const apiGetMyOrders = async (): Promise<{ orders: Order[] }> => {
  const { data } = await api.get<{ orders: Order[] }>('/api/orders/my');
  return data;
};

/**
 * Fetch a single order by its MongoDB _id or readable orderId (e.g. ORD-XXXXXXX).
 */
export const apiGetOrderById = async (
  id: string
): Promise<{ order: Order }> => {
  const { data } = await api.get<{ order: Order }>(`/api/orders/${id}`);
  return data;
};

/**
 * Cancel a pending order
 */
export const apiCancelOrder = async (
  id: string
): Promise<{ order: Order }> => {
  const { data } = await api.put<{ order: Order }>(`/api/orders/${id}/cancel`);
  return data;
};


export type ProductCategory = 'Cakes' | 'Cupcakes' | 'Yogurt Parfaits' | string;

export const DEFAULT_CATEGORIES: ProductCategory[] = ['Cakes', 'Cupcakes', 'Yogurt Parfaits'];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  images?: string[];
  popular: boolean;
  ingredients?: string[];
  calories?: number;
  availableMethods?: DeliveryMethod[];
}

export interface Order {
  id: string;
  createdAt: Date;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: any[];
  deliveryMethod: string;
  total: number;
  customerEmail?: string;
  shippingAddress?: any;
}

export interface TrainingApplication {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  goals: string;
  status: 'new' | 'reviewed' | 'contacted' | 'rejected';
}

export interface ContactMessage {
  id: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum DeliveryMethod {
  PICKUP = 'Pickup',
  DELIVERY = 'Delivery'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
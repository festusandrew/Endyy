export enum ProductCategory {
  CAKE = 'Cakes',
  CUPCAKE = 'Cupcakes',
  YOGURT = 'Yogurt Parfaits'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  popular: boolean;
  ingredients?: string[];
  calories?: number;
  availableMethods?: DeliveryMethod[];
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
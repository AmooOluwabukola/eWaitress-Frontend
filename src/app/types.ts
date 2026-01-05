// Types and interfaces for the hotel food ordering system

export type UserRole = 'guest' | 'admin' | 'attendant' | 'kitchen';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'completed' | 'cancelled';

export type PaymentMethod = 'room-charge' | 'online-payment' | 'cash';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  preparationTime: number; // in minutes
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customerName: string;
  roomNumber?: string;
  tableNumber?: string;
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  assignedAttendant?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'attendant' | 'kitchen' | 'admin';
  active: boolean;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'completed' | 'refunded';
  timestamp: Date;
  customerName: string;
}
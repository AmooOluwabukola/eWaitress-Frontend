
import type { MenuItem, Order, Staff, Payment } from '../types';

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: '1',
    name: 'Continental Breakfast',
    description: 'Fresh croissants, seasonal fruits, yogurt, and coffee',
    price: 18.00,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1570215171609-a54fb21cb7c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnJlYWtmYXN0fGVufDF8fHx8MTc2NjIwMzA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 15
  },
  {
    id: '2',
    name: 'American Breakfast',
    description: 'Scrambled eggs, bacon, sausage, hash browns, and toast',
    price: 22.00,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1570215171609-a54fb21cb7c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnJlYWtmYXN0fGVufDF8fHx8MTc2NjIwMzA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 20
  },
  // Mains
  {
    id: '3',
    name: 'Grilled Ribeye Steak',
    description: 'Premium 12oz ribeye with seasonal vegetables and mashed potatoes',
    price: 45.00,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1676471912422-defa79bd178c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwc3RlYWt8ZW58MXx8fHwxNzY2MjQxNDU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 30
  },
  {
    id: '4',
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with lemon butter sauce and asparagus',
    price: 38.00,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1728050829024-8113f4cd85ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGZvb2R8ZW58MXx8fHwxNzY2MjQzMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 25
  },
  {
    id: '5',
    name: 'Lobster Risotto',
    description: 'Creamy risotto with fresh lobster and truffle oil',
    price: 52.00,
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1728050829024-8113f4cd85ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGZvb2R8ZW58MXx8fHwxNzY2MjQzMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
    preparationTime: 35
  },
  // Grills
  {
    id: '10',
    name: 'BBQ Chicken Skewers',
    description: 'Tender chicken pieces with BBQ glaze and grilled vegetables',
    price: 28.00,
    category: 'Grills',
    image: 'https://images.unsplash.com/photo-1687365762572-b418d588c225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwbWVhdCUyMHNrZXdlcnN8ZW58MXx8fHwxNzY3NTU2MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 25
  },
  {
    id: '11',
    name: 'Mixed Grill Platter',
    description: 'Assorted grilled meats including lamb chops, chicken, and beef',
    price: 55.00,
    category: 'Grills',
    image: 'https://images.unsplash.com/photo-1687365762572-b418d588c225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwbWVhdCUyMHNrZXdlcnN8ZW58MXx8fHwxNzY3NTU2MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 35
  },
  {
    id: '12',
    name: 'Grilled Prawns',
    description: 'Jumbo prawns with garlic butter and lemon',
    price: 42.00,
    category: 'Grills',
    image: 'https://images.unsplash.com/photo-1687365762572-b418d588c225?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwbWVhdCUyMHNrZXdlcnN8ZW58MXx8fHwxNzY3NTU2MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 20
  },
  // Pepper Soup
  {
    id: '13',
    name: 'Goat Meat Pepper Soup',
    description: 'Spicy goat meat soup with traditional African spices',
    price: 25.00,
    category: 'Pepper Soup',
    image: 'https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXIlMjBzb3VwJTIwYWZyaWNhbnxlbnwxfHx8fDE3Njc2MTQyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 30
  },
  {
    id: '14',
    name: 'Fish Pepper Soup',
    description: 'Fresh catfish in aromatic pepper soup broth',
    price: 22.00,
    category: 'Pepper Soup',
    image: 'https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXIlMjBzb3VwJTIwYWZyaWNhbnxlbnwxfHx8fDE3Njc2MTQyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 25
  },
  {
    id: '15',
    name: 'Chicken Pepper Soup',
    description: 'Tender chicken pieces in spicy pepper soup',
    price: 20.00,
    category: 'Pepper Soup',
    image: 'https://images.unsplash.com/photo-1741026079032-7cb660e44bad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXIlMjBzb3VwJTIwYWZyaWNhbnxlbnwxfHx8fDE3Njc2MTQyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 25
  },
  // Desserts
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 14.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1714972871808-17d0d38954f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwcGFzdHJ5fGVufDF8fHx8MTc2NjIyNDk4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 12
  },
  {
    id: '7',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers',
    price: 12.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1714972871808-17d0d38954f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwcGFzdHJ5fGVufDF8fHx8MTc2NjIyNDk4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 10
  },
  // Drinks
  {
    id: '8',
    name: 'Freshly Brewed Coffee',
    description: 'Premium arabica coffee, hot or iced',
    price: 5.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3Njc1NTY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 5
  },
  {
    id: '9',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 7.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3Njc1NTY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 5
  },
  {
    id: '16',
    name: 'Signature Cocktail',
    description: 'House special cocktail with premium spirits',
    price: 15.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3Njc1NTY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 8
  },
  {
    id: '17',
    name: 'Red Wine',
    description: 'Premium selection of red wines',
    price: 18.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1761938816249-a047cca56400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ2xhc3MlMjBsdXh1cnl8ZW58MXx8fHwxNzY3NjE0Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 3
  },
  {
    id: '18',
    name: 'Craft Beer',
    description: 'Selection of local and imported craft beers',
    price: 8.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1683544599381-be284dbd9abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rcyUyMGJhcnxlbnwxfHx8fDE3Njc1NTY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
    preparationTime: 2
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD001',
    items: [
      { ...menuItems[0], quantity: 1 },
      { ...menuItems[7], quantity: 2 }
    ],
    total: 28.00,
    status: 'preparing',
    customerName: 'Sarah Johnson',
    roomNumber: '305',
    paymentMethod: 'room-charge',
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    assignedAttendant: 'ATD001'
  },
  {
    id: 'ORD002',
    items: [
      { ...menuItems[2], quantity: 2 },
      { ...menuItems[5], quantity: 1 }
    ],
    total: 104.00,
    status: 'ready',
    customerName: 'Michael Chen',
    tableNumber: '12',
    paymentMethod: 'online-payment',
    specialInstructions: 'Medium rare for the steaks please',
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
    assignedAttendant: 'ATD002'
  },
  {
    id: 'ORD003',
    items: [
      { ...menuItems[3], quantity: 1 }
    ],
    total: 38.00,
    status: 'confirmed',
    customerName: 'Emma Davis',
    roomNumber: '502',
    paymentMethod: 'room-charge',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 3)
  }
];

export const staff: Staff[] = [
  { id: 'ATD001', name: 'James Wilson', role: 'attendant', active: true },
  { id: 'ATD002', name: 'Maria Garcia', role: 'attendant', active: true },
  { id: 'KIT001', name: 'Chef Robert Brown', role: 'kitchen', active: true },
  { id: 'KIT002', name: 'Chef Anna Lee', role: 'kitchen', active: true },
  { id: 'ADM001', name: 'David Thompson', role: 'admin', active: true }
];

export const payments: Payment[] = [
  {
    id: 'PAY001',
    orderId: 'ORD001',
    amount: 28.00,
    method: 'room-charge',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    customerName: 'Sarah Johnson'
  },
  {
    id: 'PAY002',
    orderId: 'ORD002',
    amount: 104.00,
    method: 'online-payment',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    customerName: 'Michael Chen'
  }
];
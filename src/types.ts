export type StockState = 'in' | 'low' | 'sold';

export interface Product {
  id: string;
  name: string;
  localName?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stall: string;
  vendorName: string;
  vendorId: string;
  image: string;
  stockState: StockState;
  stockRemaining?: string;
  isLiveSpecial?: boolean;
  category: string;
  tag?: string;
  description?: string;
}

export interface LiveVendor {
  id: string;
  name: string;
  stall: string;
  category: string;
  image: string;
  avatar: string;
  viewers: number;
  likes: number;
  liveCatchphrase: string;
  streamImage: string;
  pinnedProduct: Product;
  isLive: boolean;
  scheduleTime?: string;
}

export interface StreetFoodVendor {
  id: string;
  name: string;
  rating: number;
  distance: string;
  location: string;
  minPrice: number;
  image: string;
  items: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  items: CartItem[];
  totalPrice: number;
  status: 'preparing' | 'ready' | 'delivering' | 'delivered';
  driver: {
    name: string;
    vehicle: string;
    etaMinutes: number;
    phone: string;
  };
  specialInstructions?: string;
  paymentMethod: 'COD' | 'GCash';
  createdAt: string;
}

export interface LiveChatMessage {
  id: string;
  sender: string;
  text: string;
  isHost?: boolean;
  isYou?: boolean;
  isPurchaseNotice?: boolean;
  timestamp: string;
}

export interface SukiCustomer {
  id: string;
  name: string;
  phone: string;
  tier: 'Diamond Suki' | 'Gold Suki' | 'Regular Suki';
  totalOrders: number;
  totalSpent: number;
  favoriteItems: string[];
  outstandingBalance: number;
  lastOrdered: string;
  notes: string;
}


// ACCOUNT USER TYPES


export interface UserProfile {
  name: string;
  location: string;
  avatarUrl: string;
  orderCount: number;
  sukiPoints: number;
  favoriteVendorsCount: number;
}

export interface BasketItem {
  id: string;
  name: string;
  vendorName: string;
  stallNumber: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  packed: boolean;
  thumbnailUrl: string;
}

export interface DeliveryRider {
  name: string;
  todaAssociation: string;
  tricycleNumber: string;
  avatarUrl: string;
  estimatedDeliveryMins: number;
  currentLocationName: string;
  phone: string;
  rating: number;
  plateNumber: string;
}

export interface CurrentDelivery {
  basketId: string;
  status: 'Preparing' | 'Packed' | 'On The Way' | 'Delivered';
  totalPrice: number;
  stallsCount: number;
  items: BasketItem[];
  rider: DeliveryRider;
}

export interface Vendor {
  id: string;
  name: string;
  stallNumber: string;
  marketSection: string;
  sukiDuration: string;
  rating: number;
  sukiCount: number;
  isLive: boolean;
  liveTitle?: string;
  isOpen: boolean;
  statusText: string;
  avatarUrl: string;
  category: 'Seafood' | 'Vegetables' | 'Street Food' | 'Fruits' | 'Rice' | 'Coffee & Spices';
  actionType: 'watch_live' | 'order' | 'alert_me';
  specialty: string;
  description: string;
  products?: {
    id: string;
    name: string;
    price: number;
    unit: string;
    availableKg?: number;
    freshness: string;
  }[];
}

export interface SukiRecord {
  vendorId: string;
  vendorName: string;
  stallNumber: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Gold Suki' | 'Silver Suki' | 'VIP Suki';
  durationYears: number;
  totalSpent: number;
  perksUnlocked: string[];
  activePrivilege: string;
  stampsCount: number;
  nextReward: string;
  sukiNotes: string;
  lastOrderDate: string;
}

export interface LiveComment {
  id: string;
  sender: string;
  message: string;
  isSuki: boolean;
  timestamp: string;
  isMineAction?: boolean;
}

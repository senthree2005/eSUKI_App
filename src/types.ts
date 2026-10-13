

/* ---------- ENUMS ---------- */

export type StockState = 'in_stock' | 'low_stock' | 'out_of_stock';

export type VendorCategory =
  | 'Seafood'
  | 'Vegetables'
  | 'Street Food'
  | 'Fruits'
  | 'Rice'
  | 'Drinks'
  | 'Inihaw BBQ'
  | 'Kakanin'
  | 'Homemade';

export type VendorActionType = 'watch_live' | 'order' | 'alert_me';

export type OrderStatus =
  | 'paying'
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'delivering'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'COD' | 'GCash';

export type UserRole = 'vendor' | 'customer' | 'driver';

export type SukiTier = 'Diamond Suki' | 'Gold Suki' | 'Regular Suki';


/* ---------- COMMON FIELDS ---------- */

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}


/* ---------- USERS AND PROFILES ---------- */

export interface User extends BaseEntity {
  username: string;
  roles: UserRole[];
}

export interface Customer extends BaseEntity {
  userId: string;
  location: string;
  phone: string;
}

export interface Driver extends BaseEntity {
  userId: string;
  location: string;
  name: string;
  vehicle: string;
  phone: string;
}


/* ---------- VENDORS ---------- */

export interface Vendor extends BaseEntity {
  userId: string;
  name: string;
  stallNumber: string;
  marketSection: string;
  location: string;

  vendorName: string;
  vendorAvatar: string;
  avatarUrl: string;

  sukiDuration: string;
  rating: number;
  sukiCount: number;

  isLive: boolean;
  isOpen: boolean;
  statusText: string;
  liveTitle?: string;

  category: VendorCategory;
  actionType: VendorActionType;
  specialty: string;
  description: string;
}


/* ---------- PRODUCTS ---------- */

export interface Product extends BaseEntity {
  vendorID: string;
  reviewID?: string;
  name: string;
  localName?: string;
  price: number;
  originalPrice?: number;
  unit: string;

  quantity: number;
  minQuantity: number;
  step: number;

  image: string;
  heroImage?: string;

  stockState: StockState;
  stockRemaining?: string;
  isLiveSpecial?: boolean;

  category: VendorCategory | string;
  tag?: string;
  subtitle: string;
  unitText: string;
  description?: string;

  reviewCount: number;
}


/* ---------- PRODUCT THUMBNAILS ---------- */

export interface Thumbnail extends BaseEntity {
  productId: string;
  url: string;
  label: string;
  sortOrder: number;
}


/* ---------- REVIEWS ---------- */

export interface Review extends BaseEntity {
  productId: string;
  customerId: string;
  vendorId: string;

  rating: number;
  comment: string;
  location: string;

  tier?: SukiTier;
  prepTag?: string;

  verifiedSuki: boolean;
  avatarColor: string;
  initials: string;
}


/* ---------- CUSTOMER-VENDOR RELATIONSHIP ---------- */

// Junction table: customer can follow many vendors,
// and each vendor can have many suki customers.

export interface CustomerVendor extends BaseEntity {
  customerId: string;
  vendorId: string;
}


/* ---------- SUKI CUSTOMER / LOYALTY ---------- */

export interface SukiCustomer extends BaseEntity {
  customerId: string;
  vendorId: string;

  tier: SukiTier;
  totalOrders: number;
  totalSpent: number;
  outstandingBalance: number;

  lastOrdered?: string;
  notes?: string;
}


/* ---------- CART ---------- */

export interface Cart extends BaseEntity {
  customerId: string;
}

export interface CartItem extends BaseEntity {
  customerId: string;
  productId: string;
  quantity: number;
  note?: string;
}


/* ---------- ORDERS ---------- */

export interface Order extends BaseEntity {
  customerId: string;
  driverId: string | null;
  customerAddress: string; 
  orders: CartItem[];

  totalPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;

  specialInstructions?: string;
  createdAt: string;
}


/* ---------- ORDER ITEMS ---------- */

// Preserve the product price at the time of purchase.
// Do not rely on the product's current price for old orders.

export interface OrderItem extends BaseEntity {
  orderId: string;
  productId: string;

  productName: string;
  unitPrice: number;
  unit: string;

  quantity: number;
  note?: string;
}


/* ---------- LIVE VENDORS ---------- */

export interface LiveVendor extends BaseEntity {
  vendorId: string;
  pinnedProductId: string;

  category: string;
  image: string;
  avatar: string;

  viewers: number;
  likes: number;

  liveCatchphrase: string;
  streamImage: string;
  scheduleTime?: string;
}


/* ---------- LIVE CHAT ---------- */

export interface LiveChatMessage extends BaseEntity {
  liveVendorId: string;
  senderUserId: string;

  text: string;
  isHost: boolean;
  isPurchaseNotice: boolean;
}





// export type StockState = 'in' | 'low' | 'sold';

// export interface Product {
//   id: string;
//   name: string;
//   localName?: string;
//   price: number;
//   originalPrice?: number;
//   unit: string;
//   quantity: number;
//   minQuantity: number;
//   step: number;
//   vendor: Vendor;
//   image: string;
//   stockState: StockState;
//   subtitle: string,
//   unitText: string,
//   stockRemaining?: string;
//   isLiveSpecial?: boolean;
//   category: string;
//   tag?: string;
//   description?: string;
//   reviewCount: number;
//   reviews?: Review[];
//   heroImage?: string;
//   thumbnails: {
//       id: string;
//       url: string;
//       label: string;
//     }[];
// }


// export interface StreetFoodVendor {
//   id: string;
//   name: string;
//   rating: number;
//   distance: string;
//   location: string;
//   minPrice: number;
//   image: string;
//   items: string[];
// }



// // ACCOUNT USER TYPES


// export interface UserProfile {
//   name: string;
//   location: string;
//   avatarUrl: string;
//   orderCount: number;
//   sukiPoints: number;
//   favoriteVendorsCount: number;
//   vendor: Vendor;
// }

// export interface BasketItem {
//   id: string;
//   name: string;
//   vendorName: string;
//   stallNumber: string;
//   category: string;
//   price: number;
//   unit: string;
//   quantity: number;
//   packed: boolean;
//   thumbnailUrl: string;
// }

// export interface DeliveryRider {
//   name: string;
//   todaAssociation: string;
//   tricycleNumber: string;
//   avatarUrl: string;
//   estimatedDeliveryMins: number;
//   currentLocationName: string;
//   phone: string;
//   rating: number;
//   plateNumber: string;
// }

// export interface CurrentDelivery {
//   basketId: string;
//   status: 'Preparing' | 'Packed' | 'On The Way' | 'Delivered';
//   totalPrice: number;
//   stallsCount: number;
//   items: BasketItem[];
//   rider: DeliveryRider;
// }

// export interface Vendor {
//   id: string;
//   name: string;
//   stallNumber: string;
//   marketSection: string;
//   sukiDuration: string;
//   rating: number;
//   sukiCount: number;
//   isLive: boolean;
//   location: string,
//   vendorName: string;
//   vendorId: string;
//   vendorAvatar: string;
//   liveTitle?: string;
//   isOpen: boolean;
//   statusText: string;
//   avatarUrl: string;
//   category: 'Seafood' | 'Vegetables' | 'Street Food' | 'Fruits' | 'Rice' | 'Coffee & Spices';
//   actionType: 'watch_live' | 'order' | 'alert_me';
//   specialty: string;
//   description: string;
//   products?: {
//     id: string;
//     name: string;
//     price: number;
//     unit: string;
//     availableKg?: number;
//     freshness: string;
//   }[];
// }

// export interface SukiRecord {
//   vendorId: string;
//   vendorName: string;
//   stallNumber: string;
//   tier: 'Bronze' | 'Silver' | 'Gold' | 'Gold Suki' | 'Silver Suki' | 'VIP Suki';
//   durationYears: number;
//   totalSpent: number;
//   perksUnlocked: string[];
//   activePrivilege: string;
//   stampsCount: number;
//   nextReward: string;
//   sukiNotes: string;
//   lastOrderDate: string;
// }

// export interface LiveComment {
//   id: string;
//   sender: string;
//   message: string;
//   isSuki: boolean;
//   timestamp: string;
//   isMineAction?: boolean;
// }


// // ITEM DETAILS

// export interface Review {
//   id: string;
//   author: string;
//   tier?: string;
//   location: string;
//   timestamp: string;
//   rating: number;
//   comment: string;
//   prepTag?: string;
//   verifiedSuki: boolean;
//   avatarColor: string;
//   initials: string;
// }

// export interface BasketItem {
//   id: string;
//   productId: string;
//   productName: string;
//   pricePerKilo: number;
//   weightKg: number;
//   selectedCut: string;
//   specialInstructions: string;
//   image: string;
//   stallName: string;
// }

// export interface SukiRecord {
//   id: string;
//   date: string;
//   stall: string;
//   items: string;
//   amount: number;
//   pointsEarned: number;
//   status: 'Delivered' | 'In Transit' | 'Preparing';
//   paidVia: 'GCash' | 'Kaliwaan (COD)' | 'Suki Credit';
// }

// types.ts

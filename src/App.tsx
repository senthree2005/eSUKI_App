/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, LiveVendor, CartItem, Order, SukiCustomer } from './types';
import {
  INITIAL_PRODUCTS,
  LIVE_VENDORS,
  STREET_FOOD_VENDORS,
  INITIAL_ORDERS,
  INITIAL_SUKI_CUSTOMERS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartModal } from './components/CartModal';
import { HomeScreen } from './components/HomeScreen';
import { LiveBroadcastScreen } from './components/LiveBroadcastScreen';
import { TinderaHubScreen } from './components/TinderaHubScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { SukiListahanScreen } from './components/SukiListahanScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [previousTab, setPreviousTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core App Data Stores
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [liveVendors, setLiveVendors] = useState<LiveVendor[]>(LIVE_VENDORS);
  const [selectedLiveVendorId, setSelectedLiveVendorId] = useState<string>('vendor-lorna');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [sukiCustomers, setSukiCustomers] = useState<SukiCustomer[]>(INITIAL_SUKI_CUSTOMERS);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, note = '') => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, note }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Instant Checkout & Order creation
  const handleCheckout = (orderData: {
    address: string;
    note: string;
    paymentMethod: 'COD' | 'GCash';
  }) => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const deliveryFee = subtotal >= 250 ? 0 : 30;
    const sukiDiscount = subtotal >= 200 ? 20 : 0;
    const total = Math.max(0, subtotal + deliveryFee - sukiDiscount);

    const newOrder: Order = {
      id: `${Math.floor(1044 + Math.random() * 900)}`,
      customerName: 'You (Suki Buyer)',
      customerAddress: orderData.address,
      items: [...cartItems],
      totalPrice: total,
      status: 'preparing',
      driver: {
        name: 'Tricycle Junjun',
        vehicle: 'Kawasaki Barako Sidecar (Plate #TM-429)',
        etaMinutes: 12,
        phone: '0917-882-4412',
      },
      specialInstructions: orderData.note,
      paymentMethod: orderData.paymentMethod,
      createdAt: 'Just now',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Quick order directly from Live stream
  const handleLiveQuickOrder = (product: Product, quantity: number, note: string) => {
    const subtotal = product.price * quantity;
    const deliveryFee = subtotal >= 250 ? 0 : 30;
    const discount = 20; // ₱20 live voucher
    const total = Math.max(0, subtotal + deliveryFee - discount);

    const newOrder: Order = {
      id: `${Math.floor(1044 + Math.random() * 900)}`,
      customerName: 'You (Live Suki)',
      customerAddress: 'Tagum Center, Purok 4 Magugpo Poblacion',
      items: [{ product, quantity, note }],
      totalPrice: total,
      status: 'preparing',
      driver: {
        name: 'Tricycle Junjun',
        vehicle: 'Kawasaki Barako Sidecar (Plate #TM-429)',
        etaMinutes: 10,
        phone: '0917-882-4412',
      },
      specialInstructions: note,
      paymentMethod: 'COD',
      createdAt: 'Just now',
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  // Open live stream
  const handleOpenLiveStream = (vendorId = 'vendor-lorna') => {
    setSelectedLiveVendorId(vendorId);
    setPreviousTab(activeTab);
    setActiveTab('live-latag');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stock toggle handler (cycles IN STOCK -> LOW STOCK -> SOLD OUT)
  const handleToggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const nextState =
            prod.stockState === 'in'
              ? 'low'
              : prod.stockState === 'low'
              ? 'sold'
              : 'in';
          return {
            ...prod,
            stockState: nextState,
            stockRemaining:
              nextState === 'in'
                ? '8 kg remaining'
                : nextState === 'low'
                ? '2 kg remaining'
                : 'Sold out for today',
          };
        }
        return prod;
      })
    );
  };

  // Add new product from Tindera Hub
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Update order status (preparing -> ready -> delivering -> delivered)
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Suki Ledger updates
  const handleAddSuki = (customer: SukiCustomer) => {
    setSukiCustomers((prev) => [customer, ...prev]);
  };

  const handleUpdateBalance = (customerId: string, newBalance: number) => {
    setSukiCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, outstandingBalance: newBalance } : c
      )
    );
  };

  const activeVendor =
    liveVendors.find((v) => v.id === selectedLiveVendorId) || liveVendors[0];

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'preparing' || o.status === 'ready'
  ).length;

  return (
    <div className="min-h-screen bg-[#f3fcf2] text-[#161d18] flex flex-col antialiased">
      {/* Show Standard Palengke Header on tabs other than full-screen Live broadcast */}
      {activeTab === 'home' && (
        <Header
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
          onSelectTab={(tab) => {
            setPreviousTab(activeTab);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full ${
         ( activeTab === 'live-latag' || activeTab === 'profile-tinderas'
          || activeTab === 'suki-listahan' || activeTab === 'orders'
         )? 'pt-10' : 'pt-28'
        }`}
      >
        {activeTab === 'home' && (
          <HomeScreen
            products={products}
            liveVendors={liveVendors}
            streetFoodVendors={STREET_FOOD_VENDORS}
            onOpenLiveStream={handleOpenLiveStream}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'live-latag' && (
          <LiveBroadcastScreen
            vendor={activeVendor}
            onBack={() => {
              setActiveTab(previousTab === 'live-latag' ? 'home' : previousTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickOrder={handleLiveQuickOrder}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'profile-tinderas' && (
          <TinderaHubScreen
            products={products}
            orders={orders}
            onStartLiveStream={() => handleOpenLiveStream('vendor-lorna')}
            onOpenNotebook={() => {
              setPreviousTab(activeTab);
              setActiveTab('suki-listahan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onToggleStock={handleToggleStock}
            onAddProduct={handleAddProduct}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersScreen
            orders={orders}
            onOpenLiveStream={() => handleOpenLiveStream('vendor-lorna')}
            onReorder={(order) => {
              if (order.items[0]) {
                handleAddToCart(order.items[0].product, order.items[0].quantity);
                setIsCartOpen(true);
              }
            }}
          />
        )}

        {activeTab === 'suki-listahan' && (
          <SukiListahanScreen
            sukiCustomers={sukiCustomers}
            onAddSuki={handleAddSuki}
            onUpdateBalance={handleUpdateBalance}
          />
        )}
      </main>

      {/* Persistent Bottom Tab Bar (shown on home, orders, listahan, tinderas) */}
      {activeTab !== 'live-latag' && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setPreviousTab(activeTab);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          pendingOrdersCount={pendingOrdersCount}
        />
      )}

      {/* Cart & Instant Checkout Sheet */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={(orderData) => {
          handleCheckout(orderData);
          setPreviousTab(activeTab);
          setActiveTab('orders');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

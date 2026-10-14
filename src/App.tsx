/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { act, useState } from 'react';
import { Product, LiveVendor, CartItem, Order, SukiCustomer, Customer,Driver, Vendor } from './types';
import {
  mockProducts,
  mockLiveVendors,
  mockOrders,
  mockDrivers,
  mockVendors,
  mockCartItems,
  mockSukiCustomers,
  mockCustomers,
} from './data/mockDataTest';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartModal } from './components/CartModal';
import { HomeScreen } from './components/HomeScreen';
import { LiveBroadcastScreen } from './components/LiveBroadcastScreen';
import { TinderaHubScreen } from './components/TinderaHubScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { SukiListahanScreen } from './components/SukiListahanScreen';
import { AuthScreen } from './components/Authentication';
import  {AccountUser}  from './components/user_page/AccountUser'
import { ItemDetails } from './components/item_page/ItemDetails';

export default function App() {
  // const [activeTab, setActiveTab] = useState<string>('home');
  // const [previousTab, setPreviousTab] = useState<string>('home');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [previousTab, setPreviousTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  // Core App Data Stores
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomer] = useState<Customer[]>(mockCustomers);
  const [liveVendors, setLiveVendors] = useState<LiveVendor[]>(mockLiveVendors);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [selectedLiveVendorId, setSelectedLiveVendorId] = useState<string>('vendor-lorna');
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [sukiCustomers, setSukiCustomers] = useState<SukiCustomer[]>(mockSukiCustomers);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; phone: string; method: string } | null>(null);



  const handleSuccessLogin = (user: { name: string; phone: string; method: string }) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setActiveTab('home');
  };

  const findCartProduct = (productId: string): Product | undefined => {
    return products.find((product) => product.id === productId);
  };
  const findCustomer = (customerId: string): Customer | undefined => {
    return customers.find((customer) => customer.id === customerId);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, note = '') => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
    
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                note: note || item.note,
                updatedAt: new Date().toISOString(),
              }
            : item
        );
      }
    
      return [
        ...prev,
        {
          id: `${Math.floor(1044 + Math.random() * 900)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          customerId: customers[0].id,
          productId: product.id,
          quantity,
          note,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Instant Checkout & Order creation
  const handleCheckout = (orderData: {
    address: string;
    note: string;
    paymentMethod: 'COD' | 'GCash';
  }) => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce(
      (sum, item) => sum + (findCartProduct(item.productId)?.price ?? 0) * item.quantity,
      0
    );
    const deliveryFee = subtotal >= 250 ? 0 : 30;
    const sukiDiscount = subtotal >= 200 ? 20 : 0;
    const total = Math.max(0, subtotal + deliveryFee - sukiDiscount);

    const newOrder: Order = {
      id: `${Math.floor(1044 + Math.random() * 900)}`,
      customerId: '#124532',
      customerAddress: orderData.address,
      orders: [...cartItems],
      totalPrice: total,
      status: 'preparing',
      driverId: '#42141',
      specialInstructions: orderData.note,
      paymentMethod: orderData.paymentMethod,
      createdAt: 'Just now',
      updatedAt: 'Just now'
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
    const customers_id = customers[0].id;
    const product_id = product.id;
    const newOrder: Order = {
      id: `${Math.floor(1044 + Math.random() * 900)}`,
      customerId: '#2344',
      customerAddress: 'Tagum Center, Purok 4 Magugpo Poblacion',
      orders: [{
        id: `${Date.now()}`,
        customerId: customers[0].id,
        productId: product.id,
        quantity,
        note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },],
      totalPrice: total,
      status: 'preparing',
      driverId: '#432',
      specialInstructions: note,
      paymentMethod: 'COD',
      createdAt: 'Just now',
      updatedAt: 'Just now',
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
            prod.stockState === 'in_stock'
              ? 'low_stock'
              : prod.stockState === 'low_stock'
              ? 'out_of_stock'
              : 'in_stock';
          return {
            ...prod,
            stockState: nextState,
            stockRemaining:
              nextState === 'in_stock'
                ? '8 kg remaining'
                : nextState === 'low_stock'
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


  // Full Product Update Handler
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Dedicated Price Editing Handler
  const handleUpdateProductPrice = (
    productId: string,
    newPrice: number,
    originalPrice?: number,
    isLiveSpecial?: boolean
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            price: newPrice,
            originalPrice: originalPrice !== undefined ? originalPrice : p.originalPrice,
            isLiveSpecial: isLiveSpecial !== undefined ? isLiveSpecial : p.isLiveSpecial,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );
  };



  // Delete Product Handler
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-[#f3fcf2] text-[#161d18] flex flex-col antialiased">
      {/* Show Standard Palengke Header on tabs other than full-screen Live broadcast */}
      {(activeTab === 'home' || activeTab === 'item') && (
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
          || activeTab ==='auth' || activeTab === 'account'
         )? 'pt-5' : 'pt-28'
        }`}
      >
        {activeTab === 'home' && (
          <HomeScreen
            products={products}
            liveVendors={liveVendors}
            onOpenLiveStream={handleOpenLiveStream}
            onSelectProduct={setSelectedProduct}
            onSelectTab={(tab) => {
              setPreviousTab(activeTab);
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
          />
        )}
        {activeTab === 'item' && selectedProduct && (
          <ItemDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onOpenLiveStream={handleOpenLiveStream}
          />
        )}

        {activeTab === 'auth' && (
          <AuthScreen
                  onSuccessLogin={handleSuccessLogin}
                  onExploreAsGuest={() => setActiveTab('home')}
          />
        )
        }

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

        {activeTab === 'account' && (
          <AccountUser
            onSelectTab={(tab) =>{
              setPreviousTab(activeTab);
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            }
          />
        )}

        {activeTab === 'profile-tinderas' && (
          <TinderaHubScreen
            products={products}
            orders={orders}
            drivers={drivers}
            onStartLiveStream={() => handleOpenLiveStream('vendor-lorna')}
            onOpenNotebook={() => {
              setPreviousTab(activeTab);
              setActiveTab('suki-listahan');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onToggleStock={handleToggleStock}
            onAddProduct={handleAddProduct}
            onUpdateProductPrice={handleUpdateProductPrice}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersScreen
            orders={orders}
            onOpenLiveStream={() => handleOpenLiveStream('vendor-lorna')}
            onReorder={(order) => {
              const firstItem = order.orders[0];

              if (firstItem) {
                const product = findCartProduct(firstItem.productId);
              
                if (product) {
                  handleAddToCart(product, firstItem.quantity);
                  setIsCartOpen(true);
                }
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
      {(activeTab !== 'live-latag' && activeTab !== 'auth' && activeTab !== 'account') && (
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

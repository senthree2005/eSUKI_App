import React, { useState } from 'react';
import { ScreenHeader } from './ScreenHeader';
import { UserProfileCard } from './UserProfileCard';
import { SukiDailyBonusCard } from './SukiDailyBonusCard';
import { CurrentDeliveryCard } from './CurrentDeliveryCard';
import { FavoriteVendorsSection } from './FavoriteVendorsSection';
import { DirectMarketGuarantee } from './DirectMarketGuarantee';
import { SettingsFooter } from './SettingsFooter';
import { LiveLatagModal } from './LiveLatagModal';
import { LiveTrackingModal } from './LiveTrackingModal';
import { SukiLedgerModal } from './SukiLedgerModal';
import { OrderStallModal } from './OrderStallModal';
import { MyOrdersModal } from './MyOrdersModal';
import { TricycleContactModal } from './TricycleContactModal';
import { ChatVendorModal } from './ChatVendorModal';
import { BasketDrawerModal } from './BasketDrawerModal';
import { AccountSettingsModal } from './AccountSettingsModal';
import { Toast } from './Toast';

import {
  currentUser as initialUser,
  currentDeliveryData as initialDelivery,
  favoriteVendorsData,
  sukiRecordsData as initialSukiRecords,
} from '../../data/mockData_account';
import { Vendor, BasketItem } from '../../types';


interface AccountUserProps {
  onSelectTab: (tab: string) => void;
}


export const AccountUser: React.FC<AccountUserProps> = ({
  onSelectTab
}) => {
  const [user, setUser] = useState(initialUser);
  const [currentDelivery, setCurrentDelivery] = useState(initialDelivery);
  const [sukiRecords, setSukiRecords] = useState(initialSukiRecords);
  const [basketItems, setBasketItems] = useState<BasketItem[]>(initialDelivery.items);
  const [alertedVendors, setAlertedVendors] = useState<Set<string>>(new Set());
  const [hasTipped, setHasTipped] = useState(false);

  // Active view / modal states
  const [activeModal, setActiveModal] = useState<
    | null
    | 'live_stream'
    | 'live_tracking'
    | 'suki_ledger'
    | 'my_orders'
    | 'order_stall'
    | 'contact_rider'
    | 'chat_vendor'
    | 'basket'
    | 'account_settings'
  >(null);

  const [selectedVendor, setSelectedVendor] = useState<Vendor>(favoriteVendorsData[0]);
  const [toast, setToast] = useState<{ message: string; subMessage?: string } | null>(null);

  const showToast = (message: string, subMessage?: string) => {
    setToast({ message, subMessage });
  };

  // Handlers
  const handleWatchLive = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setActiveModal('live_stream');
  };

  const handleOrderVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setActiveModal('order_stall');
  };

  const handleChatVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setActiveModal('chat_vendor');
  };

  const handleAlertVendor = (vendor: Vendor) => {
    setAlertedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(vendor.id)) {
        next.delete(vendor.id);
        showToast(`Alert cancelled for ${vendor.name}`);
      } else {
        next.add(vendor.id);
        showToast(
          `Alert set for ${vendor.name}!`,
          'We will notify you at 3:00 PM when the charcoal grill starts smoking!'
        );
      }
      return next;
    });
  };

  const handleTipRider = (amount: number = 20) => {
    setHasTipped(true);
    showToast(
      `Tipped Manong Junjun ₱${amount}!`,
      '"Salamat kaayo Ma\'am Maria! Mag-amping ko sa inyong isda."'
    );
  };

  const handleAddProductFromLiveOrStall = (item: {
    name: string;
    price: number;
    quantity: number;
    unit: string;
    vendorName: string;
  }) => {
    const newItem: BasketItem = {
      id: `basket-item-${Date.now()}`,
      name: item.name,
      vendorName: item.vendorName,
      stallNumber: '#14',
      category: 'Market',
      price: item.price,
      unit: item.unit,
      quantity: item.quantity,
      packed: true,
      thumbnailUrl: selectedVendor.avatarUrl,
    };

    setBasketItems((prev) => [...prev, newItem]);
    showToast(
      `Added to Palengke Basket!`,
      `${item.name} from ${item.vendorName} (₱${item.price.toFixed(2)})`
    );
  };

  const handleRemoveBasketItem = (id: string) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from basket');
  };

  const handleCheckoutBasket = () => {
    setActiveModal(null);
    showToast(
      'Palengke Order Placed! 🎉',
      'Manong Junjun has been dispatched to Tagum Public Market for consolidated pickup!'
    );
  };

  const handleUpdateSukiNotes = (vendorId: string, note: string) => {
    setSukiRecords((prev) =>
      prev.map((r) => (r.vendorId === vendorId ? { ...r, sukiNotes: note } : r))
    );
    showToast('Suki Preference Saved!', 'Ate Lorna will see your note on future orders.');
  };

  const handleSaveLocation = (newLoc: string) => {
    setUser((prev) => ({ ...prev, location: newLoc }));
    showToast('Delivery Address Updated', newLoc);
  };

  const handleLogout = () => {
    showToast('Session Active', 'You are signed in as Maria Santos (Tagum City Suki)');
  };

  return (
    <div className="min-h-screen bg-[#f3fcf2] text-[#161d18] flex flex-col justify-start">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          subMessage={toast.subMessage}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Container - Centered Mobile App Shell (375px–430px) */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-[#f3fcf2] shadow-sm">
        {/* Top App Bar with back navigation and basket counter */}
        <ScreenHeader
          // onBack={() => {
          //   if (activeModal) {
          //     setActiveModal(null);
          //   } else {
          //     showToast('Palengke Fresh', 'You are viewing your active orders & favorite stalls.');
          //   }
          // }}
          onSelectTab={onSelectTab}
          basketCount={basketItems.length}
          onOpenBasket={() => setActiveModal('basket')}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 px-4 py-2 space-y-4">
          {/* User Profile Card */}
          <UserProfileCard
            user={user}
            activeView={
              activeModal === 'my_orders'
                ? 'orders'
                : activeModal === 'suki_ledger'
                ? 'ledger'
                : 'main'
            }
            onSelectOrders={() => setActiveModal('my_orders')}
            onSelectLedger={() => setActiveModal('suki_ledger')}
            onSelectVendors={() => {
              // Smooth scroll to favorite vendors section
              document.getElementById('favorite-vendors-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Suki Daily Bonus! Card */}
          <SukiDailyBonusCard
            onBonusClaimed={() => {
              showToast(
                'Suki Daily Perk Confirmed! 🎁',
                'Free fresh spices and 4 pcs native calamansi included in Basket #1042.'
              );
            }}
          />

          {/* Current Delivery Section */}
          <CurrentDeliveryCard
            delivery={currentDelivery}
            onTrack={() => setActiveModal('live_tracking')}
            onContact={() => setActiveModal('contact_rider')}
            onTip={() => handleTipRider(20)}
            hasTipped={hasTipped}
          />

          {/* Favorite Vendors Section */}
          <div id="favorite-vendors-section">
            <FavoriteVendorsSection
              vendors={favoriteVendorsData}
              onWatchLive={handleWatchLive}
              onOrderVendor={handleOrderVendor}
              onAlertVendor={handleAlertVendor}
              onChatVendor={handleChatVendor}
              alertedVendors={alertedVendors}
            />
          </div>

          {/* Direct Market Guarantee */}
          <DirectMarketGuarantee />

          {/* Settings & Logout Footer */}
          <SettingsFooter
            onOpenSettings={() => setActiveModal('account_settings')}
            onSelectTab={onSelectTab}
          />
        </main>
      </div>

      {/* Modals & Screens */}
      {activeModal === 'live_stream' && (
        <LiveLatagModal
          vendor={selectedVendor}
          onClose={() => setActiveModal(null)}
          onAddProduct={handleAddProductFromLiveOrStall}
        />
      )}

      {activeModal === 'live_tracking' && (
        <LiveTrackingModal
          rider={currentDelivery.rider}
          items={currentDelivery.items}
          basketId={currentDelivery.basketId}
          onClose={() => setActiveModal(null)}
          onContact={() => {
            setActiveModal('contact_rider');
          }}
          onTip={handleTipRider}
          hasTipped={hasTipped}
        />
      )}

      {activeModal === 'suki_ledger' && (
        <SukiLedgerModal
          records={sukiRecords}
          onClose={() => setActiveModal(null)}
          onUpdateNotes={handleUpdateSukiNotes}
        />
      )}

      {activeModal === 'my_orders' && (
        <MyOrdersModal
          currentDelivery={currentDelivery}
          onClose={() => setActiveModal(null)}
          onTrackCurrent={() => setActiveModal('live_tracking')}
          onReorder={(orderId) => {
            showToast(`Reordered items from Order ${orderId}! Added to basket.`);
          }}
        />
      )}

      {activeModal === 'order_stall' && (
        <OrderStallModal
          vendor={selectedVendor}
          onClose={() => setActiveModal(null)}
          onAddToBasket={handleAddProductFromLiveOrStall}
        />
      )}

      {activeModal === 'contact_rider' && (
        <TricycleContactModal
          rider={currentDelivery.rider}
          onClose={() => setActiveModal(null)}
          onSendMessage={(msg) => {
            showToast('Message Sent to Manong Junjun', msg);
          }}
        />
      )}

      {activeModal === 'chat_vendor' && (
        <ChatVendorModal
          vendor={selectedVendor}
          onClose={() => setActiveModal(null)}
          onSendMessage={(msg) => {
            showToast(`Message Sent to ${selectedVendor.name}`, msg);
          }}
        />
      )}

      {activeModal === 'basket' && (
        <BasketDrawerModal
          items={basketItems}
          onClose={() => setActiveModal(null)}
          onRemoveItem={handleRemoveBasketItem}
          onCheckout={handleCheckoutBasket}
        />
      )}

      {activeModal === 'account_settings' && (
        <AccountSettingsModal
          user={user}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveLocation}
        />
      )}
    </div>
  );
}

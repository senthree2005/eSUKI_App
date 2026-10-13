import React, { useState,useEffect } from 'react';
import { Driver, Order } from '../types';
import {findDriverById, findProductById} from '../data/mockDataTest';

interface OrdersScreenProps {
  orders: Order[];
  onOpenLiveStream: () => void;
  onReorder: (order: Order) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onOpenLiveStream,
  onReorder,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [callToast, setCallToast] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<Driver>();

  const activeOrders = orders.filter(
    (o) => o.status === 'preparing' || o.status === 'ready' || o.status === 'delivering'
  );

  const completedOrders = orders.filter((o) => o.status === 'delivered');

  const getStepProgress = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 1;
      case 'ready':
        return 2;
      case 'delivering':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 max-w-lg mx-auto">
      {/* Screen Header */}
      <div className="px-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-extrabold text-[20px] text-[#161d18]">
              Palengke Orders &amp; Dispatch
            </h1>
            <p className="text-[11px] text-[#707971]">
              Live status gikan sa Tagum Public Market stalls
            </p>
          </div>
          <span className="w-9 h-9 rounded-full bg-[#004328] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]">electric_rickshaw</span>
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#edf6ec] p-1 rounded-xl mt-3 border border-[#bfc9c0]/30">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
              activeTab === 'active'
                ? 'bg-white text-[#004328] shadow-xs'
                : 'text-[#707971]'
            }`}
          >
            Active Drivers ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-white text-[#004328] shadow-xs'
                : 'text-[#707971]'
            }`}
          >
            Previous Orders ({completedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 space-y-3">
        {activeTab === 'active' ? (
          activeOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl p-6 border border-[#e2ebe1] space-y-3">
              <span className="material-symbols-outlined text-[#707971] text-[40px]">
                receipt_long
              </span>
              <h3 className="font-bold text-[15px] text-[#161d18]">
                Wala pay nagdagan nga delivery
              </h3>
              <p className="text-[12px] text-[#404942]">
                Tan-awa ang mga tindera sa Live Latag o pagpili gikan sa mga preskong tinda sa palengke.
              </p>
              <button
                onClick={onOpenLiveStream}
                className="mt-2 px-4 py-2 bg-[#004328] text-white rounded-xl text-[12px] font-bold inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">videocam</span>
                <span>Tan-aw ug Live Latag</span>
              </button>
            </div>
          ) : (
            activeOrders.map((order) => {
              const currentStep = getStepProgress(order.status);
              useEffect(() => {
                  if (order.driverId) {
                      setDrivers(findDriverById(order.driverId));
                  }
              }, [order.driverId]);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2ebe1] space-y-3"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[15px] text-[#161d18]">
                          Order #{order.id}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#ffdea9] text-[#6d4c00] text-[10px] font-extrabold uppercase">
                          {order.status === 'delivering'
                            ? 'On Tricycle'
                            : order.status === 'ready'
                            ? 'Ready for Driver'
                            : 'Preparing'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#707971] block mt-0.5">
                        {order.customerAddress}
                      </span>
                    </div>
                    <span className="font-extrabold text-[16px] text-[#004328]">
                      ₱{order.totalPrice}
                    </span>
                  </div>

                  {/* Visual Step Progress Tracker */}
                  <div className="py-1">
                    <div className="grid grid-cols-4 gap-1 text-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                            currentStep >= 1
                              ? 'bg-[#004328] text-white'
                              : 'bg-[#edf6ec] text-[#707971]'
                          }`}
                        >
                          ✓
                        </div>
                        <span className="text-[9px] font-bold text-[#161d18] mt-1">
                          Placed
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                            currentStep >= 2
                              ? 'bg-[#004328] text-white'
                              : 'bg-[#edf6ec] text-[#707971]'
                          }`}
                        >
                          {currentStep >= 2 ? '✓' : '2'}
                        </div>
                        <span className="text-[9px] font-bold text-[#161d18] mt-1">
                          Timbang
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                            currentStep >= 3
                              ? 'bg-[#febb2d] text-[#271900] animate-bounce'
                              : 'bg-[#edf6ec] text-[#707971]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            two_wheeler
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-[#161d18] mt-1">
                          Tricycle
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${
                            currentStep >= 4
                              ? 'bg-[#004328] text-white'
                              : 'bg-[#edf6ec] text-[#707971]'
                          }`}
                        >
                          4
                        </div>
                        <span className="text-[9px] font-bold text-[#707971] mt-1">
                          Abot
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="bg-[#edf6ec] p-2.5 rounded-xl space-y-1.5">
                    {order.orders.map((it, idx) => 
                    {
                      const product = findProductById(it.productId)
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[12px]"
                      >
                        <span className="font-bold text-[#161d18]">
                          {it.quantity} {product?.unit} {product?.name}
                        </span>
                        <span className="text-[#004328] font-bold">
                          ₱{((product?.price?? 0) * it.quantity).toFixed(0)}
                        </span>
                      </div>
                    )})}
                    {order.specialInstructions && (
                      <p className="text-[11px] text-[#711700] italic pt-1 border-t border-[#bfc9c0]/30">
                        Bilin: “{order.specialInstructions}”
                      </p>
                    )}
                  </div>

                  {/* Driver Card & Action */}
                  <div className="p-3 bg-[#f3fcf2] rounded-xl flex items-center justify-between border border-[#bfc9c0]/40">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#004328] flex items-center justify-center text-white shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          electric_rickshaw
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[13px] text-[#161d18]">
                          {drivers?.name}
                        </h4>
                        <span className="text-[10px] text-[#707971] block">
                          {drivers?.vehicle}
                          {/* • ETA {drivers?.etaMinutes} mins */}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCallToast(`Connecting tawag kang ${drivers?.name} (${drivers?.phone})...`);
                        setTimeout(() => setCallToast(null), 2500);
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-[#edf6ec] text-[#004328] border border-[#bfc9c0]/50 rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Call</span>
                    </button>
                  </div>
                </div>
              );
            })
          )
        ) : (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e2ebe1] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[14px]">Order #1038</span>
                <span className="text-[11px] text-[#226b47] font-bold">Delivered Kahapon</span>
              </div>
              <p className="text-[12px] text-[#404942]">
                1.5 kg Dagko nga Bangus + 1 bundle Kangkong
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#e2ebe1]">
                <span className="font-extrabold text-[14px] text-[#004328]">₱290</span>
                <button
                  onClick={() => {
                    setCallToast('Order added back to your Suki Basket!');
                    setTimeout(() => setCallToast(null), 2000);
                  }}
                  className="px-3 py-1 bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#004328] rounded-lg text-[11px] font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">replay</span>
                  <span>Order Again</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {callToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom max-w-md mx-auto">
          <div className="bg-[#004328] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#a9f3c5]/30">
            <span className="material-symbols-outlined text-[#a9f3c5] text-[20px]">call</span>
            <span className="text-[12px] font-bold">{callToast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

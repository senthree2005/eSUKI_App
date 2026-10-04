import React from 'react';
import { X, Receipt, CheckCircle2, Clock, ChevronRight, Repeat, ArrowRight } from 'lucide-react';
import { CurrentDelivery } from '../types';

interface MyOrdersModalProps {
  currentDelivery: CurrentDelivery;
  onClose: () => void;
  onTrackCurrent: () => void;
  onReorder: (orderName: string) => void;
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  currentDelivery,
  onClose,
  onTrackCurrent,
  onReorder,
}) => {
  const pastOrders = [
    {
      id: '#1039',
      date: 'Yesterday, 10:15 AM',
      items: '1kg Yellowfin Tuna (Ate Lorna) • 5kg Sinandomeng Rice (Nanay Cora)',
      total: 680.00,
      status: 'Delivered',
      rider: 'Manong Junjun (TODA #112)',
    },
    {
      id: '#1034',
      date: 'Sep 28, 2026, 4:45 PM',
      items: '10 Sticks Pork BBQ & 1 Platter Tusok-Tusok (Kuya Joms)',
      total: 300.00,
      status: 'Delivered',
      rider: 'Kuya Arnel (TODA #45)',
    },
    {
      id: '#1028',
      date: 'Sep 24, 2026, 8:20 AM',
      items: '3 bundles Kangkong, 1kg Talong, 2 boxes Pomelo (Mang Toring & Aling Beth)',
      total: 545.00,
      status: 'Delivered',
      rider: 'Manong Junjun (TODA #112)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#004328] text-white flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#161d18]">
                Maria's Palengke Orders
              </h3>
              <p className="text-[11px] text-[#707971]">
                Tagum City Central Public Market Deliveries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Active Delivery Highlight */}
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-[#0d5c3a] uppercase tracking-wider">
              Active In-Transit Order
            </span>
            <div className="bg-white rounded-2xl p-4 border-2 border-[#0d5c3a] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#161d18]">
                    Palengke Basket {currentDelivery.basketId}
                  </h4>
                  <span className="bg-[#a9f3c5] text-[#005232] font-bold text-[10px] px-2 py-0.5 rounded-full">
                    {currentDelivery.status}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-[#004328]">
                  ₱{currentDelivery.totalPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-[#404942]">
                {currentDelivery.items.map((i) => i.name).join(' + ')}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#e2ebe1] text-xs">
                <span className="text-[#707971]">
                  Rider: {currentDelivery.rider.name} ({currentDelivery.rider.todaAssociation})
                </span>
                <button
                  onClick={onTrackCurrent}
                  className="font-bold text-[#0d5c3a] hover:underline flex items-center gap-1"
                >
                  <span>Track Live</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Past Completed Orders */}
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-[#707971] uppercase tracking-wider">
              Past Market Deliveries
            </span>

            <div className="space-y-2.5">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#e2ebe1] shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#161d18]">
                        Order {order.id}
                      </h4>
                      <p className="text-[11px] text-[#707971]">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#161d18]">
                        ₱{order.total.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-[#005232] text-[10px] font-semibold justify-end">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{order.status}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#404942] leading-snug">
                    {order.items}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f0f5f0] text-xs">
                    <span className="text-[10px] text-[#707971]">
                      {order.rider}
                    </span>
                    <button
                      onClick={() => onReorder(order.id)}
                      className="text-[#0d5c3a] font-bold text-[11px] hover:underline flex items-center gap-1"
                    >
                      <Repeat className="w-3 h-3" />
                      <span>Reorder Items</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

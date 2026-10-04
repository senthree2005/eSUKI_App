import React from 'react';
import { X, Trash2, ShoppingBag, Bike, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { BasketItem } from '../types';

interface BasketDrawerModalProps {
  items: BasketItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const BasketDrawerModal: React.FC<BasketDrawerModalProps> = ({
  items,
  onClose,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = items.reduce((acc, curr) => acc + curr.price, 0);
  const deliveryFee = 25.00; // Tagum TODA Tricycle standard rate
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#004328] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#161d18]">
                Palengke Basket
              </h3>
              <p className="text-[11px] text-[#707971]">
                Combined multi-stall market checkout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-2 text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-gray-400" />
              <p className="text-sm font-semibold">Your Palengke Basket is empty</p>
              <p className="text-xs">Browse stalls or watch Live Latag to add fresh items!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-[#e2ebe1] shadow-2xs flex items-center justify-between gap-3"
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#dce5db] shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=120&q=80';
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#161d18] truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#707971]">
                    {item.vendorName} • {item.category}
                  </p>
                  <p className="text-xs font-extrabold text-[#004328] mt-0.5">
                    ₱{item.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="w-8 h-8 rounded-lg text-gray-400 hover:text-[#ba1a1a] hover:bg-[#ffdad6]/20 flex items-center justify-center transition-colors shrink-0"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}

          {/* Suki Daily Bonus Applied Banner */}
          <div className="bg-[#ffdea9]/70 rounded-2xl p-3 border border-[#febb2d] flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-[#7d5800] shrink-0" />
            <div className="text-xs text-[#3c2500]">
              <span className="font-bold">Suki Bonus Active: </span>
              <span>Free native spices & 4 pcs calamansi from Ate Lorna</span>
            </div>
          </div>

          {/* Direct Market Guarantee */}
          <div className="flex items-center gap-2 text-xs text-[#005232] bg-[#edf6ec] p-2.5 rounded-xl border border-[#dce5db]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Multi-stall pickup fee consolidated to a single tricycle ride.</span>
          </div>
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#e2ebe1] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#404942]">
                <span>Market Items Subtotal</span>
                <span className="font-semibold text-[#161d18]">₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#404942]">
                <span className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-[#0d5c3a]" />
                  <span>Tagum TODA Tricycle Delivery</span>
                </span>
                <span className="font-semibold text-[#161d18]">₱{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#161d18] pt-1 border-t border-[#e2ebe1]">
                <span>Total Amount (COD / GCash)</span>
                <span className="text-[#004328] text-base font-extrabold">₱{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-[#004328] hover:bg-[#0d5c3a] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <span>Confirm & Send Tricycle to Market</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Check, Compass, Phone, Bike, Navigation } from 'lucide-react';
import { CurrentDelivery } from '../types';

interface CurrentDeliveryCardProps {
  delivery: CurrentDelivery;
  onTrack: () => void;
  onContact: () => void;
  onTip: () => void;
  hasTipped?: boolean;
}

export const CurrentDeliveryCard: React.FC<CurrentDeliveryCardProps> = ({
  delivery,
  onTrack,
  onContact,
  onTip,
  hasTipped = false,
}) => {
  return (
    <section className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d5c3a] inline-block animate-pulse" />
          <h2 className="font-serif text-lg font-bold text-[#161d18] tracking-tight">
            Current Delivery
          </h2>
        </div>
        <button
          onClick={onTrack}
          className="text-[#0d5c3a] font-extrabold text-[11px] tracking-wider uppercase hover:underline transition-colors focus:outline-none flex items-center gap-1"
        >
          <span>LIVE TRACKING</span>
          <Navigation className="w-3 h-3 text-[#0d5c3a]" />
        </button>
      </div>

      {/* Main Delivery Card */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-1px_rgba(13,92,58,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] border border-[#e8f0e7] space-y-3.5">
        {/* Card Header */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#161d18]">
                Palengke Basket {delivery.basketId}
              </h3>
              <span className="bg-[#a9f3c5] text-[#005232] font-bold text-[11px] px-2.5 py-0.5 rounded-full tracking-tight">
                {delivery.status}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[#004328] font-extrabold text-lg tabular-nums">
                ₱{delivery.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#707971] mt-0.5">
            Combined delivery from {delivery.stallsCount} market stalls
          </p>
        </div>

        {/* Packed Items List */}
        <div className="space-y-2">
          {delivery.items.map((item) => (
            <div
              key={item.id}
              className="bg-[#edf6ec]/75 hover:bg-[#edf6ec] transition-colors rounded-xl p-2.5 flex items-center justify-between border border-[#e2ebe1]/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.thumbnailUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover border border-[#bfc9c0] shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=120&q=80';
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#161d18] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#404942] truncate">
                    {item.vendorName} • {item.category}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 pl-2">
                <p className="text-sm font-bold text-[#161d18] tabular-nums">
                  ₱{item.price.toFixed(2)}
                </p>
                <div className="flex items-center justify-end gap-1 text-[#005232] text-xs font-semibold mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Packed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rider Sub-Card */}
        <div className="bg-[#edf6ec]/90 rounded-xl p-3 border border-[#e2ebe1] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={delivery.rider.avatarUrl}
                alt={delivery.rider.name}
                className="w-10 h-10 rounded-full object-cover border border-[#0d5c3a]/30 shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://ui-avatars.com/api/?name=Manong+Junjun&background=0d5c3a&color=fff';
                }}
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#161d18] truncate leading-tight">
                  {delivery.rider.name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-[#404942] mt-0.5">
                  <Bike className="w-3 h-3 text-[#0d5c3a] shrink-0" />
                  <span className="truncate">
                    {delivery.rider.todaAssociation} {delivery.rider.tricycleNumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="flex items-center justify-end gap-1 text-[#004328] font-bold text-xs">
                <Bike className="w-3.5 h-3.5 text-[#0d5c3a]" />
                <span>Estimated Delivery: {delivery.rider.estimatedDeliveryMins} mins</span>
              </div>
              <p className="text-[11px] text-[#707971]">
                ({delivery.rider.currentLocationName})
              </p>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={onTrack}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white hover:bg-[#e2ebe1] border border-[#dce5db] text-xs font-semibold text-[#161d18] transition-all active:scale-95 shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#0d5c3a]" />
              <span>Track</span>
            </button>

            <button
              onClick={onContact}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-white hover:bg-[#e2ebe1] border border-[#dce5db] text-xs font-semibold text-[#161d18] transition-all active:scale-95 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#0d5c3a]" />
              <span>Contact</span>
            </button>

            <button
              onClick={onTip}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-2xs ${
                hasTipped
                  ? 'bg-[#a9f3c5] text-[#004328] border border-[#8ed6aa]'
                  : 'bg-[#ffdea9] hover:bg-[#febb2d] text-[#3c2500] border border-[#febb2d]'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-[#6d4c00]" />
              <span>{hasTipped ? 'Tipped ₱20 ✓' : 'Tip ₱20'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

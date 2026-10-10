import React, { useState } from 'react';
import { Heart, Video, MessageSquare, Store, Bell, Clock, Star } from 'lucide-react';
import { Vendor } from '../../types';

interface FavoriteVendorsSectionProps {
  vendors: Vendor[];
  onWatchLive: (vendor: Vendor) => void;
  onOrderVendor: (vendor: Vendor) => void;
  onAlertVendor: (vendor: Vendor) => void;
  onChatVendor: (vendor: Vendor) => void;
  alertedVendors?: Set<string>;
}

export const FavoriteVendorsSection: React.FC<FavoriteVendorsSectionProps> = ({
  vendors,
  onWatchLive,
  onOrderVendor,
  onAlertVendor,
  onChatVendor,
  alertedVendors = new Set(),
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayVendors = showAll ? vendors : vendors.slice(0, 3);

  return (
    <section className="space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 fill-[#0d5c3a] text-[#0d5c3a]" />
          <h2 className="font-serif text-lg font-bold text-[#161d18] tracking-tight">
            My Favorite Vendors
          </h2>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#0d5c3a] font-bold text-xs hover:underline focus:outline-none transition-colors"
        >
          {showAll ? 'Show Top 3' : `View All (${vendors.length})`}
        </button>
      </div>

      {/* Vendors Cards */}
      <div className="space-y-3">
        {displayVendors.map((vendor) => {
          if (vendor.id === 'vendor-1') {
            // Ate Lorna's Isdaan - Custom card with Live stream CTA
            return (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-1px_rgba(13,92,58,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] border border-[#e8f0e7] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={vendor.avatarUrl}
                      alt={vendor.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#a9f3c5] shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://ui-avatars.com/api/?name=Ate+Lorna&background=0d5c3a&color=fff';
                      }}
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[#161d18] truncate">
                        {vendor.name}
                      </h3>
                      <p className="text-xs text-[#707971] truncate">
                        {vendor.stallNumber} {vendor.marketSection} • {vendor.sukiDuration}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-[#711700] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>{vendor.statusText}</span>
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#271900] font-semibold">
                          <Star className="w-3.5 h-3.5 fill-[#febb2d] text-[#febb2d]" />
                          <span>
                            {vendor.rating} ({vendor.sukiCount} suki)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#711700] hover:bg-[#ffdad6]/40 transition-colors"
                    aria-label="Favorited"
                  >
                    <Heart className="w-4 h-4 fill-[#711700] text-[#711700]" />
                  </button>
                </div>

                {/* Live Watch Action Bar */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onWatchLive(vendor)}
                    className="flex-1 bg-[#711700] hover:bg-[#891e00] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Video className="w-4 h-4" />
                    <span>Watch Live Selling (Catch of the Day)</span>
                  </button>

                  <button
                    onClick={() => onChatVendor(vendor)}
                    className="w-10 h-10 rounded-xl bg-[#edf6ec] hover:bg-[#e2ebe1] border border-[#dce5db] flex items-center justify-center text-[#0d5c3a] transition-all active:scale-95 shrink-0"
                    aria-label={`Chat with ${vendor.name}`}
                    title="Send message to Ate Lorna"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          }

          // Other Vendors (Mang Toring, Kuya Joms, Aling Beth, etc.)
          const isAlerted = alertedVendors.has(vendor.id);

          return (
            <div
              key={vendor.id}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-1px_rgba(13,92,58,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] border border-[#e8f0e7] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={vendor.avatarUrl}
                  alt={vendor.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#dce5db] shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://ui-avatars.com/api/?name=Market+Vendor&background=0d5c3a&color=fff';
                  }}
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#161d18] truncate">
                    {vendor.name}
                  </h3>
                  <p className="text-xs text-[#707971] truncate">
                    {vendor.stallNumber} • {vendor.marketSection}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#404942] mt-0.5 font-medium">
                    {vendor.isOpen ? (
                      <span className="flex items-center gap-1 text-[#005232]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d5c3a] inline-block" />
                        <span>{vendor.statusText}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[#7d5800]">
                        <Clock className="w-3 h-3 text-[#7d5800]" />
                        <span>{vendor.statusText}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {vendor.actionType === 'order' ? (
                <button
                  onClick={() => onOrderVendor(vendor)}
                  className="flex flex-col items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-[#edf6ec] hover:bg-[#e2ebe1] border border-[#dce5db] text-[#0d5c3a] font-bold text-xs transition-all active:scale-95 shrink-0 shadow-2xs"
                >
                  <Store className="w-4 h-4" />
                  <span>Order</span>
                </button>
              ) : (
                <button
                  onClick={() => onAlertVendor(vendor)}
                  className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold transition-all active:scale-95 shrink-0 shadow-2xs ${
                    isAlerted
                      ? 'bg-[#ffdea9] border-[#febb2d] text-[#3c0800]'
                      : 'bg-[#edf6ec] hover:bg-[#e2ebe1] border-[#dce5db] text-[#404942]'
                  }`}
                >
                  <Bell className={`w-4 h-4 ${isAlerted ? 'text-[#e24a21] fill-[#e24a21]' : 'text-[#707971]'}`} />
                  <span className="whitespace-nowrap">{isAlerted ? 'Alert On' : 'Alert Me'}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

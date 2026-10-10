import React from 'react';
import { MapPin, Receipt, BookOpen, Heart } from 'lucide-react';
import { UserProfile } from '../../types';

interface UserProfileCardProps {
  user: UserProfile;
  activeView: 'orders' | 'ledger' | 'vendors' | 'main';
  onSelectOrders: () => void;
  onSelectLedger: () => void;
  onSelectVendors: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  activeView,
  onSelectOrders,
  onSelectLedger,
  onSelectVendors,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_-1px_rgba(13,92,58,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] border border-[#e8f0e7]">
      {/* Top Profile Header */}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#a9f3c5] shadow-xs"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback placeholder with initials if needed
              (e.currentTarget as HTMLImageElement).src =
                'https://ui-avatars.com/api/?name=Maria+Santos&background=0d5c3a&color=fff';
            }}
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0d5c3a] border-2 border-white rounded-full" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-[#161d18] tracking-tight truncate">
            {user.name}
          </h1>
          <div className="flex items-center gap-1 text-[#404942] text-xs mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-[#0d5c3a] shrink-0" />
            <span className="truncate">{user.location}</span>
          </div>
        </div>
      </div>

      {/* Button Row */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onSelectOrders}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] ${
            activeView === 'orders'
              ? 'bg-[#004328] text-white shadow-sm ring-2 ring-[#004328]/30'
              : 'bg-[#004328] text-white hover:bg-[#0d5c3a]'
          }`}
        >
          <Receipt className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">My Orders</span>
        </button>

        <button
          onClick={onSelectLedger}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] ${
            activeView === 'ledger'
              ? 'bg-[#0d5c3a] text-white shadow-sm'
              : 'bg-[#edf6ec] text-[#161d18] hover:bg-[#e2ebe1] border border-[#e2ebe1]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#0d5c3a] shrink-0" />
          <span className="whitespace-nowrap">Suki Ledger</span>
        </button>

        <button
          onClick={onSelectVendors}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all active:scale-[0.97] ${
            activeView === 'vendors'
              ? 'bg-[#0d5c3a] text-white shadow-sm'
              : 'bg-[#edf6ec] text-[#161d18] hover:bg-[#e2ebe1] border border-[#e2ebe1]'
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-[#711700] shrink-0 fill-[#711700]/20" />
          <span className="whitespace-nowrap">Vendors ({user.favoriteVendorsCount})</span>
        </button>
      </div>
    </div>
  );
};

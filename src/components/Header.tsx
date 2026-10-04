import React, { useState } from 'react';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
  onSelectTab: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  cartCount,
  onSelectTab,
  searchQuery,
  onSearchChange,
}) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Tagum Public Market, Davao del Norte');
  const [showNotifications, setShowNotifications] = useState(false);

  const marketSpots = [
    'Tagum Public Market, Davao del Norte',
    'Mankilam Commercial Center, Tagum City',
    'Apokon Wet Section, Tagum City',
    'San Miguel Highway, Tagum City',
    'Magugpo Poblacion, Tagum City'
  ];

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f3fcf2]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e2ebe1]">
      <div className="h-28 px-4 flex flex-col justify-center gap-1.5 max-w-lg mx-auto">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <img src="/src/img/logo1.png" className="h-[35px] w-[35px]" alt="" />
            <div className="flex flex-col relative">
              {/* <span className="text-[10px] font-extrabold text-[#7d5800] tracking-wider">
                
              </span> */}
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1 text-left group rounded-full shadow-sm px-2 py-1 hover:bg-[#e8f5e6]"
              >
                <span className="text-[13px] font-bold text-[#161d18] line-clamp-1 group-hover:text-[#004328] transition-colors">
                  {selectedLocation}
                </span>
                <span className="material-symbols-outlined text-[#004328] text-[18px]">
                  expand_more
                </span>
              </button>

              {showLocationDropdown && (
                <div className="absolute top-10 left-0 bg-white rounded-xl shadow-xl border border-[#bfc9c0]/50 p-2 min-w-[260px] z-50 animate-in fade-in zoom-in-95">
                  <div className="text-[11px] font-bold text-[#707971] px-2 py-1 uppercase">
                    Pilia ang Palengke Latag Area
                  </div>
                  {marketSpots.map((spot) => (
                    <button
                      key={spot}
                      onClick={() => {
                        setSelectedLocation(spot);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-[13px] flex items-center gap-2 transition-colors ${
                        selectedLocation === spot
                          ? 'bg-[#e8f0e7] text-[#004328] font-bold'
                          : 'hover:bg-[#f3fcf2] text-[#161d18]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#226b47]">
                        location_on
                      </span>
                      <span className="truncate">{spot}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Cart Button */}
            <button
              aria-label="View Suki Basket"
              onClick={onOpenCart}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#404942] hover:text-[#161d18] hover:bg-[#e8f0e7] transition-colors rounded-full shadow-sm px-2 py-1 hover:bg-[#e8f5e6]"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#9a2300] text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-[#f3fcf2]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notification Button */}
            <button
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#404942] hover:text-[#161d18] transition-colors rounded-full shadow-sm px-2 py-1 hover:bg-[#e8f5e6]"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#9a2300] ring-2 ring-[#f3fcf2]"></span>
            </button>

            {/* Tindera Hub Shortcut Avatar */}
            <button
              onClick={() => onSelectTab('account')}
              title="Ate Lorna Tindera Mode"
              className="w-8 h-8 rounded-full bg-[#004328] flex items-center justify-center text-white ring-2 ring-[#a9f3c5] hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </button>
          </div>
        </div>

        {/* Search Bar with Microphone */}
        <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white shadow-[0_1px_4px_rgba(13,92,58,0.06)] border border-[#bfc9c0]/40">
          <span className="material-symbols-outlined text-[#707971] text-[20px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search fresh latag, gulay, street food..."
            className="text-[13px] text-[#161d18] placeholder:text-[#bfc9c0] bg-transparent flex-1 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-[#707971] hover:text-[#161d18]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            onClick={() => onSearchChange('Bangus')}
            title="Search fresh bangus"
            className="text-[#004328] hover:scale-110 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
          </button>
        </div>
      </div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="absolute top-28 right-4 bg-white rounded-2xl shadow-2xl border border-[#bfc9c0]/50 p-3 w-80 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#e2ebe1]">
            <span className="font-bold text-[14px] text-[#161d18]">Palengke Updates</span>
            <span className="text-[11px] text-[#226b47] font-bold">Mark all read</span>
          </div>
          <div className="space-y-2 mt-2 max-h-60 overflow-y-auto">
            <div className="p-2 bg-[#edf6ec] rounded-xl flex items-start gap-2">
              <span className="material-symbols-outlined text-[#711700] text-[20px]">sensors</span>
              <div>
                <p className="text-[12px] font-bold text-[#161d18]">Ate Lorna is LIVE right now!</p>
                <p className="text-[11px] text-[#404942]">New batch of Panabo Bangus just arrived at Stall #42.</p>
              </div>
            </div>
            <div className="p-2 bg-[#f3fcf2] rounded-xl flex items-start gap-2">
              <span className="material-symbols-outlined text-[#226b47] text-[20px]">electric_rickshaw</span>
              <div>
                <p className="text-[12px] font-bold text-[#161d18]">Tricycle Express Ready</p>
                <p className="text-[11px] text-[#404942]">Free delivery promo on orders over ₱250 active today.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowNotifications(false)}
            className="mt-2 w-full py-1 text-center text-[12px] font-bold text-[#004328] hover:bg-[#edf6ec] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
};

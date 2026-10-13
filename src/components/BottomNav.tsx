import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  pendingOrdersCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  pendingOrdersCount = 0,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f3fcf2]/95 backdrop-blur-xl shadow-[0_-2px_10px_rgba(0,0,0,0.06)] border-t border-[#e2ebe1]">
      <div className="h-16 px-2 flex items-center justify-around max-w-lg mx-auto">
        {/* Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'home'
              ? 'text-[#004328] font-bold'
              : 'text-[#404942] hover:text-[#161d18]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] ${
              activeTab === 'home' ? 'material-symbols-fill' : ''
            }`}
          >
            home
          </span>
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </button>

        {/* Live Latag */}
        <button
          onClick={() => onSelectTab('live-latag')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'live-latag'
              ? 'text-[#004328] font-bold'
              : 'text-[#404942] hover:text-[#161d18]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'live-latag' ? 'text-[#711700] material-symbols-fill' : ''
              }`}
            >
              videocam
            </span>
            <span className="absolute -top-1 -right-2.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9a2300] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9a2300]"></span>
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-tight">Live Selling</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => onSelectTab('orders')}
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'orders'
              ? 'text-[#004328] font-bold'
              : 'text-[#404942] hover:text-[#161d18]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className={`material-symbols-outlined text-[22px] ${
                activeTab === 'orders' ? 'material-symbols-fill' : ''
              }`}
            >
              receipt_long
            </span>
            {pendingOrdersCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#febb2d] text-[#271900] text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-white">
                {pendingOrdersCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Orders</span>
        </button>

        {/* Listahan (Suki Notebook) */}
        <button
          // onClick={() => onSelectTab('suki-listahan')}
          //className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            //activeTab === 'suki-listahan'
              //? 'text-[#004328] font-bold'
              //: 'text-[#404942] hover:text-[#161d18]'
          //}`}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 text-gray-300 transition-colors"
        >
          <span
            className={`material-symbols-outlined text-[22px] ${
              activeTab === 'suki-listahan' ? 'material-symbols-fill' : ''
            }`}
          >
            menu_book
          </span>
          <span className="text-[10px] font-bold tracking-tight">List</span>
        </button>

        {/* Tinderas (Vendor Portal) */}
        <button
          onClick={() => onSelectTab('profile-tinderas')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
            activeTab === 'profile-tinderas'
              ? 'text-[#004328] font-bold'
              : 'text-[#404942] hover:text-[#161d18]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[22px] ${
              activeTab === 'profile-tinderas' ? 'material-symbols-fill' : ''
            }`}
          >
            storefront
          </span>
          <span className="text-[10px] font-bold tracking-tight">My Tindahan</span>
        </button>
      </div>
    </nav>
  );
};

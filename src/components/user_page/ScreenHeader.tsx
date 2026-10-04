import React from 'react';
import { ArrowLeft, Bell, ShoppingBag } from 'lucide-react';

interface ScreenHeaderProps {
  onBack?: () => void;
  basketCount?: number;
  onOpenBasket?: () => void;
  onSelectTab: (tab: string) => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  onBack,
  basketCount = 2,
  onOpenBasket,
  onSelectTab
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#f3fcf2]">
      <button
        onClick={()=>onSelectTab('home')}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2ebe1] text-[#161d18] transition-colors active:scale-95 focus:outline-none"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenBasket}
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2ebe1] text-[#0d5c3a] transition-colors active:scale-95 focus:outline-none"
          aria-label="Palengke Basket"
          title="Open Palengke Basket"
        >
          <ShoppingBag className="w-5 h-5" />
          {basketCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#e24a21] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {basketCount}
            </span>
          )}
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2ebe1] text-[#161d18] transition-colors active:scale-95 focus:outline-none"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

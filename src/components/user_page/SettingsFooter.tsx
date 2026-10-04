import React from 'react';
import { Settings, ChevronRight, LogOut } from 'lucide-react';

interface SettingsFooterProps {
  onOpenSettings?: () => void;
  onSelectTab: (tab: string) => void;

}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
  onOpenSettings,
  onSelectTab
}) => {
  return (
    <footer className="space-y-4 pt-1">
      {/* Account Settings & Logout Card */}
      <div className="bg-white rounded-2xl p-2 shadow-[0_2px_8px_-1px_rgba(13,92,58,0.08),0_1px_3px_0_rgba(0,0,0,0.04)] border border-[#e8f0e7] divide-y divide-[#e8f0e7]">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between p-3.5 hover:bg-[#f3fcf2] rounded-xl transition-colors text-left group"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-[#707971] group-hover:text-[#0d5c3a] transition-colors" />
            <span className="text-xs font-semibold text-[#161d18]">
              Account Settings & Preferences
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#707971] group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={()=>onSelectTab('auth')}
          className="w-full flex items-center justify-center gap-2 p-3.5 hover:bg-[#ffdad6]/20 rounded-xl transition-colors text-center text-[#ba1a1a] font-bold text-xs"
        >
          <LogOut className="w-4 h-4 stroke-[2.2]" />
          <span>Log Out of Maria's Account</span>
        </button>
      </div>

      {/* App Version Tag */}
      <div className="text-center pb-6">
        <p className="font-serif italic text-xs text-[#707971]">
          Palengke App v2.4.1 • Davao Region
        </p>
      </div>
    </footer>
  );
};

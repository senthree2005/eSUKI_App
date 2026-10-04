import React, { useState } from 'react';
import { Gift, CheckCircle2, Sparkles, ChevronDown } from 'lucide-react';

interface SukiDailyBonusCardProps {
  onBonusClaimed?: () => void;
}

export const SukiDailyBonusCard: React.FC<SukiDailyBonusCardProps> = ({ onBonusClaimed }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => {
        setExpanded(!expanded);
        onBonusClaimed?.();
      }}
      className="cursor-pointer bg-gradient-to-r from-[#ffdea9] via-[#febb2d] to-[#f4b223] rounded-2xl p-3.5 shadow-[0_2px_10px_rgba(254,187,45,0.25)] border border-[#ffdea9] transition-all hover:shadow-[0_4px_14px_rgba(254,187,45,0.35)] active:scale-[0.99]"
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <div className="flex items-center gap-3">
        {/* Gift Icon Box */}
        <div className="w-11 h-11 rounded-xl bg-white/75 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-xs border border-white/60">
          <Gift className="w-5 h-5 text-[#5e4100]" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-[#271900] tracking-tight">
              Suki Daily Bonus!
            </h3>
            <Sparkles className="w-3.5 h-3.5 text-[#5e4100] animate-pulse" />
          </div>
          <p className="text-xs text-[#422c00]/90 font-medium truncate">
            Free fresh spices & 4 pcs calamansi added to your basket
          </p>
        </div>

        {/* Checkmark Action */}
        <div className="w-7 h-7 rounded-full bg-white/40 flex items-center justify-center text-[#271900] shrink-0">
          <CheckCircle2 className="w-5 h-5 text-[#3c2500]" />
        </div>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#6d4c00]/15 text-xs text-[#271900] space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between font-semibold">
            <span>🎁 Maria's 2-Year Suki Perk</span>
            <span className="bg-[#271900]/10 px-2 py-0.5 rounded-full text-[10px]">Auto-Applied</span>
          </div>
          <p className="text-[11px] leading-relaxed opacity-90">
            Ate Lorna included 4 pcs native calamansi, ginger slices, and fresh siling labuyo with your Bangus order at Stall #14!
          </p>
        </div>
      )}
    </div>
  );
};

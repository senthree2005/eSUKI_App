import React from 'react';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export const DirectMarketGuarantee: React.FC = () => {
  return (
    <div className="bg-[#edf6ec] rounded-2xl p-4 border border-[#dce5db] flex items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#0d5c3a] shadow-xs shrink-0 border border-[#dce5db]">
          <HeartHandshake className="w-5 h-5 text-[#0d5c3a]" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#004328] tracking-tight">
            Direct Market Guarantee
          </h4>
          <p className="text-[11px] text-[#404942] leading-tight mt-0.5">
            Every order directly empowers local market stall families.
          </p>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0d5c3a] shadow-2xs shrink-0">
        <ShieldCheck className="w-4 h-4 text-[#0d5c3a]" />
      </div>
    </div>
  );
};

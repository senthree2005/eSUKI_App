import React from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, onClose }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm bg-[#004328] text-white p-3.5 rounded-2xl shadow-xl border border-[#a9f3c5]/30 flex items-start justify-between gap-3 animate-slideDown">
      <div className="flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-full bg-[#a9f3c5] text-[#004328] flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div>
          <p className="text-xs font-bold text-white tracking-tight">{message}</p>
          {subMessage && (
            <p className="text-[11px] text-[#a9f3c5] mt-0.5 leading-snug">{subMessage}</p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-[#a9f3c5] hover:text-white p-0.5 rounded-md transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

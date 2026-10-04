import React, { useState, useEffect } from 'react';
import { X, Navigation, Phone, MessageSquare, Bike, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { DeliveryRider, BasketItem } from '../types';

interface LiveTrackingModalProps {
  rider: DeliveryRider;
  items: BasketItem[];
  basketId: string;
  onClose: () => void;
  onContact: () => void;
  onTip: (amount: number) => void;
  hasTipped?: boolean;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  rider,
  items,
  basketId,
  onClose,
  onContact,
  onTip,
  hasTipped = false,
}) => {
  const [progress, setProgress] = useState(65);
  const [eta, setEta] = useState(rider.estimatedDeliveryMins);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 65 : prev + 2));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d5c3a] animate-pulse" />
            <h3 className="font-bold text-base text-[#161d18]">
              Live Tricycle Tracking {basketId}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Simulation Canvas */}
        <div className="relative h-60 bg-[#d8eed8] overflow-hidden border-b border-[#c2dac2]">
          {/* SVG Map Lines for Tagum City Grid */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(13,92,58,0.08)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* City Road Network */}
            <path d="M 20 80 Q 180 120 380 90" fill="none" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
            <path d="M 120 20 L 160 220" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
            <path d="M 40 180 Q 200 160 360 190" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
            <path d="M 280 30 L 260 210" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />

            {/* Route Polyline (Green Track) */}
            <path
              d="M 50 85 L 140 105 L 240 100 L 320 180"
              fill="none"
              stroke="#0d5c3a"
              strokeWidth="4"
              strokeDasharray="6,4"
            />
          </svg>

          {/* Landmarks Markers */}
          <div className="absolute top-14 left-6 bg-[#004328] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#a9f3c5]" />
            <span>Tagum Public Market</span>
          </div>

          <div className="absolute top-20 left-44 bg-white/90 text-[#161d18] text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-xs border border-gray-200">
            Pioneer Avenue
          </div>

          <div className="absolute bottom-6 right-8 bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md flex items-center gap-1 animate-bounce">
            <MapPin className="w-3 h-3 text-white" />
            <span>Maria's House (Magugpo West)</span>
          </div>

          {/* Animated Tricycle Rider Marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-10"
            style={{
              left: `${progress}%`,
              top: `${progress > 75 ? 100 + (progress - 75) * 3 : 95}%`,
            }}
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-[#febb2d] p-1.5 shadow-lg border-2 border-[#161d18] flex items-center justify-center animate-pulse">
                <Bike className="w-6 h-6 text-[#161d18]" />
              </div>
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-[#161d18] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                TODA #112
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Rider Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#e2ebe1] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={rider.avatarUrl}
                alt={rider.name}
                className="w-12 h-12 rounded-full object-cover border border-[#0d5c3a]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#161d18]">
                  {rider.name}
                </h4>
                <p className="text-xs text-[#404942]">
                  {rider.todaAssociation} {rider.tricycleNumber}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] bg-[#edf6ec] text-[#005232] font-bold px-1.5 py-0.5 rounded">
                    Plate: {rider.plateNumber}
                  </span>
                  <span className="text-[10px] text-[#7d5800] font-bold">
                    ★ {rider.rating}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onContact}
              className="w-10 h-10 rounded-full bg-[#0d5c3a] text-white flex items-center justify-center hover:bg-[#004328] active:scale-95 shadow-sm"
              title="Call Rider"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Route Milestones */}
          <div className="bg-white rounded-2xl p-4 border border-[#e2ebe1] shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-[#707971] uppercase tracking-wider">
              Live Order Milestones
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0d5c3a] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#161d18]">Order Confirmed & Picked Up</p>
                  <p className="text-[11px] text-[#404942]">
                    Packed 2kg Fresh Bangus (Stall #14) & 1 Bundle Kangkong (Stall #18)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#0d5c3a] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                  ●
                </span>
                <div>
                  <p className="font-bold text-[#0d5c3a]">
                    En Route via Pioneer Avenue ({eta} mins away)
                  </p>
                  <p className="text-[11px] text-[#404942]">
                    Manong Junjun is driving safely with ice pack cooling your fish.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 opacity-60">
                <Clock className="w-4 h-4 text-[#707971] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#161d18]">Arrival at Magugpo West</p>
                  <p className="text-[11px] text-[#707971]">
                    Direct handover to Maria Santos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tip Driver Action */}
          <div className="bg-[#ffdea9]/70 rounded-2xl p-3.5 border border-[#febb2d] flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#3c2500]">
                Support Tagum TODA Drivers!
              </p>
              <p className="text-[11px] text-[#5e4100]">
                {hasTipped ? 'You tipped ₱20! Salamat kaayo!' : '100% of tips go directly to Manong Junjun.'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onTip(20)}
                className="px-2.5 py-1.5 bg-[#febb2d] hover:bg-[#f4b223] text-[#271900] font-bold text-xs rounded-lg active:scale-95 shadow-2xs"
              >
                +₱20
              </button>
              <button
                onClick={() => onTip(50)}
                className="px-2.5 py-1.5 bg-[#febb2d] hover:bg-[#f4b223] text-[#271900] font-bold text-xs rounded-lg active:scale-95 shadow-2xs"
              >
                +₱50
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

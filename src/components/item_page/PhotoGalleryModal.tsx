import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, CheckCircle2 } from 'lucide-react';
import { bangusHeroImg, ateLornaImg, latagBasketImg, liveCamStreamImg } from '../data/mockDataItems';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const photos = [
    {
      url: bangusHeroImg,
      title: 'Fresh Dagupan Milkfish on Crushed Ice',
      desc: 'Bright shiny silver scales, clear round eyes, port arrival 6:00 AM today.',
      tag: 'Main Fresh Catch',
    },
    {
      url: ateLornaImg,
      title: 'Ate Lorna at Stall #14 Wet Section',
      desc: 'Over 22 years of serving Tagum City with fresh fish and free custom cleaning.',
      tag: 'Tindera Verified',
    },
    {
      url: latagBasketImg,
      title: 'Umagang Latag Display in Woven Bilao',
      desc: 'Freshly harvested bangus and sea catch layered atop thick ice.',
      tag: 'Stall Display',
    },
    {
      url: liveCamStreamImg,
      title: 'Live Stall Scale & Cutting Station',
      desc: 'Transparent digital weighing and traditional hanging brass scale for sukis.',
      tag: 'Live Station',
    },
  ];

  if (!isOpen) return null;

  const current = photos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-zinc-950 rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="p-4 flex items-center justify-between text-white border-b border-white/10">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Live Photos from Stall #14 ({currentIndex + 1} of {photos.length})
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Gallery"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo with Controls */}
        <div className="relative w-full aspect-[4/3] bg-black flex items-center justify-center">
          <img
            src={current.url}
            alt={current.title}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 text-white hover:bg-black/80 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Tag Pill */}
          <span className="absolute bottom-3 left-3 bg-[#0d5c3a]/90 backdrop-blur-md text-emerald-100 text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 border border-emerald-400/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            {current.tag}
          </span>
        </div>

        {/* Description & Thumbnails */}
        <div className="p-4 bg-zinc-900 text-white">
          <h4 className="font-bold text-sm text-zinc-100">{current.title}</h4>
          <p className="text-xs text-zinc-400 mt-1">{current.desc}</p>

          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            {photos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                  idx === currentIndex ? 'border-emerald-400 scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

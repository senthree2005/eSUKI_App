import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Heart, Send, ShoppingBag, Eye, Sparkles, Check } from 'lucide-react';
import { Vendor, LiveComment } from '../../types';
import { sampleLiveComments } from '../../data/mockData_account';

interface LiveLatagModalProps {
  vendor: Vendor;
  onClose: () => void;
  onAddProduct: (item: { name: string; price: number; quantity: number; unit: string; vendorName: string }) => void;
}

export const LiveLatagModal: React.FC<LiveLatagModalProps> = ({
  vendor,
  onClose,
  onAddProduct,
}) => {
  const [muted, setMuted] = useState(false);
  const [comments, setComments] = useState<LiveComment[]>(
    sampleLiveComments.map((c, idx) => ({ ...c, id: `c-${idx}`, timestamp: 'Just now' }))
  );
  const [inputMessage, setInputMessage] = useState('');
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [selectedKg, setSelectedKg] = useState(1);
  const [reservedCount, setReservedCount] = useState(0);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const pinnedProduct = vendor.products ? vendor.products[0] : {
    id: 'p1',
    name: 'Fresh Yellowfin Tuna Belly',
    price: 420.00,
    unit: 'kg',
    availableKg: 4.5,
    freshness: 'Arrived 4:30 AM from Davao Gulf',
  };

  // Auto-scroll comments
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // Periodic random live comments from community
  useEffect(() => {
    const communityQuotes = [
      { sender: 'Nanay Gina (Apokon)', message: 'Gandang klase ate, paki-hiwa ng pira-piraso pang prito!', isSuki: true },
      { sender: 'Kuya Jojo Tricycle', message: 'Padung na ko diha ate Lorna kuhaon nako ang order ni Maam Maria', isSuki: false },
      { sender: 'Chef Lito', message: 'Tuna sashimi grade ba yan ate?', isSuki: true },
      { sender: 'Suki Beth', message: 'Mine 1kg Bangus din po!', isSuki: true, isMineAction: true },
    ];

    const timer = setInterval(() => {
      const randomQuote = communityQuotes[Math.floor(Math.random() * communityQuotes.length)];
      setComments((prev) => [
        ...prev.slice(-12),
        {
          id: `c-${Date.now()}`,
          sender: randomQuote.sender,
          message: randomQuote.message,
          isSuki: randomQuote.isSuki,
          isMineAction: randomQuote.isMineAction,
          timestamp: 'Just now',
        },
      ]);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        sender: 'Maria Santos (Gold Suki)',
        message: inputMessage.trim(),
        isSuki: true,
        timestamp: 'Just now',
      },
    ]);
    setInputMessage('');
  };

  const handleSpawnHeart = () => {
    const newHeart = { id: Date.now(), x: Math.random() * 60 + 20 };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  const handleMineProduct = () => {
    onAddProduct({
      name: `${selectedKg}kg ${pinnedProduct.name}`,
      price: pinnedProduct.price * selectedKg,
      quantity: selectedKg,
      unit: 'kg',
      vendorName: vendor.name,
    });
    setReservedCount((prev) => prev + 1);

    // Auto post "Mine" comment
    setComments((prev) => [
      ...prev,
      {
        id: `mine-${Date.now()}`,
        sender: 'Maria Santos (Gold Suki)',
        message: `MINED ${selectedKg}kg ${pinnedProduct.name}! 🐟 Pa-reserve po ate!`,
        isSuki: true,
        isMineAction: true,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between max-w-md mx-auto overflow-hidden animate-fadeIn">
      {/* Background Video / Stream Mockup */}
      <div className="absolute inset-0 z-0">
        <img
          src={vendor.avatarUrl}
          alt={vendor.name}
          className="w-full h-full object-cover brightness-90 filter contrast-105"
        />
        {/* Subtle camera lens & grain overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* Top Stream Header */}
      <div className="relative z-10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md rounded-full py-1.5 px-3 border border-white/20">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e24a21] animate-ping" />
          <span className="bg-[#e24a21] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">
            LIVE LATAG
          </span>
          <span className="text-white text-xs font-semibold truncate max-w-[120px]">
            {vendor.name}
          </span>
          <div className="flex items-center gap-1 text-white/80 text-[11px] pl-1 border-l border-white/20">
            <Eye className="w-3 h-3 text-red-400" />
            <span>148</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted(!muted)}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 border border-white/20 transition-transform active:scale-95"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 border border-white/20 transition-transform active:scale-95"
            aria-label="Close Live Stream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Hearts Animation Container */}
      <div className="absolute right-4 bottom-56 pointer-events-none z-20 h-64 w-20 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 text-[#e24a21] animate-floatUp"
            style={{ left: `${heart.x}%` }}
          >
            <Heart className="w-6 h-6 fill-[#e24a21] stroke-white" />
          </div>
        ))}
      </div>

      {/* Middle & Bottom Interactive Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-end p-4 space-y-3">
        {/* Live Rolling Comments */}
        <div className="h-44 overflow-y-auto space-y-1.5 mask-gradient-top pr-2 scrollbar-none">
          {comments.map((item) => (
            <div
              key={item.id}
              className={`p-2 rounded-xl text-xs backdrop-blur-md border transition-all ${
                item.isMineAction
                  ? 'bg-[#febb2d]/90 text-[#3c2500] border-[#ffdea9] font-bold shadow-md'
                  : item.isSuki
                  ? 'bg-black/60 text-white border-white/20'
                  : 'bg-black/40 text-white/90 border-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-bold text-[11px] text-[#8ed6aa]">
                  {item.sender}
                </span>
                {item.isSuki && (
                  <span className="bg-[#0d5c3a] text-white text-[9px] px-1 py-0.2 rounded-xs font-semibold">
                    SUKI
                  </span>
                )}
              </div>
              <p className="text-xs leading-snug">{item.message}</p>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>

        {/* Pinned Real-Time Catch of the Day Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#711700] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>PINNED CATCH</span>
              </span>
              <span className="text-[11px] font-bold text-[#0d5c3a]">
                4.5kg left on ice
              </span>
            </div>
            <span className="text-xs text-[#707971]">
              Arrived 4:30 AM
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-[#161d18] truncate">
                {pinnedProduct.name}
              </h4>
              <p className="text-base font-extrabold text-[#004328]">
                ₱{pinnedProduct.price.toFixed(2)}{' '}
                <span className="text-xs font-normal text-gray-500">/ {pinnedProduct.unit}</span>
              </p>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-2 bg-[#edf6ec] px-2.5 py-1 rounded-xl border border-[#dce5db]">
              <button
                onClick={() => setSelectedKg(Math.max(1, selectedKg - 0.5))}
                className="w-6 h-6 rounded-md bg-white text-[#0d5c3a] font-bold flex items-center justify-center hover:bg-[#dce5db] active:scale-95"
              >
                -
              </button>
              <span className="text-xs font-bold text-[#161d18] min-w-[32px] text-center">
                {selectedKg}kg
              </span>
              <button
                onClick={() => setSelectedKg(selectedKg + 0.5)}
                className="w-6 h-6 rounded-md bg-white text-[#0d5c3a] font-bold flex items-center justify-center hover:bg-[#dce5db] active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* Mine Button */}
          <button
            onClick={handleMineProduct}
            className="w-full bg-[#711700] hover:bg-[#891e00] text-white font-extrabold text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>MINE NA! Reserve {selectedKg}kg (₱{(pinnedProduct.price * selectedKg).toFixed(2)})</span>
          </button>
        </div>

        {/* Bottom Interaction Bar (Chat input + Heart trigger) */}
        <div className="flex items-center gap-2 pt-1">
          <form onSubmit={handleSendComment} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanong kay Ate Lorna..."
              className="flex-1 bg-black/60 backdrop-blur-md text-white placeholder-white/60 text-xs px-3.5 py-2.5 rounded-xl border border-white/20 focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-[#0d5c3a] text-white flex items-center justify-center hover:bg-[#005232] active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={handleSpawnHeart}
            className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 active:scale-95 shrink-0 border border-white/30"
            aria-label="Send Heart"
          >
            <Heart className="w-5 h-5 fill-[#e24a21] text-[#e24a21]" />
          </button>
        </div>
      </div>
    </div>
  );
};

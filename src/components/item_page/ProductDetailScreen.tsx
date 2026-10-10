import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  User,
  Star,
  Check,
  MessageCircle,
  Video,
  Plus,
  Minus,
  ShoppingBag,
  Store,
  Sparkles,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailScreenProps {
  product: Product;
  onBack?: () => void;
  onOpenLiveCam?: () => void;
  onOpenChat: () => void;
  onOpenGallery: (index?: number) => void;
  onOpenWriteReview: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onOpenChat,
  onOpenGallery,
  onOpenWriteReview,
}) => {
  const [weightKg, setWeightKg] = useState(1.0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);

  const currentHeroImg =
    selectedPhotoIndex === 0
      ? product.heroImage
      : (product.thumbnails[selectedPhotoIndex - 1]?.url) || product.heroImage;

  const handleDecrease = () => {
    if (weightKg > 0.5) {
      setWeightKg((prev) => parseFloat((prev - 0.5).toFixed(1)));
    }
  };

  const handleIncrease = () => {
    setWeightKg((prev) => parseFloat((prev + 0.5).toFixed(1)));
  };

  const currentPrice = Math.round(product.price * weightKg);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out fresh ${product.name} at Ate Lorna's Fish Stall, Tagum Public Market!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3fcf2] text-[#161d18] flex flex-col pb-28">
      {/* Toast notifications */}
      {showShareToast && (
        <div className="fixed top-5 inset-x-0 mx-auto w-fit z-50 bg-black/85 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Link copied to clipboard!</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#f3fcf2]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#e2ebe1]">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (onBack) onBack();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Back to Top"
            className="p-1.5 -ml-1 text-[#161d18] hover:bg-[#e2ebe1] rounded-full transition active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Suki Stall Badge */}
          <div className="w-7 h-7 rounded-lg bg-[#0d5c3a] text-white flex items-center justify-center shadow-xs">
            <span className="text-[9px] font-black tracking-tighter uppercase">SUKI</span>
          </div>

          <h1 className="font-bold text-base text-[#161d18] tracking-tight">
            Product Detail
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Favorite */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            aria-label="Add to Suki Favorites"
            className="p-2 text-[#161d18] hover:bg-[#e2ebe1] rounded-full transition active:scale-95"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? 'fill-[#e24a21] text-[#e24a21]' : 'text-[#161d18]'
              }`}
            />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share Catch"
            className="p-2 text-[#161d18] hover:bg-[#e2ebe1] rounded-full transition active:scale-95"
          >
            <Share2 className="w-5 h-5 text-[#161d18]" />
          </button>

          {/* Suki Profile / Account */}
          <button
            type="button"
            aria-label="Suki Account"
            className="p-1.5 bg-[#004328] text-white rounded-full shadow-xs relative"
          >
            <User className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#febb2d] rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="px-4 pt-3 space-y-3.5 max-w-lg mx-auto w-full">
        {/* Hero Product Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-[#e8f0e7] group">
          <img
            src={currentHeroImg}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />

          {/* Live Port Arrival Tag */}
          <div className="absolute top-3 left-3 bg-[#004328]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1 shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Port Catch • 6:00 AM Today</span>
          </div>

          <button
            onClick={() => onOpenGallery(selectedPhotoIndex)}
            className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Inspect Zoom</span>
          </button>
        </div>

        {/* Thumbnail Row (+4 photos Live from stall) */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Main catch thumbnail */}
          <button
            onClick={() => setSelectedPhotoIndex(0)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
              selectedPhotoIndex === 0
                ? 'border-[#004328] ring-2 ring-[#004328]/20 scale-102'
                : 'border-transparent opacity-85 hover:opacity-100'
            }`}
          >
            <img
              src={product.heroImage}
              alt="Main Fresh Catch"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Thumbnail 2: Vendor Prep */}
          <button
            onClick={() => setSelectedPhotoIndex(1)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
              selectedPhotoIndex === 1
                ? 'border-[#004328] ring-2 ring-[#004328]/20 scale-102'
                : 'border-transparent opacity-85 hover:opacity-100'
            }`}
          >
            <img
              src={product.thumbnails[1]?.url || product.heroImage}
              alt="Stall Prep"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Thumbnail 3: Market Latag Bilao */}
          <button
            onClick={() => setSelectedPhotoIndex(2)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
              selectedPhotoIndex === 2
                ? 'border-[#004328] ring-2 ring-[#004328]/20 scale-102'
                : 'border-transparent opacity-85 hover:opacity-100'
            }`}
          >
            <img
              src={product.thumbnails[2]?.url || product.heroImage}
              alt="Market Latag"
              className="w-full h-full object-cover"
            />
          </button>

          {/* +4 photos Live from stall card */}
          <button
            onClick={() => onOpenGallery(0)}
            className="aspect-square rounded-lg bg-[#edf6ec] hover:bg-[#e2ebe1] border border-[#dce5db] flex flex-col items-center justify-center p-1 text-center transition active:scale-95 shadow-xs"
          >
            <span className="text-xs font-black text-[#004328]">+4 photos</span>
            <span className="text-[9px] font-medium text-[#404942] leading-tight mt-0.5">
              Live from stall
            </span>
          </button>
        </div>

        {/* Product Title, Subtitle & Price Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2ebe1]">
          <h2 className="text-xl sm:text-2xl font-black text-[#161d18] tracking-tight leading-snug">
            {product.name}
          </h2>
          <p className="text-xs text-[#404942] mt-1.5 leading-relaxed font-medium">
            {product.subtitle}
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#edf6ec] flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-[#004328] tracking-tight">
              ₱{product.price}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#404942]">
              {product.unitText}
            </span>
          </div>
        </div>

        {/* Ratings & Breakdown Card (Matches screenshot with crisp rectangular edges) */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2ebe1] space-y-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Big 5.0 Rating */}
            <div className="shrink-0">
              <div className="text-4xl font-extrabold text-[#004328] tracking-tight leading-none">
                5.0
              </div>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-[#febb2d] text-[#febb2d]"
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold text-[#404942] mt-1">
                {product.reviewCount} Suki Reviews
              </p>
            </div>

            {/* Right Breakdown Progress Bars */}
            <div className="flex-1 space-y-2 text-xs">
              {/* Freshness */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-bold text-[#161d18] mb-0.5">
                  <span>Freshness (Kalab-as)</span>
                  <span className="text-[#004328]">5.0 ★</span>
                </div>
                <div className="w-full bg-[#dce5db] h-2 rounded-sm overflow-hidden">
                  <div className="bg-[#004328] h-full rounded-sm w-full" />
                </div>
              </div>

              {/* Clean Gutting */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-bold text-[#161d18] mb-0.5">
                  <span>Clean Gutting & Prep</span>
                  <span className="text-[#004328]">5.0 ★</span>
                </div>
                <div className="w-full bg-[#dce5db] h-2 rounded-sm overflow-hidden">
                  <div className="bg-[#004328] h-full rounded-sm w-full" />
                </div>
              </div>

              {/* Ice Cold Delivery */}
              <div>
                <div className="flex justify-between items-center text-[11px] font-bold text-[#161d18] mb-0.5">
                  <span>Ice Cold Delivery</span>
                  <span className="text-[#004328]">5.0 ★</span>
                </div>
                <div className="w-full bg-[#dce5db] h-2 rounded-sm overflow-hidden">
                  <div className="bg-[#004328] h-full rounded-sm w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Review 1: Nanay Corazon */}
          <div className="bg-[#f3fcf2] rounded-lg p-3.5 border border-[#e2ebe1] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#a9f3c5] text-[#004328] font-bold text-xs flex items-center justify-center shadow-xs">
                  NC
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#161d18] leading-tight">
                    Nanay Corazon (Suki Tier 3)
                  </h4>
                  <p className="text-[10px] text-[#404942]">
                    Magugpo East • 2 hrs ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-3 h-3 fill-[#febb2d] text-[#febb2d]"
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#161d18] italic leading-relaxed">
              “Lab-as kaayo ang bangus! Limpyo kaayo pagka-hawan sa himbis ug maayo
              pagka-yelo. Daghan kaayong unod walay bahong lapok.”
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] text-[#004328] font-semibold">
              <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-[#dce5db]">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>Ordered Hawanon & Daing Cut</span>
              </span>
              <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-[#dce5db]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004328]"></span>
                <span>Verified Palengke Suki</span>
              </span>
            </div>
          </div>

          {/* Review 2: Mang Kanor */}
          <div className="bg-[#f3fcf2] rounded-lg p-3.5 border border-[#e2ebe1] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffdea9] text-[#7d5800] font-bold text-xs flex items-center justify-center shadow-xs">
                  MK
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#161d18] leading-tight">
                    Mang Kanor
                  </h4>
                  <p className="text-[10px] text-[#404942]">
                    Apokon, Tagum • Today 8:15 AM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-3 h-3 fill-[#febb2d] text-[#febb2d]"
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#161d18] italic leading-relaxed">
              “Delivered in 15 mins by Manong Junjun's tricycle! Matig-a pa ang unod,
              puno og yelo sa bayong packaging. Suki na gyud ko dire.”
            </p>
          </div>

          {/* Action to write review */}
          <div className="pt-1 text-center">
            <button
              onClick={onOpenWriteReview}
              className="text-xs font-bold text-[#004328] hover:underline"
            >
              + Write a Review as Palengke Suki
            </button>
          </div>
        </div>

        {/* Vendor Stall Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2ebe1] space-y-3.5">
          <div className="flex items-center gap-3">
            <img
              src={product.vendor.vendorAvatar}
              alt={product.stall}
              className="w-12 h-12 rounded-lg object-cover border border-[#e2ebe1] shadow-xs"
            />
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm text-[#161d18] leading-tight truncate">
                {product.stall}
              </h3>
              <p className="text-xs text-[#404942] truncate mt-0.5">
                {product.vendor.location}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#161d18] mt-1">
                <span className="flex items-center text-[#7d5800]">
                  <Star className="w-3 h-3 fill-[#febb2d] text-[#febb2d] mr-0.5" />
                  {product.vendor.rating} ({product.vendor.sukiCount})
                </span>
              </div>
            </div>
          </div>

          {/* Two Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenChat}
              className="py-2.5 px-3 rounded-lg bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#004328] text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs border border-[#dce5db]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Ate Lorna</span>
            </button>
            <button
              type="button"
              className="py-2.5 px-3 rounded-lg bg-[#a9f3c5] text-[#002111] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs border border-emerald-300 cursor-default"
            >
              <Video className="w-4 h-4" />
              <span>Live Latag Cam</span>
            </button>
          </div>
        </div>
      </main>

      {/* Persistent Bottom Purchase Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#f3fcf2]/95 backdrop-blur-md border-t border-[#e2ebe1] px-4 py-3 max-w-lg mx-auto shadow-2xl flex items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-white rounded-lg border border-[#dce5db] p-1 shadow-xs">
          <button
            onClick={handleDecrease}
            aria-label="Decrease Kilo"
            className="w-8 h-8 rounded-md flex items-center justify-center text-[#161d18] hover:bg-[#f3fcf2] active:scale-90 transition font-bold"
          >
            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          <div className="px-2.5 text-center min-w-[44px]">
            <span className="text-sm font-extrabold text-[#161d18] block leading-none tabular-nums">
              {weightKg.toFixed(1)}
            </span>
            <span className="text-[9px] font-bold text-[#404942] uppercase tracking-wider">
              KG
            </span>
          </div>
          <button
            onClick={handleIncrease}
            aria-label="Increase Kilo"
            className="w-8 h-8 rounded-md flex items-center justify-center text-[#161d18] hover:bg-[#f3fcf2] active:scale-90 transition font-bold"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Primary CTA: Add to Suki Basket */}
        <button
          onClick={() => {}}
          className="flex-1 h-11 bg-[#004328] hover:bg-[#0d5c3a] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition px-4"
        >
          <ShoppingBag className="w-4 h-4 shrink-0 stroke-[2.2]" />
          <span className="truncate">Add to Suki Basket</span>
          <span className="font-extrabold ml-1 tabular-nums">₱{currentPrice}</span>
        </button>
      </div>
    </div>
  );
};

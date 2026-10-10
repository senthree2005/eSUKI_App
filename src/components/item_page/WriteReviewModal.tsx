import React, { useState } from 'react';
import { X, Star, Sparkles } from 'lucide-react';
import { Review } from '../../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
  productName: string;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  productName,
}) => {
  const [author, setAuthor] = useState('Nanay Corazon');
  const [location, setLocation] = useState('Magugpo East, Tagum');
  const [rating, setRating] = useState(5);
  const [freshnessScore, setFreshnessScore] = useState(5);
  const [prepScore, setPrepScore] = useState(5);
  const [deliveryScore, setDeliveryScore] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedCut, setSelectedCut] = useState('Ordered Hawanon & Daing Cut');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author || 'Palengke Suki',
      tier: 'Suki Tier 3',
      location: location || 'Tagum City',
      timestamp: 'Just now',
      rating,
      comment: `“${comment.trim()}”`,
      prepTag: selectedCut,
      verifiedSuki: true,
      avatarColor: 'bg-[#bbf7d0] text-[#14532d]',
      initials: (author || 'PS')
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    };

    onSubmitReview(newRev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-emerald-950/10">
        <div className="p-4 bg-[#0d5c3a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#febb2d]" />
            <h3 className="font-bold text-sm">Write Suki Review</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-white/80 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
              Rating for {productName}
            </label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star`}
                  className="p-1 text-amber-400 hover:scale-110 transition"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-[#febb2d] text-[#febb2d]' : 'text-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f3fcf2] rounded-lg p-3 border border-emerald-900/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Palengke Quality Ratings
            </span>
            <div className="flex items-center justify-between">
              <span className="text-zinc-700">Freshness (Kalab-as):</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setFreshnessScore(s)}
                    className={`w-5 h-5 text-[10px] rounded-sm font-bold ${
                      s <= freshnessScore ? 'bg-[#0d5c3a] text-white' : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-700">Clean Gutting & Prep:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setPrepScore(s)}
                    className={`w-5 h-5 text-[10px] rounded-sm font-bold ${
                      s <= prepScore ? 'bg-[#0d5c3a] text-white' : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-700">Ice Cold Delivery:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setDeliveryScore(s)}
                    className={`w-5 h-5 text-[10px] rounded-sm font-bold ${
                      s <= deliveryScore ? 'bg-[#0d5c3a] text-white' : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-600 block mb-1">
              Preparation Cut Ordered
            </label>
            <select
              value={selectedCut}
              onChange={(e) => setSelectedCut(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800"
            >
              <option value="Ordered Hawanon & Daing Cut">Ordered Hawanon & Daing Cut</option>
              <option value="Ordered Hawanon & Sinigang Steaks">Ordered Hawanon & Sinigang Steaks</option>
              <option value="Ordered Inihaw Cut">Ordered Inihaw Cut</option>
              <option value="Ordered Buo / Whole on Ice">Ordered Buo / Whole on Ice</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-zinc-600 block mb-1">
              Your Experience / Comment (Bisaya or Tagalog welcome!)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Halimbawa: Limpyo kaayo pagka-hawan sa himbis ug maayo pagka-yelo..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#0d5c3a]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-200 rounded-lg text-zinc-600 font-bold hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-5 py-2 bg-[#0d5c3a] text-white rounded-lg font-bold hover:bg-[#074027] disabled:opacity-40"
            >
              Submit Suki Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

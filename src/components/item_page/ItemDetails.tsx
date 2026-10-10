/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Review } from '../../types';
import { PRIMARY_PRODUCT } from '../../data/mockDataItems';
import { ProductDetailScreen } from '../item_page/ProductDetailScreen';
import { ChatWithVendorModal } from '../item_page/ChatWithVendorModal';
import { PhotoGalleryModal } from '../item_page/PhotoGalleryModal';
import { WriteReviewModal } from '../item_page/WriteReviewModal';
import { Smartphone, Monitor } from 'lucide-react';

export default function ItemDetails() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRIMARY_PRODUCT);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'responsive'>('mobile');

  const handleOpenGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const handleAddReview = (newReview: Review) => {
    setSelectedProduct((prev) => ({
      ...prev,
      reviewCount: prev.reviewCount + 1,
      reviews: [newReview, ...(prev.reviews ?? [])],
    }));
  };

  return (
    <div className="min-h-screen bg-[#e8f0e7] flex flex-col font-sans selection:bg-[#004328] selection:text-white">
      {/* Top Header Bar for Desktop */}
      <header className="bg-[#004328] border-b border-[#0d5c3a] px-4 py-2 text-white hidden md:flex items-center justify-between text-xs sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#febb2d]" />
            <strong className="tracking-tight font-extrabold text-white text-sm">
              Palengke Fresh Modern
            </strong>
          </div>
          <span className="text-emerald-300">|</span>
          <span className="text-emerald-100">Item Detail Viewer</span>
        </div>

        {/* Viewport Frame Switcher */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl">
          <button
            onClick={() => setDeviceFrame('mobile')}
            aria-label="Mobile Frame"
            className={`p-1.5 rounded-lg transition ${
              deviceFrame === 'mobile' ? 'bg-[#0d5c3a] text-white' : 'text-emerald-200'
            }`}
            title="Mobile Device Mockup"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceFrame('responsive')}
            aria-label="Full Width View"
            className={`p-1.5 rounded-lg transition ${
              deviceFrame === 'responsive' ? 'bg-[#0d5c3a] text-white' : 'text-emerald-200'
            }`}
            title="Full Width Responsive"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <div className={`flex-1 flex justify-center ${deviceFrame === 'mobile' ? 'p-0 sm:py-6 sm:px-4' : 'p-0'}`}>
        <div
          className={`w-full bg-[#f3fcf2] transition-all duration-300 ${
            deviceFrame === 'mobile'
              ? 'sm:max-w-[420px] sm:rounded-xl sm:shadow-2xl sm:border-[4px] sm:border-[#161d18] sm:ring-1 sm:ring-black/10 overflow-hidden relative'
              : 'max-w-2xl shadow-xl'
          }`}
        >
          <ProductDetailScreen
            product={selectedProduct}
            onOpenChat={() => setIsChatOpen(true)}
            onOpenGallery={handleOpenGallery}
            onOpenWriteReview={() => setIsWriteReviewOpen(true)}
          />
        </div>
      </div>

      {/* Interactive Modals */}
      <ChatWithVendorModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        vendorName={selectedProduct.vendorName}
        stallName={selectedProduct.stall}
      />

      <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryIndex}
      />

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
        productName={selectedProduct.name}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Review } from '../../types';
// import { PRIMARY_PRODUCT } from '../../data/mockDataItems';
import { ProductDetailScreen } from '../item_page/ProductDetailScreen';
import { ChatWithVendorModal } from '../item_page/ChatWithVendorModal';
import { PhotoGalleryModal } from '../item_page/PhotoGalleryModal';
import { WriteReviewModal } from '../item_page/WriteReviewModal';
import { Smartphone, Monitor } from 'lucide-react';
import { findVendorById, mockProducts } from '../../data/mockDataTest';

interface ItemDetailsProps {
  product: Product,
  onAddToCart: (product: Product, quantity?: number, note?: string) => void,
  onOpenLiveStream: (vendorId?: string) => void;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  product,
  onAddToCart,
  onOpenLiveStream
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(product);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'responsive'>('mobile');

  const handleOpenGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };
  console.log("reach")

  console.log(product)
  const handleAddReview = (newReview: Review) => {
    setSelectedProduct((prev) => ({
      ...prev,
      reviewCount: prev.reviewCount + 1,
      // reviews: [newReview, ...(prev.reviews ?? [])],
    }));
  };
  const vendor = findVendorById(selectedProduct.vendorID)
  if (!vendor) {
    return (
      <div className="p-6 text-red-600">
        Vendor not found for this product.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#e8f0e7] flex flex-col font-sans selection:bg-[#004328] selection:text-white">


      <ProductDetailScreen
            product={product}
            onOpenChat={() => setIsChatOpen(true)}
            onOpenGallery={handleOpenGallery}
            onOpenWriteReview={() => setIsWriteReviewOpen(true)}
            onAddToCart={onAddToCart}
          />

      {/* Interactive Modals */}
      <ChatWithVendorModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        vendor={vendor}
        // stallName={vendor.location}
      />

      {/* <PhotoGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={galleryIndex}
      /> */}

      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
        productID={product.id}
      />
    </div>
  );
}

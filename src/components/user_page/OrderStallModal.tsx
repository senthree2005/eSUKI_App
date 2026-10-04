import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Vendor } from '../types';

interface OrderStallModalProps {
  vendor: Vendor;
  onClose: () => void;
  onAddToBasket: (item: { name: string; price: number; quantity: number; unit: string; vendorName: string }) => void;
}

export const OrderStallModal: React.FC<OrderStallModalProps> = ({
  vendor,
  onClose,
  onAddToBasket,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItemIds, setAddedItemIds] = useState<Set<string>>(new Set());

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [productId]: updated };
    });
  };

  const handleAddProduct = (product: { id: string; name: string; price: number; unit: string }) => {
    const qty = quantities[product.id] || 1;
    onAddToBasket({
      name: `${qty} ${product.unit} ${product.name}`,
      price: product.price * qty,
      quantity: qty,
      unit: product.unit,
      vendorName: vendor.name,
    });

    setAddedItemIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#f3fcf2] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#dce5db] max-h-[92vh] flex flex-col">
        {/* Stall Header */}
        <div className="bg-white p-4 border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={vendor.avatarUrl}
              alt={vendor.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#0d5c3a]"
            />
            <div>
              <h3 className="font-bold text-base text-[#161d18]">
                {vendor.name}
              </h3>
              <p className="text-xs text-[#707971]">
                {vendor.stallNumber} • {vendor.marketSection}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#005232] font-semibold mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d5c3a]" />
                <span>{vendor.statusText}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#edf6ec] text-[#404942] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specialty description banner */}
        <div className="bg-[#edf6ec] px-4 py-2.5 border-b border-[#e2ebe1] text-xs text-[#004328] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0d5c3a] shrink-0" />
          <p className="leading-tight truncate">
            {vendor.specialty}
          </p>
        </div>

        {/* Product Items List */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {vendor.products && vendor.products.length > 0 ? (
            vendor.products.map((prod) => {
              const qty = quantities[prod.id] || 1;
              const isAdded = addedItemIds.has(prod.id);

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#e2ebe1] shadow-2xs flex items-center justify-between gap-3 hover:border-[#0d5c3a]/30 transition-all"
                >
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#161d18] truncate">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#707971] truncate">
                      {prod.freshness}
                    </p>
                    <p className="text-sm font-bold text-[#004328] mt-1">
                      ₱{prod.price.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-gray-500">
                        / {prod.unit}
                      </span>
                    </p>
                  </div>

                  {/* Quantity & Add Action */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 bg-[#edf6ec] px-2 py-1 rounded-xl border border-[#dce5db]">
                      <button
                        onClick={() => handleQuantityChange(prod.id, -1)}
                        className="w-5 h-5 rounded bg-white text-[#0d5c3a] font-bold flex items-center justify-center hover:bg-[#dce5db] active:scale-95"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#161d18] min-w-[20px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(prod.id, 1)}
                        className="w-5 h-5 rounded bg-white text-[#0d5c3a] font-bold flex items-center justify-center hover:bg-[#dce5db] active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddProduct(prod)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                        isAdded
                          ? 'bg-[#a9f3c5] text-[#005232]'
                          : 'bg-[#0d5c3a] hover:bg-[#004328] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add (₱{(prod.price * qty).toFixed(2)})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-xs text-gray-500 py-6">
              No products currently available at this stall.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

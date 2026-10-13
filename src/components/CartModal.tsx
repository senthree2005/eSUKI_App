import React, { useState } from 'react';
import { CartItem } from '../types';
import { findProductById,findVendorById } from '../data/mockDataTest';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (orderData: {
    address: string;
    note: string;
    paymentMethod: 'COD' | 'GCash';
  }) => void;
}
/*meowk*/
/*boset*/
/*bayit*/
export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [address, setAddress] = useState('Tagum Center, Purok 4 Magugpo Poblacion');
  const [generalNote, setGeneralNote] = useState('Paki kaliskis & hiwa 3 parts');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'GCash'>('COD');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (findProductById(item.productId)?.price ?? 0) * item.quantity,
    0
  );

  const deliveryFee = subtotal >= 250 ? 0 : 30;
  const sukiDiscount = subtotal >= 200 ? 20 : 0;
  const total = Math.max(0, subtotal + deliveryFee - sukiDiscount);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onCheckout({
        address,
        note: generalNote,
        paymentMethod,
      });
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#f3fcf2] w-full max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#bfc9c0]/50 animate-in slide-in-from-bottom">
        {/* Modal Header */}
        <div className="p-4 bg-white border-b border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004328] text-[24px]">
              shopping_bag
            </span>
            <div>
              <h3 className="font-bold text-[16px] text-[#161d18]">Suki Palengke Basket</h3>
              <p className="text-[11px] text-[#707971]">Tagum Public Market Direct Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edf6ec] flex items-center justify-center text-[#404942] hover:text-[#161d18]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#edf6ec] mx-auto flex items-center justify-center text-[#004328]">
                <span className="material-symbols-outlined text-[32px]">shopping_cart</span>
              </div>
              <h4 className="font-bold text-[15px] text-[#161d18]">Way sulod imong basket</h4>
              <p className="text-[12px] text-[#404942] max-w-xs mx-auto">
                Add fresh fish from Ate Lorna, crisp gulay from Mang Toring, or hot tusok-tusok street food!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#004328] text-white rounded-xl text-[13px] font-bold"
              >
                Tan-aw ug Paliton
              </button>
            </div>
          ) : (
            <>
              {/* Promo Callout */}
              {subtotal >= 250 ? (
                <div className="bg-[#a9f3c5]/40 border border-[#226b47]/30 rounded-xl p-2.5 flex items-center gap-2 text-[#004328]">
                  <span className="material-symbols-outlined text-[20px] text-[#226b47]">
                    two_wheeler
                  </span>
                  <p className="text-[12px] font-bold">
                    Naka-avail ka sa FREE Tricycle Delivery (Orders ₱250+)!
                  </p>
                </div>
              ) : (
                <div className="bg-[#ffdea9]/50 border border-[#7d5800]/20 rounded-xl p-2.5 flex items-center justify-between text-[#6d4c00]">
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    <span>Add ₱{250 - subtotal} more for FREE Tricycle Delivery</span>
                  </div>
                  <span className="text-[11px] font-bold underline cursor-pointer" onClick={onClose}>
                    Add items
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase text-[#707971] tracking-wider">
                  Mga Palaliton ({cartItems.length})
                </span>
                {cartItems.map((item) => 
                {
                  const product = findProductById(item.productId)
                  const vendor = findVendorById(product?.vendorID ?? 'undefined')
                return (
                  <div
                    key={product?.id}
                    className="bg-white p-3 rounded-xl shadow-xs border border-[#e2ebe1] flex items-center justify-between gap-3"
                  >
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-14 h-14 rounded-lg object-cover bg-[#edf6ec] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[13px] text-[#161d18] truncate">
                        {product?.name}
                      </h4>
                      <div className="text-[11px] text-[#707971] flex items-center gap-1">
                        <span>₱{product?.price} / {product?.unit}</span>
                        <span>•</span>
                        <span className="truncate">{vendor?.name}</span>
                      </div>
                      <div className="text-[12px] font-extrabold text-[#004328] mt-0.5">
                        ₱{((product?.price ?? 0) * item.quantity).toFixed(0)}
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-1 bg-[#edf6ec] p-1 rounded-lg shrink-0">
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) {
                            onRemoveItem(product?.id ?? 'null');
                          } else {
                            onUpdateQuantity(product?.id ?? 'null', -1);
                          }
                        }}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#161d18] shadow-xs active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {item.quantity <= 1 ? 'delete' : 'remove'}
                        </span>
                      </button>
                      <span className="text-[12px] font-bold w-6 text-center text-[#161d18]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product?.id ?? 'null', 1)}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#161d18] shadow-xs active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[15px]">add</span>
                      </button>
                    </div>
                  </div>
                )})}
              </div>

              {/* Delivery Details */}
              <div className="bg-white p-3 rounded-xl border border-[#e2ebe1] space-y-2.5">
                <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#004328]">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span>Delivery Address sa Tagum</span>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#edf6ec] text-[13px] px-3 py-2 rounded-lg border border-[#bfc9c0]/40 focus:outline-none focus:border-[#004328]"
                  placeholder="Enter house #, purok, or street name..."
                />

                {/* Suki Palengke Special Instruction (e.g. gutting fish) */}
                <div className="pt-1">
                  <label className="text-[11px] font-bold text-[#707971] flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-[14px]">stylus_note</span>
                    Bilin sa Tindera (Cleaning / Slicing Note):
                  </label>
                  <input
                    type="text"
                    value={generalNote}
                    onChange={(e) => setGeneralNote(e.target.value)}
                    className="w-full bg-[#edf6ec] text-[12px] px-3 py-1.5 rounded-lg border border-[#bfc9c0]/40 focus:outline-none"
                    placeholder="e.g. Pakikaliskis, pahiwa sa 3 bahin, ihain sa dahon saging"
                  />
                </div>

                {/* Payment Option */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase text-[#707971] tracking-wider block mb-1.5">
                    Paagi sa Pagbayad
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-colors ${
                        paymentMethod === 'COD'
                          ? 'border-[#004328] bg-[#edf6ec] text-[#004328]'
                          : 'border-[#bfc9c0]/40 bg-white text-[#404942]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">payments</span>
                      <div>
                        <div className="text-[12px] font-bold">Cash on Delivery</div>
                        <div className="text-[10px] text-[#707971]">Exact cash sa Tricycle</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('GCash')}
                      className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-colors ${
                        paymentMethod === 'GCash'
                          ? 'border-[#004328] bg-[#edf6ec] text-[#004328]'
                          : 'border-[#bfc9c0]/40 bg-white text-[#404942]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px] text-blue-600">
                        account_balance_wallet
                      </span>
                      <div>
                        <div className="text-[12px] font-bold">GCash Express</div>
                        <div className="text-[10px] text-[#707971]">Instant digital Suki</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="bg-white p-3 rounded-xl border border-[#e2ebe1] space-y-1.5 text-[12px]">
                <div className="flex justify-between text-[#404942]">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[#404942]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">electric_rickshaw</span>
                    Tricycle Express Dispatch
                  </span>
                  <span>{deliveryFee === 0 ? <strong className="text-[#004328]">FREE</strong> : `₱${deliveryFee}`}</span>
                </div>
                {sukiDiscount > 0 && (
                  <div className="flex justify-between text-[#7d5800]">
                    <span>Suki Loyalty Voucher</span>
                    <span>-₱{sukiDiscount}</span>
                  </div>
                )}
                <div className="border-t border-[#e2ebe1] pt-2 flex justify-between items-baseline font-bold text-[15px] text-[#004328]">
                  <span>Total Bayranan</span>
                  <span>₱{total.toFixed(0)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-white border-t border-[#e2ebe1] flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#707971] uppercase font-bold">Total</span>
              <span className="text-[18px] font-extrabold text-[#004328] leading-tight">
                ₱{total.toFixed(0)}
              </span>
            </div>
            <button
              disabled={isProcessing}
              onClick={handlePlaceOrder}
              className="flex-1 h-12 bg-[#febb2d] hover:bg-[#ffdea9] active:scale-[0.98] text-[#271900] font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
              <span>
                {isProcessing ? 'Gapadala ug Tricycle...' : 'I-Order Na (Diretso Tindera)'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

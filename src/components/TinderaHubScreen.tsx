import React, { useState, useRef } from 'react';
import { Product, Order, Driver, CartItem, StockState, VendorCategory } from '../types';
import { findCustomerById, findProductById } from '../data/mockDataTest';

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1534942810058-25f0e139b6fc?auto=format&fit=crop&w=600&q=80';

interface TinderaHubScreenProps {
  products: Product[];
  orders: Order[];
  drivers: Driver[];
  onStartLiveStream: () => void;
  onOpenNotebook: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onToggleStock: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProductPrice?: (
    productId: string,
    newPrice: number,
    originalPrice?: number,
    isLiveSpecial?: boolean
  ) => void;
  onUpdateProduct?: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

export const TinderaHubScreen: React.FC<TinderaHubScreenProps> = ({
  products,
  orders,
  drivers,
  onStartLiveStream,
  onOpenNotebook,
  onUpdateOrderStatus,
  onToggleStock,
  onAddProduct,
  onUpdateProductPrice,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecognizedItem, setVoiceRecognizedItem] = useState<{
    name: string;
    localName: string;
    weight: string;
    price: number;
    unit: string;
  } | null>(null);
  const [handoverToast, setHandoverToast] = useState<string | null>(null);

  // Add Item Modal State
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemLocalName, setNewItemLocalName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('180');
  const [newItemOriginalPrice, setNewItemOriginalPrice] = useState('200');
  const [newItemUnit, setNewItemUnit] = useState('kilo');
  const [newItemCategory, setNewItemCategory] = useState<VendorCategory>('Seafood');
  const [newItemStockState, setNewItemStockState] = useState<StockState>('in_stock');
  const [newItemStockRemaining, setNewItemStockRemaining] = useState('10 kg available');
  const [newItemTag, setNewItemTag] = useState('Bag-ong Latag');
  const [newItemIsLiveSpecial, setNewItemIsLiveSpecial] = useState(false);
  const [newItemImage, setNewItemImage] = useState<string>('');
  const [selectedImageFileName, setSelectedImageFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newItemSubtitle, setNewItemSubtitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  // Handle Image Upload from Local Directory
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setNewItemImage(reader.result);
        showToast(`Hulagway "${file.name}" na-load gikan sa imong device!`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Dedicated Price Editing Feature State
  const [priceEditingProduct, setPriceEditingProduct] = useState<Product | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<number>(0);
  const [editOriginalPriceInput, setEditOriginalPriceInput] = useState<number>(0);
  const [editIsLiveSpecial, setEditIsLiveSpecial] = useState<boolean>(false);

  // Delete Product Confirmation State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    if (onDeleteProduct) {
      onDeleteProduct(productToDelete.id);
    }
    showToast(`"${productToDelete.name}" natangtang na sa Live Latag!`);
    setProductToDelete(null);
  };

  // Full Edit Product Modal State
  const [fullEditProduct, setFullEditProduct] = useState<Product | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Trigger feedback toast
  const showToast = (message: string) => {
    setHandoverToast(message);
    setTimeout(() => setHandoverToast(null), 3000);
  };

  // Voice recording simulation for busy palengke vendors
  const handleToggleVoice = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      return;
    }

    setIsRecordingVoice(true);
    setVoiceRecognizedItem(null);

    setTimeout(() => {
      setIsRecordingVoice(false);
      setVoiceRecognizedItem({
        name: 'Bangus Dagupan Fresh Latag',
        localName: 'Presko Bangus Dagupan',
        weight: '5 kg',
        price: 180,
        unit: 'kilo',
      });
      showToast('Narekord ang tingog! I-click ang Publish o bag-oha ang presyo.');
    }, 1800);
  };

  const handlePublishVoiceItem = () => {
    if (!voiceRecognizedItem) return;

    const newProd: Product = {
      id: `prod-voice-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      vendorID: 'vendor-lorna',
      name: voiceRecognizedItem.name,
      localName: voiceRecognizedItem.localName,
      price: voiceRecognizedItem.price,
      originalPrice: voiceRecognizedItem.price + 20,
      unit: voiceRecognizedItem.unit,
      quantity: 1,
      minQuantity: 1,
      step: 1,
      image: DEFAULT_PRODUCT_IMAGE,
      stockState: 'in_stock',
      stockRemaining: `${voiceRecognizedItem.weight} remaining`,
      isLiveSpecial: true,
      category: 'Seafood',
      tag: 'Voice Added',
      subtitle: `${voiceRecognizedItem.name} live from Stall #42`,
      unitText: `per ${voiceRecognizedItem.unit}`,
      description: 'Bag-ong abot presko gikan sa bagsakan, dali ra limpyohan.',
      reviewCount: 0,
    };

    onAddProduct(newProd);
    setVoiceRecognizedItem(null);
    showToast('Bag-ong tinda nadugang sa Live Latag gikan sa Voice Assistant!');
  };

  // Handle Manual Add Item
  const handleAddNewManualItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newItemName.trim()) return;

    const numericPrice = Math.max(0, parseFloat(newItemPrice) || 100);
    const numericOriginalPrice = newItemOriginalPrice
      ? Math.max(numericPrice, parseFloat(newItemOriginalPrice) || numericPrice)
      : undefined;

    const finalImage = newItemImage || DEFAULT_PRODUCT_IMAGE;

    const newProd: Product = {
      id: `prod-manual-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      vendorID: 'vendor-lorna',
      name: newItemName.trim(),
      localName: newItemLocalName.trim() || undefined,
      price: numericPrice,
      originalPrice: numericOriginalPrice,
      unit: newItemUnit.trim() || 'kilo',
      quantity: 1,
      minQuantity: newItemUnit === 'kilo' ? 0.5 : 1,
      step: newItemUnit === 'kilo' ? 0.5 : 1,
      image: finalImage,
      heroImage: finalImage,
      stockState: newItemStockState,
      stockRemaining: newItemStockRemaining.trim() || 'Available',
      isLiveSpecial: newItemIsLiveSpecial,
      category: newItemCategory,
      tag: newItemTag.trim() || 'Bag-ong Latag',
      subtitle:
        newItemSubtitle.trim() ||
        `${newItemName.trim()} presko gikan sa Stall #42 ni Ate Lorna`,
      unitText: `per ${newItemUnit}`,
      description:
        newItemDescription.trim() ||
        'Lab-as ug limpyo nga tinda. Pwede hangyo-on nga limpyohan o hiwa-on para sa imo.',
      reviewCount: 0,
    };

    onAddProduct(newProd);

    // Reset Form
    setNewItemName('');
    setNewItemLocalName('');
    setNewItemPrice('180');
    setNewItemOriginalPrice('200');
    setNewItemUnit('kilo');
    setNewItemCategory('Seafood');
    setNewItemStockState('in_stock');
    setNewItemStockRemaining('10 kg available');
    setNewItemTag('Bag-ong Latag');
    setNewItemIsLiveSpecial(false);
    setNewItemImage('');
    setSelectedImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setNewItemSubtitle('');
    setNewItemDescription('');
    setShowAddItemModal(false);

    showToast(`Nadugang na ang bag-ong item: ${newProd.name} (₱${newProd.price}/${newProd.unit})!`);
  };

  // Open Quick Price Editor
  const openPriceEditor = (product: Product) => {
    setPriceEditingProduct(product);
    setEditPriceInput(product.price);
    setEditOriginalPriceInput(product.originalPrice || product.price);
    setEditIsLiveSpecial(!!product.isLiveSpecial);
  };

  // Save New Price
  const handleSavePriceEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceEditingProduct) return;

    const finalPrice = Math.max(1, Number(editPriceInput) || priceEditingProduct.price);
    const finalOriginalPrice =
      editOriginalPriceInput > finalPrice ? editOriginalPriceInput : undefined;

    if (onUpdateProductPrice) {
      onUpdateProductPrice(
        priceEditingProduct.id,
        finalPrice,
        finalOriginalPrice,
        editIsLiveSpecial
      );
    } else if (onUpdateProduct) {
      onUpdateProduct({
        ...priceEditingProduct,
        price: finalPrice,
        originalPrice: finalOriginalPrice,
        isLiveSpecial: editIsLiveSpecial,
        updatedAt: new Date().toISOString(),
      });
    }

    showToast(
      `Presyo sa "${priceEditingProduct.name}" gi-usab gikan ₱${priceEditingProduct.price} ngadto sa ₱${finalPrice}/${priceEditingProduct.unit}!`
    );
    setPriceEditingProduct(null);
  };

  // Price adjuster helper
  const adjustEditPrice = (delta: number) => {
    setEditPriceInput((prev) => Math.max(1, prev + delta));
  };

  // Filtered Ate Lorna Products
  const vendorProducts = products.filter((p) => {
    const isVendorMatch =
      p.vendorID === 'vendor-lorna' || //Change this later
      p.vendorID === 'Ate Lorna' || //Change this later
      !p.vendorID;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.localName && p.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat =
      categoryFilter === 'all' ||
      p.category.toLowerCase() === categoryFilter.toLowerCase();
    return isVendorMatch && matchesSearch && matchesCat;
  });

  const activeOrders = orders.filter(
    (o) => o.status === 'preparing' || o.status === 'ready'
  );



  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-lg mx-auto">
      {/* Vendor Header & Status Banner */}
      <div className="px-4 pt-1">
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#004328]/20"
                alt="Ate Lorna portrait"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#226b47] ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-[16px] text-[#161d18]">
                  Ate Lorna's Fish Stall
                </h1>
                <span className="material-symbols-outlined text-[#004328] text-[18px] material-symbols-fill">
                  verified
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#226b47] animate-pulse"></span>
                <span className="text-[11px] font-bold text-[#226b47]">
                  Online &amp; Selling • Stall #42 Wet Section
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="Add Item Fast"
              onClick={() => setShowAddItemModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-[#004328] text-white flex items-center gap-1 text-[11px] font-bold shadow-xs hover:bg-[#0d5c3a] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span> Item</span>
            </button>
            <button
              aria-label="Stall Settings"
              onClick={() => {
                showToast('Stall #42 Tagum wet market settings updated!');
              }}
              className="w-9 h-9 rounded-full bg-[#edf6ec] flex items-center justify-center text-[#404942] hover:text-[#161d18] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Market Stats */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-2">
          {/* Sales */}
          <div className="bg-white p-3 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e2ebe1]">
            <div className="flex items-center justify-between text-[#404942] mb-1">
              <span className="text-[10px] uppercase tracking-wide font-extrabold">
                Today's Sales
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#004328]">
                payments
              </span>
            </div>
            <div>
              <span className="text-[18px] font-extrabold text-[#004328] block leading-tight">
                ₱4,820
              </span>
              <span className="text-[10px] font-bold text-[#226b47] flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                +18% suki
              </span>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white p-3 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e2ebe1]">
            <div className="flex items-center justify-between text-[#404942] mb-1">
              <span className="text-[10px] uppercase tracking-wide font-extrabold">
                Orders
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#7d5800]">
                receipt_long
              </span>
            </div>
            <div>
              <span className="text-[18px] font-extrabold text-[#161d18] block leading-tight">
                {orders.length}
              </span>
              <span className="text-[10px] text-[#707971] mt-0.5 block">
                {activeOrders.length} active
              </span>
            </div>
          </div>

          {/* Live Suki */}
          <div className="bg-white p-3 rounded-2xl flex flex-col justify-between shadow-xs border border-[#e2ebe1]">
            <div className="flex items-center justify-between text-[#404942] mb-1">
              <span className="text-[10px] uppercase tracking-wide font-extrabold">
                Live Suki
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#9a2300]">
                group
              </span>
            </div>
            <div>
              <span className="text-[18px] font-extrabold text-[#9a2300] block leading-tight">
                310
              </span>
              <span className="text-[10px] font-bold text-[#226b47] flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[12px]">sensors</span>
                Watching
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Big Call-To-Action: Go Live */}
      <div className="px-4">
        <div className="relative overflow-hidden bg-[#004328] text-white rounded-2xl p-4 shadow-md">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9a2300] text-white text-[10px] font-extrabold">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                HIGH DEMAND
              </span>
              <span className="text-[11px] font-bold text-[#8ed6aa]">
                Morning Peak Rush • Tagum City
              </span>
            </div>

            <div>
              <h2 className="text-[18px] font-extrabold leading-tight text-white">
                Broadcasting Live Latag
              </h2>
              <p className="text-[12px] text-[#dce5db] mt-0.5">
                Showcase your fresh bangus catch directly to 310+ Tagum suki waiting online right now.
              </p>
            </div>

            <button
              onClick={onStartLiveStream}
              className="w-full h-12 bg-[#febb2d] hover:bg-[#ffdea9] active:scale-[0.98] text-[#271900] text-[13px] font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md mt-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px] text-[#711700] animate-pulse material-symbols-fill">
                videocam
              </span>
              <span>START LIVE LATAG STREAM</span>
            </button>
          </div>

          {/* Decorative background shape */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#0d5c3a]/50 pointer-events-none"></div>
        </div>
      </div>

      {/* Quick Voice & Messenger AI Lister (Bisaya First) */}
      <div className="px-4">
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e2ebe1] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004328] text-[22px]">
                record_voice_over
              </span>
              <div>
                <h2 className="font-bold text-[14px] text-[#161d18]">
                  Voice Listing Assistant
                </h2>
                <p className="text-[11px] text-[#707971]">
                  Busy wet hands? Speak item and price in Bisaya
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#edf6ec] text-[#004328] font-extrabold text-[10px]">
              SUKI AI
            </span>
          </div>

          {/* Voice Interaction Card */}
          <div className="bg-[#edf6ec] p-3 rounded-xl space-y-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleVoice}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-md shrink-0 cursor-pointer ${
                  isRecordingVoice
                    ? 'bg-[#9a2300] text-white animate-pulse'
                    : 'bg-[#004328] hover:bg-[#0d5c3a] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isRecordingVoice ? 'graphic_eq' : 'mic'}
                </span>
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] font-extrabold text-[#004328]">
                    {isRecordingVoice
                      ? 'Naminaw sa Bisaya / Tagalog...'
                      : 'Pindota ang mic para mosulti'}
                  </span>
                  <span className="text-[10px] text-[#707971]">Halimbawa:</span>
                </div>
                <p className="text-[11px] text-[#404942] italic truncate">
                  “Naay bag-ong abot 5 ka kilo bangus tag 180 kada kilo”
                </p>
              </div>
            </div>

            {/* AI Extracted Item Preview */}
            {voiceRecognizedItem && (
              <div className="bg-white p-3 rounded-lg flex items-center justify-between border border-[#bfc9c0]/50 animate-in fade-in gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#226b47] text-[18px]">
                      check_circle
                    </span>
                    <span className="text-[12px] font-bold text-[#161d18] truncate">
                      {voiceRecognizedItem.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#404942] mt-0.5">
                    {voiceRecognizedItem.weight} • <span className="font-extrabold text-[#004328]">₱{voiceRecognizedItem.price}/{voiceRecognizedItem.unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setNewItemName(voiceRecognizedItem.name);
                      setNewItemPrice(String(voiceRecognizedItem.price));
                      setShowAddItemModal(true);
                    }}
                    className="px-2 py-1 bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#004328] rounded-lg text-[10px] font-bold"
                  >
                    Edit Price
                  </button>
                  <button
                    onClick={handlePublishVoiceItem}
                    className="px-3 py-1 bg-[#226b47] hover:bg-[#004328] text-white rounded-lg text-[11px] font-bold shadow-xs cursor-pointer"
                  >
                    Publish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dispatch & Orders Queue */}
      <div className="px-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="font-bold text-[16px] text-[#161d18]">
              Dispatch &amp; Orders Queue
            </h2>
            <span className="w-5 h-5 rounded-full bg-[#febb2d] text-[#271900] flex items-center justify-center text-[10px] font-extrabold">
              {activeOrders.length}
            </span>
          </div>
          <button
            onClick={onOpenNotebook}
            className="text-[11px] font-bold text-[#004328] hover:underline cursor-pointer"
          >
            Suki Notebook &amp; History →
          </button>
        </div>

        {/* Order Cards */}
        {orders.map((order) => {
          const assignedDriver = drivers.find((d) => d.id === order.driverId);
          return (
            <div
              key={order.id}
              className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e2ebe1] space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-[13px] ${
                      order.status === 'ready'
                        ? 'bg-[#a9f3c5] text-[#002111]'
                        : order.status === 'delivering'
                        ? 'bg-[#febb2d]/40 text-[#6d4c00]'
                        : 'bg-[#edf6ec] text-[#404942]'
                    }`}
                  >
                    #{order.id.slice(-2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[14px] text-[#161d18]">
                        Order #{order.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          order.status === 'ready'
                            ? 'bg-[#ffdea9] text-[#6d4c00]'
                            : order.status === 'delivering'
                            ? 'bg-[#a9f3c5] text-[#004328]'
                            : 'bg-[#dce5db] text-[#404942]'
                        }`}
                      >
                        {order.status === 'ready'
                          ? 'Ready for Pickup'
                          : order.status === 'delivering'
                          ? 'On Tricycle'
                          : 'Preparing'}
                      </span>
                    </div>

                    {/*Change this later*/}
                    <span className="text-[11px] text-[#707971] line-clamp-1">
                      Suki: {order.customerId}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-[15px] text-[#004328]">
                  ₱{order.totalPrice}
                </span>
              </div>

              {/* Order Items Preview */}
              <div className="p-2.5 bg-[#edf6ec] rounded-xl text-[#161d18] space-y-1">
                {order.orders && order.orders.length > 0 ? (
                  <div className="text-[12px] font-semibold text-[#161d18]">
                    {order.orders.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center py-0.5">
                        <span>
                          • {findProductById(it.productId)?.name} ({it.quantity} {findProductById(it.productId)?.unit})
                        </span>
                        <span className="text-[11px] text-[#707971]">
                          ₱{(findProductById(it.productId)?.price ?? 0) * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[12px] font-semibold text-[#161d18]">
                    • Fresh Seafood Latag Catch (Assorted)
                  </div>
                )}

                {order.specialInstructions && (
                  <div className="text-[#711700] font-medium text-[11px] bg-[#fff5f2] p-1.5 rounded-lg border border-[#ffcfc3]/50">
                    <span className="font-bold">Suki Request:</span> “{order.specialInstructions}”
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-[#404942] pt-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#226b47]">
                      electric_rickshaw
                    </span>
                    {/* {assignedDriver ? assignedDriver.name : 'Unassigned Rider'} (ETA: {assignedDriver?.etaMinutes || 5}m) */}
                    {assignedDriver ? assignedDriver.name : 'Unassigned Rider'} (ETA: 5m)
                  </span>
                  <span className="text-[10px] font-bold text-[#004328] bg-white px-2 py-0.5 rounded-md border border-[#e2ebe1]">
                    {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Tindera Action Buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                {order.status === 'ready' ? (
                  <button
                    onClick={() => {
                      onUpdateOrderStatus(order.id, 'delivering');
                      showToast(
                        `Nahatag na ang Order #${order.id} kang ${
                          assignedDriver?.name ?? 'Driver'
                        }!`
                      );
                    }}
                    className="flex-1 h-10 bg-[#004328] hover:bg-[#0d5c3a] active:scale-95 text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      handshake
                    </span>
                    <span>
                      Hand Over to {assignedDriver?.name?.split(' ')[1] || 'Driver'}
                    </span>
                  </button>
                ) : order.status === 'delivering' ? (
                  <div className="flex-1 h-10 bg-[#e8f0e7] text-[#004328] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                    <span>Dispatched via {assignedDriver?.name || 'Tricycle'}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onUpdateOrderStatus(order.id, 'ready');
                      showToast(`Order #${order.id} gitimbang ug andam na para kuhaon!`);
                    }}
                    className="flex-1 h-10 bg-[#e2ebe1] hover:bg-[#a9f3c5] text-[#004328] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#226b47]">
                      scale
                    </span>
                    <span>Weighed &amp; Ready</span>
                  </button>
                )}

                <button
                  aria-label="Call Driver"
                  onClick={() => {
                    showToast(
                      `Gitawag si ${assignedDriver?.name || 'Driver'} (${assignedDriver?.phone || '0917-555-8821'})...`
                    );
                  }}
                  className="h-10 px-3 bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#161d18] rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Contact Dispatcher/Driver"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#004328]">
                    call
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manage Live Catalog (With Add Item & Price Editing Feature) */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-[16px] text-[#161d18]">
                Live Latag Catalog
              </h2>
              <span className="text-[11px] font-extrabold bg-[#edf6ec] text-[#004328] px-2 py-0.5 rounded-full">
                {vendorProducts.length} items
              </span>
            </div>
            <p className="text-[11px] text-[#707971]">
              Add products, toggle stock, or change prices on the fly
            </p>
          </div>

          {/* MAIN BUTTON: ADD NEW ITEM */}
          <button
            onClick={() => setShowAddItemModal(true)}
            className="px-3.5 py-2 bg-[#004328] hover:bg-[#0d5c3a] text-white rounded-xl text-[12px] font-extrabold flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Add New Item</span>
          </button>
        </div>

        {/* Search & Filter pills */}
        <div className="space-y-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#707971] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pangitaa sa listahan (e.g. Bangus, Tuna, Hipon)..."
              className="w-full bg-white pl-9 pr-3 py-2 rounded-xl text-[12px] border border-[#e2ebe1] focus:outline-none focus:ring-1 focus:ring-[#004328]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-[#707971] text-[14px]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {['all', 'Seafood', 'Meat', 'Vegetables', 'Fruits'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#004328] text-white'
                    : 'bg-white text-[#404942] border border-[#e2ebe1] hover:bg-[#edf6ec]'
                }`}
              >
                {cat === 'all' ? 'All Items' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-xs border border-[#e2ebe1] overflow-hidden divide-y divide-[#e2ebe1]">
          {vendorProducts.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <span className="material-symbols-outlined text-[#707971] text-[40px]">
                inventory_2
              </span>
              <p className="text-[13px] font-bold text-[#161d18]">
                Walay nakita nga produkto
              </p>
              <p className="text-[11px] text-[#707971]">
                Pindota ang "Add New Item" para makadugang sa imong Live Latag.
              </p>
              <button
                onClick={() => setShowAddItemModal(true)}
                className="px-4 py-2 bg-[#004328] text-white rounded-xl text-[12px] font-bold inline-flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Item Karon</span>
              </button>
            </div>
          ) : (
            vendorProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 flex flex-col gap-2.5 hover:bg-[#f3fcf2]/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        className={`w-14 h-14 rounded-xl object-cover ring-1 ring-[#e2ebe1] ${
                          prod.stockState === 'out_of_stock'
                            ? 'grayscale opacity-60'
                            : ''
                        }`}
                        alt={prod.name}
                        src={prod.image}
                      />
                      {prod.isLiveSpecial && (
                        <span className="absolute -top-1.5 -left-1.5 bg-[#9a2300] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                          Special
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-[14px] text-[#161d18] truncate">
                          {prod.name}
                        </h3>
                        {prod.tag && (
                          <span className="bg-[#edf6ec] text-[#004328] text-[9px] font-extrabold px-1.5 py-0.2 rounded-md shrink-0">
                            {prod.tag}
                          </span>
                        )}
                      </div>

                      {prod.localName && (
                        <span className="text-[11px] text-[#556057] block truncate italic">
                          "{prod.localName}"
                        </span>
                      )}

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-[#707971]">
                          {prod.stockRemaining || 'Available'}
                        </span>
                        <span className="text-[11px] text-[#a0aaa1]">•</span>
                        <span className="text-[11px] text-[#707971]">
                          {prod.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock state badge toggle */}
                  <button
                    onClick={() => onToggleStock(prod.id)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 active:scale-95 shadow-xs cursor-pointer ${
                      prod.stockState === 'in_stock'
                        ? 'bg-[#226b47] text-white'
                        : prod.stockState === 'low_stock'
                        ? 'bg-[#febb2d] text-[#271900]'
                        : 'bg-[#dce5db] text-[#404942]'
                    }`}
                    title="Tap to change stock status (In Stock → Low Stock → Sold Out)"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        prod.stockState === 'in_stock'
                          ? 'bg-white'
                          : prod.stockState === 'low_stock'
                          ? 'bg-[#7d5800]'
                          : 'bg-[#707971]'
                      }`}
                    ></span>
                    <span>
                      {prod.stockState === 'in_stock'
                        ? 'IN STOCK'
                        : prod.stockState === 'low_stock'
                        ? 'LOW STOCK'
                        : 'SOLD OUT'}
                    </span>
                  </button>
                </div>

                {/* PRICE EDITING FEATURE ROW: Visual Price + Dedicated "Edit Price" button */}
                <div className="flex items-center justify-between pt-1.5 border-t border-[#edf6ec]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[16px] font-extrabold text-[#004328]">
                      ₱{prod.price}
                    </span>
                    <span className="text-[11px] font-medium text-[#707971]">
                      /{prod.unit}
                    </span>
                    {prod.originalPrice && prod.originalPrice > prod.price && (
                      <span className="text-[11px] text-[#9a2300] line-through ml-1 font-semibold">
                        ₱{prod.originalPrice}
                      </span>
                    )}
                    {prod.originalPrice && prod.originalPrice > prod.price && (
                      <span className="text-[9px] font-extrabold text-[#9a2300] bg-[#ffdad1] px-1 py-0.2 rounded">
                        -₱{prod.originalPrice - prod.price} OFF
                      </span>
                    )}
                  </div>

                  {/* Fast Price Edit Action Button */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openPriceEditor(prod)}
                      className="px-3 py-1.5 bg-[#edf6ec] hover:bg-[#004328] hover:text-white text-[#004328] rounded-xl text-[11px] font-extrabold flex items-center gap-1 active:scale-95 transition-all border border-[#bfc9c0]/50 shadow-2xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        edit
                      </span>
                      <span>Change Price</span>
                    </button>

                    {/* Quick Stepper: +10 / -10 instant shortcut
                    <button
                      onClick={() => {
                        const newPrice = Math.max(1, prod.price - 10);
                        if (onUpdateProductPrice) {
                          onUpdateProductPrice(prod.id, newPrice, prod.originalPrice);
                        } else if (onUpdateProduct) {
                          onUpdateProduct({ ...prod, price: newPrice });
                        }
                        showToast(`₱10 discount gihatag sa ${prod.name}! Bag-ong presyo: ₱${newPrice}`);
                      }}
                      className="w-7 h-7 bg-white hover:bg-[#edf6ec] text-[#404942] rounded-lg border border-[#e2ebe1] flex items-center justify-center text-[11px] font-bold active:scale-90"
                      title="Quick -₱10 discount"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => {
                        const newPrice = prod.price + 10;
                        if (onUpdateProductPrice) {
                          onUpdateProductPrice(prod.id, newPrice, prod.originalPrice);
                        } else if (onUpdateProduct) {
                          onUpdateProduct({ ...prod, price: newPrice });
                        }
                        showToast(`Presyo sa ${prod.name} misaka ug ₱10. Bag-ong presyo: ₱${newPrice}`);
                      }}
                      className="w-7 h-7 bg-white hover:bg-[#edf6ec] text-[#404942] rounded-lg border border-[#e2ebe1] flex items-center justify-center text-[11px] font-bold active:scale-90"
                      title="Quick +₱10 adjustment"
                    >
                      +10
                    </button> */}

                    {/* Delete Product Button */}
                    <button
                      onClick={() => setProductToDelete(prod)}
                      className="w-7 h-7 bg-[#fff0eb] hover:bg-[#ba2e06] text-[#ba2e06] hover:text-white rounded-lg border border-[#ffcfc3] flex items-center justify-center text-[11px] font-bold active:scale-90 transition-colors cursor-pointer ml-0.5"
                      title={`Tangtanga ang ${prod.name} sa Live Latag (Delete)`}
                      aria-label={`Delete ${prod.name}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Suki Notebook Ledger Shortcut */}
      <div className="px-4">
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffdea9] flex items-center justify-center text-[#271900]">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-[#161d18]">
                Ate Lorna's Suki Listahan
              </h3>
              <p className="text-[11px] text-[#707971]">
                48 loyal repeat customers • Tagum City Suki
              </p>
            </div>
          </div>
          <button
            onClick={onOpenNotebook}
            className="px-3 py-1.5 rounded-xl bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#004328] text-[11px] font-bold transition-colors cursor-pointer"
          >
            Open Notebook
          </button>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {handoverToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom max-w-md mx-auto pointer-events-none">
          <div className="bg-[#004328] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#a9f3c5]/30">
            <span className="material-symbols-outlined text-[#a9f3c5] text-[20px]">
              check_circle
            </span>
            <span className="text-[12px] font-bold">{handoverToast}</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. DEDICATED PRICE EDITING MODAL (CHANGE THE PRICE)      */}
      {/* ======================================================== */}
      {priceEditingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4 border border-[#e2ebe1]">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ebe1]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#edf6ec] text-[#004328] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">price_change</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[15px] text-[#161d18]">
                    Bag-oha ang Presyo (Edit Price)
                  </h3>
                  <span className="text-[11px] text-[#707971]">
                    {priceEditingProduct.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPriceEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-[#edf6ec] hover:bg-[#e2ebe1] flex items-center justify-center text-[#404942]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Current Product Quick Summary */}
            <div className="flex items-center gap-3 p-2.5 bg-[#edf6ec] rounded-2xl">
              <img
                src={priceEditingProduct.image}
                alt={priceEditingProduct.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#707971]">
                  Current Latag Price:
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] font-extrabold text-[#004328]">
                    ₱{priceEditingProduct.price}
                  </span>
                  <span className="text-[11px] text-[#404942]">
                    / {priceEditingProduct.unit}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSavePriceEdit} className="space-y-4">
              {/* Big Price Input */}
              <div>
                <label className="text-[11px] font-extrabold text-[#404942] block mb-1.5 uppercase">
                  Bag-ong Presyo kada {priceEditingProduct.unit} (₱)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-[20px] font-extrabold text-[#004328]">
                    ₱
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={editPriceInput || ''}
                    onChange={(e) => setEditPriceInput(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#f4f7f4] pl-9 pr-4 py-2.5 rounded-2xl text-[20px] font-extrabold text-[#161d18] focus:outline-none focus:ring-2 focus:ring-[#004328] border border-[#dce5db]"
                    required
                  />
                </div>
              </div>

              {/* Quick Stepper Adjustment Chips */}
              <div>
                <label className="text-[10px] font-bold text-[#707971] block mb-1">
                  Quick Stepper (+/- Presyo):
                </label>
                <div className="grid grid-cols-6 gap-1.5">
                  {[-20, -10, -5, +5, +10, +20].map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => adjustEditPrice(delta)}
                      className={`py-1.5 rounded-xl text-[11px] font-extrabold transition-all active:scale-90 border ${
                        delta < 0
                          ? 'bg-[#fff0eb] text-[#9a2300] border-[#ffcfc3] hover:bg-[#ffd9cc]'
                          : 'bg-[#edf6ec] text-[#004328] border-[#a9f3c5] hover:bg-[#a9f3c5]'
                      }`}
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Suki Discount Presets */}
              <div>
                <label className="text-[10px] font-bold text-[#707971] block mb-1">
                  Suki Promo Presets:
                </label>
                <div className="flex gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      const discounted = Math.round(priceEditingProduct.price * 0.95);
                      setEditPriceInput(discounted);
                      setEditOriginalPriceInput(priceEditingProduct.price);
                    }}
                    className="flex-1 py-1.5 bg-[#f4f7f4] hover:bg-[#edf6ec] border border-[#e2ebe1] text-[#004328] rounded-xl font-bold"
                  >
                    5% Off
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const discounted = Math.round(priceEditingProduct.price * 0.9);
                      setEditPriceInput(discounted);
                      setEditOriginalPriceInput(priceEditingProduct.price);
                    }}
                    className="flex-1 py-1.5 bg-[#f4f7f4] hover:bg-[#edf6ec] border border-[#e2ebe1] text-[#004328] rounded-xl font-bold"
                  >
                    10% Off
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const discounted = Math.round(priceEditingProduct.price * 0.85);
                      setEditPriceInput(discounted);
                      setEditOriginalPriceInput(priceEditingProduct.price);
                    }}
                    className="flex-1 py-1.5 bg-[#f4f7f4] hover:bg-[#edf6ec] border border-[#e2ebe1] text-[#004328] rounded-xl font-bold"
                  >
                    15% Off
                  </button>
                </div>
              </div>

              {/* Original Price / Suki Discount Toggle */}
              <div className="space-y-2 pt-1 border-t border-[#e2ebe1]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#404942]">
                    I-pakita ang Original Price (Strike-through)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 200"
                    value={editOriginalPriceInput || ''}
                    onChange={(e) =>
                      setEditOriginalPriceInput(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    className="w-24 bg-[#f4f7f4] px-2.5 py-1 rounded-xl text-[12px] font-bold text-[#707971] border border-[#dce5db] focus:outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 p-2 bg-[#fff7e6] rounded-xl border border-[#ffe099] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsLiveSpecial}
                    onChange={(e) => setEditIsLiveSpecial(e.target.checked)}
                    className="w-4 h-4 rounded text-[#004328] accent-[#004328]"
                  />
                  <div className="text-[11px]">
                    <span className="font-extrabold text-[#7d5800] block">
                      Mark as LIVE SPECIAL / Suki Flash Sale
                    </span>
                    <span className="text-[#8c6700]">
                      Highlight this price on customer screens &amp; live stream
                    </span>
                  </div>
                </label>
              </div>

              {/* Price Preview difference banner */}
              {editPriceInput !== priceEditingProduct.price && (
                <div className="p-2.5 rounded-xl bg-[#edf6ec] border border-[#a9f3c5] text-[11px] flex items-center justify-between">
                  <span className="font-bold text-[#004328]">Price Difference:</span>
                  <span className="font-extrabold text-[#004328]">
                    ₱{priceEditingProduct.price} → ₱{editPriceInput} (
                    {editPriceInput > priceEditingProduct.price ? '+' : ''}
                    ₱{editPriceInput - priceEditingProduct.price})
                  </span>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setPriceEditingProduct(null)}
                  className="w-1/3 h-11 bg-[#f4f7f4] hover:bg-[#e2ebe1] text-[#404942] font-bold rounded-2xl text-[12px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-[#004328] hover:bg-[#0d5c3a] text-white font-extrabold rounded-2xl text-[13px] flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Save New Price</span>
                </button>
              </div>

              {/* Option to Delete Product from Price Editor */}
              <div className="pt-2 border-t border-[#edf6ec] text-center">
                <button
                  type="button"
                  onClick={() => {
                    const toDelete = priceEditingProduct;
                    setPriceEditingProduct(null);
                    setProductToDelete(toDelete);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ba2e06] hover:text-[#9a2300] hover:underline cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Tangtanga kini nga item sa Latag (Delete)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ADD NEW ITEM MODAL (MATCHES FULL PRODUCT INTERFACE)   */}
      {/* ======================================================== */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 w-full max-w-md shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ebe1] sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#004328] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-[15px] text-[#161d18]">
                    Add New Item sa Stall #42 Latag
                  </h3>
                  <span className="text-[11px] text-[#707971]">
                    Live Latag catalog entry for suki buyers
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="w-8 h-8 rounded-full bg-[#edf6ec] hover:bg-[#e2ebe1] flex items-center justify-center text-[#404942]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddNewManualItem} className="space-y-3.5">
              {/* Product Name & Local Name */}
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] font-extrabold text-[#404942] block mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="e.g. Maya-maya Red Snapper Fresh Catch"
                    className="w-full bg-[#edf6ec] px-3.5 py-2.5 rounded-xl text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#004328]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#707971] block mb-1">
                    Local Name (Bisaya / Tagalog)
                  </label>
                  <input
                    type="text"
                    value={newItemLocalName}
                    onChange={(e) => setNewItemLocalName(e.target.value)}
                    placeholder="e.g. Labungan / Maya-maya Dagat"
                    className="w-full bg-[#edf6ec] px-3.5 py-2 rounded-xl text-[12px] focus:outline-none focus:ring-1 focus:ring-[#004328]"
                  />
                </div>
              </div>

              {/* Price & Original Price with Controls */}
              <div className="p-3 bg-[#edf6ec] rounded-2xl space-y-2.5 border border-[#bfc9c0]/50">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-[#004328] uppercase">
                    Pricing &amp; Unit
                  </span>
                  <span className="text-[10px] text-[#707971]">
                    Adjustable anytime
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-[#404942] block mb-1">
                      Selling Price (₱) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="w-full bg-white px-2.5 py-2 rounded-xl text-[14px] font-extrabold text-[#004328] border border-[#dce5db] focus:outline-none focus:ring-1 focus:ring-[#004328]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#707971] block mb-1">
                      Original Price (₱)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newItemOriginalPrice}
                      onChange={(e) => setNewItemOriginalPrice(e.target.value)}
                      placeholder="e.g. 200"
                      className="w-full bg-white px-2.5 py-2 rounded-xl text-[13px] text-[#707971] border border-[#dce5db] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#404942] block mb-1">
                      Unit *
                    </label>
                    <select
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                      className="w-full bg-white px-2 py-2 rounded-xl text-[12px] font-semibold border border-[#dce5db] focus:outline-none"
                    >
                      <option value="kilo">kilo (kg)</option>
                      <option value="half kilo">1/2 kilo</option>
                      <option value="bundle">bundle (bugkos)</option>
                      <option value="pack">pack (supot)</option>
                      <option value="piece">piece (buok)</option>
                      <option value="tali">tali</option>
                    </select>
                  </div>
                </div>

                {/* Quick Price Buttons inside Add Modal */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
                  <span className="text-[9px] font-bold text-[#707971] shrink-0">Quick:</span>
                  {[120, 140, 160, 180, 220, 280, 350].map((pVal) => (
                    <button
                      key={pVal}
                      type="button"
                      onClick={() => {
                        setNewItemPrice(String(pVal));
                        setNewItemOriginalPrice(String(pVal + 20));
                      }}
                      className="px-2 py-0.5 bg-white hover:bg-[#004328] hover:text-white text-[#404942] rounded-lg text-[10px] font-bold border border-[#dce5db] shrink-0 transition-colors"
                    >
                      ₱{pVal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category & Tag */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#404942] block mb-1">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as VendorCategory)}
                    className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[12px] font-medium focus:outline-none"
                  >
                    <option value="Seafood">Seafood / Isda</option>
                    <option value="Meat">Meat / Karne</option>
                    <option value="Vegetables">Vegetables / Gulay</option>
                    <option value="Fruits">Fruits / Prutas</option>
                    <option value="Poultry">Poultry / Manok</option>
                    <option value="Spices">Spices / Luto</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#404942] block mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={newItemTag}
                    onChange={(e) => setNewItemTag(e.target.value)}
                    placeholder="e.g. Bag-ong Latag, Fresh Catch"
                    className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[12px] focus:outline-none"
                  />
                </div>
              </div>

              {/* Stock Status & Quantity Remaining */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#404942] block mb-1">
                    Initial Stock State
                  </label>
                  <select
                    value={newItemStockState}
                    onChange={(e) => setNewItemStockState(e.target.value as StockState)}
                    className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[12px] font-medium focus:outline-none"
                  >
                    <option value="in_stock">In Stock (Available)</option>
                    <option value="low_stock">Low Stock (Hapit Mahurot)</option>
                    <option value="out_of_stock">Out of Stock (Hurot Na)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#404942] block mb-1">
                    Stock Estimate
                  </label>
                  <input
                    type="text"
                    value={newItemStockRemaining}
                    onChange={(e) => setNewItemStockRemaining(e.target.value)}
                    placeholder="e.g. 15 kg remaining"
                    className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[12px] focus:outline-none"
                  />
                </div>
              </div>

              {/* Local Directory Image Upload */}
              <div>
                <label className="text-[11px] font-bold text-[#404942] block mb-1.5">
                  Product Image (From Local Directory)
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {newItemImage ? (
                  <div className="flex items-center gap-3 p-3 bg-[#edf6ec] rounded-2xl border border-[#bfc9c0]/50">
                    <img
                      src={newItemImage}
                      alt="Uploaded Preview"
                      className="w-16 h-16 rounded-xl object-cover ring-1 ring-[#004328]/30 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[12px] font-extrabold text-[#004328] block truncate">
                        {selectedImageFileName || 'Local Image Loaded'}
                      </span>
                      <span className="text-[10px] text-[#707971] block mt-0.5">
                        Uploaded from your local device
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 bg-white hover:bg-[#edf6ec] text-[#004328] rounded-lg text-[10px] font-bold border border-[#dce5db] shadow-2xs cursor-pointer active:scale-95"
                        >
                          Change Image
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewItemImage('');
                            setSelectedImageFileName('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="px-2.5 py-1 bg-[#fff0eb] hover:bg-[#ffd9cc] text-[#ba2e06] rounded-lg text-[10px] font-bold border border-[#ffcfc3] cursor-pointer active:scale-95"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-4 px-3 border-2 border-dashed border-[#bfc9c0] hover:border-[#004328] bg-[#f9faf9] hover:bg-[#edf6ec] rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#edf6ec] group-hover:bg-[#004328] group-hover:text-white text-[#004328] flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-[22px]">
                        upload_file
                      </span>
                    </div>
                    <span className="text-[12px] font-extrabold text-[#004328]">
                      Add Image from Local Directory
                    </span>
                    <span className="text-[10px] text-[#707971]">
                      Click to choose image file (JPG, PNG, WEBP) from your device
                    </span>
                  </button>
                )}
              </div>

              {/* Live Special Toggle */}
              <label className="flex items-center gap-2 p-2.5 bg-[#edf6ec] rounded-2xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItemIsLiveSpecial}
                  onChange={(e) => setNewItemIsLiveSpecial(e.target.checked)}
                  className="w-4 h-4 rounded text-[#004328] accent-[#004328]"
                />
                <div className="text-[11px]">
                  <span className="font-extrabold text-[#004328] block">
                    Mark as LIVE SPECIAL Deal
                  </span>
                  <span className="text-[#707971]">
                    Highlight on top during Ate Lorna's live broadcast
                  </span>
                </div>
              </label>

              {/* Subtitle / Notes */}
              <div>
                <label className="text-[11px] font-bold text-[#707971] block mb-1">
                  Mubo nga Deskripsyon / Suki Note (Optional)
                </label>
                <input
                  type="text"
                  value={newItemSubtitle}
                  onChange={(e) => setNewItemSubtitle(e.target.value)}
                  placeholder="e.g. Free kaliskis ug hasang limpyo upon delivery"
                  className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[12px] focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="w-1/3 h-11 bg-[#f4f7f4] hover:bg-[#e2ebe1] text-[#404942] font-bold rounded-2xl text-[12px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 bg-[#004328] hover:bg-[#0d5c3a] text-white font-extrabold rounded-2xl text-[13px] flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>I-publish sa Live Latag</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. DELETE PRODUCT CONFIRMATION MODAL                     */}
      {/* ======================================================== */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4 border border-[#ffcfc3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#fff0eb] text-[#ba2e06] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">delete_forever</span>
              </div>
              <div>
                <h3 className="font-extrabold text-[15px] text-[#161d18]">
                  Tangtangon sa Latag?
                </h3>
                <span className="text-[11px] text-[#707971]">
                  Delete item confirmation
                </span>
              </div>
            </div>

            {/* Product card summary */}
            <div className="flex items-center gap-3 p-3 bg-[#fff0eb]/50 rounded-2xl border border-[#ffcfc3]/60">
              <img
                src={productToDelete.image}
                alt={productToDelete.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-extrabold text-[13px] text-[#161d18] truncate">
                  {productToDelete.name}
                </h4>
                <span className="text-[12px] font-bold text-[#ba2e06]">
                  ₱{productToDelete.price} / {productToDelete.unit}
                </span>
                <span className="text-[10px] text-[#707971] block">
                  {productToDelete.category} • {productToDelete.stockRemaining || 'Available'}
                </span>
              </div>
            </div>

            <p className="text-[12px] text-[#556057]">
              Sigurado ka nga tangtangon kini gikan sa Live Latag? Dili na kini makita o mapalit sa mga suki.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="w-1/2 h-11 bg-[#f4f7f4] hover:bg-[#e2ebe1] text-[#404942] font-bold rounded-2xl text-[12px] transition-colors cursor-pointer"
              >
                Dili / Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-1/2 h-11 bg-[#ba2e06] hover:bg-[#9a2300] text-white font-extrabold rounded-2xl text-[12px] flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span>Oo, Tangtanga</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

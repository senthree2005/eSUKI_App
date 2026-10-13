import React, { useState } from 'react';
import { Product, Order, Driver, Vendor,CartItem } from '../types';
import { mockCartItems } from '../data/mockDataTest';

interface TinderaHubScreenProps {
  products: Product[];
  orders: Order[];
  drivers: Driver[];
  onStartLiveStream: () => void;
  onOpenNotebook: () => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onToggleStock: (productId: string) => void;
  onAddProduct: (product: Product) => void;
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
}) => {
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecognizedItem, setVoiceRecognizedItem] = useState<{
    name: string;
    weight: string;
    price: number;
  } | null>(null);
  const [handoverToast, setHandoverToast] = useState<string | null>(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('180');
  const [newItemUnit, setNewItemUnit] = useState('kilo');

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
        weight: '5 kg',
        price: 180,
      });
    }, 1800);
  };
  // const findOrderCartItems = (
  //     order: Order,
  //     cartItems: CartItem[]
  //   ): CartItem[] => {
  //     return cartItems.filter((item) =>
  //       order.orders.includes(item.productId)
  //     );
  //   };

  // const handlePublishVoiceItem = () => {
  //   if (!voiceRecognizedItem) return;

  //   const newProd: Product = {
  //     id: `prod-voice-${Date.now()}`,
  //     name: voiceRecognizedItem.name,
  //     localName: 'Presko Bangus',
  //     price: voiceRecognizedItem.price,
  //     unit: 'kilo',
  //     stall: 'Stall #42 Wet Section',
  //     image:
  //       'https://lh3.googleusercontent.com/aida-public/AB6AXuCIf_s0R349O4CuhvyKiWRwojRgIKD_iYFfD5M3M62On_A97y8M_VwGOUOugcn663giDxE1Cy-Ex2MA4bjbTkesd2QAyVKEDSFz9DrR8tHsWCS5_rYiO21hZ84GUl1KxSDxiYL8xZIVM4XJRorxf6Q_RrRsvid6jA9hwvXRdMBBv3bi4s4o86xyRobYlknHMR16VzPPNYcfXJ7VaHHnvs3Ih0CzAd6SWHiKxSb8-xHqGMQ63QxRpg1H',
  //     stockState: 'in_stock',
  //     stockRemaining: '5 kg remaining',
  //     category: 'Isda & Latag',
  //     tag: 'Voice Added',
  //   };

  //   onAddProduct(newProd);
  //   setVoiceRecognizedItem(null);
  //   setHandoverToast('Bag-ong tinda nadugang sa Live Latag!');
  //   setTimeout(() => setHandoverToast(null), 2500);
  // };

  const handleAddNewManualItem = (e: React.FormEvent) => {
  e.preventDefault();

  if (!newItemName.trim()) return;

  const newProd: Product = {
    id: `prod-manual-${Date.now()}`,
    createdAt: '02/12/26',
    updatedAt: '02/24/26',
    name: newItemName.trim(),
    price: Math.max(0, parseFloat(newItemPrice) || 100),
    unit: newItemUnit,
    vendorID: 'Ate Lorna',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBH3Mep5a4WK5TVh_QaWmTDKNZ6ydSZNwY8uFZuwPyLGHD3byy5HwUkSJAbV8_l5FD4HA6JR0Ewv_lcc2GVT-0jKmyFl4yFrNNDe5HAXaQSXUNevOqNwGr2OaXohmZQq0wL8QubCTiUDFa30S6AM_PkOJzl2qP2ZO7kyFoWwTPP9Eb5Rp36HQtkfqzhvoQl0Gd-PBFnlebsvX2DLi-8WtbZ45NKnmBcQYF17Jf2mrF86Tl0BB8VZ9tI',
    stockState: 'in_stock',
    stockRemaining: '10 kg remaining',
    subtitle: `${newItemName.trim()} from Ate Lorna`,
    unitText: `per ${newItemUnit}`,
    category: 'Seafood',
    tag: 'New Latag',
    quantity: 1,
    minQuantity: 1,
    step: 1,
    reviewCount: 0,
  };

    onAddProduct(newProd);
    setNewItemName('');
    setNewItemPrice('180');
    setNewItemUnit('kilo');
    setShowAddItemModal(false);
    setHandoverToast('Bag-ong produkto napublish!');

    setTimeout(() => setHandoverToast(null), 2500);
  };

  const driverMap = new Map(
    drivers.map(driver => [driver.id, driver.name])
  );

  const ateLornaProducts = products.filter(
    (p) => p.vendorID === 'vendor-lorna'
  );

  const activeOrders = orders.filter(
    (o) => o.status === 'preparing' || o.status === 'ready'
  );

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 max-w-lg mx-auto">
      {/* Vendor Header & Status Banner */}
      <div className="px-4 pt-1">
        <div className="bg-white p-3.5 rounded-2xl shadow-xs border border-[#e2ebe1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#004328]/20"
                alt="Ate Lorna portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFTApEmlAX7qMR4gBMvrOSHKcRCapD3nj1ZFTL-eYQgjpCmZ4gLboUW28fYeyaYQwUIj1xInY-nOmpC4opdHfIyPI4RGvKfORCi2yN-pEU21LUgGJRF5BHMwAs_zmV8vPSkx_uNTBJn-NbRm7c89oiuHjToWr-fxxjbtp-ajqsvn4I5Sypy9ZFrUM5nJ5p0nRdfJ1lDzunTNdDFvDOdU6b-CNaAkVxBG8DbQkmHEemafycLep_2Hx9"
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

          <button
            aria-label="Stall Settings"
            onClick={() => {
              setHandoverToast('Stall #42 Tagum settings updated!');
              setTimeout(() => setHandoverToast(null), 2000);
            }}
            className="w-9 h-9 rounded-full bg-[#edf6ec] flex items-center justify-center text-[#404942] hover:text-[#161d18] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
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
                18
              </span>
              <span className="text-[10px] text-[#707971] mt-0.5 block">
                {activeOrders.length} preparing
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
                Waiting
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
                Morning Peak Rush
              </span>
            </div>

            <div>
              <h2 className="text-[18px] font-extrabold leading-tight text-white">
                Broadcasting Live Latag
              </h2>
              <p className="text-[12px] text-[#dce5db] mt-0.5">
                Showcase your fresh bangus catch directly to 300+ Tagum suki waiting online right now.
              </p>
            </div>

            <button
              onClick={onStartLiveStream}
              className="w-full h-12 bg-[#febb2d] hover:bg-[#ffdea9] active:scale-[0.98] text-[#271900] text-[13px] font-extrabold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md mt-1"
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
                  Busy hands? Speak in Bisaya or Tagalog
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
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-md shrink-0 ${
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
                      ? 'Naminaw sa Bisaya...'
                      : 'Tap mic to speak'}
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
              <div className="bg-white p-2.5 rounded-lg flex items-center justify-between border border-[#bfc9c0]/50 animate-in fade-in">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[#226b47] text-[18px]">
                    check_circle
                  </span>
                  <span className="text-[12px] font-bold text-[#161d18] truncate">
                    {voiceRecognizedItem.name} • {voiceRecognizedItem.weight} • ₱{voiceRecognizedItem.price}/kg
                  </span>
                </div>
                <button
                  className="px-3 py-1 bg-[#226b47] hover:bg-[#004328] text-white rounded-lg text-[11px] font-bold shrink-0 ml-2 shadow-xs"
                >
                  Publish
                </button>
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
            className="text-[11px] font-bold text-[#004328] hover:underline"
          >
            View History →
          </button>
        </div>

        {/* Order Cards */}
        {orders.map((order) => {
          const isOrder42 = order.id === '1042';
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
                    <span className="text-[11px] text-[#707971] line-clamp-1">
                      Suki Buyer: {order.customerId}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-[15px] text-[#004328]">
                  ₱{order.totalPrice}
                </span>
              </div>

              {/* Order Item Preview & Special Instructions */}
              <div className="p-2.5 bg-[#edf6ec] rounded-xl text-[#161d18] space-y-1">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold">
                    {/* • {findOrderCartItems(order,mockCartItems)[0]?.quantity || 1} {

                    findOrderCartItems(order,mockCartItems)[0]?. || 'kg'} {

                      order.items[0]?.productName} */}
                  </span>
                  {order.specialInstructions && (
                    <span className="text-[#711700] font-bold text-[11px] truncate max-w-[180px]">
                      Note: “{order.specialInstructions}”
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404942]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#226b47]">
                      electric_rickshaw
                    </span>
                    {order.driverId} arriving in{' '}
                    {/* <strong className="text-[#226b47]">
                      {order.driver.etaMinutes} mins
                    </strong> */}
                  </span>
                  <span className="text-[10px] text-[#707971]">
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
                      setHandoverToast(
                        // `Nahatag na ang Order #${order.id} kang ${order.driver.name}!`
                        `Nahatag na ang Order #${order.id} kang ${
                          drivers.find(driver => driver.id === order.driverId)?.name ?? "Unassigned"
                        }!`
                      );
                      setTimeout(() => setHandoverToast(null), 2500);
                    }}
                    className="flex-1 h-10 bg-[#004328] hover:bg-[#0d5c3a] active:scale-95 text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      handshake
                    </span>
                    <span>
                      {/* Hand Over to {order.driver.name.split(' ')[1] || 'Driver'} */}
                      Hand Over to {drivers.find(driver => driver.id === order.driverId)?.name.split(' ')[1] || 'Driver'}
                      
                    </span>
                  </button>
                ) : order.status === 'delivering' ? (
                  <div className="flex-1 h-10 bg-[#e8f0e7] text-[#004328] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                    <span>Dispatched via {drivers.find(driver => driver.id === order.driverId)?.name}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onUpdateOrderStatus(order.id, 'ready');
                      setHandoverToast(
                        `Order #${order.id} gitimbang ug andam na!`
                      );
                      setTimeout(() => setHandoverToast(null), 2500);
                    }}
                    className="flex-1 h-10 bg-[#e2ebe1] hover:bg-[#a9f3c5] text-[#004328] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors"
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
                    setHandoverToast(`Gitawag si ${drivers.find(driver => driver.id === order.driverId)?.name} (${drivers.find(driver => driver.id === order.driverId)?.phone})...`);
                    setTimeout(() => setHandoverToast(null), 2500);
                  }}
                  className="h-10 px-3 bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#161d18] rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all"
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

      {/* Manage Live Catalog (Single Tap Toggles) */}
      <div className="px-4 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[16px] text-[#161d18]">Live Latag Catalog</h2>
            <p className="text-[11px] text-[#707971]">
              Instant stock toggles for Ate Lorna during stream
            </p>
          </div>
          <button
            onClick={() => setShowAddItemModal(true)}
            className="px-3 py-1.5 bg-[#004328] hover:bg-[#0d5c3a] text-white rounded-xl text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> Add Item
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-[#e2ebe1] overflow-hidden divide-y divide-[#e2ebe1]">
          {ateLornaProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-3 flex items-center justify-between hover:bg-[#f3fcf2] transition-colors gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  className={`w-12 h-12 rounded-lg object-cover ${
                    prod.stockState === 'out_of_stock' ? 'grayscale opacity-60' : ''
                  }`}
                  alt={prod.name}
                  src={prod.image}
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-[13px] text-[#161d18] truncate">
                    {prod.name}
                  </h3>
                  <span className="text-[11px] text-[#707971] block truncate">
                    ₱{prod.price} / {prod.unit} • {prod.stockRemaining || 'Available'}
                  </span>
                </div>
              </div>

              {/* Stock toggle button cycling IN STOCK -> LOW STOCK -> SOLD OUT */}
              <button
                onClick={() => onToggleStock(prod.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 active:scale-95 shadow-xs ${
                  prod.stockState === 'in_stock'
                    ? 'bg-[#226b47] text-white'
                    : prod.stockState === 'low_stock'
                    ? 'bg-[#febb2d] text-[#271900]'
                    : 'bg-[#dce5db] text-[#404942]'
                }`}
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
          ))}
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
                48 loyal repeat customers in Tagum City
              </p>
            </div>
          </div>
          <button
            onClick={onOpenNotebook}
            className="px-3 py-1.5 rounded-xl bg-[#edf6ec] hover:bg-[#e2ebe1] text-[#004328] text-[11px] font-bold transition-colors"
          >
            Open Notebook
          </button>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {handoverToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom max-w-md mx-auto">
          <div className="bg-[#004328] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#a9f3c5]/30">
            <span className="material-symbols-outlined text-[#a9f3c5] text-[20px]">
              check_circle
            </span>
            <span className="text-[12px] font-bold">{handoverToast}</span>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-4 w-full max-w-sm shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ebe1]">
              <h3 className="font-bold text-[15px] text-[#161d18]">
                I-dugang sa Stall #42 Latag
              </h3>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="w-7 h-7 rounded-full bg-[#edf6ec] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddNewManualItem} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#707971] block mb-1">
                  Ngalan sa Item
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Yellowfin Tuna slices"
                  className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-[#004328]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#707971] block mb-1">
                    Presyo (₱)
                  </label>
                  <input
                    type="number"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-[#004328]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#707971] block mb-1">
                    Unit
                  </label>
                  <select
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-full bg-[#edf6ec] px-3 py-2 rounded-xl text-[13px] focus:outline-none focus:ring-1 focus:ring-[#004328]"
                  >
                    <option value="kilo">kilo</option>
                    <option value="bundle">bundle</option>
                    <option value="pack">pack</option>
                    <option value="stick">stick</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#004328] hover:bg-[#0d5c3a] text-white font-bold rounded-xl text-[13px] flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>I-post sa Live Catalog</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

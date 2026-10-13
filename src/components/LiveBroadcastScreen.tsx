import React, { useState, useRef, useEffect } from 'react';
import { Product, Vendor,LiveVendor,LiveChatMessage } from '../types';
import { mockLiveChatMessages, findProductById, findVendorById, findUserById } from '../data/mockDataTest';

interface LiveBroadcastScreenProps {
  vendor: LiveVendor;
  onBack: () => void;
  onQuickOrder: (product: Product, quantity: number, note: string) => void;
  onAddToCart: (product: Product, quantity: number, note: string) => void;
}

export const LiveBroadcastScreen: React.FC<LiveBroadcastScreenProps> = ({
  vendor,
  onBack,
  onQuickOrder,
  onAddToCart,
}) => {
  const [kiloCount, setKiloCount] = useState(1);
  const [likeCount, setLikeCount] = useState(vendor.likes || 1420);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showOrderToast, setShowOrderToast] = useState(false);
  const [showStallSheet, setShowStallSheet] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Floating heart particles
  const [hearts, setHearts] = useState<
    { id: number; x: number; rot: number }[]
  >([]);

  // Live chat messages
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>(mockLiveChatMessages);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const triggerHeart = () => {
    setLikeCount((prev) => prev + 1);
    const id = Date.now() + Math.random();
    const x = (Math.random() - 0.5) * 60;
    const rot = (Math.random() - 0.5) * 45;
    setHearts((prev) => [...prev.slice(-15), { id, x, rot }]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: LiveChatMessage = {
      id: `chat-user-${Date.now()}`,
      senderUserId: 'You', //change this later
      liveVendorId: 'Ate-lorna',//change this later
      text: chatInput.trim(),
      isHost: false,
      isPurchaseNotice: false,
      createdAt: 'Just Now',
      updatedAt: 'Just Now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulate friendly tindera response after 2 seconds
    // setTimeout(() => {
    //   const replies = [
    //     `Salamat suki! Kuhaon nako ang kinanindotan para nimo!`,
    //     `Presko kaayo na karong buntag, pilii lang dayon!`,
    //     `Noted suki! Ako na gi-andam sa timbangan!`,
    //   ];
    //   const randomReply = replies[Math.floor(Math.random() * replies.length)];

    //   setChatMessages((prev) => [
    //     ...prev,
    //     {
    //       id: `chat-reply-${Date.now()}`,
    //       sender: `${vendor.name} (Host)`,
    //       text: randomReply,
    //       isHost: true,
    //       timestamp: 'Just now',
    //     },
    //   ]);
    // }, 1800);
  };

  const handleBuyNow = () => {
    triggerHeart();
    triggerHeart();
    const pinnedProduct = findProductById(vendor.pinnedProductId)
    if(pinnedProduct) {
      onQuickOrder(pinnedProduct, kiloCount, 'Free gutting & scaling');
      setShowOrderToast(true);
    }
    

    // Also push a purchase celebration into live chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: `chat-sys-${Date.now()}`,
        senderUserId: 'System', //change this later
        liveVendorId: 'live-lorna',
        text: `You ordered ${kiloCount}kg ${pinnedProduct?.name}!`,
        isHost:false,
        isPurchaseNotice: true,
        createdAt: 'Just now',
        updatedAt: 'Just now',
      },
    ]);

    setTimeout(() => {
      setShowOrderToast(false);
    }, 4000);
  };

  const liveVendor = findVendorById(vendor.vendorId)
  const product = findProductById(vendor.pinnedProductId)


  return (
    <div className="flex flex-col w-full h-screen relative bg-[#161d18] text-white">

      {/* Main Broadcast Container */}
      <main className="flex flex-wrap relative w-full h-full  bg-[#161d18] flex-1 max-w-lg min-h-dvh mx-auto">
        <div className="relative w-full overflow-hidden bg-black aspect-[9/18] min-w-full min-h-[720px] max-h-full rounded-2xl flex flex-col justify-between select-none shadow-2xl">
          {/* Immersive Video Stream Background */}
          <div
            className="absolute inset-0 w-full  h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${vendor.streamImage || vendor.image}')`,
            }}
          ></div>

          {/* Gradients for UI Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none"></div>

          {/* Top Bar: Vendor Profile Header & Stream Controls */}
          <div className="relative z-20 pt-3 px-3 flex items-center justify-between gap-2">
            {/* Vendor Info Card */}
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full pr-3 max-w-[70%] border border-white/10">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#004328] shrink-0 ring-1 ring-white/20">
                <img
                  className="w-full h-full object-cover"
                  alt={liveVendor?.name}
                  src={vendor.avatar || vendor.image}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#8ed6aa] rounded-full ring-1 ring-white"></span>
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[13px] text-white truncate max-w-[90px]">
                    {liveVendor?.name}
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-[#febb2d] shrink-0 material-symbols-fill">
                    verified
                  </span>
                </div>
                <span className="text-[10px] text-white/80 truncate">
                  {liveVendor?.location}
                </span>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5 shrink-0 transition-all active:scale-95 ${
                  isFollowing
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-[#004328] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">
                  {isFollowing ? 'check' : 'add'}
                </span>
                <span>{isFollowing ? 'Suki Ka!' : 'Suki'}</span>
              </button>
            </div>

            {/* Right Controls: Status & Exit */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                <span className="text-[11px] font-bold text-white flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-white/70">
                    visibility
                  </span>
                  {vendor.viewers}
                </span>
              </div>
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 active:scale-90 transition-all border border-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Live Voucher Ticker Pill */}
          <div className="relative z-20 px-3 mt-1.5">
            <div className="inline-flex items-center gap-1.5 bg-[#febb2d]/95 text-[#271900] px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm animate-pulse border border-[#febb2d]">
              <span className="material-symbols-outlined text-[15px] material-symbols-fill">
                confirmation_number
              </span>
              <span className="text-[11px] font-extrabold truncate">
                ₱20 OFF Suki Voucher applied at checkout
              </span>
            </div>
          </div>

          {/* Floating Right Action Column */}
          <div className="absolute right-3 bottom-44 z-20 flex flex-col items-center gap-3">
            {/* Heart Burst Canvas */}
            <div className="relative w-12 h-28 pointer-events-none overflow-visible">
              {hearts.map((h) => (
                <div
                  key={h.id}
                  className="absolute bottom-0 right-2 pointer-events-none transition-all duration-700 ease-out flex items-center justify-center animate-float-heart"
                  style={
                    {
                      '--tx': `${h.x}px`,
                      '--rot': `${h.rot}deg`,
                    } as React.CSSProperties
                  }
                >
                  <span className="material-symbols-outlined text-[28px] text-[#ffb4a1] material-symbols-fill drop-shadow-md">
                    favorite
                  </span>
                </div>
              ))}
            </div>

            {/* Like / Heart Button */}
            <button
              onClick={triggerHeart}
              className="group flex flex-col items-center active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-[#ffb4a1] shadow-lg group-hover:bg-[#9a2300] transition-colors border border-white/10">
                <span className="material-symbols-outlined text-[24px] material-symbols-fill">
                  favorite
                </span>
              </div>
              <span className="text-[10px] font-bold text-white mt-0.5 drop-shadow">
                {(likeCount / 1000).toFixed(1)}k
              </span>
            </button>

            {/* Stall Bag Button */}
            <button
              onClick={() => setShowStallSheet(true)}
              className="relative flex flex-col items-center active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/10">
                <span className="material-symbols-outlined text-[22px]">storefront</span>
              </div>
              <span className="absolute -top-1 -right-1 bg-[#9a2300] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ring-1 ring-white">
                8
              </span>
              <span className="text-[10px] font-bold text-white mt-0.5 drop-shadow">
                Latag
              </span>
            </button>

            {/* Bulong (Whisper directly to Tindera) */}
            <button
              onClick={() => {
                setChatInput('Ate, paki pilii ko ug tambok nga bangus ha!');
              }}
              className="flex flex-col items-center active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/10">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>
              <span className="text-[10px] font-bold text-white mt-0.5 drop-shadow">
                Bulong
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                setShowShareToast(true);
                setTimeout(() => setShowShareToast(false), 2000);
              }}
              className="flex flex-col items-center active:scale-90 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/10">
                <span className="material-symbols-outlined text-[22px]">share</span>
              </div>
              <span className="text-[10px] font-bold text-white mt-0.5 drop-shadow">
                Share
              </span>
            </button>
          </div>

          {/* Lower Section: Live Chat Stream & Pinned Buy Card */}
          <div className="relative z-20 flex flex-col gap-2 px-3 pb-3 w-full">
            {/* Live Chat Bubble Stack */}
            <div className="flex flex-col justify-end gap-1.5 max-w-[76%] max-h-36 overflow-y-auto no-scrollbar">
              {chatMessages.map((msg) => {
                const user = findUserById(msg.senderUserId)
                if (msg.isPurchaseNotice) {
                  return (
                    <div
                      key={msg.id}
                      className="bg-[#004328]/85 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-left shadow-sm flex items-center gap-1.5 border border-[#8ed6aa]/30"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#a9f3c5]">
                        local_mall
                      </span>
                      <p className="text-[11px] font-medium leading-tight">
                        {msg.text}
                      </p>
                    </div>
                  );
                }

                if (msg.isHost) {
                  return (
                    <div
                      key={msg.id}
                      className="bg-[#0d5c3a]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-left shadow-sm border-l-2 border-[#a9f3c5]"
                    >
                      <span className="text-[10px] text-[#a9f3c5] font-bold block">
                        {user?.username}:
                      </span>
                      <span className="text-[12px] text-white">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className="bg-black/55 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-left shadow-sm border border-white/10"
                  >
                    <span className="text-[10px] text-[#febb2d] font-bold">
                      You:
                    </span>
                    <span className="text-[12px] ml-1 text-white/95">
                      {msg.text}
                    </span>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Pinned Live Product Showcase Card */}
            <div className="w-full bg-[#f3fcf2]/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex flex-col gap-2 text-[#161d18] border border-white">
              {/* Live Item Header */}
              <div className="flex items-center gap-2.5">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#edf6ec]">
                  <img
                    className="w-full h-full object-cover"
                    alt={product?.name}
                    src={product?.image}
                  />
                  <div className="absolute top-0 left-0 bg-[#9a2300] text-white text-[9px] font-extrabold px-1 py-0.5 rounded-br">
                    Stall Pin
                  </div>
                </div>

                {/* Product Details & Pricing */}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1">
                    <h2 className="font-bold text-[14px] text-[#161d18] truncate leading-tight">
                      {product?.name}
                    </h2>
                    <span className="text-[10px] font-bold text-[#226b47] bg-[#edf6ec] px-1.5 py-0.5 rounded shrink-0">
                      Live Special
                    </span>
                  </div>
                  <p className="text-[11px] text-[#707971] truncate">
                    Free gutting &amp; scaling upon request
                  </p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[18px] font-extrabold text-[#004328]">
                      ₱{product?.price}
                    </span>
        
                    <span className="text-[11px] text-[#707971]">/ kg</span>
                    {product?.originalPrice && (
                      <span className="text-[11px] line-through text-[#707971] ml-1">
                        ₱{product?.originalPrice}
                      </span>
                    )}
                                         
                  </div>
                </div>
              </div>
              {/* Live Stream Footnote */}
        <div className=" flex items-center justify-between text-[#71ab87]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#71ab87]">
              verified_user
            </span>
            <span className="text-[9px] font-bold">
              Tagum Public Market Direct Latag
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#febb2d]">
            <span className="material-symbols-outlined text-[16px]">speed</span>
            <span className="text-[9px] font-extrabold">
              15 min delivery via Tricycle
            </span>
          </div>
        </div>

              {/* Quantity Stepper & Instant Buy Action */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {/* Stepper */}
                <div className="flex items-center bg-[#edf6ec] rounded-xl p-0.5 shrink-0 border border-[#bfc9c0]/30">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setKiloCount((prev) => Math.max(0.5, prev - 0.5))}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#161d18] active:scale-90 transition-transform shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="font-extrabold text-[15px] px-2 text-[#161d18]">
                    {kiloCount % 1 === 0 ? kiloCount : kiloCount.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-[#707971] pr-1.5">kg</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setKiloCount((prev) => prev + 0.5)}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#161d18] active:scale-90 transition-transform shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>

                {/* Buy CTA Button */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#febb2d] hover:bg-[#ffdea9] text-[#271900] font-extrabold text-[13px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
                  <span className="truncate">Buy Now (₱30 Tricycle)</span>
                </button>
              </div>
            </div>
            

            {/* Quick Chat Input Bar & Suki Heart Button */}
            <form
              onSubmit={handleSendChat}
              className="flex items-center gap-2"
            >
              <div className="flex-1 bg-black/55 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10">
                <span className="material-symbols-outlined text-[18px] text-[#dce5db]">
                  chat
                </span>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Pangutana kay ${liveVendor?.name}...`}
                  className="bg-transparent text-[12px] text-white placeholder:text-white/60 focus:outline-none w-full"
                />
            
              </div>
              <button
                  type="submit"
                  className="text-[#ffdea9] hover:text-white active:scale-90"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>

              {/* <button
                type="button"
                onClick={triggerHeart}
                className="w-9 h-9 rounded-full bg-[#9a2300] flex items-center justify-center text-white active:scale-75 transition-transform shrink-0 shadow-md ring-2 ring-white/20"
              >
                <span className="material-symbols-outlined text-[20px] material-symbols-fill">
                  thumb_up
                </span>
              </button> */}
            </form>
          </div>
        </div>

        {/* Live Stream Footnote
        <div className="px-4 py-3 flex items-center justify-between text-[#8ed6aa]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#8ed6aa]">
              verified_user
            </span>
            <span className="text-[11px] font-bold">
              Tagum Public Market Direct Latag
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#febb2d]">
            <span className="material-symbols-outlined text-[16px]">speed</span>
            <span className="text-[11px] font-extrabold">
              15 min delivery via Tricycle
            </span>
          </div>
        </div> */}
      </main>

      {/* Order Confirmation Modal Toast */}
      {showOrderToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom duration-300 max-w-md mx-auto">
          <div className="bg-[#004328] text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#8ed6aa]/40">
            <div className="w-10 h-10 rounded-full bg-[#0d5c3a] flex items-center justify-center shrink-0 text-[#a9f3c5]">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="font-bold text-[13px] text-[#a9f3c5]">
                Order placed with {liveVendor?.name}!
              </p>
              <p className="text-[11px] text-[#dce5db] truncate">
                Tricycle Junjun is heading to {liveVendor?.location}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Share Toast */}
      {/* {showShareToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-lg animate-in fade-in">
          Link copied! Share Ate Lorna's Latag to Facebook &amp; Messenger
        </div>
      )} */}

      {/* Stall Bag Drawer */}
      {showStallSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-[#161d18] w-full max-w-md rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto space-y-3 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ebe1]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004328]">storefront</span>
                <h3 className="font-bold text-[15px]">{liveVendor?.name}'s Fresh Catch Latag</h3>
              </div>
              <button
                onClick={() => setShowStallSheet(false)}
                className="w-7 h-7 rounded-full bg-[#edf6ec] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-[#edf6ec] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-[13px]">{product?.name}</h4>
                    <span className="text-[11px] text-[#004328] font-extrabold">
                      ₱{product?.price} / kg
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if(product) {
                      onAddToCart(product, 1, 'Live stall order');
                      setShowStallSheet(false);
                    }
                    
                  }}
                  className="px-3 py-1.5 bg-[#004328] text-white rounded-lg text-[11px] font-bold"
                >
                  Add Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Product, LiveVendor, StreetFoodVendor } from '../types';

interface HomeScreenProps {
  products: Product[];
  liveVendors: LiveVendor[];
  streetFoodVendors: StreetFoodVendor[];
  onOpenLiveStream: (vendorId?: string) => void;
  onAddToCart: (product: Product, quantity?: number, note?: string) => void;
  searchQuery: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  liveVendors,
  streetFoodVendors,
  onOpenLiveStream,
  onAddToCart,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedItemFeedback, setAddedItemFeedback] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'Street Food', label: 'Street Food', icon: 'kebab_dining', color: 'bg-[#ffdea9]/50 text-[#7d5800]' },
    { id: 'Fresh Gulay', label: 'Fresh Gulay', icon: 'nutrition', color: 'bg-[#a9f3c5]/40 text-[#004328]' },
    { id: 'Isda & Latag', label: 'Isda & Latag', icon: 'set_meal', color: 'bg-[#8ed6aa]/40 text-[#0d5c3a]' },
    { id: 'Inihaw BBQ', label: 'Inihaw BBQ', icon: 'outdoor_grill', color: 'bg-[#ffdbd2]/60 text-[#711700]' },
    { id: 'Kakanin', label: 'Kakanin', icon: 'bakery_dining', color: 'bg-[#ffdea9]/50 text-[#7d5800]' },
    { id: 'Prutas', label: 'Prutas', icon: 'eco', color: 'bg-[#a9f3c5]/40 text-[#004328]' },
    { id: 'Pampalamig', label: 'Pampalamig', icon: 'local_cafe', color: 'bg-[#ffdea9]/60 text-[#6d4c00]' },
    { id: 'Lutong Bahay', label: 'Lutong Bahay', icon: 'dinner_dining', color: 'bg-[#dce5db] text-[#404942]' },
  ];

  const handleAddSukiWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedItemFeedback((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemFeedback((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // Filter products based on search or category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.localName && p.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.vendorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredBangus = products.find((p) => p.id === 'prod-bangus') || products[0];

  return (
    <div className="flex flex-col w-full pb-24 space-y-5 max-w-lg mx-auto">
      {/* Promotional Banner: Tusok-tusok & Tricycle Delivery */}
      <section className="px-4 pt-1">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#febb2d] via-[#ffdea9] to-[#febb2d] p-3.5 shadow-[0_4px_16px_rgba(125,88,0,0.14)]">
          {/* Decorative radial shine */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ffdea9] opacity-50 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#004328] text-white text-[11px] font-extrabold shadow-xs">
                <span className="material-symbols-outlined text-[13px]">two_wheeler</span>
                Tricycle Express
              </span>
              <span className="text-[10px] font-extrabold text-[#6d4c00] tracking-wide uppercase">
                Tagum City Special
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="flex-1 min-w-0 pr-1">
                <h2 className="font-extrabold text-[18px] text-[#271900] leading-tight">
                  Tusok-tusok &amp; Merienda Specials!
                </h2>
                <p className="text-[12px] text-[#6d4c00] mt-0.5 line-clamp-2">
                  Free Tricycle Delivery on orders over{' '}
                  <span className="font-extrabold text-[#271900]">₱250</span>. Direct gikan sa palengke!
                </p>
              </div>

              {/* Food Showcase Thumbnail */}
              <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-md bg-[#e8f0e7]">
                <img
                  className="w-full h-full object-cover"
                  alt="Tusok-tusok Filipino street food"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzSrvWLtoJGR22ocHNfOA6VSzHNkWI1jWrdXmHC64inLuIUJenGWZqSTScUavtj12UtQLx2V68CU5kmZh-BoNSxXGRXMDmgdqhTp_7ssO3ZchOlH4de83KOQKrj6YkB5HCdUpsHLMSVGQlKrbim73pat936CP6bJ0IdZEIE-SjIcUxpZlX_CXYgXZDQR95u4lga-0UD0dzMkKazI70wMdlm9ffDZ4UDrJCMdvjHIZJ9MB_y1W_0S3-"
                />
                <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  <span className="material-symbols-outlined text-[#7d5800] text-[12px]">
                    local_fire_department
                  </span>
                  <span className="text-[10px] font-extrabold text-[#161d18]">Hot</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-[#6d4c00]">
                <span className="material-symbols-outlined text-[15px]">schedule</span>
                <span className="text-[11px] font-bold">Estimated 15–25 mins</span>
              </div>
              <button
                onClick={() => onOpenLiveStream('vendor-lorna')}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#004328] hover:bg-[#0d5c3a] text-white text-[12px] font-bold transition-all active:scale-95 shadow-sm"
              >
                <span>Order Latag</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE Latag Horizontal Reel */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9a2300] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#9a2300]"></span>
            </span>
            <h3 className="font-bold text-[16px] text-[#161d18] flex items-center gap-1">
              LIVE Latag Right Now
            </h3>
          </div>
          <span className="text-[11px] text-[#004328] font-extrabold">4 Live Now</span>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 snap-x snap-mandatory">
          {liveVendors.map((vendor) => (
            <button
              key={vendor.id}
              onClick={() => onOpenLiveStream(vendor.id)}
              className="snap-start flex flex-col items-center min-w-[76px] text-center focus:outline-none group"
            >
              <div
                className={`relative p-0.5 rounded-full shadow-sm group-active:scale-95 transition-transform ${
                  vendor.isLive
                    ? 'bg-gradient-to-tr from-[#9a2300] via-[#febb2d] to-[#9a2300]'
                    : 'bg-[#dce5db]'
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-[#f3fcf2]">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    alt={vendor.name}
                    src={vendor.avatar || vendor.image}
                  />
                </div>
                <span
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 shadow-sm ${
                    vendor.isLive ? 'bg-[#9a2300]' : 'bg-[#004328]'
                  }`}
                >
                  {vendor.isLive ? (
                    <>
                      <span className="material-symbols-outlined text-[10px]">sensors</span>
                      {vendor.viewers}
                    </>
                  ) : (
                    vendor.scheduleTime || 'Soon'
                  )}
                </span>
              </div>
              <span className="text-[12px] font-bold text-[#161d18] mt-2 truncate w-20">
                {vendor.name}
              </span>
              <span className="text-[10px] text-[#404942] truncate w-20">
                {vendor.category}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Palengke Category Grid (8 Categories) */}
      <section className="px-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[16px] text-[#161d18]">Categories</h3>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`text-[11px] font-bold transition-colors ${
              selectedCategory === 'All' ? 'text-[#004328] underline' : 'text-[#7d5800]'
            }`}
          >
            Lahat ng Tinda
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? 'All' : cat.id)
                }
                className={`flex flex-col items-center p-2 rounded-xl transition-all active:scale-95 text-center border ${
                  isSelected
                    ? 'bg-white border-[#004328] shadow-sm'
                    : 'bg-[#edf6ec] border-transparent hover:bg-[#e8f0e7]'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-1 transition-transform ${cat.color} ${
                    isSelected ? 'scale-110 ring-2 ring-[#004328]' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {cat.icon}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#161d18] line-clamp-1">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>
          {/*Cojkhiinmment*/}
          {/*Comment*/}
      {/* Featured Suki Live Stream Highlight Card */}
      <section className="px-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#711700] text-[20px]">
              videocam
            </span>
            <h3 className="font-bold text-[16px] text-[#161d18]">Live Latag Highlight</h3>
          </div>
          <button
            onClick={() => onOpenLiveStream('vendor-lorna')}
            className="text-[11px] font-bold text-[#004328] hover:underline"
          >
            Watch All (4)
          </button>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] bg-white border border-[#e2ebe1]">
          {/* Stream Preview Media (Clicking launches live broadcast) */}
          <div
            onClick={() => onOpenLiveStream('vendor-lorna')}
            className="relative h-56 w-full cursor-pointer group"
          >
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="Live fish stall in Tagum public market"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEjodZws2FbFV5SHc8h5WyeYG85qGK4Go-ZuqZ5_39pFFf7k9fnWXH-FK7voN1m6ZdutvaMDIlVaMCtxplOxVOkBzlifhMwXl0WvGPQ9k9rIJyxMNX_mcF5KdBcYcf6kdza7JHuxWI7j2Dzv3_-nrQZc4EK1mCYanPNmKqp0QaSD6x28IAXgFkxfWhhrBhFTqKCQoH66rF8m9n4JMBs76ugfYyK3NHRvjkVVsJEdVQWbJMix6WXFxS"
            />
            {/* Stream Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Top Stream Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9a2300] text-white text-[10px] font-extrabold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  LIVE
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">visibility</span>
                  312 viewers
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#0d5c3a] text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                Suki Certified
              </span>
            </div>

            {/* Stream Host Info Tag */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 pr-4">
              <div className="w-8 h-8 rounded-full bg-white p-0.5 overflow-hidden shrink-0">
                <img
                  className="w-full h-full object-cover rounded-full"
                  alt="Ate Lorna"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Ix13TnHgJa40k1tGz3Qy6Cdo4nPnbWV7MvCk6iUp43cie2hRv0EDjY5UVhyAolNhI5Yffl3rj-6ERITuz7qVP8VPaWYrDbmQhxa2naky4Adyp8brBg5rnRxTdU_0blHpUx_oWwstHq5PZiAH7_JeREuTpA5GGIDU07Ebx5mI9NWUFFxR2eYW5qxb4rz5vmGgfwUAoT2RZ5DQ8fQ5kTu5czabeJAiQTbQ2uAP2jWAQPavkldcPnb8"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-white leading-tight drop-shadow">
                  Ate Lorna Seafoods • Stall #24
                </span>
                <span className="text-[10px] text-[#dce5db] drop-shadow">
                  "Bag-ong abot gikan Panabo Fish Port!"
                </span>
              </div>
            </div>
          </div>

          {/* Pinned Live Product Offer (Inside Video Card) */}
          <div className="bg-white p-3 flex items-center justify-between gap-2 border-t border-[#e2ebe1]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-[#edf6ec] overflow-hidden shrink-0">
                <img
                  className="w-full h-full object-cover"
                  alt={featuredBangus.name}
                  src={featuredBangus.image}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-[#161d18] truncate">
                  {featuredBangus.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[16px] font-extrabold text-[#004328]">
                    ₱{featuredBangus.price}
                  </span>
                  <span className="text-[10px] text-[#404942]">/ {featuredBangus.unit}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleAddSukiWithFeedback(featuredBangus)}
              className={`flex items-center justify-center px-4 py-2 rounded-xl text-[12px] font-bold transition-all active:scale-95 shadow-sm shrink-0 ${
                addedItemFeedback[featuredBangus.id]
                  ? 'bg-[#004328] text-white'
                  : 'bg-[#febb2d] hover:bg-[#ffdea9] text-[#271900]'
              }`}
            >
              {addedItemFeedback[featuredBangus.id] ? (
                <>
                  <span className="material-symbols-outlined text-[15px] mr-1 animate-spin">
                    check_circle
                  </span>
                  <span>Nadugang!</span>
                </>
              ) : (
                <>
                  <span>Add To Cart</span>
                  <span className="material-symbols-outlined text-[16px] ml-1">
                    shopping_bag
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Popular Street Food Vendors */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-4">
          <div>
            <h3 className="font-bold text-[16px] text-[#161d18]">Popular Street Food Vendors</h3>
            <p className="text-[11px] text-[#404942]">Mainit, malutong, at bagong luto</p>
          </div>
          <button className="text-[11px] font-bold text-[#7d5800] hover:underline">See All</button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 snap-x snap-mandatory">
          {streetFoodVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="snap-start flex flex-col w-40 shrink-0 rounded-xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(13,92,58,0.08)] border border-[#e2ebe1]"
            >
              <div className="relative h-28 w-full bg-[#edf6ec]">
                <img
                  className="w-full h-full object-cover"
                  alt={vendor.name}
                  src={vendor.image}
                />
                <div className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                  <span
                    className="material-symbols-outlined text-[#febb2d] text-[12px] material-symbols-fill"
                  >
                    star
                  </span>
                  <span className="text-[10px] font-bold text-[#161d18]">{vendor.rating}</span>
                </div>
              </div>

              <div className="p-2.5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-[13px] font-bold text-[#161d18] truncate">
                    {vendor.name}
                  </h4>
                  <span className="text-[10px] text-[#404942] block mt-0.5">
                    {vendor.distance} • {vendor.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1">
                  <span className="text-[12px] font-extrabold text-[#004328]">
                    from ₱{vendor.minPrice}
                  </span>
                  <button
                    onClick={() => {
                      const sfProduct: Product = {
                        id: `sf-${vendor.id}`,
                        name: `${vendor.name} Special`,
                        price: vendor.minPrice,
                        unit: 'order',
                        stall: vendor.location,
                        vendor: vendor,
                        vendorId: vendor.id,
                        image: vendor.image,
                        stockState: 'in',
                        category: 'Street Food',
                        reviewCount: 0
                      };
                      handleAddSukiWithFeedback(sfProduct);
                    }}
                    className="w-6 h-6 rounded-full bg-[#a9f3c5] flex items-center justify-center text-[#002111] hover:bg-[#004328] hover:text-white transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fresh Palengke Vegetables (Latag Today) */}
      <section className="px-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[16px] text-[#161d18]">Fresh Palengke Vegetables</h3>
            <p className="text-[11px] text-[#404942]">Bag-ong anihon karong buntag gikan New Corella</p>
          </div>
          <button className="text-[11px] font-bold text-[#004328] hover:underline">View All</button>
        </div>

        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredProducts
            .filter((p) => p.category === 'Fresh Gulay' || p.category === 'Isda & Latag')
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(13,92,58,0.06)] border border-[#e2ebe1] p-2"
              >
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#edf6ec]">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.name}
                    src={item.image}
                  />
                  {item.tag && (
                    <span
                      className={`absolute top-1.5 left-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-xs ${
                        item.tag === 'Top Seller'
                          ? 'bg-[#febb2d] text-[#271900]'
                          : 'bg-[#004328]/90 text-white'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="pt-2 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-extrabold text-[#004328]">
                        ₱{item.price}
                      </span>
                      <span className="text-[10px] text-[#404942]">/ {item.unit}</span>
                    </div>
                    <h4 className="text-[12px] font-bold text-[#161d18] mt-0.5 line-clamp-1">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-[#404942]">
                      <span className="material-symbols-outlined text-[12px] text-[#004328]">
                        storefront
                      </span>
                      <span className="text-[10px] truncate">{item.stall}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddSukiWithFeedback(item)}
                    className={`mt-2.5 w-full py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1 active:scale-95 ${
                      addedItemFeedback[item.id]
                        ? 'bg-[#004328] text-white'
                        : 'bg-[#e2ebe1] hover:bg-[#004328] hover:text-white text-[#004328]'
                    }`}
                  >
                    {addedItemFeedback[item.id] ? (
                      <>
                        <span className="material-symbols-outlined text-[15px] animate-spin">
                          check_circle
                        </span>
                        <span>Nadugang!</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[15px]">
                          add_shopping_cart
                        </span>
                        <span>Add To Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Suki Trust Ledger / Community Guarantee Strip */}
      <section className="px-4 pt-1">
        <div className="rounded-2xl bg-[#e8f0e7] p-3.5 flex items-center gap-3 shadow-xs border border-[#bfc9c0]/40">
          <div className="w-10 h-10 rounded-full bg-[#004328] flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[13px] font-bold text-[#161d18]">
              Diretso sa Tindera Guarantee
            </h4>
            <p className="text-[11px] text-[#404942]">
              100% accurate timbang, sariwang tinda, at walang patong na presyo sa palengke.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

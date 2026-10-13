
import * as Types from "../types";

// ============================================================
// SHARED CONSTANTS
// ============================================================

const now = new Date().toISOString();

const timestamps = {
  createdAt: now,
  updatedAt: now,
};

// ============================================================
// IMAGE URLS
// ============================================================

const images = {
  bangus:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCIf_s0R349O4CuhvyKiWRwojRgIKD_iYFfD5M3M62On_A97y8M_VwGOUOugcn663giDxE1Cy-Ex2MA4bjbTkesd2QAyVKEDSFz9DrR8tHsWCS5_rYiO21hZ84GUl1KxSDxiYL8xZIVM4XJRorxf6Q_RrRsvid6jA9hwvXRdMBBv3bi4s4o86xyRobYlknHMR16VzPPNYcfXJ7VaHHnvs3Ih0CzAd6SWHiKxSb8-xHqGMQ63QxRpg1H",
  tilapia:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAslwy_5gfGw69guTscyncdaeXeHis7OEUJZrdYraa2q2mHgWZcaA2jVURvIRrlBiurb_qglyu0hZzRmOmuhTQ04_h-llJnT-_oMVZyJXv7YniypuoSR4NphKqnpGKIgplT3T2SvKS_8fbOlLcHr5QIeq2oHi18bLA2Q-Pjs3V8T7DEGgWPBpGVdGwh306VDjYyB5XgQVjCy6IqyaocYn2iucWCf-uGigSGdakDz-fqN7259KSz61Hn",
  lapulapu:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBBFwLso4zUCLRpdH7F3NinyCdfJ0UwKFmmK8wFF-WHzPu0V6_yOFXZcX9E7cgJ8a6PT2kQ8YIoH6gfD60itGyXFAC5czwl_g1SavLepl1Q9wdnZWQTyWJrxH95amkiHLvDkrayI3E5E8gKWMszn8x-CunC-xKw7ge5zWTKltILkAdkcPzatsTdFcPBHyLANvIWyyQNapc5tLjMbLCs1O0ZKnO1hUyQ62eFrA1GIUCsexBgaVstSlVC",
  kangkong:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBASqQV-p6Ff9JXxIRIda85AiJByu45VWM1zjQjC1fMoKNYuw_ltPH_qSkW3zq0CTp5F5GMDPr0p9X_mbushPJb4gef5AfgHg6WaQaE7MuFSzCZGcYRa4RV73KSzcb40d_ypxGHDcfrSCznjGdtNlgtw0gJTEmMmjvFMHJu74PnkHrNRD9gFsc8xi_5iAuo7CBQ-DCvPhYa2qy7c23Ioa7WsX66tCzpha6zHKXPtWyIKCpk4aS2jnJa",
  talong:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9jNJJ3z1RzuvLp50uSMH3clZdz_F0BVmvYyAAcfTTA1GZ-lAhsvUNQWXuHS9uw5QS8Qf2r4olEGx6UPRKHhScrDz6w7lAS9E8_A_TyBDNVoRglDfNDOGFzxIopgx-dQLfE5xEf-L4Z_adgtFGGPfQvhFWFyFL-ivvID1no3pgBD4kDCHEpIBP_FtU7n3sZ4GPTzTA2QjM_2oJtFAkGPY-Hf_YGWZ1PPgHwKXbwg9pMaD4bQSxQhU-",
  kamatis:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDIUShNVuTY905j3SCp56FxQ_bxlg0WSzX4c2Uh70lCsyGUkcq47-wESPJRqM-LNGR_aL_zRP-XPbZOZhFl00ZwLkc_JTMpPW7QcZE8QqnN244Hsa0oOzVZJVOJ5H3Gg_27NtyLg5ugLoXF0BHmX3VAVaVe6P7Wndd-Aen17SSdcRGP9gqzf2n8FzwpZ8PpdzjuWXeQ58zl8fo0dylyrdH5VAeLbtDDdZ-Ps7RRT6t2CBoOWHadSNz3",
  kalabasa:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCxSM5ij9TioKTCJ7hX9mE50Gcwdhe_XnVQVYZcoDPA110Fb2DLwzzg5sCd4gmdjlPs_2y-8B3OdEQ7taVDkfI_i_BsX8A8916puIpaL14ZJvuFGU3R4w1HP4qPKkJHXngrftXes85VTIgv-rRhnBc4OCgJtmfk7BUOG00fI0TKu7aFwUvRAKr-rFp8kePOyXpR7yRlhhV2oMMYaXabbBZTiC0BYG_zKM93gXavQPMeIyIY1h3fU7kl",
  bbq:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYTChHKxaY_1EA1gQvVHVQTWhC6C1r4HKjeLh-k1ulmhiSk_MeB215JOJ0cLLGrZhntDDQ1BVPdR1O4fe_nVbBuWYtwaK08IvIKUr-VWzFFLrjXYt976_emi0_0bqccTQ-LGgPpoMalDKOLz1ZXKmf2jGoio7KH_8iXOn7RKTADtO8jCQdbe1jm6TjuBRE-gR-br45C2wYg_1GKh809c1o-pexNIAfEJUKsswbN_9V5MAGDIQPmHkp",
  bibingka:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAN7LX2NhXt-mnTU2XJ7Wd2nWJMTVIquvIw6lqTB61zoOWjiif2VryU5VjH5JCA1PjmuhqDI3SHrieU7QzJ0V98TBNW8Zjr8Yt43sl15AeJOb6VGSOhkVe_-wQz_mscNn3gVZdeUG4FX7hvqLf5lnZx9vA1FF03_Cvb0aEALaZL1KFsJZXhwHqdaDWGyac48c4gbZ2n1ycyq-0LKwBa_iBklEaXF3uNNP6I8S0bscd-fNdmBQqqZD0C",
  mangoes:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAFzC-GZfRkEJwVJMR3tSJXhbqkoIcMIEitGk-CEghdWMKaZQR4tE3axzWLkPZ5drfG69wt0of6wRSxBScWOAaPh9_7zqxFUpEEzkF6JVT1EJ72KsCKBeQaSOgR4h-Fz_sQQeGDleSMgsG11W1pTjnO0A6_gx6noZgz1qykhpl-ck7EymkMrooMx4h7M4rk5QE9Q1MJCYfghdDhPTYhdrsk8XupQBI0BQ3DLmLcrSuWYAbjhAkM4fZf",
  lorna:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuApNR7f_dvyNhw4cai-Ea2TVz94ppAXbtqmKbYkYylf3F4bhr7WMwZuhjuRjfw9piGKVxCOoe5F8JHVN4vtNQN43pD6nrae82VcxuGW99p9bcTCqNEcngroiZ8DAaycJt6oxw8vkRFTJnDtN5KZ-tKyVHT79pi04SNbzENPM7tMPmy1pyzv9oHeZ8Eg1DtUERLuSBmC9A4XrC2Qhjupw2mnx77gZyuq0dNwaXvujfeBCO_nuQcfiZMO",
  lornaAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAfqi3bNIbU7dm9vX9z8Vwzz8dE9aKuK6sGsLWEBalLp0Gz3ogoDjFd8BwExlhgG_Gn_6UVz8_YYVMwDByO2QmS03MLqyE8BLGb41xCUzorig_VclS2-J_4JESTMoscB_ld9mZu2r8VOhBTiw7zSD1G1E4dqwwTb61iF2tfoY_l-bNPJBgd0rRA1BnqsHyXVABToF84-sZ6Gis9U1ZK9_Eg76YxJWga-pP23tTgV2ee_ZZ2N85zp7ce",
  toring:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAbD6q0CNSKv0mfaB57cSACLdjCV30JXFw8EFQZGm6Vo5dWY36GGC5fFOuHX3WxegdPFge3xcOjBpzSKWcKlZfPoDwBrA9ip0pOpQcQQ6Fki-Ya2i1KD7vL8_43p20ugIzKiNxKMuiXSbfBcrkliGN8czbCIILuSz9GO18Ao8fYMDbDi3XYzbWIx3ZqnfcvNFs2a0HoXqhVXRdFZCqEi5Oe1yk-aLjE0znl-0AmvS_MvH06pgdqyJ9q",
  joms:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDQPbXP-rhvca3g-W5iVnMzrRFodzprbnI2Jmhj0BUndBodMbLePmQPy9ba7b3MPn-kGx4RCobBPk4O_x-fFcd62RgzxbDF2fWBrAf7NAEZ4nBYzjv6fHV6D7ZBXlU_AD_PXfvcOyYku6BUEAlJSm2jV3o7cc9HGq4NUYIvGhmIdnujQCldpyBDDX82_18Pw2c7Qel7Go-9-E-FqmVMpY7IBYfrasU93_BMDzFkzoug4i-cJhGhvjnI",
  belen:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAN7LX2NhXt-mnTU2XJ7Wd2nWJMTVIquvIw6lqTB61zoOWjiif2VryU5VjH5JCA1PjmuhqDI3SHrieU7QzJ0V98TBNW8Zjr8Yt43sl15AeJOb6VGSOhkVe_-wQz_mscNn3gVZdeUG4FX7hvqLf5lnZx9vA1FF03_Cvb0aEALaZL1KFsJZXhwHqdaDWGyac48c4gbZ2n1ycyq-0LKwBa_iBklEaXF3uNNP6I8S0bscd-fNdmBQqqZD0C",
  dan:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAFzC-GZfRkEJwVJMR3tSJXhbqkoIcMIEitGk-CEghdWMKaZQR4tE3axzWLkPZ5drfG69wt0of6wRSxBScWOAaPh9_7zqxFUpEEzkF6JVT1EJ72KsCKBeQaSOgR4h-Fz_sQQeGDleSMgsG11W1pTjnO0A6_gx6noZgz1qykhpl-ck7EymkMrooMx4h7M4rk5QE9Q1MJCYfghdDhPTYhdrsk8XupQBI0BQ3DLmLcrSuWYAbjhAkM4fZf",
};

// ============================================================
// USERS
// ============================================================

export const mockUsers: Types.User[] = [
  {
    id: "user-cora",
    username: "nanaycora",
    roles: ["customer"],
    ...timestamps,
  },
  {
    id: "user-lorna",
    username: "atelorna",
    roles: ["vendor"],
    ...timestamps,
  },
  {
    id: "user-toring",
    username: "mangtoring",
    roles: ["vendor"],
    ...timestamps,
  },
  {
    id: "user-joms",
    username: "kuyajoms",
    roles: ["vendor"],
    ...timestamps,
  },
  {
    id: "user-belen",
    username: "nanaybelen",
    roles: ["vendor"],
    ...timestamps,
  },
  {
    id: "user-dan",
    username: "bossdan",
    roles: ["vendor"],
    ...timestamps,
  },
  {
    id: "user-driver-junjun",
    username: "junjun",
    roles: ["driver"],
    ...timestamps,
  },
];

// ============================================================
// CUSTOMERS
// ============================================================

export const mockCustomers: Types.Customer[] = [
  {
    id: "customer-cora",
    userId: "user-cora",
    location: "Tagum Center, Purok 4 Magugpo Poblacion",
    phone: "0917-542-9901",
    ...timestamps,
  },
  {
    id: "customer-maria",
    userId: "user-cora",
    location: "Apokon Highway, near Tagum Doctors Hospital",
    phone: "0920-881-2299",
    ...timestamps,
  },
];

// ============================================================
// DRIVERS
// ============================================================

export const mockDrivers: Types.Driver[] = [
  {
    id: "driver-junjun",
    userId: "user-driver-junjun",
    name: "Tricycle Junjun",
    location: "Tagum Center",
    vehicle: "Kawasaki Barako Sidecar",
    phone: "0917-882-4412",
    ...timestamps,
  },
];

// ============================================================
// PRODUCTS
// ============================================================

export const mockProducts: Types.Product[] = [
  {
    id: "prod-bangus",
    vendorID: "vendor-lorna",
    reviewID: "prod-bangus-review",
    name: "Dagko nga Bangus (Dagupan/Panabo)",
    localName: "Fresh Milkfish",
    price: 180,
    originalPrice: 210,
    unit: "kilo (approx 3 pcs)",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.bangus,
    heroImage: images.bangus,
    stockState: "in_stock",
    stockRemaining: "8 kg remaining",
    isLiveSpecial: true,
    category: "Seafood",
    tag: "Live Special",
    subtitle: "Fresh milkfish from Panabo",
    unitText: "per kilo",
    description:
      "Free gutting & scaling upon request. Freshly arrived from Panabo Fish Port this morning.",
    reviewCount: 38,
    ...timestamps,
  },
  {
    id: "prod-tilapia",
    vendorID: "vendor-lorna",
    reviewID: "prod-tilapia-review",
    name: "Tilapia Buhay (Live Tilapia)",
    localName: "Live Tilapia",
    price: 140,
    originalPrice: 160,
    unit: "kilo",
    quantity: 1,
    minQuantity: 1,
    step: 0.5,
    image: images.tilapia,
    heroImage: images.tilapia,
    stockState: "low_stock",
    stockRemaining: "2.5 kg remaining",
    category: "Seafood",
    tag: "Low Stock",
    subtitle: "Live tilapia, cleaned on order",
    unitText: "per kilo",
    description:
      "Fresh swim-in-basin live tilapia. Very sweet and firm meat, cleaned on order.",
    reviewCount: 21,
    ...timestamps,
  },
  {
    id: "prod-lapulapu",
    vendorID: "vendor-lorna",
    reviewID: "prod-lapulapu-review",
    name: "Lapu-Lapu (Reef Grouper)",
    localName: "Red Lapu-Lapu",
    price: 420,
    originalPrice: 460,
    unit: "kilo",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.lapulapu,
    heroImage: images.lapulapu,
    stockState: "out_of_stock",
    stockRemaining: "Fresh batch coming tomorrow",
    category: "Seafood",
    tag: "Sold Out",
    subtitle: "Premium reef grouper",
    unitText: "per kilo",
    description:
      "Premium fresh catch red grouper, perfect for sweet and sour or steamed with ginger.",
    reviewCount: 12,
    ...timestamps,
  },
  {
    id: "prod-kangkong",
    vendorID: "vendor-lorna",
    reviewID: "prod-kangkong-review",
    name: "Kangkong (River Spinach)",
    localName: "Tagum Native Kangkong",
    price: 20,
    unit: "bundle",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.kangkong,
    heroImage: images.kangkong,
    stockState: "in_stock",
    stockRemaining: "30 bundles",
    category: "Vegetables",
    tag: "Fresh Pick",
    subtitle: "Fresh local river spinach",
    unitText: "per bundle",
    description:
      "Crisp water spinach harvested early morning in New Corella. No chemical sprays.",
    reviewCount: 17,
    ...timestamps,
  },
  {
    id: "prod-talong",
    vendorID: "vendor-toring",
    reviewID: "prod-talong-review",
    name: "Talong (Native Eggplant)",
    localName: "Native Purple Talong",
    price: 45,
    unit: "kilo",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.talong,
    heroImage: images.talong,
    stockState: "in_stock",
    stockRemaining: "15 kg",
    category: "Vegetables",
    tag: "Top Seller",
    subtitle: "Glossy native purple eggplant",
    unitText: "per kilo",
    description:
      "Glossy dark purple local eggplants, sweet and tender for tortang talong or pinakbet.",
    reviewCount: 25,
    ...timestamps,
  },
  {
    id: "prod-kamatis",
    vendorID: "vendor-lorna",
    reviewID: "prod-kamatis-review",
    name: "Kamatis (Native Tomatoes)",
    localName: "Plump Native Tomatoes",
    price: 50,
    unit: "kilo",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.kamatis,
    heroImage: images.kamatis,
    stockState: "in_stock",
    stockRemaining: "20 kg",
    category: "Vegetables",
    tag: "Fresh Pick",
    subtitle: "Ripe native Davao tomatoes",
    unitText: "per kilo",
    description:
      "Ripe, fragrant native Davao tomatoes bursting with natural tanginess.",
    reviewCount: 19,
    ...timestamps,
  },
  {
    id: "prod-kalabasa",
    vendorID: "vendor-toring",
    reviewID: "prod-kalabasa-review",
    name: "Kalabasa (Native Squash)",
    localName: "Sweet Yellow Squash",
    price: 35,
    unit: "kilo",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.kalabasa,
    heroImage: images.kalabasa,
    stockState: "in_stock",
    stockRemaining: "12 kg",
    category: "Vegetables",
    tag: "Farm Direct",
    subtitle: "Sweet golden native squash",
    unitText: "per kilo",
    description:
      "Sweet golden kalabasa with dense rich texture, perfect for ginataang gulay.",
    reviewCount: 14,
    ...timestamps,
  },
  {
    id: "prod-bbq-skewers",
    vendorID: "vendor-joms",
    reviewID: "prod-bbq-skewers-review",
    name: "Special Pork BBQ (10 Sticks)",
    price: 150,
    unit: "bundle (10 sticks)",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.bbq,
    heroImage: images.bbq,
    stockState: "in_stock",
    category: "Street Food",
    tag: "Fresh Off Grill",
    subtitle: "Hot grilled pork barbecue",
    unitText: "per bundle",
    description: "Freshly grilled pork barbecue served with dipping sauce.",
    reviewCount: 42,
    ...timestamps,
  },
  {
    id: "prod-bibingka",
    vendorID: "vendor-belen",
    reviewID: "prod-bibingka-review",
    name: "Special Bibingka with Salted Egg",
    price: 35,
    unit: "box (1 large)",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.bibingka,
    heroImage: images.bibingka,
    stockState: "in_stock",
    category: "Street Food",
    tag: "Morning Fresh",
    subtitle: "Freshly baked bibingka",
    unitText: "per box",
    description: "Fresh bibingka with salted egg, perfect for breakfast or merienda.",
    reviewCount: 27,
    ...timestamps,
  },
  {
    id: "prod-mangoes",
    vendorID: "vendor-dan",
    reviewID: "prod-mangoes-review",
    name: "Carabao Mangoes (Davao Sweet)",
    price: 90,
    unit: "kilo",
    quantity: 1,
    minQuantity: 1,
    step: 1,
    image: images.mangoes,
    heroImage: images.mangoes,
    stockState: "in_stock",
    category: "Fruits",
    tag: "Upcoming",
    subtitle: "Sweet Davao Carabao mangoes",
    unitText: "per kilo",
    description: "Sweet Carabao mangoes from Davao.",
    reviewCount: 16,
    ...timestamps,
  },
];

// ============================================================
// VENDORS
// ============================================================

export const mockVendors: Types.Vendor[] = [
  {
    id: "vendor-lorna",
    userId: "user-lorna",
    name: "Ate Lorna Seafoods",
    stallNumber: "Stall #42",
    marketSection: "Wet Section",
    location: "Tagum City Public Market",
    vendorName: "Ate Lorna Seafoods",
    vendorAvatar: images.lornaAvatar,
    avatarUrl: images.lornaAvatar,
    sukiDuration: "5 years",
    rating: 4.9,
    sukiCount: 284,
    isLive: true,
    isOpen: true,
    statusText: "Live now",
    liveTitle: "Bag-ong abot gikan Panabo Fish Port!",
    category: "Seafood",
    actionType: "watch_live",
    specialty: "Fresh seafood",
    description:
      "Fresh seafood delivered from Panabo Fish Port, including bangus, tilapia, and reef grouper.",
    ...timestamps,
  },
  {
    id: "vendor-toring",
    userId: "user-toring",
    name: "Mang Toring",
    stallNumber: "Stall #18",
    marketSection: "Gulayan",
    location: "Tagum City Public Market",
    vendorName: "Mang Toring",
    vendorAvatar: images.toring,
    avatarUrl: images.toring,
    sukiDuration: "3 years",
    rating: 4.8,
    sukiCount: 142,
    isLive: true,
    isOpen: true,
    statusText: "Live now",
    liveTitle: "Bag-ong anihon gikan New Corella farm!",
    category: "Vegetables",
    actionType: "watch_live",
    specialty: "Fresh vegetables",
    description:
      "Locally grown vegetables, freshly harvested from farms around New Corella.",
    ...timestamps,
  },
  {
    id: "vendor-joms",
    userId: "user-joms",
    name: "Kuya Joms Inihaw",
    stallNumber: "Gate 3",
    marketSection: "Food Court",
    location: "Tagum City Public Market",
    vendorName: "Kuya Joms Inihaw",
    vendorAvatar: images.joms,
    avatarUrl: images.joms,
    sukiDuration: "2 years",
    rating: 4.9,
    sukiCount: 519,
    isLive: true,
    isOpen: true,
    statusText: "Live now",
    liveTitle: "Mainit nga pork BBQ ug isaw!",
    category: "Street Food",
    actionType: "watch_live",
    specialty: "Grilled street food",
    description:
      "Hot pork barbecue and grilled street food served with sweet and sour dipping sauce.",
    ...timestamps,
  },
  {
    id: "vendor-belen",
    userId: "user-belen",
    name: "Nanay Belen Kakanin",
    stallNumber: "Stall #8",
    marketSection: "Kakanin Lane",
    location: "Tagum City Public Market",
    vendorName: "Nanay Belen Kakanin",
    vendorAvatar: images.belen,
    avatarUrl: images.belen,
    sukiDuration: "4 years",
    rating: 4.8,
    sukiCount: 96,
    isLive: true,
    isOpen: true,
    statusText: "Live now",
    liveTitle: "Bag-ong luto nga bibingka ug biko!",
    category: "Street Food",
    actionType: "watch_live",
    specialty: "Traditional kakanin",
    description:
      "Freshly prepared bibingka and traditional Filipino rice cakes.",
    ...timestamps,
  },
  {
    id: "vendor-dan",
    userId: "user-dan",
    name: "Boss Dan Prutas",
    stallNumber: "Stall #5",
    marketSection: "Fruit Section",
    location: "Tagum City Public Market",
    vendorName: "Boss Dan Prutas",
    vendorAvatar: images.dan,
    avatarUrl: images.dan,
    sukiDuration: "1 year",
    rating: 4.7,
    sukiCount: 310,
    isLive: false,
    isOpen: true,
    statusText: "Scheduled",
    liveTitle: "Tam-is nga Manggang Carabao!",
    category: "Fruits",
    actionType: "alert_me",
    specialty: "Fresh local fruits",
    description:
      "Fresh and sweet Carabao mangoes and other seasonal fruits from Davao.",
    ...timestamps,
  },
];

// ============================================================
// THUMBNAILS
// ============================================================

export const mockThumbnails: Types.Thumbnail[] = mockProducts.map(
  (product, index) => ({
    id: `thumbnail-${product.id}`,
    productId: product.id,
    url: product.image,
    label: `${product.name} image`,
    sortOrder: index + 1,
    ...timestamps,
  })
);

// ============================================================
// REVIEWS
// ============================================================

export const mockReviews: Types.Review[] = [
  {
    id: "review-1",
    productId: "prod-bangus",
    customerId: "customer-cora",
    vendorId: "vendor-lorna",
    rating: 5,
    comment: "Fresh kaayo ang bangus. Limpyo pud pagkahiwa!",
    location: "Tagum Center",
    tier: "Diamond Suki",
    prepTag: "Cleaned",
    verifiedSuki: true,
    avatarColor: "#D9EAD3",
    initials: "NC",
    ...timestamps,
  },
  {
    id: "review-2",
    productId: "prod-tilapia",
    customerId: "customer-maria",
    vendorId: "vendor-lorna",
    rating: 5,
    comment: "Fresh and sweet ang tilapia.",
    location: "Apokon",
    tier: "Gold Suki",
    prepTag: "Cleaned",
    verifiedSuki: true,
    avatarColor: "#FCE5CD",
    initials: "MS",
    ...timestamps,
  },
  {
    id: "review-3",
    productId: "prod-talong",
    customerId: "customer-cora",
    vendorId: "vendor-toring",
    rating: 4,
    comment: "Nindot ang talong ug presko pa.",
    location: "Tagum Center",
    tier: "Diamond Suki",
    verifiedSuki: true,
    avatarColor: "#D9D2E9",
    initials: "NC",
    ...timestamps,
  },
  {
    id: "review-4",
    productId: "prod-bbq-skewers",
    customerId: "customer-maria",
    vendorId: "vendor-joms",
    rating: 5,
    comment: "Lami kaayo ang BBQ, bag-o pa naluto.",
    location: "Apokon",
    tier: "Gold Suki",
    verifiedSuki: true,
    avatarColor: "#CFE2F3",
    initials: "MS",
    ...timestamps,
  },
];

// ============================================================
// CUSTOMER-VENDOR RELATIONSHIPS
// ============================================================

export const mockCustomerVendors: Types.CustomerVendor[] = [
  {
    id: "cv-1",
    customerId: "customer-cora",
    vendorId: "vendor-lorna",
    ...timestamps,
  },
  {
    id: "cv-2",
    customerId: "customer-cora",
    vendorId: "vendor-toring",
    ...timestamps,
  },
  {
    id: "cv-3",
    customerId: "customer-maria",
    vendorId: "vendor-lorna",
    ...timestamps,
  },
  {
    id: "cv-4",
    customerId: "customer-maria",
    vendorId: "vendor-joms",
    ...timestamps,
  },
];

// ============================================================
// SUKI CUSTOMERS
// ============================================================

export const mockSukiCustomers: Types.SukiCustomer[] = [
  {
    id: "suki-1",
    customerId: "customer-cora",
    vendorId: "vendor-lorna",
    tier: "Diamond Suki",
    totalOrders: 38,
    totalSpent: 12450,
    outstandingBalance: 0,
    lastOrdered: "Today, 6:30 AM",
    notes: "Gusto pirmi hinlo ang isda ug pahiwaon sa tulo ka bahin.",
    ...timestamps,
  },
  {
    id: "suki-2",
    customerId: "customer-maria",
    vendorId: "vendor-lorna",
    tier: "Gold Suki",
    totalOrders: 21,
    totalSpent: 6720,
    outstandingBalance: 120,
    lastOrdered: "Today, 6:40 AM",
    notes: "Magbayad via GCash pag abot sa tricycle.",
    ...timestamps,
  },
  {
    id: "suki-3",
    customerId: "customer-cora",
    vendorId: "vendor-toring",
    tier: "Diamond Suki",
    totalOrders: 45,
    totalSpent: 28900,
    outstandingBalance: 0,
    lastOrdered: "Yesterday",
    notes: "Regular vegetable customer.",
    ...timestamps,
  },
  {
    id: "suki-4",
    customerId: "customer-maria",
    vendorId: "vendor-belen",
    tier: "Regular Suki",
    totalOrders: 9,
    totalSpent: 3100,
    outstandingBalance: 0,
    lastOrdered: "2 days ago",
    notes: "Early morning orders.",
    ...timestamps,
  },
];

// ============================================================
// CARTS
// ============================================================

export const mockCarts: Types.Cart[] = [
  {
    id: "cart-cora",
    customerId: "customer-cora",
    ...timestamps,
  },
  {
    id: "cart-maria",
    customerId: "customer-maria",
    ...timestamps,
  },
];

// ============================================================
// CART ITEMS
// ============================================================

export const mockCartItems: Types.CartItem[] = [
  {
    id: "cart-item-1",
    customerId: "customer-cora",
    productId: "prod-bangus",
    quantity: 2,
    note: "Paki kaliskis & hiwa 3 parts",
    ...timestamps,
  },
  {
    id: "cart-item-2",
    customerId: "customer-cora",
    productId: "prod-kangkong",
    quantity: 2,
    note: "Fresh bundles",
    ...timestamps,
  },
  {
    id: "cart-item-3",
    customerId: "customer-maria",
    productId: "prod-tilapia",
    quantity: 1,
    note: "Standard clean",
    ...timestamps,
  },
];

// ============================================================
// ORDERS
// ============================================================

export const mockOrders: Types.Order[] = [
  {
    id: "1042",
    customerId: "customer-cora",
    driverId: "driver-junjun",
    customerAddress: "Tagum Center, Purok 4 Magugpo Poblacion",
    orders: [
      {
        id: "order-cart-item-1042",
        customerId: "customer-cora",
        productId: "prod-bangus",
        quantity: 2,
        note: "Paki kaliskis & hiwa 3 parts",
        ...timestamps,
      },
    ],
    totalPrice: 360,
    status: "ready",
    paymentMethod: "COD",
    specialInstructions: "Paki kaliskis & hiwa 3 parts",
    ...timestamps,
  },
  {
    id: "1043",
    customerId: "customer-maria",
    driverId: "driver-junjun",
    customerAddress: "Apokon Highway, near Tagum Doctors Hospital",
    orders: [
      {
        id: "order-cart-item-1043",
        customerId: "customer-maria",
        productId: "prod-tilapia",
        quantity: 1,
        note: "Standard clean",
        ...timestamps,
      },
    ],
    totalPrice: 140,
    status: "preparing",
    paymentMethod: "GCash",
    specialInstructions: "Standard clean",
    ...timestamps,
  },
];

// ============================================================
// ORDER ITEMS
// ============================================================

export const mockOrderItems: Types.OrderItem[] = [
  {
    id: "order-item-1",
    orderId: "1042",
    productId: "prod-bangus",
    productName: "Dagko nga Bangus (Dagupan/Panabo)",
    unitPrice: 180,
    unit: "kilo (approx 3 pcs)",
    quantity: 2,
    note: "Paki kaliskis & hiwa 3 parts",
    ...timestamps,
  },
  {
    id: "order-item-2",
    orderId: "1043",
    productId: "prod-tilapia",
    productName: "Tilapia Buhay (Live Tilapia)",
    unitPrice: 140,
    unit: "kilo",
    quantity: 1,
    note: "Standard clean",
    ...timestamps,
  },
];

// ============================================================
// LIVE VENDORS
// ============================================================

export const mockLiveVendors: Types.LiveVendor[] = [
  {
    id: "live-lorna",
    vendorId: "vendor-lorna",
    pinnedProductId: "prod-bangus",
    category: "Bangus & Isda",
    image: images.lorna,
    avatar: images.lornaAvatar,
    viewers: 284,
    likes: 1420,
    liveCatchphrase:
      "Bag-ong abot gikan Panabo Fish Port! Diretso latag!",
    streamImage: images.bangus,
    ...timestamps,
  },
  {
    id: "live-toring",
    vendorId: "vendor-toring",
    pinnedProductId: "prod-talong",
    category: "Fresh Gulay",
    image: images.toring,
    avatar: images.toring,
    viewers: 142,
    likes: 830,
    liveCatchphrase:
      "Bag-ong anihon gikan New Corella farm karong buntag!",
    streamImage: images.talong,
    ...timestamps,
  },
  {
    id: "live-joms",
    vendorId: "vendor-joms",
    pinnedProductId: "prod-bbq-skewers",
    category: "Inihaw & BBQ",
    image: images.joms,
    avatar: images.joms,
    viewers: 519,
    likes: 2410,
    liveCatchphrase:
      "Mainit nga pork BBQ ug isaw! Aslom-tam-is suka!",
    streamImage: images.bbq,
    ...timestamps,
  },
  {
    id: "live-belen",
    vendorId: "vendor-belen",
    pinnedProductId: "prod-bibingka",
    category: "Kakanin Treats",
    image: images.belen,
    avatar: images.belen,
    viewers: 96,
    likes: 640,
    liveCatchphrase:
      "Bag-ong luto nga bibingka ug biko nga may latik!",
    streamImage: images.bibingka,
    ...timestamps,
  },
  {
    id: "live-dan",
    vendorId: "vendor-dan",
    pinnedProductId: "prod-mangoes",
    category: "Prutas Stand",
    image: images.dan,
    avatar: images.dan,
    viewers: 0,
    likes: 310,
    liveCatchphrase:
      "Tam-is nga Manggang Carabao ug Davao Pomelo!",
    streamImage: images.mangoes,
    scheduleTime: "10:30 AM",
    ...timestamps,
  },
];

// ============================================================
// LIVE CHAT MESSAGES
// ============================================================

export const mockLiveChatMessages: Types.LiveChatMessage[] = [
  {
    id: "chat-1",
    liveVendorId: "live-lorna",
    senderUserId: "user-cora",
    text: "Pila ang bangus kada kilo?",
    isHost: false,
    isPurchaseNotice: false,
    ...timestamps,
  },
  {
    id: "chat-2",
    liveVendorId: "live-lorna",
    senderUserId: "user-lorna",
    text: "₱180 per kilo karon, fresh gikan Panabo!",
    isHost: true,
    isPurchaseNotice: false,
    ...timestamps,
  },
  {
    id: "chat-3",
    liveVendorId: "live-lorna",
    senderUserId: "user-cora",
    text: "Order ko ug 2 kilos!",
    isHost: false,
    isPurchaseNotice: true,
    ...timestamps,
  },
  {
    id: "chat-4",
    liveVendorId: "live-joms",
    senderUserId: "user-maria",
    text: "Naa pa BBQ?",
    isHost: false,
    isPurchaseNotice: false,
    ...timestamps,
  },
  {
    id: "chat-5",
    liveVendorId: "live-joms",
    senderUserId: "user-joms",
    text: "Naa pa! Bag-o pa naluto.",
    isHost: true,
    isPurchaseNotice: false,
    ...timestamps,
  },
];

// ============================================================
// GENERIC FIND BY ID
// ============================================================

export const findById = <T extends Types.BaseEntity>(
  data: T[],
  id: string
): T | undefined => {
  return data.find((item) => item.id === id);
};

// ============================================================
// INDIVIDUAL LOOKUP FUNCTIONS
// ============================================================

export const findUserById = (id: string) =>
  findById(mockUsers, id);

export const findCustomerById = (id: string) =>
  findById(mockCustomers, id);

export const findDriverById = (id: string) =>
  findById(mockDrivers, id);

export const findVendorById = (id: string) =>
  findById(mockVendors, id);

export const findProductById = (id: string) =>
  findById(mockProducts, id);

export const findThumbnailById = (id: string) =>
  findById(mockThumbnails, id);

export const findReviewById = (id: string) =>
  findById(mockReviews, id);

export const findCustomerVendorById = (id: string) =>
  findById(mockCustomerVendors, id);

export const findSukiCustomerById = (id: string) =>
  findById(mockSukiCustomers, id);

export const findCartById = (id: string) =>
  findById(mockCarts, id);

export const findCartItemById = (id: string) =>
  findById(mockCartItems, id);

export const findOrderById = (id: string) =>
  findById(mockOrders, id);

export const findOrderItemById = (id: string) =>
  findById(mockOrderItems, id);

export const findLiveVendorById = (id: string) =>
  findById(mockLiveVendors, id);

export const findLiveChatMessageById = (id: string) =>
  findById(mockLiveChatMessages, id);

// ============================================================
// RELATIONSHIP LOOKUP FUNCTIONS
// ============================================================

export const findProductsByVendorId = (vendorId: string) =>
  mockProducts.filter((product) => product.vendorID === vendorId);

export const findOrdersByCustomerId = (customerId: string) =>
  mockOrders.filter((order) => order.customerId === customerId);

export const findOrderItemsByOrderId = (orderId: string) =>
  mockOrderItems.filter((item) => item.orderId === orderId);

export const findCartItemsByCustomerId = (customerId: string) =>
  mockCartItems.filter((item) => item.customerId === customerId);

export const findReviewsByProductId = (productId: string) =>
  mockReviews.filter((review) => review.productId === productId);

export const findReviewsByVendorId = (vendorId: string) =>
  mockReviews.filter((review) => review.vendorId === vendorId);

export const findSukiCustomersByVendorId = (vendorId: string) =>
  mockSukiCustomers.filter((customer) => customer.vendorId === vendorId);

export const findSukiCustomersByCustomerId = (customerId: string) =>
  mockSukiCustomers.filter((customer) => customer.customerId === customerId);

export const findVendorsByCustomerId = (customerId: string) =>
  mockCustomerVendors
    .filter((relationship) => relationship.customerId === customerId)
    .map((relationship) => findVendorById(relationship.vendorId))
    .filter((vendor): vendor is Types.Vendor => vendor !== undefined);

export const findCustomersByVendorId = (vendorId: string) =>
  mockCustomerVendors
    .filter((relationship) => relationship.vendorId === vendorId)
    .map((relationship) => findCustomerById(relationship.customerId))
    .filter((customer): customer is Types.Customer => customer !== undefined);

export const findChatMessagesByLiveVendorId = (liveVendorId: string) =>
  mockLiveChatMessages.filter(
    (message) => message.liveVendorId === liveVendorId
  );

export const findLiveVendorByVendorId = (vendorId: string) =>
  mockLiveVendors.find((liveVendor) => liveVendor.vendorId === vendorId);

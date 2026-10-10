import { Product, SukiRecord } from '../types';

import bangusHeroImg from '../assets/images/fresh_dagupan_bangus_1791613038097.jpg';
import ateLornaImg from '../assets/images/ate_lorna_vendor_1791613052120.jpg';
import latagBasketImg from '../assets/images/market_fish_latag_1791613070471.jpg';
import liveCamStreamImg from '../assets/images/live_latag_stream_1791613081178.jpg';

export { bangusHeroImg, ateLornaImg, latagBasketImg, liveCamStreamImg };

export const PRIMARY_PRODUCT: Product = {
  id: 'dagupan-bangus',
  name: 'Fresh Dagupan Bangus (Milkfish)',
  subtitle: 'Lab-as kaayo gikan dunggoanan • Galing sa umagang latag port arrival',
  pricePerKilo: 180,
  unitText: '/ kilo (approx. 2–3 pcs)',
  minWeightKg: 0.5,
  stepKg: 0.5,
  availableKg: 24.5,
  heroImage: bangusHeroImg,
  thumbnails: [
    {
      id: 'thumb-1',
      url: bangusHeroImg,
      label: 'Fresh Gills & Eyes Check',
    },
    {
      id: 'thumb-2',
      url: ateLornaImg,
      label: 'Ate Lorna Prepping at Stall',
    },
    {
      id: 'thumb-3',
      url: latagBasketImg,
      label: 'Umagang Latag Catch',
    },
  ],
  stallName: "Ate Lorna's Fish Stall",
  stallLocation: 'Tagum Public Market • Wet Section Stall #14',
  stallRating: 4.98,
  stallSukiCount: '1.2k+ Suki',
  replyTime: 'Replies < 2 mins',
  vendorName: 'Ate Lorna Capulong',
  vendorAvatar: ateLornaImg,
  freshnessScore: 5.0,
  prepScore: 5.0,
  deliveryScore: 5.0,
  reviewCount: 248,
  availableCuts: [
    {
      id: 'hawanon-daing',
      title: 'Hawanon & Daing Cut (Butterfly)',
      description: 'Scaled, gutted, split open like butterfly for daing / frying. Most popular!',
      isDefault: true,
    },
    {
      id: 'sinigang-cut',
      title: 'Hawanon & Sinigang Steaks',
      description: 'Cleaned, descaled, cut into 3–4 round thick steaks with head & belly intact.',
    },
    {
      id: 'inihaw-gutted',
      title: 'Hawanon for Inihaw (Stuffing Ready)',
      description: 'Descaled, gills and innards removed through gill slit; whole belly cavity kept intact.',
    },
    {
      id: 'buo-as-is',
      title: 'Buo / As-Is (Whole Uncut)',
      description: 'Fresh milkfish kept as-is on ice with scales intact.',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Nanay Corazon',
      tier: 'Suki Tier 3',
      location: 'Magugpo East',
      timestamp: '2 hrs ago',
      rating: 5.0,
      comment:
        '“Lab-as kaayo ang bangus! Limpyo kaayo pagka-hawan sa himbis ug maayo pagka-yelo. Daghan kaayong unod walay bahong lapok.”',
      prepTag: 'Ordered Hawanon & Daing Cut',
      verifiedSuki: true,
      avatarColor: 'bg-[#bbf7d0] text-[#14532d]',
      initials: 'NC',
    },
    {
      id: 'rev-2',
      author: 'Mang Kanor',
      location: 'Apokon, Tagum',
      timestamp: 'Today 8:15 AM',
      rating: 5.0,
      comment:
        '“Delivered in 15 mins by Manong Junjun\'s tricycle! Matig-a pa ang unod, puno og yelo sa bayong packaging. Suki na gyud ko dire.”',
      verifiedSuki: true,
      avatarColor: 'bg-[#fde68a] text-[#78350f]',
      initials: 'MK',
    },
    {
      id: 'rev-3',
      author: 'Teacher Joy Morales',
      tier: 'Suki Tier 2',
      location: 'Mankilam, Tagum City',
      timestamp: 'Yesterday 4:30 PM',
      rating: 5.0,
      comment:
        '“Tam-is ug lab-as ang unod sa bangus pang-sinigang! Pag-chat nako kay Ate Lorna dali kaayo naka-reply sa Live Cam.”',
      prepTag: 'Ordered Hawanon & Sinigang Steaks',
      verifiedSuki: true,
      avatarColor: 'bg-[#fed7aa] text-[#9a3412]',
      initials: 'JM',
    },
  ],
};

export const MARKET_CATEGORIES = [
  { id: 'all', label: 'All Latag', icon: '🧺' },
  { id: 'isda', label: 'Isda & Seafood', icon: '🐟', count: '14 Stalls' },
  { id: 'karne', label: 'Karne & Baboy', icon: '🥩', count: '9 Stalls' },
  { id: 'gulay', label: 'Gulay & Bukidnon', icon: '🥬', count: '18 Stalls' },
  { id: 'streetfood', label: 'Street Food & Inihaw', icon: '🍢', count: '12 Stalls' },
  { id: 'sangkap', label: 'Sangkap & Spices', icon: '🧅', count: '8 Stalls' },
];

export const OTHER_PRODUCTS: Product[] = [
  PRIMARY_PRODUCT,
  {
    id: 'yellowfin-tuna-bariles',
    name: 'Fresh Davao Gulf Yellowfin Tuna (Bariles)',
    subtitle: 'Sariwang hiwa gikan sa General Santos / Mati port • Sashimi & Inihaw Grade',
    price: 340,
    unitText: '/ kilo (boneless belly or steak cut)',
    minQuantity: 0.5,
    step: 0.5,
    quantity: 18.0,
    heroImage: latagBasketImg,
    thumbnails: [
      { id: 't1', url: latagBasketImg, label: 'Fresh Tuna Latag' },
      { id: 't2', url: liveCamStreamImg, label: 'Live Cutting Board' },
    ],
    vendor.stall: "Manong Ben's Tuna & Seafood",
    stallLocation: 'Tagum Public Market • Wet Section Stall #08',
    stallRating: 4.96,
    stallSukiCount: '980+ Suki',
    replyTime: 'Replies < 1 min',
    vendorName: 'Manong Benjie',
    vendorAvatar: ateLornaImg,
    freshnessScore: 4.98,
    prepScore: 4.95,
    deliveryScore: 4.97,
    reviewCount: 184,
    availableCuts: [
      { id: 'steak-cut', title: 'Steak Cut (With Bone)', description: 'Thick round slices ideal for bistek & inihaw.', isDefault: true },
      { id: 'panga-belly', title: 'Boneless Tuna Belly Slices', description: 'Fatty succulent tuna belly strips.' },
      { id: 'kinilaw-cubes', title: 'Kinilaw Cubes Cut', description: 'Bite-sized cubes ready for vinegar & calamansi.' },
    ],
    reviews: [
      {
        id: 'r-tuna-1',
        author: 'Kapitan Ronnie',
        tier: 'Suki Tier 3',
        location: 'Visayan Village',
        timestamp: '3 hrs ago',
        rating: 5.0,
        comment: '“Pula pa kaayo ang unod sa bariles! Kinilaw dayon pag-abot sa tricycle, tam-is kaayo walay lansa.”',
        verifiedSuki: true,
        avatarColor: 'bg-[#bae6fd] text-[#0369a1]',
        initials: 'KR',
      },
    ],
  },
  {
    id: 'sariwang-pasayan-sugpo',
    name: 'Fresh Sugpo / White Shrimps (Pasayan)',
    subtitle: 'Diretso gikan sa Panabo Fishpond • Masikip pa ang balat at matamis ang ulo',
    pricePerKilo: 420,
    unitText: '/ kilo (approx. 20–25 pcs)',
    minWeightKg: 0.5,
    stepKg: 0.5,
    availableKg: 12.0,
    heroImage: liveCamStreamImg,
    thumbnails: [
      { id: 'p1', url: liveCamStreamImg, label: 'Live Harvest Tray' },
    ],
    stallName: "Ate Lorna's Fish Stall",
    stallLocation: 'Tagum Public Market • Wet Section Stall #14',
    stallRating: 4.98,
    stallSukiCount: '1.2k+ Suki',
    replyTime: 'Replies < 2 mins',
    vendorName: 'Ate Lorna Capulong',
    vendorAvatar: ateLornaImg,
    freshnessScore: 5.0,
    prepScore: 4.96,
    deliveryScore: 5.0,
    reviewCount: 142,
    availableCuts: [
      { id: 'whole-shrimp', title: 'Buo sa Yelo (Whole On Ice)', description: 'Crisp whole shrimp with shell & head intact.', isDefault: true },
      { id: 'deveined', title: 'Trimmed Whiskers & Tail', description: 'Beards trimmed off ready for butter garlic.' },
    ],
    reviews: [
      {
        id: 'r-shrimp-1',
        author: 'Dra. Patricia Lim',
        location: 'San Miguel, Tagum',
        timestamp: 'Today 7:45 AM',
        rating: 5.0,
        comment: '“Mamingwit ug presko gyud! Matig-a ang ulo ug lamian kaayo ang taba.”',
        verifiedSuki: true,
        avatarColor: 'bg-[#fbcfe8] text-[#9d174d]',
        initials: 'PL',
      },
    ],
  },
];

export const INITIAL_SUKI_RECORDS: SukiRecord[] = [
  {
    id: 'SUKI-9021',
    date: 'Oct 8, 2026',
    stall: "Ate Lorna's Fish Stall",
    items: '2.0 kg Dagupan Bangus (Hawanon & Daing Cut)',
    amount: 360,
    pointsEarned: 36,
    status: 'Delivered',
    paidVia: 'GCash',
  },
  {
    id: 'SUKI-8840',
    date: 'Oct 5, 2026',
    stall: "Manong Ben's Tuna & Seafood",
    items: '1.5 kg Yellowfin Tuna Slices (Kinilaw Cubes)',
    amount: 510,
    pointsEarned: 51,
    status: 'Delivered',
    paidVia: 'Kaliwaan (COD)',
  },
  {
    id: 'SUKI-8612',
    date: 'Sep 29, 2026',
    stall: "Aling Tessie's Gulayan",
    items: 'Kalabasa, Sitaw, Talong & 1kg Sibuyas Bawang',
    amount: 220,
    pointsEarned: 22,
    status: 'Delivered',
    paidVia: 'GCash',
  },
];

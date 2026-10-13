// import { LiveVendor, Product, StreetFoodVendor, Order, SukiCustomer } from '../types';

// export const INITIAL_PRODUCTS: Product[] = [
//   {
//     id: 'prod-bangus',
//     name: 'Dagko nga Bangus (Dagupan/Panabo)',
//     localName: 'Fresh Milkfish',
//     price: 180,
//     originalPrice: 210,
//     unit: 'kilo (approx 3 pcs)',
//     stall: 'Stall #42 Wet Section',
//     vendorName: 'Ate Lorna Seafoods',
//     vendorId: 'vendor-lorna',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIf_s0R349O4CuhvyKiWRwojRgIKD_iYFfD5M3M62On_A97y8M_VwGOUOugcn663giDxE1Cy-Ex2MA4bjbTkesd2QAyVKEDSFz9DrR8tHsWCS5_rYiO21hZ84GUl1KxSDxiYL8xZIVM4XJRorxf6Q_RrRsvid6jA9hwvXRdMBBv3bi4s4o86xyRobYlknHMR16VzPPNYcfXJ7VaHHnvs3Ih0CzAd6SWHiKxSb8-xHqGMQ63QxRpg1H',
//     stockState: 'in',
//     stockRemaining: '8 kg remaining',
//     isLiveSpecial: true,
//     category: 'Isda & Latag',
//     tag: 'Live Special',
//     description: 'Free gutting & scaling upon request. Freshly arrived from Panabo Fish Port this morning.'
//   },
//   {
//     id: 'prod-tilapia',
//     name: 'Tilapia Buhay (Live Tilapia)',
//     localName: 'Live Tilapia',
//     price: 140,
//     originalPrice: 160,
//     unit: 'kilo',
//     stall: 'Stall #42 Wet Section',
//     vendorName: 'Ate Lorna Seafoods',
//     vendorId: 'vendor-lorna',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAslwy_5gfGw69guTscyncdaeXeHis7OEUJZrdYraa2q2mHgWZcaA2jVURvIRrlBiurb_qglyu0hZzRmOmuhTQ04_h-llJnT-_oMVZyJXv7YniypuoSR4NphKqnpGKIgplT3T2SvKS_8fbOlLcHr5QIeq2oHi18bLA2Q-Pjs3V8T7DEGgWPBpGVdGwh306VDjYyB5XgQVjCy6IqyaocYn2iucWCf-uGigSGdakDz-fqN7259KSz61Hn',
//     stockState: 'low',
//     stockRemaining: '2.5 kg remaining',
//     category: 'Isda & Latag',
//     tag: 'Low Stock',
//     description: 'Fresh swim-in-basin live tilapia. Very sweet and firm meat, cleaned on order.'
//   },
//   {
//     id: 'prod-lapulapu',
//     name: 'Lapu-Lapu (Reef Grouper)',
//     localName: 'Red Lapu-Lapu',
//     price: 420,
//     originalPrice: 460,
//     unit: 'kilo',
//     stall: 'Stall #42 Wet Section',
//     vendorName: 'Ate Lorna Seafoods',
//     vendorId: 'vendor-lorna',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBFwLso4zUCLRpdH7F3NinyCdfJ0UwKFmmK8wFF-WHzPu0V6_yOFXZcX9E7cgJ8a6PT2kQ8YIoH6gfD60itGyXFAC5czwl_g1SavLepl1Q9wdnZWQTyWJrxH95amkiHLvDkrayI3E5E8gKWMszn8x-CunC-xKw7ge5zWTKltILkAdkcPzatsTdFcPBHyLANvIWyyQNapc5tLjMbLCs1O0ZKnO1hUyQ62eFrA1GIUCsexBgaVstSlVC',
//     stockState: 'sold',
//     stockRemaining: 'Fresh batch coming tomorrow',
//     category: 'Isda & Latag',
//     tag: 'Sold Out',
//     description: 'Premium fresh catch red grouper, perfect for sweet and sour or steamed with ginger.'
//   },
//   {
//     id: 'prod-kangkong',
//     name: 'Kangkong (River Spinach)',
//     localName: 'Tagum Native Kangkong',
//     price: 20,
//     unit: 'bundle',
//     stall: "Ate Lorna's Latag",
//     vendorName: 'Ate Lorna',
//     vendorId: 'vendor-lorna',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBASqQV-p6Ff9JXxIRIda85AiJByu45VWM1zjQjC1fMoKNYuw_ltPH_qSkW3zq0CTp5F5GMDPr0p9X_mbushPJb4gef5AfgHg6WaQaE7MuFSzCZGcYRa4RV73KSzcb40d_ypxGHDcfrSCznjGdtNlgtw0gJTEmMmjvFMHJu74PnkHrNRD9gFsc8xi_5iAuo7CBQ-DCvPhYa2qy7c23Ioa7WsX66tCzpha6zHKXPtWyIKCpk4aS2jnJa',
//     stockState: 'in',
//     stockRemaining: '30 bundles',
//     category: 'Fresh Gulay',
//     tag: 'Fresh Pick',
//     description: 'Crisp water spinach harvested early morning in New Corella. No chemical sprays.'
//   },
//   {
//     id: 'prod-talong',
//     name: 'Talong (Native Eggplant)',
//     localName: 'Native Purple Talong',
//     price: 45,
//     unit: 'kilo',
//     stall: "Mang Toring's Stand",
//     vendorName: 'Mang Toring',
//     vendorId: 'vendor-toring',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9jNJJ3z1RzuvLp50uSMH3clZdz_F0BVmvYyAAcfTTA1GZ-lAhsvUNQWXuHS9uw5QS8Qf2r4olEGx6UPRKHhScrDz6w7lAS9E8_A_TyBDNVoRglDfNDOGFzxIopgx-dQLfE5xEf-L4Z_adgtFGGPfQvhFWFyFL-ivvID1no3pgBD4kDCHEpIBP_FtU7n3sZ4GPTzTA2QjM_2oJtFAkGPY-Hf_YGWZ1PPgHwKXbwg9pMaD4bQSxQhU-',
//     stockState: 'in',
//     stockRemaining: '15 kg',
//     category: 'Fresh Gulay',
//     tag: 'Top Seller',
//     description: 'Glossy dark purple local eggplants, sweet and tender for tortang talong or pinakbet.'
//   },
//   {
//     id: 'prod-kamatis',
//     name: 'Kamatis (Native Tomatoes)',
//     localName: 'Plump Native Tomatoes',
//     price: 50,
//     unit: 'kilo',
//     stall: "Ate Lorna's Latag",
//     vendorName: 'Ate Lorna',
//     vendorId: 'vendor-lorna',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIUShNVuTY905j3SCp56FxQ_bxlg0WSzX4c2Uh70lCsyGUkcq47-wESPJRqM-LNGR_aL_zRP-XPbZOZhFl00ZwLkc_JTMpPW7QcZE8QqnN244Hsa0oOzVZJVOJ5H3Gg_27NtyLg5ugLoXF0BHmX3VAVaVe6P7Wndd-Aen17SSdcRGP9gqzf2n8FzwpZ8PpdzjuWXeQ58zl8fo0dylyrdH5VAeLbtDDdZ-Ps7RRT6t2CBoOWHadSNz3',
//     stockState: 'in',
//     stockRemaining: '20 kg',
//     category: 'Fresh Gulay',
//     tag: 'Fresh Pick',
//     description: 'Ripe, fragrant native Davao tomatoes bursting with natural tanginess.'
//   },
//   {
//     id: 'prod-kalabasa',
//     name: 'Kalabasa (Native Squash)',
//     localName: 'Sweet Yellow Squash',
//     price: 35,
//     unit: 'kilo',
//     stall: "Mang Toring's Stand",
//     vendorName: 'Mang Toring',
//     vendorId: 'vendor-toring',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxSM5ij9TioKTCJ7hX9mE50Gcwdhe_XnVQVYZcoDPA110Fb2DLwzzg5sCd4gmdjlPs_2y-8B3OdEQ7taVDkfI_i_BsX8A8916puIpaL14ZJvuFGU3R4w1HP4qPKkJHXngrftXes85VTIgv-rRhnBc4OCgJtmfk7BUOG00fI0TKu7aFwUvRAKr-rFp8kePOyXpR7yRlhhV2oMMYaXabbBZTiC0BYG_zKM93gXavQPMeIyIY1h3fU7kl',
//     stockState: 'in',
//     stockRemaining: '12 kg',
//     category: 'Fresh Gulay',
//     tag: 'Farm Direct',
//     description: 'Sweet golden kalabasa with dense rich texture, perfect for ginataang gulay.'
//   }
// ];

// export const LIVE_VENDORS: LiveVendor[] = [
//   {
//     id: 'vendor-lorna',
//     name: 'Ate Lorna',
//     stall: 'Stall #42 Tagum Wet Section',
//     category: 'Bangus & Isda',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApNR7f_dvyNhw4cai-Ea2TVz94ppAXbtqmKbYkYylf3F4bhr7WMwZuhjuRjfw9piGKVxCOoe5F8JHVN4vtNQN43pD6nrae82VcxuGW99p9bcTCqNEcngroiZ8DAaycJt6oxw8vkRFTJnDtN5KZ-tKyVHT79pi04SNbzENPM7tMPmy1pyzv9oHeZ8Eg1DtUERLuSBmC9A4XrC2Qhjupw2mnx77gZyuq0dNwaXvujfeBCO_nuQcfiZMO',
//     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfqi3bNIbU7dm9vX9z8Vwzz8dE9aKuK6sGsLWEBalLp0Gz3ogoDjFd8BwExlhgG_Gn_6UVz8_YYVMwDByO2QmS03MLqyE8BLGb41xCUzorig_VclS2-J_4JESTMoscB_ld9mZu2r8VOhBTiw7zSD1G1E4dqwwTb61iF2tfoY_l-bNPJBgd0rRA1BnqsHyXVABToF84-sZ6Gis9U1ZK9_Eg76YxJWga-pP23tTgV2ee_ZZ2N85zp7ce',
//     viewers: 284,
//     likes: 1420,
//     liveCatchphrase: 'Bag-ong abot gikan Panabo Fish Port! Diretso latag!',
//     streamImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANx02YrEx-ufaMpYvOm2THxeyrNcr7wwVM7FFR68d-eUvNsZ8MT4U37Z0wB1grxOsD9XnOMvn7kcfeXYty7kmwbcTkmSdZA2qzZcrIGY_jGm-s588Xg-Go5pJrrqEqfTo6zT5guEsqbEIcPZHLUchiVhpzP67_ZP2lmxOekGv_xwbarrEH2gAsEl4rtaznfZL51Dp7bgPeIMTvE6rLt1CpH_ykg7WDNyZpWyDdIQS-FurdLNKB-jdM',
//     pinnedProduct: INITIAL_PRODUCTS[0],
//     isLive: true
//   },
//   {
//     id: 'vendor-toring',
//     name: 'Mang Toring',
//     stall: 'Stall #18 Gulayan',
//     category: 'Fresh Gulay',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbD6q0CNSKv0mfaB57cSACLdjCV30JXFw8EFQZGm6Vo5dWY36GGC5fFOuHX3WxegdPFge3xcOjBpzSKWcKlZfPoDwBrA9ip0pOpQcQQ6Fki-Ya2i1KD7vL8_43p20ugIzKiNxKMuiXSbfBcrkliGN8czbCIILuSz9GO18Ao8fYMDbDi3XYzbWIx3ZqnfcvNFs2a0HoXqhVXRdFZCqEi5Oe1yk-aLjE0znl-0AmvS_MvH06pgdqyJ9q',
//     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbD6q0CNSKv0mfaB57cSACLdjCV30JXFw8EFQZGm6Vo5dWY36GGC5fFOuHX3WxegdPFge3xcOjBpzSKWcKlZfPoDwBrA9ip0pOpQcQQ6Fki-Ya2i1KD7vL8_43p20ugIzKiNxKMuiXSbfBcrkliGN8czbCIILuSz9GO18Ao8fYMDbDi3XYzbWIx3ZqnfcvNFs2a0HoXqhVXRdFZCqEi5Oe1yk-aLjE0znl-0AmvS_MvH06pgdqyJ9q',
//     viewers: 142,
//     likes: 830,
//     liveCatchphrase: 'Bag-ong anihon gikan New Corella farm karong buntag!',
//     streamImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbD6q0CNSKv0mfaB57cSACLdjCV30JXFw8EFQZGm6Vo5dWY36GGC5fFOuHX3WxegdPFge3xcOjBpzSKWcKlZfPoDwBrA9ip0pOpQcQQ6Fki-Ya2i1KD7vL8_43p20ugIzKiNxKMuiXSbfBcrkliGN8czbCIILuSz9GO18Ao8fYMDbDi3XYzbWIx3ZqnfcvNFs2a0HoXqhVXRdFZCqEi5Oe1yk-aLjE0znl-0AmvS_MvH06pgdqyJ9q',
//     pinnedProduct: INITIAL_PRODUCTS[4],
//     isLive: true
//   },
//   {
//     id: 'vendor-joms',
//     name: 'Kuya Joms',
//     stall: 'Gate 3 Food Court',
//     category: 'Inihaw & BBQ',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQPbXP-rhvca3g-W5iVnMzrRFodzprbnI2Jmhj0BUndBodMbLePmQPy9ba7b3MPn-kGx4RCobBPk4O_x-fFcd62RgzxbDF2fWBrAf7NAEZ4nBYzjv6fHV6D7ZBXlU_AD_PXfvcOyYku6BUEAlJSm2jV3o7cc9HGq4NUYIvGhmIdnujQCldpyBDDX82_18Pw2c7Qel7Go-9-E-FqmVMpY7IBYfrasU93_BMDzFkzoug4i-cJhGhvjnI',
//     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQPbXP-rhvca3g-W5iVnMzrRFodzprbnI2Jmhj0BUndBodMbLePmQPy9ba7b3MPn-kGx4RCobBPk4O_x-fFcd62RgzxbDF2fWBrAf7NAEZ4nBYzjv6fHV6D7ZBXlU_AD_PXfvcOyYku6BUEAlJSm2jV3o7cc9HGq4NUYIvGhmIdnujQCldpyBDDX82_18Pw2c7Qel7Go-9-E-FqmVMpY7IBYfrasU93_BMDzFkzoug4i-cJhGhvjnI',
//     viewers: 519,
//     likes: 2410,
//     liveCatchphrase: 'Mainit nga pork BBQ ug isaw! Aslom-tam-is suka!',
//     streamImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYTChHKxaY_1EA1gQvVHVQTWhC6C1r4HKjeLh-k1ulmhiSk_MeB215JOJ0cLLGrZhntDDQ1BVPdR1O4fe_nVbBuWYtwaK08IvIKUr-VWzFFLrjXYt976_emi0_0bqccTQ-LGgPpoMalDKOLz1ZXKmf2jGoio7KH_8iXOn7RKTADtO8jCQdbe1jm6TjuBRE-gR-br45C2wYg_1GKh809c1o-pexNIAfEJUKsswbN_9V5MAGDIQPmHkp',
//     pinnedProduct: {
//       id: 'prod-bbq-skewers',
//       name: 'Special Pork BBQ (10 Sticks)',
//       price: 150,
//       unit: 'bundle (10 sticks)',
//       stall: 'Gate 3 Food Court',
//       vendorName: 'Kuya Joms Inihaw',
//       vendorId: 'vendor-joms',
//       image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYTChHKxaY_1EA1gQvVHVQTWhC6C1r4HKjeLh-k1ulmhiSk_MeB215JOJ0cLLGrZhntDDQ1BVPdR1O4fe_nVbBuWYtwaK08IvIKUr-VWzFFLrjXYt976_emi0_0bqccTQ-LGgPpoMalDKOLz1ZXKmf2jGoio7KH_8iXOn7RKTADtO8jCQdbe1jm6TjuBRE-gR-br45C2wYg_1GKh809c1o-pexNIAfEJUKsswbN_9V5MAGDIQPmHkp',
//       stockState: 'in',
//       category: 'Inihaw BBQ',
//       tag: 'Fresh Off Grill'
//     },
//     isLive: true
//   },
//   {
//     id: 'vendor-belen',
//     name: 'Nanay Belen',
//     stall: 'Stall #8 Kakanin Lane',
//     category: 'Kakanin Treats',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN7LX2NhXt-mnTU2XJ7Wd2nWJMTVIquvIw6lqTB61zoOWjiif2VryU5VjH5JCA1PjmuhqDI3SHrieU7QzJ0V98TBNW8Zjr8Yt43sl15AeJOb6VGSOhkVe_-wQz_mscNn3gVZdeUG4FX7hvqLf5lnZx9vA1FF03_Cvb0aEALaZL1KFsJZXhwHqdaDWGyac48c4gbZ2n1ycyq-0LKwBa_iBklEaXF3uNNP6I8S0bscd-fNdmBQqqZD0C',
//     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN7LX2NhXt-mnTU2XJ7Wd2nWJMTVIquvIw6lqTB61zoOWjiif2VryU5VjH5JCA1PjmuhqDI3SHrieU7QzJ0V98TBNW8Zjr8Yt43sl15AeJOb6VGSOhkVe_-wQz_mscNn3gVZdeUG4FX7hvqLf5lnZx9vA1FF03_Cvb0aEALaZL1KFsJZXhwHqdaDWGyac48c4gbZ2n1ycyq-0LKwBa_iBklEaXF3uNNP6I8S0bscd-fNdmBQqqZD0C',
//     viewers: 96,
//     likes: 640,
//     liveCatchphrase: 'Bag-ong luto nga bibingka ug biko nga may latik!',
//     streamImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN7LX2NhXt-mnTU2XJ7Wd2nWJMTVIquvIw6lqTB61zoOWjiif2VryU5VjH5JCA1PjmuhqDI3SHrieU7QzJ0V98TBNW8Zjr8Yt43sl15AeJOb6VGSOhkVe_-wQz_mscNn3gVZdeUG4FX7hvqLf5lnZx9vA1FF03_Cvb0aEALaZL1KFsJZXhwHqdaDWGyac48c4gbZ2n1ycyq-0LKwBa_iBklEaXF3uNNP6I8S0bscd-fNdmBQqqZD0C',
//     pinnedProduct: {
//       id: 'prod-bibingka',
//       name: 'Special Bibingka with Salted Egg',
//       price: 35,
//       unit: 'box (1 large)',
//       stall: 'Stall #8 Kakanin Lane',
//       vendorName: 'Nanay Belen Kakanin',
//       vendorId: 'vendor-belen',
//       image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN7LX2NhXt-mnTU2XJ7Wd2nWJMTVIquvIw6lqTB61zoOWjiif2VryU5VjH5JCA1PjmuhqDI3SHrieU7QzJ0V98TBNW8Zjr8Yt43sl15AeJOb6VGSOhkVe_-wQz_mscNn3gVZdeUG4FX7hvqLf5lnZx9vA1FF03_Cvb0aEALaZL1KFsJZXhwHqdaDWGyac48c4gbZ2n1ycyq-0LKwBa_iBklEaXF3uNNP6I8S0bscd-fNdmBQqqZD0C',
//       stockState: 'in',
//       category: 'Kakanin',
//       tag: 'Morning Fresh'
//     },
//     isLive: true
//   },
//   {
//     id: 'vendor-dan',
//     name: 'Boss Dan',
//     stall: 'Stall #5 Fruit Section',
//     category: 'Prutas Stand',
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFzC-GZfRkEJwVJMR3tSJXhbqkoIcMIEitGk-CEghdWMKaZQR4tE3axzWLkPZ5drfG69wt0of6wRSxBScWOAaPh9_7zqxFUpEEzkF6JVT1EJ72KsCKBeQaSOgR4h-Fz_sQQeGDleSMgsG11W1pTjnO0A6_gx6noZgz1qykhpl-ck7EymkMrooMx4h7M4rk5QE9Q1MJCYfghdDhPTYhdrsk8XupQBI0BQ3DLmLcrSuWYAbjhAkM4fZf',
//     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFzC-GZfRkEJwVJMR3tSJXhbqkoIcMIEitGk-CEghdWMKaZQR4tE3axzWLkPZ5drfG69wt0of6wRSxBScWOAaPh9_7zqxFUpEEzkF6JVT1EJ72KsCKBeQaSOgR4h-Fz_sQQeGDleSMgsG11W1pTjnO0A6_gx6noZgz1qykhpl-ck7EymkMrooMx4h7M4rk5QE9Q1MJCYfghdDhPTYhdrsk8XupQBI0BQ3DLmLcrSuWYAbjhAkM4fZf',
//     viewers: 0,
//     likes: 310,
//     liveCatchphrase: 'Tam-is nga Manggang Carabao ug Davao Pomelo!',
//     streamImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFzC-GZfRkEJwVJMR3tSJXhbqkoIcMIEitGk-CEghdWMKaZQR4tE3axzWLkPZ5drfG69wt0of6wRSxBScWOAaPh9_7zqxFUpEEzkF6JVT1EJ72KsCKBeQaSOgR4h-Fz_sQQeGDleSMgsG11W1pTjnO0A6_gx6noZgz1qykhpl-ck7EymkMrooMx4h7M4rk5QE9Q1MJCYfghdDhPTYhdrsk8XupQBI0BQ3DLmLcrSuWYAbjhAkM4fZf',
//     pinnedProduct: {
//       id: 'prod-mangoes',
//       name: 'Carabao Mangoes (Davao Sweet)',
//       price: 90,
//       unit: 'kilo',
//       stall: 'Stall #5 Fruit Section',
//       vendorName: 'Boss Dan Prutas',
//       vendorId: 'vendor-dan',
//       image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFzC-GZfRkEJwVJMR3tSJXhbqkoIcMIEitGk-CEghdWMKaZQR4tE3axzWLkPZ5drfG69wt0of6wRSxBScWOAaPh9_7zqxFUpEEzkF6JVT1EJ72KsCKBeQaSOgR4h-Fz_sQQeGDleSMgsG11W1pTjnO0A6_gx6noZgz1qykhpl-ck7EymkMrooMx4h7M4rk5QE9Q1MJCYfghdDhPTYhdrsk8XupQBI0BQ3DLmLcrSuWYAbjhAkM4fZf',
//       stockState: 'in',
//       category: 'Prutas',
//       tag: 'Upcoming'
//     },
//     isLive: false,
//     scheduleTime: '10:30 AM'
//   }
// ];

// export const STREET_FOOD_VENDORS: StreetFoodVendor[] = [
//   {
//     id: 'sf-josie',
//     name: 'Kwek-Kwek ni Ate Josie',
//     rating: 4.8,
//     distance: '1.2 km',
//     location: 'Gate 2 Entrance',
//     minPrice: 25,
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-8GG37mwEYp4g_ZAhSi6XuXqE3AoFEjf4Dk949GzMxdPKRhLGWkYVFrhYdFL5n7sjwjrVlxD-T3H7H1VAga3l7X6auhzT8IxIvw6v0rcWsqe8IE5Pp_IITi3Xlj_0hHpnatV-9BidBdnN8WiYf_u2pVxfOetqI8cSBDvHcW-jTeLY7N40lRr0atpma9-oK8GsvLaNIpJ8y9iQ6HEiSA2THggWxwCWIy3TpSJtSuusqf7uctOP5aFL',
//     items: ['Crispy Kwek-Kwek (5 pcs)', 'Tokneneng Chicken Egg', 'Manong Brown Sweet Sauce']
//   },
//   {
//     id: 'sf-ben',
//     name: 'Fishball ni Manong Ben',
//     rating: 4.6,
//     distance: '0.8 km',
//     location: 'Market Entrance Gate 1',
//     minPrice: 20,
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghW0eDtzxde_B9FeaacAVu3X23arTaUQgl1diSjLHr1v3i82TCPyyaEZ6XJhne1SFqF6G1by6usKre69tZHYJqGo-tw8_sPRgFGikuSjBDe3nW4px1HAWNLPWwPncFDiKl60sWDbUobWjJbFle5eRyRfl54lqX3bDtk8TB5dg8h2q4DFwMNYRo5IPoxCSd6-YV-egnqjUll-8KXqGJgyXC4EV0MB3tZueUHNsI6LK4AivJw5ykeA1',
//     items: ['Golden Fishball Skewer', 'Squid Ball Cup', 'Crispy Kikiam with Chili Vinegar']
//   },
//   {
//     id: 'sf-inihaw-king',
//     name: 'Inihaw King Tagum',
//     rating: 4.9,
//     distance: '1.5 km',
//     location: 'Tagum Night Market Lane',
//     minPrice: 15,
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYTChHKxaY_1EA1gQvVHVQTWhC6C1r4HKjeLh-k1ulmhiSk_MeB215JOJ0cLLGrZhntDDQ1BVPdR1O4fe_nVbBuWYtwaK08IvIKUr-VWzFFLrjXYt976_emi0_0bqccTQ-LGgPpoMalDKOLz1ZXKmf2jGoio7KH_8iXOn7RKTADtO8jCQdbe1jm6TjuBRE-gR-br45C2wYg_1GKh809c1o-pexNIAfEJUKsswbN_9V5MAGDIQPmHkp',
//     items: ['Pork Barbecue Stick', 'Crispy Chicken Isaw', 'Betamax Skewer']
//   },
//   {
//     id: 'sf-banana-cue',
//     name: 'Banana Cue Specials',
//     rating: 4.7,
//     distance: '0.9 km',
//     location: 'Merienda Food Lane',
//     minPrice: 20,
//     image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx87NZQhrlTW6DLEKC2Xqxh373ziF5DlUjj8asZ-RLUXCrzr5YigR7Y-6Tn8WJXS35xDFJFtAfWtxqTU18ETsyWVHykvEFldtNolWizugVxK0E0LlsuVDB6y-bUv9ELlOINjeg6yxQZHj1arP5BiJmKIacIgA5p_jloRfdWhzsJN8YZWVVuN0gT23oeAzJXvHmnMbK7F2gBZ-6cHlva62tdfARL8SmfLZtSRkoy4ALZ9UfVPn9Ygf1',
//     items: ['Caramelized Saba Banana Stick', 'Turon with Langka', 'Kamote Cue']
//   }
// ];

// export const INITIAL_ORDERS: Order[] = [
//   {
//     id: '1042',
//     customerName: 'Nanay Cora',
//     customerAddress: 'Tagum Center, Purok 4 Magugpo Poblacion',
//     items: [
//       {
//         product: INITIAL_PRODUCTS[0],
//         quantity: 2.0,
//         note: 'Paki kaliskis & hiwa 3 parts'
//       }
//     ],
//     totalPrice: 360,
//     status: 'ready',
//     driver: {
//       name: 'Tricycle Junjun',
//       vehicle: 'Kawasaki Barako Sidecar (Plate #TM-429)',
//       etaMinutes: 4,
//       phone: '0917-882-4412'
//     },
//     specialInstructions: 'Paki kaliskis & hiwa 3 parts',
//     paymentMethod: 'COD',
//     createdAt: '12 mins ago'
//   },
//   {
//     id: '1043',
//     customerName: 'Maria Santos (Digital Suki Tier)',
//     customerAddress: 'Apokon Highway, near Tagum Doctors Hospital',
//     items: [
//       {
//         product: INITIAL_PRODUCTS[1],
//         quantity: 1.0,
//         note: 'Standard clean'
//       }
//     ],
//     totalPrice: 140,
//     status: 'preparing',
//     driver: {
//       name: 'Tricycle Noynoy',
//       vehicle: 'Honda TMX Tricycle (Plate #TM-108)',
//       etaMinutes: 14,
//       phone: '0928-334-9918'
//     },
//     specialInstructions: 'Standard Clean',
//     paymentMethod: 'GCash',
//     createdAt: '6 mins ago'
//   }
// ];

// export const INITIAL_SUKI_CUSTOMERS: SukiCustomer[] = [
//   {
//     id: 'suki-1',
//     name: 'Nanay Cora Miranda',
//     phone: '0917-542-9901',
//     tier: 'Diamond Suki',
//     totalOrders: 38,
//     totalSpent: 12450,
//     favoriteItems: ['Dagko nga Bangus', 'River Spinach', 'Talapia Buhay'],
//     outstandingBalance: 0,
//     lastOrdered: 'Today, 6:30 AM',
//     notes: 'Gusto pirmi hinlo ang isda ug pahiwaon sa tulo ka bahin.'
//   },
//   {
//     id: 'suki-2',
//     name: 'Maria Santos',
//     phone: '0920-881-2299',
//     tier: 'Gold Suki',
//     totalOrders: 21,
//     totalSpent: 6720,
//     favoriteItems: ['Tilapia Buhay', 'Native Tomatoes'],
//     outstandingBalance: 120,
//     lastOrdered: 'Today, 6:40 AM',
//     notes: 'Magbayad via GCash pag abot sa tricycle.'
//   },
//   {
//     id: 'suki-3',
//     name: 'Kapitan Gary Tagum',
//     phone: '0918-444-1188',
//     tier: 'Diamond Suki',
//     totalOrders: 45,
//     totalSpent: 28900,
//     favoriteItems: ['Pork Barbecue', 'Lapu-Lapu', 'Bangus'],
//     outstandingBalance: 0,
//     lastOrdered: 'Yesterday',
//     notes: 'Para sa barangay hall breakfast catering.'
//   },
//   {
//     id: 'suki-4',
//     name: 'Tita Julie Bakeshop',
//     phone: '0915-777-6633',
//     tier: 'Regular Suki',
//     totalOrders: 9,
//     totalSpent: 3100,
//     favoriteItems: ['Special Bibingka', 'Kamatis'],
//     outstandingBalance: 0,
//     lastOrdered: '2 days ago',
//     notes: 'Early morning delivery at 7:00 AM.'
//   }
// ];


// mockData.ts
import { Product, Vendor, Review, StockState } from '../types';

/* ==========================================================================
   Reviews (Grouped by Item)
   ========================================================================== */
export const mockReviews: Record<string, Review[]> = {
  bangus: [
    {
      id: 'rev-001',
      author: 'Maria Clara Cruz',
      tier: 'Platinum Suki',
      location: 'Diliman, Quezon City',
      timestamp: '1 hour ago',
      rating: 5,
      comment: 'Super fresh and sweet! Malinis ang pagkaka-debone, walang natirang tinik. Perfect for daing.',
      prepTag: 'Deboned & Butterfly Cut',
      verifiedSuki: true,
      avatarColor: '#10B981',
      initials: 'MC'
    },
    {
      id: 'rev-002',
      author: 'Roberto Gomez',
      tier: 'Gold Suki',
      location: 'Marikina Heights',
      timestamp: 'Yesterday',
      rating: 5,
      comment: 'Seller picked this live during stream. Arrived cold and packed on ice.',
      prepTag: 'Cleaned & Scaled',
      verifiedSuki: true,
      avatarColor: '#3B82F6',
      initials: 'RG'
    }
  ],
  tilapia: [
    {
      id: 'rev-003',
      author: 'Aling Lorna',
      tier: 'Suki Member',
      location: 'Cubao, Quezon City',
      timestamp: '2 days ago',
      rating: 4.8,
      comment: 'Buhay pa nung pinili sa live stream! Walang amoy-lupa, sarap iprito.',
      prepTag: 'Cleaned & Gutted',
      verifiedSuki: true,
      avatarColor: '#EC4899',
      initials: 'AL'
    }
  ],
  broccoli: [
    {
      id: 'rev-004',
      author: 'Chef Anton Ramos',
      tier: 'Platinum Suki',
      location: 'Katipunan, Quezon City',
      timestamp: '3 hours ago',
      rating: 5,
      comment: 'Crisp and deep green crowns. Freshly delivered from Benguet with zero yellowing.',
      prepTag: 'Trimmed Florets',
      verifiedSuki: true,
      avatarColor: '#8B5CF6',
      initials: 'AR'
    }
  ],
  mangoes: [
    {
      id: 'rev-005',
      author: 'Tita Baby',
      tier: 'Gold Suki',
      location: 'San Juan City',
      timestamp: 'Yesterday',
      rating: 5,
      comment: 'Authentic Guimaras sweetness! Hindi maasim kahit sa dulo.',
      prepTag: 'Cushioned Box Packing',
      verifiedSuki: true,
      avatarColor: '#F59E0B',
      initials: 'TB'
    }
  ],
  barako: [
    {
      id: 'rev-006',
      author: 'Mark Villanueva',
      tier: 'Silver Suki',
      location: 'Taguig City',
      timestamp: '4 days ago',
      rating: 5,
      comment: 'Amoy pa lang pagbukas ng package alam mong bagong roast. Very rich flavor!',
      prepTag: 'Whole Roasted Beans',
      verifiedSuki: true,
      avatarColor: '#6366F1',
      initials: 'MV'
    }
  ],
  bagnet: [
    {
      id: 'rev-007',
      author: 'Danilo Santos',
      tier: 'Suki Member',
      location: 'Pasig City',
      timestamp: 'Yesterday',
      rating: 4.9,
      comment: 'Crispy bagnet with signature spiced vinegar! Mainit pa nung dumating.',
      prepTag: 'Ready-to-Eat Hot Pack',
      verifiedSuki: true,
      avatarColor: '#EF4444',
      initials: 'DS'
    }
  ]
};

/* ==========================================================================
   Vendors (Coinciding with Categories & Market Sections)
   ========================================================================== */
export const mockVendors: Vendor[] = [
  {
    id: 'ven-seafood-01',
    vendorId: 'ven-seafood-01',
    name: "Aling Nena's Fresh Seafood",
    vendorName: 'Nena Del Rosario',
    stallNumber: 'Stall #18-20',
    marketSection: 'Wet Market - Fish Port Bay',
    sukiDuration: '12 years at Farmers Market',
    rating: 4.9,
    sukiCount: 1420,
    isLive: true,
    liveTitle: '🔴 Bagsakan Catch from Navotas! Boneless Bangus & Live Tilapia',
    isOpen: true,
    statusText: 'Open • Accepting morning orders (Cut-off 11:30 AM)',
    location: 'Cubao Farmers Market, Quezon City',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    vendorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    category: 'Seafood',
    actionType: 'watch_live',
    specialty: 'Dagupan Boneless Bangus & Live Tilapia',
    description: 'Fresh seafood harvested daily and delivered straight from Navotas Port and Dagupan fish pens. Free scaling, deboning, and filleting for all sukis!',
    products: [
      {
        id: 'prod-bangus-01',
        name: 'Fresh Dagupan Boneless Bangus (Medium)',
        price: 220,
        unit: 'kg',
        availableKg: 35,
        freshness: 'Caught today 3:00 AM'
      },
      {
        id: 'prod-tilapia-02',
        name: 'Live Batangas Black Tilapia',
        price: 150,
        unit: 'kg',
        availableKg: 50,
        freshness: 'Live from oxygenated tanks'
      }
    ]
  },
  {
    id: 'ven-veg-02',
    vendorId: 'ven-veg-02',
    name: 'Mang Kanor Benguet Greens',
    vendorName: 'Kanor Bautista',
    stallNumber: 'Stall #05-07',
    marketSection: 'Vegetable & Organic Pavilion',
    sukiDuration: '8 years in Balintawak',
    rating: 4.8,
    sukiCount: 930,
    isLive: false,
    isOpen: true,
    statusText: 'Open • Fresh Benguet highland batch just arrived',
    location: 'Balintawak Cloverleaf Market, Caloocan',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    vendorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    category: 'Vegetables',
    actionType: 'order',
    specialty: 'Highland Broccoli, Baguio Beans & Native Sayote',
    description: 'Direct farm-to-table highland vegetables shipped overnight from La Trinidad and Atok, Benguet. Crisp, pesticide-safe, and hand-sorted.',
    products: [
      {
        id: 'prod-broccoli-03',
        name: 'Crisp Baguio Broccoli Crowns',
        price: 180,
        unit: 'kg',
        availableKg: 20,
        freshness: 'Harvested yesterday afternoon'
      }
    ]
  },
  {
    id: 'ven-fruits-03',
    vendorId: 'ven-fruits-03',
    name: 'Nanay Lita Sweet Fruits',
    vendorName: 'Lita Manansala',
    stallNumber: 'Stall #33',
    marketSection: 'Fruit Pavilion Section B',
    sukiDuration: '10 years at Nepa Q-Mart',
    rating: 4.9,
    sukiCount: 1150,
    isLive: true,
    liveTitle: '🟡 Sweet Guimaras Carabao Mangoes Unboxing',
    isOpen: true,
    statusText: 'Open • Fresh batch ready for packing',
    location: 'Nepa Q-Mart, Cubao, Quezon City',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    vendorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    category: 'Fruits',
    actionType: 'watch_live',
    specialty: 'Export-Grade Guimaras Mangoes & Davao Pomelo',
    description: 'Tree-ripened, export-quality local fruits sourced directly from growers in Guimaras and Davao.',
    products: [
      {
        id: 'prod-mango-04',
        name: 'Sweet Guimaras Carabao Mangoes',
        price: 240,
        unit: 'kg',
        availableKg: 30,
        freshness: 'Naturally tree-ripened'
      }
    ]
  },
  {
    id: 'ven-coffee-04',
    vendorId: 'ven-coffee-04',
    name: 'Kape ni Lola & Native Spices',
    vendorName: 'Teresa Alcantara',
    stallNumber: 'Stall #88',
    marketSection: 'Dry Goods & Aromatics Arcade',
    sukiDuration: '15 years in Batangas Market',
    rating: 4.95,
    sukiCount: 2310,
    isLive: false,
    isOpen: false,
    statusText: 'Closed • Restocking beans (Reopens 5:00 AM)',
    location: 'Lipa Public Market, Batangas',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    vendorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    category: 'Coffee & Spices',
    actionType: 'alert_me',
    specialty: 'Batangas Kapeng Barako & Pure Tablea',
    description: 'Shade-grown Liberica beans and hand-molded cacao tablea from Lipa and Amadeo.',
    products: [
      {
        id: 'prod-barako-05',
        name: 'Batangas Kapeng Barako (Whole Beans)',
        price: 320,
        unit: '500g',
        availableKg: 15,
        freshness: 'Roasted 3 days ago'
      }
    ]
  },
  {
    id: 'ven-street-05',
    vendorId: 'ven-street-05',
    name: 'Kuya Jojo Palengke Bites',
    vendorName: 'Jojo Mendoza',
    stallNumber: 'Stall #12',
    marketSection: 'Food Court & Street Food Lane',
    sukiDuration: '6 years in Pasig Mega Market',
    rating: 4.75,
    sukiCount: 780,
    isLive: false,
    isOpen: true,
    statusText: 'Open • Hot meals cooked to order',
    location: 'Pasig Mega Market, Pasig City',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    vendorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    category: 'Street Food',
    actionType: 'order',
    specialty: 'Crispy Pork Bagnet Rice Bowl & Street Platters',
    description: 'Authentic Filipino street comforts served hot with garlic sinangag and spicy sawsawan.',
    products: [
      {
        id: 'prod-bagnet-06',
        name: 'Crispy Bagnet Rice Bowl with Spiced Vinegar',
        price: 135,
        unit: 'order',
        availableKg: 25,
        freshness: 'Cooked fresh every hour'
      }
    ]
  }
];

/* ==========================================================================
   Products (Fully Coinciding with Vendors & Reviews)
   ========================================================================== */
export const mockProducts: Product[] = [
  {
    id: 'prod-bangus-01',
    name: 'Fresh Dagupan Boneless Bangus (Medium)',
    localName: 'Bangus (Milkfish) - Dagupan Breed',
    price: 220,
    originalPrice: 260,
    unit: 'kg',
    stall: mockVendors[0].stallNumber,
    quantity: 1,
    minQuantity: 0.5,
    step: 0.5,
    vendor: mockVendors[0],
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
    stockState: 'in_stock',
    subtitle: 'From Dagupan brackish water ponds • Sweet & thick belly',
    unitText: 'per kg (~2 to 3 pcs)',
    stockRemaining: '35 kg remaining',
    isLiveSpecial: true,
    category: 'Seafood',
    tag: 'Best Seller',
    description: 'Fresh Dagupan milkfish known for its rich fat belly and tender meat. Expertly scaled, gutted, and deboned upon order. Free butterfly slice.',
    reviewCount: 48,
    reviews: mockReviews.bangus,
    thumbnails: [
      {
        id: 'th-01',
        url: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=400&q=80',
        label: 'Whole Fish'
      },
      {
        id: 'th-02',
        url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
        label: 'Deboned Prep'
      }
    ]
  },
  {
    id: 'prod-tilapia-02',
    name: 'Live Batangas Black Tilapia',
    localName: 'Buhay na Tilapia',
    price: 150,
    originalPrice: 170,
    unit: 'kg',
    stall: mockVendors[0].stallNumber,
    quantity: 1,
    minQuantity: 1,
    step: 0.5,
    vendor: mockVendors[0],
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1200&q=80',
    stockState: 'in_stock',
    subtitle: 'Swam in Taal fresh water • Zero muddy taste',
    unitText: 'per kg (~3 to 4 pcs)',
    stockRemaining: '50 kg remaining',
    isLiveSpecial: false,
    category: 'Seafood',
    tag: 'Fresh Catch',
    description: 'Kept alive in our oxygenated aerated stall tanks until ordered. Cleaned, scaled, and scored for deep frying or sinigang.',
    reviewCount: 22,
    reviews: mockReviews.tilapia,
    thumbnails: [
      {
        id: 'th-03',
        url: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=400&q=80',
        label: 'Tank View'
      }
    ]
  },
  {
    id: 'prod-broccoli-03',
    name: 'Crisp Baguio Broccoli Crowns',
    localName: 'Broccoli Benguet',
    price: 180,
    originalPrice: 210,
    unit: 'kg',
    stall: mockVendors[1].stallNumber,
    quantity: 1,
    minQuantity: 0.25,
    step: 0.25,
    vendor: mockVendors[1],
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1200&q=80',
    stockState: 'in_stock',
    subtitle: 'Highland harvest from Atok & La Trinidad farms',
    unitText: 'per kg (approx. 2-3 heads)',
    stockRemaining: '20 kg left',
    isLiveSpecial: false,
    category: 'Vegetables',
    tag: 'Farm Direct',
    description: 'Crisp, bright-green broccoli heads with tight clusters and firm stalks. Shipped chilled overnight from the high mountain terraces.',
    reviewCount: 19,
    reviews: mockReviews.broccoli,
    thumbnails: [
      {
        id: 'th-04',
        url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=80',
        label: 'Fresh Heads'
      }
    ]
  },
  {
    id: 'prod-mango-04',
    name: 'Sweet Guimaras Carabao Mangoes',
    localName: 'Manggang Kalabaw',
    price: 240,
    originalPrice: 280,
    unit: 'kg',
    stall: mockVendors[2].stallNumber,
    quantity: 1,
    minQuantity: 1,
    step: 1,
    vendor: mockVendors[2],
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80',
    stockState: 'in_stock',
    subtitle: 'World-famous sweet mangoes • Golden yellow skin',
    unitText: 'per kg (approx. 3-4 pcs)',
    stockRemaining: '30 kg remaining',
    isLiveSpecial: true,
    category: 'Fruits',
    tag: 'Sweetest Pick',
    description: 'Guaranteed naturally sweetened, unblemished carabao mangoes from Guimaras island. Hand-selected for optimal ripeness.',
    reviewCount: 35,
    reviews: mockReviews.mangoes,
    thumbnails: [
      {
        id: 'th-05',
        url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
        label: 'Ripe Mangoes'
      }
    ]
  },
  {
    id: 'prod-barako-05',
    name: 'Batangas Kapeng Barako (Whole Beans)',
    localName: 'Kape Liberica Lipa',
    price: 320,
    unit: '500g',
    stall: mockVendors[3].stallNumber,
    quantity: 1,
    minQuantity: 1,
    step: 1,
    vendor: mockVendors[3],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    stockState: 'low_stock',
    subtitle: 'Pungent floral aroma and bold smoky profile',
    unitText: 'per 500g pouch (Whole beans)',
    stockRemaining: 'Only 3 packs left',
    isLiveSpecial: false,
    category: 'Coffee & Spices',
    tag: 'Heritage Coffee',
    description: '100% pure Liberica beans grown in Lipa, Batangas. Medium-dark roast boasting notes of dark cocoa, jackfruit, and anise.',
    reviewCount: 31,
    reviews: mockReviews.barako,
    thumbnails: [
      {
        id: 'th-06',
        url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
        label: 'Whole Beans'
      }
    ]
  },
  {
    id: 'prod-bagnet-06',
    name: 'Crispy Bagnet Rice Bowl with Spiced Vinegar',
    localName: 'Bagnet Silog Special',
    price: 135,
    originalPrice: 150,
    unit: 'order',
    stall: mockVendors[4].stallNumber,
    quantity: 1,
    minQuantity: 1,
    step: 1,
    vendor: mockVendors[4],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    stockState: 'in_stock',
    subtitle: 'Hot, crunchy deep-fried pork belly with garlic rice',
    unitText: 'per solo bowl',
    stockRemaining: '25 bowls available',
    isLiveSpecial: false,
    category: 'Street Food',
    tag: 'Popular',
    description: 'Double-fried pork belly served over fragrant sinangag garlic rice, fried egg, and homemade Ilocos Sukang Iloko dip.',
    reviewCount: 14,
    reviews: mockReviews.bagnet,
    thumbnails: [
      {
        id: 'th-07',
        url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
        label: 'Rice Bowl'
      }
    ]
  }
];

/* ==========================================================================
   Convenience Helper Selectors
   ========================================================================== */

/** Find a product by its ID */
export const getProductById = (id: string): Product | undefined =>
  mockProducts.find((product) => product.id === id);

/** Find a vendor by their ID or vendorId */
export const getVendorById = (vendorId: string): Vendor | undefined =>
  mockVendors.find((vendor) => vendor.id === vendorId || vendor.vendorId === vendorId);

/** Find all products offered by a vendor */
export const getProductsByVendorId = (vendorId: string): Product[] =>
  mockProducts.filter(
    (product) => product.vendor.id === vendorId || product.vendor.vendorId === vendorId
  );

/** Filter products by category */
export const getProductsByCategory = (category: string): Product[] =>
  mockProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
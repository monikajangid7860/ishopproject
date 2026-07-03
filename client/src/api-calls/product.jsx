// ---------------------------------------------------------
// 📌 PHONE SECTION
// ---------------------------------------------------------
const phoneSection = {
  title: "TOP CELLPHONES & TABLETS",
  bannerTitle: "REDMI NOTE 12 PRO+ 5G",
  bannerDesc: "Rise to the challenge",
  bannerImg: "/images/redmi.png",
  categories: [
    { name: "iPhone (iOS)", items: "74 Items", img: "/images/mobile.png" },
    { name: "Android", items: "35 Items", img: "/images/watch (2).png" },
    { name: "5G Support", items: "12 Items", img: "/images/tablet.png" },
    { name: "Gaming", items: "9 Items", img: "/images/headphone.png" },
    { name: "Xiaomi", items: "32 Items", img: "/images/charger.png" },
    { name: "Accessories", items: "23 Items", img: "/images/mini.png" },
  ],
};

// ---------------------------------------------------------
// 📌 LAPTOP SECTION
// ---------------------------------------------------------
const laptopSection = {
  title: "BEST LAPTOPS & COMPUTERS",
  bannerTitle: "Mobok 2 Superchard",
  bannerDesc: "By M2 • Start from $1,199",
  bannerImg: "/images/laptopbanner.png",
  categories: [
    { name: "Macbook", items: "74 Items", img: "/images/mac.png" },
    { name: "Gaming PC", items: "5 Items", img: "/images/gaming.png" },
    { name: "Laptop Office", items: "22 Items", img: "/images/office.png" },
    { name: "Laptop 15''", items: "65 Items", img: "/images/laptop15.png" },
    { name: "M1 2023", items: "32 Items", img: "/images/m1.png" },
    { name: "Secondhand", items: "16 Items", img: "/images/used.png" },
  ],
};

// ---------------------------------------------------------
// 📌 TOP CELL DATA
// ---------------------------------------------------------
const topCellData = {
  title: "TOP CELL PHONES & TABLETS",

  // Right-side slider (3 small slides)
  slides: [
    {
      id: "slide1",
      headline: "Noise Cancelling\nHeadphone",
      sub: "Bass-Driven On-Ear Headphones\nWith Voice Assistant & Low Latency Game Mode",
      img: "/images/storeherobanner.png",
      ctaText: "BUY NOW",
    },
    {
      id: "slide2",
      headline: "Apple iPad Pro 2023\nSupercharged by M2",
      sub: "12.9-inch Liquid Retina XDR Display • Blazing Performance",
      img: "/images/storeherobanner2.png",
      ctaText: "SHOP NOW",
    },
    {
      id: "slide3",
      headline: "Samsung Galaxy Tab S9\nPowerful & Elegant",
      sub: "Ultra AMOLED Display • S-Pen Support • 5G Enabled",
      img: "/images/laptopbanner.png",
      ctaText: "VIEW DETAILS",
    },
  ],

  // Left main hero carousel
  heroSlides: [
    {
      id: "slide1",
      headline: "Noise Cancelling\nHeadphone",
      sub: "Bass-Driven On-Ear Headphones\nWith Voice Assistant & Low Latency Game Mode",
      img: "/images/storeherobanner.png",
      ctaText: "BUY NOW",
    },
    {
      id: "slide2",
      headline: "Apple iPad Pro 2023\nSupercharged by M2",
      sub: "12.9-inch Liquid Retina XDR Display • Blazing Performance",
      img: "/images/storeherobanner2.png",
      ctaText: "SHOP NOW",
    },
    {
      id: "slide3",
      headline: "Samsung Galaxy Tab S9\nPowerful & Elegant",
      sub: "Ultra AMOLED Display • S-Pen Support • 5G Enabled",
      img: "/images/laptopbanner.png",
      ctaText: "VIEW DETAILS",
    },
  ],

  promo: {
    title: "redmi note 12\nPro+ 5g",
    subtitle: "Rise to the challenge",
    img: "/images/storeherobanner2.png",
    cta: "SHOP NOW",
  },

  categories: [
    { id: "cat1", name: "iPhone (iOS)", items: "74 Items", img: "/images/laptopbanner.png" },
    { id: "cat2", name: "Android", items: "35 Items", img: "/images/android.png" },
    { id: "cat3", name: "5G Support", items: "12 Items", img: "/images/5g.png" },
    { id: "cat4", name: "Apple Tablets", items: "22 Items", img: "/images/tablet.png" },
    { id: "cat5", name: "Gaming", items: "9 Items", img: "/images/joystick.png" },
    { id: "cat6", name: "Xiaomi", items: "32 Items", img: "/images/xiaomi.png" },
    { id: "cat7", name: "Accessories", items: "23 Items", img: "/images/accessories.png" },
    { id: "cat8", name: "Samsung Tablets", items: "20 Items", img: "/images/samsung.png" },
    { id: "cat9", name: "Smartphone Chargers", items: "18 Items", img: "/images/charger.png" },
    { id: "cat10", name: "eReader", items: "5 Items", img: "/images/ereader.png" },
  ],
};

// ---------------------------------------------------------
// 📌 MOCK PRODUCTS
// ---------------------------------------------------------
const mockProducts = [
  {
    id: 1,
    title: "BOSO 2 Wireless On Ear Headphone",
    price: 359.0,
    oldPrice: null,
    badge: null,
    shipping: "FREE SHIPPING",
    stock: "In stock",
    img: "/images/headphone.png",
    count: 152,
  },
  {
    id: 2,
    title: "OPad Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
    price: 569.0,
    oldPrice: 759.0,
    badge: { text: "SAVE $199.00", color: "bg-emerald-500" },
    shipping: "FREE SHIPPING",
    stock: "In stock",
    img: "/images/tablet.png",
    count: 152,
  },
  {
    id: 3,
    title: "uDesk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
    price: 1729.0,
    oldPrice: 2219.0,
    badge: { text: "SAVE $59.00", color: "bg-teal-500" },
    shipping: "FREE SHIPPING",
    stock: "Out of stock",
    img: "/images/mini.png",
    count: 8,
  },
  {
    id: 4,
    title: "Opple Watch Series 8 GPS + Cellular Stainless Steel Case",
    priceRange: "$979.00 - $1,259.00",
    shipping: "$2.98 SHIPPING",
    stock: "PRE - ORDER",
    img: "/images/watch (2).png",
    count: 2,
  },
  {
    id: 5,
    title: "iSmart 24V Charger",
    price: 9.0,
    oldPrice: 12.0,
    badge: { text: "SAVE $3.00", color: "bg-emerald-500" },
    shipping: "$3.98 SHIPPING",
    stock: "Contact",
    img: "/images/charger.png",
    count: 9,
  },
];

// ---------------------------------------------------------
// 📌 COMPUTER PRODUCTS
// ---------------------------------------------------------
const computerproducts = [
  {
    id: 1,
    title: "Pineapple Macbook Pro 2022 M1 / 512 GB",
    count: 152,
    price: 579.0,
    oldPrice: null,
    badge: { text: "NEW", color: "bg-gray-800" },
    shipping: "FREE SHIPPING",
    stock: "In stock",
    img: "/images/macbook.png",
  },
  {
    id: 2,
    title: "C&O Bluetooth Speaker",
    count: 5,
    price: 979.0,
    oldPrice: null,
    badge: { text: "NEW", color: "bg-gray-800" },
    shipping: "FREE SHIPPING",
    stock: "In stock",
    img: "/images/speaker.png",
  },
  {
    id: 3,
    title: "Gigaby Custome Case, i7 / 16GB / SSD 256GB",
    count: 5,
    price: 1259.0,
    oldPrice: null,
    shipping: "FREE SHIPPING",
    stock: "In stock",
    extraTag: "FREE GIFT",
    img: "/images/pc-case.png",
  },
  {
    id: 4,
    title: "BEOS PC Gaming Case",
    count: 9,
    price: 1239.0,
    oldPrice: 1618.0,
    badge: { text: "SAVE $59.00", color: "bg-emerald-500" },
    shipping: "$2.98 SHIPPING",
    stock: "Contact",
    img: "/images/gaming-case.png",
  },
  {
    id: 5,
    title: "aMoc All-in-one Computer M1",
    count: 8,
    price: 1729.0,
    oldPrice: null,
    shipping: "FREE SHIPPING",
    stock: "Contact",
    img: "/images/imac.png",
  },
];

// ---------------------------------------------------------
// 📌 NEW PRODUCTS
// ---------------------------------------------------------
const products = [
  {
    id: 1,
    title: "SROK Smart Phone 128GB, Oled Retina",
    count: 152,
    price: 579.0,
    oldPrice: 859.0,
    badge: { text: "SAVE $189.00", color: "bg-emerald-500" },
    shipping: "FREE SHIPPING",
    stock: "In stock",
    img: "/images/phone1.png",
  },
  {
    id: 2,
    title: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    count: 5,
    priceRange: "$979.00 - $1,259.00",
    shipping: "$2.98 SHIPPING",
    stock: "In stock",
    badge: { text: "NEW", color: "bg-gray-800" },
    img: "/images/tablet1.png",
  },
  {
    id: 3,
    title: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
    count: 5,
    price: 659.0,
    oldPrice: null,
    shipping: "FREE SHIPPING",
    extraTag: "FREE GIFT",
    stock: "In stock",
    img: "/images/opod.png",
  },
  {
    id: 4,
    title: "Xiamoi Redmi Note 5, 64GB",
    count: 9,
    price: 1239.0,
    oldPrice: 1618.0,
    badge: { text: "SAVE $59.00", color: "bg-emerald-500" },
    shipping: "FREE SHIPPING",
    stock: "Contact",
    img: "/images/xiomiredmi.png",
  },
  {
    id: 5,
    title: "Microsute Alpha Ultra S5 Surface 128GB 2022, Sliver",
    count: 8,
    price: 1729.0,
    oldPrice: null,
    shipping: "FREE SHIPPING",
    stock: "Contact",
    img: "/images/surface.png",
  },
];

// ---------------------------------------------------------
// 📌 CATEGORIES
// ---------------------------------------------------------
const categories = [
  {
    id: "audios",
    title: "AUDIOS & CAMERAS",
    banner: {
      title: "Best Speaker 2023",
      img: "/images/banner-speaker.png",
      alt: "Best speaker banner",
    },
    items: [
      { id: "speaker", label: "Speaker", count: 12, img: "/images/icon-speaker.png", alt: "speaker" },
      { id: "dslr", label: "DSLR Camera", count: 9, img: "/images/icon-camera.png", alt: "dslr camera" },
      { id: "earbuds", label: "Earbuds", count: 5, img: "/images/icon-earbuds.png", alt: "earbuds" },
      { id: "microphone", label: "Microphone", count: 12, img: "/images/icon-microphone.png", alt: "microphone" },
    ],
  },

  {
    id: "gaming",
    title: "GAMING",
    banner: {
      title: "Wireless RGB Gaming Mouse",
      img: "/images/banner-gaming.png",
      alt: "gaming banner",
    },
    items: [
      { id: "monitors", label: "Monitors", count: 28, img: "/images/icon-monitor.png", alt: "monitors" },
      { id: "chair", label: "Chair", count: 12, img: "/images/icon-chair.png", alt: "chair" },
      { id: "controller", label: "Controller", count: 9, img: "/images/icon-controller.png", alt: "controller" },
      { id: "keyboard", label: "Keyboards", count: 30, img: "/images/icon-keyboard.png", alt: "keyboard" },
    ],
  },

  {
    id: "office",
    title: "OFFICE EQUIPMENTS",
    banner: {
      title: "Laser Projector",
      img: "/images/banner-projector.png",
      alt: "projector banner",
    },
    items: [
      { id: "printers", label: "Printers", count: 9, img: "/images/icon-printer.png", alt: "printers" },
      { id: "network", label: "Network", count: 90, img: "/images/icon-router.png", alt: "network" },
      { id: "security", label: "Security", count: 12, img: "/images/icon-camera2.png", alt: "security" },
      { id: "projectors", label: "Projectors", count: 12, img: "/images/icon-projector.png", alt: "projectors" },
    ],
  },
];

// ---------------------------------------------------------
// 📌 PROMO BANNERS
// ---------------------------------------------------------
const promoBanners = [
  {
    id: 1,
    type: "left",
    bgColor: "bg-teal-600",
    title: ["MASSAGE CHAIR", "LUXURY"],
    description: ["Full Relax Full Body", "Massage Chair"],
    buttonText: "Shop Now",
    img: "/images/massage-chair.png",
    imgAlt: "Massage Chair",
  },
  {
    id: 2,
    type: "right",
    img: "/images/phone-banner.png",
    imgAlt: "Smartphone Promo Banner",
  },
];
// lib/products.js

const bestsellerproducts = [
  {
    id: "1",
    title: "uLosk Mini Case 2.0 – 32GB / SSD 512GB",
    price: 1729.00,
    currency: "$",
    isNew: false,
    badges: ["FREE SHIPPING"],
    stock: { inStock: false, label: "Out of stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png",
    ]
  },

  {
    id: "2",
    title: "Oppo Watch Series 8 – Milanese Loop",
    price: 979.00,
    currency: "$",
    isNew: true,
    badges: ["$2.98 SHIPPING"],
    stock: { inStock: true, label: "PRE-ORDER" },
    images: [
      "/images/product2-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png",
    ]
  },

  {
    id: "3",
    title: "iSmart 24V Charger",
    price: 9.00,
    currency: "$",
    isNew: false,
    badges: ["$3.98 SHIPPING"],
    stock: { inStock: true, label: "Contact" },
    images: [
      "/images/product3-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png",
    ]
  },

  {
    id: "4",
    title: "OPad Pro 12.9 M1 – 64GB WiFi + GPS",
    price: 569.00,
    currency: "$",
    isNew: true,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product4-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png",
    ]
  },
  {
    id: "5",
    title: "OPad Pro 12.9 M1 – 64GB WiFi + GPS",
    price: 569.00,
    currency: "$",
    isNew: true,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product4-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png",
    ]
  },
  {
    id: "6",
    title: "OPad Pro 12.9 M1 – 64GB WiFi + GPS",
    price: 569.00,
    currency: "$",
    isNew: true,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product4-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png",
    ]
  }
];

 const brands = [
  { id: "envato", name: "envato", count: 14 },
  { id: "codecanyon", name: "codecanyon", count: 6 },
  { id: "videohive", name: "videohive", count: 7 },
  { id: "photodune", name: "photodune", count: 18 },
  { id: "microlancer", name: "microlancer", count: 1 },
];

 const colors = ["Black", "White", "Grey", "Pink", "Red", "Blue"];

 const defaultFilterState = {
  search: "",
  selectedCategory: "All Categories",
  activeChips: [
    { type: "priceMin", label: "Min: $45.00", meta: 45 },
    { type: "size", label: "10.9 inch", meta: "10.9" },
    { type: "color", label: "Color: Red", meta: "Red" },
    { type: "storage", label: "128GB", meta: "128GB" },
  ],
  brands: [],
  colors: [],
  priceRange: { min: 0, max: 10000, from: 0, to: 10000 },
};

const storecategories = [
  "All Categories",
  "Cell Phones & Tablets",
  "iPhone",
  "Samsung",
  "Xiaomi",
  "Asus",
  "Oppo",
  "Gaming Smartphone",
  "iPad",
  "Windows Tablets",
  "eReader",
  "Chargers",
  "Accessories",
];

;
// lib/productsData.js

const productsData = [
  {
    id: "1",
    slug: "ulosk-mini-case-20-32gb-ssd-512gb-vga-8gb",
    title: "uLosk Mini Case 2.0, 32GB / SSD 512GB / VGA 8GB",
    price: 1729.0,
    oldPrice: 1899.0,
    currency: "$",
    isNew: false,
    badges: ["FREE SHIPPING"],
    stock: { inStock: false, label: "Out of stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "2",
    slug: "oppo-watch-series-8-gps-milanese-loop",
    title: "Oppo Watch Series 8 GPS + Milanese Loop",
    price: 979.0,
    currency: "$",
    isNew: true,
    badges: ["$2.98 SHIPPING"],
    stock: { inStock: true, label: "PRE - ORDER" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "3",
    slug: "ismart-24v-charger-fast-charging",
    title: "iSmart 24V Charger Fast Charging",
    price: 9.0,
    currency: "$",
    isNew: false,
    badges: ["$3.98 SHIPPING"],
    stock: { inStock: true, label: "Contact" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "4",
    slug: "opad-pro-129-inch-m1-2023-64gb-wifi-gps",
    title: "OPad Pro 12.9 Inch M1 (2023) 64GB WiFi + GPS",
    price: 569.0,
    currency: "$",
    isNew: true,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "5",
    slug: "samsung-galaxy-s21-ultra-5g-12gb-256gb",
    title: "Samsung Galaxy S21 Ultra 5G – 12GB / 256GB",
    price: 859.0,
    currency: "$",
    isNew: true,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "6",
    slug: "samsung-galaxy-a04s-4gb-64gb",
    title: "Samsung Galaxy A04s – 4GB / 64GB",
    price: 88.0,
    currency: "$",
    isNew: false,
    badges: [],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "7",
    slug: "xiaomi-mi-pad-5-snapdragon-860-6gb-128gb",
    title: "Xiaomi Mi Pad 5 – Snapdragon 860 / 6GB / 128GB",
    price: 378.0,
    currency: "$",
    isNew: false,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "8",
    slug: "realme-x7-neo-dimensity-1200-8gb-128gb",
    title: "Realme X7 Neo – Dimensity 1200 / 8GB / 128GB",
    price: 283.0,
    currency: "$",
    isNew: true,
    badges: [],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "9",
    slug: "samsung-galaxy-s23-fe-amoled-display",
    title: "Samsung Galaxy S23 FE – AMOLED Display",
    price: 684.0,
    currency: "$",
    isNew: false,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "10",
    slug: "apple-iphone-13-mini-128gb",
    title: "Apple iPhone 13 Mini – 128GB",
    price: 389.0,
    currency: "$",
    isNew: true,
    badges: ["FREE SHIPPING"],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "11",
    slug: "xiaomi-redmi-note-12-pro-8gb-128gb",
    title: "Xiaomi Redmi Note 12 Pro – 8GB / 128GB",
    price: 190.0,
    currency: "$",
    isNew: true,
    badges: [],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  },

  {
    id: "12",
    slug: "vivo-y21s-4gb-128gb",
    title: "Vivo Y21s – 4GB / 128GB",
    price: 165.0,
    currency: "$",
    isNew: false,
    badges: [],
    stock: { inStock: true, label: "In stock" },
    images: [
      "/images/product1-main.png",
      "/images/product1-1.png",
      "/images/product1-2.png"
    ]
  }
];

export default productsData;





/**
 * Small data file that drives the cart UI.
 * Replace images with files from /public/images if desired.
 * Quantities included so totals calculate.
 */
const cartData = {
  items: [
    {
      id: "p1",
      title: "5000K Smart Phone 128GB, Gold Finish",
      subtitle: "6.5\" OLED • 12MP • 128GB",
      price: 579.0,
      currency: "$",
      isNew: true,
      quantity: 1,
      stock: { inStock: true, label: "1 in stock" },
      sku: "SM-128-GD",
      color: "Gold",
      image:
        "images/tablet.png",
    },
    {
      id: "p2",
      title: "iPad Pro Tablet 2023 11-inch",
      subtitle: "Wi-Fi, 256GB • Cellular 128GB",
      price: 897.0,
      currency: "$",
      isNew: false,
      quantity: 1,
      stock: { inStock: true, label: "In stock" },
      sku: "IP-11-256",
      color: "Space Gray",
      image:
        "images/tablet1.png",
    },
    {
      id: "p3",
      title: "Samsung Galaxy X30 Ultra 12/256 GB",
      subtitle: "6.8\" AMOLED • 108MP",
      price: 559.0,
      currency: "$",
      isNew: false,
      quantity: 1,
      stock: { inStock: false, label: "Out of stock" },
      sku: "SG-X30-256",
      color: "Black",
      image:
        "images/xiomi2.png",
    },
  ],
};

/**
 * Minimal product data to drive the UI.
 * Image URLs use inline SVG placeholders so this demo runs without external assets.
 */
const product = {
  id: "galax-xt",
  title: "Samsung Gelatone X6 Ultra LTE 4G/128GB, Black Smartphone",
  subtitle: "6.8\" AMOLED • 12/256GB • 12MP Ultra Camera",
  priceMin: 569.0,
  priceMax: 609.0,
  priceDefault: 609.0,
  sku: "SG-X6-128",
  brand: "samsung",
  inStock: true,
  images: [
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'><rect width='100%' height='100%' rx='12' fill='%230f1724'/><text x='50%' y='50%' fill='%23fff' font-size='28' text-anchor='middle' dominant-baseline='middle'>MAIN IMAGE</text></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'><rect width='100%' height='100%' rx='12' fill='%232d3748'/><text x='50%' y='50%' fill='%23fff' font-size='28' text-anchor='middle' dominant-baseline='middle'>SIDE IMAGE</text></svg>",
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'><rect width='100%' height='100%' rx='12' fill='%231b2430'/><text x='50%' y='50%' fill='%23fff' font-size='28' text-anchor='middle' dominant-baseline='middle'>BACK IMAGE</text></svg>"
  ],
  colors: [
    { id: "mid", label: "Midnight Blue", swatch: "#0f1724", price: 0 },
    { id: "pink", label: "Pink", swatch: "#f5c2d7", price: 10 },
    { id: "silver", label: "Silver", swatch: "#cbd5e1", price: 20 }
  ],
  memory: ["64GB", "128GB", "256GB"],
};

;
export const topbrands = [
  { name: "JVMAX", logo: "/images/brand1.png", top: true },
  { name: "Digitek", logo: "/images/brand2.png", top: true },
  { name: "Tek Project", logo: "/images/brand3.png", top: true },
  { name: "Grafbase", logo: "/images/brand4.png", top: true },
  { name: "MSI", logo: "/images/brand5.png", top: true },
  { name: "Ohbear", logo: "/images/brand6.png", top: true },
  { name: "OAB", logo: "/images/brand7.png", top: true },
  { name: "Snyk", logo: "/images/brand8.png", top: true },
  { name: "Sonex", logo: "/images/brand9.png", top: true },
  { name: "Stropi", logo: "/images/brand10.png", top: false },
];
export const topcategories = [
  { name: "Laptops", img: "/images/image1.png", top: true },
  { name: "PC Gaming", img: "/images/image2.png", top: true },
  { name: "Headphones", img: "/images/image3.png", top: true},
  { name: "Monitors", img: "/images/image4.png", top: true },
];



// ---------------------------------------------------------
export {
  product,
  phoneSection,
  laptopSection,
  topCellData,
  mockProducts,
  products,
  computerproducts,
  categories,
  promoBanners,
  bestsellerproducts,
  cartData,
  brands,
  colors,
  defaultFilterState,
  storecategories,
  productsData
};

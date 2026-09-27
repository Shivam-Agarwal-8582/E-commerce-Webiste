export const initialCategories = [
  { _id: 'cat-1', name: 'Electronics', slug: 'electronics', icon: 'HiOutlineDevicePhoneMobile', productCount: 4 },
  { _id: 'cat-2', name: 'Fashion & Apparel', slug: 'fashion-apparel', icon: 'HiOutlineShoppingBag', productCount: 4 },
  { _id: 'cat-3', name: 'Home & Kitchen', slug: 'home-kitchen', icon: 'HiOutlineHome', productCount: 3 },
  { _id: 'cat-4', name: 'Footwear', slug: 'footwear', icon: 'HiOutlineSparkles', productCount: 3 },
  { _id: 'cat-5', name: 'Grocery & Essentials', slug: 'grocery-essentials', icon: 'HiOutlineCube', productCount: 2 },
];

export const initialProducts = [
  {
    _id: 'prod-101',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation optimized with two processors and eight microphones. Ultra-comfortable lightweight design with soft fit leather. Up to 30 hours battery life with quick charging.',
    price: 29990,
    discountPrice: 24990,
    category: 'Electronics',
    brand: 'Sony',
    sku: 'SONY-WH1000XM5-BLK',
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    numReviews: 42,
    createdAt: '2026-08-10T10:00:00.000Z'
  },
  {
    _id: 'prod-102',
    name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
    description: 'Powerful health sensors and features including Blood Oxygen app and ECG. Double tap gesture for easy interaction without touching the screen. S9 SiP enables a super-bright display.',
    price: 44900,
    discountPrice: 41900,
    category: 'Electronics',
    brand: 'Apple',
    sku: 'APPL-W9-45-MID',
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    numReviews: 68,
    createdAt: '2026-08-12T10:00:00.000Z'
  },
  {
    _id: 'prod-103',
    name: 'Classic Linen Slim-Fit Casual Shirt',
    description: 'Crafted from 100% breathable pure linen for year-round ease and sophisticated tailoring. Features a classic button-down collar and mother-of-pearl buttons. Ideal for work or relaxed weekends.',
    price: 2499,
    discountPrice: 1799,
    category: 'Fashion & Apparel',
    brand: 'UrbanCraft',
    sku: 'UC-LINEN-SHIRT-M',
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isActive: true,
    rating: 4.6,
    numReviews: 19,
    createdAt: '2026-08-15T10:00:00.000Z'
  },
  {
    _id: 'prod-104',
    name: 'Air Flow Running Shoes with Cushioned Sole',
    description: 'Responsive foam midsole with lightweight knit upper for breathability and comfort during daily training, gym workouts, or casual walking. Non-slip rubber outsole with superior grip.',
    price: 4999,
    discountPrice: 3499,
    category: 'Footwear',
    brand: 'AuraStride',
    sku: 'AUR-RUN-AIR-09',
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isActive: true,
    rating: 4.7,
    numReviews: 53,
    createdAt: '2026-08-18T10:00:00.000Z'
  },
  {
    _id: 'prod-105',
    name: 'Stainless Steel Gooseneck Pour-Over Kettle (1.0L)',
    description: 'Precision spout for steady water flow and optimal coffee extraction. Ergonomic heat-resistant wooden finish handle and built-in thermometer gauge for perfect barista-style brewing.',
    price: 3200,
    discountPrice: 2650,
    category: 'Home & Kitchen',
    brand: 'BrewMaster',
    sku: 'BREW-GNK-1000',
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    numReviews: 31,
    createdAt: '2026-08-20T10:00:00.000Z'
  },
  {
    _id: 'prod-106',
    name: 'Handcrafted Minimalist Leather Bi-fold Wallet',
    description: 'Full-grain vintage Italian leather that ages gracefully over time. Holds up to 8 cards with RFID blocking technology and dual currency compartments.',
    price: 1899,
    discountPrice: 1399,
    category: 'Fashion & Apparel',
    brand: 'ArtisanCraft',
    sku: 'ART-WLT-BLK',
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: false,
    isActive: true,
    rating: 4.9,
    numReviews: 24,
    createdAt: '2026-08-22T10:00:00.000Z'
  },
  {
    _id: 'prod-107',
    name: 'Portable Bluetooth 5.3 Speaker with Deep Bass',
    description: 'Compact rugged design with IPX7 waterproof rating, 360-degree room-filling acoustic sound, and 16 hours of continuous playtime. Includes lanyard for outdoors.',
    price: 3499,
    discountPrice: 2799,
    category: 'Electronics',
    brand: 'SonicWave',
    sku: 'SON-SPK-360',
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isActive: true,
    rating: 4.7,
    numReviews: 37,
    createdAt: '2026-08-25T10:00:00.000Z'
  },
  {
    _id: 'prod-108',
    name: 'Cast Iron Dutch Oven with Enamel Coating 5.5 Qt',
    description: 'Heavy-duty enameled cast iron offers superior heat retention and uniform distribution. Safe for stove, induction, and oven up to 500°F. Ideal for slow roasts, soups, and artisan bread.',
    price: 5999,
    discountPrice: 4899,
    category: 'Home & Kitchen',
    brand: 'HeritageCook',
    sku: 'HER-DO-55',
    stock: 0,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: false,
    isActive: true,
    rating: 4.8,
    numReviews: 44,
    createdAt: '2026-08-28T10:00:00.000Z'
  },
  {
    _id: 'prod-109',
    name: 'Organic Arabica Dark Roast Coffee Beans 500g',
    description: 'Freshly harvested, shade-grown single-origin Arabica beans with notes of dark chocolate, toasted hazelnut, and caramel. Freshly roasted in small batches weekly.',
    price: 850,
    discountPrice: 720,
    category: 'Grocery & Essentials',
    brand: 'Highland Farms',
    sku: 'HLF-COF-500G',
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=800&auto=format&fit=crop&q=80'
    ],
    isFeatured: true,
    isActive: true,
    rating: 4.9,
    numReviews: 82,
    createdAt: '2026-08-30T10:00:00.000Z'
  }
];

export const initialAddresses = [
  {
    _id: 'addr-1',
    fullName: 'Shivam Agarwal',
    phone: '+91 98765 43210',
    houseNumber: 'Flat 402, Sunshine Heights',
    street: 'MG Road, Civil Lines',
    landmark: 'Near City Central Mall',
    city: 'Jaipur',
    state: 'Rajasthan',
    pinCode: '302001',
    country: 'India',
    isDefault: true,
  }
];

export const initialOrders = [
  {
    _id: 'ORD-2026-8941',
    orderNumber: 'ORD-2026-8941',
    customer: {
      _id: 'usr-1',
      name: 'Shivam Agarwal',
      email: 'customer@shop.com',
      phone: '+91 98765 43210',
    },
    items: [
      {
        product: {
          _id: 'prod-101',
          name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'],
          price: 24990,
        },
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        price: 24990,
        quantity: 1,
      }
    ],
    deliveryAddress: initialAddresses[0],
    subtotal: 24990,
    shippingFee: 0,
    total: 24990,
    paymentMethod: 'Online Payment (Razorpay/UPI/Cards)',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    createdAt: '2026-09-11T14:30:00.000Z',
    timeline: [
      { status: 'Pending', timestamp: '2026-09-11T14:30:00.000Z', note: 'Order placed by customer' },
      { status: 'Confirmed', timestamp: '2026-09-11T14:32:15.000Z', note: 'Payment verified via Razorpay' },
      { status: 'Processing', timestamp: '2026-09-12T09:15:00.000Z', note: 'Order packed at physical shop counter' }
    ]
  }
];

export const initialUsers = [
  {
    _id: 'usr-1',
    name: 'Customer Demo',
    email: 'customer@shop.com',
    phone: '+91 98765 43210',
    role: 'customer',
    isActive: true,
    createdAt: '2026-08-01T10:00:00.000Z',
    totalOrders: 1,
    totalSpent: 24990,
  },
  {
    _id: 'usr-admin',
    name: 'Store Owner (Admin)',
    email: 'admin@shop.com',
    phone: '+91 99999 88888',
    role: 'admin',
    isActive: true,
    createdAt: '2026-07-01T10:00:00.000Z',
    totalOrders: 0,
    totalSpent: 0,
  }
];

// ===============================
// Lancet CAFFE — Full Interactive App v2
// ===============================

// ===============================
// THEME TOGGLE (Dark / Light)
// ===============================
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  showToast(isLight ? '☀️ Light mode activated' : '🌙 Dark mode activated');
  try {
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  } catch (e) {}
}

function loadTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.body.classList.add('light-mode');
    }
  } catch (e) {}
}

// Mobile Menu
function menuToggle() {
  const menuToggle = document.getElementById('toggleMenu');
  const navigation = document.getElementById('navigation');
  const overlay = document.getElementById('mobileMenuOverlay');
  menuToggle.classList.toggle('active');
  navigation.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');

  // Prevent body scroll when menu is open
  document.body.style.overflow = navigation.classList.contains('active') ? 'hidden' : '';
}

// ===============================
// Loading Slider Animation
// ===============================
window.addEventListener('load', () => {
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.to('.slider', { y: '-100%', duration: 1.0 });
    tl.fromTo('.navbar-wrapper', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
  } else {
    document.querySelector('.slider').style.transform = 'translateY(-100%)';
  }
});

// ===============================
// PRODUCTS DATA (16 منتجات + categories)
// ===============================
const products = [
  // Hot Coffee (5)
  {
    id: 1, category: 'hot',
    name: 'Espresso Classic', price: 4.50,
    desc: 'Bold, rich, and intense single shot',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80',
    badge: 'NEW', rating: 4.9, reviews: 124
  },
  {
    id: 2, category: 'hot',
    name: 'Caramel Latte', price: 6.25,
    desc: 'Smooth espresso with caramel notes',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    badge: 'BEST', badgeType: 'hot', rating: 5.0, reviews: 287
  },
  {
    id: 4, category: 'hot',
    name: 'Cappuccino', price: 5.50,
    desc: 'Equal parts espresso, milk, and foam',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
    rating: 4.9, reviews: 203
  },
  {
    id: 5, category: 'hot',
    name: 'Mocha Delight', price: 6.75,
    desc: 'Rich chocolate meets bold espresso',
    img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80',
    badge: 'HOT', badgeType: 'hot', rating: 4.9, reviews: 178
  },
  {
    id: 9, category: 'hot',
    name: 'Turkish Coffee', price: 4.95,
    desc: 'Traditional thick brew with cardamom',
    img: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&q=80',
    rating: 4.8, reviews: 156
  },

  // Cold Drinks (4)
  {
    id: 3, category: 'cold',
    name: 'Cold Brew', price: 5.75,
    desc: 'Slow-steeped 24 hours, served chilled',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80',
    rating: 4.8, reviews: 96
  },
  {
    id: 7, category: 'cold',
    name: 'Iced Americano', price: 4.95,
    desc: 'Espresso over ice, simple perfection',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80',
    rating: 4.6, reviews: 145
  },
  {
    id: 8, category: 'cold',
    name: 'Vanilla Frappé', price: 6.95,
    desc: 'Blended ice coffee with vanilla',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    badge: 'BEST', badgeType: 'hot', rating: 5.0, reviews: 312
  },
  {
    id: 10, category: 'cold',
    name: 'Iced Caramel Macchiato', price: 6.50,
    desc: 'Vanilla, espresso, milk, caramel drizzle',
    img: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&q=80',
    badge: 'NEW', rating: 4.7, reviews: 109
  },

  // Tea & Herbs (3)
  {
    id: 6, category: 'tea',
    name: 'Matcha Latte', price: 6.50,
    desc: 'Premium Japanese matcha, creamy',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80',
    badge: 'NEW', rating: 4.7, reviews: 89
  },
  {
    id: 11, category: 'tea',
    name: 'Chai Tea Latte', price: 5.50,
    desc: 'Spiced black tea with steamed milk',
    img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
    rating: 4.7, reviews: 134
  },
  {
    id: 12, category: 'tea',
    name: 'Hibiscus Iced Tea', price: 4.75,
    desc: 'Refreshing floral & tangy infusion',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    rating: 4.6, reviews: 78
  },

  // Desserts (4)
  {
    id: 13, category: 'dessert',
    name: 'Tiramisu', price: 7.25,
    desc: 'Italian classic with mascarpone',
    img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    badge: 'BEST', badgeType: 'hot', rating: 5.0, reviews: 234
  },
  {
    id: 14, category: 'dessert',
    name: 'Chocolate Croissant', price: 4.50,
    desc: 'Buttery, flaky, filled with chocolate',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
    rating: 4.8, reviews: 187
  },
  {
    id: 15, category: 'dessert',
    name: 'Cheesecake Slice', price: 6.95,
    desc: 'Creamy New York style with berries',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    badge: 'NEW', rating: 4.9, reviews: 142
  },
  {
    id: 16, category: 'dessert',
    name: 'Cinnamon Roll', price: 4.25,
    desc: 'Warm, gooey, with cream cheese glaze',
    img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80',
    rating: 4.7, reviews: 198
  },

  // 7 NEW PRODUCTS
  {
    id: 17, category: 'hot',
    name: 'Flat White', price: 5.25,
    desc: 'Velvety microfoam with double espresso',
    img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80',
    badge: 'NEW', rating: 4.8, reviews: 156
  },
  {
    id: 18, category: 'hot',
    name: 'Hazelnut Latte', price: 6.50,
    desc: 'Smooth espresso with toasted hazelnut',
    img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80',
    rating: 4.7, reviews: 142
  },
  {
    id: 19, category: 'cold',
    name: 'Nitro Cold Brew', price: 6.95,
    desc: 'Creamy texture infused with nitrogen',
    img: 'https://images.unsplash.com/photo-1559525839-d9acfd49bff5?w=600&q=80',
    badge: 'HOT', badgeType: 'hot', rating: 4.9, reviews: 198
  },
  {
    id: 20, category: 'cold',
    name: 'Affogato', price: 7.50,
    desc: 'Vanilla gelato drowned in hot espresso',
    img: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&q=80',
    badge: 'BEST', badgeType: 'hot', rating: 5.0, reviews: 245
  },
  {
    id: 21, category: 'tea',
    name: 'Earl Grey Tea', price: 4.95,
    desc: 'Classic black tea with bergamot',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80',
    rating: 4.6, reviews: 87
  },
  {
    id: 22, category: 'tea',
    name: 'Moroccan Mint Tea', price: 5.25,
    desc: 'Fresh mint leaves with green tea',
    img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&q=80',
    badge: 'NEW', rating: 4.8, reviews: 124
  },
  {
    id: 23, category: 'dessert',
    name: 'Lemon Tart', price: 5.75,
    desc: 'Tangy lemon curd in buttery pastry',
    img: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80',
    rating: 4.8, reviews: 167
  }
];

// State
let currentFilter = 'all';
let showAllProducts = false;
const PRODUCTS_VISIBLE_LIMIT = 9;

// ===============================
// RENDER PRODUCTS (with filter + show more)
// ===============================
function renderProducts() {
  const container = document.getElementById('storeProducts');
  if (!container) return;

  // Filter by category
  let filtered = currentFilter === 'all'
    ? products
    : products.filter(p => p.category === currentFilter);

  // Apply show more limit
  const visible = showAllProducts ? filtered : filtered.slice(0, PRODUCTS_VISIBLE_LIMIT);

  container.innerHTML = visible.map(p => {
    const badge = p.badge
      ? `<div class="product-badge ${p.badgeType || ''}">${p.badge}</div>`
      : '';

    const isWished = wishlist.some(w => w.id === p.id);
    const wishlistBtn = `
      <button class="product-wishlist-btn ${isWished ? 'active' : ''}"
              onclick="toggleWishlistItem(${p.id})" title="Add to wishlist">
        <i class="fa-${isWished ? 'solid' : 'regular'} fa-heart"></i>
      </button>
    `;

    const stars = Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(p.rating)
        ? '<i class="fa-solid fa-star"></i>'
        : '<i class="fa-regular fa-star"></i>'
    ).join('');

    return `
      <div class="product fade-in" data-id="${p.id}" data-category="${p.category}">
        <div class="product-img-wrap">
          ${badge}
          ${wishlistBtn}
          <img src="${p.img}" alt="${p.name}" loading="lazy">
        </div>
        <div class="content">
          <h2>${p.name}</h2>
          <p class="price">$${p.price.toFixed(2)}</p>
        </div>
        <div class="product-rating">
          ${stars} <span>(${p.reviews})</span>
        </div>
        <div class="info">
          <p class="text">${p.desc}</p>
          <div>
            <i class="fa-solid fa-bag-shopping btn" onclick="addToCart(${p.id})" title="Add to cart"></i>
            <i class="fa-regular fa-eye btn" title="Quick view"></i>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update show more button visibility
  const showMoreWrap = document.getElementById('showMoreWrap');
  const showMoreText = document.getElementById('showMoreText');
  const showMoreBtn = document.getElementById('showMoreBtn');

  if (filtered.length > PRODUCTS_VISIBLE_LIMIT) {
    showMoreWrap.style.display = 'block';
    if (showAllProducts) {
      showMoreText.textContent = 'Show Less';
      showMoreBtn.classList.add('expanded');
    } else {
      showMoreText.textContent = `Show More (${filtered.length - PRODUCTS_VISIBLE_LIMIT})`;
      showMoreBtn.classList.remove('expanded');
    }
  } else {
    showMoreWrap.style.display = 'none';
  }
}

function toggleShowMore() {
  showAllProducts = !showAllProducts;
  renderProducts();

  if (!showAllProducts) {
    // Scroll back to filters
    document.getElementById('storeFilters').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ===============================
// FILTER FUNCTIONALITY
// ===============================
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Update count badges
  document.getElementById('countAll').textContent = products.length;
  document.getElementById('countHot').textContent = products.filter(p => p.category === 'hot').length;
  document.getElementById('countCold').textContent = products.filter(p => p.category === 'cold').length;
  document.getElementById('countTea').textContent = products.filter(p => p.category === 'tea').length;
  document.getElementById('countDessert').textContent = products.filter(p => p.category === 'dessert').length;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      showAllProducts = false;
      renderProducts();
    });
  });
}

// ===============================
// CART SYSTEM
// ===============================
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function addSpecialToCart(productId) {
  const offer = specialOffers.find(o => o.id === productId);
  if (!offer) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...offer, qty: 1 });
  }

  updateCartUI();
  showToast(`${offer.name} added! 🎉`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast('Item removed');
}

function updateQty(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartBody = document.getElementById('cartBody');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="sidebar-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        Your cart is empty.<br>
        Add some delightful coffee!
      </div>
    `;
  } else {
    cartBody.innerHTML = cart.map(item => `
      <div class="sidebar-item">
        <div class="sidebar-item-img">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="sidebar-item-info">
          <h5>${item.name}</h5>
          <span class="item-price">$${(item.price * item.qty).toFixed(2)}</span>
          <div class="qty-controls">
            <button onclick="updateQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div class="sidebar-item-actions">
          <button class="sidebar-item-remove" onclick="removeFromCart(${item.id})" title="Remove">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  cartTotal.textContent = '$' + totalPrice.toFixed(2);
}

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const wishlistSidebar = document.getElementById('wishlistSidebar');
  const overlay = document.getElementById('cartOverlay');
  wishlistSidebar.classList.remove('open');
  cartSidebar.classList.toggle('open');
  overlay.classList.toggle('active', cartSidebar.classList.contains('open'));
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  showToast('Checkout coming soon! ☕');
}

// ===============================
// WISHLIST SYSTEM
// ===============================
let wishlist = [];

function toggleWishlistItem(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const idx = wishlist.findIndex(w => w.id === productId);

  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`${product.name} removed from wishlist`);
  } else {
    wishlist.push({ ...product });
    showToast(`${product.name} added to wishlist! ❤️`);
  }

  updateWishlistUI();
  renderProducts();
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter(w => w.id !== productId);
  updateWishlistUI();
  renderProducts();
  showToast('Removed from wishlist');
}

function moveItemToCart(productId) {
  addToCart(productId);
  removeFromWishlist(productId);
}

function moveAllToCart() {
  if (wishlist.length === 0) {
    showToast('Wishlist is empty!');
    return;
  }
  const count = wishlist.length;
  wishlist.forEach(item => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
  });
  wishlist = [];
  updateWishlistUI();
  updateCartUI();
  renderProducts();
  showToast(`${count} items moved to cart! 🛒`);
}

function updateWishlistUI() {
  const wishCount = document.getElementById('wishCount');
  const wishlistBody = document.getElementById('wishlistBody');
  wishCount.textContent = wishlist.length;
  wishCount.style.display = wishlist.length > 0 ? 'flex' : 'none';

  if (wishlist.length === 0) {
    wishlistBody.innerHTML = `
      <div class="sidebar-empty">
        <i class="fa-solid fa-heart"></i>
        Your wishlist is empty.<br>
        Save your favorite items!
      </div>
    `;
  } else {
    wishlistBody.innerHTML = wishlist.map(item => `
      <div class="sidebar-item">
        <div class="sidebar-item-img">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="sidebar-item-info">
          <h5>${item.name}</h5>
          <span class="item-price">$${item.price.toFixed(2)}</span>
        </div>
        <div class="sidebar-item-actions">
          <button class="sidebar-item-tocart" onclick="moveItemToCart(${item.id})" title="Add to cart">
            <i class="fa-solid fa-bag-shopping"></i>
          </button>
          <button class="sidebar-item-remove" onclick="removeFromWishlist(${item.id})" title="Remove">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
}

function toggleWishlist() {
  const cartSidebar = document.getElementById('cartSidebar');
  const wishlistSidebar = document.getElementById('wishlistSidebar');
  const overlay = document.getElementById('cartOverlay');
  cartSidebar.classList.remove('open');
  wishlistSidebar.classList.toggle('open');
  overlay.classList.toggle('active', wishlistSidebar.classList.contains('open'));
}

function closeAllSidebars() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('wishlistSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
}

// ===============================
// LIMITED TIME OFFERS - CINEMATIC SHOWCASE
// ===============================
const specialOffers = [
  {
    id: 1001,
    name: 'Caramel Macchiato Combo',
    title: 'Special <em>Weekend</em> Offer',
    desc: 'Indulge in our signature Caramel Macchiato paired with freshly baked croissant. The perfect weekend treat to elevate your morning ritual.',
    oldPrice: 24.00,
    price: 14.99,
    discount: 38,
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80'
  },
  {
    id: 1002,
    name: 'Mocha Bliss Bundle',
    title: 'Chocolate <em>Lover\'s</em> Dream',
    desc: 'Two rich Mocha Delights with a slice of decadent chocolate cake. Pure indulgence for chocolate enthusiasts.',
    oldPrice: 28.50,
    price: 18.99,
    discount: 33,
    img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&q=80'
  },
  {
    id: 1003,
    name: 'Iced Coffee Trio',
    title: 'Summer <em>Refresher</em> Pack',
    desc: 'Cold Brew, Iced Americano, and Vanilla Frappé together. Beat the heat with our refreshing trio at an unbeatable price.',
    oldPrice: 19.50,
    price: 12.99,
    discount: 33,
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80'
  },
  {
    id: 1004,
    name: 'Tea Time Selection',
    title: 'Afternoon <em>Tea</em> Experience',
    desc: 'Matcha Latte, Chai Tea, and Tiramisu slice. The perfect calm afternoon companion for tea connoisseurs.',
    oldPrice: 22.00,
    price: 13.99,
    discount: 36,
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80'
  }
];

let countdownInterval = null;

function renderOffersBento() {
  const bentoEl = document.getElementById('offersBento');
  if (!bentoEl) return;

  bentoEl.innerHTML = specialOffers.map((offer, idx) => {
    const isFeatured = idx === 0;
    return `
      <div class="offer-bento-card ${isFeatured ? 'featured' : ''}">
        <div class="offer-bento-img" style="background-image: url('${offer.img}');"></div>
        <div class="offer-bento-discount">
          <span class="discount-num">${offer.discount}%</span>
          <span class="discount-label">OFF</span>
        </div>
        <div class="offer-bento-content">
          <span class="offer-bento-tag">
            <i class="fa-solid fa-bolt"></i> Limited Time
          </span>
          <h3 class="offer-bento-title">${offer.title}</h3>
          <p class="offer-bento-desc">${offer.desc}</p>
          <div class="offer-bento-bottom">
            <div class="offer-bento-prices">
              <span class="new-price">$${offer.price.toFixed(2)}</span>
              <span class="old-price">$${offer.oldPrice.toFixed(2)}</span>
            </div>
            <button class="offer-bento-btn" onclick="addSpecialToCart(${offer.id})">
              Order <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===============================
// COUNTDOWN TIMER (Updates all visible)
// ===============================
// ===============================
// ABOUT IMAGE SLIDER (3s rotation)
// ===============================
let aboutImgIdx = 0;
let aboutImgTimer = null;
const ABOUT_IMG_INTERVAL = 3000;

// ===============================
// COFFEE BEAN DECORATIONS (All sections)
// ===============================
function injectCoffeeBeans() {
  const beanSVG = (rotate) => `
    <svg class="coffee-bean-decor bean-{N}" viewBox="0 0 60 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="40" rx="20" ry="32" transform="rotate(${rotate} 30 40)"/>
      <path d="M30 12 Q22 40 30 68" stroke="rgba(0,0,0,0.55)" stroke-width="2.5" fill="none" stroke-linecap="round" transform="rotate(${rotate} 30 40)"/>
    </svg>
  `;

  // Random rotation values for variety
  const rotations = [20, -30, 45, -15, 60, -45, 30];

  // Inject beans into each section (except header which already has them)
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    // Skip if beans already exist
    if (section.querySelector('.coffee-bean-decor')) return;

    // 5-7 beans per section randomly
    const count = 5 + Math.floor(Math.random() * 3); // 5-7
    let beansHTML = '';
    for (let i = 1; i <= count; i++) {
      const rot = rotations[Math.floor(Math.random() * rotations.length)];
      beansHTML += beanSVG(rot).replace('{N}', i);
    }
    // Insert at beginning of section
    section.insertAdjacentHTML('afterbegin', beansHTML);
  });

  // Inject beans into footer
  const footer = document.querySelector('footer');
  if (footer && !footer.querySelector('.coffee-bean-decor')) {
    let beansHTML = '';
    for (let i = 1; i <= 3; i++) {
      const rot = rotations[Math.floor(Math.random() * rotations.length)];
      beansHTML += beanSVG(rot).replace('{N}', i);
    }
    footer.insertAdjacentHTML('afterbegin', beansHTML);
  }
}

function initAboutSlider() {
  const images = document.querySelectorAll('.about-image .about-img');
  const dots = document.querySelectorAll('.about-image-dots .about-dot');
  if (!images.length) return;

  // Click handlers on dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.idx);
      goToAboutImage(idx);
      resetAboutAutoplay();
    });
  });

  resetAboutAutoplay();
}

function goToAboutImage(idx) {
  const images = document.querySelectorAll('.about-image .about-img');
  const dots = document.querySelectorAll('.about-image-dots .about-dot');
  if (!images.length) return;

  aboutImgIdx = idx;
  images.forEach((img, i) => img.classList.toggle('active', i === idx));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
}

function resetAboutAutoplay() {
  if (aboutImgTimer) clearInterval(aboutImgTimer);
  aboutImgTimer = setInterval(() => {
    const images = document.querySelectorAll('.about-image .about-img');
    aboutImgIdx = (aboutImgIdx + 1) % images.length;
    goToAboutImage(aboutImgIdx);
  }, ABOUT_IMG_INTERVAL);
}

function initCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 3);

  function updateCountdown() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelectorAll('.cd-days').forEach(el => el.textContent = String(days).padStart(2, '0'));
    document.querySelectorAll('.cd-hours').forEach(el => el.textContent = String(hours).padStart(2, '0'));
    document.querySelectorAll('.cd-mins').forEach(el => el.textContent = String(mins).padStart(2, '0'));
    document.querySelectorAll('.cd-secs').forEach(el => el.textContent = String(secs).padStart(2, '0'));
  }

  updateCountdown();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
}

// ===============================
// TESTIMONIALS DATA & CAROUSEL
// ===============================
const testimonials = [
  {
    initials: 'SA', name: 'Sarah Ahmad', role: 'Coffee Enthusiast', rating: 5,
    text: 'The atmosphere is magical. Every sip feels like coming home. Their Ethiopian blend has ruined all other coffee for me—in the best possible way.'
  },
  {
    initials: 'MK', name: 'Michael Kim', role: 'Food Blogger', rating: 5,
    text: 'Hands down the best cappuccino in town. The baristas are true artists—and the glass-house aesthetic is straight out of a dream.'
  },
  {
    initials: 'LR', name: 'Lina Rodriguez', role: 'Regular Customer', rating: 5,
    text: 'I\'ve been coming here for three years. The consistency, the warmth, the love poured into every cup—it\'s a sanctuary in the middle of the city.'
  },
  {
    initials: 'JT', name: 'James Thompson', role: 'Local Writer', rating: 5,
    text: 'I write here every morning. The lighting is perfect, the staff knows my order, and the matcha latte is otherworldly. My second home.'
  },
  {
    initials: 'EN', name: 'Emma Nakamura', role: 'Photographer', rating: 5,
    text: 'Every corner of this place is Instagram-worthy. But beyond the looks, the coffee is genuinely some of the best I\'ve had on three continents.'
  },
  {
    initials: 'YA', name: 'Youssef Al-Mansouri', role: 'Software Engineer', rating: 5,
    text: 'The Yemeni Mocha here is exceptional. It reminds me of my grandfather\'s coffee. A true taste of authenticity in every cup.'
  },
  {
    initials: 'PD', name: 'Priya Desai', role: 'Travel Vlogger', rating: 5,
    text: 'I have visited cafés in 40+ countries — Lancet CAFFE is in my top 3. Glass walls, golden hour, and a chai latte that transports you. Pure magic.'
  }
];

let testiIdx = 0;
let testiAutoTimer = null;

function renderTestimonials() {
  const stack = document.getElementById('testiStack');
  const dotsLine = document.getElementById('testiDotsLine');
  if (!stack || !dotsLine) return;

  // Generate dots
  dotsLine.innerHTML = testimonials.map((_, i) =>
    `<button class="testi-dot ${i === 0 ? 'active' : ''}" onclick="testiGoTo(${i})" aria-label="View ${i + 1}"></button>`
  ).join('');

  // Generate cards (all of them, position controlled by class)
  stack.innerHTML = testimonials.map((t, i) => {
    const stars = Array.from({ length: 5 }, (_, j) =>
      j < t.rating ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>'
    ).join('');

    return `
      <div class="testi-card" data-idx="${i}">
        <div class="testi-card-quote">
          <i class="fa-solid fa-quote-left"></i>
        </div>
        <div class="testi-card-stars">${stars}</div>
        <p class="testi-card-text">${t.text}</p>
        <div class="testi-card-person">
          <div class="testi-card-avatar">${t.initials}</div>
          <div class="testi-card-info">
            <h5>${t.name}</h5>
            <span>${t.role}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateTestiPositions();

  // Add click handlers on side cards (left/right) to navigate
  stack.querySelectorAll('.testi-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('left')) testiSlide(-1);
      else if (card.classList.contains('right')) testiSlide(1);
    });
  });
}

function updateTestiPositions() {
  const cards = document.querySelectorAll('.testi-card');
  const dots = document.querySelectorAll('.testi-dot');
  const counter = document.getElementById('testiCounter');
  const total = testimonials.length;

  cards.forEach((card, i) => {
    // Calculate relative position
    let diff = i - testiIdx;
    // Normalize to range [-total/2, total/2]
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Remove all position classes
    card.classList.remove('center', 'left', 'right', 'far-left', 'far-right');

    if (diff === 0) {
      card.classList.add('center');
    } else if (diff === -1) {
      card.classList.add('left');
    } else if (diff === 1) {
      card.classList.add('right');
    } else if (diff < -1) {
      card.classList.add('far-left');
    } else {
      card.classList.add('far-right');
    }
  });

  // Update dots
  dots.forEach((dot, i) => dot.classList.toggle('active', i === testiIdx));

  // Update counter
  if (counter) {
    counter.innerHTML = `<span class="current">${String(testiIdx + 1).padStart(2, '0')}</span> / ${String(total).padStart(2, '0')}`;
  }
}

function testiSlide(direction) {
  testiIdx += direction;
  if (testiIdx < 0) testiIdx = testimonials.length - 1;
  if (testiIdx >= testimonials.length) testiIdx = 0;
  updateTestiPositions();
  resetTestiAutoplay();
}

function testiGoTo(i) {
  testiIdx = i;
  updateTestiPositions();
  resetTestiAutoplay();
}

function resetTestiAutoplay() {
  if (testiAutoTimer) clearInterval(testiAutoTimer);
  testiAutoTimer = setInterval(() => {
    testiIdx = (testiIdx + 1) % testimonials.length;
    updateTestiPositions();
  }, 6000);
}

// ===============================
// Toast
// ===============================
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}

// Newsletter
function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (input.value) {
    showToast('Welcome to the club! 🎉');
    input.value = '';
  }
}

// ===============================
// Smooth Scroll
// ===============================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile menu if open
        const navigation = document.getElementById('navigation');
        const toggleMenu = document.getElementById('toggleMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        if (navigation.classList.contains('active')) {
          navigation.classList.remove('active');
          toggleMenu.classList.remove('active');
          if (overlay) overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

// ===============================
// Navbar scroll behavior
// ===============================
function initNavbarScroll() {
  const navbarWrapper = document.getElementById('navbarWrapper');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbarWrapper.classList.toggle('scrolled', y > 50);
    scrollTopBtn.classList.toggle('show', y > 400);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===============================
// Scroll Reveal
// ===============================
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll(
    '.menu-cat-card, .feature-card, .news-card, .about-text, .about-image, .newsletter-card'
  );

  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${i * 0.05}s, transform 0.8s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}

// ===============================
// Init
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initFilters();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  renderOffersBento();
  renderTestimonials();
  initCountdown();
  initSmoothScroll();
  initScrollReveal();
  initNavbarScroll();
  initAboutSlider();
  injectCoffeeBeans();
  resetTestiAutoplay();

  const cartCount = document.getElementById('cartCount');
  if (cartCount && cart.length === 0) cartCount.style.display = 'none';

  const wishCount = document.getElementById('wishCount');
  if (wishCount && wishlist.length === 0) wishCount.style.display = 'none';
});

/* Big Ass Towels — cart engine (localStorage-backed, no backend required) */

const CART_KEY = 'bat_cart_v1';
const THEME_KEY = 'bat_theme';

const CATALOG = {
  'bat-black-90x180': {
    id: 'bat-black-90x180',
    name: 'The Big Ass Towel',
    variant: 'Black / 90 × 180 cm',
    color: 'black',
    price: 59,
    compareAt: 79,
  },
  'bat-white-90x180': {
    id: 'bat-white-90x180',
    name: 'The Big Ass Towel',
    variant: 'White / 90 × 180 cm',
    color: 'white',
    price: 59,
    compareAt: 79,
  },
};

function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  } catch (e) {
    return 'dark';
  }
}

// Dark mode ships the black towel, light mode ships the white one.
function variantIdForTheme(theme) {
  return theme === 'light' ? 'bat-white-90x180' : 'bat-black-90x180';
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
}

function setQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function cartCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function cartLines() {
  const cart = getCart();
  return Object.entries(cart)
    .filter(([id]) => CATALOG[id])
    .map(([id, qty]) => ({ ...CATALOG[id], id, qty, lineTotal: CATALOG[id].price * qty }));
}

function cartSubtotal() {
  return cartLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

function updateCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = cartCount();
  });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);

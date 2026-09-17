/* Big Ass Towels — small page interactions */

function showToast(message) {
  let toast = document.querySelector('.add-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'add-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  // Quantity stepper (product page)
  const qtyInput = document.querySelector('[data-qty-input]');
  if (qtyInput) {
    document.querySelectorAll('[data-qty-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.qtyStep, 10);
        const next = Math.min(10, Math.max(1, (parseInt(qtyInput.value, 10) || 1) + step));
        qtyInput.value = next;
      });
    });
  }

  // Add to cart (product page)
  const addBtn = document.querySelector('[data-add-to-cart]');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const id = addBtn.dataset.addToCart;
      const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
      addToCart(id, qty);
      showToast(`Added ${qty} × Big Ass Towel to your cart`);
    });
  }
});

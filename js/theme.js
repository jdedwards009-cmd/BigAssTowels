/* Big Ass Towels — light/dark theme + towel colorway switch.
   Dark mode = black towel, light mode = white towel, site-wide. */

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-towel', towelColorForTheme(theme));
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}

  document.querySelectorAll('[data-theme-switch]').forEach((el) => {
    el.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
  });

  const variantId = variantIdForTheme(theme);
  const variant = CATALOG[variantId];

  document.querySelectorAll('[data-variant-label]').forEach((el) => {
    el.textContent = variant.variant;
  });
  document.querySelectorAll('[data-add-to-cart]').forEach((el) => {
    el.dataset.addToCart = variantId;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());

  document.querySelectorAll('[data-theme-switch]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
  });
});

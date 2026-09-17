# Big Ass Towels

Storefront for **Big Ass Towels** — a 90 × 180cm oversized black towel, branded
with a bold condensed "BIG ASS TOWELS" wordmark (styled after the heavy poster
typeface in the reference logo, using the free Google Font **Anton** as the
closest open alternative).

## What's here

- `index.html` — homepage: hero wordmark, towel mockup, features, product teaser, FAQ
- `product.html` — product detail page (size/spec table, add-to-cart, supplier notes)
- `cart.html` — cart (localStorage-backed)
- `checkout.html` — simulated checkout flow (no real payment processing — see below)
- `css/styles.css`, `js/cart.js`, `js/main.js` — styling and cart logic
- `assets/favicon.svg` — site favicon
- `SUPPLIERS.md` — manufacturer research for producing the actual 90 × 180cm towel

No build step or framework — it's plain HTML/CSS/JS, so it runs anywhere
(open the files directly, or serve statically).

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or deploy the folder as-is to GitHub Pages, Netlify, Vercel, S3, etc.

## The towel mockup

The product image isn't a photo — it's a CSS/HTML mockup (`.towel` in
`css/styles.css`) rendered at the real 90:180 aspect ratio with a fringed edge
and the wordmark printed across it. This keeps the shop dependency-free and
crisp at any size; swap it for real product photography once samples come
back from a supplier (see `SUPPLIERS.md`).

## Cart & checkout

The cart is entirely client-side (`localStorage`), and checkout is a
**simulated** order flow — submitting the form generates a fake order number,
clears the cart, and shows a confirmation. No payment is actually charged.

To go live, wire `checkout.html`'s form submit handler to a real payment
processor, e.g.:
- **Stripe Checkout** — replace the form with a redirect to a Stripe Checkout
  Session (requires a small backend or serverless function to create the
  session, since Stripe secret keys can't live in client-side JS).
- **Shopify / Shopify Buy Button** — swap the cart/checkout pages for
  Shopify's hosted checkout.

## Manufacturing the towel

See [`SUPPLIERS.md`](./SUPPLIERS.md) for researched manufacturers capable of
producing a true 90 × 180cm black towel with a custom wordmark print, including
a no-MOQ sampling option (Contrado) and bulk private-label Turkish/Chinese
mills for production runs.

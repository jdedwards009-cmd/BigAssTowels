# Big Ass Towels

Storefront for **Big Ass Towels** — a 90 × 180cm oversized towel in black or
white, branded with a bold stacked "BIG / ASS / TOWEL" wordmark (Archivo
Black, the closest open Google Font to the reference logo art).

## What's here

- `index.html` — homepage: hero wordmark, towel photo, product teaser, reviews, FAQ
- `product.html` — product detail page (spec table, colorway toggle, add-to-cart, reviews, supplier notes)
- `about.html` — brand story, use cases (beach/bathroom/bedroom/gym), social links
- `cart.html` — cart (localStorage-backed)
- `checkout.html` — simulated checkout flow (no real payment processing — see below)
- `css/styles.css`, `js/cart.js`, `js/theme.js`, `js/main.js` — styling, theme/colorway logic, cart logic
- `assets/favicon.svg` — favicon
- `assets/towel-white.webp`, `assets/towel-black.webp` — the product photos (see below)
- `assets/ChatGPT Image Sep 17, 2026, 01_12_51 PM.png` — the original source photo, kept for provenance
- `SUPPLIERS.md` — manufacturer research for producing the actual 90 × 180cm towel

No build step or framework — it's plain HTML/CSS/JS, so it runs anywhere
(open the files directly, or serve statically).

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or deploy the folder as-is to GitHub Pages, Netlify, Vercel, S3, etc.

## The towel photo

`assets/towel-white.webp` is the real product photo. `assets/towel-black.webp`
is generated from it: the fabric is darkened while preserving its original
fold/shadow lighting, and the wordmark is inverted to white, using a smooth
luminance-based blend (see the crop/recolor pipeline notes below) rather than
a flat color invert, so it still reads as lit fabric rather than a photo
negative. Both are optimized to ~140–250KB WebP files at 760px wide (plenty
for the largest on-page display size).

Every `.towel-photo` component in the markup renders **both** `<img>` tags;
CSS shows/hides the right one based on `[data-towel]` on `<html>` (see
`.towel-photo img[data-color]` rules in `css/styles.css`), which is what lets
the colorway swap instantly with the theme toggle without any JS re-render.

To regenerate `towel-black.webp` from a new source photo (e.g. a real product
shot once samples come back — see `SUPPLIERS.md`), the approach is: crop out
any studio-background margin, then remap luminance so the fabric darkens
while its shadow/highlight structure is preserved, and the (near-black) ink
inverts to white — a plain color invert instead flips the lighting direction
and looks wrong. Ask Claude to regenerate it the same way, or reimplement
with any image tool that supports a per-pixel luminance curve.

## Colorway + theme toggle

The product page's light/dark switch is also the color picker:

- **Light mode** (light page) → the **black** towel is offered/previewed (contrast against the light background)
- **Dark mode** (dark page) → the **white** towel is offered/previewed (contrast against the dark background)

Whichever is showing when "Add to Cart" is clicked is the variant added.
The chosen theme persists via `localStorage` and is applied site-wide
(including the homepage's towel photo) via a no-flash inline script in
every page's `<head>`. The page palette is driven by `[data-theme]` on
`<html>`; the towel graphic's colorway is driven independently by
`[data-towel]`, so cart thumbnails always show each line item's actual
color regardless of the current page theme.

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

## Social links

The icons in the footer and on `about.html` are placeholders (`href="#"`) —
swap them for the real Instagram/TikTok/X/Facebook account URLs once they exist.

## Manufacturing the towel

See [`SUPPLIERS.md`](./SUPPLIERS.md) for researched manufacturers capable of
producing a true 90 × 180cm towel in both black and white with a custom
wordmark print, including a no-MOQ sampling option (Contrado) and bulk
private-label Turkish/Chinese mills for production runs.

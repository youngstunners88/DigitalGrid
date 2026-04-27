# Digital Grid - Claude Development Guide

## Project Overview
Digital Grid is a one-time-fee e-commerce site for refurbished computers in South Africa. No Shopify, no monthly costs, no backend required.

**Tech Stack:**
- Frontend: React 19 + Vite 6
- Styling: Tailwind CSS 4
- Routing: React Router DOM 7
- State: React Context + useReducer (cart only)
- Payment: PayFast / Yoco (integration pending)
- Deploy: Netlify
- Icons: Lucide React

## Quick Start

```bash
npm install
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## File Structure

```
/src
  /pages           # Route pages (HomePage, ShopPage, etc.)
  /components      # Reusable UI components
  /context         # React Context (CartContext)
  /data            # Static data (products.json)
  App.jsx          # Main app with routing
  index.css        # Global Tailwind
  main.jsx         # Entry point

/planning
  /decisions       # Design decisions & design system

/docs             # Client documentation (future)

index.html        # Entry HTML
tailwind.config.js
postcss.config.js
vite.config.js
package.json
```

## Development Rules

### Code Style
- **Components:** PascalCase, single file, default export
- **Hooks:** camelCase, `use` prefix
- **Utils:** camelCase, pure functions
- **Styles:** Tailwind classes only, no CSS-in-JS
- **Layout:** Flat until grouping by feature makes sense

### What's Allowed
✅ react, react-dom, react-router-dom  
✅ tailwindcss (Tailwind CSS 4)  
✅ lucide-react (icons ONLY)  
✅ clsx + tailwind-merge (utility helpers)  

### What's NOT Allowed
❌ Animation libraries (framer-motion, gsap)  
❌ Component libraries (Material-UI, Chakra)  
❌ Form libraries (Formik, react-hook-form)  
❌ API wrappers or custom fetch  
❌ State management beyond Context  

## Data & Products

### Product Data
Location: `/src/data/products.json`  
Structure: Array of 20 products (13 laptops, 6 desktops, 1 bundle)  
Price range: R1,000–R6,500  
Update via: Edit products.json directly (no API calls)

### Cart State
- Stored in `CartContext` + LocalStorage
- Syncs on every change
- Persists across sessions
- No checkout workflow yet (placeholder form)

## Design System

Reference: `/planning/decisions/design-system.md`

**Color Palette:**
- Brand: Gray 900 (text/nav), Gray 100-300 (backgrounds)
- Accent: Red (cart count), Blue (alerts)

**Typography:**
- Headings: Bold (font-bold)
- Body: Regular with semantic colors

**Breakpoints:**
- xs: 375px (mobile)
- sm: 768px (tablet)
- md: 1024px (small desktop)
- lg: 1440px (large desktop)

**Contrast:** All text WCAG AA compliant

## Key Components

### Layout.jsx
Header with nav + cart badge  
Footer with links  
Uses `useCart()` for badge count

### ProductCard.jsx
Grid-friendly product display  
Lazy-loaded images  
Quick "Add to cart" button

### CartContext.jsx
`useCart()` hook provides:
- `items` - Cart array
- `addItem(product)` - Add or increment
- `removeItem(id)` - Delete from cart
- `updateQuantity(id, qty)` - Change quantity
- `clearCart()` - Empty cart
- `total` - Subtotal in ZAR
- `count` - Item count

## Routes

| Path | Component | Purpose |
|---|---|---|
| / | HomePage | Hero + featured section |
| /shop | ShopPage | Product grid with filters |
| /product/:handle | ProductPage | Detailed view + specs |
| /cart | CartPage | Review & edit cart |
| /checkout | CheckoutPage | Form (PayFast/Yoco redirect) |

## Before You Code

1. Read `/planning/decisions/design-system.md`
2. Check `/src/data/products.json` for current products
3. Test responsive design at 375px, 768px, 1024px, 1440px
4. Verify Lighthouse scores > 90
5. Test cart persistence (refresh browser)

## Deployment

**Build:**
```bash
npm run build  # Creates /dist/
```

**Netlify Config:**
- Build command: `npm run build`
- Publish directory: `dist/`
- Redirects: SPA fallback configured

**Post-Deploy Checklist:**
- [ ] All 20 products render
- [ ] Images load (Shopify CDN + fallback)
- [ ] Cart persists across refresh
- [ ] Mobile responsive (375px)
- [ ] Lighthouse > 90
- [ ] PayFast/Yoco flow tested

## Common Tasks

### Add a New Product
Edit `/src/data/products.json`, add object to array. No deploy needed (static).

### Update Product Images
Replace `image` URL in products.json. Supports Shopify CDN or local images.

### Modify Colors
Edit `/tailwind.config.js` theme → colors → brand.

### Fix Mobile Layout
Check Tailwind responsive classes: `xs:`, `sm:`, `md:`, `lg:` prefixes.

### Debug Cart Issues
Check localStorage in DevTools → Application → Local Storage → Digital Grid domain.

## Performance Targets

- First Contentful Paint: <1s (3G)
- Lighthouse: >90 on all metrics
- Bundle size: <200KB gzipped
- Images: lazy-loaded, decoded async

## Payment Integration (Future)

Placeholder checkout form exists. Production will:
1. Validate address via South African postcode service
2. Redirect to PayFast or Yoco
3. Webhook callback to send order confirmation email

## Support

- **Design questions?** See `/planning/decisions/design-system.md`
- **Product data?** Edit `/src/data/products.json`
- **Feature specs?** Add to `/planning/specs/`
- **Issues?** Document in `/docs/`

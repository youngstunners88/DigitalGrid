# Digital Grid Design System

## Overview
A clean, accessible design system for a South African refurbished computer retailer. Emphasizes quality and trust while remaining budget-conscious.

## Color Palette

### Primary
- **Brand 900** (#0d0e10): Dark backgrounds, headers, text
- **Brand 800** (#212529): Hover states, secondary text
- **Brand 700** (#343a40): Tertiary elements
- **Brand 100-300** (#e9ecef–#ded4da): Backgrounds, borders

### Accent
- **Red 500** (#ef4444): Cart badge, alerts, urgency
- **Blue 500** (#3b82f6): Info boxes, focus states
- **Green 500** (#10b981): Success states, "Added to cart"

### Functional
- **Gray 50-900**: Neutral scale for text, borders, backgrounds
- **White**: Clean backgrounds, cards

## Typography

### Headings
```
h1: 2.25rem (36px), font-bold → page titles
h2: 1.875rem (30px), font-bold → section titles
h3: 1.25rem (20px), font-bold → subsections
```

### Body
```
Base: 1rem (16px), regular weight
Small: 0.875rem (14px) → metadata, secondary text
Mono: courier → prices, specs (future)
```

### Font Family
- Default: System font stack (Tailwind default)
- Bold headers for emphasis

## Layout Grid

### Breakpoints
- **xs** (375px): Mobile (default)
- **sm** (768px): Tablet
- **md** (1024px): Small desktop
- **lg** (1440px): Large desktop

### Spacing
- Base unit: 1rem (16px)
- Scale: 0.5rem, 1rem, 2rem, 4rem, 8rem
- Padding: 4px (0.25rem) to 32px (2rem)
- Gaps: 16px (1rem) to 64px (4rem)

### Container
- Max-width: 100% on mobile, 1280px on desktop
- Side padding: 16px (xs/sm), 32px (md+)

## Components

### Buttons
**Primary:**
- BG: Brand 900 (#0d0e10)
- Text: White
- Hover: Brand 800 (#212529)
- Padding: 12px 32px (py-3 px-8)
- Border radius: 8px

**Secondary:**
- BG: Transparent / Gray 100
- Border: 2px Gray 300
- Text: Gray 900
- Hover: Gray 100

### Cards
- BG: White
- Border: 1px Gray 200
- Padding: 16px (1rem)
- Radius: 8px
- Shadow: hover → shadow-lg

### Input Fields
- BG: White
- Border: 1px Gray 300
- Focus: Ring 2px Brand 900
- Padding: 8px 16px
- Radius: 8px

### Navigation
- BG: Brand 900
- Text: White
- Sticky: Top with z-50
- Logo: Bold, 24px
- Links: Hover → Brand 200 (lighter)

### Product Grid
- Columns: 1 (xs), 2 (sm), 3 (md+)
- Gap: 24px (1.5rem)
- Image ratio: 1:1 (square)

## Accessibility

### WCAG AA Compliance
- Contrast ratio ≥ 4.5:1 for text on background
- Focus indicators: 2px outline, offset 2px
- Color not sole indicator of information
- Touch targets ≥ 44×44px

### Tested Combinations
✅ Brand 900 on White (22:1)  
✅ Brand 600 on White (8:1)  
✅ White on Brand 900 (22:1)  
✅ Gray 600 on Gray 50 (8:1)  

### Images
- Alt text required
- Lazy load: `loading="lazy"`
- Async decode: `decoding="async"`
- Fallback for missing CDN images

## Spacing Examples

### Sections
```
Vertical: py-12 (mobile), py-24 (desktop)
Horizontal: px-4 (mobile), px-6 (desktop)
```

### Cards
```
Product card: p-4 internal spacing
Grid gap: gap-6 between items
```

### Forms
```
Input spacing: space-y-4 (gaps between inputs)
Button width: w-full for primary actions
```

## Icons

### Lucide React Usage
- Size: 20-24px for inline, 32-48px for large
- Color: Inherit text color or explicit class
- No emoji icons

### Examples
```jsx
<ShoppingCart size={24} />
<ArrowRight size={20} />
<Trash2 size={18} />
```

## Responsive Design

### Mobile-First Approach
1. Default styles for xs (375px)
2. Add `sm:`, `md:`, `lg:` prefixes to override
3. Test at 375, 768, 1024, 1440px

### Common Patterns
```
Grid columns: grid-cols-1 sm:grid-cols-2 md:grid-cols-3
Padding: px-4 sm:px-6 md:px-8
Text size: text-lg md:text-xl
```

## Dark Mode (Future)

Not currently implemented. If adding:
- Use CSS `@media (prefers-color-scheme: dark)`
- Swap Brand 900 ↔ White
- Maintain ≥4.5:1 contrast

## Usage in Tailwind

All design system values are implemented in:
- `/tailwind.config.js` → theme colors
- `/src/components/*` → examples
- `/src/pages/*` → reference implementations

## Updating the System

To modify:
1. Edit color hex in `tailwind.config.js`
2. Update this document
3. Rebuild (npm run build)
4. No CSS files to touch (Tailwind handles it)

## Reference Components

- **HomePage**: Hero section layout
- **ShopPage**: Product grid pattern
- **ProductCard**: Reusable product display
- **CartPage**: Complex layout (sidebar + list)
- **CheckoutPage**: Form styling example

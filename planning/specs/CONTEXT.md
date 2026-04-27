# Planning & Specs Context

This folder contains specifications for new features and pages.

## Template for New Features

When adding a new feature or page, create a file like `add-wishlist.md`:

```
# Feature: Add Wishlist

## User Story
As a customer, I want to save products for later so I can compare options.

## Acceptance Criteria
- [ ] "Add to wishlist" button on product cards
- [ ] Wishlist page shows saved items
- [ ] Wishlist persists to LocalStorage
- [ ] Remove from wishlist functionality

## Design
- Button: Heart icon (Lucide) next to "Add to cart"
- Page: Similar layout to cart page
- Storage: localStorage['wishlist']

## Tech
- Use CartContext pattern for WishlistContext
- Update /planning/decisions/design-system.md if new colors needed
```

## Current Features (Complete)

- ✅ Product catalog (20 items)
- ✅ Shopping cart
- ✅ Product filtering
- ✅ Checkout form (placeholder)

## Planned Features (Backlog)

- [ ] Wishlist (MVP+)
- [ ] Product reviews (MVP+)
- [ ] Search bar (MVP+)
- [ ] Newsletter signup (MVP+)
- [ ] PayFast/Yoco integration (Production)
- [ ] Email confirmations (Production)
- [ ] Order tracking (Phase 2)

## Design Review Process

Before building:
1. Write spec in this folder
2. Sketch design (or link Figma)
3. Get approval from client
4. Add to CLAUDE.md if new patterns emerge
5. Build and test at 375px, 768px, 1024px, 1440px

## Ask Questions First

If unsure about:
- Color choices → See design-system.md
- Icon selection → Check Lucide React docs
- Component structure → Look at ProductCard.jsx
- Data format → Check products.json

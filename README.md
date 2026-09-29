# Paradise Nursery – Plant Shop

An e-commerce front end for a houseplant nursery built with React and Redux Toolkit: browse plants by category, add them to a cart, change quantities and check out.

**Live demo:** https://marcoparis.github.io/e-plantShopping/

## Features

- **Catalog** of 26 plants in 5 categories, with quick links to jump between categories.
- **Shopping cart** with add / remove, quantity controls, per-item subtotal and cart total.
- **Cart badge** in the navbar showing the number of items, updated in real time.
- "Add to Cart" is disabled for plants already in the cart and re-enabled when they are removed.
- **Persistent cart**: the cart is saved to `localStorage`, so it survives a page reload.
- **Checkout** confirmation screen and empty-cart state.
- Responsive layout (desktop and mobile), accessible buttons (ARIA labels, focus styles).
- Images are self-hosted and optimised (WebP, ~1 MB total) instead of hot-linked.

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, CSS (custom properties, grid, flexbox), lucide-react icons |
| State management | Redux Toolkit (`createSlice`, `configureStore`), React-Redux hooks |
| Build tooling | Vite |
| Testing | Vitest |
| Linting | ESLint |
| Deployment | GitHub Pages (`gh-pages`) |

## Architecture

```
src/
├── data/plants.js      # product catalog (single source of truth for plant data)
├── CartSlice.js        # cart reducers (add, remove, update quantity, clear) + selectors
├── store.js            # Redux store, preloads and persists the cart in localStorage
├── App.jsx             # landing page and transition to the shop
├── ProductList.jsx     # navbar with cart badge + product catalog
├── CartItem.jsx        # cart page, checkout confirmation
└── CartSlice.test.js   # unit tests for the cart logic
```

Cart count and total are **derived with selectors** rather than stored, so they can never go out of sync with the items in the cart.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm test         # run the unit tests
npm run lint     # lint the code
npm run build    # production build in dist/
npm run deploy   # build and publish to GitHub Pages
```

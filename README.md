# fa-modernization-stage1

Prototypes for the first stage of FA modernization — fan & seller-facing ticket management account.

## Run the prototype

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Sell Tickets landing page

Standalone, mobile-first marketing page for selling tickets on AXS (separate from the account component library):

- **Preview:** [http://localhost:5173/sell](http://localhost:5173/sell)

All landing-specific components live under `src/landing/` and `src/landing/components/`.

## Current vs 6-month view

Switch the look by changing the URL:

- **Current product look:** [http://localhost:5173/current/tickets](http://localhost:5173/current/tickets) (and `/current/listings`, `/current/account`)
- **6-month look:** [http://localhost:5173/future/tickets](http://localhost:5173/future/tickets) (and `/future/listings`, `/future/account`)

The same pages and components are used; the variant is driven by the path and applies theme overrides (see `src/styles/theme.css` and `data-variant="future"`).

## Docs

- [Design system](docs/design-system.md) — brand colors/fonts, components, header/footer
- [Cross-device](docs/cross-device.md) — viewport, touch targets, input types for desktop and iPhone

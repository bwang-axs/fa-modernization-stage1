# Cross-Device (Desktop + iPhone)

- **Viewport:** `index.html` uses `width=device-width, initial-scale=1, viewport-fit=cover` so layout and safe areas work on phones (e.g. Safari notch).
- **Touch targets:** `globals.css` sets `--tap-min-height: 44px` and applies minimum size to buttons and interactive elements so taps are reliable on touch devices.
- **Inputs:** Use the shared `Input` component with appropriate `type` and `inputmode` so mobile keyboards are correct:
  - Email: `type="email"` (and optionally `inputMode="email"`).
  - Phone: `type="tel"` and `inputMode="tel"`.
  - Numbers: `inputMode="numeric"` or `inputMode="decimal"`.
  - Search: `type="search"` and `inputMode="search"`.
- **Focus:** `:focus-visible` is styled so keyboard/screen-reader users get a clear focus ring without forcing one on touch.
- **Font size:** Inputs use at least 16px on small viewports so iOS Safari does not zoom on focus.

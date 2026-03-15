# Design system (prototype)

- **Brand:** Colors and fonts live in `src/styles/theme.css`. Use `var(--color-*)` and `var(--font-sans)` in components.
- **Components:** Use `Button`, `Input`, `Card`, `NavTabs` from `src/components` for consistency.
- **Header / footer:** Match current product structure; do not change shell layout without alignment.
- **Current vs 6-month:** Switch by URL: `/current/...` shows current look, `/future/...` applies `data-variant="future"` and theme overrides in `theme.css`.

## Typography (Figma text styles)

| Figma | HTML / class |
|-------|----------------|
| Display 01 | `.text-display-01` |
| Heading 01–04 | `<h1>`–`<h4>` or `.text-heading-01`…`.text-heading-04` |
| Body 01 Regular / Semibold | `.text-body-01` / `.text-body-01-semibold` (same for `02`, `03`) |
| Label 01–03 | `.text-label-01` + `-semibold` variants |
| Utility 01–03 | `.text-utility-01` + `-semibold` |
| Link 01 | `.text-link-01` / `.text-link-01-semibold` (on `<a>`) |

- **Token values** (size / line-height): edit `src/styles/theme.css` under `--type-*`.
- **Class definitions**: `src/styles/typography.css`.

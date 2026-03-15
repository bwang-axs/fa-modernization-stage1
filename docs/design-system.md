# Design system (prototype)

- **Brand:** Colors and fonts live in `src/styles/theme.css`. Use `var(--color-*)` and `var(--font-sans)` in components.
- **Components:** Use `Button`, `Input`, `Card`, `NavTabs` from `src/components` for consistency.
- **Header / footer:** Match current product structure; do not change shell layout without alignment.
- **Current vs 6-month:** Switch by URL: `/current/...` shows current look, `/future/...` applies `data-variant="future"` and theme overrides in `theme.css`.

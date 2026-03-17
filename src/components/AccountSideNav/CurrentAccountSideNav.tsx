import { NavLink } from 'react-router-dom'
import styles from './CurrentAccountSideNav.module.css'

const defaultItems = [
  { path: 'tickets', label: 'Your Tickets', icon: TicketIcon },
  { path: 'orders', label: 'Orders', icon: OrdersIcon },
  { path: 'history', label: 'History', icon: HistoryIcon },
  { path: 'offers', label: 'Offers', icon: OffersIcon },
  { path: 'account', label: 'Account', icon: AccountIcon },
] as const

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}

function OrdersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function OffersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function CurrentAccountSideNav({ basePath = '/current' }: { basePath?: string }) {
  const accountBase = basePath
  const items =
    basePath === '/currentV2'
      ? ([
          { path: 'events', label: 'Events', icon: TicketIcon },
          { path: 'listings', label: 'Listings', icon: OrdersIcon },
          { path: 'order-history', label: 'Order history', icon: HistoryIcon },
          { path: 'offers', label: 'Offers', icon: OffersIcon },
          { path: 'account', label: 'Account', icon: AccountIcon },
        ] as const)
      : defaultItems

  return (
    <nav className={styles.nav} aria-label="Account navigation">
      <ul className={styles.list}>
        {items.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <NavLink
              to={path === 'account' ? `${accountBase}/account` : `${accountBase}/${path}`}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`.trim()}
              end={path === 'tickets' || path === 'events'}
            >
              <span className={styles.icon} aria-hidden>
                <Icon />
              </span>
              <span className={styles.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

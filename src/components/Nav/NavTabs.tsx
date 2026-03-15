import { Link, useLocation } from 'react-router-dom'
import { useVariant } from '../../context/VariantContext'
import styles from './NavTabs.module.css'

const tabs = [
  { path: 'tickets', label: 'Tickets', icon: TicketIcon },
  { path: 'listings', label: 'Listings', icon: ListIcon },
  { path: 'account', label: 'Account', icon: AccountIcon },
] as const

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  )
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function NavTabs() {
  const location = useLocation()
  const variant = useVariant()
  const base = variant === 'current' ? '/current' : '/future'

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul className={styles.list}>
        {tabs.map(({ path, label, icon: Icon }) => {
          const to = `${base}/${path}`
          const isActive = location.pathname === to
          return (
            <li key={path}>
              <Link
                to={to}
                className={`${styles.tab} ${isActive ? styles.active : ''}`.trim()}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={styles.icon} aria-hidden>
                  <Icon />
                </span>
                <span className={styles.label}>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

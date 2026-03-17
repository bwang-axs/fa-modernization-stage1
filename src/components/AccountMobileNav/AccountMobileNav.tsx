import { Link, useLocation } from 'react-router-dom'
import styles from './AccountMobileNav.module.css'

const makeTabs = (basePath: string) =>
  basePath === '/currentV2'
    ? ([
        { path: `${basePath}/events`, label: 'Events', icon: TicketIcon },
        { path: `${basePath}/offers`, label: 'Offers', icon: OffersIcon },
        { path: `${basePath}/account`, label: 'Account', icon: AccountIcon },
        { path: `${basePath}/more`, label: 'More', icon: MoreIcon },
      ] as const)
    : ([
        { path: `${basePath}/tickets`, label: 'Tickets', icon: TicketIcon },
        { path: `${basePath}/offers`, label: 'Offers', icon: OffersIcon },
        { path: `${basePath}/account`, label: 'Account', icon: AccountIcon },
        { path: `${basePath}/more`, label: 'More', icon: MoreIcon },
      ] as const)

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

function OffersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function AccountMobileNav({ basePath = '/current' }: { basePath?: string }) {
  const location = useLocation()
  const tabs = makeTabs(basePath)

  return (
    <nav className={styles.nav} aria-label="Account navigation">
      <ul className={styles.list}>
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive =
            path === location.pathname ||
            (path === `${basePath}/events` &&
              (location.pathname === path || location.pathname.startsWith(`${basePath}/events/`))) ||
            (path !== `${basePath}/more` &&
              path !== `${basePath}/events` &&
              location.pathname.startsWith(path)) ||
            (path === `${basePath}/more` &&
              (location.pathname === `${basePath}/more` ||
                location.pathname.startsWith(`${basePath}/orders`) ||
                location.pathname.startsWith(`${basePath}/history`) ||
                location.pathname.startsWith(`${basePath}/order-history`)))
          return (
            <li key={path}>
              <Link
                to={path}
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

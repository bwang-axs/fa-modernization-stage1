import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { CurrentAccountSideNav } from '../AccountSideNav/CurrentAccountSideNav'
import { AccountMobileNav } from '../AccountMobileNav/AccountMobileNav'
import styles from './CurrentAccountLayout.module.css'

/**
 * Layout for the "current" variants: header (no app banner), left nav on desktop,
 * main content, footer; on mobile, bottom nav instead of left nav.
 */
export function CurrentAccountLayout({ basePath = '/current' }: { basePath?: string }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main} id="main-content">
        <CurrentAccountSideNav basePath={basePath} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <AccountMobileNav basePath={basePath} />
    </div>
  )
}

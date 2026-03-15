import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { CurrentAccountSideNav } from '../AccountSideNav/CurrentAccountSideNav'
import { AccountMobileNav } from '../AccountMobileNav/AccountMobileNav'
import styles from './CurrentAccountLayout.module.css'

/**
 * Layout for the "current" variant: header (no app banner), left nav on desktop,
 * main content, footer; on mobile, bottom nav instead of left nav.
 */
export function CurrentAccountLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main} id="main-content">
        <CurrentAccountSideNav />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <AccountMobileNav />
    </div>
  )
}

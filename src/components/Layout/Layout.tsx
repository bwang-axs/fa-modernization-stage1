import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { NavTabs } from '../Nav/NavTabs'
import { AppDownloadBanner } from '../AppDownloadBanner/AppDownloadBanner'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <AppDownloadBanner />
      <main className={styles.main} id="main-content">
        <NavTabs />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

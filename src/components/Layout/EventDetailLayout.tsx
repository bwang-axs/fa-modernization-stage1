import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { AppDownloadBanner } from '../AppDownloadBanner/AppDownloadBanner'
import { useVariant } from '../../context/VariantContext'
import styles from './Layout.module.css'

/**
 * Layout for the Event Detail page: top nav (Header + banner) only.
 * No nav tabs (Tickets/Listings/Accounts) and no main app footer.
 * "current" variant: no app banner in header.
 */
export function EventDetailLayout() {
  const variant = useVariant()
  const showBanner = variant !== 'current'

  return (
    <div className={styles.layout}>
      <Header />
      {showBanner && <AppDownloadBanner />}
      <main className={styles.main} id="main-content">
        <Outlet />
      </main>
    </div>
  )
}

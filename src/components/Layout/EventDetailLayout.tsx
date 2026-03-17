import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { AppDownloadBanner } from '../AppDownloadBanner/AppDownloadBanner'
import { useVariant } from '../../context/VariantContext'
import styles from './Layout.module.css'

/**
 * Layout for the Event Detail page: top nav (Header + banner) only.
 * No nav tabs (Tickets/Listings/Accounts) and no main app footer.
 * "current" variant: no header (parent CurrentAccountLayout already has it), no app banner.
 */
export function EventDetailLayout() {
  const variant = useVariant()
  const isEmbeddedVariant = variant === 'current' || variant === 'currentV2'
  const showHeader = !isEmbeddedVariant
  const showBanner = !isEmbeddedVariant

  const mainClass = isEmbeddedVariant ? `${styles.main} ${styles.mainEmbedded}` : styles.main

  return (
    <div className={styles.layout}>
      {showHeader && <Header />}
      {showBanner && <AppDownloadBanner />}
      <main className={mainClass} id="main-content">
        <Outlet />
      </main>
    </div>
  )
}

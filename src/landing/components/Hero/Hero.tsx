import { Link } from 'react-router-dom'
import { useVariant } from '../../../context/VariantContext'
import styles from './Hero.module.css'

export function Hero() {
  const variant = useVariant()
  const base = variant === 'current' ? '/current' : '/future'
  const sellPath = `${base}/listings`

  return (
    <section className={styles.section} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Official AXS Resale</span>
          <h1 id="hero-heading" className={styles.headline}>
            Sell your tickets easily and securely
          </h1>
          <p className={styles.subheadline}>
            List tickets in minutes. Get paid when they sell. AXS keeps buyers
            and sellers verified for a safer marketplace.
          </p>
          <Link to={sellPath} className={styles.cta}>
            Sell Tickets
          </Link>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.ticketMock}>
            <div className={styles.ticketTitle}>Concert at The Venue</div>
            <div className={styles.ticketLine} />
            <div className={styles.ticketRow}>
              <span className={styles.ticketLabel}>Section</span>
              <span className={styles.ticketValue}>A · Row 5</span>
            </div>
            <div className={styles.ticketRow}>
              <span className={styles.ticketLabel}>List price</span>
              <span className={styles.ticketValue}>$120</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

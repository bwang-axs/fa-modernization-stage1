import { Link } from 'react-router-dom'
import { useVariant } from '../../../context/VariantContext'
import styles from './FinalCTA.module.css'

export function FinalCTA() {
  const variant = useVariant()
  const base = variant === 'current' ? '/current' : '/future'
  const sellPath = `${base}/listings`

  return (
    <section className={styles.section} aria-labelledby="final-cta-heading">
      <div className={styles.container}>
        <h2 id="final-cta-heading" className={styles.headline}>
          Ready to sell? Get started in minutes.
        </h2>
        <p className={styles.supporting}>
          List your tickets on the official AXS marketplace. Secure, simple, and
          trusted by fans everywhere.
        </p>
        <Link to={sellPath} className={styles.cta}>
          Sell Tickets
        </Link>
      </div>
    </section>
  )
}

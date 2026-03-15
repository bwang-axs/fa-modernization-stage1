import { Link } from 'react-router-dom'
import { useVariant } from '../../context/VariantContext'
import styles from './Footer.module.css'

export function Footer() {
  const variant = useVariant()
  const base = variant === 'current' ? '/current' : '/future'

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <Link to={base} className={styles.logo} aria-label="AXS Home">
          <img src="/axs-logo.png" alt="AXS" className={styles.logoImg} />
        </Link>
        <div className={styles.linksBlock}>
          <nav className={styles.nav} aria-label="Footer">
            <Link to={`${base}/purchase`} className={styles.link}>
              Purchase
            </Link>
            <span className={styles.sep} aria-hidden="true">
              |
            </span>
            <Link to={`${base}/terms`} className={styles.link}>
              Terms of Use
            </Link>
            <span className={styles.sep} aria-hidden="true">
              |
            </span>
            <Link to={`${base}/privacy`} className={styles.link}>
              Privacy Policy
            </Link>
          </nav>
          <p className={styles.copyright}>
            ©2011–{new Date().getFullYear()} AXS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

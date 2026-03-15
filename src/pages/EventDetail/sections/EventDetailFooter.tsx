import { Link, useLocation } from 'react-router-dom'
import styles from './EventDetailFooter.module.css'

export function EventDetailFooter() {
  const location = useLocation()
  const path = location.pathname
  const base = path.startsWith('/future') ? '/future' : path.startsWith('/new') ? '/new' : '/current'
  const helpPath = base === '/current' ? `${base}/account/help` : `${base}/account/help`

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <Link to={base} className={styles.logo} aria-label="AXS Home">
          <img src="/axs-logo.png" alt="AXS" className={styles.logoImg} />
        </Link>
        <nav className={styles.nav} aria-label="Footer">
          <Link to={helpPath} className={styles.link}>
            Help / Support
          </Link>
          <span className={styles.sep} aria-hidden>|</span>
          <Link to={`${base}/terms`} className={styles.link}>
            Terms
          </Link>
          <span className={styles.sep} aria-hidden>|</span>
          <Link to={`${base}/privacy`} className={styles.link}>
            Privacy
          </Link>
        </nav>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} AXS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

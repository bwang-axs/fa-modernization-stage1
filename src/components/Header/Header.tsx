import { Link } from 'react-router-dom'
import { useVariant } from '../../context/VariantContext'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import styles from './Header.module.css'

export function Header() {
  const variant = useVariant()
  const base = variant === 'current' ? '/current' : '/future'

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <Link to={base} className={styles.logo} aria-label="AXS Home">
          <img src="/axs-logo.png" alt="AXS" className={styles.logoImg} />
        </Link>
        <div className={styles.userSlot}>
          <UserAvatar name="John Smith" size={36} />
        </div>
      </div>
    </header>
  )
}

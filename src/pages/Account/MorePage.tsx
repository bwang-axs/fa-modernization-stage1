import { Link } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

const links = [
  { to: '/current/orders', label: 'Orders', description: 'View and manage your order history' },
  { to: '/current/history', label: 'History', description: 'Your recent activity and history' },
] as const

export function MorePage() {
  return (
    <>
      <h1 className={styles.pageTitle}>More</h1>
      <p className={styles.pageIntro}>
        Orders, history, and other account options.
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {links.map(({ to, label, description }) => (
          <li key={to}>
            <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card className={styles.card} style={{ padding: 'var(--space-4)' }}>
                <h2 className={styles.cardTitle} style={{ marginBottom: 'var(--space-1)' }}>{label}</h2>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                  {description}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

export function OrdersPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Orders</h1>
      <p className={styles.pageIntro}>
        View and manage your order history.
      </p>
      <Card className={styles.card}>
        <h2 className={styles.cardTitle}>Your orders</h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Order history will appear here.
        </p>
      </Card>
    </>
  )
}

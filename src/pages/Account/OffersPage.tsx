import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

export function OffersPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Offers</h1>
      <p className={styles.pageIntro}>
        View and manage your offers.
      </p>
      <Card className={styles.card}>
        <h2 className={styles.cardTitle}>Your offers</h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Offers and promotions will appear here.
        </p>
      </Card>
    </>
  )
}

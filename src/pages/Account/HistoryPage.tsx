import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

export function HistoryPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>History</h1>
      <p className={styles.pageIntro}>
        Your recent activity and history.
      </p>
      <Card className={styles.card}>
        <h2 className={styles.cardTitle}>Activity history</h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Your activity history will appear here.
        </p>
      </Card>
    </>
  )
}
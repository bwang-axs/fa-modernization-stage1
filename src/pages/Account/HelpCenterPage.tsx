import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

export function HelpCenterPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Help Center</h1>
      <p className={styles.pageIntro}>
        Find answers and get support.
      </p>
      <Card className={styles.card}>
        <h2 className={styles.cardTitle}>Help & support</h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          FAQs, contact options, and support resources will appear here.
        </p>
      </Card>
    </>
  )
}
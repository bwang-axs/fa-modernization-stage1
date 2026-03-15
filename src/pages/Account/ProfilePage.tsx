import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

export function ProfilePage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Profile</h1>
      <p className={styles.pageIntro}>
        View and manage your profile information.
      </p>
      <Card className={styles.card}>
        <h2 className={styles.cardTitle}>Profile details</h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Add profile content here (e.g. name, photo, preferences).
        </p>
      </Card>
    </>
  )
}

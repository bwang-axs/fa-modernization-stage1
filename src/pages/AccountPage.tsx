import { Card } from '../components/Card/Card'
import { Input } from '../components/Input/Input'
import { Button } from '../components/Button/Button'
import styles from './AccountPage.module.css'

export function AccountPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Account</h1>
      <p className={styles.pageIntro}>
        Manage your account and security settings.
      </p>

      <Card className={styles.card}>
        <h2 id="password-heading" className={styles.cardTitle}>
          Change password
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.form}
          aria-labelledby="password-heading"
        >
          <Input
            label="Current password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter current password"
          />
          <Input
            label="New password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm new password"
          />
          <Button type="submit" variant="primary">
            Update password
          </Button>
        </form>
      </Card>

      <Card className={styles.card}>
        <h2 id="contact-heading" className={styles.cardTitle}>
          Contact info
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.form}
          aria-labelledby="contact-heading"
        >
          <Input
            label="Email"
            type="email"
            inputMode="email"
            placeholder="you@example.com"
          />
          <Input
            label="Phone"
            type="tel"
            inputMode="tel"
            placeholder="+1 (555) 000-0000"
          />
          <Button type="submit" variant="primary">
            Save changes
          </Button>
        </form>
      </Card>
    </>
  )
}

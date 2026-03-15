import { Card } from '../components/Card/Card'
import { Input } from '../components/Input/Input'
import { Button } from '../components/Button/Button'

export function SettingsPage() {
  return (
    <>
      <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
        Settings
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        Account and notification settings.
      </p>
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>
          Contact info
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
        >
          <Input label="Email" type="email" inputMode="email" placeholder="you@example.com" />
          <Input label="Phone" type="tel" inputMode="tel" placeholder="+1 (555) 000-0000" />
          <Button type="submit" variant="primary">
            Save changes
          </Button>
        </form>
      </Card>
      <Card>
        <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
          Notifications
        </h2>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Manage how you receive order and listing updates.
        </p>
        <Button variant="secondary" style={{ marginTop: 'var(--space-4)' }}>
          Notification preferences
        </Button>
      </Card>
    </>
  )
}

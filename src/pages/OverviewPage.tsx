import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'

export function OverviewPage() {
  return (
    <>
      <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
        Overview
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        Your account overview. Upcoming events and recent activity.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Card>
          <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
            Upcoming events
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            No upcoming events. Your purchased tickets will appear here.
          </p>
          <Button variant="secondary" style={{ marginTop: 'var(--space-4)' }}>
            View orders
          </Button>
        </Card>
        <Card>
          <h2 style={{ margin: 0, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
            Recent activity
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Your recent ticket activity will show here.
          </p>
        </Card>
      </div>
    </>
  )
}

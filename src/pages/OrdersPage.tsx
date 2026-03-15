import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'

export function OrdersPage() {
  return (
    <>
      <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
        Orders
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        View and manage your ticket orders.
      </p>
      <Card>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          No orders yet. When you purchase tickets, they will appear here.
        </p>
        <Button variant="primary" style={{ marginTop: 'var(--space-4)' }}>
          Find events
        </Button>
      </Card>
    </>
  )
}

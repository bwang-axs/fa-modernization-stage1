import { useState } from 'react'
import { Card } from '../../components/Card/Card'
import styles from '../AccountPage.module.css'

const TABS = ['Order history', 'Transfer history'] as const

export function OrderHistoryV2Page() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Order history')

  return (
    <>
      <h1 className={styles.pageTitle}>Order history</h1>
      <p className={styles.pageIntro}>
        View your ticket orders and transfer activity.
      </p>
      <nav
        aria-label="Order history type"
        style={{ marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}
      >
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            gap: 'var(--space-2)',
          }}
        >
          {TABS.map((tab) => (
            <li key={tab}>
              <button
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? 'page' : undefined}
                style={{
                  padding: 'var(--space-3) var(--space-2)',
                  marginBottom: '-1px',
                  border: 'none',
                  borderBottom:
                    activeTab === tab
                      ? '3px solid var(--color-primary)'
                      : '3px solid transparent',
                  background: 'none',
                  color:
                    activeTab === tab
                      ? 'var(--color-primary)'
                      : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <Card className={styles.card}>
        <h2 className={styles.cardTitle}>
          {activeTab === 'Order history' ? 'Your orders' : 'Your transfers'}
        </h2>
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-sm)',
          }}
        >
          {activeTab === 'Order history'
            ? 'Order history will appear here.'
            : 'Transfer history will appear here.'}
        </p>
      </Card>
    </>
  )
}


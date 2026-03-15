import { useState } from 'react'
import type { EventInfoItem } from '../../../data/eventDetailMock'
import styles from './EventInformationSection.module.css'

function DoorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function ParkingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  )
}

function EntryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  )
}

const iconMap = {
  door: DoorIcon,
  bag: BagIcon,
  parking: ParkingIcon,
  entry: EntryIcon,
}

interface EventInformationSectionProps {
  items: EventInfoItem[]
}

function InfoRow({ item }: { item: EventInfoItem }) {
  const [open, setOpen] = useState(false)
  const isLong = item.content.length > 60
  const Icon = iconMap[item.icon]

  const triggerContent = (
    <>
      <span className={styles.iconWrap}>
        <Icon className={styles.icon} aria-hidden />
      </span>
      <span className={styles.label}>{item.label}</span>
      {isLong && (
        <span className={styles.chevron} aria-hidden>
          {open ? '−' : '+'}
        </span>
      )}
    </>
  )

  return (
    <div className={styles.row}>
      {isLong ? (
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {triggerContent}
        </button>
      ) : (
        <div className={styles.triggerStatic}>{triggerContent}</div>
      )}
      <div className={isLong && !open ? styles.contentShort : styles.content}>
        {item.content}
      </div>
    </div>
  )
}

export function EventInformationSection({ items }: EventInformationSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="event-info-heading">
      <h2 id="event-info-heading" className={styles.heading}>
        Event information
      </h2>
      <div className={styles.card}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.listItem}>
              <InfoRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { useState } from 'react'
import type { VenueInfo } from '../../../data/eventDetailMock'
import styles from './ParkingModal.module.css'

type ParkingPass = {
  id: string
  name: string
  description: string
  price: number
  purchasedBy: number
  lotName: string
  walkTime: string
  accessHours: string
  instructions: string
  tag?: 'best-value' | 'popular'
}

const PARKING_OPTIONS: ParkingPass[] = [
  {
    id: 'park-1',
    name: 'General Parking',
    description: 'Standard lots. Available while spaces last.',
    price: 25,
    purchasedBy: 1247,
    lotName: 'Lot C — North Gate',
    walkTime: '~12 min walk to gate',
    accessHours: 'Opens 3:00 PM · Closes 2 hrs after event',
    instructions: 'Show your QR code at the lot entry. Valid on event day only. No re-entry after exit.',
  },
  {
    id: 'park-2',
    name: 'Preferred Parking',
    description: 'Closer to main entrance. Reserved space.',
    price: 40,
    purchasedBy: 624,
    lotName: 'Lot A — Main Entrance',
    walkTime: '~6 min walk to gate',
    accessHours: 'Opens 3:00 PM · Closes 2 hrs after event',
    instructions: 'Reserved spot guaranteed. Show QR code at entry gate. Attendant on site.',
    tag: 'popular',
  },
  {
    id: 'park-3',
    name: 'VIP Parking',
    description: 'Closest lot. Reserved, covered where available.',
    price: 65,
    purchasedBy: 198,
    lotName: 'Lot VIP — Gate 1',
    walkTime: '~2 min walk to gate',
    accessHours: 'Opens 2:00 PM · Closes 2 hrs after event',
    instructions: 'Dedicated attendant will direct you to your spot. Show QR code at entry. Complimentary car wash not included.',
    tag: 'best-value',
  },
]

function formatPurchasedBy(n: number): string {
  if (n >= 1000) {
    const v = n / 1000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}k`
  }
  return n.toLocaleString()
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function WalkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 3 2 1.5-3" />
      <path d="m15 10-3 2" />
      <path d="M9.5 11.5 8 20" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

interface ParkingModalProps {
  venue?: VenueInfo
  onClose?: () => void
  onConfirm?: () => void
}

export function ParkingModal({ venue, onClose, onConfirm }: ParkingModalProps) {
  const [selectedId, setSelectedId] = useState<string>(PARKING_OPTIONS[0]?.id ?? '')

  const selected = PARKING_OPTIONS.find((p) => p.id === selectedId) ?? PARKING_OPTIONS[0]

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="parking-modal-title"
    >
      <div className={styles.modal}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <h2 id="parking-modal-title" className={styles.title}>
              Add a parking pass
            </h2>
            <p className={styles.subtitle}>
              Reserve your spot before the event. Passes are non-transferable.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => onClose?.()}
          >
            <span>Close</span>
            <span className={styles.closeIcon} aria-hidden>×</span>
          </button>
        </div>

        {/* ── Venue bar ──────────────────────────────────────────────── */}
        {venue && (
          <div className={styles.venueBar}>
            <MapPinIcon className={styles.venueBarPin} />
            <span className={styles.venueBarText}>
              <span className={styles.venueBarName}>{venue.name}</span>
              <span className={styles.venueBarSep} aria-hidden>·</span>
              <span className={styles.venueBarCity}>{venue.city}, {venue.state}</span>
            </span>
            {venue.policyUrl && (
              <a
                href={venue.policyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.venueBarLink}
              >
                View venue parking policy
                <ExternalLinkIcon className={styles.venueBarLinkIcon} />
              </a>
            )}
          </div>
        )}

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* Left: pass selector */}
          <div className={styles.leftColumn}>
            <p className={styles.leftLabel}>Parking options</p>
            <div className={styles.cardList}>
              {PARKING_OPTIONS.map((pass) => {
                const isSelected = pass.id === selectedId
                return (
                  <button
                    key={pass.id}
                    type="button"
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`.trim()}
                    onClick={() => setSelectedId(pass.id)}
                    aria-pressed={isSelected}
                    aria-label={`${pass.name}, $${pass.price}`}
                  >
                    <div className={styles.cardTopRow}>
                      <div className={styles.cardInfo}>
                        <span className={styles.passName}>{pass.name}</span>
                        <span className={styles.passDescription}>{pass.description}</span>
                      </div>
                      <span className={styles.price}>${pass.price}</span>
                    </div>

                    <div className={styles.cardBottomRow}>
                      <span className={styles.purchasedBadge}>
                        <UsersIcon className={styles.purchasedIcon} />
                        {formatPurchasedBy(pass.purchasedBy)} purchased
                      </span>
                      {pass.tag && (
                        <span className={styles.pill}>
                          {pass.tag === 'best-value' ? 'Best value' : 'Popular'}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: lot detail panel */}
          <div className={styles.rightColumn}>
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleRow}>
                <span className={styles.detailTitle}>Lot details</span>
              </div>
              <div className={styles.lotBadge} aria-hidden>P</div>
            </div>

            <div className={styles.lotName}>{selected.lotName}</div>

            <div className={styles.detailRows}>
              <div className={styles.detailRow}>
                <WalkIcon className={styles.detailIcon} />
                <div className={styles.detailRowText}>
                  <span className={styles.detailRowLabel}>Walk to gate</span>
                  <span className={styles.detailRowValue}>{selected.walkTime}</span>
                </div>
              </div>
              <div className={styles.detailRow}>
                <ClockIcon className={styles.detailIcon} />
                <div className={styles.detailRowText}>
                  <span className={styles.detailRowLabel}>Access hours</span>
                  <span className={styles.detailRowValue}>{selected.accessHours}</span>
                </div>
              </div>
              <div className={styles.detailRow}>
                <InfoIcon className={styles.detailIcon} />
                <div className={styles.detailRowText}>
                  <span className={styles.detailRowLabel}>Entry instructions</span>
                  <span className={styles.detailRowValue}>{selected.instructions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div className={styles.footerRow}>
          <button
            type="button"
            className={styles.ghostButton}
            onClick={() => onClose?.()}
          >
            Maybe later
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!selected}
            onClick={() => onConfirm?.()}
          >
            Add parking — ${selected?.price}
          </button>
        </div>

      </div>
    </div>
  )
}

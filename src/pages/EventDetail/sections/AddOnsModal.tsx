import { useState } from 'react'
import type { VenueInfo } from '../../../data/eventDetailMock'
import styles from './AddOnsModal.module.css'

type AddOnCategory = 'access' | 'food' | 'experience'

type AddOnItem = {
  id: string
  name: string
  description: string
  price: number
  purchasedBy: number
  category: AddOnCategory
  includes: string[]
  redemptionNote: string
  validityNote: string
  tag?: 'best-value' | 'popular'
}

const ADDON_ITEMS: AddOnItem[] = [
  {
    id: 'addon-1',
    name: 'Quick Entry Pass',
    description: 'Skip the main queue. Dedicated fast-track gate.',
    price: 25,
    purchasedBy: 3240,
    category: 'access',
    includes: [
      'Dedicated fast-track entry lane',
      'Valid at any designated Quick Entry gate',
      'One use per person',
    ],
    redemptionNote: 'Show QR code at any Quick Entry gate. No printing needed.',
    validityNote: 'Valid on event day only. Non-transferable.',
    tag: 'popular',
  },
  {
    id: 'addon-2',
    name: 'VIP Lounge Access',
    description: 'Private lounge with bar, seating, and premium restrooms.',
    price: 75,
    purchasedBy: 912,
    category: 'access',
    includes: [
      'Access from doors open until 30 min before start',
      'Two complimentary drinks included',
      'Private restroom access',
      'Complimentary coat check',
    ],
    redemptionNote: 'Show QR code at the VIP Lounge entrance, Level 2.',
    validityNote: 'Valid on event day only. Non-transferable.',
    tag: 'best-value',
  },
  {
    id: 'addon-3',
    name: 'Pre-Game Meal Package',
    description: '3-course seated meal with non-alcoholic beverages.',
    price: 55,
    purchasedBy: 1480,
    category: 'food',
    includes: [
      'Starter, main course, and dessert',
      'Unlimited soft drinks and water',
      'Seated dining in the Club Restaurant',
      'Includes early venue access (2 hrs before gates)',
    ],
    redemptionNote: 'Present QR code at Club Restaurant, Gate B Level 1.',
    validityNote: 'Dining begins 2 hrs before gates open. Arrive on time.',
    tag: 'popular',
  },
  {
    id: 'addon-4',
    name: 'Premium Bar Package',
    description: 'Unlimited premium beverages at any participating bar.',
    price: 85,
    purchasedBy: 634,
    category: 'food',
    includes: [
      'Unlimited beer, wine, and spirits (select brands)',
      'Soft drinks and water included',
      'Valid at any participating bar in the venue',
      'Just show your QR — no top-ups needed',
    ],
    redemptionNote: 'Present QR code at any participating bar to be scanned.',
    validityNote: 'Valid from gates open to 30 min before event end. Responsible service of alcohol applies.',
  },
  {
    id: 'addon-5',
    name: 'Field Club Experience',
    description: 'Field-level access with premium seating and dedicated service.',
    price: 150,
    purchasedBy: 287,
    category: 'experience',
    includes: [
      'Exclusive field-level access (limited to 200 guests)',
      'Premium assigned seating near the field',
      'Dedicated server and premium menu',
      'Exclusive entry lane and lounge access',
      'Commemorative event programme',
    ],
    redemptionNote: 'Check in at the Field Club entrance, Section A. ID required.',
    validityNote: 'Limited capacity. Non-refundable. Upgrades cannot be resold.',
  },
]

function formatPurchasedBy(n: number): string {
  if (n >= 1000) {
    const v = n / 1000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}k`
  }
  return n.toLocaleString()
}

function categoryLabel(c: AddOnCategory): string {
  return c === 'access' ? 'Access' : c === 'food' ? 'Food & Drink' : 'Experience'
}

/* ── Icons ──────────────────────────────────────────────────────────── */

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function AccessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
    </svg>
  )
}

function FoodIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}

function ExperienceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

function categoryIcon(c: AddOnCategory, className?: string) {
  if (c === 'access') return <AccessIcon className={className} />
  if (c === 'food') return <FoodIcon className={className} />
  return <ExperienceIcon className={className} />
}

const categoryBadgeClass: Record<AddOnCategory, string> = {
  access: styles.badgeAccess,
  food: styles.badgeFood,
  experience: styles.badgeExperience,
}

/* ── Component ──────────────────────────────────────────────────────── */

interface AddOnsModalProps {
  venue?: VenueInfo
  onClose?: () => void
  onConfirm?: () => void
}

export function AddOnsModal({ venue, onClose, onConfirm }: AddOnsModalProps) {
  const [selectedId, setSelectedId] = useState<string>(ADDON_ITEMS[0]?.id ?? '')

  const selected = ADDON_ITEMS.find((a) => a.id === selectedId) ?? ADDON_ITEMS[0]

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="addons-modal-title"
    >
      <div className={styles.modal}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <h2 id="addons-modal-title" className={styles.title}>
              Event add-ons
            </h2>
            <p className={styles.subtitle}>
              Enhance your experience. All add-ons are valid for this event only.
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

        {/* ── Validity bar ───────────────────────────────────────────── */}
        {venue && (
          <div className={styles.validityBar}>
            <CalendarIcon className={styles.validityBarIcon} />
            <span className={styles.validityBarText}>
              <span className={styles.validityBarVenue}>{venue.name}</span>
              <span className={styles.validityBarSep} aria-hidden>·</span>
              <span className={styles.validityBarCity}>{venue.city}, {venue.state}</span>
              <span className={styles.validityBarSep} aria-hidden>·</span>
              <span className={styles.validityBarNote}>Valid on event day only · 1 person per add-on</span>
            </span>
          </div>
        )}

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* Left: add-on selector */}
          <div className={styles.leftColumn}>
            <p className={styles.leftLabel}>Available add-ons</p>
            <div className={styles.cardList}>
              {ADDON_ITEMS.map((item) => {
                const isSelected = item.id === selectedId
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`.trim()}
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={isSelected}
                    aria-label={`${item.name}, $${item.price}`}
                  >
                    <div className={styles.cardTopRow}>
                      <div className={styles.cardLeft}>
                        <span className={`${styles.categoryDot} ${categoryBadgeClass[item.category]}`} aria-hidden />
                        <div className={styles.cardInfo}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemDescription}>{item.description}</span>
                        </div>
                      </div>
                      <span className={styles.price}>${item.price}</span>
                    </div>

                    <div className={styles.cardBottomRow}>
                      <span className={styles.purchasedBadge}>
                        <UsersIcon className={styles.purchasedIcon} />
                        {formatPurchasedBy(item.purchasedBy)} purchased
                      </span>
                      {item.tag && (
                        <span className={`${styles.pill} ${styles[`pill_${item.tag.replace('-', '_')}`]}`}>
                          {item.tag === 'best-value' ? 'Best value' : 'Popular'}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: detail panel */}
          <div className={styles.rightColumn}>
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleRow}>
                <span className={styles.detailTitle}>Add-on details</span>
                <span className={styles.detailCategoryLabel}>{categoryLabel(selected.category)}</span>
              </div>
              <div className={`${styles.categoryBadge} ${categoryBadgeClass[selected.category]}`} aria-hidden>
                {categoryIcon(selected.category, styles.categoryBadgeIcon)}
              </div>
            </div>

            <div className={styles.itemNameLarge}>{selected.name}</div>

            <div className={styles.includesSection}>
              <span className={styles.includesLabel}>What's included</span>
              <ul className={styles.includesList} aria-label="What's included">
                {selected.includes.map((item, i) => (
                  <li key={i} className={styles.includesItem}>
                    <CheckIcon className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.detailRows}>
              <div className={styles.detailRow}>
                <CalendarIcon className={styles.detailIcon} />
                <div className={styles.detailRowText}>
                  <span className={styles.detailRowLabel}>How to redeem</span>
                  <span className={styles.detailRowValue}>{selected.redemptionNote}</span>
                </div>
              </div>
              <div className={styles.detailRow}>
                <InfoIcon className={styles.detailIcon} />
                <div className={styles.detailRowText}>
                  <span className={styles.detailRowLabel}>Terms</span>
                  <span className={styles.detailRowValue}>{selected.validityNote}</span>
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
            Add to order — ${selected?.price}
          </button>
        </div>

      </div>
    </div>
  )
}

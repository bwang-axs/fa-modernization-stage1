import { useState } from 'react'
import type { VenueInfo } from '../../../data/eventDetailMock'
import styles from './MerchandiseModal.module.css'

type MerchCategory = 'apparel' | 'print' | 'bundle'

type MerchItem = {
  id: string
  name: string
  description: string
  price: number
  purchasedBy: number
  category: MerchCategory
  sizes?: string[]
  detail: string
  tag?: 'best-value' | 'popular'
}

const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'merch-1',
    name: 'Tour T-Shirt',
    description: 'Classic fit with tour dates printed on the back.',
    price: 45,
    purchasedBy: 2140,
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    detail: '100% ring-spun cotton. Unisex sizing. Machine washable. Pre-shrunk.',
    tag: 'popular',
  },
  {
    id: 'merch-2',
    name: 'Tour Hoodie',
    description: 'Heavyweight pullover with embroidered chest logo.',
    price: 75,
    purchasedBy: 847,
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    detail: '80% cotton, 20% polyester. 380gsm fleece. Kangaroo pocket. Unisex fit.',
    tag: 'best-value',
  },
  {
    id: 'merch-3',
    name: 'Official Tour Poster',
    description: 'Limited edition lithograph, 18″ × 24″. Numbered print.',
    price: 35,
    purchasedBy: 1320,
    category: 'print',
    detail: 'Premium matte lithograph paper. Each poster is individually numbered. Limited to 500 per show.',
  },
  {
    id: 'merch-4',
    name: 'VIP Bundle',
    description: 'Tour tee + poster + event laminate. Limited quantity.',
    price: 120,
    purchasedBy: 312,
    category: 'bundle',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    detail: 'Includes one tour tee (sized), one numbered tour poster, and one event laminate pass. All items bagged together.',
  },
]

function formatPurchasedBy(n: number): string {
  if (n >= 1000) {
    const v = n / 1000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}k`
  }
  return n.toLocaleString()
}

function categoryLabel(c: MerchCategory): string {
  return c === 'apparel' ? 'Apparel' : c === 'print' ? 'Print' : 'Bundle'
}

/* ── Icons ──────────────────────────────────────────────────────────── */

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
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

function ApparelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  )
}

function PrintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

function BundleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function categoryIcon(c: MerchCategory, className?: string) {
  if (c === 'apparel') return <ApparelIcon className={className} />
  if (c === 'print') return <PrintIcon className={className} />
  return <BundleIcon className={className} />
}

const categoryBadgeClass: Record<MerchCategory, string> = {
  apparel: styles.badgeApparel,
  print: styles.badgePrint,
  bundle: styles.badgeBundle,
}

/* ── Component ──────────────────────────────────────────────────────── */

interface MerchandiseModalProps {
  venue?: VenueInfo
  onClose?: () => void
  onConfirm?: () => void
}

export function MerchandiseModal({ venue, onClose, onConfirm }: MerchandiseModalProps) {
  const [selectedId, setSelectedId] = useState<string>(MERCH_ITEMS[0]?.id ?? '')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const selected = MERCH_ITEMS.find((m) => m.id === selectedId) ?? MERCH_ITEMS[0]

  const handleSelectItem = (id: string) => {
    setSelectedId(id)
    setSelectedSize(null)
  }

  const needsSize = Boolean(selected?.sizes?.length)
  const canConfirm = selected && (!needsSize || selectedSize !== null)
  const ctaLabel = !selected
    ? 'Add to order'
    : needsSize && !selectedSize
      ? 'Select a size to continue'
      : `Add to order — $${selected.price}`

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="merch-modal-title"
    >
      <div className={styles.modal}>

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <h2 id="merch-modal-title" className={styles.title}>
              Official merchandise
            </h2>
            <p className={styles.subtitle}>
              Pre-order and skip the line. Collect at the merch stand on event day.
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

        {/* ── Pickup bar ─────────────────────────────────────────────── */}
        {venue && (
          <div className={styles.pickupBar}>
            <ShoppingBagIcon className={styles.pickupBarIcon} />
            <span className={styles.pickupBarText}>
              <span className={styles.pickupBarVenue}>{venue.name}</span>
              <span className={styles.pickupBarSep} aria-hidden>·</span>
              <span className={styles.pickupBarLocation}>{venue.city}, {venue.state}</span>
              <span className={styles.pickupBarSep} aria-hidden>·</span>
              <span className={styles.pickupBarNote}>Merch stand near main entrance</span>
            </span>
          </div>
        )}

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className={styles.body}>

          {/* Left: item selector */}
          <div className={styles.leftColumn}>
            <p className={styles.leftLabel}>Available items</p>
            <div className={styles.cardList}>
              {MERCH_ITEMS.map((item) => {
                const isSelected = item.id === selectedId
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`.trim()}
                    onClick={() => handleSelectItem(item.id)}
                    aria-pressed={isSelected}
                    aria-label={`${item.name}, $${item.price}`}
                  >
                    <div className={styles.cardTopRow}>
                      <div className={styles.cardInfo}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemDescription}>{item.description}</span>
                      </div>
                      <span className={styles.price}>${item.price}</span>
                    </div>

                    <div className={styles.cardBottomRow}>
                      <span className={styles.purchasedBadge}>
                        <UsersIcon className={styles.purchasedIcon} />
                        {formatPurchasedBy(item.purchasedBy)} purchased
                      </span>
                      {item.tag && (
                        <span className={styles.pill}>
                          {item.tag === 'best-value' ? 'Best value' : 'Popular'}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: item detail panel */}
          <div className={styles.rightColumn}>
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleRow}>
                <span className={styles.detailTitle}>Item details</span>
                <span className={styles.detailCategoryLabel}>{categoryLabel(selected.category)}</span>
              </div>
              <div className={`${styles.categoryBadge} ${categoryBadgeClass[selected.category]}`} aria-hidden>
                {categoryIcon(selected.category, styles.categoryBadgeIcon)}
              </div>
            </div>

            <div className={styles.itemName}>{selected.name}</div>
            <p className={styles.itemDetailDescription}>{selected.detail}</p>

            {selected.sizes && selected.sizes.length > 0 && (
              <div className={styles.sizeSection}>
                <span className={styles.sizeLabel}>
                  Size
                  {selectedSize && <span className={styles.sizeLabelSelected}> — {selectedSize}</span>}
                </span>
                <div className={styles.sizeSelector} role="group" aria-label="Select size">
                  {selected.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`${styles.sizeButton} ${selectedSize === size ? styles.sizeButtonSelected : ''}`.trim()}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.pickupDetail}>
              <ShoppingBagIcon className={styles.pickupDetailIcon} />
              <div className={styles.pickupDetailText}>
                <span className={styles.pickupDetailLabel}>Pickup</span>
                <span className={styles.pickupDetailValue}>
                  Collect at the merch stand on event day. Bring your QR code. One item per order.
                </span>
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
            disabled={!canConfirm}
            onClick={() => onConfirm?.()}
          >
            {ctaLabel}
          </button>
        </div>

      </div>
    </div>
  )
}

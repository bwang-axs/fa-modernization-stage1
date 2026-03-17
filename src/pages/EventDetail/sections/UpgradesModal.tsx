import { useMemo, useState } from 'react'
import styles from './UpgradesModal.module.css'

type UpgradeSeat = {
  id: string
  label: string
  section: string
  currentRow: number
  upgradedRow: number
  seats: number[]
  price: number
  moveRows: number
  tag?: 'best-value' | 'popular'
}

const UPGRADE_OPTIONS: UpgradeSeat[] = [
  {
    id: 'opt-1',
    label: 'Section 103 · Row 5 · Seats 1–3',
    section: '103',
    currentRow: 5,
    upgradedRow: 3,
    seats: [1, 2, 3],
    price: 50,
    moveRows: 2,
    tag: 'best-value',
  },
  {
    id: 'opt-2',
    label: 'Section 112 · Row 8 · Seats 10–12',
    section: '112',
    currentRow: 8,
    upgradedRow: 6,
    seats: [10, 11, 12],
    price: 50,
    moveRows: 2,
    tag: 'popular',
  },
  {
    id: 'opt-3',
    label: 'Section 121 · Row 10 · Seats 4–6',
    section: '121',
    currentRow: 10,
    upgradedRow: 8,
    seats: [4, 5, 6],
    price: 50,
    moveRows: 2,
  },
]

interface UpgradesModalProps {
  onClose?: () => void
  onConfirm?: () => void
}

export function UpgradesModal({ onClose, onConfirm }: UpgradesModalProps) {
  const [selectedId, setSelectedId] = useState<string>(UPGRADE_OPTIONS[0]?.id ?? '')

  const selected = useMemo(
    () => UPGRADE_OPTIONS.find((opt) => opt.id === selectedId) ?? UPGRADE_OPTIONS[0],
    [selectedId],
  )

  const rowsToDisplay = useMemo(() => {
    if (!selected) return []
    const minRow = Math.min(selected.currentRow, selected.upgradedRow) - 1
    const maxRow = Math.max(selected.currentRow, selected.upgradedRow) + 1
    return Array.from({ length: maxRow - minRow + 1 }, (_, idx) => minRow + idx)
  }, [selected])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="upgrades-modal-title">
      <div className={styles.modal}>
        <div className={styles.headerRow}>
          <div className={styles.titleGroup}>
            <h2 id="upgrades-modal-title" className={styles.title}>
              Choose an upgrade
            </h2>
            <p className={styles.subtitle}>
              Move your current seats closer to the action in just a few taps.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => onClose?.()}
          >
            <span>Close</span>
            <span className={styles.closeIcon} aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.leftColumn}>
            <p className={styles.leftLabel}>Upgrade options</p>
            <div className={styles.cardList}>
              {UPGRADE_OPTIONS.map((opt) => {
                const isSelected = opt.id === selectedId
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`.trim()}
                    onClick={() => setSelectedId(opt.id)}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.cardHeaderRow}>
                      <div>
                        <div className={styles.seatLabel}>{opt.label}</div>
                        <div className={styles.upgradeMeta}>Move up {opt.moveRows} rows</div>
                      </div>
                      <div className={styles.price}>${opt.price} to upgrade</div>
                    </div>
                    <div
                      className={`${styles.pill} ${
                        opt.tag ? styles.pillHighlight : ''
                      }`.trim()}
                    >
                      {opt.tag === 'best-value' && 'Best value'}
                      {opt.tag === 'popular' && 'Popular'}
                      {!opt.tag && 'Good view'}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.previewHeader}>
              <div>
                <div className={styles.previewTitle}>Seat preview</div>
                <div className={styles.previewMeta}>
                  Section {selected.section}, from row {selected.currentRow} to row {selected.upgradedRow}
                </div>
              </div>
              <div className={styles.legend} aria-hidden>
                <span className={styles.legendItem}>
                  <span className={`${styles.dot} ${styles.dotCurrent}`} />
                  Current seats
                </span>
                <span className={styles.legendItem}>
                  <span className={`${styles.dot} ${styles.dotUpgrade}`} />
                  Upgraded seats
                </span>
              </div>
            </div>

            <div className={styles.previewCanvas}>
              <div className={styles.fieldMetaRow}>
                <span className={styles.fieldLabel}>Lower bowl · Center sideline</span>
                <span>Zoomed in on your section</span>
              </div>
              <div className={styles.mapGrid}>
                <div className={styles.sectionLabel}>Section {selected.section}</div>
                {rowsToDisplay.map((rowNumber) => {
                  const isCurrentRow = rowNumber === selected.currentRow
                  const isUpgradeRow = rowNumber === selected.upgradedRow
                  return (
                    <div key={rowNumber} className={styles.row}>
                      <div className={styles.rowLabel}>Row {rowNumber}</div>
                      <div className={styles.rowSeats}>
                        {Array.from({ length: 16 }, (_, idx) => {
                          const seatNumber = idx + 1
                          const isTargetSeat = selected.seats.includes(seatNumber)
                          const baseClass = styles.seatDot
                          const variantClass =
                            isTargetSeat && isCurrentRow
                              ? styles.seatDotCurrent
                              : isTargetSeat && isUpgradeRow
                              ? styles.seatDotUpgrade
                              : ''
                          return (
                            <span
                              key={seatNumber}
                              className={`${baseClass} ${variantClass}`.trim()}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
                {selected.moveRows === 2 && (
                  <div className={styles.arrowRow}>
                    <div className={styles.arrowLine} />
                    <div className={styles.arrowHead} />
                    <div className={styles.arrowLabel}>+2 rows closer</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
            Upgrade seats
          </button>
        </div>
      </div>
    </div>
  )
}


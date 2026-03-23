import { useState, useEffect, useCallback } from 'react'
import { Button } from '../components/Button/Button'
import type { Listing } from '../data/listingsMock'
import styles from './ListingDetailModal.module.css'

interface TrendPoint {
  label: string
  avgPrice: number
}

const TREND_DATA: Record<string, TrendPoint[]> = {
  '1': [
    { label: 'Dec 15', avgPrice: 310 }, { label: 'Dec 22', avgPrice: 328 },
    { label: 'Jan 5',  avgPrice: 320 }, { label: 'Jan 12', avgPrice: 342 },
    { label: 'Jan 19', avgPrice: 355 }, { label: 'Jan 26', avgPrice: 365 },
    { label: 'Feb 2',  avgPrice: 372 }, { label: 'Feb 9',  avgPrice: 385 },
    { label: 'Feb 16', avgPrice: 395 }, { label: 'Feb 23', avgPrice: 408 },
    { label: 'Mar 2',  avgPrice: 415 }, { label: 'Mar 9',  avgPrice: 425 },
  ],
  '2': [
    { label: 'Nov 24', avgPrice: 140 }, { label: 'Dec 1',  avgPrice: 148 },
    { label: 'Dec 8',  avgPrice: 145 }, { label: 'Dec 15', avgPrice: 155 },
    { label: 'Dec 22', avgPrice: 162 }, { label: 'Jan 5',  avgPrice: 158 },
    { label: 'Jan 12', avgPrice: 168 }, { label: 'Jan 19', avgPrice: 175 },
    { label: 'Jan 26', avgPrice: 178 }, { label: 'Feb 2',  avgPrice: 182 },
    { label: 'Feb 9',  avgPrice: 188 }, { label: 'Feb 14', avgPrice: 192 },
  ],
  '3': [
    { label: 'Dec 15', avgPrice: 485 }, { label: 'Dec 22', avgPrice: 498 },
    { label: 'Jan 5',  avgPrice: 492 }, { label: 'Jan 12', avgPrice: 515 },
    { label: 'Jan 19', avgPrice: 528 }, { label: 'Jan 26', avgPrice: 540 },
    { label: 'Feb 2',  avgPrice: 548 }, { label: 'Feb 9',  avgPrice: 562 },
    { label: 'Feb 16', avgPrice: 575 }, { label: 'Feb 23', avgPrice: 588 },
    { label: 'Mar 2',  avgPrice: 598 }, { label: 'Mar 9',  avgPrice: 608 },
  ],
  '4': [
    { label: 'Nov 10', avgPrice: 520 }, { label: 'Nov 17', avgPrice: 535 },
    { label: 'Nov 24', avgPrice: 545 }, { label: 'Dec 1',  avgPrice: 558 },
    { label: 'Dec 8',  avgPrice: 562 }, { label: 'Dec 15', avgPrice: 575 },
    { label: 'Dec 22', avgPrice: 588 }, { label: 'Jan 5',  avgPrice: 598 },
    { label: 'Jan 12', avgPrice: 608 }, { label: 'Jan 19', avgPrice: 615 },
    { label: 'Jan 26', avgPrice: 622 }, { label: 'Jan 28', avgPrice: 628 },
  ],
  '5': [
    { label: 'Jan 13', avgPrice: 195 }, { label: 'Jan 20', avgPrice: 208 },
    { label: 'Jan 27', avgPrice: 215 }, { label: 'Feb 3',  avgPrice: 222 },
    { label: 'Feb 10', avgPrice: 228 }, { label: 'Feb 17', avgPrice: 235 },
    { label: 'Feb 24', avgPrice: 242 }, { label: 'Mar 1',  avgPrice: 252 },
    { label: 'Mar 3',  avgPrice: 258 }, { label: 'Mar 4',  avgPrice: 263 },
    { label: 'Mar 4',  avgPrice: 268 }, { label: 'Mar 5',  avgPrice: 272 },
  ],
  '6': [
    { label: 'Oct 14', avgPrice: 125 }, { label: 'Oct 21', avgPrice: 132 },
    { label: 'Oct 28', avgPrice: 128 }, { label: 'Nov 4',  avgPrice: 138 },
    { label: 'Nov 11', avgPrice: 145 }, { label: 'Nov 18', avgPrice: 148 },
    { label: 'Nov 25', avgPrice: 152 }, { label: 'Dec 1',  avgPrice: 158 },
    { label: 'Dec 5',  avgPrice: 162 }, { label: 'Dec 8',  avgPrice: 165 },
    { label: 'Dec 10', avgPrice: 168 }, { label: 'Dec 12', avgPrice: 172 },
  ],
  '7': [
    { label: 'Dec 15', avgPrice: 820 }, { label: 'Dec 22', avgPrice: 838 },
    { label: 'Jan 5',  avgPrice: 830 }, { label: 'Jan 12', avgPrice: 855 },
    { label: 'Jan 19', avgPrice: 872 }, { label: 'Jan 26', avgPrice: 890 },
    { label: 'Feb 2',  avgPrice: 910 }, { label: 'Feb 9',  avgPrice: 928 },
    { label: 'Feb 16', avgPrice: 945 }, { label: 'Feb 23', avgPrice: 965 },
    { label: 'Mar 2',  avgPrice: 985 }, { label: 'Mar 9',  avgPrice: 1002 },
  ],
}

const DEFAULT_TREND: TrendPoint[] = [
  { label: 'Dec 15', avgPrice: 80 },  { label: 'Dec 22', avgPrice: 85 },
  { label: 'Jan 5',  avgPrice: 82 },  { label: 'Jan 12', avgPrice: 88 },
  { label: 'Jan 19', avgPrice: 92 },  { label: 'Jan 26', avgPrice: 96 },
  { label: 'Feb 2',  avgPrice: 98 },  { label: 'Feb 9',  avgPrice: 102 },
  { label: 'Feb 16', avgPrice: 105 }, { label: 'Feb 23', avgPrice: 108 },
  { label: 'Mar 2',  avgPrice: 112 }, { label: 'Mar 9',  avgPrice: 115 },
]

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// ── Inline SVG chart ────────────────────────────────────────────────────────

function PriceTrendChart({
  points,
  listedPrice,
  gradId,
}: {
  points: TrendPoint[]
  listedPrice: number
  gradId: string
}) {
  const W = 560
  const H = 200
  const padT = 20, padR = 20, padB = 40, padL = 60
  const cW = W - padL - padR
  const cH = H - padT - padB

  const prices = points.map((p) => p.avgPrice)
  const allPrices = [...prices, listedPrice]
  const rawMin = Math.min(...allPrices)
  const rawMax = Math.max(...allPrices)
  const pad = (rawMax - rawMin) * 0.18 || 20
  const minP = rawMin - pad
  const maxP = rawMax + pad
  const range = maxP - minP

  const x = (i: number) => padL + (i / (points.length - 1)) * cW
  const y = (p: number) => padT + cH - ((p - minP) / range) * cH

  const areaD = [
    `M${x(0)},${padT + cH}`,
    ...points.map((pt, i) => `L${x(i)},${y(pt.avgPrice)}`),
    `L${x(points.length - 1)},${padT + cH}`,
    'Z',
  ].join(' ')

  const lineD = points
    .map((pt, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(pt.avgPrice)}`)
    .join(' ')

  const listedY = y(listedPrice)
  const marketPrice = points[points.length - 1].avgPrice
  const isAbove = listedPrice > marketPrice
  const isMatched = listedPrice === marketPrice
  const lineColor = isMatched
    ? 'var(--color-success)'
    : isAbove
    ? 'var(--color-error)'
    : 'var(--color-success)'

  const gridPrices = Array.from({ length: 5 }, (_, i) => minP + (range / 4) * i)

  // Keep "Your listing" label from clipping top edge
  const labelY = listedY < padT + 16 ? listedY + 14 : listedY - 5

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0059D6" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#0059D6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridPrices.map((p, i) => (
        <g key={i}>
          <line
            x1={padL} y1={y(p)} x2={W - padR} y2={y(p)}
            stroke="rgba(17,24,39,0.06)" strokeWidth="1"
          />
          <text
            x={padL - 7} y={y(p) + 4}
            textAnchor="end" fontSize="11" fill="#9ca3af" fontFamily="inherit"
          >
            ${Math.round(p)}
          </text>
        </g>
      ))}

      {points.map((pt, i) => {
        if (i % 2 !== 0 && i !== points.length - 1) return null
        return (
          <text
            key={i} x={x(i)} y={H - 8}
            textAnchor="middle" fontSize="11" fill="#9ca3af" fontFamily="inherit"
          >
            {pt.label}
          </text>
        )
      })}

      <path d={areaD} fill={`url(#${gradId})`} />

      <path
        d={lineD} fill="none"
        stroke="var(--color-primary)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
      />

      {points.map((pt, i) => (
        <circle
          key={i} cx={x(i)} cy={y(pt.avgPrice)}
          r={3.5} fill="white" stroke="var(--color-primary)" strokeWidth="2"
        />
      ))}

      <circle
        cx={x(points.length - 1)} cy={y(marketPrice)}
        r={6} fill="var(--color-primary)" stroke="white" strokeWidth="2.5"
      />

      <line
        x1={padL} y1={listedY} x2={W - padR} y2={listedY}
        stroke={lineColor} strokeWidth="1.5" strokeDasharray="5,4"
      />
      <text
        x={W - padR} y={labelY}
        textAnchor="end" fontSize="10" fontWeight="600"
        fill={lineColor} fontFamily="inherit"
      >
        Your listing
      </text>
    </svg>
  )
}

// ── Modal ───────────────────────────────────────────────────────────────────

interface Props {
  listing: Listing
  onClose: () => void
}

export function ListingDetailModal({ listing, onClose }: Props) {
  const trendPoints = TREND_DATA[listing.id] ?? DEFAULT_TREND
  const marketPrice = trendPoints[trendPoints.length - 1].avgPrice

  const [displayPrice, setDisplayPrice] = useState(listing.priceValue)
  const [isMatched, setIsMatched] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState(String(listing.priceValue))

  useEffect(() => {
    setDisplayPrice(listing.priceValue)
    setIsMatched(false)
    setEditMode(false)
    setEditValue(String(listing.priceValue))
  }, [listing.id, listing.priceValue])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleMatchMarket = useCallback(() => {
    setDisplayPrice(marketPrice)
    setIsMatched(true)
    setEditValue(String(marketPrice))
    setEditMode(false)
  }, [marketPrice])

  const handleEditSave = useCallback(() => {
    const parsed = parseFloat(editValue.replace(/[^0-9.]/g, ''))
    if (!isNaN(parsed) && parsed > 0) {
      setDisplayPrice(Math.round(parsed))
      setIsMatched(Math.round(parsed) === marketPrice)
    }
    setEditMode(false)
  }, [editValue, marketPrice])

  const isListed = listing.status === 'listed'
  const delta = displayPrice - marketPrice
  const deltaPct = marketPrice > 0 ? (delta / marketPrice) * 100 : 0
  const trendPct =
    trendPoints.length >= 2
      ? ((trendPoints[trendPoints.length - 1].avgPrice - trendPoints[0].avgPrice) /
          trendPoints[0].avgPrice) *
        100
      : 0
  const priceIsMatched = isMatched && displayPrice === marketPrice

  const gradId = `trendGrad-${listing.id}`

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ldm-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.headerText}>
            <h2 id="ldm-title" className={styles.headerTitle}>
              {listing.eventName}
            </h2>
            <span className={styles.headerSub}>
              {listing.ticketCount} ticket{listing.ticketCount !== 1 ? 's' : ''}&nbsp;&middot;&nbsp;
              <span className={isListed ? styles.statusListed : styles.statusSold}>
                {isListed ? 'Listed' : 'Sold'}
              </span>
            </span>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Left — chart */}
          <div className={styles.chartCol}>
            <div className={styles.chartHeader}>
              <div>
                <span className={styles.chartTitle}>Avg resale price</span>
                <span className={styles.chartPeriod}>&nbsp;· Last 12 weeks</span>
              </div>
              <span className={trendPct >= 0 ? styles.trendUp : styles.trendDown}>
                {trendPct >= 0 ? '↑' : '↓'}&nbsp;{Math.abs(trendPct).toFixed(1)}% this period
              </span>
            </div>

            <PriceTrendChart
              points={trendPoints}
              listedPrice={displayPrice}
              gradId={gradId}
            />

            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} />
                Market avg
              </span>
              <span className={styles.legendItem}>
                <span
                  className={styles.legendDash}
                  style={{
                    borderColor: priceIsMatched
                      ? 'var(--color-success)'
                      : delta > 0
                      ? 'var(--color-error)'
                      : 'var(--color-success)',
                  }}
                />
                Your listing
              </span>
            </div>
          </div>

          {/* Right — details + actions */}
          <div className={styles.detailCol}>
            <div className={styles.seatGrid}>
              {(
                [
                  ['Section', listing.section ?? '—'],
                  ['Row',     listing.row   ?? '—'],
                  ['Seats',   listing.seats ?? '—'],
                ] as [string, string][]
              ).map(([key, val]) => (
                <div key={key} className={styles.seatCell}>
                  <span className={styles.seatKey}>{key}</span>
                  <span className={styles.seatVal}>{val}</span>
                </div>
              ))}
            </div>

            {listing.eventDate && (
              <div className={styles.metaRow}>
                <span className={styles.metaKey}>Date</span>
                <span className={styles.metaVal}>{listing.eventDate}</span>
              </div>
            )}

            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>
                {isListed ? 'Listed price' : 'Sold price'}
              </span>
              {editMode ? (
                <div className={styles.editRow}>
                  <span className={styles.editCurrency}>$</span>
                  <input
                    type="number"
                    className={styles.editInput}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                    min={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleEditSave()
                      if (e.key === 'Escape') setEditMode(false)
                    }}
                  />
                  <button
                    type="button"
                    className={styles.editSave}
                    onClick={handleEditSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className={styles.editCancel}
                    onClick={() => setEditMode(false)}
                    aria-label="Cancel edit"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span className={styles.priceValue}>{fmt(displayPrice)}</span>
              )}
            </div>

            {isListed && !editMode && (
              <Button
                variant="secondary"
                className={styles.editListingBtn}
                onClick={() => setEditMode(true)}
              >
                Edit listing
              </Button>
            )}

            {isListed && (
              <div className={styles.marketSection}>
                <div className={styles.marketHeader}>
                  <span className={styles.marketLabel}>Market average</span>
                  <span className={styles.marketPrice}>{fmt(marketPrice)}</span>
                </div>

                <div className={styles.deltaRow}>
                  {priceIsMatched ? (
                    <span className={styles.deltaMatched}>✓ Matched to market</span>
                  ) : (
                    <span className={deltaPct > 0 ? styles.deltaAbove : styles.deltaBelow}>
                      {deltaPct > 0 ? '+' : ''}{deltaPct.toFixed(1)}%&nbsp;
                      {deltaPct > 0 ? 'above' : 'below'} market
                    </span>
                  )}
                </div>

                <p className={styles.marketNote}>
                  Based on recent resales for this event
                </p>

                <Button
                  className={styles.matchBtn}
                  disabled={priceIsMatched}
                  onClick={handleMatchMarket}
                >
                  {priceIsMatched
                    ? '✓ Matched to market'
                    : `Match market price — ${fmt(marketPrice)}`}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

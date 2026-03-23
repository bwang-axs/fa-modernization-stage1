import { useMemo, useState } from 'react'
import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'
import { listings, type Listing } from '../data/listingsMock'
import { ListingDetailModal } from './ListingDetailModal'
import ticketStyles from './TicketsPage.module.css'
import listingStyles from './ListingsPage.module.css'
import v2Styles from './ListingsV2Page.module.css'

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function ChartBarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <polyline points="7 14 11 10 15 14 19 6" />
    </svg>
  )
}

function ListingCard({
  listing,
  onOpenDetails,
}: {
  listing: Listing
  onOpenDetails: () => void
}) {
  return (
    <Card className={listingStyles.listingCard}>
      <div className={listingStyles.listingMain}>
        <h2 className={listingStyles.listingEvent}>{listing.eventName}</h2>
        <div className={listingStyles.listingMeta}>
          <span className={listingStyles.ticketCount}>
            {listing.ticketCount} ticket{listing.ticketCount !== 1 ? 's' : ''}
          </span>
          <span
            className={
              listing.status === 'listed' ? listingStyles.statusListed : listingStyles.statusSold
            }
          >
            {listing.status === 'listed' ? 'Listed' : 'Sold'}
          </span>
        </div>
      </div>
      <div className={v2Styles.cardActions}>
        <div className={listingStyles.listingPrice}>{listing.price}</div>
        <button
          type="button"
          className={v2Styles.chartBtn}
          aria-label={`View price trend for ${listing.eventName}`}
          onClick={onOpenDetails}
        >
          <ChartBarIcon />
        </button>
      </div>
    </Card>
  )
}

export function ListingsV2Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)

  const filteredListings = useMemo(
    () =>
      listings.filter((listing) =>
        listing.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  )

  const hasListings = filteredListings.length > 0

  const activeCount = useMemo(
    () => listings.filter((l) => l.status === 'listed').length,
    [],
  )
  const soldTickets = useMemo(
    () => listings.filter((l) => l.status === 'sold').reduce((sum, l) => sum + l.ticketCount, 0),
    [],
  )
  const totalEarned = useMemo(
    () => listings.filter((l) => l.status === 'sold').reduce((sum, l) => sum + l.priceValue, 0),
    [],
  )

  return (
    <>
      <h1 className={listingStyles.pageTitle}>Listings</h1>
      <p className={listingStyles.pageIntro}>
        Manage your ticket listings. List tickets to sell or track sold listings.
      </p>

      <div className={v2Styles.statsRow} role="region" aria-label="Listing stats">
        <div className={v2Styles.statBlock}>
          <div className={v2Styles.statHeader}>
            <TicketIcon className={v2Styles.statIcon} />
            <span className={v2Styles.statLabel}>Active listings</span>
          </div>
          <span className={v2Styles.statValue}>{activeCount}</span>
          <span className={v2Styles.statSub}>Currently listed for sale</span>
        </div>

        <div className={v2Styles.statBlock}>
          <div className={v2Styles.statHeader}>
            <CheckCircleIcon className={v2Styles.statIcon} />
            <span className={v2Styles.statLabel}>Tickets sold</span>
          </div>
          <span className={v2Styles.statValue}>{soldTickets}</span>
          <span className={v2Styles.statSub}>Year to date · 2026</span>
        </div>

        <div className={v2Styles.statBlock}>
          <div className={v2Styles.statHeader}>
            <TrendingUpIcon className={v2Styles.statIcon} />
            <span className={v2Styles.statLabel}>Total earned</span>
          </div>
          <span className={v2Styles.statValue}>{formatCurrency(totalEarned)}</span>
          <span className={v2Styles.statSub}>Year to date · 2026</span>
        </div>
      </div>
      <div className={ticketStyles.searchBarRow}>
        <div className={ticketStyles.searchBarActions}>
          <Button variant="secondary">Sell</Button>
        </div>
        <div className={ticketStyles.searchBarWrap}>
          <input
            type="search"
            className={ticketStyles.searchBarInput}
            placeholder="Search"
            aria-label="Search listings"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className={ticketStyles.searchBarIcon} />
        </div>
      </div>
      {hasListings ? (
        <ul className={listingStyles.listingList} aria-label="Your listings">
          {filteredListings.map((listing) => (
            <li key={listing.id}>
              <ListingCard
                listing={listing}
                onOpenDetails={() => setSelectedListing(listing)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Card className={listingStyles.emptyCard}>
          <p className={listingStyles.emptyText}>
            No listings match your search.
          </p>
        </Card>
      )}

      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </>
  )
}


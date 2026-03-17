import { useMemo, useState } from 'react'
import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'
import { listings, type Listing } from '../data/listingsMock'
import ticketStyles from './TicketsPage.module.css'
import listingStyles from './ListingsPage.module.css'

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function ListingCard({ listing }: { listing: Listing }) {
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
      <div className={listingStyles.listingPrice}>{listing.price}</div>
    </Card>
  )
}

export function ListingsV2Page() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredListings = useMemo(
    () =>
      listings.filter((listing) =>
        listing.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  )

  const hasListings = filteredListings.length > 0

  return (
    <>
      <h1 className={listingStyles.pageTitle}>Listings</h1>
      <p className={listingStyles.pageIntro}>
        Manage your ticket listings. List tickets to sell or track sold listings.
      </p>
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
              <ListingCard listing={listing} />
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
    </>
  )
}


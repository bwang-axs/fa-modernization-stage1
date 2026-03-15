import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'
import { listings, type Listing } from '../data/listingsMock'
import styles from './ListingsPage.module.css'

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card className={styles.listingCard}>
      <div className={styles.listingMain}>
        <h2 className={styles.listingEvent}>{listing.eventName}</h2>
        <div className={styles.listingMeta}>
          <span className={styles.ticketCount}>
            {listing.ticketCount} ticket{listing.ticketCount !== 1 ? 's' : ''}
          </span>
          <span
            className={
              listing.status === 'listed' ? styles.statusListed : styles.statusSold
            }
          >
            {listing.status === 'listed' ? 'Listed' : 'Sold'}
          </span>
        </div>
      </div>
      <div className={styles.listingPrice}>{listing.price}</div>
    </Card>
  )
}

export function ListingsPage() {
  const hasListings = listings.length > 0

  return (
    <>
      <h1 className={styles.pageTitle}>Listings</h1>
      <p className={styles.pageIntro}>
        Manage your ticket listings. List tickets to sell or track sold listings.
      </p>

      {hasListings ? (
        <ul className={styles.listingList} aria-label="Your listings">
          {listings.map((listing) => (
            <li key={listing.id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      ) : (
        <Card className={styles.emptyCard}>
          <p className={styles.emptyText}>
            You have no active listings. List tickets to sell.
          </p>
          <Button variant="primary" className={styles.emptyButton}>
            Create listing
          </Button>
        </Card>
      )}
    </>
  )
}

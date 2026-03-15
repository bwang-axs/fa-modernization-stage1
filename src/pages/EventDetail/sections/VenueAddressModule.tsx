import type { VenueInfo } from '../../../data/eventDetailMock'
import styles from './VenueAddressModule.module.css'

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

interface VenueAddressModuleProps {
  venue: VenueInfo
}

export function VenueAddressModule({ venue }: VenueAddressModuleProps) {
  return (
    <section className={styles.section} aria-labelledby="venue-heading">
      <div className={styles.card}>
        <h2 id="venue-heading" className={styles.heading}>
          <MapPinIcon className={styles.headingIcon} aria-hidden />
          Location
        </h2>
        <address className={styles.address}>
          <div className={styles.venueRow}>
            <span className={styles.venueName}>{venue.name}</span>
            {venue.mapUrl && (
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                View on Map
              </a>
            )}
          </div>
          <span className={styles.street}>{venue.address}</span>
          <span className={styles.cityState}>
            {venue.city}, {venue.state} {venue.zip}
          </span>
        </address>
      </div>
    </section>
  )
}

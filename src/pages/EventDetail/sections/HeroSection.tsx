import { Link } from 'react-router-dom'
import type { EventWithTickets } from '../../../data/ticketsMock'
import styles from './HeroSection.module.css'

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

interface HeroSectionProps {
  event: EventWithTickets
}

export function HeroSection({ event }: HeroSectionProps) {
  const [datePart, timePart] = event.date.split(' · ')
  const venueParts = event.venue.split(' — ')
  const venueName = venueParts[0] ?? event.venue
  const location = venueParts.slice(1).join(' — ') || ''

  return (
    <section className={styles.hero} aria-labelledby="event-title">
      <Link to=".." relative="path" className={styles.backBtn} aria-label="Back to tickets">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Link>

      <div className={styles.heroContent}>
        <div className={styles.imageWrap}>
          <img src={event.imageUrl} alt="" className={styles.image} />
          <div className={styles.imageOverlay} aria-hidden />
        </div>
        <div className={styles.info}>
          <h1 id="event-title" className={styles.title}>{event.title}</h1>
          <dl className={styles.metaList}>
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>
                <CalendarIcon className={styles.metaIcon} aria-hidden />
                Date
              </dt>
              <dd className={styles.metaValue}>{datePart}</dd>
            </div>
            {timePart && (
              <div className={styles.metaItem}>
                <dt className={styles.metaLabel}>
                  <ClockIcon className={styles.metaIcon} aria-hidden />
                  Time
                </dt>
                <dd className={styles.metaValue}>{timePart}</dd>
              </div>
            )}
            <div className={styles.metaItem}>
              <dt className={styles.metaLabel}>
                <PinIcon className={styles.metaIcon} aria-hidden />
                Venue
              </dt>
              <dd className={styles.metaValue}>
                <span className={styles.venueName}>{venueName}</span>
                {location && <span className={styles.location}>{location}</span>}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

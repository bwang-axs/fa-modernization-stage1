import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useVariant } from '../context/VariantContext'
import { Card } from '../components/Card/Card'
import { upcomingEvents, pastEvents, type EventWithTickets, type Ticket } from '../data/ticketsMock'
import buttonStyles from '../components/Button/Button.module.css'
import styles from './TicketsPage.module.css'

const TICKET_STATUS_TABS = [
  'Upcoming',
  'Past',
  'Listed',
  'Sold',
  'Transfer Pending',
  'Transferred',
  'Cancelled',
  'Returned',
] as const

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function BrandCompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 8v4l4 4-4 4-4-4 4-4" />
      <path d="M16 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" />
    </svg>
  )
}

function TicketSubcard({ ticket }: { ticket: Ticket }) {
  return (
    <div className={styles.ticketSubcard}>
      <span className={styles.ticketDetail}>{ticket.section}</span>
      <span className={styles.ticketDetail}>{ticket.row}</span>
      <span className={styles.ticketDetail}>{ticket.seat}</span>
    </div>
  )
}

function EventCard({ event }: { event: EventWithTickets }) {
  return (
    <Card className={styles.eventCard}>
      <div className={styles.eventCardTop}>
        <div className={styles.eventImageWrap}>
          <img
            src={event.imageUrl}
            alt=""
            className={styles.eventImage}
          />
        </div>
        <div className={styles.eventInfo}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.eventMeta}>{event.date}</p>
          <p className={styles.eventVenue}>{event.venue}</p>
        </div>
      </div>
      <div className={styles.eventCardBottom}>
        <div className={styles.ticketList}>
          {event.tickets.map((ticket) => (
            <TicketSubcard key={ticket.id} ticket={ticket} />
          ))}
        </div>
        <Link
          to={event.id}
          className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.viewTicketsBtn}`}
        >
          View details
        </Link>
      </div>
    </Card>
  )
}

/** Event card variant "old": split layout with dark branding left, event info right, ticket count badge */
function EventCardOld({ event }: { event: EventWithTickets }) {
  const count = event.tickets.length
  const [datePart, timePart] = event.date.includes(' · ') ? event.date.split(' · ') : [event.date, '']
  return (
    <article className={styles.eventCardOld}>
      <div className={styles.eventCardOldBrand} aria-hidden>
        <BrandCompassIcon className={styles.eventCardOldBrandIcon} />
        <p className={styles.eventCardOldBrandName}>crypto.com ARENA</p>
        <p className={styles.eventCardOldBrandTier}>PREMIUM</p>
      </div>
      <Link to={event.id} className={styles.eventCardOldLink}>
        <div className={styles.eventCardOldBody}>
          <div className={styles.eventCardOldBodyRow}>
            <div className={styles.eventCardOldBodyLeft}>
              <p className={styles.eventCardOldDate}>
                {datePart}
                {timePart && <span className={styles.eventCardOldDateTime}> – {timePart}</span>}
              </p>
              <h2 className={styles.eventCardOldTitle}>{event.title}</h2>
              <p className={styles.eventCardOldVenue}>{event.venue}</p>
            </div>
            <div className={styles.eventCardOldRight}>
              <span className={styles.eventCardOldTicketBadge}>{count}</span>
              <ChevronDownIcon className={styles.eventCardOldChevron} aria-hidden />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

function TimelineSection({
  events,
  sortOrder,
  cardVariant = 'default',
}: {
  events: EventWithTickets[]
  sortOrder: 'asc' | 'desc'
  cardVariant?: 'default' | 'old'
}) {
  const sorted = useMemo(() => {
    const list = [...events]
    list.sort((a, b) => {
      const d = new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime()
      return sortOrder === 'asc' ? d : -d
    })
    return list
  }, [events, sortOrder])

  const isOldCard = cardVariant === 'old'

  return (
    <div className={isOldCard ? styles.eventList : styles.timeline}>
      {!isOldCard && <div className={styles.timelineTrack} aria-hidden />}
      <ul className={isOldCard ? styles.eventListOld : styles.timelineList}>
        {sorted.map((event) => (
          <li key={event.id} className={isOldCard ? styles.eventListItemOld : styles.timelineItem}>
            {!isOldCard && <span className={styles.timelineDot} aria-hidden />}
            <div className={isOldCard ? styles.eventCardWrapOld : styles.timelineCardWrap}>
              {isOldCard ? (
                <EventCardOld event={event} />
              ) : (
                <EventCard event={event} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TicketsPage() {
  const variant = useVariant()
  const isCurrentVariant = variant === 'current'
  const [activeTicketTab, setActiveTicketTab] = useState<string>(TICKET_STATUS_TABS[0])
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      {isCurrentVariant && (
        <>
          <h1 className={styles.pageTitle} id="your-tickets-heading">
            Your Tickets
          </h1>
          <nav className={styles.ticketTabs} aria-label="Ticket status">
            <ul className={styles.ticketTabsList}>
              {TICKET_STATUS_TABS.map((tab) => (
                <li key={tab}>
                  <button
                    type="button"
                    className={`${styles.ticketTab} ${activeTicketTab === tab ? styles.active : ''}`.trim()}
                    onClick={() => setActiveTicketTab(tab)}
                    aria-current={activeTicketTab === tab ? 'page' : undefined}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.searchBarWrap}>
            <input
              type="search"
              className={styles.searchBarInput}
              placeholder="Search"
              aria-label="Search tickets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon className={styles.searchBarIcon} />
          </div>
          {activeTicketTab === 'Upcoming' && (
            <section className={styles.section} aria-labelledby="upcoming-tickets-heading">
              <div className={styles.sectionSubtitleRow}>
                <h2 id="upcoming-tickets-heading" className={styles.sectionSubtitleTitle}>
                  Upcoming Tickets
                </h2>
                <span className={styles.sectionSubtitleMeta}>
                  Viewing {upcomingEvents.length} of {upcomingEvents.length} Events
                </span>
              </div>
              <TimelineSection events={upcomingEvents} sortOrder="asc" cardVariant="old" />
            </section>
          )}
        </>
      )}
      {!isCurrentVariant && (
        <>
          <section className={styles.section} aria-labelledby="upcoming-heading">
            <h1 id="upcoming-heading" className={styles.sectionTitle}>
              Upcoming events
            </h1>
            <TimelineSection events={upcomingEvents} sortOrder="asc" />
          </section>
          <section className={styles.section} aria-labelledby="past-heading">
            <h2 id="past-heading" className={styles.sectionTitle}>
              Past events
            </h2>
            <p className={styles.sectionIntro}>
              Most recent first. Scroll to see more.
            </p>
            <TimelineSection events={pastEvents} sortOrder="desc" />
          </section>
        </>
      )}
    </>
  )
}

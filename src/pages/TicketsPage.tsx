import { useMemo } from 'react'
import { Card } from '../components/Card/Card'
import { Button } from '../components/Button/Button'
import { upcomingEvents, pastEvents, type EventWithTickets, type Ticket } from '../data/ticketsMock'
import styles from './TicketsPage.module.css'

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
        <Button variant="secondary" className={styles.viewTicketsBtn}>
          View details
        </Button>
      </div>
    </Card>
  )
}

function TimelineSection({
  events,
  sortOrder,
}: {
  events: EventWithTickets[]
  sortOrder: 'asc' | 'desc'
}) {
  const sorted = useMemo(() => {
    const list = [...events]
    list.sort((a, b) => {
      const d = new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime()
      return sortOrder === 'asc' ? d : -d
    })
    return list
  }, [events, sortOrder])

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineTrack} aria-hidden />
      <ul className={styles.timelineList}>
        {sorted.map((event) => (
          <li key={event.id} className={styles.timelineItem}>
            <span className={styles.timelineDot} aria-hidden />
            <div className={styles.timelineCardWrap}>
              <EventCard event={event} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TicketsPage() {
  return (
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
  )
}

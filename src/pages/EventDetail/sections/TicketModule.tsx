import type { EventWithTickets, Ticket } from '../../../data/ticketsMock'
import styles from './TicketModule.module.css'

interface TicketModuleProps {
  event: EventWithTickets
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <div className={styles.ticketRow}>
      <span className={styles.seatDetail}>{ticket.section}</span>
      <span className={styles.seatDetail}>{ticket.row}</span>
      <span className={styles.seatDetail}>{ticket.seat}</span>
    </div>
  )
}

export function TicketModule({ event }: TicketModuleProps) {
  const quantity = event.tickets.length
  const ticketType = 'Standard admission'

  return (
    <section className={styles.section} aria-labelledby="ticket-heading">
      <div className={styles.card}>
        <h2 id="ticket-heading" className={styles.heading}>
          Your tickets
        </h2>
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryValue}>{ticketType} × {quantity}</span>
          </div>
        </div>
        <div className={styles.seatBlock}>
          <span className={styles.seatBlockLabel}>Section / Row / Seat</span>
          {event.tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn}>
            Transfer tickets
          </button>
          <button type="button" className={styles.secondaryBtn}>
            Sell tickets
          </button>
        </div>
      </div>
    </section>
  )
}

import { Link, useLocation } from 'react-router-dom'
import type { RecommendedEvent } from '../../../data/eventDetailMock'
import styles from './YouMightAlsoLikeSection.module.css'

interface YouMightAlsoLikeSectionProps {
  events: RecommendedEvent[]
}

export function YouMightAlsoLikeSection({ events }: YouMightAlsoLikeSectionProps) {
  const location = useLocation()
  const path = location.pathname
  const base = path.startsWith('/future')
    ? '/future'
    : path.startsWith('/new')
      ? '/new'
      : path.startsWith('/currentV2')
        ? '/currentV2'
        : '/current'
  const eventsPath = base === '/currentV2' ? 'events' : 'tickets'

  return (
    <section className={styles.section} aria-labelledby="recommendations-heading">
      <h2 id="recommendations-heading" className={styles.heading}>
        You might also like
      </h2>
      <div
        className={styles.carousel}
        role="list"
        aria-label="Recommended events"
      >
        {events.map((event) => (
          <Link
            key={event.id}
            to={`${base}/${eventsPath}/${event.id}`}
            className={styles.card}
            role="listitem"
          >
            <div className={styles.imageWrap}>
              <img src={event.imageUrl} alt="" className={styles.image} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.meta}>{event.date}</p>
              <p className={styles.venue}>{event.venue}</p>
              <span className={styles.cta}>View event</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

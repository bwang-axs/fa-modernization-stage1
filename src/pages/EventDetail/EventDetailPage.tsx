import { useParams, Navigate } from 'react-router-dom'
import { getEventById } from '../../data/ticketsMock'
import { getEventDetailData, getRecommendedEvents } from '../../data/eventDetailMock'
import { HeroSection } from './sections/HeroSection'
import { VenueAddressModule } from './sections/VenueAddressModule'
import { TicketModule } from './sections/TicketModule'
import { SeatUpgradeCarousel } from './sections/SeatUpgradeCarousel'
import { EventInformationSection } from './sections/EventInformationSection'
import { AddOnsCarousel } from './sections/AddOnsCarousel'
import { YouMightAlsoLikeSection } from './sections/YouMightAlsoLikeSection'
import { EventDetailFooter } from './sections/EventDetailFooter'
import styles from './EventDetailPage.module.css'

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const event = eventId ? getEventById(eventId) : undefined
  const detailData = eventId ? getEventDetailData(eventId) : null
  const recommended = eventId ? getRecommendedEvents(eventId, event) : []

  if (!event) {
    return <Navigate to=".." replace />
  }

  if (!detailData) {
    return <Navigate to=".." replace />
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <HeroSection event={event} />
        <VenueAddressModule venue={detailData.venue} />
        <TicketModule event={event} />
        <SeatUpgradeCarousel upgrades={detailData.seatUpgrades} />
        <EventInformationSection items={detailData.eventInfo} />
        <AddOnsCarousel addOns={detailData.addOns} />
        <YouMightAlsoLikeSection events={recommended} />
      </div>
      <EventDetailFooter />
    </div>
  )
}

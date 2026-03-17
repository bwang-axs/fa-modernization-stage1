import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useVariant } from '../../context/VariantContext'
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
import { UpgradesModal } from './sections/UpgradesModal'
import styles from './EventDetailPage.module.css'

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const variant = useVariant()
  const navigate = useNavigate()
  const event = eventId ? getEventById(eventId) : undefined
  const detailData = eventId ? getEventDetailData(eventId) : null
  const recommended = eventId ? getRecommendedEvents(eventId, event) : []

  if (!event) {
    return <Navigate to=".." replace />
  }

  if (!detailData) {
    return <Navigate to=".." replace />
  }

  const isCurrentShell = variant === 'current' || variant === 'currentV2'
  const containerClass = isCurrentShell ? `${styles.container} ${styles.containerTopAligned}` : styles.container
  const showUpgradesModal = isCurrentShell

  const handleDismissUpgrades = () => {
    if (variant === 'currentV2') {
      navigate('/currentV2/events')
      return
    }
    const targetVariant = isCurrentShell ? variant : 'current'
    navigate(`/${targetVariant}/tickets`)
  }

  return (
    <div className={styles.page}>
      <div className={containerClass}>
        <HeroSection event={event} />
        <VenueAddressModule venue={detailData.venue} />
        <TicketModule event={event} />
        <SeatUpgradeCarousel upgrades={detailData.seatUpgrades} />
        <EventInformationSection items={detailData.eventInfo} />
        <AddOnsCarousel addOns={detailData.addOns} />
        <YouMightAlsoLikeSection events={recommended} />
      </div>
      <EventDetailFooter />
      {showUpgradesModal && (
        <UpgradesModal onClose={handleDismissUpgrades} onConfirm={handleDismissUpgrades} />
      )}
    </div>
  )
}

import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom'
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
import { ParkingModal } from './sections/ParkingModal'
import { MerchandiseModal } from './sections/MerchandiseModal'
import { AddOnsModal } from './sections/AddOnsModal'
import styles from './EventDetailPage.module.css'

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const variant = useVariant()
  const navigate = useNavigate()
  const { pathname } = useLocation()
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

  const showUpgradesModal = pathname.endsWith('/upgrades')
  const showParkingModal = pathname.endsWith('/parking')
  const showMerchModal = pathname.endsWith('/merch')
  const showAddOnsModal = pathname.endsWith('/addons')

  // Close modal → return to the base event detail page
  const handleDismissModal = () => {
    const basePath = pathname.replace(/\/(upgrades|parking|merch|addons)$/, '')
    navigate(basePath, { replace: true })
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
        <UpgradesModal onClose={handleDismissModal} onConfirm={handleDismissModal} />
      )}
      {showParkingModal && (
        <ParkingModal
          venue={detailData.venue}
          onClose={handleDismissModal}
          onConfirm={handleDismissModal}
        />
      )}
      {showMerchModal && (
        <MerchandiseModal
          venue={detailData.venue}
          onClose={handleDismissModal}
          onConfirm={handleDismissModal}
        />
      )}
      {showAddOnsModal && (
        <AddOnsModal
          venue={detailData.venue}
          onClose={handleDismissModal}
          onConfirm={handleDismissModal}
        />
      )}
    </div>
  )
}

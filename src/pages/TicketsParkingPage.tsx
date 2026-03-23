import { useNavigate } from 'react-router-dom'
import { useVariant } from '../context/VariantContext'
import { TicketsPage } from './TicketsPage'
import { ParkingModal } from './EventDetail/sections/ParkingModal'

export function TicketsParkingPage() {
  const navigate = useNavigate()
  const variant = useVariant()

  const handleDismiss = () => {
    if (variant === 'currentV2') {
      navigate('/currentV2/events')
    } else {
      navigate('/current/tickets')
    }
  }

  return (
    <>
      <TicketsPage />
      <ParkingModal onClose={handleDismiss} onConfirm={handleDismiss} />
    </>
  )
}

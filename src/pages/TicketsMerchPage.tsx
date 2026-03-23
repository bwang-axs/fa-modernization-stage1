import { useNavigate } from 'react-router-dom'
import { useVariant } from '../context/VariantContext'
import { TicketsPage } from './TicketsPage'
import { MerchandiseModal } from './EventDetail/sections/MerchandiseModal'

export function TicketsMerchPage() {
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
      <MerchandiseModal onClose={handleDismiss} onConfirm={handleDismiss} />
    </>
  )
}

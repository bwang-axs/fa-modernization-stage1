import { useNavigate } from 'react-router-dom'
import { useVariant } from '../context/VariantContext'
import { TicketsPage } from './TicketsPage'
import { AddOnsModal } from './EventDetail/sections/AddOnsModal'

export function TicketsAddOnsPage() {
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
      <AddOnsModal onClose={handleDismiss} onConfirm={handleDismiss} />
    </>
  )
}

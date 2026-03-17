import { useNavigate } from 'react-router-dom'
import { useVariant } from '../context/VariantContext'
import { TicketsPage } from './TicketsPage'
import { UpgradesModal } from './EventDetail/sections/UpgradesModal'

export function TicketsUpgradesPage() {
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
      <UpgradesModal onClose={handleDismiss} onConfirm={handleDismiss} />
    </>
  )
}


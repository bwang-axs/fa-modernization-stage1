import { useEffect } from 'react'
import { VariantProvider } from '../context/VariantContext'
import { LandingLayout } from './LandingLayout'

export function SellLandingWrapper() {
  useEffect(() => {
    document.documentElement.setAttribute('data-variant', 'current')
    return () => {
      document.documentElement.removeAttribute('data-variant')
    }
  }, [])

  return (
    <VariantProvider variant="current">
      <LandingLayout />
    </VariantProvider>
  )
}

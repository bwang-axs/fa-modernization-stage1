import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { VariantProvider, type Variant } from '../context/VariantContext'

export function VariantRoute({ variant }: { variant: Variant }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-variant', variant)
  }, [variant])

  return (
    <VariantProvider variant={variant}>
      <Outlet />
    </VariantProvider>
  )
}

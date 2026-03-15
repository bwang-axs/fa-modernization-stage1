import { createContext, useContext, useMemo, type ReactNode } from 'react'

export type Variant = 'current' | 'new' | 'future'

const VariantContext = createContext<Variant>('current')

export function VariantProvider({
  variant,
  children,
}: {
  variant: Variant
  children: ReactNode
}) {
  const value = useMemo(() => variant, [variant])
  return (
    <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
  )
}

export function useVariant() {
  return useContext(VariantContext)
}

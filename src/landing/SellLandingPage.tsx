import { Hero } from './components/Hero/Hero'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import { WhySellOnAXS } from './components/WhySellOnAXS/WhySellOnAXS'
import { FinalCTA } from './components/FinalCTA/FinalCTA'

export function SellLandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhySellOnAXS />
      <FinalCTA />
    </>
  )
}

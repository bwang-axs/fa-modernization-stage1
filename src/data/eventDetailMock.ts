import type { EventWithTickets } from './ticketsMock'

export interface VenueInfo {
  name: string
  address: string
  city: string
  state: string
  zip: string
  mapUrl?: string
}

export interface EventInfoItem {
  id: string
  icon: 'door' | 'bag' | 'parking' | 'entry'
  label: string
  content: string
}

export interface SeatUpgrade {
  id: string
  price: number
  section: string
  row: string
  valueStatement: string
  badge?: 'best-value' | 'popular'
}

export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  ctaLabel: string
}

export interface EventDetailData {
  venue: VenueInfo
  eventInfo: EventInfoItem[]
  seatUpgrades: SeatUpgrade[]
  addOns: AddOn[]
}

export interface RecommendedEvent {
  id: string
  title: string
  date: string
  venue: string
  imageUrl: string
}

const venueByEventId: Record<string, VenueInfo> = {
  '1': {
    name: 'SoFi Stadium',
    address: '1000 S Prairie Ave',
    city: 'Inglewood',
    state: 'CA',
    zip: '90301',
    mapUrl: 'https://maps.google.com/?q=SoFi+Stadium+Inglewood+CA',
  },
  '2': {
    name: 'Rose Bowl Stadium',
    address: '1001 Rose Bowl Dr',
    city: 'Pasadena',
    state: 'CA',
    zip: '91103',
    mapUrl: 'https://maps.google.com/?q=Rose+Bowl+Stadium+Pasadena+CA',
  },
  '3': {
    name: 'SoFi Stadium',
    address: '1000 S Prairie Ave',
    city: 'Inglewood',
    state: 'CA',
    zip: '90301',
    mapUrl: 'https://maps.google.com/?q=SoFi+Stadium+Inglewood+CA',
  },
  '4': {
    name: 'Sphere',
    address: '255 Sands Ave',
    city: 'Las Vegas',
    state: 'NV',
    zip: '89169',
    mapUrl: 'https://maps.google.com/?q=Sphere+Las+Vegas+NV',
  },
}

const eventInfoByEventId: Record<string, EventInfoItem[]> = {
  '1': [
    { id: '1', icon: 'door', label: 'Doors open', content: '5:30 PM' },
    { id: '2', icon: 'bag', label: 'Bag policy', content: 'Clear bags only. Max 12" x 6" x 12". Small clutch allowed.' },
    { id: '3', icon: 'parking', label: 'Parking', content: 'Stadium parking lots open at 3:00 PM. Pre-purchase recommended.' },
    { id: '4', icon: 'entry', label: 'Entry', content: 'Use the gate printed on your ticket. Digital tickets accepted at all gates.' },
  ],
  '2': [
    { id: '1', icon: 'door', label: 'Doors open', content: '6:00 PM' },
    { id: '2', icon: 'bag', label: 'Bag policy', content: 'Clear bags only. No backpacks or large bags.' },
    { id: '3', icon: 'parking', label: 'Parking', content: 'Lot B and Lot K available. Shuttle from Pasadena City College.' },
    { id: '4', icon: 'entry', label: 'Entry', content: 'Enter through Gate A or Gate C. Have your ticket ready.' },
  ],
  '3': [
    { id: '1', icon: 'door', label: 'Doors open', content: '5:30 PM' },
    { id: '2', icon: 'bag', label: 'Bag policy', content: 'Clear bags only. Max 12" x 6" x 12".' },
    { id: '3', icon: 'parking', label: 'Parking', content: 'Stadium parking lots. Pre-purchase recommended.' },
    { id: '4', icon: 'entry', label: 'Entry', content: 'Gate printed on your ticket. Digital tickets accepted.' },
  ],
  '4': [
    { id: '1', icon: 'door', label: 'Doors open', content: '6:30 PM' },
    { id: '2', icon: 'bag', label: 'Bag policy', content: 'Small bags only. No backpacks. Coat check available.' },
    { id: '3', icon: 'parking', label: 'Parking', content: 'Venetian parking garage. Validated with ticket purchase.' },
    { id: '4', icon: 'entry', label: 'Entry', content: 'Main entrance. Digital tickets only.' },
  ],
}

const seatUpgradesByEventId: Record<string, SeatUpgrade[]> = {
  '1': [
    { id: 'u1', price: 85, section: 'Section 45', row: 'Row 12', valueStatement: '10 rows closer to the stage', badge: 'best-value' },
    { id: 'u2', price: 150, section: 'Section 44', row: 'Row 5', valueStatement: 'Floor-adjacent seating', badge: 'popular' },
    { id: 'u3', price: 40, section: 'Section 101', row: 'Row C', valueStatement: '5 rows closer in your section' },
  ],
  '2': [
    { id: 'u1', price: 65, section: 'Section 8', row: 'Row A', valueStatement: '8 rows closer', badge: 'popular' },
    { id: 'u2', price: 120, section: 'Section 5', row: 'Row 3', valueStatement: 'Premium sideline view', badge: 'best-value' },
    { id: 'u3', price: 45, section: 'Section 12', row: 'Row A', valueStatement: 'Front of section' },
  ],
  '3': [
    { id: 'u1', price: 55, section: 'Section 204', row: 'Row A', valueStatement: 'First row of upper level', badge: 'best-value' },
    { id: 'u2', price: 90, section: 'Section 105', row: 'Row B', valueStatement: 'Lower level upgrade' },
  ],
  '4': [
    { id: 'u1', price: 75, section: 'Section 102', row: 'Row B', valueStatement: '4 rows closer', badge: 'popular' },
    { id: 'u2', price: 130, section: 'Section 101', row: 'Row A', valueStatement: 'Front row center', badge: 'best-value' },
  ],
}

const addOnsByEventId: Record<string, AddOn[]> = {
  '1': [
    { id: 'a1', name: 'VIP Lounge Access', description: 'Pre-show lounge with private bar and restrooms.', price: 75, ctaLabel: 'Add' },
    { id: 'a2', name: 'Parking Pass', description: 'Guaranteed spot in Lot 4, 5 min walk to gate.', price: 45, ctaLabel: 'Add' },
    { id: 'a3', name: 'Tour Poster Bundle', description: 'Official tour poster + laminate. Pick up at merch stand.', price: 35, ctaLabel: 'View Details' },
  ],
  '2': [
    { id: 'a1', name: 'VIP Experience', description: 'Meet & greet, early entry, exclusive merch.', price: 199, ctaLabel: 'View Details' },
    { id: 'a2', name: 'Parking — Lot B', description: 'Reserved parking in Lot B.', price: 40, ctaLabel: 'Add' },
    { id: 'a3', name: 'Concert T-Shirt', description: 'Official Music of the Spheres tour tee.', price: 45, ctaLabel: 'Add' },
  ],
  '3': [
    { id: 'a1', name: 'Parking Pass', description: 'Stadium parking. Pre-purchase and save.', price: 50, ctaLabel: 'Add' },
    { id: 'a2', name: 'Tour Book', description: 'Limited edition Renaissance tour book.', price: 55, ctaLabel: 'View Details' },
  ],
  '4': [
    { id: 'a1', name: 'VIP Suite Access', description: 'Private suite with catering and premium view.', price: 350, ctaLabel: 'View Details' },
    { id: 'a2', name: 'Parking — Venetian', description: 'Validated garage parking.', price: 25, ctaLabel: 'Add' },
  ],
}

const recommendedEvents: RecommendedEvent[] = [
  { id: 'rec1', title: 'Olivia Rodrigo — Guts World Tour', date: 'Fri, Aug 22, 2025 · 7:30 PM', venue: 'The Forum — Inglewood, CA', imageUrl: 'https://placehold.co/400x300/4a1942/eee?text=Olivia+Rodrigo' },
  { id: 'rec2', title: 'Bruno Mars — Live in Vegas', date: 'Sat, Sep 6, 2025 · 9:00 PM', venue: 'Dolby Live — Las Vegas, NV', imageUrl: 'https://placehold.co/400x300/2d1b4e/eee?text=Bruno+Mars' },
  { id: 'rec3', title: 'Billie Eilish — Hit Me Hard', date: 'Wed, Oct 1, 2025 · 8:00 PM', venue: 'Kia Forum — Inglewood, CA', imageUrl: 'https://placehold.co/400x300/1a1a2e/eee?text=Billie+Eilish' },
]

export function getEventDetailData(eventId: string): EventDetailData | null {
  const venue = venueByEventId[eventId]
  const eventInfo = eventInfoByEventId[eventId]
  const seatUpgrades = seatUpgradesByEventId[eventId]
  const addOns = addOnsByEventId[eventId]
  if (!venue || !eventInfo || !seatUpgrades || !addOns) return null
  return { venue, eventInfo, seatUpgrades, addOns }
}

export function getRecommendedEvents(_eventId: string, _currentEvent?: EventWithTickets): RecommendedEvent[] {
  return recommendedEvents
}

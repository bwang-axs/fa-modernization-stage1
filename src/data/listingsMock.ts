export type ListingStatus = 'listed' | 'sold'

export interface Listing {
  id: string
  eventName: string
  ticketCount: number
  status: ListingStatus
  price: string
  priceValue: number
  section?: string
  row?: string
  seats?: string
  eventDate?: string
}

export const listings: Listing[] = [
  {
    id: '1',
    eventName: 'Taylor Swift | The Eras Tour',
    ticketCount: 2,
    status: 'listed',
    price: '$450.00',
    priceValue: 450,
    section: '103',
    row: 'Row 5',
    seats: 'Seats 1–2',
    eventDate: 'Sat, Apr 12, 2026 · 7:30 PM',
  },
  {
    id: '2',
    eventName: 'Coldplay — Music of the Spheres',
    ticketCount: 1,
    status: 'sold',
    price: '$185.00',
    priceValue: 185,
    section: '212',
    row: 'Row 10',
    seats: 'Seat 8',
    eventDate: 'Fri, Feb 14, 2026 · 8:00 PM',
  },
  {
    id: '3',
    eventName: 'Bruno Mars — Live in Concert',
    ticketCount: 4,
    status: 'listed',
    price: '$620.00',
    priceValue: 620,
    section: '44',
    row: 'Row 3',
    seats: 'Seats 12–15',
    eventDate: 'Sat, May 3, 2026 · 7:00 PM',
  },
  {
    id: '4',
    eventName: 'Beyoncé — Renaissance World Tour',
    ticketCount: 2,
    status: 'sold',
    price: '$640.00',
    priceValue: 640,
    section: '101',
    row: 'Row 8',
    seats: 'Seats 4–5',
    eventDate: 'Tue, Jan 28, 2026 · 8:00 PM',
  },
  {
    id: '5',
    eventName: 'NBA Playoffs — Game 5',
    ticketCount: 1,
    status: 'sold',
    price: '$275.00',
    priceValue: 275,
    section: 'C',
    row: 'Row 2',
    seats: 'Seat 14',
    eventDate: 'Wed, Mar 5, 2026 · 7:30 PM',
  },
  {
    id: '6',
    eventName: 'Doja Cat — Scarlet Tour',
    ticketCount: 2,
    status: 'sold',
    price: '$180.00',
    priceValue: 180,
    section: '115',
    row: 'Row 7',
    seats: 'Seats 9–10',
    eventDate: 'Thu, Dec 12, 2025 · 8:30 PM',
  },
  {
    id: '7',
    eventName: 'Coachella Weekend 1',
    ticketCount: 3,
    status: 'listed',
    price: '$980.00',
    priceValue: 980,
    section: 'GA',
    row: '—',
    seats: 'Seats 1–3',
    eventDate: 'Fri, Apr 11, 2026 · 4:00 PM',
  },
]

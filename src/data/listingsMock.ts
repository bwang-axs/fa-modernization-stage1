export type ListingStatus = 'listed' | 'sold'

export interface Listing {
  id: string
  eventName: string
  ticketCount: number
  status: ListingStatus
  price: string
}

export const listings: Listing[] = [
  {
    id: '1',
    eventName: 'Taylor Swift | The Eras Tour',
    ticketCount: 2,
    status: 'listed',
    price: '$450.00',
  },
  {
    id: '2',
    eventName: 'Coldplay — Music of the Spheres',
    ticketCount: 1,
    status: 'sold',
    price: '$185.00',
  },
  {
    id: '3',
    eventName: 'Bruno Mars — Live in Concert',
    ticketCount: 4,
    status: 'listed',
    price: '$620.00',
  },
]

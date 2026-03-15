export interface Ticket {
  id: string
  section: string
  row: string
  seat: string
}

export interface EventWithTickets {
  id: string
  title: string
  date: string
  dateISO: string // for sorting (YYYY-MM-DD or full ISO)
  venue: string
  imageUrl: string
  tickets: Ticket[]
}

export const upcomingEvents: EventWithTickets[] = [
  {
    id: '1',
    title: 'Taylor Swift | The Eras Tour',
    date: 'Sat, Jun 14, 2025 · 7:00 PM',
    dateISO: '2025-06-14T19:00:00',
    venue: 'SoFi Stadium — Inglewood, CA',
    imageUrl: 'https://placehold.co/800x400/1a1a2e/eee?text=Taylor+Swift',
    tickets: [
      { id: 't1', section: 'Section 101', row: 'Row A', seat: 'Seat 5' },
      { id: 't2', section: 'Section 101', row: 'Row A', seat: 'Seat 6' },
    ],
  },
  {
    id: '2',
    title: 'Coldplay — Music of the Spheres',
    date: 'Fri, Jul 18, 2025 · 8:00 PM',
    dateISO: '2025-07-18T20:00:00',
    venue: 'Rose Bowl Stadium — Pasadena, CA',
    imageUrl: 'https://placehold.co/800x400/16213e/eee?text=Coldplay',
    tickets: [
      { id: 't3', section: 'Section 12', row: 'Row C', seat: 'Seat 12' },
    ],
  },
]

export function getEventById(id: string): EventWithTickets | undefined {
  return [...upcomingEvents, ...pastEvents].find((e) => e.id === id)
}

export const pastEvents: EventWithTickets[] = [
  {
    id: '3',
    title: 'Beyoncé — Renaissance Tour',
    date: 'Sun, Sep 10, 2024 · 7:30 PM',
    dateISO: '2024-09-10T19:30:00',
    venue: 'SoFi Stadium — Inglewood, CA',
    imageUrl: 'https://placehold.co/800x400/0f3460/eee?text=Beyonc%C3%A9',
    tickets: [
      { id: 't4', section: 'Section 205', row: 'Row B', seat: 'Seats 3-4' },
    ],
  },
  {
    id: '4',
    title: 'U2 — UV Achtung Baby Live',
    date: 'Wed, Nov 20, 2024 · 8:00 PM',
    dateISO: '2024-11-20T20:00:00',
    venue: 'Sphere — Las Vegas, NV',
    imageUrl: 'https://placehold.co/800x400/533483/eee?text=U2',
    tickets: [
      { id: 't5', section: 'Section 102', row: 'Row D', seat: 'Seat 8' },
    ],
  },
]

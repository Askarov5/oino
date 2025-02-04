export interface Game {
  id: string
  sportType: string
  startTime: Date
  location: string
  currentPlayers: number
  maxPlayers: number
  organizer: {
    name: string
    verified: boolean
  }
}

export interface Court {
  id: string
  name: string
  pricePerHour: number
  availableSlots: Date[]
  amenities: string[]
  images: string[]
  rating: number
}

export interface Filters {
  city: string
  dateRange: [Date, Date]
  sportTypes: string[]
  priceRange?: [number, number]
}


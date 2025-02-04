export interface Court {
  id: string
  name: string
  address: string
  coordinates: { lat: number; lng: number }
  sportTypes: string[]
  courts: {
    type: string
    quantity: number
    indoor: boolean
  }[]
  openingHours: {
    day: string
    open: string
    close: string
  }[]
  pricing: {
    peak: number
    offPeak: number
  }
  images: string[]
  amenities: string[]
  availability: {
    date: Date
    slots: {
      start: string
      end: string
      available: boolean
    }[]
  }[]
  events: {
    id: string
    title: string
    date: Date
    startTime: string
    endTime: string
    description: string
  }[]
}


import type { Court } from "@/types/court"

// Mock data for a single court
const mockCourt: Court = {
  id: "1",
  name: "Central Park Tennis Courts",
  address: "123 Tennis Ave, New York, NY 10001",
  coordinates: { lat: 40.7829, lng: -73.9654 },
  sportTypes: ["Tennis"],
  courts: [
    { type: "Clay", quantity: 4, indoor: false },
    { type: "Hard", quantity: 2, indoor: true },
  ],
  openingHours: [
    { day: "Monday-Friday", open: "06:00", close: "22:00" },
    { day: "Saturday-Sunday", open: "08:00", close: "20:00" },
  ],
  pricing: {
    peak: 50,
    offPeak: 35,
  },
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  amenities: ["Lighting", "Locker Rooms", "Equipment Rental", "Pro Shop"],
  availability: [
    {
      date: new Date(),
      slots: [
        { start: "08:00", end: "09:00", available: true },
        { start: "09:00", end: "10:00", available: false },
        { start: "10:00", end: "11:00", available: true },
      ],
    },
  ],
  events: [
    {
      id: "1",
      title: "Junior Tennis Tournament",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: "09:00",
      endTime: "17:00",
      description: "Annual junior tennis tournament for ages 12-16.",
    },
    {
      id: "2",
      title: "Tennis Clinic with Pro Player",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      startTime: "10:00",
      endTime: "12:00",
      description: "Learn from a professional tennis player in this exclusive clinic.",
    },
    {
      id: "3",
      title: "Charity Doubles Match",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      startTime: "14:00",
      endTime: "16:00",
      description: "Watch local celebrities compete in a charity doubles match.",
    },
  ],
}

export async function getCourt(id: string): Promise<Court | null> {
  // In a real application, you would fetch this data from an API
  return mockCourt
}

export async function getSimilarCourts(courtId: string, sportTypes: string[]): Promise<Court[]> {
  // In a real application, you would fetch this data from an API
  return [mockCourt, mockCourt, mockCourt]
}

import type { Game } from "@/types/game"

// Mock data for a single game
const mockGame: Game = {
  id: "1",
  title: "Friendly Basketball Match",
  datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  location: {
    address: "123 Main St, Anytown, USA",
    coordinates: [40.7128, -74.006],
  },
  players: {
    current: 8,
    waitingList: 2,
    max: 10,
    list: [
      {
        id: "1", name: "John Doe", skillLevel: "intermediate",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "2", name: "Jane Smith", skillLevel: "advanced",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "3", name: "Mike Johnson", skillLevel: "beginner",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "4", name: "Sarah Brown", skillLevel: "intermediate",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "5", name: "Chris Lee", skillLevel: "intermediate",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "6", name: "Alex Wong", skillLevel: "advanced",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "7", name: "Emily Chen", skillLevel: "beginner",
        gamesPlayed: 0,
        avatar: ""
      },
      {
        id: "8", name: "David Kim", skillLevel: "intermediate",
        gamesPlayed: 0,
        avatar: ""
      },
    ],
  },
  organizer: {
    name: "John Doe",
    verified: true,
    rating: 4.8,
    responsetime: "1 hour",
    id: "",
    responseRate: "",
    hostedGames: []
  },
  skillLevel: "intermediate",
  sport: "basketball",
  status: "open",
  rules: {
    equipment: [],
    format: "",
    policies: ""
  }
}

export async function getGameById(id: string): Promise<Game | null> {
  // In a real application, you would fetch this data from an API
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return mockGame
}
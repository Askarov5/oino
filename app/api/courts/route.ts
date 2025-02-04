import { NextResponse } from "next/server"
import type { Court } from "@/types/search"

const mockCourts: Court[] = [
  {
    id: "1",
    name: "Downtown Basketball Court",
    pricePerHour: 25,
    availableSlots: [
      new Date(Date.now() + 1000 * 60 * 60 * 2),
      new Date(Date.now() + 1000 * 60 * 60 * 4),
      new Date(Date.now() + 1000 * 60 * 60 * 6),
    ],
    amenities: ["lighting", "locker_rooms"],
    images: ["/placeholder.svg?height=200&width=300"],
    rating: 4.5,
  },
  {
    id: "2",
    name: "Central Park Tennis",
    pricePerHour: 30,
    availableSlots: [
      new Date(Date.now() + 1000 * 60 * 60 * 3),
      new Date(Date.now() + 1000 * 60 * 60 * 5),
      new Date(Date.now() + 1000 * 60 * 60 * 7),
    ],
    amenities: ["lighting"],
    images: ["/placeholder.svg?height=200&width=300"],
    rating: 4.8,
  },
  // Add more mock courts as needed
]

export async function GET(request: Request) {
  // In a real application, you would use the URL parameters to filter the courts
  // For this example, we'll just return all mock courts
  return NextResponse.json(mockCourts)
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CourtFilters from "@/components/court-filters"
import CourtCard from "@/components/court-card"
import type { Court } from "@/types/court"

// Mock data for courts
const mockCourts: Court[] = [
  {
    id: "1",
    name: "Central Park Basketball Court",
    address: "123 Central Park, New York, NY",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    sportTypes: ["basketball"],
    courts: [{ type: "basketball", quantity: 2, indoor: false }],
    openingHours: [
      { day: "Monday-Friday", open: "06:00", close: "22:00" },
      { day: "Saturday-Sunday", open: "08:00", close: "20:00" },
    ],
    pricing: {
      peak: 30,
      offPeak: 20,
    },
    images: ["/placeholder.svg"],
    amenities: ["Changing Rooms", "Lighting", "Parking"],
    availability: [],
    events: [],
  },
  {
    id: "2",
    name: "Riverside Tennis Courts",
    address: "456 Riverside Dr, New York, NY",
    coordinates: { lat: 40.8016, lng: -73.9712 },
    sportTypes: ["tennis"],
    courts: [{ type: "tennis", quantity: 4, indoor: false }],
    openingHours: [{ day: "Monday-Sunday", open: "07:00", close: "21:00" }],
    pricing: {
      peak: 40,
      offPeak: 30,
    },
    images: ["/placeholder.svg"],
    amenities: ["Changing Rooms", "Showers", "Equipment Rental"],
    availability: [],
    events: [],
  },
  // Add more mock courts here...
]

export default function CourtsPage() {
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(mockCourts)

  const handleFilterChange = (filters: any) => {
    const filtered = mockCourts.filter((court) => {
      if (filters.sport && !court.sportTypes.includes(filters.sport)) return false
      if (filters.location && !court.address.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (filters.amenities && filters.amenities.length > 0) {
        if (!filters.amenities.every((amenity: string) => court.amenities.includes(amenity))) return false
      }
      if (filters.minPrice && court.pricing.offPeak < filters.minPrice) return false
      if (filters.maxPrice && court.pricing.peak > filters.maxPrice) return false
      return true
    })
    setFilteredCourts(filtered)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Find Courts</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <CourtFilters onFilterChange={handleFilterChange} />
          </CardContent>
        </Card>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
          {filteredCourts.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No courts found matching your filters.</p>
          )}
        </div>
      </div>
    </div>
  )
}


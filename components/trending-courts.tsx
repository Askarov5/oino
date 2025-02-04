import { Suspense } from "react"
import type { Court } from "@/types/court"
import CourtCard from "@/components/court-card"
import CourtCardSkeleton from "@/components/court-card-skeleton"

const mockCourts: Court[] = [
  {
    id: "1",
    name: "Downtown Basketball Court",
    sportType: "basketball",
    pricePerHour: 25,
    rating: 4.5,
    imageUrl: "/placeholder.svg?height=200&width=300",
    location: "New York, NY",
  },
  {
    id: "2",
    name: "Central Park Tennis",
    sportType: "tennis",
    pricePerHour: 30,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=300",
    location: "New York, NY",
  },
  {
    id: "3",
    name: "Riverside Soccer Field",
    sportType: "soccer",
    pricePerHour: 40,
    rating: 4.2,
    imageUrl: "/placeholder.svg?height=200&width=300",
    location: "New York, NY",
  },
]

export default function TrendingCourts() {
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Trending Courts</h2>
        <p className="mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
          Discover popular courts in your area
        </p>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          <Suspense fallback={<CourtCardSkeleton count={3} />}>
            {mockCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  )
}


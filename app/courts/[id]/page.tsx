import { Suspense } from "react"
import { notFound } from "next/navigation"
import CourtHeader from "@/components/court-header"
import CourtDetails from "@/components/court-details"
import BookingWidget from "@/components/booking-widget"
import SimilarCourts from "@/components/similar-courts"
import { Skeleton } from "@/components/ui/skeleton"
import { getCourt } from "@/lib/api"

export default async function CourtDetailsPage({ params }: { params: { id: string } }) {
  const court = await getCourt(params.id)

  if (!court) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <CourtHeader court={court} />
      </Suspense>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
              <CourtDetails court={court} />
            </Suspense>
          </div>
          <div className="mt-10 lg:mt-0">
            <Suspense fallback={<Skeleton className="h-[800px] w-full" />}>
              <BookingWidget court={court} />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <SimilarCourts courtId={court.id} sportTypes={court.sportTypes} />
      </Suspense>
    </div>
  )
}


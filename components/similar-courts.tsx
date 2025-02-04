import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CourtCard from "@/components/court-card"
import { getSimilarCourts } from "@/lib/api"

interface SimilarCourtsProps {
  courtId: string
  sportTypes: string[]
}

export default async function SimilarCourts({ courtId, sportTypes }: SimilarCourtsProps) {
  const similarCourts = await getSimilarCourts(courtId, sportTypes)

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Similar Courts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCourts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


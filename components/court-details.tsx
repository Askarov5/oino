import { Clock, Dumbbell, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import EventsList from "@/components/events-list"
import type { Court } from "@/types/court"

interface CourtDetailsProps {
  court: Court
}

export default function CourtDetails({ court }: CourtDetailsProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Opening Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Open</TableHead>
                <TableHead>Close</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {court.openingHours.map((hours) => (
                <TableRow key={hours.day}>
                  <TableCell>{hours.day}</TableCell>
                  <TableCell>{hours.open}</TableCell>
                  <TableCell>{hours.close}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Dumbbell className="mr-2 h-5 w-5" /> Court Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {court.courts.map((courtType) => (
              <li key={courtType.type}>
                {courtType.quantity} {courtType.indoor ? "Indoor" : "Outdoor"} {courtType.type} Court
                {courtType.quantity > 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" /> Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {court.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Price per Hour</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Peak Hours</TableCell>
                <TableCell>${court.pricing.peak.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Off-Peak Hours</TableCell>
                <TableCell>${court.pricing.offPeak.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EventsList events={court.events} />
    </div>
  )
}


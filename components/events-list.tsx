import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import type { Court } from "@/types/court"

interface EventsListProps {
  events: Court["events"]
}

export default function EventsList({ events }: EventsListProps) {
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEvents.length === 0 ? (
          <p className="text-muted-foreground">No upcoming events at this time.</p>
        ) : (
          <ul className="space-y-4">
            {sortedEvents.map((event) => (
              <li key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {format(event.date, "MMMM d, yyyy")} • {event.startTime} - {event.endTime}
                </p>
                <p className="mt-1 text-sm">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}


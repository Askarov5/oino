import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare, Phone } from "lucide-react"
import type { Game } from "@/types/game"

interface OrganizerProfileProps {
  organizer: Game["organizer"]
}

export default function OrganizerProfile({ organizer }: OrganizerProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${organizer.name}`} />
            <AvatarFallback>{organizer.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{organizer.name}</h3>
            <div className="flex items-center">
              {organizer.verified && <Badge className="mr-2">Verified</Badge>}
              <span className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                {organizer.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm">Response Rate: {organizer.responseRate}</p>
          <p className="text-sm">Avg. Response Time: {organizer.responsetime}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" /> Message
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="w-4 h-4 mr-2" /> Call
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


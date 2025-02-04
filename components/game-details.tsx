import { MapPin, Car, Train } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { Game } from "@/types/game"
import WeatherWidget from "@/components/weather-widget"

interface GameDetailsProps {
  game: Game
}

export default function GameDetails({ game }: GameDetailsProps) {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="level">
          <AccordionTrigger>Level of Play</AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">
              <strong>Skill Level:</strong> {game.skillLevel}
            </p>
            <p>{getSkillLevelDescription(game.skillLevel)}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="format">
          <AccordionTrigger>Game Format</AccordionTrigger>
          <AccordionContent>
            <p>{game.rules.format}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="equipment">
          <AccordionTrigger>Equipment Needed</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5">
              {game.rules.equipment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="policies">
          <AccordionTrigger>Game Policies</AccordionTrigger>
          <AccordionContent>
            <p>{game.rules.policies}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" /> Location Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">{game.location.address}</p>
          <Button
            variant="outline"
            className="mb-4"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.location.address)}`,
                "_blank",
              )
            }
          >
            Get Directions
          </Button>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Car className="mr-1 h-4 w-4" /> Parking available
            </span>
            <span className="flex items-center">
              <Train className="mr-1 h-4 w-4" /> Near public transit
            </span>
          </div>
          <WeatherWidget coordinates={game.location.coordinates} />
        </CardContent>
      </Card>
    </div>
  )
}

function getSkillLevelDescription(skillLevel: string) {
  switch (skillLevel) {
    case "beginner":
      return "Suitable for players new to the sport or with limited experience."
    case "intermediate":
      return "For players with some experience and basic skills."
    case "advanced":
      return "Designed for highly skilled and experienced players."
    default:
      return "Skill level not specified."
  }
}


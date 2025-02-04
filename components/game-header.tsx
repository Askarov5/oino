import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { ShoppingBasketIcon as Basketball, ClubIcon as Soccer, TurtleIcon as Tennis, Clock, Share2 } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import type { Game } from "@/types/game"
import { useState } from "react"

interface GameHeaderProps {
  game: Game
}

export default function GameHeader({ game }: GameHeaderProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case "basketball":
        return <Basketball className="h-6 w-6" />
      case "soccer":
        return <Soccer className="h-6 w-6" />
      case "tennis":
        return <Tennis className="h-6 w-6" />
      default:
        return null
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: game.title,
          text: `Join me for a ${game.sport} game!`,
          url: window.location.href,
        })
        .catch(() => setIsShareDialogOpen(true))
    } else {
      setIsShareDialogOpen(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getSportIcon(game.sport)}
          <span>{game.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {format(game.datetime, "EEEE, MMM d, yyyy | h:mm a")}
          </Badge>
          <Badge>{game.skillLevel}</Badge>
          <Badge variant="secondary">
            {game.players.current}/{game.players.max} players
          </Badge>
          <Badge variant={game.status === "open" ? "default" : game.status === "private" ? "secondary" : "destructive"}>
            {game.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{game.location.address}</p>
        <div className="aspect-video w-full mb-4 relative">
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(game.location.address)}`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Starts {formatDistanceToNow(game.datetime, { addSuffix: true })}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share via WhatsApp, Twitter, or copy link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <AlertDialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Game</AlertDialogTitle>
            <AlertDialogDescription>Copy the link below to share this game:</AlertDialogDescription>
          </AlertDialogHeader>
          <input
            className="w-full p-2 border rounded"
            value={window.location.href}
            readOnly
            onClick={(e) => e.currentTarget.select()}
          />
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setIsShareDialogOpen(false)
              }}
            >
              Copy Link
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}


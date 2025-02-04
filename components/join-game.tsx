"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import type { Game, JoinStatus } from "@/types/game"

const joinGameSchema = z.object({
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  equipment: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one item.",
  }),
  message: z.string().optional(),
})

interface JoinGameProps {
  game: Game
  joinStatus: JoinStatus
  setJoinStatus: (status: JoinStatus) => void
}

export default function JoinGame({ game, joinStatus, setJoinStatus }: JoinGameProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof joinGameSchema>>({
    resolver: zodResolver(joinGameSchema),
    defaultValues: {
      skillLevel: "beginner",
      equipment: [],
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof joinGameSchema>) {
    try {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setJoinStatus("pending")
      setIsModalOpen(false)
      toast({
        title: "Request Sent!",
        description: "Your request to join the game has been sent to the organizer.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send join request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getButtonText = () => {
    switch (joinStatus) {
      case "not_joined":
        return game.status === "open" ? "Join Game" : "Request to Join"
      case "pending":
        return "Awaiting Approval"
      case "approved":
        return "Joined ✓"
      case "denied":
        return "Join Request Denied"
      default:
        return "Join Game"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Join Game</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Click the button below to join this {game.sport} game.</p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => setIsModalOpen(true)}
            disabled={joinStatus !== "not_joined" || game.status === "full"}
          >
            {getButtonText()}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Game Request</DialogTitle>
            <DialogDescription>Fill out the form below to request to join this {game.sport} game.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your skill level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipment"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Equipment</FormLabel>
                      <FormDescription>Select the equipment you'll bring to the game.</FormDescription>
                    </div>
                    {game.rules.equipment.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="equipment"
                        render={({ field }) => {
                          return (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(field.value?.filter((value) => value !== item))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message to Organizer (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information for the organizer"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} onClick={form.handleSubmit(onSubmit)}>
              {isSubmitting ? (
                <motion.div
                  className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              ) : (
                "Send Request"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {joinStatus !== "not_joined" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Join Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={getProgressValue(joinStatus)} className="mb-2" />
            <p className="text-sm text-center">{getStatusText(joinStatus)}</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}

function getProgressValue(status: JoinStatus): number {
  switch (status) {
    case "not_joined":
      return 0
    case "pending":
      return 50
    case "approved":
      return 100
    case "denied":
      return 100
    default:
      return 0
  }
}

function getStatusText(status: JoinStatus): string {
  switch (status) {
    case "pending":
      return "Your request is being reviewed by the organizer"
    case "approved":
      return "You have been approved to join the game!"
    case "denied":
      return "Your request to join has been denied"
    default:
      return ""
  }
}


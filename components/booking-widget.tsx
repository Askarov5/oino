"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format, addHours, isSameDay, addDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Court } from "@/types/court"

const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string({
    required_error: "Please select a start time",
  }),
  duration: z
    .number({
      required_error: "Please select a duration",
    })
    .min(1)
    .max(4),
  paymentMethod: z.enum(["card", "paypal"], {
    required_error: "Please select a payment method",
  }),
  equipmentRental: z.boolean().default(false),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingWidgetProps {
  court: Court
}

export default function BookingWidget({ court }: BookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingFormData | null>(null)
  const [availableSlots, setAvailableSlots] = useState<{ start: string; end: string; available: boolean }[]>([])

  const getAvailableSlots = (date: Date) => {
    return court.availability.find((a) => isSameDay(a.date, date))?.slots || []
  }

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: new Date(),
      startTime: "",
      duration: 1,
      paymentMethod: "card",
      equipmentRental: false,
      termsAccepted: false,
    },
  })

  useEffect(() => {
    if (form.watch("date")) {
      const slots = getAvailableSlots(form.watch("date"))
      setAvailableSlots(slots)
      form.setValue("startTime", "")
    }
  }, [form.watch("date"), form])

  const onSubmit = (data: BookingFormData) => {
    console.log(data)
    setBookingConfirmation(data)
  }

  const calculatePrice = (startTime: string, duration: number, equipmentRental: boolean) => {
    const [hours, minutes] = startTime.split(":").map(Number)
    const isPeakHour = hours >= 17 && hours < 20
    const rate = isPeakHour ? court.pricing.peak : court.pricing.offPeak
    const courtPrice = rate * duration
    const rentalPrice = equipmentRental ? 10 : 0 // Assuming $10 for equipment rental
    return courtPrice + rentalPrice
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Book a Court</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date)
                          setSelectedDate(date)
                        }}
                        disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.map((slot) => (
                        <SelectItem key={slot.start} value={slot.start} disabled={!slot.available}>
                          {slot.start}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (hours)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    value={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((hours) => (
                        <SelectItem key={hours} value={hours.toString()}>
                          {hours} hour{hours > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="equipmentRental"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Equipment Rental (+$10)</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="cancellation-policy">
                <AccordionTrigger>Cancellation Policy</AccordionTrigger>
                <AccordionContent>
                  Free cancellation up to 24 hours before your reservation. After that, you will be charged 50% of the
                  booking fee.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I accept the terms and conditions</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Alert>
              <AlertTitle>COVID-19 Safety Measures</AlertTitle>
              <AlertDescription>
                Please follow all safety guidelines posted at the court. Masks are required in indoor areas.
              </AlertDescription>
            </Alert>

            <div className="text-right font-bold">
              Total: $
              {calculatePrice(form.watch("startTime"), form.watch("duration"), form.watch("equipmentRental")).toFixed(
                2,
              )}
            </div>

            <Button type="submit" className="w-full">
              Book Now
            </Button>
          </form>
        </Form>
      </CardContent>

      <Dialog open={!!bookingConfirmation} onOpenChange={() => setBookingConfirmation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmation</DialogTitle>
            <DialogDescription>Your court has been successfully booked!</DialogDescription>
          </DialogHeader>
          {bookingConfirmation && (
            <div className="space-y-2">
              <p>
                <strong>Date:</strong> {format(bookingConfirmation.date, "MMMM d, yyyy")}
              </p>
              <p>
                <strong>Time:</strong> {bookingConfirmation.startTime} -{" "}
                {format(
                  addHours(new Date(`2000-01-01T${bookingConfirmation.startTime}`), bookingConfirmation.duration),
                  "HH:mm",
                )}
              </p>
              <p>
                <strong>Duration:</strong> {bookingConfirmation.duration} hour(s)
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {bookingConfirmation.paymentMethod === "card" ? "Credit Card" : "PayPal"}
              </p>
              <p>
                <strong>Equipment Rental:</strong> {bookingConfirmation.equipmentRental ? "Yes" : "No"}
              </p>
              <p>
                <strong>Total:</strong> $
                {calculatePrice(
                  bookingConfirmation.startTime,
                  bookingConfirmation.duration,
                  bookingConfirmation.equipmentRental,
                ).toFixed(2)}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setBookingConfirmation(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}


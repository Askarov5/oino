"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

const sportsList = [
  "Basketball",
  "Football",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Badminton",
  "Table Tennis",
  "Cricket",
]

const skillLevels = ["Beginner", "Intermediate", "Advanced"]

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  country: z.string().min(1),
  city: z.string().min(1),
  sports: z
    .array(
      z.object({
        name: z.string(),
        skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
      }),
    )
    .min(1, "Please select at least one sport"),
})

export default function SignUpForm() {
  const [step, setStep] = useState(1)
  const [selectedSports, setSelectedSports] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      country: "",
      city: "",
      sports: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  const handleSportSelection = (sport: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSports([...selectedSports, sport])
    } else {
      setSelectedSports(selectedSports.filter((s) => s !== sport))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to start booking courts and joining games.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <FormLabel>Select Sports</FormLabel>
                {sportsList.map((sport) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Checkbox
                      id={sport}
                      checked={selectedSports.includes(sport)}
                      onCheckedChange={(checked) => handleSportSelection(sport, checked as boolean)}
                    />
                    <label
                      htmlFor={sport}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {sport}
                    </label>
                  </div>
                ))}
                {selectedSports.map((sport, index) => (
                  <FormField
                    key={sport}
                    control={form.control}
                    name={`sports.${index}.skillLevel`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{sport} Skill Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              const sports = form.getValues("sports") as { name: string; skillLevel: "Beginner" | "Intermediate" | "Advanced" }[];
                              const updatedSports = [...sports];
                              updatedSports[index] = {
                                name: sport,
                                skillLevel: value as "Beginner" | "Intermediate" | "Advanced",
                              };
                              form.setValue("sports", updatedSports);
                            }}
                            defaultValue={(field.value as unknown as { skillLevel: string } | undefined)?.skillLevel || ""}
                            className="flex flex-col space-y-1"
                          >
                            {skillLevels.map((level) => (
                              <FormItem className="flex items-center space-x-3 space-y-0" key={level}>
                                <FormControl>
                                  <RadioGroupItem value={level} />
                                </FormControl>
                                <FormLabel className="font-normal">{level}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  )
}


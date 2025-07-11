"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface DoctorAvailabilityCalendarProps {
  doctorId: string
  doctorName: string
}

export function DoctorAvailabilityCalendar({ doctorId, doctorName }: DoctorAvailabilityCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = React.useState<string>("")
  const [endTime, setEndTime] = React.useState<string>("")
  const [isOnline, setIsOnline] = React.useState<boolean>(false)

  const handleSaveAvailability = () => {
    if (!date || !startTime || !endTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and enter start/end times.",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would send this data to your backend
    console.log({
      doctorId,
      date: format(date, "yyyy-MM-dd"),
      startTime,
      endTime,
      isOnline,
    })

    toast({
      title: "Availability Saved!",
      description: `Availability for ${doctorName} on ${format(date, "PPP")} from ${startTime} to ${endTime} (${isOnline ? "Online" : "Offline"}) has been saved.`,
    })

    // Optionally reset form
    setStartTime("")
    setEndTime("")
    setIsOnline(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Availability for {doctorName}</CardTitle>
        <CardDescription>Select dates and define time slots for this doctor.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Label htmlFor="date-picker">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Start Time</Label>
              <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="end-time">End Time</Label>
              <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="online-consultation"
              checked={isOnline}
              onCheckedChange={setIsOnline}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <Label htmlFor="online-consultation">Online Consultation</Label>
          </div>

          <Button onClick={handleSaveAvailability} className="mt-4">
            Save Availability
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Existing Availability (Placeholder)</h3>
          <p className="text-muted-foreground">
            This section would display the doctor's already saved availability slots for the selected month/date. You
            would fetch this data from your database.
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>2025-07-15: 09:00 AM - 12:00 PM (Offline)</li>
            <li>2025-07-16: 01:00 PM - 05:00 PM (Online)</li>
            <li>2025-07-17: 10:00 AM - 02:00 PM (Offline)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

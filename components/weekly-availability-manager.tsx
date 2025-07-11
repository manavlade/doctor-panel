"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, MinusCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isOnline: boolean
}

interface WeeklyAvailabilityManagerProps {
  doctorId: string
  doctorName: string
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function WeeklyAvailabilityManager({ doctorId, doctorName }: WeeklyAvailabilityManagerProps) {
  const [weeklyAvailability, setWeeklyAvailability] = useState<{ [key: string]: TimeSlot[] }>(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {}),
  )
  const [activeTab, setActiveTab] = useState<string>("Monday")

  const handleAddSlot = (day: string) => {
    setWeeklyAvailability((prev) => ({
      ...prev,
      [day]: [...prev[day], { id: String(Date.now()), startTime: "", endTime: "", isOnline: false }],
    }))
  }

  const handleRemoveSlot = (day: string, id: string) => {
    setWeeklyAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((slot) => slot.id !== id),
    }))
  }

  const handleSlotChange = (day: string, id: string, field: keyof TimeSlot, value: string | boolean) => {
    setWeeklyAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)),
    }))
  }

  const handleSaveWeeklyAvailability = () => {
    // In a real application, you would send this complex data to your backend
    console.log({
      doctorId,
      weeklyAvailability,
    })
    toast({
      title: "Weekly Availability Saved!",
      description: `Availability for ${doctorName} has been updated.`,
    })
    // Optionally close dialog or provide feedback
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set Weekly Availability for {doctorName}</CardTitle>
        <CardDescription>Define recurring time slots for each day of the week.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            {daysOfWeek.map((day) => (
              <TabsTrigger key={day} value={day}>
                {day.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
          {daysOfWeek.map((day) => (
            <TabsContent key={day} value={day} className="mt-4">
              <h3 className="text-lg font-semibold mb-4">{day} Availability</h3>
              {weeklyAvailability[day].length === 0 && (
                <p className="text-muted-foreground mb-4">No slots defined for {day}. Click "Add Slot" to begin.</p>
              )}
              {weeklyAvailability[day].map((slot, index) => (
                <div
                  key={slot.id}
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 p-3 border rounded-md"
                >
                  <div className="md:col-span-2">
                    <Label htmlFor={`start-time-${day}-${slot.id}`}>Start Time</Label>
                    <Input
                      id={`start-time-${day}-${slot.id}`}
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleSlotChange(day, slot.id, "startTime", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`end-time-${day}-${slot.id}`}>End Time</Label>
                    <Input
                      id={`end-time-${day}-${slot.id}`}
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleSlotChange(day, slot.id, "endTime", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-1">
                    <Checkbox
                      id={`online-${day}-${slot.id}`}
                      checked={slot.isOnline}
                      onCheckedChange={(checked) => handleSlotChange(day, slot.id, "isOnline", Boolean(checked))}
                    />
                    <Label htmlFor={`online-${day}-${slot.id}`}>Online</Label>
                  </div>
                  <div className="flex justify-end md:col-span-1">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveSlot(day, slot.id)}
                    >
                      <MinusCircle className="h-4 w-4" />
                      <span className="sr-only">Remove Slot</span>
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => handleAddSlot(day)} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Slot
              </Button>
            </TabsContent>
          ))}
        </Tabs>
        <Button onClick={handleSaveWeeklyAvailability} className="mt-6 w-full">
          Save Weekly Availability
        </Button>
      </CardContent>
    </Card>
  )
}

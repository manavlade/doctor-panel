"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WeeklyAvailabilityManager } from "@/components/weekly-availability-manager"
import { DoctorAvailabilityCalendar } from "@/components/doctor-availability-calendar" // Assuming this is for specific dates

export default function DoctorAvailabilityPage() {
  // Simulate the current logged-in doctor
  const currentDoctorId = "doc1" // Dr. Emily White
  const currentDoctorName = "Dr. Emily White"

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Manage My Availability</h1>
      <Card>
        <CardHeader>
          <CardTitle>Set Weekly Recurring Availability</CardTitle>
          <CardDescription>Define your standard working hours for each day of the week.</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyAvailabilityManager doctorId={currentDoctorId} doctorName={currentDoctorName} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Specific Date Availability</CardTitle>
          <CardDescription>
            Add or modify availability for specific dates (e.g., one-off changes, holidays).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DoctorAvailabilityCalendar doctorId={currentDoctorId} doctorName={currentDoctorName} />
        </CardContent>
      </Card>
    </div>
  )
}

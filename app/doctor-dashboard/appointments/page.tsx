import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentsTable } from "@/components/appointments-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppointmentForm } from "@/components/appointment-form"

export default function DoctorAppointmentsPage() {
  // Simulate the current logged-in doctor
  const currentDoctorId = "doc1" // Dr. Emily White
  const currentDoctorName = "Dr. Emily White"

  // Dummy data for demonstration, filtered for the current doctor
  const allAppointments = [
    {
      id: "app1",
      patientName: "Alice Johnson",
      doctorName: "Dr. Emily White",
      type: "online",
      dateTime: "2025-07-15 10:00 AM",
      status: "booked",
      paymentStatus: "pending",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      doctorId: "doc1",
    },
    {
      id: "app2",
      patientName: "Bob Williams",
      doctorName: "Dr. John Smith",
      type: "offline",
      dateTime: "2025-07-16 02:30 PM",
      status: "completed",
      paymentStatus: "paid",
      doctorId: "doc2",
    },
    {
      id: "app3",
      patientName: "Charlie Brown",
      doctorName: "Dr. Sarah Lee",
      type: "online",
      dateTime: "2025-07-17 11:00 AM",
      status: "rescheduled",
      paymentStatus: "paid",
      meetingLink: "https://zoom.us/j/1234567890",
      doctorId: "doc3",
    },
    {
      id: "app4",
      patientName: "Diana Miller",
      doctorName: "Dr. Emily White",
      type: "offline",
      dateTime: "2025-07-18 09:00 AM",
      status: "booked",
      paymentStatus: "pending",
      doctorId: "doc1",
    },
  ]

  const doctorsAppointments = allAppointments.filter((app) => app.doctorId === currentDoctorId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Appointments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Book New Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
              <DialogDescription>Schedule a new appointment for a patient with yourself.</DialogDescription>
            </DialogHeader>
            {/* In a real app, you'd pre-fill the doctorId here */}
            <AppointmentForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Appointments for {currentDoctorName}</CardTitle>
          <CardDescription>View and manage all your patient appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentsTable appointments={doctorsAppointments} />
        </CardContent>
      </Card>
    </div>
  )
}

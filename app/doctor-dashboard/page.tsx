import { CardDescription } from "@/components/ui/card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, CalendarDays, MessageSquare, PlusCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppointmentForm } from "@/components/appointment-form"
import { TumorBoardForm } from "@/components/tumor-board-form"
import Link from "next/link"

export default function DoctorDashboardPage() {
  // Simulate the current logged-in doctor
  const currentDoctorId = "doc1" // Dr. Emily White
  const currentDoctorName = "Dr. Emily White"

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Welcome, {currentDoctorName}!</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">Total patients under your care</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Tumor Boards</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Upcoming meetings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Slots This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 hrs</div>
            <p className="text-xs text-muted-foreground">Based on your set availability</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Shortcut to Book New Appointment */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardTitle className="mb-4 text-lg">Book New Appointment</CardTitle>
          <CardDescription className="mb-4">Schedule a new appointment for one of your patients.</CardDescription>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
                <DialogDescription>Schedule a new appointment for a patient with yourself.</DialogDescription>
              </DialogHeader>
              {/* Pre-fill doctorId with currentDoctorId */}
              <AppointmentForm />
            </DialogContent>
          </Dialog>
        </Card>

        {/* Shortcut to Create New Tumor Board */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardTitle className="mb-4 text-lg">Create New Tumor Board</CardTitle>
          <CardDescription className="mb-4">Initiate a new multidisciplinary tumor board meeting.</CardDescription>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Create Tumor Board
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Tumor Board Meeting</DialogTitle>
                <DialogDescription>Schedule a new multidisciplinary tumor board meeting.</DialogDescription>
              </DialogHeader>
              {/* Pre-fill primaryDoctorId with currentDoctorId */}
              <TumorBoardForm />
            </DialogContent>
          </Dialog>
        </Card>

        {/* Shortcut to Manage Availability */}
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardTitle className="mb-4 text-lg">Manage My Availability</CardTitle>
          <CardDescription className="mb-4">Set and update your available time slots.</CardDescription>
          <Link href="/doctor-dashboard/availability" className="w-full">
            <Button className="w-full">
              <Clock className="mr-2 h-4 w-4" /> Manage Availability
            </Button>
          </Link>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity Feed (Your Patients)</CardTitle>
          <CardDescription>Latest actions and updates related to your patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-primary">Alice Johnson</span> booked an online appointment with{" "}
              <span className="font-medium text-primary">you</span>.
            </li>
            <li>
              <span className="font-medium text-primary">You</span> uploaded a new MRI report for{" "}
              <span className="font-medium text-primary">Bob Williams</span>.
            </li>
            <li>
              New prescription issued by <span className="font-medium text-primary">you</span> for{" "}
              <span className="font-medium text-primary">Charlie Brown</span>.
            </li>
            <li>
              Tumor Board for <span className="font-medium text-primary">Diana Miller</span> (primary doctor:{" "}
              <span className="font-medium text-primary">you</span>) scheduled for July 25th.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

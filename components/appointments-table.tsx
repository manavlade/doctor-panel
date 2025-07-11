import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Video } from "lucide-react" // Import Video icon

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  type: string
  dateTime: string
  status: string
  paymentStatus: string
  meetingLink?: string // New: Optional meeting link for online appointments
}

interface AppointmentsTableProps {
  appointments: Appointment[]
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.patientName}</TableCell>
            <TableCell>{appointment.doctorName}</TableCell>
            <TableCell>
              <Badge variant={appointment.type === "online" ? "secondary" : "outline"}>
                {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{appointment.dateTime}</TableCell>
            <TableCell>
              <Badge
                variant={
                  appointment.status === "booked"
                    ? "default"
                    : appointment.status === "completed"
                      ? "success"
                      : "destructive"
                }
              >
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  appointment.paymentStatus === "paid"
                    ? "default"
                    : appointment.paymentStatus === "pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {appointment.type === "online" &&
                (appointment.status === "booked" || appointment.status === "scheduled") &&
                appointment.meetingLink && (
                  <Button asChild size="sm" className="mr-2">
                    <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Video className="mr-1 h-4 w-4" /> Join
                    </a>
                  </Button>
                )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

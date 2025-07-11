import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TumorBoardsTable } from "@/components/tumor-boards-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TumorBoardForm } from "@/components/tumor-board-form"

export default function DoctorTumorBoardsPage() {
  // Simulate the current logged-in doctor
  const currentDoctorId = "doc1" // Dr. Emily White
  const currentDoctorName = "Dr. Emily White"

  // Dummy data for demonstration, filtered for tumor boards involving the current doctor
  const allTumorBoards = [
    {
      id: "tb1",
      patientName: "Alice Johnson",
      primaryDoctor: "Dr. Emily White",
      participatingDoctors: ["Dr. John Smith", "Dr. Sarah Lee"],
      meetingDateTime: "2025-07-20 09:00 AM",
      status: "scheduled",
      paymentStatus: "paid",
      meetingLink: "https://meet.google.com/xyz-123-abc",
      primaryDoctorId: "doc1", // Added for filtering
      participatingDoctorIds: ["doc2", "doc3"], // Added for filtering
    },
    {
      id: "tb2",
      patientName: "Bob Williams",
      primaryDoctor: "Dr. John Smith",
      participatingDoctors: ["Dr. Emily White"],
      meetingDateTime: "2025-07-22 01:00 PM",
      status: "pending",
      paymentStatus: "pending",
      primaryDoctorId: "doc2",
      participatingDoctorIds: ["doc1"],
    },
    {
      id: "tb3",
      patientName: "Diana Miller",
      primaryDoctor: "Dr. Emily White",
      participatingDoctors: [],
      meetingDateTime: "2025-07-25 10:30 AM",
      status: "completed",
      paymentStatus: "paid",
      meetingLink: "https://zoom.us/j/9876543210",
      primaryDoctorId: "doc1",
      participatingDoctorIds: [],
    },
    {
      id: "tb4",
      patientName: "Frank Green",
      primaryDoctor: "Dr. Sarah Lee",
      participatingDoctors: ["Dr. Emily White", "Dr. Michael Chen"],
      meetingDateTime: "2025-07-28 03:00 PM",
      status: "scheduled",
      paymentStatus: "pending",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
      primaryDoctorId: "doc3",
      participatingDoctorIds: ["doc1", "doc4"],
    },
  ]

  const doctorsTumorBoards = allTumorBoards.filter(
    (board) => board.primaryDoctorId === currentDoctorId || board.participatingDoctorIds.includes(currentDoctorId),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tumor Boards</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create New Tumor Board</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Tumor Board Meeting</DialogTitle>
              <DialogDescription>Schedule a new multidisciplinary tumor board meeting.</DialogDescription>
            </DialogHeader>
            {/* In a real app, you'd pre-fill the primaryDoctorId here */}
            <TumorBoardForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tumor Boards Involving {currentDoctorName}</CardTitle>
          <CardDescription>View and manage tumor board meetings you are involved in.</CardDescription>
        </CardHeader>
        <CardContent>
          <TumorBoardsTable tumorBoards={doctorsTumorBoards} />
        </CardContent>
      </Card>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientsTable } from "@/components/patients-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PatientForm } from "@/components/patient-form"

export default function DoctorPatientsPage() {
  // Simulate the current logged-in doctor
  const currentDoctorId = "doc1" // Dr. Emily White

  // Dummy data for demonstration, filtered for patients associated with the current doctor
  const allPatients = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      phone: "555-123-4567",
      dob: "1980-05-15",
      status: "Active",
      primaryDoctorId: "doc1",
    },
    {
      id: "2",
      name: "Bob Williams",
      email: "bob.w@example.com",
      phone: "555-987-6543",
      dob: "1975-11-22",
      status: "Active",
      primaryDoctorId: "doc2",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie.b@example.com",
      phone: "555-555-1212",
      dob: "1992-01-01",
      status: "Inactive",
      primaryDoctorId: "doc1",
    },
    {
      id: "4",
      name: "Diana Miller",
      email: "diana.m@example.com",
      phone: "555-111-2222",
      dob: "1968-07-30",
      status: "Active",
      primaryDoctorId: "doc1",
    },
    {
      id: "5",
      name: "Eve Davis",
      email: "eve.d@example.com",
      phone: "555-333-4444",
      dob: "1985-03-10",
      status: "Active",
      primaryDoctorId: "doc3",
    },
  ]

  const doctorsPatients = allPatients.filter((patient) => patient.primaryDoctorId === currentDoctorId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Patients</h1>
        {/* Doctors typically don't "add new patients" directly, but rather manage existing ones or accept referrals.
            Keeping the form for demonstration, but it might be removed or changed in a real app. */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Patient</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Fill in the details to register a new patient.</DialogDescription>
            </DialogHeader>
            <PatientForm />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Patients Under Your Care</CardTitle>
          <CardDescription>Manage patients assigned to you or under your primary care.</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientsTable patients={doctorsPatients} />
        </CardContent>
      </Card>
    </div>
  )
}

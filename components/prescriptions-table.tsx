import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface Prescription {
  id: string
  patientName: string
  doctorName: string
  datePrescribed: string
  medication: string // This will now represent a summary, e.g., "Multiple Medications"
  dosage: string // This will now represent a summary, e.g., "See details"
}

interface PrescriptionsTableProps {
  prescriptions: Prescription[]
}

export function PrescriptionsTable({ prescriptions }: PrescriptionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date Prescribed</TableHead>
          <TableHead>Medication</TableHead>
          <TableHead>Dosage</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.map((prescription) => (
          <TableRow key={prescription.id}>
            <TableCell className="font-medium">{prescription.patientName}</TableCell>
            <TableCell>{prescription.doctorName}</TableCell>
            <TableCell>{prescription.datePrescribed}</TableCell>
            <TableCell>{prescription.medication}</TableCell>
            <TableCell>{prescription.dosage}</TableCell>
            <TableCell className="text-right">
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
                  <DropdownMenuItem>Edit Prescription</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Print Prescription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

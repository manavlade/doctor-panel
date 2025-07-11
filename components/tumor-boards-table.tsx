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

interface TumorBoard {
  id: string
  patientName: string
  primaryDoctor: string
  participatingDoctors: string[]
  meetingDateTime: string
  status: string
  paymentStatus: string
  meetingLink?: string // New: Optional meeting link for tumor boards
}

interface TumorBoardsTableProps {
  tumorBoards: TumorBoard[]
}

export function TumorBoardsTable({ tumorBoards }: TumorBoardsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Primary Doctor</TableHead>
          <TableHead>Participants</TableHead>
          <TableHead>Meeting Date & Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tumorBoards.map((board) => (
          <TableRow key={board.id}>
            <TableCell className="font-medium">{board.patientName}</TableCell>
            <TableCell>{board.primaryDoctor}</TableCell>
            <TableCell>
              {board.participatingDoctors.length > 0 ? board.participatingDoctors.join(", ") : "N/A"}
            </TableCell>
            <TableCell>{board.meetingDateTime}</TableCell>
            <TableCell>
              <Badge
                variant={
                  board.status === "scheduled" ? "default" : board.status === "completed" ? "success" : "destructive"
                }
              >
                {board.status.charAt(0).toUpperCase() + board.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  board.paymentStatus === "paid"
                    ? "default"
                    : board.paymentStatus === "pending"
                      ? "secondary"
                      : "destructive"
                }
              >
                {board.paymentStatus.charAt(0).toUpperCase() + board.paymentStatus.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {board.status === "scheduled" && board.meetingLink && (
                <Button asChild size="sm" className="mr-2">
                  <a href={board.meetingLink} target="_blank" rel="noopener noreferrer">
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
                  <DropdownMenuItem>Manage Participants</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cancel Board</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

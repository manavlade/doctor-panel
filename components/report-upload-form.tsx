"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface ReportUploadFormProps {
  patientId: string
  patientName: string
}

export function ReportUploadForm({ patientId, patientName }: ReportUploadFormProps) {
  const [reportType, setReportType] = useState<string>("")
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState<string>("")
  const [file, setFile] = useState<File | null>(null)

  // Dummy data for doctors (assuming the doctor uploading is the current user or selected)
  const doctors = [
    { id: "doc1", name: "Dr. Emily White" },
    { id: "doc2", name: "Dr. John Smith" },
  ]
  const [doctorId, setDoctorId] = useState<string>(doctors[0]?.id || "") // Default to first doctor

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "File Missing",
        description: "Please select a report file to upload.",
        variant: "destructive",
      })
      return
    }

    // In a real application, you would upload the file and send other data to your backend
    console.log({
      patientId,
      doctorId,
      reportType,
      reportDate,
      notes,
      fileName: file.name,
      fileSize: file.size,
    })
    toast({
      title: "Report Uploaded!",
      description: `Report for ${patientName} (${reportType}) has been successfully uploaded.`,
    })
    // Reset form or close dialog
    setReportType("")
    setReportDate(new Date().toISOString().split("T")[0])
    setNotes("")
    setFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="patientName" className="md:text-right">
          Patient
        </Label>
        <Input id="patientName" value={patientName} readOnly className="md:col-span-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="doctor" className="md:text-right">
          Doctor
        </Label>
        <Select onValueChange={setDoctorId} value={doctorId}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doc) => (
              <SelectItem key={doc.id} value={doc.id}>
                {doc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="reportType" className="md:text-right">
          Report Type
        </Label>
        <Input
          id="reportType"
          placeholder="e.g., Lab Results, MRI Scan"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="reportDate" className="md:text-right">
          Date Generated
        </Label>
        <Input
          id="reportDate"
          type="date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="reportFile" className="md:text-right">
          Upload File
        </Label>
        <Input id="reportFile" type="file" onChange={handleFileChange} className="md:col-span-3" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="notes" className="md:text-right">
          Notes (Optional)
        </Label>
        <Textarea
          id="notes"
          placeholder="Any additional notes about the report"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <Button type="submit" className="col-span-full mt-6">
        Upload Report
      </Button>
    </form>
  )
}

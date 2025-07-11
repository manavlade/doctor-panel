"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, MinusCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Medication {
  id: string
  name: string
  dosage: string
  instructions: string
}

export function PrescriptionForm() {
  const [medications, setMedications] = useState<Medication[]>([{ id: "1", name: "", dosage: "", instructions: "" }])
  const [patientId, setPatientId] = useState<string>("")
  const [doctorId, setDoctorId] = useState<string>("")
  const [datePrescribed, setDatePrescribed] = useState<string>(new Date().toISOString().split("T")[0])

  // Dummy data for patients and doctors
  const patients = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Williams" },
    { id: "3", name: "Charlie Brown" },
  ]

  const doctors = [
    { id: "doc1", name: "Dr. Emily White" },
    { id: "doc2", name: "Dr. John Smith" },
    { id: "doc3", name: "Dr. Sarah Lee" },
  ]

  const handleAddMedication = () => {
    setMedications([...medications, { id: String(medications.length + 1), name: "", dosage: "", instructions: "" }])
  }

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id))
  }

  const handleMedicationChange = (id: string, field: keyof Medication, value: string) => {
    setMedications(medications.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({
      patientId,
      doctorId,
      datePrescribed,
      medications,
    })
    toast({
      title: "Prescription Added!",
      description: "The new prescription has been successfully recorded.",
    })
    // Reset form or close dialog
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="patient" className="md:text-right">
          Patient
        </Label>
        <Select onValueChange={setPatientId} value={patientId}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Select a patient" />
          </SelectTrigger>
          <SelectContent>
            {patients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="doctor" className="md:text-right">
          Doctor
        </Label>
        <Select onValueChange={setDoctorId} value={doctorId}>
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Select a doctor" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="datePrescribed" className="md:text-right">
          Date
        </Label>
        <Input
          id="datePrescribed"
          type="date"
          value={datePrescribed}
          onChange={(e) => setDatePrescribed(e.target.value)}
          className="md:col-span-3"
        />
      </div>

      <h3 className="text-lg font-semibold mt-4 col-span-4">Medications</h3>
      {medications.map((med, index) => (
        <div
          key={med.id}
          className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-t pt-4 first:border-t-0 first:pt-0"
        >
          <Label htmlFor={`medication-name-${med.id}`} className="md:text-right">
            Medication {index + 1}
          </Label>
          <Input
            id={`medication-name-${med.id}`}
            placeholder="Medication Name"
            value={med.name}
            onChange={(e) => handleMedicationChange(med.id, "name", e.target.value)}
            className="md:col-span-3"
          />
          <Label htmlFor={`dosage-${med.id}`} className="md:text-right">
            Dosage
          </Label>
          <Input
            id={`dosage-${med.id}`}
            placeholder="e.g., 100mg daily"
            value={med.dosage}
            onChange={(e) => handleMedicationChange(med.id, "dosage", e.target.value)}
            className="md:col-span-3"
          />
          <Label htmlFor={`instructions-${med.id}`} className="md:text-right">
            Instructions
          </Label>
          <Textarea
            id={`instructions-${med.id}`}
            placeholder="e.g., Take with food"
            value={med.instructions}
            onChange={(e) => handleMedicationChange(med.id, "instructions", e.target.value)}
            className="md:col-span-3"
          />
          {medications.length > 1 && (
            <div className="col-start-4 flex justify-end">
              <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveMedication(med.id)}>
                <MinusCircle className="h-4 w-4" />
                <span className="sr-only">Remove Medication</span>
              </Button>
            </div>
          )}
        </div>
      ))}
      <div className="col-span-full flex justify-end">
        <Button type="button" variant="outline" onClick={handleAddMedication}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Another Medication
        </Button>
      </div>

      <Button type="submit" className="col-span-full mt-6">
        Create Prescription
      </Button>
    </form>
  )
}

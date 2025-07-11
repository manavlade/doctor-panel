"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function PatientForm() {
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [medicalHistory, setMedicalHistory] = useState<string>("")
  const [primaryDoctorId, setPrimaryDoctorId] = useState<string>("")

  // Dummy data for doctors
  const doctors = [
    { id: "doc1", name: "Dr. Emily White" },
    { id: "doc2", name: "Dr. John Smith" },
    { id: "doc3", name: "Dr. Sarah Lee" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({
      fullName,
      email,
      phone,
      dateOfBirth,
      address,
      medicalHistory,
      primaryDoctorId: primaryDoctorId === "" ? null : primaryDoctorId, // Send null if no doctor is selected
    })
    toast({
      title: "Patient Added!",
      description: `${fullName} has been successfully registered.`,
    })
    // Reset form or close dialog
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="fullName" className="md:text-right">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="Jane Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="md:text-right">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jane.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="md:col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="md:text-right">
          Phone
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="555-123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="dateOfBirth" className="md:text-right">
          Date of Birth
        </Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="md:text-right">
          Address
        </Label>
        <Textarea
          id="address"
          placeholder="123 Main St, Anytown, USA"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="medicalHistory" className="md:text-right">
          Medical History
        </Label>
        <Textarea
          id="medicalHistory"
          placeholder="Brief medical history, e.g., allergies, past surgeries, chronic conditions"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          className="md:col-span-3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
        <Label htmlFor="primaryDoctor" className="md:text-right">
          Primary Doctor (Optional)
        </Label>
        <Select
          onValueChange={(selectedValue) => {
            if (selectedValue === "unassigned-doctor") {
              setPrimaryDoctorId("")
            } else {
              setPrimaryDoctorId(selectedValue)
            }
          }}
          value={primaryDoctorId === "" ? "unassigned-doctor" : primaryDoctorId}
        >
          <SelectTrigger className="md:col-span-3">
            <SelectValue placeholder="Assign primary doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned-doctor">None</SelectItem>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="col-span-full mt-6">
        Add Patient
      </Button>
    </form>
  )
}

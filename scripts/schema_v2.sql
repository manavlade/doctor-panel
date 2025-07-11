-- Add primary_doctor_id to patients table
ALTER TABLE patients
ADD COLUMN primary_doctor_id UUID,
ADD CONSTRAINT fk_primary_doctor
FOREIGN KEY (primary_doctor_id) REFERENCES doctors(id) ON DELETE SET NULL;

-- Remove medication_details and dosage from prescriptions table
ALTER TABLE prescriptions
DROP COLUMN medication_details,
DROP COLUMN dosage;

-- Create a new table for individual medications within a prescription
CREATE TABLE prescription_medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL,
    medication_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(255),
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
);

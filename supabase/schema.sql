-- ============================================================================
-- AURA DERM CLINIC — Beverly Hills Aesthetic Treatment Wizard OS
-- Supabase PostgreSQL Schema with Row Level Security (RLS)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PATIENTS
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  dob DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TREATMENTS
CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  anatomical_zone TEXT NOT NULL CHECK (anatomical_zone IN ('upper', 'mid', 'lower', 'laser')),
  base_price NUMERIC(10,2) NOT NULL,
  downtime_hours INTEGER NOT NULL DEFAULT 0,
  dosage_units TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INTAKE QUESTIONNAIRES
CREATE TABLE IF NOT EXISTS intake_questionnaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  has_previous_filler BOOLEAN NOT NULL DEFAULT FALSE,
  is_pregnant_or_nursing BOOLEAN NOT NULL DEFAULT FALSE,
  has_active_cold_sores BOOLEAN NOT NULL DEFAULT FALSE,
  has_blood_thinners BOOLEAN NOT NULL DEFAULT FALSE,
  primary_aesthetic_goal TEXT,
  emr_cleared BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRACTITIONER SCHEDULES & CONSULTS
CREATE TABLE IF NOT EXISTS practitioner_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practitioner_name TEXT NOT NULL,
  medical_credential TEXT NOT NULL,
  consult_fee NUMERIC(10,2) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public treatments view" ON treatments FOR SELECT USING (true);
CREATE POLICY "Public practitioner view" ON practitioner_schedules FOR SELECT USING (true);
CREATE POLICY "Public intake insert" ON intake_questionnaires FOR INSERT WITH CHECK (true);
CREATE POLICY "Public patients insert" ON patients FOR INSERT WITH CHECK (true);

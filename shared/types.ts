export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  lastVisit: string;
}

export interface Biomarker {
  id: string;
  patientId: Patient["id"];
  name: string;
  value: number;
  unit: string;
  category: "metabolic" | "cardiovascular" | "hormonal";
  referenceRange: { min: number; max: number };
  measuredAt: string;
  status: "normal" | "high" | "low";
}

import axios from "axios";
import type { Patient, Biomarker } from "../../../shared/types";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchPatients = () => api.get<Patient[]>("/patients");
export const fetchBiomarkers = (
  patientId: string,
  category?: Biomarker["category"]
) =>
  api.get<Biomarker[]>(`/patients/${patientId}/biomarkers`, {
    params: { category },
  });

export const getAIAnalysis = (patientId: string, biomarkers: Biomarker[]) =>
  api.post("/mcp/analyze", { patientId, biomarkers });

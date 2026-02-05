import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PatientDetail } from "../components/PatientDetail";
import { AIInsights } from "../components/AIInsights";
import type { Biomarker } from "../../../shared/types";

export const PatientDetailPage = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const [currentBiomarkers, setCurrentBiomarkers] = useState<Biomarker[]>([]);

  if (!patientId) return <div>Patient not found.</div>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <header>
        <Link to="/patients">← Back to Patient List</Link>
      </header>

      <PatientDetail
        patientId={patientId}
        onDataUpdate={(data) => setCurrentBiomarkers(data)}
      />

      <div
        style={{
          marginTop: "40px",
          borderTop: "1px solid #eee",
          paddingTop: "20px",
        }}
      >
        <AIInsights patientId={patientId} biomarkers={currentBiomarkers} />
      </div>
    </div>
  );
};

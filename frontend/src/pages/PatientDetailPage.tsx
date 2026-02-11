import { useCallback, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { PatientDetail } from "../components/PatientDetail";
import { AIInsights } from "../components/AIInsights";
import type { Biomarker } from "../../../shared/types";
import { ROUTES } from "../constants/router";
import StyledPageDivider from "./PageDivider.styled";

const StyledPatientDetailPage = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  .back-link {
    display: inline-block;
    margin-bottom: 20px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0069d9;
    }
  }
`;

export const PatientDetailPage = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const [currentBiomarkers, setCurrentBiomarkers] = useState<Biomarker[]>([]);

  const handleDataUpdate = useCallback((data: Biomarker[]) => {
    setCurrentBiomarkers(data);
  }, []);

  if (!patientId) return <div>Patient not found.</div>;

  return (
    <StyledPatientDetailPage>
      <header>
        <Link className="back-link" to={ROUTES.PATIENTS}>
          ← Back to Patient List
        </Link>
      </header>

      <PatientDetail patientId={patientId} onDataUpdate={handleDataUpdate} />

      <StyledPageDivider></StyledPageDivider>
      <AIInsights patientId={patientId} biomarkers={currentBiomarkers} />
    </StyledPatientDetailPage>
  );
};

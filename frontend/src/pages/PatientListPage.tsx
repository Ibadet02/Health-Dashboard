import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchPatients } from "../api/client";
import type { Patient } from "../../../shared/types";

const StyledPatientListPage = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .patient-list {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }

  .patient-list li {
    margin-bottom: 10px;
  }

  .patient-list a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #0069d9;
    }
  }
`;

export const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients().then((res) => setPatients(res.data));
  }, []);

  return (
    <StyledPatientListPage>
      <h1>Patient Directory</h1>
      <ul className="patient-list">
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
          </li>
        ))}
      </ul>
    </StyledPatientListPage>
  );
};

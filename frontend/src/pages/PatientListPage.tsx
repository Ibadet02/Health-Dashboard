import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPatients } from "../api/client";
import type { Patient } from "../../../shared/types";

export const PatientListPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients().then((res) => setPatients(res.data));
  }, []);

  return (
    <div>
      <h1>Patient Directory</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

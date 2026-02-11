import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { fetchBiomarkers } from "../api/client";
import type { Biomarker } from "../../../shared/types";
import { displayTableWarning, getStatusColor } from "../utils";
import CustomSelect from "./CustomSelect";
import CATEGORIES, { type Category } from "../constants/categories";

const StyledPatientDetail = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .live-update-button {
    background-color: #ccc;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &.live {
      background-color: #4caf50;
    }
  }

  .form-group {
    margin-bottom: 30px;
    justify-self: flex-start;
  }

  .biomarker-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    text-align: left;
  }

  .biomarker-header-row {
    border-bottom: 2px solid #ccc;
  }

  .biomarker-row {
    border-bottom: 1px solid #eee;
    height: 40px;
  }

  .status {
    font-weight: bold;
    text-transform: capitalize;
  }
`;

interface PatientDetailProps {
  patientId: string;
  onDataUpdate?: (data: Biomarker[]) => void;
}

export const PatientDetail = ({
  patientId,
  onDataUpdate,
}: PatientDetailProps) => {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category["value"]>("all");
  const [liveUpdate, setLiveUpdate] = useState(false);

  const loadData = useCallback(
    async (isSilent: boolean = false) => {
      if (!isSilent) setLoading(true);
      setError(null);
      try {
        const response = await fetchBiomarkers(
          patientId,
          category === "all" ? undefined : category
        );

        if (!response.data) {
          setBiomarkers([]);
          return;
        }
        setBiomarkers(response.data);
        if (onDataUpdate) onDataUpdate(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    },
    [patientId, category, onDataUpdate]
  );

  useEffect(() => {
    const initialize = async () => {
      await loadData();
    };

    initialize();
  }, [loadData, patientId, category]);

  useEffect(() => {
    if (!liveUpdate) return;

    const interval = setInterval(() => {
      loadData(true);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [liveUpdate, loadData]);

  const handleLiveUpdate = () => {
    setLiveUpdate((prev) => !prev);
  };

  const renderBodyContent = () => {
    if (loading) return displayTableWarning("Loading biomarker data...");

    if (error) return displayTableWarning(`Error: ${error}`);

    if (!biomarkers.length)
      return displayTableWarning("No biomarkers found for this category.");

    return (
      <>
        {biomarkers.map((marker) => (
          <tr className="biomarker-row" key={marker.id}>
            <td>
              <strong>{marker.name}</strong>
            </td>
            <td>{marker.value}</td>
            <td>{marker.unit}</td>
            <td>
              {marker.referenceRange.min} - {marker.referenceRange.max}
            </td>
            <td
              className="status"
              style={{
                color: getStatusColor(marker.status),
              }}
            >
              {marker.status}
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <StyledPatientDetail>
      <div className="header">
        <h2>Biomarker Analysis</h2>
        <button
          className={`live-update-button${liveUpdate ? " live" : ""}`}
          onClick={handleLiveUpdate}
        >
          {liveUpdate ? "Live: ON" : "Live: OFF"}
        </button>
      </div>

      <div className="form-group">
        <CustomSelect
          currentValue={category}
          setValue={setCategory}
          menuItems={CATEGORIES}
          selectLabel="Category"
        />
      </div>

      <table className="biomarker-table">
        <thead>
          <tr className="biomarker-header-row">
            <th>Name</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Reference Range</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderBodyContent()}</tbody>
      </table>
    </StyledPatientDetail>
  );
};

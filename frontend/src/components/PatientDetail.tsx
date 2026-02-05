import { useState, useEffect, useCallback } from "react";
import { fetchBiomarkers } from "../api/client";
import type { Biomarker } from "../../../shared/types";
import { getStatusColor } from "../utils";

interface PatientDetailProps {
  patientId: string;
  onDataUpdate?: (data: Biomarker[]) => void;
}

export const PatientDetail = ({
  patientId,
  onDataUpdate,
}: PatientDetailProps) => {
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [category, setCategory] = useState<Biomarker["category"] | "all">(
    "all"
  );

  const loadData = useCallback(async () => {
    try {
      const response = await fetchBiomarkers(
        patientId,
        category === "all" ? undefined : category
      );
      setBiomarkers(response.data);
      if (onDataUpdate) onDataUpdate(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }, [patientId, category, onDataUpdate]);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      await loadData();
    };

    initialize();

    const interval = setInterval(() => {
      if (isMounted) loadData();
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [patientId, category, loadData]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Biomarker Analysis</h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="category-select">Filter by Category: </label>
        <select
          id="category-select"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as Biomarker["category"] | "all")
          }
          style={{ padding: "5px", borderRadius: "4px" }}
        >
          <option value="all">All Categories</option>
          <option value="metabolic">Metabolic</option>
          <option value="cardiovascular">Cardiovascular</option>
          <option value="hormonal">Hormonal</option>
        </select>
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th>Name</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Reference Range</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {biomarkers.length > 0 ? (
            biomarkers.map((marker) => (
              <tr
                key={marker.id}
                style={{ borderBottom: "1px solid #eee", height: "40px" }}
              >
                <td>
                  <strong>{marker.name}</strong>
                </td>
                <td>{marker.value}</td>
                <td>{marker.unit}</td>
                <td>
                  {marker.referenceRange.min} - {marker.referenceRange.max}
                </td>
                <td
                  style={{
                    color: getStatusColor(marker.status),
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {marker.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                No biomarkers found for this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

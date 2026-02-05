import { useState } from "react";
import axios from "axios";
import type { Biomarker } from "../../../shared/types";

interface Props {
  patientId: string;
  biomarkers: Biomarker[];
}

export const AIInsights = ({ patientId, biomarkers }: Props) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/patients/${patientId}/ai-insights`,
        {
          biomarkers,
        }
      );
      setInsights(response.data.insights);
    } catch (err) {
      setError("Could not connect to the AI Analysis server: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Agentic AI Assistant</h3>

      {!insights && !loading && (
        <button
          onClick={getInsights}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Get AI Insights
        </button>
      )}

      {loading && (
        <div style={{ color: "#666" }}>AI is analyzing biomarker data...</div>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}

      {insights && (
        <div style={{ lineHeight: "1.6" }}>
          <p>
            <strong>Analysis:</strong>
          </p>
          <div
            style={{
              padding: "15px",
              backgroundColor: "#fff",
              borderLeft: "4px solid #007bff",
              fontStyle: "italic",
            }}
          >
            {insights}
          </div>
          <button
            onClick={() => setInsights(null)}
            style={{
              marginTop: "10px",
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear Analysis
          </button>
        </div>
      )}
    </div>
  );
};

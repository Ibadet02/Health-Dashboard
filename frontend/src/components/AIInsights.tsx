import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import type { Biomarker } from "../../../shared/types";

const StyledAIInsights = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;

  .header {
    margin-top: 0;
  }

  .get-insights-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0069d9;
    }
  }

  .loading {
    margin-top: 10px;
    color: #666;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }

  .error {
    margin-top: 10px;
    color: red;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }

  .insights {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    line-height: 1.6;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .insights-content {
    padding: 15px;
    background-color: #fff;
    border-left: 4px solid #007bff;
    font-style: italic;
  }

  .clear-insights-button {
    display: block;
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #b22e36;
    }
  }
`;

interface Props {
  patientId: string;
  biomarkers: Biomarker[];
}

export const AIInsights = ({ patientId, biomarkers }: Props) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
      console.error("Failed to generate the AI Analysis");
      setError("Could not connect to the AI Analysis server: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledAIInsights>
      <h3 className="header">Agentic AI Assistant</h3>

      {!insights && !loading && (
        <button className="get-insights-button" onClick={getInsights}>
          Get AI Insights
        </button>
      )}

      {loading && (
        <div className="loading">AI is analyzing biomarker data...</div>
      )}

      {error && <div className="error">{error}</div>}

      {insights && (
        <div className="insights">
          <p>
            <strong>Analysis:</strong>
          </p>
          <div className="insights-content">{insights}</div>
          <button
            className="clear-insights-button"
            onClick={() => setInsights(null)}
          >
            Clear Analysis
          </button>
        </div>
      )}
    </StyledAIInsights>
  );
};

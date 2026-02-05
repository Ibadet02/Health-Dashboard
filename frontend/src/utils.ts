import type { Biomarker } from "../../shared/types";

export const getStatusColor = (status: Biomarker["status"]) => {
  switch (status.toLowerCase()) {
    case "high":
      return "red";
    case "low":
      return "orange";
    case "normal":
      return "green";
    default:
      return "black";
  }
};

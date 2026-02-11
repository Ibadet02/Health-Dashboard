import { createBrowserRouter, Navigate } from "react-router-dom";
import { PatientDetailPage } from "../pages/PatientDetailPage";
import { PatientListPage } from "../pages/PatientListPage";

export const ROUTES = {
  ROOT: "/",
  PATIENTS: "/patients",
  DETAILS: "/patients/:patientId",
};

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.PATIENTS} replace />,
  },
  {
    path: ROUTES.PATIENTS,
    element: <PatientListPage />,
  },
  {
    path: ROUTES.DETAILS,
    element: <PatientDetailPage />,
  },
]);

export default router;
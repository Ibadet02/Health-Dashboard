import { createBrowserRouter, Navigate } from "react-router-dom";
import { PatientDetailPage } from "../pages/PatientDetailPage";
import { PatientListPage } from "../pages/PatientListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/patients" replace />,
  },
  {
    path: "/patients",
    element: <PatientListPage />,
  },
  {
    path: "/patients/:patientId",
    element: <PatientDetailPage />,
  },
]);

export default router;
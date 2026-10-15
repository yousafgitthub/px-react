import { Navigate } from "react-router-dom";

/** Legacy path — PropX Reports lives at /tenant/reports. */
function SlicerReport() {
  return <Navigate to="/tenant/reports" replace />;
}

export default SlicerReport;

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/useAuth";
import {
  GuestOnly,
  RequireAuth,
  RequireSuperAdmin,
  RequireTenant,
} from "./components/routing/ProtectedRoute";
import TenantLayout from "./components/tenant/TenantLayout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Overview from "./pages/tenant/Overview";
import Jobs from "./pages/tenant/Jobs";
import MapView from "./pages/tenant/MapView";
import BoxManagement from "./pages/tenant/BoxManagement";
import SlicerReport from "./pages/tenant/SlicerReport";
import Reports from "./pages/tenant/Reports";
import Carrier from "./pages/tenant/Carrier";
import PoTracker from "./pages/tenant/PoTracker";
import Settings from "./pages/tenant/Settings";
import Help from "./pages/tenant/Help";

function HomeRedirect() {
  const { isAuthenticated, homePath } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={homePath} replace />;
}

function App() {
  const { logout } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />

      <Route
        path="/admin/*"
        element={
          <RequireSuperAdmin>
            <Dashboard onLogout={logout} />
          </RequireSuperAdmin>
        }
      />

      <Route
        path="/tenant"
        element={
          <RequireTenant>
            <TenantLayout />
          </RequireTenant>
        }
      >
        <Route index element={<Overview />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="map" element={<MapView />} />
        <Route path="box-management" element={<BoxManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="slicer-report" element={<SlicerReport />} />
        <Route path="carrier" element={<Carrier />} />
        <Route path="po-tracker" element={<PoTracker />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate to="/tenant/" replace />} />
      </Route>

      <Route
        path="*"
        element={
          <RequireAuth>
            <HomeRedirect />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;

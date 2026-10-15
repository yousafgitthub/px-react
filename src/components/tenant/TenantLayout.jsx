import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TenantSidebar from "./TenantSidebar";
import Header from "../dashboard/Header";
import { useAuth } from "../../auth/useAuth";
import "../../css/dashboard.css";

const PAGE_TITLES = {
  jobs: "Jobs",
  map: "Map",
  "box-management": "Box Management",
  reports: "Reports",
  "slicer-report": "Reports",
  carrier: "Carrier",
  "po-tracker": "PO Tracker",
  settings: "Company Settings",
  help: "Help",
};

function TenantLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.pathname.includes("/tenant/jobs") ||
        window.location.pathname.includes("/tenant/box-management") ||
        window.location.pathname.includes("/tenant/reports") ||
        window.location.pathname.includes("/tenant/slicer-report") ||
        window.location.pathname.includes("/tenant/carrier") ||
        window.location.pathname.includes("/tenant/po-tracker") ||
        window.location.pathname.includes("/tenant/settings"))
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const normalizedPath =
    location.pathname.endsWith("/") && location.pathname !== "/tenant/"
      ? location.pathname.slice(0, -1)
      : location.pathname;

  const isJobsWorkspace = normalizedPath === "/tenant/jobs";
  const isCarrierWorkspace = normalizedPath === "/tenant/carrier";
  const isPoTrackerWorkspace = normalizedPath === "/tenant/po-tracker";
  const isBoxWorkspace = normalizedPath === "/tenant/box-management";
  const isSettingsWorkspace = normalizedPath === "/tenant/settings";
  const isReportsWorkspace =
    normalizedPath === "/tenant/reports" ||
    normalizedPath === "/tenant/slicer-report";
  const isImmersiveWorkspace =
    isJobsWorkspace ||
    isCarrierWorkspace ||
    isPoTrackerWorkspace ||
    isBoxWorkspace ||
    isSettingsWorkspace ||
    isReportsWorkspace;
  const activePage =
    normalizedPath === "/tenant" || normalizedPath === "/tenant/"
      ? "dashboard"
      : normalizedPath.replace(/^\/tenant\/?/, "") || "dashboard";

  const changePage = (page) => {
    if (page === "dashboard") {
      navigate("/tenant/");
      return;
    }
    navigate(`/tenant/${page}`);
  };

  return (
    <div
      className={`admin-layout ${sidebarOpen ? "sidebar-open" : ""} ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      } ${
        isJobsWorkspace || isCarrierWorkspace || isPoTrackerWorkspace
          ? "jobs-workspace-layout"
          : ""
      } ${
        isBoxWorkspace || isSettingsWorkspace ? "box-workspace-layout" : ""
      } ${isReportsWorkspace ? "reports-workspace-layout" : ""}`}
    >
      <TenantSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        onNavigate={(path) => {
          setSidebarOpen(false);
          if (
            typeof path === "string" &&
            (path.includes("/tenant/jobs") ||
              path.includes("/tenant/carrier") ||
              path.includes("/tenant/po-tracker") ||
              path.includes("/tenant/box-management") ||
              path.includes("/tenant/settings") ||
              path.includes("/tenant/reports") ||
              path.includes("/tenant/slicer-report"))
          ) {
            setSidebarCollapsed(true);
          }
        }}
      />

      <div className={`admin-main ${isImmersiveWorkspace ? "jobs-main" : ""}`}>
        {!isImmersiveWorkspace && (
          <Header
            activePage={activePage}
            pageTitles={PAGE_TITLES}
            changePage={changePage}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onLogout={logout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

        <div className={isImmersiveWorkspace ? "jobs-outlet" : undefined}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TenantLayout;

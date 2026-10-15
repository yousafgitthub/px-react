import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const NAV_ITEMS = [
  { to: "/tenant/", label: "Dashboard", icon: "fa-dashboard", end: true, permission: "tenant.overview" },
  { to: "/tenant/jobs", label: "Jobs", icon: "fa-briefcase", permission: "tenant.jobs" },
  { to: "/tenant/map", label: "Map", icon: "fa-map-marker", permission: "tenant.map" },
  { to: "/tenant/box-management", label: "Box Management", icon: "fa-cube", permission: "tenant.box-management" },
  // Directly after Box Management (matches PropX Reports rail position)
  {
    to: "/tenant/reports",
    label: "Reports",
    icon: "fa-bar-chart",
    permission: ["tenant.reports", "tenant.slicer-report"],
  },
  { to: "/tenant/carrier", label: "Carrier", icon: "fa-truck", permission: "tenant.carrier" },
  { to: "/tenant/po-tracker", label: "PO Tracker", icon: "fa-clipboard", permission: "tenant.po-tracker" },
  { to: "/tenant/settings", label: "Company Settings", icon: "fa-cog", permission: "tenant.settings" },
  { to: "/tenant/help", label: "Help", icon: "fa-life-ring", permission: "tenant.help" },
];

function canSeeNavItem(item, hasPermission) {
  if (!item.permission) {
    return true;
  }
  if (Array.isArray(item.permission)) {
    return item.permission.some((permission) => hasPermission(permission));
  }
  return hasPermission(item.permission);
}

function TenantSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  onNavigate,
}) {
  const { user, hasPermission, logout } = useAuth();

  const visibleItems = NAV_ITEMS.filter((item) =>
    canSeeNavItem(item, hasPermission)
  );

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <img
          className="sidebar-logo-full"
          src="/login-images/sidebar-logo.png"
          alt="PropX Connect"
        />
        <img
          className="sidebar-logo-mark"
          src="/login-images/sidebar-logo-mark.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <nav className="sidebar-menu" aria-label="Tenant navigation">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
            onClick={() => onNavigate?.(item.to)}
          >
            <i className={`fa ${item.icon}`} aria-hidden="true"></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom tenant-sidebar-user">
        <div className="user-info tenant-sidebar-user-info">
          <div className="user-avatar">
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
          <span>{user?.displayName || "Tenant User"}</span>
        </div>

        <button
          type="button"
          className="map-email-button"
          onClick={logout}
          title="Logout"
        >
          <i className="fa fa-power-off" aria-hidden="true"></i>
          <span>Logout</span>
        </button>
      </div>

      <button
        type="button"
        className="sidebar-collapse-button"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label={
          sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
        }
      >
        <i
          className={`fa ${
            sidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"
          }`}
          aria-hidden="true"
        ></i>
      </button>
    </aside>
  );
}

export default TenantSidebar;

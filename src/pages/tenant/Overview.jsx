import UserDataTable from "../../components/UserDataTable";
import { useAuth } from "../../auth/useAuth";

const TENANT_STATS = [
  {
    key: "jobs",
    label: "TOTAL JOBS",
    icon: "fa-line-chart",
  },
  {
    key: "active",
    label: "ACTIVE JOBS",
    icon: "fa-briefcase",
  },
  {
    key: "carriers",
    label: "CARRIERS",
    icon: "fa-truck",
  },
  {
    key: "po",
    label: "PENDING PO ITEMS",
    icon: "fa-file-text",
  },
];

const ACTIVITY_COLUMNS = [
  { key: "index", label: "#" },
  { key: "title", label: "Title" },
  { key: "hits", label: "Hits" },
  { key: "status", label: "Status" },
];

function Overview() {
  const { user } = useAuth();

  return (
    <main className="admin-users-page tenant-overview-page">
      <div className="tenant-dashboard-note">
        Welcome, {user?.displayName || "Tenant User"}
        {user?.tenant?.name ? ` — ${user.tenant.name}` : ""}.
        Metrics stay unavailable until tenant APIs are connected.
      </div>

      <div className="stats-grid">
        {TENANT_STATS.map((stat) => (
          <div className="stat-card" key={stat.key}>
            <div className="stat-card-top">
              <div className="stat-icon">
                <i className={`fa ${stat.icon}`} aria-hidden="true"></i>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>

            <div className="stat-number">—</div>

            <div className="stat-footer">
              <span className="stat-status">Unavailable</span>
              <span>no API data</span>
            </div>
          </div>
        ))}
      </div>

      <UserDataTable
        title="Recent Activity"
        rows={[]}
        columns={ACTIVITY_COLUMNS}
        showActions={false}
        emptyMessage="No recent activity available for this tenant."
        tableClassName="admin-users-table"
        wrapperClassName="admin-users-table-wrapper"
      />
    </main>
  );
}

export default Overview;

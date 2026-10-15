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

function Overview() {
  const { user } = useAuth();

  return (
    <main className="dashboard-content">
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

      <div className="coming-soon-card">
        <div className="coming-soon-header">
          <div>
            <h3>Recent Activity</h3>
          </div>
        </div>

        <div className="coming-soon-table-wrapper">
          <table className="coming-soon-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Hits</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="tenant-empty-table-cell">
                  No recent activity available for this tenant.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Overview;

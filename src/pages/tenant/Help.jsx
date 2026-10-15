function Help() {
  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h2>Help</h2>
      </div>

      <div className="admin-users-card">
        <div className="admin-users-card-header">
          <h3>Tenant workspace</h3>
        </div>
        <div className="tenant-module-empty" style={{ textAlign: "left" }}>
          <p>
            Use Dashboard for a high-level view and Jobs for the three-panel
            jobs workspace. Other menu items remain available for parity with
            PropX Connect and will activate when their APIs are connected.
          </p>
          <p>
            Contact your PropX administrator if you need additional access or
            a different tenant assignment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;

import { useAuth } from "../../auth/useAuth";

function Settings() {
  const { user } = useAuth();

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h2>Company Settings</h2>
      </div>

      <div className="admin-users-card">
        <div className="admin-users-card-header">
          <h3>Company profile</h3>
        </div>

        <div className="jobs-detail-body">
          <div className="jobs-detail-grid">
            <label>
              <span>Company</span>
              <input type="text" value={user?.tenant?.name || ""} readOnly />
            </label>
            <label>
              <span>Tenant ID</span>
              <input type="text" value={user?.tenant?.id || ""} readOnly />
            </label>
            <label>
              <span>User</span>
              <input type="text" value={user?.displayName || ""} readOnly />
            </label>
            <label>
              <span>Email</span>
              <input type="text" value={user?.email || ""} readOnly />
            </label>
            <label>
              <span>Role</span>
              <input type="text" value={user?.role || ""} readOnly />
            </label>
            <label>
              <span>Account type</span>
              <input type="text" value={user?.accountType || ""} readOnly />
            </label>
          </div>
          <p className="jobs-detail-source">
            Values come from the authenticated session. Editable company
            settings require a tenant profile API.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;

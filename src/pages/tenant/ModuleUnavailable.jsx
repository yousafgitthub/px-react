function ModuleUnavailable({ title, description }) {
  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h2>{title}</h2>
      </div>

      <div className="admin-users-card">
        <div className="admin-users-card-header">
          <h3>{title}</h3>
        </div>
        <div className="tenant-module-empty">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
          <p>{description}</p>
          <span className="admin-status-inactive">No API connected</span>
        </div>
      </div>
    </div>
  );
}

export default ModuleUnavailable;

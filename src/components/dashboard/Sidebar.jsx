function Sidebar({
    activePage,
    changePage,
    sidebarCollapsed,
    setSidebarCollapsed,
    userManagementOpen,
    setUserManagementOpen,
    companiesOpen,
    setCompaniesOpen,
}) {
    return (
        <aside className="admin-sidebar">

            <div className="sidebar-logo">
                <img
                    src="/login-images/sidebar-logo.png"
                    alt="PropX Admin"
                />
            </div>

            <nav className="sidebar-menu">

                <a
                    href="#"
                    className={`sidebar-item ${activePage === "dashboard" ? "active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        changePage("dashboard");
                    }}
                >
                    <i className="fa fa-dashboard"></i>
                    <span>Dashboard</span>
                </a>

                {/* Tenant Company */}
                <div className="sidebar-group">

                    <button
                        className="sidebar-item sidebar-parent"
                        onClick={() => setCompaniesOpen(!companiesOpen)}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa fa-building"></i>
                            <span>Tenant Company</span>
                        </span>

                        <i
                            className={`fa fa-chevron-down sidebar-arrow ${companiesOpen ? "open" : ""}`}
                        ></i>
                    </button>

                    {companiesOpen && (
                        <div className="sidebar-submenu">

                            <a
                                href="/tenant-company"
                                className={`sidebar-subitem ${activePage === "tenant-company" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("tenant-company");
                                }}
                            >
                                Tenant Company
                            </a>

                            <a
                                href="/carrier-company"
                                className={`sidebar-subitem ${activePage === "carrier-company" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("carrier-company");
                                }}
                            >
                                Carrier Company
                            </a>

                        </div>
                    )}

                </div>

                {/* User Management */}
                <div className="sidebar-group">

                    <button
                        className="sidebar-item sidebar-parent"
                        onClick={() => setUserManagementOpen(!userManagementOpen)}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa fa-users"></i>
                            <span>User Management</span>
                        </span>

                        <i
                            className={`fa fa-chevron-down sidebar-arrow ${
                                userManagementOpen ? "open" : ""
                            }`}
                        ></i>
                    </button>

                    {userManagementOpen && (
                        <div className="sidebar-submenu">

                            <a
                                href="/admin-users"
                                className={`sidebar-subitem ${activePage === "admin-users" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("admin-users");
                                }}
                            >
                                PD Admin Users
                            </a>

                            <a
                                href="/tanent-users"
                                className={`sidebar-subitem ${activePage === "tanent-users" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("tanent-users");
                                }}
                            >
                                Tanent Users
                            </a>

                            <a
                                href="/carrier-users"
                                className={`sidebar-subitem ${activePage === "carrier-users" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("carrier-users");
                                }}
                            >
                                Carrier Users
                            </a>

                            <a
                                href="/driver-users"
                                className={`sidebar-subitem ${activePage === "driver-users" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("driver-users");
                                }}
                            >
                                Driver Users
                            </a>

                            <a
                                href="#"
                                className="sidebar-subitem"
                            >
                                Roles
                            </a>

                        </div>
                    )}

                </div>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-cube"></i>
                    <span>Box Management</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-shopping-bag"></i>
                    <span>Products</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-map-marker"></i>
                    <span>Locations</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-cog"></i>
                    <span>System Configuration</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-file-text"></i>
                    <span>System Reports</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa-solid fa-file-signature"></i>
                    <span>Paperless</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-life-ring"></i>
                    <span>Support Tickets</span>
                </a>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-code"></i>
                    <span>API Settings</span>
                </a>

                {/* Profile Settings */}
                <div className="sidebar-group">

                    <button
                        type="button"
                        className={`sidebar-item sidebar-parent ${
                            activePage === "profile-settings" ? "active" : ""
                        }`}
                        onClick={() => changePage("profile-settings")}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa fa-user"></i>
                            <span>Profile Settings</span>
                        </span>
                    </button>

                </div>

            </nav>

            <div className="sidebar-bottom">
                <button className="map-email-button">
                    <i className="fa fa-envelope"></i>
                    <span>Map Email</span>
                </button>
            </div>

            <button
                type="button"
                className="sidebar-collapse-button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label={
                    sidebarCollapsed
                        ? "Expand sidebar"
                        : "Collapse sidebar"
                }
            >
                <i
                    className={`fa ${
                        sidebarCollapsed
                            ? "fa-chevron-right"
                            : "fa-chevron-left"
                    }`}
                ></i>
            </button>

        </aside>
    );
}

export default Sidebar;
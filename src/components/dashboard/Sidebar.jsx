function Sidebar({
    activePage,
    changePage,
    sidebarCollapsed,
    setSidebarCollapsed,
    userManagementOpen,
    setUserManagementOpen,
    companiesOpen,
    setCompaniesOpen,
    locationOpen,
    setLocationOpen,
    productOpen,
    setProductOpen,
    boxDashboardOpen,
    setBoxDashboardOpen,
    reportsOpen,
    setReportsOpen,
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
                            <span>Companies</span>
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

               {/* Boxes Management */}

               <div className="sidebar-group">

                    <button
                        className="sidebar-item sidebar-parent"
                        onClick={() => setBoxDashboardOpen(!boxDashboardOpen)}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa-solid fa-box"></i>
                            <span>Box Management</span>
                        </span>

                        <i
                            className={`fa fa-chevron-down sidebar-arrow ${
                                boxDashboardOpen ? "open" : ""
                            }`}
                        ></i>
                    </button>

                    {boxDashboardOpen && (
                        <div className="sidebar-submenu">

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "box-dashboard" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("box-dashboard");
                                }}
                            >
                                Box Dashboard
                            </a>

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "box-company" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("box-company");
                                }}
                            >
                                Company
                            </a>

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "box-visualization" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("box-visualization");
                                }}
                            >
                                Box Visualization
                            </a>

                        </div>
                    )}

                </div>

                {/* Product Type */}
                <div className="sidebar-group">

                    <button
                        className="sidebar-item sidebar-parent"
                        onClick={() => setProductOpen(!productOpen)}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa fa-bag-shopping"></i>
                            <span>Product</span>
                        </span>

                        <i
                            className={`fa fa-chevron-down sidebar-arrow ${productOpen ? "open" : ""}`}
                        ></i>
                    </button>

                    {productOpen  && (
                        <div className="sidebar-submenu">

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "product-type" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("product-type");
                                }}
                            >
                                Product Type
                            </a>

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "product-sub-type" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("product-sub-type");
                                }}
                            >
                                Product Sub Type
                            </a>
                            
                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "product-listing" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("product-listing");
                                }}
                            >
                                Product Listing
                            </a>

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "product-family" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("product-family");
                                }}
                            >
                                Product Family
                            </a>

                        </div>
                    )}
                </div>

                {/* Terminal */}
                <div className="sidebar-group">

                    <button
                        className="sidebar-item sidebar-parent"
                        onClick={() => setLocationOpen(!locationOpen)}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa fa-location"></i>
                            <span>Locations</span>
                        </span>

                        <i
                            className={`fa fa-chevron-down sidebar-arrow ${locationOpen ? "open" : ""}`}
                        ></i>
                    </button>

                    {locationOpen  && (
                        <div className="sidebar-submenu">

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "terminal" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("terminal");
                                }}
                            >
                                Terminal
                            </a>

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "destination" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("destination");
                                }}
                            >
                                Destination
                            </a>

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "disposal-facilities" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("disposal-facilities");
                                }}
                            >
                                Disposal Facilities
                            </a>

                        </div>
                    )}

                </div>

                <a href="#" className="sidebar-item">
                    <i className="fa fa-cog"></i>
                    <span>System Configuration</span>
                </a>

                {/* System Reports */}

               <div className="sidebar-group">

                    <button
                        className="sidebar-item sidebar-parent"
                        onClick={() => setReportsOpen(!reportsOpen)}
                    >
                        <span className="sidebar-item-left">
                            <i className="fa fa-file-text" aria-hidden="true"></i>
                            <span>System Reports</span>
                        </span>

                        <i
                            className={`fa fa-chevron-down sidebar-arrow ${
                                reportsOpen ? "open" : ""
                            }`}
                        ></i>
                    </button>

                    {reportsOpen && (
                        <div className="sidebar-submenu">

                            <a
                                href="#"
                                className={`sidebar-subitem ${activePage === "stuck-loads" ? "active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    changePage("stuck-loads");
                                }}
                            >
                                Stuck Loads
                            </a>

                        </div>
                    )}

                </div>

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
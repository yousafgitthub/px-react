import { useState } from "react";
import "../css/dashboard.css";
import PoAdminUsers from "./po-admin-users";
import TanentUsers from "./tanent-users";
import CarrierUsers from "./carrier-users";
import DriverUsers from "./driver-users";
function Dashboard({ onLogout }) {
    const [userManagementOpen, setUserManagementOpen] =
        useState(() => ["admin-users", "tanent-users", "carrier-users", "driver-users"].includes(localStorage.getItem("activePage"))
        );
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState(() => localStorage.getItem("activePage") || "dashboard");

    const changePage = (page) => {
        localStorage.setItem("activePage", page);
        setActivePage(page);
        setSidebarOpen(false);
    };

    const pageTitles = {
        "admin-users": "PD Admin Users",
        "tanent-users": "Tenant Users",
        "carrier-users": "Carrier Users",
        "driver-users": "Driver Users",
    };
    return (
        <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : ""}`}>

            {/* Sidebar */}
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

                    <a href="#" className="sidebar-item">
                        <i className="fa fa-building"></i>
                        <span>Companies</span>
                    </a>

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
                                className={`fa fa-chevron-down sidebar-arrow ${userManagementOpen ? "open" : ""
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

                                <a href="#" className="sidebar-subitem">
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
                        <i className="fa fa-file-text-o"></i>
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

                    <a href="#" className="sidebar-item">
                        <i className="fa fa-user"></i>
                        <span>Profile Settings</span>
                    </a>

                </nav>

                <div className="sidebar-bottom">
                    <button className="map-email-button">
                        <i className="fa fa-envelope"></i>
                        Map Email
                    </button>
                </div>

            </aside>


            {/* Main Area */}
            <div className="admin-main">

                {/* Top Bar */}
                <header className="admin-topbar">

                    <div className="topbar-left">
                        <button
                            type="button"
                            className="mobile-menu-toggle"
                            aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <i className={`fa ${sidebarOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
                        </button>
                        <nav className="page-breadcrumb" aria-label="Breadcrumb">
                            <button
                                type="button"
                                className={`breadcrumb-dashboard ${activePage === "dashboard" ? "current" : ""}`}
                                onClick={() => changePage("dashboard")}
                            >
                                Dashboard
                            </button>
                            {pageTitles[activePage] && (
                                <>
                                    <i className="fa fa-chevron-right breadcrumb-separator" aria-hidden="true"></i>
                                    <span className="page-title">{pageTitles[activePage]}</span>
                                </>
                            )}
                        </nav>
                    </div>

                    <div className="topbar-right">

                        <div className="user-info">
                            <div className="user-avatar">
                                <i className="fa fa-user"></i>
                            </div>

                            <span>admin_user</span>
                        </div>

                        <button
                            className="logout-button"
                            title="Logout"
                            onClick={onLogout}
                        >
                            <i className="fa fa-power-off"></i>
                        </button>

                    </div>

                </header>


                {/* Dashboard Content */}
                {activePage === "dashboard" && (
                    <main className="dashboard-content">

                        {/* Statistics */}
                        <div className="stats-grid">

                            <div className="stat-card">
                                <div className="stat-card-top">
                                    <div className="stat-icon">
                                        <i className="fa fa-building"></i>
                                    </div>

                                    <div className="stat-label">
                                        TOTAL COMPANIES
                                    </div>
                                </div>

                                <div className="stat-number">
                                    123
                                </div>

                                <div className="stat-footer">
                                    <span className="stat-status">
                                        <i className="fa fa-arrow-up"></i> 8.5%
                                    </span>
                                    <span>from last month</span>
                                </div>
                            </div>


                            <div className="stat-card">
                                <div className="stat-card-top">
                                    <div className="stat-icon">
                                        <i className="fa fa-truck"></i>
                                    </div>

                                    <div className="stat-label">
                                        TOTAL TERMINALS
                                    </div>
                                </div>

                                <div className="stat-number">
                                    123
                                </div>

                                <div className="stat-footer">
                                    <span className="stat-status">
                                        <i className="fa fa-arrow-up"></i> 5.2%
                                    </span>
                                    <span>from last month</span>
                                </div>
                            </div>


                            <div className="stat-card">
                                <div className="stat-card-top">
                                    <div className="stat-icon">
                                        <i className="fa fa-map-signs"></i>
                                    </div>

                                    <div className="stat-label">
                                        TOTAL DESTINATIONS
                                    </div>
                                </div>

                                <div className="stat-number">
                                    123
                                </div>

                                <div className="stat-footer">
                                    <span className="stat-status">
                                        <i className="fa fa-arrow-up"></i> 6.7%
                                    </span>
                                    <span>from last month</span>
                                </div>
                            </div>


                            <div className="stat-card">
                                <div className="stat-card-top">
                                    <div className="stat-icon">
                                        <i className="fa fa-line-chart"></i>
                                    </div>

                                    <div className="stat-label">
                                        TOTAL JOBS
                                    </div>
                                </div>

                                <div className="stat-number">
                                    123
                                </div>

                                <div className="stat-footer">
                                    <span className="stat-status">
                                        <i className="fa fa-arrow-up"></i> 12.4%
                                    </span>
                                    <span>from last month</span>
                                </div>
                            </div>

                        </div>


                        {/* Coming Soon */}
                        <div className="coming-soon-card">

                            <div className="coming-soon-header">
                                <div>
                                    <h3>Coming Soon</h3>
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
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>N/A</td>
                                            <td>
                                                <span className="status-active">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </main>
                )}

                {activePage === "admin-users" && (
                    <PoAdminUsers />
                )}
                {activePage === "tanent-users" && (
                    <TanentUsers />
                )}
                {activePage === "carrier-users" && (
                    <CarrierUsers />
                )}
                {activePage === "driver-users" && (
                    <DriverUsers />
                )}

            </div>

        </div>
    );
}

export default Dashboard;

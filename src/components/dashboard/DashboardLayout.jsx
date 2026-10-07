import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
// import Footer from "./Footer";

import PoAdminUsers from "../../pages/admin/po-admin-users";
import TanentUsers from "../../pages/admin/tanent-users";
import CarrierUsers from "../../pages/admin/carrier-users";
import DriverUsers from "../../pages/admin/driver-users";
import TenantCompany from "../../pages/admin/tenant-company";
import CarrierCompany from "../../pages/admin/carrier-company";
import ProfileSettings from "../../pages/admin/profile-settings";

function DashboardLayout({ onLogout }) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [userManagementOpen, setUserManagementOpen] =
        useState(() =>
            [
                "admin-users",
                "tanent-users",
                "carrier-users",
                "driver-users",
            ].includes(localStorage.getItem("activePage"))
        );

    const [companiesOpen, setCompaniesOpen] =
        useState(() =>
            [
                "tanent-company",
                "carrier-company",
            ].includes(localStorage.getItem("activePage"))
        );

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [activePage, setActivePage] = useState(
        () => localStorage.getItem("activePage") || "dashboard"
    );
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

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
        "tenant-company": "Tenant Companies",
        "carrier-company": "Carrier Companies",
        "profile-settings": "Profile Settings",
    };
    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <div
            className={`admin-layout ${
                sidebarOpen ? "sidebar-open" : ""
            } ${
                sidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
        >

            <Sidebar
                activePage={activePage}
                changePage={changePage}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                userManagementOpen={userManagementOpen}
                setUserManagementOpen={setUserManagementOpen}
                companiesOpen={companiesOpen}
                setCompaniesOpen={setCompaniesOpen}
            />

            <div className="admin-main">

                <Header
                    activePage={activePage}
                    pageTitles={pageTitles}
                    changePage={changePage}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    onLogout={onLogout}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                {/* Dashboard Content */}
                {activePage === "dashboard" && (
                    <main className="dashboard-content">

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

                                    <span>
                                        from last month
                                    </span>
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

                                    <span>
                                        from last month
                                    </span>
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

                                    <span>
                                        from last month
                                    </span>
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

                                    <span>
                                        from last month
                                    </span>
                                </div>
                            </div>

                        </div>

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

                {activePage === "tenant-company" && (
                    <TenantCompany />
                )}

                {activePage === "carrier-company" && (
                    <CarrierCompany />
                )}

                {activePage === "profile-settings" && (
                    <ProfileSettings />
                )}

                {/* <Footer /> */}

            </div>

        </div>
    );
}

export default DashboardLayout;
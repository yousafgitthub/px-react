function Header({
    activePage,
    pageTitles,
    changePage,
    sidebarOpen,
    setSidebarOpen,
    onLogout,
    darkMode,
    setDarkMode,
}) {
    return (
        <header className="admin-topbar">

            <div className="topbar-left">

                <button
                    type="button"
                    className="mobile-menu-toggle"
                    aria-label={
                        sidebarOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={sidebarOpen}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <i
                        className={`fa ${
                            sidebarOpen ? "fa-times" : "fa-bars"
                        }`}
                        aria-hidden="true"
                    ></i>
                </button>

                <nav
                    className="page-breadcrumb"
                    aria-label="Breadcrumb"
                >
                    <button
                        type="button"
                        className={`breadcrumb-dashboard ${
                            activePage === "dashboard" ? "current" : ""
                        }`}
                        onClick={() => changePage("dashboard")}
                    >
                        Dashboard
                    </button>

                    {pageTitles[activePage] && (
                        <>
                            <i
                                className="fa fa-chevron-right breadcrumb-separator"
                                aria-hidden="true"
                            ></i>

                            <span className="page-title">
                                {pageTitles[activePage]}
                            </span>
                        </>
                    )}
                </nav>

            </div>

            <div className="topbar-right">

                <button
                    type="button"
                    className="theme-toggle-button"
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "☀" : "☾"}
                </button>

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
    );
}

export default Header;
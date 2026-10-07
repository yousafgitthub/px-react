import "../css/dashboard.css";
import DashboardLayout from "../components/dashboard/DashboardLayout";

function Dashboard({ onLogout }) {
    return (
        <DashboardLayout onLogout={onLogout} />
    );
}

export default Dashboard;
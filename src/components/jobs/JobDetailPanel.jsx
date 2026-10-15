import { useState } from "react";
import { JOB_DETAIL_TABS } from "../../data/tenantJobsDemo";
import DetailsTab from "./DetailsTab";
import SearchableAdminTable from "./SearchableAdminTable";
import LoadsTab from "./LoadsTab";

function JobDetailPanel({
  job,
  loads,
  tables,
  dashboard,
  details,
  onOpenJobSettings,
}) {
  // Default tab matches PropX Details screenshot. Parent remounts via
  // key={job.id} when the selected job changes.
  const [activeTab, setActiveTab] = useState("Details");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Details":
        return (
          <DetailsTab
            job={job}
            details={details}
            onOpenJobSettings={onOpenJobSettings}
          />
        );
      case "Loads":
        return <LoadsTab loads={loads} dashboard={dashboard} />;
      case "Assets":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Assets"
              columns={[
                { key: "name", label: "Asset" },
                { key: "type", label: "Type" },
                { key: "status", label: "Status" },
                { key: "location", label: "Location" },
              ]}
              rows={tables?.assets || []}
              searchKeys={["name", "type", "status", "location"]}
              showActions={false}
            />
          </div>
        );
      case "Usage":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Usage"
              columns={[
                { key: "period", label: "Period" },
                { key: "product", label: "Product" },
                { key: "used", label: "Used" },
                { key: "remaining", label: "Remaining" },
              ]}
              rows={tables?.usage || []}
              searchKeys={["period", "product"]}
              showActions={false}
            />
          </div>
        );
      case "Inventory":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Inventory"
              columns={[
                { key: "sku", label: "SKU" },
                { key: "product", label: "Product" },
                { key: "onHand", label: "On Hand" },
                { key: "location", label: "Location" },
              ]}
              rows={tables?.inventory || []}
              searchKeys={["sku", "product", "location"]}
              showActions={false}
            />
          </div>
        );
      case "History":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="History"
              columns={[
                { key: "time", label: "Time" },
                { key: "event", label: "Event" },
                { key: "user", label: "User" },
              ]}
              rows={tables?.history || []}
              searchKeys={["time", "event", "user"]}
              showActions={false}
            />
          </div>
        );
      case "Reconcile":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Reconcile"
              columns={[
                { key: "ticket", label: "Ticket" },
                { key: "expected", label: "Expected" },
                { key: "actual", label: "Actual" },
                { key: "variance", label: "Variance" },
                { key: "status", label: "Status" },
              ]}
              rows={tables?.reconcile || []}
              searchKeys={["ticket", "status"]}
              showActions={false}
            />
          </div>
        );
      case "KPI":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="KPI"
              columns={[
                { key: "metric", label: "Metric" },
                { key: "value", label: "Value" },
                { key: "target", label: "Target" },
              ]}
              rows={tables?.kpi || []}
              searchKeys={["metric"]}
              showActions={false}
            />
          </div>
        );
      case "Drivers":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Drivers"
              columns={[
                { key: "name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "status", label: "Status" },
                { key: "truck", label: "Truck" },
              ]}
              rows={tables?.drivers || []}
              searchKeys={["name", "phone", "status", "truck"]}
              showActions={false}
            />
          </div>
        );
      case "Users":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Users"
              columns={[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "role", label: "Role" },
                { key: "status", label: "Status" },
              ]}
              rows={tables?.users || []}
              searchKeys={["name", "email", "role", "status"]}
              showActions={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderTab = (tab) => (
    <li
      key={tab}
      className={`nav-item ${activeTab === tab ? "active" : ""}`}
      role="presentation"
    >
      <button
        type="button"
        role="tab"
        className={`nav-link ${activeTab === tab ? "active" : ""}`}
        aria-selected={activeTab === tab}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    </li>
  );

  return (
    <section className="jobs-detail-panel job-detail-shell">
      <div className="job-detail-topbar btn_box">
        <div className="line-tabs job-line-tabs">
          <ul className="nav-tabs job-nav-tabs" role="tablist">
            {JOB_DETAIL_TABS.map(renderTab)}
          </ul>
        </div>
      </div>

      <div className="job-detail-content scrollable" role="tabpanel">
        {renderTabContent()}
      </div>
    </section>
  );
}

export default JobDetailPanel;

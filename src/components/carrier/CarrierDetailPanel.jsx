import { useState } from "react";
import {
  CARRIER_DETAIL_TABS,
  CARRIER_STATUS_OPTIONS,
} from "../../data/tenantCarriersDemo";
import SearchableAdminTable from "../jobs/SearchableAdminTable";

function CarrierDetailPanel({
  carrier,
  costSettings = [],
  drivers = [],
  onStatusChange,
  onDelete,
}) {
  const [activeTab, setActiveTab] = useState("Detail");
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState("");

  const showDemoNotice = (message) => {
    setDemoNotice(message);
    window.setTimeout(() => setDemoNotice(""), 2500);
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

  const renderDetail = () => (
    <div className="job-details-page carrier-detail-page">
      <div className="job-details-actions">
        <button
          type="button"
          className="job-details-action-btn"
          onClick={() =>
            showDemoNotice(
              "Carrier Settings is demo-only and does not open a form API."
            )
          }
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
          Carrier Settings
        </button>

        <div className="job-status-dropdown">
          <button
            type="button"
            className="job-details-action-btn"
            aria-expanded={statusMenuOpen}
            onClick={() => setStatusMenuOpen((open) => !open)}
          >
            <span
              className={`job-status-dot ${
                carrier.status === "Active" ? "is-active" : "is-inactive"
              }`}
              aria-hidden="true"
            ></span>
            Active Status
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </button>
          {statusMenuOpen ? (
            <div className="job-status-menu">
              {CARRIER_STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onStatusChange?.(carrier.id, status);
                    setStatusMenuOpen(false);
                    showDemoNotice(
                      `Status changed locally to ${status} (demo only).`
                    );
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          className="job-details-action-btn"
          onClick={() => {
            if (carrier.source === "demo") {
              showDemoNotice(
                "Delete is demo-only and does not remove seed records."
              );
              return;
            }
            onDelete?.(carrier.id);
          }}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
          Delete
        </button>
      </div>

      {demoNotice ? (
        <div className="loads-demo-notice" role="status">
          {demoNotice}
        </div>
      ) : null}

      <div className="job-details-identity carrier-detail-identity">
        <h2 className="job-details-name">{carrier.name}</h2>
        <p className="job-details-company">{carrier.location || "—"}</p>
        <p className="job-details-meta">
          <i className="fa fa-user" aria-hidden="true"></i>
          <span>{carrier.contactPerson || "—"}</span>
        </p>
        <p className="job-details-meta">
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <span>{carrier.email || "—"}</span>
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Detail":
        return renderDetail();
      case "Cost Setting":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Cost Setting"
              columns={[
                { key: "lane", label: "Lane" },
                { key: "rateType", label: "Rate Type" },
                { key: "rate", label: "Rate" },
                { key: "fuelSurcharge", label: "Fuel Surcharge" },
                { key: "effective", label: "Effective" },
              ]}
              rows={costSettings}
              searchKeys={["lane", "rateType", "rate"]}
              emptyMessage="No cost settings for this carrier."
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
                { key: "truck", label: "Truck" },
                {
                  key: "status",
                  label: "Status",
                  render: (row) => (
                    <span
                      className={
                        row.status === "Active"
                          ? "admin-status-active"
                          : "admin-status-inactive"
                      }
                    >
                      {row.status}
                    </span>
                  ),
                },
              ]}
              rows={drivers}
              searchKeys={["name", "phone", "truck", "status"]}
              emptyMessage="No drivers for this carrier."
              showActions={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="jobs-detail-panel job-detail-shell">
      <div className="job-detail-topbar btn_box">
        <div className="line-tabs job-line-tabs">
          <ul className="nav-tabs job-nav-tabs" role="tablist">
            {CARRIER_DETAIL_TABS.map(renderTab)}
          </ul>
        </div>
      </div>

      <div className="job-detail-content scrollable" role="tabpanel">
        {renderTabContent()}
      </div>
    </section>
  );
}

export default CarrierDetailPanel;

import { useState } from "react";
import {
  PO_DETAIL_TABS,
  PO_STATUS_OPTIONS,
  formatLbs,
  formatPoQuantityLabel,
} from "../../data/tenantPoTrackerDemo";
import SearchableAdminTable from "../jobs/SearchableAdminTable";

function consumptionPercent(po) {
  const total = Number(po.quantityLbs || 0);
  if (total <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((Number(po.consumedLbs || 0) / total) * 100));
}

function PoDetailPanel({ po, transactions = [], onStatusChange, onDelete }) {
  const [activeTab, setActiveTab] = useState("Details");
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState("");

  const showDemoNotice = (message) => {
    setDemoNotice(message);
    window.setTimeout(() => setDemoNotice(""), 2500);
  };

  const consumedPct = consumptionPercent(po);
  const loadsPct = Math.min(100, Math.max(0, Number(po.loadsProgressPercent || 0)));

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

  const renderDetails = () => (
    <div className="job-details-page po-detail-page">
      <div className="job-details-actions">
        <button
          type="button"
          className="job-details-action-btn"
          onClick={() =>
            showDemoNotice(
              "Edit Settings is demo-only and does not open a form API."
            )
          }
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
          Edit Settings
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
                po.status === "Active" ? "is-active" : "is-inactive"
              }`}
              aria-hidden="true"
            ></span>
            Active Status
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </button>
          {statusMenuOpen ? (
            <div className="job-status-menu">
              {PO_STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onStatusChange?.(po.id, status);
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
            if (po.source === "demo") {
              showDemoNotice(
                "Delete is demo-only and does not remove seed records."
              );
              return;
            }
            onDelete?.(po.id);
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

      <div className="job-details-identity po-detail-identity">
        <h2 className="job-details-name">PO#: {po.poNumber}</h2>
        <p className="job-details-meta">
          <span className="po-detail-field-label">Product:</span>
          <span>{po.product || "—"}</span>
        </p>
        <p className="job-details-meta">
          <span className="po-detail-field-label">Quantity:</span>
          <span>{formatPoQuantityLabel(po)}</span>
        </p>
        <p className="job-details-meta">
          <span className="po-detail-field-label">Terminal:</span>
          <span>{po.terminal || "—"}</span>
        </p>
      </div>

      <div className="job-details-cards-section">
        <div className="job-summary-cards po-summary-cards">
          <article className="job-summary-card po-summary-card">
            <h3>PO CONSUMPTION (IN LBS)</h3>
            <div className="job-summary-values po-summary-metrics-row">
              <p className="job-summary-metric">
                <strong className="is-blue">{formatLbs(po.consumedLbs)}</strong>
                <span className="job-summary-label">Consumed</span>
              </p>
              <p className="job-summary-metric">
                <strong className="is-blue-soft">
                  {formatLbs(po.remainingLbs)}
                </strong>
                <span className="job-summary-label">Remaining</span>
              </p>
            </div>
            <div
              className="po-progress-track is-consumption"
              role="progressbar"
              aria-valuenow={consumedPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="PO consumption progress"
            >
              <div
                className="po-progress-fill is-blue"
                style={{ width: `${Math.max(consumedPct, consumedPct > 0 ? 1 : 0)}%` }}
              />
            </div>
          </article>

          <article className="job-summary-card po-summary-card">
            <h3>LOADS DETAIL</h3>
            <div className="job-summary-values">
              <p className="job-summary-metric">
                <strong className="is-amber">{po.loadsDelivered}</strong>
                <span className="job-summary-label">Delivered</span>
              </p>
              <p className="job-summary-metric">
                <strong className="is-amber">{po.loadsOrdered}</strong>
                <span className="job-summary-label">Ordered</span>
              </p>
            </div>
            <div
              className="po-progress-track is-loads"
              role="progressbar"
              aria-valuenow={loadsPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Loads completion progress"
            >
              <div
                className="po-progress-fill is-amber"
                style={{ width: `${loadsPct}%` }}
              >
                {loadsPct > 8 ? (
                  <span className="po-progress-label">{loadsPct}%</span>
                ) : null}
              </div>
              {loadsPct <= 8 ? (
                <span className="po-progress-label is-outside">{loadsPct}%</span>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Details":
        return renderDetails();
      case "Transactions":
        return (
          <div className="job-tab-panel">
            <SearchableAdminTable
              title="Transactions"
              columns={[
                { key: "date", label: "Date" },
                { key: "type", label: "Type" },
                { key: "ticket", label: "Ticket" },
                { key: "quantityLbs", label: "Quantity (LBS)" },
                {
                  key: "status",
                  label: "Status",
                  render: (row) => (
                    <span className="admin-status-active">{row.status}</span>
                  ),
                },
              ]}
              rows={transactions}
              searchKeys={["date", "type", "ticket", "status"]}
              emptyMessage="No transactions for this purchase order."
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
            {PO_DETAIL_TABS.map(renderTab)}
          </ul>
        </div>
      </div>

      <div className="job-detail-content scrollable" role="tabpanel">
        {renderTabContent()}
      </div>
    </section>
  );
}

export default PoDetailPanel;

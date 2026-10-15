import { useState } from "react";
import SearchableAdminTable from "./SearchableAdminTable";

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function DetailsTab({ job, details }) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState("");
  const [jobStatus, setJobStatus] = useState(
    details?.statusLabel || job.status || "Active"
  );

  const summary = details?.summary || {
    loadsDelivered: 0,
    loadsTotal: 0,
    driversAssigned: 0,
    driversOrdered: 0,
    poDeliveredLbs: 0,
    poTotalLbs: 0,
  };

  const operatorLabel = details?.operatorLabel || job.operator || "Operator";
  const companyLabel = details?.companyLabel || job.company || "Company";
  const locationName = details?.locationName || job.destination || "Location";
  const locationRegion = details?.locationRegion || "USA";
  const latitude = details?.latitude || "—";
  const longitude = details?.longitude || "—";
  const terminals = details?.terminals || [];
  const pumpingLog = details?.pumpingStatusLog || [];

  const showDemoNotice = (message) => {
    setDemoNotice(message);
    window.setTimeout(() => setDemoNotice(""), 2500);
  };

  return (
    <div className="job-details-page">
      <div className="job-details-actions">
        <button
          type="button"
          className="job-details-action-btn"
          onClick={() =>
            showDemoNotice("Job Settings is demo-only and does not open a form API.")
          }
        >
          <i className="fa fa-wrench" aria-hidden="true"></i>
          Job Settings
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
                jobStatus === "Active" ? "is-active" : "is-inactive"
              }`}
              aria-hidden="true"
            ></span>
            Active Status
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </button>
          {statusMenuOpen && (
            <div className="job-status-menu">
              {["Active", "Inactive", "Pending"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setJobStatus(status);
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
          )}
        </div>

        <button
          type="button"
          className="job-details-action-btn"
          onClick={() =>
            showDemoNotice("Delete is demo-only and does not remove records.")
          }
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
          Delete
        </button>

        <button
          type="button"
          className="job-details-action-btn job-pumping-btn"
          onClick={() =>
            showDemoNotice("Pumping is demo-only and does not start a workflow.")
          }
        >
          <i className="fa fa-tint" aria-hidden="true"></i>
          Pumping
        </button>
      </div>

      {demoNotice && (
        <div className="loads-demo-notice" role="status">
          {demoNotice}
        </div>
      )}

      <div className="job-details-identity">
        <h2 className="job-details-name">{job.name}</h2>
        <p className="job-details-company">
          {operatorLabel} | {companyLabel}
        </p>
        <p className="job-details-meta">
          <i className="fa fa-map-marker" aria-hidden="true"></i>
          <span>
            <strong className="job-details-location-name">{locationName}</strong>{" "}
            <span className="job-details-location-region">{locationRegion}</span>
          </span>
        </p>
        <p className="job-details-meta">
          <i className="fa fa-location-arrow" aria-hidden="true"></i>
          <span>
            {latitude},{longitude}
          </span>
        </p>
      </div>

      <div className="job-details-cards-section">
        <div className="job-summary-cards">
          <article className="job-summary-card">
            <h3>TOTAL LOADS</h3>
            <div className="job-summary-values">
              <p className="job-summary-metric">
                <strong className="is-blue">
                  {formatNumber(summary.loadsDelivered)}
                </strong>
                <span className="job-summary-label">Delivered</span>
              </p>
              <p className="job-summary-metric">
                <strong className="is-blue">
                  {formatNumber(summary.loadsTotal)}
                </strong>
                <span className="job-summary-label">Total</span>
              </p>
            </div>
          </article>

          <article className="job-summary-card">
            <h3>ASSIGN DRIVER</h3>
            <div className="job-summary-values">
              <p className="job-summary-metric">
                <strong className="is-amber">
                  {formatNumber(summary.driversAssigned)}
                </strong>
                <span className="job-summary-label">Assigned</span>
              </p>
              <p className="job-summary-metric">
                <strong className="is-amber">
                  {formatNumber(summary.driversOrdered)}
                </strong>
                <span className="job-summary-label">Ordered</span>
              </p>
            </div>
          </article>

          <article className="job-summary-card">
            <h3>PO CONSUMPTION (IN LBS)</h3>
            <div className="job-summary-values">
              <p className="job-summary-metric">
                <strong className="is-green">
                  {formatNumber(summary.poDeliveredLbs)}
                </strong>
                <span className="job-summary-label">Delivered</span>
              </p>
              <p className="job-summary-metric">
                <strong className="is-green">
                  {formatNumber(summary.poTotalLbs)}
                </strong>
                <span className="job-summary-label">Total</span>
              </p>
            </div>
          </article>
        </div>

        <div className="job-details-lower-grid">
        <SearchableAdminTable
          title="TERMINALS"
          columns={[
            { key: "terminalName", label: "Terminal Name" },
            { key: "approvedMileage", label: "Approved Mileage" },
          ]}
          rows={terminals}
          searchKeys={["terminalName", "approvedMileage"]}
          emptyMessage="No terminals available."
          showActions={false}
          showSearch={false}
        />

        <SearchableAdminTable
          title="JOB PUMPING STATUS LOG"
          columns={[
            { key: "status", label: "Status" },
            { key: "description", label: "Description" },
            { key: "category", label: "Category" },
            { key: "time", label: "Time" },
            { key: "downTime", label: "Down Time (min)" },
          ]}
          rows={pumpingLog}
          searchKeys={["status", "description", "category"]}
          emptyMessage="No data available in table"
          showActions={true}
          showSearch={false}
          showDataTablesInfo={true}
          extraToolbar={
            <button
              type="button"
              className="job-details-action-btn"
              onClick={() =>
                showDemoNotice(
                  "Download Pumping Status is demo-only and does not export a file."
                )
              }
            >
              <i className="fa fa-cloud-download" aria-hidden="true"></i>
              Download Pumping Status
            </button>
          }
          footerRow={
            <>
              <td colSpan={4}>Total</td>
              <td>N/A</td>
              <td></td>
            </>
          }
        />
        </div>
      </div>
    </div>
  );
}

export default DetailsTab;

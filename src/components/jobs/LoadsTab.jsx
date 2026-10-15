import { useMemo, useState } from "react";
import { LOAD_COLUMNS } from "../../data/tenantJobsDemo";
import SearchableAdminTable from "./SearchableAdminTable";

const LOAD_TABLE_COLUMNS = LOAD_COLUMNS.map((label) => {
  const keyMap = {
    Load: "load",
    Carrier: "carrier",
    "Truck/Trailer": "truckTrailer",
    Stage: "stage",
    Product: "product",
    PO: "po",
    Weight: "weight",
    Terminal: "terminal",
    "Ticket No.": "ticketNo",
    "Status Time": "statusTime",
    Status: "status",
  };

  return { key: keyMap[label], label };
});

const SEARCH_KEYS = LOAD_TABLE_COLUMNS.map((column) => column.key);

const STATUS_COLUMNS = [
  { key: "productName", label: "Product Name" },
  { key: "terminal", label: "Terminal" },
  { key: "accepted", label: "Accepted" },
  { key: "atTerminal", label: "At Terminal" },
  { key: "inTransit", label: "In Transit" },
  { key: "atDestination", label: "At Destination" },
  { key: "delivered", label: "Delivered" },
];

const ALLOCATION_COLUMNS = [
  { key: "poNumber", label: "PO Number" },
  { key: "dailyAllocation", label: "Daily Allocation" },
  { key: "rollover", label: "Rollover" },
  { key: "totalRemaining", label: "Total Remaining" },
  { key: "ordered", label: "Ordered" },
  { key: "accepted", label: "Accepted" },
  { key: "atTerminal", label: "At Terminal" },
  { key: "totalNotPulled", label: "Total Not Pulled" },
  { key: "totalPulled", label: "Total Pulled" },
];

function LoadsTab({ loads, dashboard }) {
  const [metricMode, setMetricMode] = useState(
    dashboard?.metricMode || "# of Trucks"
  );
  const [carrierFilter, setCarrierFilter] = useState("All carriers");
  const [searchLoadOpen, setSearchLoadOpen] = useState(false);
  const [searchLoadTerm, setSearchLoadTerm] = useState("");
  const [demoNotice, setDemoNotice] = useState("");

  const transit = loads?.transit || [];
  const destination = loads?.destination || [];
  const delivered = loads?.delivered || [];
  const statusTotals = dashboard?.statusTotals || {
    accepted: 0,
    atTerminal: 0,
    inTransit: 0,
    atDestination: 0,
    delivered: 0,
  };
  const dailyAllocation = dashboard?.dailyAllocation || [];
  const carriers = dashboard?.carriers || ["All carriers"];

  const filteredStatusRows = useMemo(() => {
    const statusRows = dashboard?.statusRows || [];
    const term = searchLoadTerm.trim().toLowerCase();
    if (!term) {
      return statusRows;
    }
    return statusRows.filter(
      (row) =>
        row.productName.toLowerCase().includes(term) ||
        row.terminal.toLowerCase().includes(term)
    );
  }, [dashboard?.statusRows, searchLoadTerm]);

  const showDemoNotice = (message) => {
    setDemoNotice(message);
    window.setTimeout(() => setDemoNotice(""), 2500);
  };

  const statusFooter = (
    <>
      <td colSpan={2}>Total ({metricMode})</td>
      <td>{statusTotals.accepted}</td>
      <td>{statusTotals.atTerminal}</td>
      <td>{statusTotals.inTransit}</td>
      <td>{statusTotals.atDestination}</td>
      <td>{statusTotals.delivered}</td>
    </>
  );

  return (
    <div className="job-loads-tab propx-loads">
      <div className="loads-action-toolbar">
        <button
          type="button"
          className="loads-action-btn"
          onClick={() =>
            showDemoNotice("Order Load is demo-only and does not call an API.")
          }
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
          Order Load
        </button>
        <button
          type="button"
          className="loads-action-btn"
          onClick={() =>
            showDemoNotice(
              "Download Reports is demo-only and does not export files."
            )
          }
        >
          <i className="fa fa-download" aria-hidden="true"></i>
          Download Reports
        </button>
        {searchLoadOpen ? (
          <div className="loads-inline-search">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input
              type="search"
              value={searchLoadTerm}
              onChange={(event) => setSearchLoadTerm(event.target.value)}
              placeholder="Search load..."
              aria-label="Search Load"
            />
            <button
              type="button"
              className="loads-action-btn compact"
              onClick={() => {
                setSearchLoadOpen(false);
                setSearchLoadTerm("");
              }}
              aria-label="Close search"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="loads-action-btn"
            onClick={() => setSearchLoadOpen(true)}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
            Search Load
          </button>
        )}
      </div>

      {demoNotice && (
        <div className="loads-demo-notice" role="status">
          {demoNotice}
        </div>
      )}

      <div className="loads-top-grid">
        <div className="loads-status-panel">
          <SearchableAdminTable
            title="Loads Status"
            columns={STATUS_COLUMNS}
            rows={filteredStatusRows}
            searchKeys={["productName", "terminal"]}
            emptyMessage="No load status rows."
            showActions={false}
            footerRow={statusFooter}
            extraToolbar={
              <select
                className="loads-compact-select"
                value={metricMode}
                onChange={(event) => setMetricMode(event.target.value)}
                aria-label="Loads status metric"
              >
                {(dashboard?.metricOptions || ["# of Trucks"]).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            }
          />
        </div>

        <aside className="loads-side-summaries">
          <section className="loads-panel loads-summary-card">
            <div className="loads-panel-header">
              <h3>Driver Count</h3>
              <select
                className="loads-compact-select"
                value={carrierFilter}
                onChange={(event) => setCarrierFilter(event.target.value)}
                aria-label="Carrier filter"
              >
                {carriers.map((carrier) => (
                  <option key={carrier} value={carrier}>
                    {carrier}
                  </option>
                ))}
              </select>
            </div>
            <div className="loads-summary-body">
              <span className="loads-summary-label">Driver Count</span>
              <strong className="loads-summary-value">
                {dashboard?.driverCount ?? 0}
              </strong>
              <span className="loads-summary-meta">{carrierFilter}</span>
            </div>
          </section>

          <section className="loads-panel loads-summary-card">
            <div className="loads-panel-header">
              <h3>Box Count</h3>
            </div>
            <div className="loads-summary-body">
              <span className="loads-summary-label">Loaded Boxes</span>
              <strong className="loads-summary-value">
                {dashboard?.loadedBoxes ?? 0}
              </strong>
              <button
                type="button"
                className="loads-dump-btn"
                onClick={() =>
                  showDemoNotice(
                    "Dump Into Pile is demo-only and does not modify inventory."
                  )
                }
              >
                Dump Into Pile
              </button>
            </div>
          </section>
        </aside>
      </div>

      <SearchableAdminTable
        title="Daily Allocation"
        columns={ALLOCATION_COLUMNS}
        rows={dailyAllocation}
        searchKeys={["poNumber", "dailyAllocation", "ordered"]}
        emptyMessage="No daily allocation rows."
        showActions={false}
      />

      <SearchableAdminTable
        title="Transit"
        columns={LOAD_TABLE_COLUMNS}
        rows={transit}
        searchKeys={SEARCH_KEYS}
        emptyMessage="No loads in transit."
        showActions={false}
      />
      <SearchableAdminTable
        title="Destination"
        columns={LOAD_TABLE_COLUMNS}
        rows={destination}
        searchKeys={SEARCH_KEYS}
        emptyMessage="No loads at destination."
        showActions={false}
      />
      <SearchableAdminTable
        title="Delivered"
        columns={LOAD_TABLE_COLUMNS}
        rows={delivered}
        searchKeys={SEARCH_KEYS}
        emptyMessage="No delivered loads."
        showActions={false}
      />
    </div>
  );
}

export default LoadsTab;

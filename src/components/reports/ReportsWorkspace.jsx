import { useMemo, useState } from "react";
import {
  REPORT_NAV_ITEMS,
  USE_TENANT_REPORTS_DEMO,
  getReportDefinition,
  getTenantReportsDemoData,
} from "../../data/tenantReportsDemo";
import { downloadCsv, parseNumericValue } from "../../utils/reportExport";
import UserDataTable from "../UserDataTable";

function filterRows(rows, columns, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (!term) {
    return rows;
  }
  return rows.filter((row) =>
    columns.some((column) =>
      String(row[column.key] ?? "")
        .toLowerCase()
        .includes(term)
    )
  );
}

/**
 * No. of Loads:
 * - loads-overview / reconciled-status: count filtered rows (each row is a load)
 * - aggregate reports: sum countKey (loadCount) across filtered rows
 *
 * Load Volume:
 * - sum volumeKey across filtered rows (totalHauling / delivered / actual / totalVolume)
 */
function computeReportMetrics(definition, filteredRows) {
  const volumeKey = definition.volumeKey;
  const countKey = definition.countKey;

  const loadVolumeLbs = filteredRows.reduce(
    (sum, row) => sum + parseNumericValue(row[volumeKey]),
    0
  );

  const noOfLoads = countKey
    ? filteredRows.reduce(
        (sum, row) => sum + parseNumericValue(row[countKey]),
        0
      )
    : filteredRows.length;

  return { noOfLoads, loadVolumeLbs };
}

function enrichColumns(columns) {
  return columns.map((column) => {
    if (column.key === "deliveryDate") {
      return {
        ...column,
        render: (row) =>
          row.deliveryDate ? (
            <span className="report-date-cell">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              {row.deliveryDate}
            </span>
          ) : (
            "—"
          ),
      };
    }
    if (column.key === "scaleTicketNo") {
      return {
        ...column,
        render: (row) =>
          row.scaleTicketNo ? (
            <span className="report-ticket-pill">{row.scaleTicketNo}</span>
          ) : (
            "—"
          ),
      };
    }
    return column;
  });
}

function ReportDetailView({
  definition,
  rows,
  searchTerm,
  setSearchTerm,
  visibleKeys,
  setVisibleKeys,
}) {
  const [columnsOpen, setColumnsOpen] = useState(false);

  const filteredRows = useMemo(
    () => filterRows(rows, definition.columns, searchTerm),
    [rows, definition.columns, searchTerm]
  );

  const metrics = useMemo(
    () => computeReportMetrics(definition, filteredRows),
    [definition, filteredRows]
  );

  const visibleColumns = useMemo(() => {
    const keys =
      visibleKeys.length > 0
        ? visibleKeys
        : definition.columns.map((column) => column.key);
    return enrichColumns(
      definition.columns.filter((column) => keys.includes(column.key))
    );
  }, [definition.columns, visibleKeys]);

  const toggleColumn = (key) => {
    setVisibleKeys((current) => {
      const baseline =
        current.length > 0
          ? current
          : definition.columns.map((column) => column.key);
      if (baseline.includes(key)) {
        if (baseline.length === 1) {
          return baseline;
        }
        return baseline.filter((item) => item !== key);
      }
      return [...baseline, key];
    });
  };

  const checkedKeys =
    visibleKeys.length > 0
      ? visibleKeys
      : definition.columns.map((column) => column.key);

  return (
    <div className="report-detail-view">
      <div className="report-kpi-grid">
        <section className="report-kpi-card">
          <span className="report-kpi-label">NO. OF LOADS</span>
          <strong className="report-kpi-value">
            <span className="report-kpi-number">
              {metrics.noOfLoads.toLocaleString("en-US")}
            </span>
            <span className="report-kpi-unit">Loads</span>
          </strong>
        </section>
        <section className="report-kpi-card">
          <span className="report-kpi-label">LOAD VOLUME</span>
          <strong className="report-kpi-value">
            <span className="report-kpi-number">
              {metrics.loadVolumeLbs.toLocaleString("en-US")}
            </span>
            <span className="report-kpi-unit">LBS</span>
          </strong>
        </section>
      </div>

      <UserDataTable
        rows={filteredRows}
        columns={visibleColumns}
        showActions={false}
        emptyMessage={definition.emptyMessage}
        tableClassName="admin-users-table"
        wrapperClassName="admin-users-table-wrapper"
        toolbar={
          <div className="tenant-users-filters report-table-toolbar">
            <div className="report-columns-wrap">
              <button
                type="button"
                className="report-columns-btn"
                aria-expanded={columnsOpen}
                onClick={() => setColumnsOpen((open) => !open)}
              >
                Column visibility
                <i className="fa fa-caret-down" aria-hidden="true"></i>
              </button>
              {columnsOpen ? (
                <div className="report-columns-menu" role="menu">
                  {definition.columns.map((column) => (
                    <label key={column.key} className="report-columns-item">
                      <input
                        type="checkbox"
                        checked={checkedKeys.includes(column.key)}
                        onChange={() => toggleColumn(column.key)}
                      />
                      {column.label}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="admin-users-search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search report"
              />
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
        }
      />
    </div>
  );
}

function ReportsWorkspace() {
  const demoByReport = useMemo(() => getTenantReportsDemoData(), []);
  const [activeReport, setActiveReport] = useState("loads-overview");
  const [navOpen, setNavOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleKeysByReport, setVisibleKeysByReport] = useState({});
  const [statusNotice, setStatusNotice] = useState("");

  const definition = getReportDefinition(activeReport);
  const rows = demoByReport[activeReport] || [];
  const activeLabel =
    REPORT_NAV_ITEMS.find((item) => item.id === activeReport)?.label ||
    definition.label;

  const filteredRows = useMemo(
    () => filterRows(rows, definition.columns, searchTerm),
    [rows, definition.columns, searchTerm]
  );

  const visibleKeys = visibleKeysByReport[activeReport] || [];

  const setVisibleKeys = (updater) => {
    setVisibleKeysByReport((current) => {
      const previous = current[activeReport] || [];
      const next =
        typeof updater === "function" ? updater(previous) : updater;
      return { ...current, [activeReport]: next };
    });
  };

  const showNotice = (message) => {
    setStatusNotice(message);
    window.setTimeout(() => setStatusNotice(""), 2500);
  };

  const handleDownload = () => {
    const keys =
      visibleKeys.length > 0
        ? visibleKeys
        : definition.columns.map((column) => column.key);
    const exportColumns = definition.columns.filter((column) =>
      keys.includes(column.key)
    );

    if (filteredRows.length === 0) {
      showNotice("No rows to download for the current search.");
      return;
    }

    downloadCsv({
      fileName: `${definition.id}-${new Date().toISOString().slice(0, 10)}.csv`,
      columns: exportColumns,
      rows: filteredRows,
    });
    showNotice(`Downloaded ${filteredRows.length} row(s) as CSV.`);
  };

  return (
    <div className="reports-workspace">
      {navOpen ? (
        <aside className="reports-nav-panel" aria-label="Reports navigation">
          <nav className="reports-nav">
            {REPORT_NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`reports-nav-link ${
                  activeReport === item.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveReport(item.id);
                  setSearchTerm("");
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      ) : (
        <button
          type="button"
          className="reports-nav-reopen"
          onClick={() => setNavOpen(true)}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
          Reports
        </button>
      )}

      <div className="reports-main admin-users-page">
        <div className="admin-users-header reports-page-header">
          <div className="reports-heading">
            <h2>Reports</h2>
            <p className="reports-subtitle">{activeLabel}</p>
          </div>
          <button
            type="button"
            className="new-admin-button"
            onClick={handleDownload}
          >
            <i className="fa fa-download" aria-hidden="true"></i>
            Download Report
          </button>
        </div>

        {!USE_TENANT_REPORTS_DEMO && (
          <div className="jobs-demo-banner">
            Demo mode is off. Connect a tenant reports API to populate this
            view.
          </div>
        )}

        {statusNotice ? (
          <div className="loads-demo-notice" role="status">
            {statusNotice}
          </div>
        ) : null}

        <ReportDetailView
          key={activeReport}
          definition={definition}
          rows={rows}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          visibleKeys={visibleKeys}
          setVisibleKeys={setVisibleKeys}
        />
      </div>
    </div>
  );
}

export default ReportsWorkspace;

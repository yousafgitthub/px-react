import { useMemo, useState } from "react";
import {
  BOX_INTERVAL_OPTIONS,
  BOX_JOB_FILTERS,
  BOX_SETTINGS_NAV,
  USE_TENANT_BOX_DEMO,
  getTenantBoxDemoData,
} from "../../data/tenantBoxDemo";
import SearchableAdminTable from "../jobs/SearchableAdminTable";

function TruckCountsChart({ points }) {
  const width = Math.max(720, points.length * 56);
  const height = 260;
  const pad = { top: 24, right: 16, bottom: 48, left: 40 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const maxValue = Math.max(1, ...points.map((point) => point.value));
  const yTicks = [0, Math.ceil(maxValue / 2), maxValue];

  const coords = points.map((point, index) => {
    const x =
      pad.left +
      (points.length <= 1 ? plotW / 2 : (index / (points.length - 1)) * plotW);
    const y = pad.top + plotH - (point.value / maxValue) * plotH;
    return { ...point, x, y };
  });

  const linePath = coords
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return (
    <div className="box-chart-scroll">
      <svg
        className="box-truck-chart"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="Truck counts over time"
      >
        {yTicks.map((tick) => {
          const y = pad.top + plotH - (tick / maxValue) * plotH;
          return (
            <g key={`y-${tick}`}>
              <line
                x1={pad.left}
                y1={y}
                x2={width - pad.right}
                y2={y}
                className="box-chart-grid"
              />
              <text x={pad.left - 10} y={y + 4} className="box-chart-axis">
                {tick}
              </text>
            </g>
          );
        })}

        <line
          x1={pad.left}
          y1={pad.top + plotH}
          x2={width - pad.right}
          y2={pad.top + plotH}
          className="box-chart-axis-line"
        />

        <path d={linePath} className="box-chart-line" fill="none" />

        {coords.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="3.5" className="box-chart-dot" />
            <text
              x={point.x}
              y={height - 14}
              textAnchor="middle"
              className="box-chart-label"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function BoxDashboard({ demo, jobFilter, setJobFilter, interval, setInterval }) {
  return (
    <div className="box-dashboard">
      <div className="box-kpi-grid">
        <section className="box-kpi-card">
          <strong className="box-kpi-value">{demo.kpis.activeBoxes}</strong>
          <span className="box-kpi-label">Active Boxes</span>
        </section>
        <section className="box-kpi-card">
          <strong className="box-kpi-value">
            {demo.kpis.boxesInCirculation}
          </strong>
          <span className="box-kpi-label">Boxes in Circulation</span>
        </section>
        <section className="box-kpi-card">
          <strong className="box-kpi-value">
            {demo.kpis.boxesOutOfService}
          </strong>
          <span className="box-kpi-label">Boxes Out of Service</span>
        </section>
      </div>

      <div className="box-dashboard-toolbar">
        <label className="box-filter-field">
          <span className="sr-only">Filter by job</span>
          <select
            value={jobFilter}
            onChange={(event) => setJobFilter(event.target.value)}
            aria-label="Filter by job"
          >
            {BOX_JOB_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="box-panel">
        <div className="box-panel-header">
          <h3>Truck Counts</h3>
          <div className="box-panel-controls">
            <button type="button" className="box-date-range" disabled>
              <i className="fa fa-calendar" aria-hidden="true"></i>
              {demo.dateRangeLabel}
            </button>
            <select
              className="box-interval-select"
              value={interval}
              onChange={(event) => setInterval(event.target.value)}
              aria-label="Chart interval"
            >
              {BOX_INTERVAL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="box-panel-menu"
              aria-label="Chart options"
              title="Demo only"
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <TruckCountsChart points={demo.truckCounts} />
      </section>
    </div>
  );
}

function BoxWorkspace() {
  const demo = useMemo(() => getTenantBoxDemoData(), []);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [jobFilter, setJobFilter] = useState("all");
  const [interval, setIntervalValue] = useState("12-Hour");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <BoxDashboard
            demo={demo}
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            interval={interval}
            setInterval={setIntervalValue}
          />
        );
      case "inventory":
        return (
          <SearchableAdminTable
            title="Box Inventory"
            columns={[
              { key: "boxId", label: "Box ID" },
              { key: "type", label: "Type" },
              { key: "status", label: "Status" },
              { key: "location", label: "Location" },
              { key: "job", label: "Job" },
            ]}
            rows={demo.inventory}
            searchKeys={["boxId", "type", "status", "location", "job"]}
            showActions={false}
          />
        );
      case "management":
        return (
          <SearchableAdminTable
            title="Box Management"
            columns={[
              { key: "boxId", label: "Box ID" },
              { key: "assignedTo", label: "Assigned To" },
              { key: "lastService", label: "Last Service" },
              { key: "capacity", label: "Capacity" },
              { key: "status", label: "Status" },
            ]}
            rows={demo.management}
            searchKeys={["boxId", "assignedTo", "status"]}
            showActions={false}
          />
        );
      case "history":
        return (
          <SearchableAdminTable
            title="Box History"
            columns={[
              { key: "time", label: "Time" },
              { key: "boxId", label: "Box ID" },
              { key: "event", label: "Event" },
              { key: "user", label: "User" },
            ]}
            rows={demo.history}
            searchKeys={["time", "boxId", "event", "user"]}
            showActions={false}
          />
        );
      case "on-the-road":
        return (
          <SearchableAdminTable
            title="On The Road"
            columns={[
              { key: "boxId", label: "Box ID" },
              { key: "truck", label: "Truck" },
              { key: "driver", label: "Driver" },
              { key: "destination", label: "Destination" },
              { key: "eta", label: "ETA" },
            ]}
            rows={demo.onTheRoad}
            searchKeys={["boxId", "truck", "driver", "destination"]}
            showActions={false}
          />
        );
      case "stage-report":
        return (
          <SearchableAdminTable
            title="Stage Report"
            columns={[
              { key: "stage", label: "Stage" },
              { key: "boxes", label: "Boxes" },
              { key: "tons", label: "Tons" },
              { key: "job", label: "Job" },
            ]}
            rows={demo.stageReport}
            searchKeys={["stage", "job"]}
            showActions={false}
          />
        );
      case "service-report":
        return (
          <SearchableAdminTable
            title="Service Report"
            columns={[
              { key: "boxId", label: "Box ID" },
              { key: "serviceType", label: "Service Type" },
              { key: "completed", label: "Completed" },
              { key: "nextDue", label: "Next Due" },
              { key: "status", label: "Status" },
            ]}
            rows={demo.serviceReport}
            searchKeys={["boxId", "serviceType", "status"]}
            showActions={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="box-workspace">
      {settingsOpen ? (
        <aside className="box-settings-panel" aria-label="Box Settings">
          <div className="box-settings-header">
            <h2>Box Settings</h2>
            <button
              type="button"
              className="box-settings-close"
              aria-label="Close Box Settings"
              onClick={() => setSettingsOpen(false)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <nav className="box-settings-nav">
            {BOX_SETTINGS_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`box-settings-link ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      ) : (
        <button
          type="button"
          className="box-settings-reopen"
          onClick={() => setSettingsOpen(true)}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
          Box Settings
        </button>
      )}

      <div className="box-main-content">
        {!USE_TENANT_BOX_DEMO && (
          <div className="jobs-demo-banner">
            Demo mode is off. Connect a tenant box API to populate this view.
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}

export default BoxWorkspace;

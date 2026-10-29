import { useEffect, useMemo, useRef, useState } from "react";
import { buildAddJobFormFromJob } from "../../data/addJobFormConfig";
import {
  JOB_GROUP_OPTIONS,
  USE_TENANT_JOBS_DEMO,
  createEmptyJobDetails,
  createEmptyLoadsDashboard,
  createTenantJobDraft,
  getTenantJobsDemoData,
} from "../../data/tenantJobsDemo";
import AddJobModal from "./AddJobModal";
import JobDetailPanel from "./JobDetailPanel";

const STATUS_META = {
  Active: { className: "success", label: "Active" },
  Pending: { className: "warning", label: "Pending" },
  Inactive: { className: "danger", label: "Inactive" },
};

function emptyLoads() {
  return { transit: [], destination: [], delivered: [] };
}

function emptyTables(job) {
  return {
    assets: [],
    babyBeast: [],
    usage: [],
    inventory: [],
    history: [],
    reconcile: [],
    kpi: [],
    drivers: [],
    users: [
      {
        id: `${job.id}-us1`,
        name: "Tenant Admin",
        email: "admin@tenant.com",
        role: "Company Admin",
        status: "Active",
      },
    ],
  };
}

/**
 * Tenant Jobs three-panel workspace.
 * Uses isolated frontend demo fixtures when USE_TENANT_JOBS_DEMO is true.
 */
function JobsWorkspace() {
  const initialDemo = useMemo(() => getTenantJobsDemoData(), []);
  const [jobs, setJobs] = useState(initialDemo.jobs);
  const [loadsByJobId, setLoadsByJobId] = useState(initialDemo.loadsByJobId);
  const [tablesByJobId, setTablesByJobId] = useState(initialDemo.tablesByJobId);
  const [dashboardByJobId, setDashboardByJobId] = useState(
    initialDemo.dashboardByJobId || {}
  );
  const [detailsByJobId, setDetailsByJobId] = useState(
    initialDemo.detailsByJobId || {}
  );
  const [selectedJobId, setSelectedJobId] = useState(
    () => initialDemo.jobs[0]?.id || null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [menuJobId, setMenuJobId] = useState(null);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [jobFormMode, setJobFormMode] = useState("create");
  const [editingJobId, setEditingJobId] = useState(null);
  const [formSequence, setFormSequence] = useState(1);
  const searchRef = useRef(null);
  const draftCountRef = useRef(1);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) || null;

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const closeMenu = () => setMenuJobId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return jobs;
    }
    return jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(term) ||
        job.status.toLowerCase().includes(term) ||
        (job.operator || "").toLowerCase().includes(term) ||
        (job.company || "").toLowerCase().includes(term)
    );
  }, [jobs, searchTerm]);

  const groupedJobs = useMemo(() => {
    if (groupBy === "none") {
      return { Ungrouped: filteredJobs };
    }

    return filteredJobs.reduce((groups, job) => {
      const key = String(job[groupBy] || "Ungrouped");
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(job);
      return groups;
    }, {});
  }, [filteredJobs, groupBy]);

  const buildAddJobDraftMeta = (payload) => ({
    startDate: payload.startDate,
    endDate: payload.endDate,
    loadsRequirements: payload.loadsRequirements,
    useApptTime: payload.useApptTime,
    checkInType: payload.checkInType,
    carrierPo: payload.carrierPo,
    region: payload.region,
    freightPo: payload.freightPo,
    frostLaw: payload.frostLaw,
    stagesPerDay: payload.stagesPerDay,
    wells: payload.wells,
    operatorRateSheets: payload.operatorRateSheets,
    companyRateSheets: payload.companyRateSheets,
    companyRateCompany: payload.companyRateCompany,
    products: payload.products,
    carriers: payload.carriers,
    permissionFlags: payload.permissionFlags,
    permissions: payload.permissions,
    terminals: payload.terminals,
    notesByType: payload.notesByType,
    siloBelts: payload.siloBelts,
    hoppers: payload.hoppers,
    pictures: payload.pictures,
    destination: payload.destination,
    district: payload.district,
    crew: payload.crew,
    basin: payload.basin,
    status: payload.status,
    operator: payload.operator,
    jobType: payload.jobType,
  });

  const closeJobForm = () => {
    setIsAddJobOpen(false);
    setJobFormMode("create");
    setEditingJobId(null);
  };

  const openAddJob = () => {
    setJobFormMode("create");
    setEditingJobId(null);
    setFormSequence(draftCountRef.current);
    setIsAddJobOpen(true);
    setMenuJobId(null);
  };

  const openJobSettings = (job) => {
    if (!job?.id) {
      return;
    }
    setJobFormMode("edit");
    setEditingJobId(job.id);
    setSelectedJobId(job.id);
    setIsAddJobOpen(true);
    setMenuJobId(null);
  };

  const applyPayloadToJob = (job, payload) => {
    const name = payload.jobName.trim() || job.name;
    return {
      ...job,
      name,
      operator: payload.operator?.trim() || job.operator,
      status: payload.status || job.status || "Pending",
      statusClass:
        STATUS_META[payload.status || job.status || "Pending"]?.className ||
        job.statusClass ||
        "warning",
      jobType: payload.jobType || job.jobType,
      basin: payload.basin || job.basin,
      crew: payload.crew || job.crew,
      district: payload.district || job.district,
      destination: payload.destination || job.destination || "",
      terminal: (payload.terminals || [])[0]?.terminal || job.terminal || "",
      notes:
        [
          payload.notesByType?.special,
          payload.notesByType?.accepted,
          payload.notesByType?.terminal,
          payload.notesByType?.inTransit,
          payload.notesByType?.atDest,
        ]
          .filter(Boolean)
          .join(" | ") || job.notes,
      addJobDraft: buildAddJobDraftMeta(payload),
      initials: name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
    };
  };

  const submitAddJob = (payload) => {
    const draft = createTenantJobDraft(draftCountRef.current);
    draftCountRef.current += 1;
    const next = applyPayloadToJob(
      {
        ...draft,
        source: "demo-draft",
      },
      payload
    );

    setJobs((prev) => [next, ...prev]);
    setLoadsByJobId((prev) => ({ ...prev, [next.id]: emptyLoads() }));
    setTablesByJobId((prev) => ({ ...prev, [next.id]: emptyTables(next) }));
    setDashboardByJobId((prev) => ({
      ...prev,
      [next.id]: createEmptyLoadsDashboard(),
    }));
    setDetailsByJobId((prev) => ({
      ...prev,
      [next.id]: createEmptyJobDetails(next),
    }));
    setSelectedJobId(next.id);
    closeJobForm();
  };

  const submitEditJob = (payload) => {
    if (!editingJobId) {
      return;
    }

    const existingJob =
      jobs.find((job) => job.id === editingJobId) || { id: editingJobId };
    const updatedJob = applyPayloadToJob(existingJob, payload);

    setJobs((prev) =>
      prev.map((job) => (job.id === editingJobId ? updatedJob : job))
    );
    setDetailsByJobId((prev) => {
      const current = prev[editingJobId];
      return {
        ...prev,
        [editingJobId]: current
          ? {
              ...current,
              statusLabel: updatedJob.status,
              operatorLabel: updatedJob.operator,
              locationName: updatedJob.destination || current.locationName,
            }
          : createEmptyJobDetails(updatedJob),
      };
    });
    closeJobForm();
  };

  const deleteJob = (jobId) => {
    const job = jobs.find((item) => item.id === jobId);
    if (job?.source === "demo") {
      setMenuJobId(null);
      return;
    }

    setJobs((prev) => prev.filter((item) => item.id !== jobId));
    setLoadsByJobId((prev) => {
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
    setTablesByJobId((prev) => {
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
    setDashboardByJobId((prev) => {
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
    setDetailsByJobId((prev) => {
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
    if (selectedJobId === jobId) {
      setSelectedJobId(null);
    }
    setMenuJobId(null);
  };

  return (
    <div className="jobs-workspace">
      <aside className="box-company-sidebar jobs-list-panel">
        <div className="simple-grid-filter jobs-toolbar">
          <button
            type="button"
            className="new-admin-button jobs-add-button"
            onClick={openAddJob}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            Add Job
          </button>

          <label className="jobs-group-by">
            <span>Group by</span>
            <select
              value={groupBy}
              onChange={(event) => setGroupBy(event.target.value)}
              aria-label="Group jobs by"
            >
              {JOB_GROUP_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="jobs-toolbar-actions">
            {searchOpen ? (
              <div className="jobs-search-field">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  ref={searchRef}
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search jobs..."
                  aria-label="Search jobs"
                />
                <button
                  type="button"
                  className="jobs-icon-button"
                  aria-label="Close search"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="jobs-search-button"
                title="Search"
                aria-label="Search jobs"
                onClick={() => setSearchOpen(true)}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
                Search
              </button>
            )}
          </div>
        </div>

        {!USE_TENANT_JOBS_DEMO && (
          <div className="jobs-demo-banner">
            Demo mode is off. Connect a tenant jobs API to populate this list.
          </div>
        )}
        <div className="box-company-list jobs-list-scroll">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <p>
                {jobs.length === 0
                  ? "No jobs available."
                  : "No jobs match your search."}
              </p>
            </div>
          ) : (
            Object.entries(groupedJobs).map(([groupName, groupJobs]) => (
              <div key={groupName} className="jobs-group">
                {groupName !== "Ungrouped" ? (
                  <div className="jobs-group-heading">{groupName}</div>
                ) : null}
                <div className="list">
                  {groupJobs.map((job) => {
                    const status =
                      STATUS_META[job.status] || STATUS_META.Pending;
                    return (
                      <article
                        key={job.id}
                        className={`list-item ${
                          selectedJobId === job.id ? "active" : ""
                        }`}
                        onClick={() => setSelectedJobId(job.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedJobId(job.id);
                          }
                        }}
                      >
                        <div className="list-left">
                          <span
                            className="avatar circle w-40 blue-grey"
                            aria-hidden="true"
                          >
                            {job.initials}
                            <i className={status.className}></i>
                          </span>
                        </div>

                        <div className="list-body">
                          <div className="item-title">
                            <a
                              href={`#job-${job.id}`}
                              onClick={(event) => event.preventDefault()}
                            >
                              {job.name}
                            </a>
                          </div>
                          <div className="text-ellipsis jobs-item-meta">
                            {job.operator ? (
                              <span className="jobs-meta-part">
                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                {job.operator}
                              </span>
                            ) : null}
                            {job.company ? (
                              <span className="jobs-meta-part">
                                <i className="fa fa-users" aria-hidden="true"></i>
                                {job.company}
                              </span>
                            ) : null}
                            {!job.operator && !job.company ? status.label : null}
                          </div>
                        </div>

                        <div
                          className="jobs-item-menu"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="jobs-menu-trigger"
                            aria-label={`Actions for ${job.name}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              setMenuJobId((current) =>
                                current === job.id ? null : job.id
                              );
                            }}
                          >
                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                          </button>

                          {menuJobId === job.id && (
                            <div className="jobs-overflow-menu">
                              <button
                                type="button"
                                onClick={() => setSelectedJobId(job.id)}
                              >
                                View details
                              </button>
                              {job.source !== "demo" && (
                                <button
                                  type="button"
                                  onClick={() => deleteJob(job.id)}
                                >
                                  Delete draft
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {selectedJob ? (
        <JobDetailPanel
          key={selectedJob.id}
          job={selectedJob}
          loads={loadsByJobId[selectedJob.id] || emptyLoads()}
          tables={tablesByJobId[selectedJob.id] || emptyTables(selectedJob)}
          dashboard={
            dashboardByJobId[selectedJob.id] || createEmptyLoadsDashboard()
          }
          details={
            detailsByJobId[selectedJob.id] || createEmptyJobDetails(selectedJob)
          }
          onOpenJobSettings={openJobSettings}
        />
      ) : (
        <section className="jobs-detail-panel">
          <div className="no-jobs jobs-detail-empty">
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <p>Select a job to view its details.</p>
          </div>
        </section>
      )}

      {isAddJobOpen ? (
        <AddJobModal
          key={
            jobFormMode === "edit"
              ? `edit-${editingJobId}`
              : `create-${formSequence}`
          }
          mode={jobFormMode}
          sequence={formSequence}
          initialValues={
            jobFormMode === "edit" && editingJobId
              ? buildAddJobFormFromJob(
                  jobs.find((job) => job.id === editingJobId)
                )
              : null
          }
          onClose={closeJobForm}
          onSubmit={jobFormMode === "edit" ? submitEditJob : submitAddJob}
        />
      ) : null}
    </div>
  );
}

export default JobsWorkspace;


import { useMemo, useState } from "react";
import "../../css/dashboard.css";

const TODAY = "2026-10-28";

const INITIAL_BOX_HISTORY = [
    {
        id: 1,
        boxNo: "13500",
        company: "Abraxas",
        jobName: "Warehouse Move",
        loadNo: "LD-001",
        driverName: "John Smith",
        carrierCompany: "Liberty Transport",
        supervisorName: "David Wilson",
        supervisorCompany: "Abraxas",
        terminal: "2026-10-01T08:45:00",
        transit: null,
        destination: null,
        delivered: null,
    },
    {
        id: 2,
        boxNo: "13500",
        company: "Anschutz Corporation",
        jobName: "Retail Delivery",
        loadNo: "LD-002",
        driverName: "Mike Johnson",
        carrierCompany: "Global Freight Carrier",
        supervisorName: "Robert Davis",
        supervisorCompany: "Anschutz Corporation",
        terminal: "2026-10-03T09:15:00",
        transit: "2026-10-03T11:30:00",
        destination: "2026-10-03T13:10:00",
        delivered: "2026-10-03T14:30:00",
    },
];

const BOX_STAGES = [
    { key: "terminal", label: "At Terminal" },
    { key: "transit", label: "In Transit" },
    { key: "destination", label: "Destination" },
    { key: "delivered", label: "Delivered" },
];

function formatTimelineDate(value) {
    if (!value) return null;

    const date = new Date(value);

    return {
        date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
        time: date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }),
    };
}

function BoxTimelineStage({ stage, job }) {
    const timestamp = job[stage.key];
    const dateTime = formatTimelineDate(timestamp);
    const isTerminal = stage.key === "terminal";

    return (
        <div
            className={`box-timeline-stage ${
                dateTime ? "is-complete" : "is-pending"
            }`}
        >
            <div className="box-timeline-stage-content">
                <div className="box-timeline-stage-heading">
                    <span
                        className={`box-timeline-stage-dot ${
                            dateTime ? "is-complete" : ""
                        }`}
                    />
                    <strong>{stage.label}</strong>
                </div>

                {dateTime && (
                    <div className="box-timeline-scan-information">
                        <div className="box-timeline-scan-field">
                            <span className="box-timeline-field-label">
                                Driver
                            </span>
                            <span className="box-timeline-field-value">
                                {job.driverName}
                            </span>
                        </div>

                        <div className="box-timeline-scan-field">
                            <span className="box-timeline-field-label">
                                Scanned by
                            </span>

                            <span className="box-timeline-field-value">
                                {isTerminal
                                    ? job.supervisorCompany
                                    : job.carrierCompany}
                            </span>

                            <span
                                className={`box-timeline-role ${
                                    isTerminal ? "supervisor" : "driver"
                                }`}
                            >
                                {isTerminal
                                    ? `Supervisor · ${job.supervisorName}`
                                    : `Driver · ${job.driverName}`}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="box-timeline-stage-time">
                {dateTime ? (
                    <>
                        <span>
                            <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                            />
                            {dateTime.date}
                        </span>
                        <span>
                            <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                            />
                            {dateTime.time}
                        </span>
                    </>
                ) : (
                    <span className="box-timeline-no-time">—</span>
                )}
            </div>
        </div>
    );
}

function BoxTimelineCard({ job, side }) {
    return (
        <article className={`box-timeline-card ${side}`}>
            <header className="box-timeline-card-header">
                <span className="box-timeline-company-icon">
                    <i className="fa fa-building" aria-hidden="true" />
                </span>

                <div className="box-timeline-job-information">
                    <h3>{job.company}</h3>
                    <span>Job: {job.jobName}</span>
                    <span>Load No: {job.loadNo}</span>
                </div>

                <div className="box-timeline-box-number">
                    <span>Box No.</span>
                    <strong>{job.boxNo}</strong>
                </div>
            </header>

            <div className="box-timeline-stages">
                {BOX_STAGES.map((stage) => (
                    <BoxTimelineStage
                        key={stage.key}
                        stage={stage}
                        job={job}
                    />
                ))}
            </div>
        </article>
    );
}

function BoxTimeline() {
    const [boxNo, setBoxNo] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [filters, setFilters] = useState({
        boxNo: "",
        startDate: "",
        endDate: "",
    });


    const filteredJobs = useMemo(() => {
        // Keep the timeline empty until the filter has enough information.
        if (!filters.boxNo || !filters.startDate || !filters.endDate) {
            return [];
        }

        if (filters.startDate > filters.endDate) {
            return [];
        }

        return INITIAL_BOX_HISTORY.filter((job) => {
            if (job.boxNo !== filters.boxNo) {
                return false;
            }

            return BOX_STAGES.some((stage) => {
                const timestamp = job[stage.key];

                if (!timestamp) {
                    return false;
                }

                const stageDate = timestamp.slice(0, 10);

                return (
                    stageDate >= filters.startDate &&
                    stageDate <= filters.endDate
                );
            });
        });
    }, [filters]);

    const handleApplyFilter = (event) => {
        event.preventDefault();

        setFilters({
            boxNo: boxNo.trim(),
            startDate,
            endDate,
        });
    };


    return (
        <div className="box-timeline-page">
            <div className="box-timeline-page-header">
                {/* <div className="box-timeline-heading">
                    <nav
                        className="box-timeline-breadcrumb"
                        aria-label="Breadcrumb"
                    >
                        <span>Dashboard</span>
                        <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                        />
                        <strong>Box Timeline</strong>
                    </nav>

                    <h2>Box Timeline</h2>
                    <p>
                        Track box usage across jobs and delivery stages.
                    </p>
                </div> */}

                <form
                    className="box-timeline-filters"
                    onSubmit={handleApplyFilter}
                >
                    <label className="box-timeline-filter-field box-no-filter">
                        <span>Box No.</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={boxNo}
                            onChange={(event) => setBoxNo(event.target.value.replace(/\D/g, ""))}
                            placeholder="Enter box number"
                            aria-label="Box number"
                        />
                    </label>

                    <label className="box-timeline-filter-field">
                        <span>Start Date</span>
                        <input
                            type="date"
                            value={startDate}
                            max={TODAY}
                            onChange={(event) =>
                                setStartDate(event.target.value)
                            }
                        />
                    </label>

                    <label className="box-timeline-filter-field">
                        <span>End Date</span>
                        <input
                            type="date"
                            value={endDate}
                            min={startDate || undefined}
                            max={TODAY}
                            onChange={(event) =>
                                setEndDate(event.target.value)
                            }
                        />
                    </label>

                    <button
                        type="submit"
                        className="box-timeline-apply-button"
                    >
                        <i className="fa fa-filter" aria-hidden="true" />
                        Apply Filter
                    </button>
                </form>
            </div>

            <div className="box-timeline-results">
                <div className="box-timeline-results-header">
                    <span>
                        {/* Box <strong>{filters.boxNo}</strong> */}
                    </span>
                    <span className="box-timeline-results-count">
                        {filteredJobs.length}{" "}
                        {filteredJobs.length === 1 ? "job" : "jobs"} found
                    </span>
                </div>

                {filteredJobs.length > 0 ? (
                    <div className="box-timeline-track">
                        <div
                            className="box-timeline-center-line"
                            aria-hidden="true"
                        />

                        <div
                            className="box-timeline-track-marker"
                            aria-hidden="true"
                        >
                            <i className="fa fa-cube" />
                        </div>

                        {filteredJobs.map((job, index) => (
                            <div
                                key={job.id}
                                className={`box-timeline-entry ${
                                    index % 2 === 0 ? "left" : "right"
                                }`}
                            >
                                <span
                                    className="box-timeline-entry-node"
                                    aria-hidden="true"
                                />

                                <BoxTimelineCard
                                    job={job}
                                    side={
                                        index % 2 === 0
                                            ? "left-card"
                                            : "right-card"
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="box-timeline-empty-state">
                        <i className="fa fa-search" aria-hidden="true" />
                        <h3>No box history found</h3>
                        <p>
                            {!filters.boxNo || !filters.startDate || !filters.endDate
                            ? "Enter a box number and select both dates to view box history."
                            : filters.startDate > filters.endDate
                            ? "The start date must be on or before the end date."
                            : `No jobs for box ${filters.boxNo} were found in the selected date range.`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoxTimeline;

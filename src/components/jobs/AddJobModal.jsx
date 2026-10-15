import { useMemo, useState } from "react";
import {
  ADD_JOB_DEMO_OPTIONS,
  ADD_JOB_TYPES,
  createEmptyAddJobForm,
  getAddJobTabs,
  sanitizeAddJobPayload,
} from "../../data/addJobFormConfig";
import {
  CarrierTab,
  HopperTab,
  NotesTab,
  PermissionsTab,
  PicturesTab,
  ProductsTab,
  RolesTab,
  SiloBeltsSection,
  SilosTab,
  TerminalTab,
  WellsTab,
} from "./addJobTabs/AddJobTabPanels";

function RequiredMark() {
  return (
    <span className="settings-required" aria-hidden="true">
      *
    </span>
  );
}

function FieldLabel({ children, required = false }) {
  return (
    <span>
      {children}
      {required ? <RequiredMark /> : null}
    </span>
  );
}

function SelectWithAdd({
  id,
  label,
  required,
  value,
  onChange,
  options,
  onAdd,
}) {
  return (
    <label className="add-job-field" htmlFor={id}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="add-job-select-with-add">
        <select id={id} value={value} onChange={onChange}>
          {options.map((option) => (
            <option
              key={option}
              value={option.startsWith("Select") ? "" : option}
              disabled={option.startsWith("Select")}
            >
              {option}
            </option>
          ))}
        </select>
        {onAdd ? (
          <button
            type="button"
            className="add-job-inline-add"
            aria-label={`Add ${label}`}
            onClick={onAdd}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        ) : null}
      </div>
    </label>
  );
}

/**
 * New Job / Edit Job modal with Job Type–driven tabs.
 * Demo-only: does not call create/update job APIs.
 *
 * @param {"create"|"edit"} [mode]
 * @param {object} [initialValues] - form state for edit mode
 */
function AddJobModal({
  mode = "create",
  sequence = 1,
  initialValues = null,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(() =>
    isEdit && initialValues
      ? initialValues
      : createEmptyAddJobForm(sequence)
  );
  const [activeTab, setActiveTab] = useState("Settings");
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const tabs = useMemo(() => getAddJobTabs(form.jobType), [form.jobType]);
  const resolvedActiveTab = tabs.includes(activeTab)
    ? activeTab
    : tabs[0] || "Settings";

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleJobTypeChange = (jobType) => {
    const nextTabs = getAddJobTabs(jobType);
    setForm((prev) => ({ ...prev, jobType }));
    setActiveTab((prev) =>
      nextTabs.includes(prev) ? prev : nextTabs[0] || "Settings"
    );
  };

  const handleSectionSave = () => {
    showNotice(
      isEdit
        ? `${resolvedActiveTab} kept in local form state. Update Job saves this job locally — no job API is connected.`
        : `${resolvedActiveTab} kept in local form state. Save Job creates a demo draft only — no job API is connected.`
    );
  };

  const validateSettings = () => {
    const nextErrors = {};
    if (!form.jobName.trim()) {
      nextErrors.jobName = "Job Name is required.";
    }
    if (!form.jobType) {
      nextErrors.jobType = "Job Type is required.";
    }
    // Edit mode: allow incomplete demo jobs; create mode keeps required checks.
    if (!isEdit) {
      if (!form.destination) {
        nextErrors.destination = "Destination is required.";
      }
      if (!form.crew) {
        nextErrors.crew = "Crew is required.";
      }
      if (!form.basin) {
        nextErrors.basin = "Basin is required.";
      }
      if (!form.district.trim()) {
        nextErrors.district = "District is required.";
      }
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateSettings();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setActiveTab("Settings");
      showNotice("Fix the required Settings fields before saving.");
      return;
    }

    const payload = sanitizeAddJobPayload(form);
    onSubmit(payload);
  };

  const renderSettingsTab = () => (
    <div className="add-job-settings">
      <div className="add-job-settings-grid">
        <div className="add-job-settings-col">
          <label
            className={`add-job-field ${errors.jobName ? "has-error" : ""}`}
          >
            <FieldLabel required>Job Name:</FieldLabel>
            <input
              type="text"
              value={form.jobName}
              onChange={(event) => updateField("jobName", event.target.value)}
            />
            {errors.jobName ? (
              <span className="field-error-message">{errors.jobName}</span>
            ) : null}
          </label>

          <label className="add-job-field">
            <FieldLabel>Start Date:</FieldLabel>
            <div className="add-job-date-field">
              <input
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  updateField("startDate", event.target.value)
                }
              />
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </div>
          </label>

          <div className={errors.destination ? "has-error" : ""}>
            <SelectWithAdd
              id="add-job-destination"
              label="Destination:"
              required
              value={form.destination}
              options={ADD_JOB_DEMO_OPTIONS.destinations}
              onChange={(event) =>
                updateField("destination", event.target.value)
              }
              onAdd={() =>
                showNotice(
                  "Add Destination requires a destinations API (not connected)."
                )
              }
            />
            {errors.destination ? (
              <span className="field-error-message">{errors.destination}</span>
            ) : null}
          </div>

          <SelectWithAdd
            id="add-job-appt"
            label="Use Appt Time:"
            value={form.useApptTime}
            options={ADD_JOB_DEMO_OPTIONS.useApptTime}
            onChange={(event) => updateField("useApptTime", event.target.value)}
          />

          <label className="add-job-field">
            <FieldLabel>Carrier PO:</FieldLabel>
            <input
              type="text"
              value={form.carrierPo}
              onChange={(event) => updateField("carrierPo", event.target.value)}
            />
          </label>

          <div className={errors.crew ? "has-error" : ""}>
            <SelectWithAdd
              id="add-job-crew"
              label="Crew:"
              required
              value={form.crew}
              options={ADD_JOB_DEMO_OPTIONS.crews}
              onChange={(event) => updateField("crew", event.target.value)}
            />
            {errors.crew ? (
              <span className="field-error-message">{errors.crew}</span>
            ) : null}
          </div>

          <label className="add-job-field">
            <FieldLabel>Freight PO:</FieldLabel>
            <input
              type="text"
              value={form.freightPo}
              onChange={(event) => updateField("freightPo", event.target.value)}
            />
          </label>

          <div className={errors.basin ? "has-error" : ""}>
            <SelectWithAdd
              id="add-job-basin"
              label="Basin:"
              required
              value={form.basin}
              options={ADD_JOB_DEMO_OPTIONS.basins}
              onChange={(event) => updateField("basin", event.target.value)}
            />
            {errors.basin ? (
              <span className="field-error-message">{errors.basin}</span>
            ) : null}
          </div>
        </div>

        <div className="add-job-settings-col">
          <label
            className={`add-job-field ${errors.jobType ? "has-error" : ""}`}
          >
            <FieldLabel required>Job Type:</FieldLabel>
            <select
              value={form.jobType}
              onChange={(event) => handleJobTypeChange(event.target.value)}
            >
              {ADD_JOB_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.jobType ? (
              <span className="field-error-message">{errors.jobType}</span>
            ) : null}
          </label>

          <label className="add-job-field">
            <FieldLabel>End Date:</FieldLabel>
            <div className="add-job-date-field">
              <input
                type="date"
                value={form.endDate}
                onChange={(event) => updateField("endDate", event.target.value)}
              />
              <i className="fa fa-calendar" aria-hidden="true"></i>
            </div>
          </label>

          <label className="add-job-field">
            <FieldLabel>Loads Requirements:</FieldLabel>
            <input
              type="text"
              value={form.loadsRequirements}
              onChange={(event) =>
                updateField("loadsRequirements", event.target.value)
              }
            />
          </label>

          <SelectWithAdd
            id="add-job-checkin"
            label="Check In Type:"
            value={form.checkInType}
            options={ADD_JOB_DEMO_OPTIONS.checkInTypes}
            onChange={(event) =>
              updateField("checkInType", event.target.value)
            }
          />

          <label
            className={`add-job-field ${errors.district ? "has-error" : ""}`}
          >
            <FieldLabel required>District:</FieldLabel>
            <input
              type="text"
              value={form.district}
              onChange={(event) => updateField("district", event.target.value)}
            />
            {errors.district ? (
              <span className="field-error-message">{errors.district}</span>
            ) : null}
          </label>

          <SelectWithAdd
            id="add-job-region"
            label="Region:"
            value={form.region}
            options={ADD_JOB_DEMO_OPTIONS.regions}
            onChange={(event) => updateField("region", event.target.value)}
          />

          <SelectWithAdd
            id="add-job-frost"
            label="Frost Law:"
            value={form.frostLaw}
            options={ADD_JOB_DEMO_OPTIONS.frostLaw}
            onChange={(event) => updateField("frostLaw", event.target.value)}
          />

          <label className="add-job-field">
            <FieldLabel>Stages per Day:</FieldLabel>
            <input
              type="text"
              value={form.stagesPerDay}
              onChange={(event) =>
                updateField("stagesPerDay", event.target.value)
              }
            />
          </label>
        </div>
      </div>

      {form.jobType === "Silo" ? (
        <div className="add-job-settings-silo-belts">
          <SiloBeltsSection form={form} setForm={setForm} />
        </div>
      ) : null}
    </div>
  );

  const tabPanelProps = {
    form,
    setForm,
    onSectionSave: handleSectionSave,
    onNotice: showNotice,
  };

  const renderActiveTab = () => {
    switch (resolvedActiveTab) {
      case "Settings":
        return renderSettingsTab();
      case "Wells":
        return <WellsTab {...tabPanelProps} />;
      case "Roles":
        return <RolesTab {...tabPanelProps} />;
      case "Products":
        return <ProductsTab {...tabPanelProps} />;
      case "Silos":
        return <SilosTab {...tabPanelProps} />;
      case "Hopper":
        return <HopperTab {...tabPanelProps} />;
      case "Carrier":
        return <CarrierTab {...tabPanelProps} />;
      case "Permissions":
        return <PermissionsTab {...tabPanelProps} />;
      case "Terminal":
        return <TerminalTab {...tabPanelProps} />;
      case "Notes":
        return <NotesTab {...tabPanelProps} />;
      case "Pictures":
        return <PicturesTab {...tabPanelProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="user-modal-backdrop add-job-backdrop" role="presentation">
      <div
        className="user-modal add-job-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-job-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="user-modal-header add-job-modal-header">
          <h3 id="add-job-title">{isEdit ? "Edit Job" : "New Job"}</h3>
          <button
            type="button"
            className="user-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="add-job-wizard-tabs" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={resolvedActiveTab === tab}
              className={`add-job-wizard-tab ${
                resolvedActiveTab === tab ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <span>{tab}</span>
              {index < tabs.length - 1 ? (
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              ) : null}
            </button>
          ))}
        </div>

        {notice ? (
          <div className="loads-demo-notice" role="status">
            {notice}
          </div>
        ) : null}

        <form className="add-job-form" onSubmit={handleSubmit} noValidate>
          <div className="add-job-form-scroll">{renderActiveTab()}</div>

          <div className="user-form-actions add-job-footer">
            <button
              type="button"
              className="user-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="new-admin-button">
              {isEdit ? "Update Job" : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;

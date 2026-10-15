import { useMemo, useRef, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import {
  DATE_FORMAT_OPTIONS,
  SETTINGS_NAV,
  SETTINGS_SECTION_TITLES,
  TIME_FORMAT_OPTIONS,
  USE_TENANT_SETTINGS_DEMO,
  getCompanyDetailDemoSeed,
  getInitialCompanyDetail,
} from "../../data/tenantSettingsDemo";

function requiredLabel(text) {
  return (
    <>
      {text}
      <span className="settings-required" aria-hidden="true">
        *
      </span>
    </>
  );
}

function validateCompanyDetail(form) {
  const errors = {};
  if (!form.companyName.trim()) {
    errors.companyName = "Company Name is required.";
  }
  if (!form.address.trim()) {
    errors.address = "Address is required.";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

function CompanyDetailForm({ initialValues }) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [statusNotice, setStatusNotice] = useState("");
  const [photoPreview, setPhotoPreview] = useState(initialValues.photoUrl || "");
  const fileInputRef = useRef(null);

  const showNotice = (message) => {
    setStatusNotice(message);
    window.setTimeout(() => setStatusNotice(""), 3500);
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

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      showNotice("Choose an image file for the company photo.");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
    showNotice(
      "Photo selected locally only. A company logo upload API is not connected."
    );
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const nextErrors = validateCompanyDetail(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      showNotice("Fix the highlighted fields before updating.");
      return;
    }

    // No tenant company-settings API in this frontend — do not pretend save succeeded.
    showNotice(
      "Company Detail is not saved. Connect a tenant company settings API to persist changes."
    );
  };

  return (
    <form className="settings-company-detail" onSubmit={handleUpdate} noValidate>
      <div className="admin-users-header settings-section-header">
        <h2>Company Detail</h2>
      </div>

      {statusNotice ? (
        <div className="loads-demo-notice" role="status">
          {statusNotice}
        </div>
      ) : null}

      {!USE_TENANT_SETTINGS_DEMO ? (
        <div className="jobs-demo-banner">
          Demo seed is off. Fields are prefilled from the session where
          available. A tenant company settings API is still required to load and
          save configuration.
        </div>
      ) : null}

      <div className="settings-company-layout">
        <div className="settings-company-fields">
          <div className={`form-group ${errors.companyName ? "has-error" : ""}`}>
            <label htmlFor="settings-company-name">
              {requiredLabel("Company Name:")}
            </label>
            <input
              id="settings-company-name"
              type="text"
              value={form.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
              aria-invalid={Boolean(errors.companyName)}
            />
            {errors.companyName ? (
              <span className="field-error-message">{errors.companyName}</span>
            ) : null}
          </div>

          <div className={`form-group ${errors.address ? "has-error" : ""}`}>
            <label htmlFor="settings-address">{requiredLabel("Address:")}</label>
            <input
              id="settings-address"
              type="text"
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              aria-invalid={Boolean(errors.address)}
            />
            {errors.address ? (
              <span className="field-error-message">{errors.address}</span>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="settings-phone">Phone:</label>
            <input
              id="settings-phone"
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </div>

          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="settings-email">{requiredLabel("Email:")}</label>
            <input
              id="settings-email"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <span className="field-error-message">{errors.email}</span>
            ) : null}
          </div>

          <div className="settings-format-row">
            <div className="form-group">
              <label htmlFor="settings-date-format">Date Format</label>
              <select
                id="settings-date-format"
                value={form.dateFormat}
                onChange={(event) =>
                  updateField("dateFormat", event.target.value)
                }
              >
                {DATE_FORMAT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="settings-time-format">Time Format</label>
              <select
                id="settings-time-format"
                value={form.timeFormat}
                onChange={(event) =>
                  updateField("timeFormat", event.target.value)
                }
              >
                {TIME_FORMAT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="settings-form-actions">
            <button type="submit" className="new-admin-button">
              Update
            </button>
          </div>
        </div>

        <aside className="settings-photo-panel">
          <div className="settings-photo-preview" aria-hidden="true">
            {photoPreview ? (
              <img src={photoPreview} alt="" />
            ) : (
              <i className="fa fa-building" aria-hidden="true"></i>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="settings-photo-input"
            onChange={handlePhotoChange}
          />
          <button
            type="button"
            className="settings-upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </button>
        </aside>
      </div>
    </form>
  );
}

function SettingsPlaceholder({ title }) {
  return (
    <div className="settings-placeholder">
      <div className="admin-users-header settings-section-header">
        <h2>{title}</h2>
      </div>
      <div className="admin-users-card">
        <div className="admin-users-card-header">
          <h3>{title}</h3>
        </div>
        <div className="tenant-module-empty">
          <i className="fa fa-info-circle" aria-hidden="true"></i>
          <p>
            This settings section is not connected to a tenant API in the
            current React frontend.
          </p>
          <span className="admin-status-inactive">No API connected</span>
        </div>
      </div>
    </div>
  );
}

function SettingsWorkspace() {
  const { user } = useAuth();
  const [navOpen, setNavOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("company-details");
  const [expandedGroups, setExpandedGroups] = useState({
    companies: true,
    locations: true,
    "map-po-data": true,
    assets: true,
    users: true,
  });

  const companyInitial = useMemo(() => {
    // Demo seed matches setting.png for UI review only (flagged, not persisted).
    // When demo is off, seed from the auth session; a settings GET is still required.
    return getCompanyDetailDemoSeed() || getInitialCompanyDetail(user);
  }, [user]);

  const toggleGroup = (groupId) => {
    setExpandedGroups((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  };

  const renderNavItem = (item) => {
    if (item.children?.length) {
      const isExpanded = Boolean(expandedGroups[item.id]);
      return (
        <div key={item.id} className="settings-nav-group">
          <button
            type="button"
            className="box-settings-link settings-nav-parent"
            aria-expanded={isExpanded}
            onClick={() => toggleGroup(item.id)}
          >
            <span>{item.label}</span>
            <i
              className={`fa ${
                isExpanded ? "fa-chevron-down" : "fa-chevron-right"
              }`}
              aria-hidden="true"
            ></i>
          </button>
          {isExpanded
            ? item.children.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  className={`box-settings-link settings-nav-child ${
                    activeSection === child.id ? "active" : ""
                  }`}
                  onClick={() => setActiveSection(child.id)}
                >
                  {child.label}
                </button>
              ))
            : null}
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="settings-workspace box-workspace">
      {navOpen ? (
        <aside className="box-settings-panel" aria-label="Settings">
          <div className="box-settings-header">
            <h2>Settings</h2>
            <button
              type="button"
              className="box-settings-close"
              aria-label="Close Settings menu"
              onClick={() => setNavOpen(false)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <nav className="box-settings-nav settings-nav">
            {SETTINGS_NAV.map(renderNavItem)}
          </nav>
        </aside>
      ) : (
        <button
          type="button"
          className="box-settings-reopen"
          onClick={() => setNavOpen(true)}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
          Settings
        </button>
      )}

      <div className="box-main-content settings-main-content">
        {activeSection === "company-details" ? (
          <CompanyDetailForm
            key={`${user?.id || "anon"}-${USE_TENANT_SETTINGS_DEMO}`}
            initialValues={companyInitial}
          />
        ) : (
          <SettingsPlaceholder
            title={SETTINGS_SECTION_TITLES[activeSection] || "Settings"}
          />
        )}
      </div>
    </div>
  );
}

export default SettingsWorkspace;

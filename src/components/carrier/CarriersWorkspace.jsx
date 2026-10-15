import { useEffect, useMemo, useRef, useState } from "react";
import {
  USE_TENANT_CARRIERS_DEMO,
  createTenantCarrierDraft,
  getTenantCarriersDemoData,
} from "../../data/tenantCarriersDemo";
import CarrierDetailPanel from "./CarrierDetailPanel";

const STATUS_META = {
  Active: { className: "success", label: "Active" },
  Inactive: { className: "danger", label: "Inactive" },
};

/**
 * Tenant Carriers three-panel workspace (Jobs-style list + detail).
 * Uses isolated frontend demo fixtures when USE_TENANT_CARRIERS_DEMO is true.
 * Swap getTenantCarriersDemoData() for a tenant API client later.
 */
function CarriersWorkspace() {
  const initialDemo = useMemo(() => getTenantCarriersDemoData(), []);
  const [carriers, setCarriers] = useState(initialDemo.carriers);
  const [costSettingsByCarrierId, setCostSettingsByCarrierId] = useState(
    initialDemo.costSettingsByCarrierId
  );
  const [driversByCarrierId, setDriversByCarrierId] = useState(
    initialDemo.driversByCarrierId
  );
  const [selectedCarrierId, setSelectedCarrierId] = useState(
    () => initialDemo.carriers[0]?.id || null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuCarrierId, setMenuCarrierId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [draftForm, setDraftForm] = useState({
    name: "",
    location: "",
    contactPerson: "",
    email: "",
    status: "Active",
  });
  const searchRef = useRef(null);
  const draftCountRef = useRef(1);

  const selectedCarrier =
    carriers.find((carrier) => carrier.id === selectedCarrierId) || null;

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const closeMenu = () => setMenuCarrierId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const filteredCarriers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return carriers;
    }
    return carriers.filter(
      (carrier) =>
        carrier.name.toLowerCase().includes(term) ||
        (carrier.location || "").toLowerCase().includes(term) ||
        (carrier.contactPerson || "").toLowerCase().includes(term) ||
        (carrier.email || "").toLowerCase().includes(term) ||
        carrier.status.toLowerCase().includes(term)
    );
  }, [carriers, searchTerm]);

  const openAddCarrier = () => {
    const sequence = draftCountRef.current;
    setDraftForm({
      name: `Demo Carrier ${sequence}`,
      location: "Denver, CO, USA",
      contactPerson: `Demo Carrier ${sequence}`,
      email: `carrier${sequence}@example.com`,
      status: "Active",
    });
    setIsAddOpen(true);
    setMenuCarrierId(null);
  };

  const submitAddCarrier = (event) => {
    event.preventDefault();
    const draft = createTenantCarrierDraft(draftCountRef.current);
    draftCountRef.current += 1;
    const name = draftForm.name.trim() || draft.name;
    const next = {
      ...draft,
      name,
      location: draftForm.location.trim() || draft.location,
      contactPerson:
        draftForm.contactPerson.trim() || draftForm.name.trim() || draft.name,
      email: draftForm.email.trim() || draft.email,
      status: draftForm.status,
      statusClass: STATUS_META[draftForm.status]?.className || "success",
      initials: name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
    };

    setCarriers((prev) => [next, ...prev]);
    setCostSettingsByCarrierId((prev) => ({ ...prev, [next.id]: [] }));
    setDriversByCarrierId((prev) => ({ ...prev, [next.id]: [] }));
    setSelectedCarrierId(next.id);
    setIsAddOpen(false);
  };

  const updateCarrierStatus = (carrierId, status) => {
    setCarriers((prev) =>
      prev.map((carrier) =>
        carrier.id === carrierId
          ? {
              ...carrier,
              status,
              statusClass: STATUS_META[status]?.className || carrier.statusClass,
            }
          : carrier
      )
    );
  };

  const deleteCarrier = (carrierId) => {
    const carrier = carriers.find((item) => item.id === carrierId);
    if (carrier?.source === "demo") {
      setMenuCarrierId(null);
      return;
    }

    setCarriers((prev) => prev.filter((item) => item.id !== carrierId));
    setCostSettingsByCarrierId((prev) => {
      const next = { ...prev };
      delete next[carrierId];
      return next;
    });
    setDriversByCarrierId((prev) => {
      const next = { ...prev };
      delete next[carrierId];
      return next;
    });
    if (selectedCarrierId === carrierId) {
      setSelectedCarrierId(null);
    }
    setMenuCarrierId(null);
  };

  return (
    <div className="jobs-workspace carriers-workspace">
      <aside className="jobs-list-panel col-box">
        <div className="simple-grid-filter jobs-toolbar">
          <button
            type="button"
            className="new-admin-button jobs-add-button"
            onClick={openAddCarrier}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            Add Carrier
          </button>

          <div className="jobs-toolbar-actions">
            {searchOpen ? (
              <div className="jobs-search-field">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  ref={searchRef}
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search carriers..."
                  aria-label="Search carriers"
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
                aria-label="Search carriers"
                onClick={() => setSearchOpen(true)}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
                Search
              </button>
            )}
          </div>
        </div>

        {!USE_TENANT_CARRIERS_DEMO && (
          <div className="jobs-demo-banner">
            Demo mode is off. Connect a tenant carriers API to populate this
            list.
          </div>
        )}

        <div className="col-box-list jobs-list-scroll">
          {filteredCarriers.length === 0 ? (
            <div className="no-jobs">
              <i className="fa fa-truck" aria-hidden="true"></i>
              <p>
                {carriers.length === 0
                  ? "No carriers available."
                  : "No carriers match your search."}
              </p>
            </div>
          ) : (
            <div className="list">
              {filteredCarriers.map((carrier) => {
                const status =
                  STATUS_META[carrier.status] || STATUS_META.Inactive;
                return (
                  <div
                    key={carrier.id}
                    className={`list-item ${
                      selectedCarrierId === carrier.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedCarrierId(carrier.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedCarrierId(carrier.id);
                      }
                    }}
                  >
                    <div className="list-left">
                      <span
                        className="avatar circle w-40 blue-grey"
                        aria-hidden="true"
                      >
                        {carrier.initials}
                        <i className={status.className}></i>
                      </span>
                    </div>

                    <div className="list-body">
                      <div className="item-title">
                        <a
                          href={`#carrier-${carrier.id}`}
                          onClick={(event) => event.preventDefault()}
                        >
                          {carrier.name}
                        </a>
                      </div>
                      <div className="text-ellipsis jobs-item-meta">
                        {carrier.location || status.label}
                      </div>
                    </div>

                    <div
                      className="jobs-item-menu"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="jobs-menu-trigger"
                        aria-label={`Actions for ${carrier.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setMenuCarrierId((current) =>
                            current === carrier.id ? null : carrier.id
                          );
                        }}
                      >
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </button>

                      {menuCarrierId === carrier.id && (
                        <div className="jobs-overflow-menu">
                          <button
                            type="button"
                            onClick={() => setSelectedCarrierId(carrier.id)}
                          >
                            View details
                          </button>
                          {carrier.source !== "demo" && (
                            <button
                              type="button"
                              onClick={() => deleteCarrier(carrier.id)}
                            >
                              Delete draft
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      {selectedCarrier ? (
        <CarrierDetailPanel
          key={selectedCarrier.id}
          carrier={selectedCarrier}
          costSettings={costSettingsByCarrierId[selectedCarrier.id] || []}
          drivers={driversByCarrierId[selectedCarrier.id] || []}
          onStatusChange={updateCarrierStatus}
          onDelete={deleteCarrier}
        />
      ) : (
        <section className="jobs-detail-panel">
          <div className="no-jobs jobs-detail-empty">
            <i className="fa fa-truck" aria-hidden="true"></i>
            <p>Select a carrier to view its details.</p>
          </div>
        </section>
      )}

      {isAddOpen && (
        <div className="user-modal-backdrop" role="presentation">
          <div
            className="user-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-add-carrier-title"
          >
            <div className="user-modal-header">
              <div>
                <div className="user-modal-eyebrow">Frontend demo</div>
                <h3 id="demo-add-carrier-title">Add Carrier (Demo Only)</h3>
              </div>
              <button
                type="button"
                className="user-modal-close"
                aria-label="Close"
                onClick={() => setIsAddOpen(false)}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <form onSubmit={submitAddCarrier}>
              <p className="jobs-detail-source">
                This form creates a local demo draft only. It does not call
                create APIs or write to a database.
              </p>
              <div className="jobs-detail-grid">
                <label>
                  <span>Carrier name</span>
                  <input
                    type="text"
                    required
                    value={draftForm.name}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Location</span>
                  <input
                    type="text"
                    value={draftForm.location}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Contact person</span>
                  <input
                    type="text"
                    value={draftForm.contactPerson}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        contactPerson: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={draftForm.email}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Status</span>
                  <select
                    value={draftForm.status}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        status: event.target.value,
                      }))
                    }
                  >
                    {Object.keys(STATUS_META).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="user-form-actions">
                <button
                  type="button"
                  className="jobs-icon-button"
                  onClick={() => setIsAddOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="new-admin-button">
                  Create demo draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarriersWorkspace;

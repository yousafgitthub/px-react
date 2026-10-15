import { useEffect, useMemo, useRef, useState } from "react";
import {
  PO_GROUP_OPTIONS,
  USE_TENANT_PO_TRACKER_DEMO,
  createTenantPoDraft,
  formatPoListSubtitle,
  getTenantPoTrackerDemoData,
} from "../../data/tenantPoTrackerDemo";
import PoDetailPanel from "./PoDetailPanel";

const STATUS_META = {
  Active: { className: "success", label: "Active" },
  Inactive: { className: "danger", label: "Inactive" },
};

/**
 * Tenant PO Tracker three-panel workspace (Jobs-style list + detail).
 * Uses isolated frontend demo fixtures when USE_TENANT_PO_TRACKER_DEMO is true.
 * Swap getTenantPoTrackerDemoData() for a tenant API client later.
 */
function PoTrackerWorkspace() {
  const initialDemo = useMemo(() => getTenantPoTrackerDemoData(), []);
  const [purchaseOrders, setPurchaseOrders] = useState(
    initialDemo.purchaseOrders
  );
  const [transactionsByPoId, setTransactionsByPoId] = useState(
    initialDemo.transactionsByPoId
  );
  const [selectedPoId, setSelectedPoId] = useState(
    () => initialDemo.purchaseOrders[0]?.id || null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [menuPoId, setMenuPoId] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [draftForm, setDraftForm] = useState({
    poNumber: "",
    product: "",
    quantityLbs: "",
    terminal: "",
    status: "Active",
  });
  const searchRef = useRef(null);
  const draftCountRef = useRef(1);

  const selectedPo =
    purchaseOrders.find((po) => po.id === selectedPoId) || null;

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const closeMenu = () => setMenuPoId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const filteredPos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return purchaseOrders;
    }
    return purchaseOrders.filter(
      (po) =>
        po.poNumber.toLowerCase().includes(term) ||
        (po.product || "").toLowerCase().includes(term) ||
        (po.terminal || "").toLowerCase().includes(term) ||
        po.status.toLowerCase().includes(term)
    );
  }, [purchaseOrders, searchTerm]);

  const groupedPos = useMemo(() => {
    if (groupBy === "none") {
      return { Ungrouped: filteredPos };
    }

    return filteredPos.reduce((groups, po) => {
      const key = String(po[groupBy] || "Ungrouped");
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(po);
      return groups;
    }, {});
  }, [filteredPos, groupBy]);

  const toggleGroup = (groupName) => {
    setCollapsedGroups((current) => ({
      ...current,
      [groupName]: !current[groupName],
    }));
  };

  const openAddPo = () => {
    const sequence = draftCountRef.current;
    setDraftForm({
      poNumber: `Demo PO ${sequence}`,
      product: "Demo Product",
      quantityLbs: "1000000",
      terminal: "Demo Terminal",
      status: "Active",
    });
    setIsAddOpen(true);
    setMenuPoId(null);
  };

  const submitAddPo = (event) => {
    event.preventDefault();
    const draft = createTenantPoDraft(draftCountRef.current);
    draftCountRef.current += 1;
    const poNumber = draftForm.poNumber.trim() || draft.poNumber;
    const quantityLbs = Number(draftForm.quantityLbs) || draft.quantityLbs;
    const next = {
      ...draft,
      poNumber,
      product: draftForm.product.trim() || draft.product,
      quantityLbs,
      remainingLbs: quantityLbs,
      terminal: draftForm.terminal.trim() || draft.terminal,
      status: draftForm.status,
      statusClass: STATUS_META[draftForm.status]?.className || "success",
      initials: poNumber
        .replace(/^PO#:\s*/i, "")
        .split(/[\s/-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
    };

    setPurchaseOrders((prev) => [next, ...prev]);
    setTransactionsByPoId((prev) => ({ ...prev, [next.id]: [] }));
    setSelectedPoId(next.id);
    setIsAddOpen(false);
  };

  const updatePoStatus = (poId, status) => {
    setPurchaseOrders((prev) =>
      prev.map((po) =>
        po.id === poId
          ? {
              ...po,
              status,
              statusClass: STATUS_META[status]?.className || po.statusClass,
            }
          : po
      )
    );
  };

  const deletePo = (poId) => {
    const po = purchaseOrders.find((item) => item.id === poId);
    if (po?.source === "demo") {
      setMenuPoId(null);
      return;
    }

    setPurchaseOrders((prev) => prev.filter((item) => item.id !== poId));
    setTransactionsByPoId((prev) => {
      const next = { ...prev };
      delete next[poId];
      return next;
    });
    if (selectedPoId === poId) {
      setSelectedPoId(null);
    }
    setMenuPoId(null);
  };

  return (
    <div className="jobs-workspace po-tracker-workspace">
      <aside className="jobs-list-panel col-box">
        <div className="simple-grid-filter jobs-toolbar">
          <button
            type="button"
            className="new-admin-button jobs-add-button"
            onClick={openAddPo}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            Add PO
          </button>

          <label className="jobs-group-by">
            <span>Grouped by</span>
            <select
              value={groupBy}
              onChange={(event) => setGroupBy(event.target.value)}
              aria-label="Group purchase orders by"
            >
              {PO_GROUP_OPTIONS.map((option) => (
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
                  placeholder="Search POs..."
                  aria-label="Search purchase orders"
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
                aria-label="Search purchase orders"
                onClick={() => setSearchOpen(true)}
              >
                <i className="fa fa-search" aria-hidden="true"></i>
                Search
              </button>
            )}
          </div>
        </div>

        {!USE_TENANT_PO_TRACKER_DEMO && (
          <div className="jobs-demo-banner">
            Demo mode is off. Connect a tenant PO Tracker API to populate this
            list.
          </div>
        )}

        <div className="col-box-list jobs-list-scroll">
          {filteredPos.length === 0 ? (
            <div className="no-jobs">
              <i className="fa fa-file-text-o" aria-hidden="true"></i>
              <p>
                {purchaseOrders.length === 0
                  ? "No purchase orders available."
                  : "No purchase orders match your search."}
              </p>
            </div>
          ) : (
            Object.entries(groupedPos).map(([groupName, groupPos]) => {
              const isCollapsed = Boolean(collapsedGroups[groupName]);
              return (
                <div key={groupName} className="jobs-group">
                  <button
                    type="button"
                    className="jobs-group-heading po-group-heading"
                    onClick={() => toggleGroup(groupName)}
                    aria-expanded={!isCollapsed}
                  >
                    <i
                      className={`fa ${
                        isCollapsed ? "fa-chevron-right" : "fa-chevron-down"
                      }`}
                      aria-hidden="true"
                    ></i>
                    {groupName}
                  </button>
                  {!isCollapsed ? (
                    <div className="list">
                      {groupPos.map((po) => {
                        const status =
                          STATUS_META[po.status] || STATUS_META.Inactive;
                        return (
                          <div
                            key={po.id}
                            className={`list-item ${
                              selectedPoId === po.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedPoId(po.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                setSelectedPoId(po.id);
                              }
                            }}
                          >
                            <div className="list-left">
                              <span
                                className="avatar circle w-40 blue-grey"
                                aria-hidden="true"
                              >
                                {po.initials}
                                <i className={status.className}></i>
                              </span>
                            </div>

                            <div className="list-body">
                              <div className="item-title">
                                <a
                                  href={`#po-${po.id}`}
                                  onClick={(event) => event.preventDefault()}
                                >
                                  PO#: {po.poNumber}
                                </a>
                              </div>
                              <div className="text-ellipsis jobs-item-meta">
                                {formatPoListSubtitle(po)}
                              </div>
                            </div>

                            <div
                              className="jobs-item-menu"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <button
                                type="button"
                                className="jobs-menu-trigger"
                                aria-label={`Actions for PO ${po.poNumber}`}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setMenuPoId((current) =>
                                    current === po.id ? null : po.id
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-ellipsis-v"
                                  aria-hidden="true"
                                ></i>
                              </button>

                              {menuPoId === po.id && (
                                <div className="jobs-overflow-menu">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPoId(po.id)}
                                  >
                                    View details
                                  </button>
                                  {po.source !== "demo" && (
                                    <button
                                      type="button"
                                      onClick={() => deletePo(po.id)}
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
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </aside>

      {selectedPo ? (
        <PoDetailPanel
          key={selectedPo.id}
          po={selectedPo}
          transactions={transactionsByPoId[selectedPo.id] || []}
          onStatusChange={updatePoStatus}
          onDelete={deletePo}
        />
      ) : (
        <section className="jobs-detail-panel">
          <div className="no-jobs jobs-detail-empty">
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <p>Select a purchase order to view its details.</p>
          </div>
        </section>
      )}

      {isAddOpen && (
        <div className="user-modal-backdrop" role="presentation">
          <div
            className="user-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-add-po-title"
          >
            <div className="user-modal-header">
              <div>
                <div className="user-modal-eyebrow">Frontend demo</div>
                <h3 id="demo-add-po-title">Add PO (Demo Only)</h3>
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
            <form onSubmit={submitAddPo}>
              <p className="jobs-detail-source">
                This form creates a local demo draft only. It does not call
                create APIs or write to a database.
              </p>
              <div className="jobs-detail-grid">
                <label>
                  <span>PO number / name</span>
                  <input
                    type="text"
                    required
                    value={draftForm.poNumber}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        poNumber: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Product</span>
                  <input
                    type="text"
                    value={draftForm.product}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        product: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Quantity (LBS)</span>
                  <input
                    type="number"
                    min="0"
                    value={draftForm.quantityLbs}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        quantityLbs: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Terminal</span>
                  <input
                    type="text"
                    value={draftForm.terminal}
                    onChange={(event) =>
                      setDraftForm((prev) => ({
                        ...prev,
                        terminal: event.target.value,
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

export default PoTrackerWorkspace;

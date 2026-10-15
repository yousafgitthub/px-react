import {
  ADD_JOB_DEMO_OPTIONS,
  createEmptyCarrierRow,
  createEmptyHopperRow,
  createEmptyProductRow,
  createEmptyRateSheet,
  createEmptySiloBelt,
  createEmptyTerminalRow,
  createEmptyWell,
  formatNumberDisplay,
} from "../../../data/addJobFormConfig";

function TabToolbar({ children }) {
  return <div className="add-job-tab-toolbar">{children}</div>;
}

function PrimaryAddButton({ label, onClick }) {
  return (
    <button type="button" className="new-admin-button" onClick={onClick}>
      <i className="fa fa-plus" aria-hidden="true"></i>
      {label}
    </button>
  );
}

function SectionSaveButton({ onClick }) {
  return (
    <div className="add-job-tab-save-row">
      <button type="button" className="new-admin-button" onClick={onClick}>
        Save
      </button>
    </div>
  );
}

function RowMenu({ onRemove }) {
  return (
    <button
      type="button"
      className="add-job-row-menu"
      aria-label="Row actions"
      onClick={onRemove}
      title="Remove row (demo)"
    >
      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
    </button>
  );
}

function EmptyTableRow({ colSpan, message = "No data available in table" }) {
  return (
    <tr>
      <td colSpan={colSpan} className="tenant-empty-table-cell">
        {message}
      </td>
    </tr>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={
        status === "Active" ? "admin-status-active" : "admin-status-inactive"
      }
    >
      {status}
    </span>
  );
}

function AllowToggle({ checked, onChange, labelAllow = "Allow", labelDeny = "Disallow" }) {
  return (
    <button
      type="button"
      className={`add-job-allow-toggle ${checked ? "is-allow" : "is-disallow"}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="add-job-allow-toggle-label">
        {checked ? labelAllow : labelDeny}
      </span>
      <span className="add-job-allow-toggle-knob" aria-hidden="true"></span>
    </button>
  );
}

function RateSheetPanel({
  title,
  rows,
  onAdd,
  onRemove,
  headerExtra = null,
  onNotice,
}) {
  return (
    <section className="add-job-rate-card">
      <div className="add-job-rate-card-header">
        <h4>{title}</h4>
        <div className="add-job-rate-card-actions">
          {headerExtra}
          <PrimaryAddButton label="Add Rate Sheet" onClick={onAdd} />
        </div>
      </div>
      <div className="admin-users-table-wrapper">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>Hauling Cost</th>
              <th>Update Hauling</th>
              <th>Update Demurrage</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={5} />
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.haulingCost || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className="job-details-action-btn"
                      onClick={() =>
                        onNotice?.(
                          "Update Hauling requires a rate-sheet API (not connected)."
                        )
                      }
                    >
                      <i className="fa fa-exchange" aria-hidden="true"></i>
                      Update Hauling
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="job-details-action-btn"
                      onClick={() =>
                        onNotice?.(
                          "Update Demurrage requires a rate-sheet API (not connected)."
                        )
                      }
                    >
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                      Update Dem
                    </button>
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                  <td>
                    <RowMenu onRemove={() => onRemove(row.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function WellsTab({ form, setForm, onSectionSave }) {
  const rows = form.wells || [];
  return (
    <div className="add-job-tab-panel">
      <TabToolbar>
        <PrimaryAddButton
          label="Add Well"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              wells: [...(prev.wells || []), createEmptyWell((prev.wells?.length || 0) + 1)],
            }))
          }
        />
      </TabToolbar>
      <div className="admin-users-table-wrapper">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Well</th>
              <th>API Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={5} />
            ) : (
              rows.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.name}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          wells: prev.wells.map((item) =>
                            item.id === row.id
                              ? { ...item, name: event.target.value }
                              : item
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.apiNumber}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          wells: prev.wells.map((item) =>
                            item.id === row.id
                              ? { ...item, apiNumber: event.target.value }
                              : item
                          ),
                        }))
                      }
                    />
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                  <td>
                    <RowMenu
                      onRemove={() =>
                        setForm((prev) => ({
                          ...prev,
                          wells: prev.wells.filter((item) => item.id !== row.id),
                        }))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

/** roles.png — Operator / Company rate sheets */
export function RolesTab({ form, setForm, onSectionSave, onNotice }) {
  return (
    <div className="add-job-tab-panel add-job-roles-tab">
      <RateSheetPanel
        title={`Operator Rate Sheet: ${form.operator || "operator"}`}
        rows={form.operatorRateSheets || []}
        onAdd={() =>
          setForm((prev) => ({
            ...prev,
            operatorRateSheets: [
              ...(prev.operatorRateSheets || []),
              createEmptyRateSheet({
                haulingCost: "New Operator Rate Sheet",
              }),
            ],
          }))
        }
        onRemove={(id) =>
          setForm((prev) => ({
            ...prev,
            operatorRateSheets: (prev.operatorRateSheets || []).filter(
              (row) => row.id !== id
            ),
          }))
        }
        onNotice={onNotice}
      />

      <RateSheetPanel
        title="Company Rate Sheet"
        rows={form.companyRateSheets || []}
        headerExtra={
          <select
            className="add-job-inline-select"
            value={form.companyRateCompany || ""}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                companyRateCompany: event.target.value,
              }))
            }
            aria-label="Select Company"
          >
            {ADD_JOB_DEMO_OPTIONS.companies.map((option) => (
              <option
                key={option}
                value={option.startsWith("Select") ? "" : option}
                disabled={option.startsWith("Select")}
              >
                {option}
              </option>
            ))}
          </select>
        }
        onAdd={() =>
          setForm((prev) => ({
            ...prev,
            companyRateSheets: [
              ...(prev.companyRateSheets || []),
              createEmptyRateSheet({
                haulingCost: "New Company Rate Sheet",
              }),
            ],
          }))
        }
        onRemove={(id) =>
          setForm((prev) => ({
            ...prev,
            companyRateSheets: (prev.companyRateSheets || []).filter(
              (row) => row.id !== id
            ),
          }))
        }
        onNotice={onNotice}
      />
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function ProductsTab({ form, setForm, onSectionSave }) {
  const rows = form.products || [];
  const updateRow = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  return (
    <div className="add-job-tab-panel">
      <TabToolbar>
        <PrimaryAddButton
          label="Add Product"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              products: [...(prev.products || []), createEmptyProductRow()],
            }))
          }
        />
      </TabToolbar>
      <div className="admin-users-table-wrapper add-job-wide-table">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Unit Code</th>
              <th>Pad Design</th>
              <th>PO#</th>
              <th>Current PO Volume</th>
              <th>Pre-Fill Volume</th>
              <th>PO Allocation</th>
              <th>Avg. Load Weight</th>
              <th>Per Unit Rate</th>
              <th>PO Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={12} />
            ) : (
              rows.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.product}
                      onChange={(event) =>
                        updateRow(row.id, "product", event.target.value)
                      }
                    />
                  </td>
                  <td>{row.unitCode}</td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.padDesign}
                      onChange={(event) =>
                        updateRow(row.id, "padDesign", event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.poNumber}
                      onChange={(event) =>
                        updateRow(row.id, "poNumber", event.target.value)
                      }
                    />
                  </td>
                  <td>{formatNumberDisplay(row.currentPoVolume)}</td>
                  <td>{row.preFillVolume}</td>
                  <td>{formatNumberDisplay(row.poAllocation)}</td>
                  <td>{formatNumberDisplay(row.avgLoadWeight)}</td>
                  <td>{row.perUnitRate}</td>
                  <td>
                    <StatusBadge status={row.poStatus} />
                  </td>
                  <td>
                    <RowMenu
                      onRemove={() =>
                        setForm((prev) => ({
                          ...prev,
                          products: prev.products.filter(
                            (item) => item.id !== row.id
                          ),
                        }))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function CarrierTab({ form, setForm, onSectionSave, onNotice }) {
  const rows = form.carriers || [];
  return (
    <div className="add-job-tab-panel">
      <TabToolbar>
        <PrimaryAddButton
          label="Add Carrier"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              carriers: [
                ...(prev.carriers || []),
                createEmptyCarrierRow({ carrier: "New Carrier" }),
              ],
            }))
          }
        />
      </TabToolbar>
      <div className="admin-users-table-wrapper">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Hauling Cost</th>
              <th>Update Hauling</th>
              <th>Update Demurrage</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={6} />
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.carrier}</td>
                  <td>{row.haulingCost}</td>
                  <td>
                    <button
                      type="button"
                      className="job-details-action-btn"
                      onClick={() =>
                        onNotice?.(
                          "Update Hauling requires a carrier rate API (not connected)."
                        )
                      }
                    >
                      <i className="fa fa-exchange" aria-hidden="true"></i>
                      Update Hauling
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="job-details-action-btn"
                      onClick={() =>
                        onNotice?.(
                          "Update Demurrage requires a carrier rate API (not connected)."
                        )
                      }
                    >
                      <i className="fa fa-clock-o" aria-hidden="true"></i>
                      Update Dem
                    </button>
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                  <td>
                    <RowMenu
                      onRemove={() =>
                        setForm((prev) => ({
                          ...prev,
                          carriers: prev.carriers.filter(
                            (item) => item.id !== row.id
                          ),
                        }))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function PermissionsTab({ form, setForm, onSectionSave }) {
  const flags = form.permissionFlags || {};
  const rows = form.permissions || [];

  const setFlag = (field, value) => {
    setForm((prev) => ({
      ...prev,
      permissionFlags: { ...prev.permissionFlags, [field]: value },
    }));
  };

  const setRowFlag = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  return (
    <div className="add-job-tab-panel">
      <div className="add-job-permission-flags">
        <label>
          <input
            type="checkbox"
            checked={Boolean(flags.updateLoadTimeStamps)}
            onChange={(event) =>
              setFlag("updateLoadTimeStamps", event.target.checked)
            }
          />
          Update Load Time Stamps
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(flags.updateLoadStatus)}
            onChange={(event) =>
              setFlag("updateLoadStatus", event.target.checked)
            }
          />
          Update Load Status
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(flags.updateProductOrPo)}
            onChange={(event) =>
              setFlag("updateProductOrPo", event.target.checked)
            }
          />
          Update the Product or PO
        </label>
        <label>
          <input
            type="checkbox"
            checked={Boolean(flags.cancelLoads)}
            onChange={(event) => setFlag("cancelLoads", event.target.checked)}
          />
          Cancel Loads
        </label>
      </div>

      <div className="admin-users-table-wrapper">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>Carrier</th>
              <th>
                Load Deliver Status - (Carrier Permission){" "}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </th>
              <th>
                Load Deliver Status - (Driver Permission){" "}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </th>
              <th>
                Load Update - (Driver Permission){" "}
                <i className="fa fa-info-circle" aria-hidden="true"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={4} />
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.carrier}</td>
                  <td>
                    <AllowToggle
                      checked={row.loadDeliverCarrier}
                      onChange={(value) =>
                        setRowFlag(row.id, "loadDeliverCarrier", value)
                      }
                    />
                  </td>
                  <td>
                    <AllowToggle
                      checked={row.loadDeliverDriver}
                      onChange={(value) =>
                        setRowFlag(row.id, "loadDeliverDriver", value)
                      }
                    />
                  </td>
                  <td>
                    <AllowToggle
                      checked={row.loadUpdateDriver}
                      onChange={(value) =>
                        setRowFlag(row.id, "loadUpdateDriver", value)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function TerminalTab({ form, setForm, onSectionSave }) {
  const rows = form.terminals || [];
  const updateRow = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      terminals: prev.terminals.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  return (
    <div className="add-job-tab-panel">
      <TabToolbar>
        <PrimaryAddButton
          label="Add Terminal"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              terminals: [
                ...(prev.terminals || []),
                createEmptyTerminalRow({ terminal: "New Terminal" }),
              ],
            }))
          }
        />
      </TabToolbar>
      <div className="admin-users-table-wrapper">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Terminal</th>
              <th>
                Approved Mileage <span className="settings-required">*</span>
              </th>
              <th>Approved Load Time (minutes)</th>
              <th>Approved Unload Time (minutes)</th>
              <th>Approved Transit Time (minutes)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={7} />
            ) : (
              rows.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.terminal}</td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.approvedMileage}
                      onChange={(event) =>
                        updateRow(row.id, "approvedMileage", event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.approvedLoadTime}
                      onChange={(event) =>
                        updateRow(row.id, "approvedLoadTime", event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.approvedUnloadTime}
                      onChange={(event) =>
                        updateRow(
                          row.id,
                          "approvedUnloadTime",
                          event.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="add-job-cell-input"
                      value={row.approvedTransitTime}
                      onChange={(event) =>
                        updateRow(
                          row.id,
                          "approvedTransitTime",
                          event.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <RowMenu
                      onRemove={() =>
                        setForm((prev) => ({
                          ...prev,
                          terminals: prev.terminals.filter(
                            (item) => item.id !== row.id
                          ),
                        }))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function NotesTab({ form, setForm, onSectionSave }) {
  const notes = form.notesByType || {};
  const fields = [
    { key: "special", label: "Special Notes" },
    { key: "accepted", label: "Accepted Notes" },
    { key: "terminal", label: "Terminal Notes" },
    { key: "inTransit", label: "In Transit Notes" },
    { key: "atDest", label: "At Dest Notes" },
  ];

  return (
    <div className="add-job-tab-panel">
      <div className="add-job-notes-grid">
        {fields.map((field) => (
          <div key={field.key} className="add-job-notes-column">
            <div className="add-job-notes-header">{field.label}</div>
            <textarea
              value={notes[field.key] || ""}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  notesByType: {
                    ...prev.notesByType,
                    [field.key]: event.target.value,
                  },
                }))
              }
              rows={10}
            />
          </div>
        ))}
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function PicturesTab({ form, setForm, onSectionSave, onNotice }) {
  const pictures = form.pictures || [null, null];

  const handleFile = (index, file) => {
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      onNotice?.("Choose an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((prev) => {
      const next = [...(prev.pictures || [null, null])];
      next[index] = { name: file.name, url, localOnly: true };
      return { ...prev, pictures: next };
    });
    onNotice?.(
      "Picture stored locally in the form only. A media upload API is not connected."
    );
  };

  return (
    <div className="add-job-tab-panel">
      <div className="add-job-pictures-grid">
        {pictures.map((picture, index) => (
          <div key={`pic-${index}`} className="add-job-picture-slot">
            <div className="add-job-picture-preview">
              {picture?.url ? (
                <img src={picture.url} alt={picture.name || "Upload"} />
              ) : (
                <i className="fa fa-file-o" aria-hidden="true"></i>
              )}
            </div>
            <label className="settings-upload-btn add-job-upload-label">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) =>
                  handleFile(index, event.target.files?.[0])
                }
              />
            </label>
          </div>
        ))}
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

/**
 * Add Silo Belt section — visible when Job Type is Silo
 * (under Settings fields / on the Silos tab).
 */
export function SiloBeltsSection({ form, setForm }) {
  const belts = form.siloBelts || [];

  const addBelt = () => {
    setForm((prev) => ({
      ...prev,
      siloBelts: [...(prev.siloBelts || []), createEmptySiloBelt()],
    }));
  };

  const removeBelt = (beltId) => {
    setForm((prev) => {
      const current = prev.siloBelts || [];
      if (current.length <= 1) {
        return {
          ...prev,
          siloBelts: [createEmptySiloBelt()],
        };
      }
      return {
        ...prev,
        siloBelts: current.filter((belt) => belt.id !== beltId),
      };
    });
  };

  const updateBeltField = (beltId, field, value) => {
    setForm((prev) => ({
      ...prev,
      siloBelts: (prev.siloBelts || []).map((belt) =>
        belt.id === beltId ? { ...belt, [field]: value } : belt
      ),
    }));
  };

  return (
    <div className="add-job-belt-section">
      <div className="add-job-belt-header">
        <h4>Add Silo Belt</h4>
        <PrimaryAddButton label="Add Silo Belt" onClick={addBelt} />
      </div>

      <div className="add-job-belt-table">
        <div className="add-job-belt-table-head">
          <span>#</span>
          <span>Silo Belt</span>
          <span>Silo Capacity</span>
          <span>Actions</span>
        </div>

        {belts.map((belt, index) => (
          <div key={belt.id} className="add-job-belt-row">
            <span className="add-job-belt-index">{index + 1}</span>
            <input
              type="text"
              aria-label={`Silo Belt ${index + 1}`}
              placeholder="Silo Belt"
              value={belt.siloBelt || ""}
              onChange={(event) =>
                updateBeltField(belt.id, "siloBelt", event.target.value)
              }
            />
            <input
              type="number"
              min="0"
              aria-label={`Silo Capacity ${index + 1}`}
              value={belt.siloCapacity ?? "0"}
              onChange={(event) =>
                updateBeltField(belt.id, "siloCapacity", event.target.value)
              }
            />
            <RowMenu onRemove={() => removeBelt(belt.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SilosTab({ form, setForm, onSectionSave }) {
  return (
    <div className="add-job-tab-panel">
      <SiloBeltsSection form={form} setForm={setForm} />
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

export function HopperTab({ form, setForm, onSectionSave }) {
  const rows = form.hoppers || [];
  return (
    <div className="add-job-tab-panel">
      <TabToolbar>
        <PrimaryAddButton
          label="Add Hopper"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              hoppers: [
                ...(prev.hoppers || []),
                createEmptyHopperRow({ serialNumber: "New Hopper" }),
              ],
            }))
          }
        />
      </TabToolbar>
      <div className="admin-users-table-wrapper">
        <table className="admin-users-table add-job-tab-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Serial Number</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <EmptyTableRow colSpan={4} />
            ) : (
              rows.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.serialNumber}</td>
                  <td>{formatNumberDisplay(row.capacity)}</td>
                  <td>
                    <RowMenu
                      onRemove={() =>
                        setForm((prev) => ({
                          ...prev,
                          hoppers: prev.hoppers.filter(
                            (item) => item.id !== row.id
                          ),
                        }))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <SectionSaveButton onClick={onSectionSave} />
    </div>
  );
}

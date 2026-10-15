# PropX Admin DataTable UI

> Canonical list-table look for **admin and tenant** screens.  
> Visual reference: Admin → **Terminals** (`src/pages/admin/terminal.jsx`).  
> Use this whenever building or restyling a DataTable.

Also see `UI_STANDARDS.md` for broader UI rules.

---

## Mandatory pattern

1. Page shell: `.admin-users-page` + `.admin-users-header` + optional `.new-admin-button`
2. Table: `UserDataTable` (`src/components/UserDataTable.jsx`)
3. Tenant adapter (optional): `SearchableAdminTable` — wraps `UserDataTable` with search (+ optional client paging)
4. Search: parent-owned `.admin-users-search` (or sibling `*-users-search`) passed as `toolbar`
5. Actions: `Actions` → `.admin-action-button` (edit / delete / overflow)
6. Status: `.admin-status-active` / `.admin-status-inactive`
7. Styles: existing classes in `src/css/dashboard.css` — **do not invent a parallel table theme**
8. **Tenant rule:** Do not override `.admin-users-card` / `.admin-users-table` inside Jobs, Box, or Reports with flat gray “DataTables” styles. Keep the Admin Terminals glass card + pale lime headers.

```jsx
<div className="admin-users-page">
  <div className="admin-users-header">
    <h2>Terminals</h2>
    <button className="new-admin-button">
      <i className="fa fa-plus" /> New
    </button>
  </div>

  <UserDataTable
    users={filtered}
    columns={columns}
    tableClassName="admin-users-table"
    wrapperClassName="admin-users-table-wrapper"
    toolbar={
      <div className="admin-users-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa fa-search" />
      </div>
    }
    renderActions={(row) => (
      <Actions onEdit={...} onDelete={...} items={...} />
    )}
  />
</div>
```

---

## Green shade palette (PropX)

| Role | Hex / value | Where used |
|------|-------------|------------|
| Primary green (CTA, focus, accents) | `#96c33b` | `.new-admin-button`, search focus border, action hover |
| Primary green hover | `#799c31` | `.new-admin-button:hover` |
| Soft green page wash | `#f5f8f1` → `#eef4f5` + green radial | `.admin-users-page` background |
| Soft green radial accent | `rgba(150, 195, 59, 0.2)` | page background glow |
| Table header tint | `rgba(241, 246, 232, 0.5)` | `th` background (pale lime) |
| Row hover tint | `rgba(150, 195, 59, 0.1)` | `tbody tr:hover` |
| Active status badge | `#4caf50` | `.admin-status-active` |
| Inactive status badge | `#D3494E` | `.admin-status-inactive` |
| Success / dump green (jobs only) | `#4bad29` | Loads / Jobs actions — **not** default list CTA |

**Do not** replace this palette with purple themes, flat gray SaaS tables, or alternate greens.

---

## Layout anatomy (Terminals reference)

| Element | Spec |
|---------|------|
| Breadcrumb | Topbar: `Dashboard > …` (existing header) |
| Page title | `h2`, `20px` / `500`, `#34495e` |
| Primary CTA | Right of title: `.new-admin-button` — height `36px`, bg `#96c33b`, white text |
| Table card | Glass panel via `UserDataTable` → `.admin-users-card` — white/frosted, radius `14px`, soft shadow |
| Search | Top-right of card header — width `240px`, height `34px`, radius `6px`, focus `#96c33b` |
| Header row | Pale lime `rgba(241, 246, 232, 0.5)`, bold `#34495e`, sort carets |
| Body cells | `13px`, `#60717e`, row height `42px`, padding `9px 12px` |
| Row dividers | `1px solid rgba(216, 225, 230, 0.7)` |
| Status pills | Compact radius `3px`, white text on green/red |
| Action buttons | `30×30`, border `#dfe5ea`, hover border/text `#96c33b` |

---

## CSS class pairs

Reuse one pair (same metrics):

| Table | Wrapper |
|-------|---------|
| `admin-users-table` | `admin-users-table-wrapper` |
| `tanent-users-table` | `tanent-users-table-wrapper` |
| `carrier-users-table` | `carrier-users-table-wrapper` |
| `driver-users-table` | `driver-users-table-wrapper` |

Prefer **`admin-users-table`** for new list pages unless matching an existing sibling page.

---

## Status & actions

```jsx
<span className="admin-status-active">Active</span>
<span className="admin-status-inactive">Inactive</span>
```

Row actions: edit (pencil), delete (trash), overflow (ellipsis) via `Actions` — gray bordered squares that turn PropX green on hover.

---

## What not to do

- Do not add a third-party DataTables / AG Grid / TanStack Table without a documented exception.
- Do not rebuild a custom table shell that skips `UserDataTable`.
- Do not use flat white cards with heavy borders when the admin glass card already exists (except Jobs tab overrides already scoped in CSS).
- Do not invent new green hex values for list tables.
- Do not put search/sort/pagination inside a one-off component when the parent + `UserDataTable` pattern already covers it.

---

## Tenant-side DataTables (standardized)

All tenant list tables must use `UserDataTable` or `SearchableAdminTable`:

| Area | Tables |
|------|--------|
| Jobs → Details | Terminals, Job Pumping Status Log |
| Jobs → Loads | Loads Status, Daily Allocation, Transit, Destination, Delivered |
| Jobs → Assets / Usage / Inventory / History / Reconcile / KPI / Drivers / Users | One table each |
| Box Management | Inventory, Management, History, On The Road, Stage Report, Service Report |
| Reports | Active report detail table |
| Overview | Recent Activity |

Non-table placeholders (Carrier, PO Tracker, Map, Help, Settings, Slicer) have no DataTable yet.

## Source files

| File | Role |
|------|------|
| `src/pages/admin/terminal.jsx` | Visual / structural reference page |
| `src/components/UserDataTable.jsx` | Shared table primitive |
| `src/components/jobs/SearchableAdminTable.jsx` | Tenant search adapter |
| `src/components/Actions.jsx` | Row action buttons |
| `src/css/dashboard.css` | `.admin-users-*`, greens, badges |
| `UI_STANDARDS.md` | Broader admin/tenant UI standards |

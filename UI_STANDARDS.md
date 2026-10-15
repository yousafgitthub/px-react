# PropX Connect — UI Standards

> Source of truth for admin and tenant UI in this React app.  
> Verified against the codebase as of the latest local audit. Prefer source over memory when styles change.

---

## Core rule (read first)

**Before implementing any new UI, inspect the existing admin-side implementation and reuse its components, DataTables, styles, fonts, colors, spacing, and layout patterns wherever possible. Do not introduce a new visual design system or duplicate an existing component without justification.**

Existing admin screens under `src/pages/admin/` and shared styles in `src/css/dashboard.css` define how PropX Connect should look and behave.

---

## A. Purpose and Core Rule

This document captures the **admin-side** visual and component conventions so future work—especially **tenant** pages—stays consistent.

- Reuse admin layout classes (`admin-layout`, `admin-sidebar`, `admin-main`, `admin-topbar`).
- Reuse shared table and form components before inventing new ones.
- Keep information density compact (desktop-first PropX style).
- Tenant UX may differ in **navigation items and data scope**, not in brand/visual system.

There is **no CSS custom-property / design-token layer** in this repo today. Colors and sizes are hardcoded in CSS class rules. Prefer referencing those class names over copying hex values into new CSS.

---

## B. Typography

| Context | Family | Size / weight | Color | Source |
|--------|--------|---------------|-------|--------|
| Global body | `Arial, Helvetica, sans-serif` | browser default / inherit | via page CSS | `src/css/index.css`, `src/css/App.css` |
| Jobs workspace (tenant) | `"Open Sans", Arial, Helvetica, sans-serif` | base `13px` | `rgba(0, 0, 0, 0.87)` | `index.html` (Google Fonts link) + `.jobs-workspace` in `dashboard.css` |
| Page title (`h2`) | inherit | `20px` / `500` | `#34495e` | `.admin-users-header h2` |
| Card / panel title (`h3`) | inherit | `16px` / `600` | `#34495e` | `.admin-users-card-header h3` |
| Table body | inherit | `13px` | `#60717e` (cells) | `.admin-users-table` |
| Table headers | inherit | `13px` / `600` | `#34495e` | `.admin-users-table th` |
| Status badges | inherit | `11px` / `600` | `#ffffff` on badge bg | `.admin-status-active`, `.admin-status-inactive` |
| Compact Loads tables | Open Sans / inherit | `11px` | `rgba(0, 0, 0, 0.87)` | `.loads-compact-table` |

**Icons:** Font Awesome via `@fortawesome/fontawesome-free` (`src/main.jsx`). Prefer `fa` / `fa-solid` classes already used in sidebar and actions.

**Note:** Open Sans is loaded globally in `index.html` but **not** applied to `body`. Admin chrome still uses Arial unless a specific rule overrides it (e.g. Jobs workspace).

---

## C. Color Palette

No `:root` CSS variables were found. Values below are taken from class rules in `src/css/dashboard.css` (and login `App.css` where noted).

### Brand / primary

| Role | Value | Typical classes |
|------|-------|-----------------|
| Primary green | `#96c33b` | `.new-admin-button`, sidebar active border, focus borders, hover accents |
| Primary green hover | `#799c31` | `.new-admin-button:hover`, breadcrumb hover |
| PropX dump / success green (Loads, Jobs Add/Pumping, PO metrics) | `#4bad29` / hover `#409c20` | `.loads-dump-btn`, `.jobs-add-button`, `.job-pumping-btn` |
| Accent yellow (summary values) | `#ffc123` | `.loads-summary-value`, Details Assign Driver metrics |
| Details loads metric blue | `#2196f3` | `.job-summary-metric strong.is-blue` (sampled from PropX Jobs Details screenshot) |

### Sidebar / navigation

| Role | Value | Class |
|------|-------|-------|
| Sidebar background | `#1d1f2a` | `.admin-sidebar` |
| Sidebar logo strip | `#202228` | `.sidebar-logo`, `.sidebar-bottom` |
| Nav text | `#aeb3c2` | `.admin-sidebar`, `.sidebar-item` |
| Nav hover / icon accent | `#96c33b` on `#252833` | `.sidebar-item:hover` |
| Nav active | text `#ffffff`, bg `#252833`, left border `#96c33b` | `.sidebar-item.active` |
| Submenu bg | `#181a24` | `.sidebar-submenu` |
| Collapsed width | `65px` (expanded `220px`) | `.admin-layout.sidebar-collapsed` |

### Page / panels

| Role | Value | Class |
|------|-------|-------|
| App shell background | `#f6f8fa` | `.admin-layout` |
| Jobs page / Details content background | `#ffffff` | `.jobs-workspace`, `.job-detail-content` |
| Jobs identity / button text | `#212121` | `.job-details-name`, `.job-details-company`, `.job-details-action-btn` |
| Jobs muted meta / inactive tabs | `#757575` | `.job-details-meta`, inactive `.job-nav-tabs .nav-link` |
| Admin list page wash | gradient over `#f5f8f1` / `#eef4f5` | `.admin-users-page` |
| Top bar | `#ffffff`, border `#e3e7eb` | `.admin-topbar` |
| Panel / card border | `#dce4ec` or `rgba(216, 225, 230, 0.7)` | cards, Loads panels, table rows |
| Muted text | `#60717e`, `#657984`, `#7a8a97`, `#526b80` | cells, labels, meta |

### Status

| Role | Value | Class |
|------|-------|-------|
| Active badge | bg `#4caf50`, text `#ffffff` | `.admin-status-active` |
| Inactive badge | bg `#D3494E`, text `#ffffff` | `.admin-status-inactive` |
| Form / field error | `#dc3545` | `.field-error`, `.field-error-message` |
| Job avatar status dots | success `#4bad29`, warning `#ffc123`, danger `#d04444` | `.jobs-workspace .avatar i.*` |
| Selected Jobs list row | bg `#d0faff` (cyan; no green bar) | `.jobs-workspace .list-item.active` — sampled from `oldPX design.png` |
| Jobs list hover | `#eaf9ff` | `.jobs-workspace .list-item:hover` |

### Tables

| Role | Value | Class |
|------|-------|-------|
| Header bg | `rgba(241, 246, 232, 0.5)` | `.admin-users-table th` (same pattern on tenant/carrier/driver table classes) |
| Row hover | `rgba(150, 195, 59, 0.1)` | `.admin-users-table tbody tr:hover` |
| Compact Loads even rows | `#fafbfc` | `.loads-compact-table tbody tr:nth-child(even)` |
| Compact Loads footer | `#f3f6f8` | `.loads-compact-table tfoot td` |

---

## D. DataTables Standards

### Library

**There is no third-party DataTables / AG Grid / TanStack Table dependency** in `package.json`.

Admin “DataTables” are **custom React tables** styled with CSS classes.

### Primary reusable component (mandatory first choice)

| Component | Path | Role |
|-----------|------|------|
| `UserDataTable` | `src/components/UserDataTable.jsx` | Shared sortable admin list table |

**Mandatory rule:** Before creating a new table, find and reuse `UserDataTable` (or extend it). Do not introduce a different table library or rebuild a parallel table shell without a justified technical reason.

### How admin pages use it

Typical pattern (see `src/pages/admin/po-admin-users.jsx`, `tanent-users.jsx`, `carrier-users.jsx`, `driver-users.jsx`, `tenant-company.jsx`, `carrier-company.jsx`, `terminal.jsx`, `destination.jsx`):

1. Page shell: `.admin-users-page` + `.admin-users-header` + `.new-admin-button`.
2. Client-side filter state (`searchTerm`, optional select filters).
3. `<UserDataTable users={filtered} columns={[...]} toolbar={...} tableClassName="..." wrapperClassName="..." renderActions={...} />`.
4. Row actions via `Actions` (`src/components/Actions.jsx`).
5. Create/edit via `UserFormModal`; delete via `ConfirmDeleteModal`.
6. Feedback via `toastr`.

### Column definitions

```js
{ key: "email", label: "Email" }
{ key: "status", label: "Status", render: (row) => <span className="admin-status-active">...</span> }
```

- `key` — property on the row object (also used for sorting).
- `label` — header text.
- `render(row)` — optional custom cell renderer.

### Built-in table behavior (`UserDataTable`)

| Feature | Behavior |
|---------|----------|
| Sorting | Client-side string `localeCompare` via header carets (`.table-sort-button`) |
| Search / filters | **Not inside** `UserDataTable`; parent passes filtered data + toolbar UI |
| Pagination | **Not implemented** in `UserDataTable` |
| Server-side data | **Not used**; pages use local/demo arrays today |
| Empty state | **Not dedicated**; empty `users` yields empty `<tbody>` — improve via parent or shared empty row if needed |
| Loading / error | **Not standardized** in the table component |
| Horizontal scroll | Wrapper classes e.g. `.admin-users-table-wrapper` (`overflow-x: auto`) |
| Actions column | Always rendered as last header `Action` |

### CSS class pairs for admin tables

Reuse one of these pairs (same visual metrics: `13px`, row height `42px`, padding `9px 12px`):

| Table class | Wrapper class |
|-------------|---------------|
| `admin-users-table` | `admin-users-table-wrapper` |
| `tanent-users-table` | `tanent-users-table-wrapper` |
| `carrier-users-table` | `carrier-users-table-wrapper` |
| `driver-users-table` | `driver-users-table-wrapper` |

### Tenant Jobs tables

| Component | Path | When to use |
|-----------|------|-------------|
| `UserDataTable` | `src/components/UserDataTable.jsx` | Canonical table (admin + tenant) |
| `SearchableAdminTable` | `src/components/jobs/SearchableAdminTable.jsx` | Thin adapter: admin search toolbar + `UserDataTable` for Loads / job tabs |

Tenant Loads (Transit, Destination, Delivered, Loads Status, Daily Allocation) must use `UserDataTable` via `SearchableAdminTable`. Do not introduce a separate table library.

Demo Jobs data lives only in `src/data/tenantJobsDemo.js` (`USE_TENANT_JOBS_DEMO`). Do not mix demo fixtures into real API responses.

---

## E. Buttons and Form Controls

### Buttons

| Variant | Class | Specs (verified) |
|---------|-------|------------------|
| Primary CTA | `.new-admin-button` | height `36px`, padding `0 15px`, radius `4px`, bg `#96c33b`, text `#fff`, `13px`; hover `#799c31` |
| Icon action | `.admin-action-button` | `30×30`, border `#dfe5ea`, radius `3px`, muted icon; hover green border/text |
| Sidebar CTA | `.map-email-button` | full width, height `38px`, bg `#96c33b` |
| Delete confirm | `.delete-modal-confirm` | (see confirm modal styles) |
| Delete cancel | `.delete-modal-cancel` | |
| Loads toolbar | `.loads-action-btn` | height `28px`, compact gray button |
| Dump Into Pile | `.loads-dump-btn` | green `#4bad29` |

### Inputs / selects

| Context | Classes / notes |
|---------|-----------------|
| Admin search | `.admin-users-search input` — height `34px`, radius `6px`, focus border `#96c33b` |
| Tenant filters | `.tenant-users-filter`, `.tenant-users-filters` |
| Profile / settings forms | `.form-group input/select` — height `40px`, focus green ring |
| Modal forms | `.user-form-grid` inside `UserFormModal` |
| Validation | `.field-error`, `.field-error-message` (`#dc3545`) |

### Toast notifications

- Library: `toastr` (`package.json`).
- Import CSS: `toastr/build/toastr.min.css` on admin pages that notify.

---

## F. Layout and Structure

### Admin shell

| Piece | Path / class |
|-------|----------------|
| Layout | `src/components/dashboard/DashboardLayout.jsx` — `.admin-layout` |
| Sidebar | `src/components/dashboard/Sidebar.jsx` — `.admin-sidebar` (`220px`) |
| Header | `src/components/dashboard/Header.jsx` — `.admin-topbar` (`60px`) |
| Main | `.admin-main` |
| Page content padding | `.dashboard-content` / `.admin-users-page` — typically `24px` |

### Tenant shell

| Piece | Path |
|-------|------|
| Layout | `src/components/tenant/TenantLayout.jsx` (reuses admin layout/header classes) |
| Sidebar | `src/components/tenant/TenantSidebar.jsx` (same `.admin-sidebar` / `.sidebar-item` styles) |
| Routes | `/tenant/*` in `src/App.jsx` |

### Three-panel Jobs layout

| Panel | Spec |
|-------|------|
| Sidebar | Shared dark admin sidebar |
| Jobs list | `.jobs-list-panel` ~ `280px`, scrollable `.col-box-list` |
| Detail workspace | `.job-detail-shell` / `.jobs-detail-panel` — tabs + content |
| Implementation | `src/components/jobs/JobsWorkspace.jsx` |

Jobs list stays mounted while switching detail tabs. Selecting another job updates the right panel only.

### Tabs (Jobs detail)

- Classes: `.line-tabs`, `.job-nav-tabs`, `.nav-link` / `.active`
- Active underline: `3px solid #181a1d`
- Default Loads tab; order documented in `JOB_DETAIL_TABS` (`src/data/tenantJobsDemo.js`)

### Spacing conventions (admin lists)

- Page header margin-bottom: `18px`
- Table row height: `42px`
- Prefer existing radii (`3px`–`6px` controls; larger radii on glass cards / delete modal are already established—do not invent a third radius system)

---

## G. Reusable Components

Import these before writing new UI:

| Component | Path |
|-----------|------|
| `UserDataTable` | `src/components/UserDataTable.jsx` |
| `Actions` | `src/components/Actions.jsx` |
| `UserFormModal` | `src/components/UserFormModal.jsx` |
| `ConfirmDeleteModal` | `src/components/ConfirmDeleteModal.jsx` |
| `DashboardLayout` | `src/components/dashboard/DashboardLayout.jsx` |
| `Sidebar` | `src/components/dashboard/Sidebar.jsx` |
| `Header` | `src/components/dashboard/Header.jsx` |
| `TenantLayout` | `src/components/tenant/TenantLayout.jsx` |
| `TenantSidebar` | `src/components/tenant/TenantSidebar.jsx` |
| `JobsWorkspace` | `src/components/jobs/JobsWorkspace.jsx` |
| `JobDetailPanel` | `src/components/jobs/JobDetailPanel.jsx` |
| `LoadsTab` | `src/components/jobs/LoadsTab.jsx` |
| `DemoDataTable` | `src/components/jobs/DemoDataTable.jsx` |
| `ProtectedRoute` helpers | `src/components/routing/ProtectedRoute.jsx` |
| Auth | `src/auth/useAuth.js`, `src/auth/authService.js` |

### Stylesheets

| File | Scope |
|------|--------|
| `src/css/dashboard.css` | Admin + tenant chrome, tables, Jobs, modals |
| `src/css/App.css` | Login page |
| `src/css/index.css` | Global reset / body font |

---

## H. Tenant UI Rules

1. Tenant pages must reuse the **same** PropX classes and components as admin (`admin-layout`, `UserDataTable` patterns, button/input styles).
2. Do **not** introduce a separate tenant visual theme (no new gradient SaaS kits, alternate font systems for general pages, or divergent table libraries).
3. Respect **auth and permissions** (`accountType`, `permissions` from `authService` / `useAuth`). UI routes are not a security boundary.
4. Tenant-only demo data must stay in `src/data/tenantJobsDemo.js` (or a similarly named fixture module) behind an explicit flag such as `USE_TENANT_JOBS_DEMO`.
5. Jobs three-panel and Loads density must remain compact and aligned with existing Jobs CSS—not enlarged generic dashboards.

---

## I. Implementation Checklist

Before adding a page, table, or control:

- [ ] Read this file (`UI_STANDARDS.md`).
- [ ] Find the closest admin page under `src/pages/admin/` and mirror its structure.
- [ ] For list UIs: reuse `UserDataTable` + existing table CSS class pairs.
- [ ] For actions: reuse `Actions`, `UserFormModal`, `ConfirmDeleteModal` where applicable.
- [ ] Use classes from `dashboard.css` instead of one-off inline styles or new theme files.
- [ ] Match primary green `#96c33b`, sidebar `#1d1f2a`, and compact `13px` table text.
- [ ] Preserve sidebar / topbar / three-panel Jobs behavior if touching those areas.
- [ ] Keep tenant data scoped; never write demo fixtures to production APIs/DBs.
- [ ] Run `npm run lint` and `npm run build` before claiming the UI is done.
- [ ] If you must diverge, document why in the PR / change notes (see Exceptions).

---

## J. Exceptions

Deviations from these standards require a **clear technical or product justification**, for example:

- A library is required for accessibility, virtualization, or real server-side DataTables that `UserDataTable` cannot provide.
- Product explicitly requests a one-off surface (and accepts ongoing divergence cost).

Even then:

1. Prefer extending `UserDataTable` or shared CSS over a parallel design system.
2. Do not silently mix conflicting fonts, greens, or table densities on the same screen.
3. Record the exception in the PR description.

---

## Items requiring verification / gaps

These were **not** fully standardized in code at audit time:

| Topic | Status |
|-------|--------|
| CSS design tokens (`:root` variables) | **Absent** — values are hardcoded per class |
| Shared empty / loading / error table states in `UserDataTable` | **Not implemented** |
| Pagination inside `UserDataTable` | **Not implemented** (Jobs `DemoDataTable` has its own client paging) |
| Real server-side DataTables library | **Not present** |
| Global Open Sans on admin chrome | **Not applied** (Arial on `body`; Open Sans mainly on Jobs workspace) |
| Export / bulk select on admin tables | **Not found** in `UserDataTable` |
| Formal Storybook / component docs | **Not found** |

When implementing missing behaviors, add them to the **shared** components/CSS first, then update this document.

---

## Quick reference — verified source files

- `src/css/dashboard.css` — primary visual system  
- `src/css/index.css`, `src/css/App.css` — global + login  
- `src/components/UserDataTable.jsx` — admin table primitive  
- `src/components/Actions.jsx`, `UserFormModal.jsx`, `ConfirmDeleteModal.jsx`  
- `src/components/dashboard/*` — admin shell  
- `src/pages/admin/*` — canonical page patterns  
- `src/components/jobs/*`, `src/data/tenantJobsDemo.js` — tenant Jobs (demo)  
- `package.json` — UI dependencies (`react`, `react-router-dom`, `@fortawesome/fontawesome-free`, `toastr`)  

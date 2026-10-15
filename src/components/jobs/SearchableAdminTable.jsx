import { useMemo, useState } from "react";
import UserDataTable from "../UserDataTable";

const DEFAULT_PAGE_SIZE = 10;

/**
 * Thin adapter: admin UserDataTable + parent-owned search toolbar
 * (same pattern as src/pages/admin/* list pages).
 */
function SearchableAdminTable({
  title,
  columns,
  rows = [],
  searchKeys = [],
  emptyMessage = "No records found.",
  showActions = false,
  renderActions,
  footerRow = null,
  extraToolbar = null,
  showSearch = true,
  showDataTablesInfo = false,
  pageSize = DEFAULT_PAGE_SIZE,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return rows;
    }

    const keys =
      searchKeys.length > 0 ? searchKeys : columns.map((column) => column.key);

    return rows.filter((row) =>
      keys.some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(term)
      )
    );
  }, [rows, searchTerm, searchKeys, columns]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = showDataTablesInfo
    ? filteredRows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
    : filteredRows;

  const start =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredRows.length);

  return (
    <div className="searchable-admin-table">
      <UserDataTable
        rows={pagedRows}
        columns={columns}
        title={title}
        showActions={showActions}
        renderActions={renderActions}
        emptyMessage={emptyMessage}
        footerRow={footerRow}
        tableClassName="admin-users-table"
        wrapperClassName="admin-users-table-wrapper"
        toolbar={
          extraToolbar || showSearch ? (
            <div className="loads-table-toolbar">
              {extraToolbar}
              {showSearch ? (
                <div className="admin-users-search">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setPage(1);
                    }}
                    aria-label={title ? `Search ${title}` : "Search"}
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
              ) : null}
            </div>
          ) : null
        }
      />

      {showDataTablesInfo ? (
        <div className="admin-datatable-info">
          <span>
            Showing {start} to {end} of {filteredRows.length} entries
          </span>
          <div className="admin-datatable-pager">
            <button
              type="button"
              className="job-details-action-btn"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="job-details-action-btn"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SearchableAdminTable;

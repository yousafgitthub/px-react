import { useMemo, useState } from "react";

function SortHeader({ column, sortConfig, onSort }) {
    const isActive = sortConfig.column === column.key;

    return (
        <button type="button" className="table-sort-button" onClick={() => onSort(column.key)}>
            {column.label}
            <span className="sort-icons" aria-hidden="true">
                <i className={`fa fa-caret-up ${isActive && sortConfig.direction === "asc" ? "active" : ""}`}></i>
                <i className={`fa fa-caret-down ${isActive && sortConfig.direction === "desc" ? "active" : ""}`}></i>
            </span>
        </button>
    );
}

/**
 * Shared admin-style DataTable used across admin list pages and tenant Loads.
 * Prefer this over building a separate table implementation.
 *
 * @param {object[]} [users] - legacy prop name used by admin pages
 * @param {object[]} [rows] - alias for users (preferred for non-user datasets)
 */
function UserDataTable({
    users,
    rows,
    columns = [],
    toolbar,
    title,
    renderActions,
    showActions = true,
    emptyMessage = "No records found.",
    footerRow = null,
    tableClassName = "admin-users-table",
    wrapperClassName = "admin-users-table-wrapper",
    getRowKey,
}) {
    const [sortConfig, setSortConfig] = useState({ column: "", direction: "asc" });

    const sortedRows = useMemo(() => {
        const data = rows ?? users ?? [];
        return [...data].sort((firstRow, secondRow) => {
            if (!sortConfig.column) return 0;
            const firstValue = String(firstRow[sortConfig.column] ?? "");
            const secondValue = String(secondRow[sortConfig.column] ?? "");
            const result = firstValue.localeCompare(secondValue, undefined, {
                numeric: true,
            });
            return sortConfig.direction === "asc" ? result : -result;
        });
    }, [rows, users, sortConfig]);

    const handleSort = (column) => {
        setSortConfig((currentSort) => ({
            column,
            direction: currentSort.column === column && currentSort.direction === "asc" ? "desc" : "asc",
        }));
    };

    const columnCount = columns.length + (showActions ? 1 : 0);
    const headerClassName = title
        ? "admin-users-card-header"
        : "admin-users-card-header controls-only";

    return (
        <div className="admin-users-card">
            {(title || toolbar) && (
                <div className={headerClassName}>
                    {title ? <h3>{title}</h3> : null}
                    {toolbar}
                </div>
            )}
            <div className={wrapperClassName}>
                <table className={tableClassName}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>
                                    <SortHeader
                                        column={column}
                                        sortConfig={sortConfig}
                                        onSort={handleSort}
                                    />
                                </th>
                            ))}
                            {showActions ? <th>Action</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columnCount}
                                    className="tenant-empty-table-cell"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            sortedRows.map((row, index) => {
                                const key = getRowKey
                                    ? getRowKey(row, index)
                                    : row.id ?? row.email ?? `row-${index}`;

                                return (
                                    <tr key={key}>
                                        {columns.map((column) => (
                                            <td key={column.key}>
                                                {column.render
                                                    ? column.render(row)
                                                    : row[column.key]}
                                            </td>
                                        ))}
                                        {showActions ? (
                                            <td>
                                                {renderActions
                                                    ? renderActions(row)
                                                    : null}
                                            </td>
                                        ) : null}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                    {footerRow ? (
                        <tfoot>
                            <tr className="admin-table-footer-row">
                                {footerRow}
                            </tr>
                        </tfoot>
                    ) : null}
                </table>
            </div>
        </div>
    );
}

export default UserDataTable;

import { useMemo, useState } from "react";

function SortHeader({ label, column, sortConfig, onSort }) {
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

function UserDataTable({ users, columns, toolbar, renderActions, tableClassName, wrapperClassName }) {
    const [sortConfig, setSortConfig] = useState({ column: "", direction: "asc" });

    const sortedUsers = useMemo(() => [...users].sort((firstUser, secondUser) => {
        if (!sortConfig.column) return 0;
        const firstValue = String(firstUser[sortConfig.column] ?? "");
        const secondValue = String(secondUser[sortConfig.column] ?? "");
        const result = firstValue.localeCompare(secondValue);
        return sortConfig.direction === "asc" ? result : -result;
    }), [users, sortConfig]);

    const handleSort = (column) => {
        setSortConfig((currentSort) => ({
            column,
            direction: currentSort.column === column && currentSort.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <div className="admin-users-card">
            <div className="admin-users-card-header controls-only">{toolbar}</div>
            <div className={wrapperClassName}>
                <table className={tableClassName}>
                    <thead>
                        <tr>
                            {columns.map((column) => <th key={column.key}><SortHeader column={column} sortConfig={sortConfig} onSort={handleSort} /></th>)}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user, index) => (
                            <tr key={`${user.email}-${index}`}>
                                {columns.map((column) => <td key={column.key}>{column.render ? column.render(user) : user[column.key]}</td>)}
                                <td>{renderActions(user)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDataTable;

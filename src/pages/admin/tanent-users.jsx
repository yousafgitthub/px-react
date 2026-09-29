import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

function TanentUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const tanentUsers = [
        {
            firstName: "John",
            lastName: "Doe",
            companyName: "CDF Ltd",
            roleName: "Company Admin",
            email: "john@example.com",
            phone: "+1 234 567 890",
            status: "Active",
        },
        {
            firstName: "Michael",
            lastName: "Smith",
            companyName: "XYZ Inc",
            roleName: "Company",
            email: "michael@example.com",
            phone: "+1 234 567 891",
            status: "Active",
        },
        {
            firstName: "David",
            lastName: "Wilson",
            companyName: "ABC Corp",
            roleName: "Operator",
            email: "david@example.com",
            phone: "+1 234 567 892",
            status: "Inactive",
        },
    ];
    const companies = [...new Set(tanentUsers.map((user) => user.companyName))];
    const roles = [...new Set(tanentUsers.map((user) => user.roleName))];
    const hasActiveFilters = Boolean(companyFilter || roleFilter);
    const testing = () => {toastr.success("User details submitted successfully.", "Success");};
    const fields = [
        { name: "company", label: "Company", type: "select", options: companies, placeholder: "Select company", fullWidth: true },
        { name: "firstName", label: "First name", type: "text", required: true, placeholder: "Enter first name" },
        { name: "lastName", label: "Last name", type: "text", required: true, placeholder: "Enter last name" },
        { name: "role", label: "Role", type: "select", required: true, options: roles, placeholder: "Select role" },
        { name: "email", label: "Email address", type: "email", required: true, placeholder: "name@company.com" },
        { name: "password", label: "Password", type: "password", required: true, placeholder: "Abc@123" },
        { name: "phone", label: "Phone number", type: "tel", placeholder: "+1 000 000 0000" },
        { name: "address", label: "Address", type: "text", placeholder: "Enter full address", fullWidth: true },
        { name: "notifications", label: "Notifications", type: "select", options: ["SMS", "Phone call", "SMS/Phone call", "None"], defaultValue: "None" },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active" },
    ];
    const filteredUsers = tanentUsers.filter((user) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            user.firstName.toLowerCase().includes(search) ||
            user.lastName.toLowerCase().includes(search) ||
            user.companyName.toLowerCase().includes(search) ||
            user.roleName.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.phone.toLowerCase().includes(search) ||
            user.status.toLowerCase().includes(search);

        const matchesCompany =
            companyFilter === "" ||
            user.companyName === companyFilter;

        const matchesRole =
            roleFilter === "" ||
            user.roleName === roleFilter;

        return matchesSearch && matchesCompany && matchesRole;
    });
    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Tenant Users</h2>

                <button className="new-admin-button" onClick={() => setIsNewUserModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>


            <UserDataTable
                users={filteredUsers}
                columns={[
                    { key: "firstName", label: "First Name" }, { key: "lastName", label: "Last Name" },
                    { key: "companyName", label: "Company Name" }, { key: "roleName", label: "Role Name" },
                    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
                    { key: "status", label: "Status", render: (user) => <span className={user.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{user.status}</span> },
                ]}
                toolbar={<div className="tenant-users-filters"><label className="tenant-filter-control"><span className="tenant-filter-label"></span><span className="tenant-filter-select-wrap"><i className="fa fa-building" aria-hidden="true"></i><select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)} className="tenant-users-filter"><option value="">All companies</option>{companies.map((company) => <option key={company} value={company}>{company}</option>)}</select><i className="fa fa-chevron-down tenant-filter-chevron" aria-hidden="true"></i></span></label><label className="tenant-filter-control"><span className="tenant-filter-label"></span><span className="tenant-filter-select-wrap"><i className="fa fa-user-tag" aria-hidden="true"></i><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} className="tenant-users-filter"><option value="">All roles</option>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select><i className="fa fa-chevron-down tenant-filter-chevron" aria-hidden="true"></i></span></label>{hasActiveFilters && <button type="button" className="tenant-clear-filters" onClick={() => { setCompanyFilter(""); setRoleFilter(""); }}>Clear filters</button>}<div className="tanent-users-search"><input type="text" placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><i className="fa fa-search"></i></div></div>}
                tableClassName="tanent-users-table"
                wrapperClassName="tanent-users-table-wrapper"
                renderActions={() => <><button className="admin-action-button" aria-label="Edit user"><i className="fa fa-pencil"></i></button><button className="admin-action-button"aria-label="Delete user" onClick={() => setIsDeleteModalOpen(true)}><i className="fa fa-trash"></i></button></>}
            />
            {/* Create Modal */}
            {isNewUserModalOpen && (
                <UserFormModal
                    title="Add Tenant"
                    fields={fields}
                    onClose={() => setIsNewUserModalOpen(false)}
                    onSubmit={() => {
                        setIsNewUserModalOpen(false);
                        testing();
                    }}
                />
            )}
            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => {
                        setIsDeleteModalOpen(false);
                        toastr.success("User deleted successfully.", "Success");
                    }}
                />
            )}
        </div>
    );
}

export default TanentUsers;

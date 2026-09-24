import { useState } from "react";
import "../css/dashboard.css";
import UserDataTable from "../components/UserDataTable";

function TanentUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
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
                renderActions={() => <><button className="admin-action-button" aria-label="Edit user"><i className="fa fa-pencil"></i></button><button className="admin-action-button" aria-label="Delete user"><i className="fa fa-trash"></i></button></>}
            />

            {isNewUserModalOpen && (
                <div className="user-modal-backdrop" onMouseDown={() => setIsNewUserModalOpen(false)}>
                    <section className="user-modal" role="dialog" aria-modal="true" aria-labelledby="new-tenant-user-title" onMouseDown={(event) => event.stopPropagation()}>
                        <div className="user-modal-header">
                            <div>
                                <p className="user-modal-eyebrow">Add New Tenant</p>
                            </div>
                            <button type="button" className="user-modal-close" aria-label="Close form" onClick={() => setIsNewUserModalOpen(false)}><i className="fa fa-times"></i></button>
                        </div>
                        <form onSubmit={(event) => { event.preventDefault(); setIsNewUserModalOpen(false); }}>
                            <div className="user-form-grid">
                                <label className="user-image-upload">
                                    <input
                                        type="file"
                                        name="profileImage"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            setImagePreview(file ? URL.createObjectURL(file) : "");
                                        }}
                                    />
                                    <span className="user-image-upload-circle">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Selected user profile" />
                                        ) : (
                                            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                                        )}
                                    </span>
                                    <span className="user-image-upload-text">Upload profile image</span>
                                    <span className="user-image-upload-hint">JPG, PNG, or WEBP</span>
                                </label>
                                <label>Company<select required name="company" defaultValue=""><option value="" disabled>Select company</option>{companies.map((company) => <option key={company}>{company}</option>)}</select></label>
                                <label>First name<input required name="firstName" placeholder="Enter first name" /></label>
                                <label>Last name<input required name="lastName" placeholder="Enter last name" /></label>
                                <label>Role<select required name="role" defaultValue=""><option value="" disabled>Select role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
                                <label>Email address<input required type="email" name="email" placeholder="name@company.com" /></label>
                                <label>Phone number<input required type="tel" name="phone" placeholder="+1 000 000 0000" /></label>
                                <label className="user-form-full">Address<input required name="address" placeholder="Enter full address" /></label>
                                <label>Notifications<select name="notifications" defaultValue="None"><option>SMS</option><option>Phone call</option><option>SMS/Phone call</option><option>None</option></select></label>
                                <label>Status<select name="status" defaultValue="Active"><option>Active</option><option>Inactive</option></select></label>
                            </div>
                            <div className="user-modal-actions">
                                <button type="button" className="user-modal-cancel" onClick={() => setIsNewUserModalOpen(false)}>Cancel</button>
                                <button type="submit" className="new-admin-button">Save user</button>
                            </div>
                        </form>
                    </section>
                </div>
            )}

        </div>
    );
}

export default TanentUsers;

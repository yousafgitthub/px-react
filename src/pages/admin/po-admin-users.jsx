import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function PoAdminUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const closeUserModal = () => { setIsNewUserModalOpen(false);};
    const testing = () => {toastr.success("User details submitted successfully.", "Success");};
    const fields = [
        { name: "firstName", label: "First name", type: "text", required: true, placeholder: "Enter first name" },
        { name: "lastName", label: "Last name", type: "text", required: true, placeholder: "Enter last name" },
        { name: "email", label: "Email address", type: "email", required: true, placeholder: "name@company.com" },
        { name: "password", label: "Password", type: "password", required: true, placeholder: "Abc@123" },
        { name: "phone", label: "Phone number", type: "tel", placeholder: "+1 000 000 0000" },
        { name: "role_id", label: "Type", type: "select", options: ["Super Admin"], defaultValue: "Super Admin" },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active" },
    ];
    const carrierActionItems = [
        {
            label: "Make Inactive",
            icon: "fa-toggle-on",
            onClick: () => {
                console.log("Duplicate carrier");
            },
        },
    ];
    const adminUsers = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phone: "+1 234 567 890",
            status: "Active",
        },
        {
            firstName: "Michael",
            lastName: "Smith",
            email: "michael@example.com",
            phone: "+1 234 567 891",
            status: "Active",
        },
        {
            firstName: "David",
            lastName: "Wilson",
            email: "david@example.com",
            phone: "+1 234 567 892",
            status: "Inactive",
        },
    ];
    const filteredUsers = adminUsers.filter((user) => {
        const search = searchTerm.toLowerCase();

        return (
            user.firstName.toLowerCase().includes(search) ||
            user.lastName.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.phone.toLowerCase().includes(search) ||
            user.status.toLowerCase().includes(search)
        );
    });
    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>PD Admin Users</h2>

                <button className="new-admin-button" onClick={() => { closeUserModal(); setIsNewUserModalOpen(true); }}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>


            <UserDataTable
                users={filteredUsers}
                columns={[
                    { key: "firstName", label: "First Name" },
                    { key: "lastName", label: "Last Name" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                    { key: "status", label: "Status", render: (user) => <span className={user.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{user.status}</span> },
                ]}
                toolbar={<div className="admin-users-search"><input type="text" placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><i className="fa fa-search"></i></div>}
                tableClassName="admin-users-table"
                wrapperClassName="admin-users-table-wrapper"
                renderActions={() => (
                    <Actions
                        onDelete={() => setIsDeleteModalOpen(true)}
                        menuItems={carrierActionItems}
                    />
                )}
            />
            {/* Create Modal */}
            {isNewUserModalOpen && (
                <UserFormModal
                    title="Add PD Admin Users"
                    fields={fields}
                    onClose={closeUserModal}
                    onSubmit={() => {
                        testing();
                        closeUserModal();
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

export default PoAdminUsers;

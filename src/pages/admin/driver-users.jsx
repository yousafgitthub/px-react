import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function DriverUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const driverUsers = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phone: "+1 234 567 890",
            state: "new york",
            country: "USA",
            status: "Active",
        },
        {
            firstName: "Michael",
            lastName: "Smith",
            email: "michael@example.com",
            phone: "+1 234 567 891",
            state: "washington",
            country: "USA",
            status: "Active",
        },
        {
            firstName: "David",
            lastName: "Wilson",
            email: "david@example.com",
            phone: "+1 234 567 892",
             state: "california",
            country: "USA",
            status: "Inactive",
        },
    ];
    const carrierActionItems = [
        {
            label: "Download QR Code",
            icon: "fa fa-qrcode",
            onClick: () => {
                console.log("Duplicate carrier");
            },
        },
        {
            label: "Make Inactive",
            icon: "fa-toggle-on",
            onClick: () => {
                console.log("Duplicate carrier");
            },
        },
    ];
    const fields = [
        { name: "firstName", label: "First name", type: "text", required: true, placeholder: "Enter first name" },
        { name: "lastName", label: "Last name", type: "text", required: true, placeholder: "Enter last name" },
        { name: "email", label: "Email address", type: "email", required: true, placeholder: "name@company.com" },
        { name: "password", label: "Password", type: "password", required: true, placeholder: "Abc@123" },
        { name: "phone", label: "Phone number", type: "tel", required: true, placeholder: "+1 000 000 0000" },
        { name: "address", label: "Address", type: "text", placeholder: "Enter full address" },
        { name: "notifications", label: "Notifications", type: "select", options: ["SMS", "Phone call", "SMS/Phone call", "None"], defaultValue: "None" },
        { name: "truck_no", label: "Truck no", type: "text", placeholder: "Enter truck number" },
        { name: "trailer_no", label: "Trailer no", type: "text", placeholder: "Enter trailer number" },
        { name: "vendor_code", label: "Vender code", type: "text", placeholder: "Enter vendor code" },
        { name: "driver_code", label: "Driver code", type: "text", placeholder: "Enter driver code" },
        { name: "date_of_birth", label: "Date of birth", type: "date" },
        { name: "licence_no", label: "Licence no", type: "text", placeholder: "Enter licence number" },
        { name: "licence_exp", label: "Licence exp", type: "date" },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active" },
    ];
    const testing = () => {toastr.success("User details submitted successfully.", "Success");};
    const filteredUsers = driverUsers.filter((user) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            user.firstName.toLowerCase().includes(search) ||
            user.lastName.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.phone.toLowerCase().includes(search) ||
            user.status.toLowerCase().includes(search);

        return matchesSearch;
    });
    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Driver Users</h2>

                <button className="new-admin-button" onClick={() => setIsNewUserModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>


            <UserDataTable
                users={filteredUsers}
                columns={[
                    { key: "firstName", label: "First Name" }, { key: "lastName", label: "Last Name" },
                    { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "state", label: "State" }, { key: "country", label: "Country" },
                    { key: "status", label: "Status", render: (user) => <span className={user.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{user.status}</span> },
                ]}
                toolbar={<div className="tenant-users-filters">
                    <div className="tanent-users-search"><input type="text" placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><i className="fa fa-search"></i></div></div>}
                tableClassName="driver-users-table"
                wrapperClassName="driver-users-table-wrapper"
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
                    title="Add Driver"
                    fields={fields}
                    onClose={() => setIsNewUserModalOpen(false)}
                    onSubmit={() => {
                        testing();
                        setIsNewUserModalOpen(false);
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

export default DriverUsers;

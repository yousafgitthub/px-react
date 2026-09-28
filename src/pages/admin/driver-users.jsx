import { useState } from "react";
import "../css/dashboard.css";
import UserDataTable from "../components/UserDataTable";

function DriverUsers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const driverUsers = [
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
                    { key: "email", label: "Email" }, { key: "phone", label: "Phone" },
                    { key: "status", label: "Status", render: (user) => <span className={user.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{user.status}</span> },
                ]}
                toolbar={<div className="tenant-users-filters">
                    <div className="tanent-users-search"><input type="text" placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /><i className="fa fa-search"></i></div></div>}
                tableClassName="driver-users-table"
                wrapperClassName="driver-users-table-wrapper"
                renderActions={() => <><button className="admin-action-button" aria-label="Edit user"><i className="fa fa-pencil"></i></button><button className="admin-action-button" aria-label="Delete user"><i className="fa fa-trash"></i></button></>}
            />

            {isNewUserModalOpen && (
                <div className="user-modal-backdrop" onMouseDown={() => setIsNewUserModalOpen(false)}>
                    <section className="user-modal" role="dialog" aria-modal="true" aria-labelledby="new-tenant-user-title" onMouseDown={(event) => event.stopPropagation()}>
                        <div className="user-modal-header">
                            <div>
                                <p className="user-modal-eyebrow">Add Driver</p>
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
                                <label>First name<input required name="firstName" placeholder="Enter first name" /></label>
                                <label>Last name<input required name="lastName" placeholder="Enter last name" /></label>
                                <label>Phone number<input required type="tel" name="phone" placeholder="+1 000 000 0000" /></label>
                                <label>Email address<input required type="email" name="email" placeholder="name@company.com" /></label>
                                <label>Password<input required type="password" name="password" placeholder="Abc@123" /></label>
                                <label>Address<input required name="address" placeholder="Enter full address" /></label>
                                <label>Notifications<select name="notifications" defaultValue="None"><option>SMS</option><option>Phone call</option><option>SMS/Phone call</option><option>None</option></select></label>
                                <label>Truck no<input required type="integer" name="truck_no" placeholder="Enter truck number" /></label>
                                <label>Trailer no<input required type="text" name="trailer_no" placeholder="Enter trailer number" /></label>
                                <label>Vender code<input required type="text" name="vendor_code" placeholder="Enter vendor code" /></label>
                                <label>Driver code<input required type="text" name="driver_code" placeholder="Enter driver code" /></label>
                                <label>Date of birth<input required type="date" name="date_of_birth" placeholder="Enter date of birth" /></label>
                                <label>Licence no<input required type="integer" name="licence_no" placeholder="Enter licence number" /></label>
                                <label>Licence exp<input required type="date" name="licence_exp" placeholder="Enter licence expiry date" /></label>
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

export default DriverUsers;

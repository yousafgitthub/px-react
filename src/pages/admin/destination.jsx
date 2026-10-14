import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function Destination() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewDestinationModalOpen, setIsNewDestinationModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("address");
    const destinationActionItems = [
        {
            label: "View",
            icon: "fa-eye",
            onClick: () => {
                console.log("View destination");
            },
        },
        {
            label: "Download QR Code",
            icon: "fa-qrcode",
            onClick: () => {
                console.log("Download QR Code");
            },
        },
        {
            label: "Make Inactive",
            icon: "fa-toggle-on",
            onClick: () => {
                console.log("Make Inactive");
            },
        },
    ];

    const destination = [
        {
            name: "Admin Addition Test",
            owner_name: "John Doe",
            address: "1950 West 17th Avenue, Denver, CO, USA",
            city: "Denver",
            warehouse_location: "No",
            lifecycle: "Completed",
            status: "Active",
        },
        {
            name: "Bulk Logic",
            owner_name: "Smith Johnson",
            address: "2100 Brookwood Drive, Little Rock, AR, USA",
            city: "Little Rock",
            warehouse_location: "No",
            lifecycle: "Completed",
            status: "Active",
        },
        {
            name: "Client Demos",
            owner_name: "David Wilson",
            address: "4700 West 116th Avenue, Westminster, CO, USA",
            city: "Westminster",
            warehouse_location: "Yes",
            lifecycle: "Completed",
            status: "Inactive",
        },
        {
            name: "Fellowship O&G",
            owner_name: "Wilson Smith",
            address: "123 Main Street, Houston, TX, USA",
            city: "Houston",
            warehouse_location: "No",
            lifecycle: "Completed",
            status: "Active",
        },
    ];

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        {name: "company_id", label: "Company", required: true, placeholder: "Select", type: "select", options: [""], placeeholder:"Select", value: true },
        {name: "owner_company_id", label: "Owner", required: true, placeholder: "Select", type: "select", options: [""], placeeholder:"Select", value: true },
        { name: "name", label: "Name", type: "text", required: true, placeholder: "Enter name", fullWidth: true },
        { name: "address", label: "Address", type: "location", required: true, placeholder: "Enter full address", fullWidth: true },
    ];

    const filteredDestinations = destination.filter((destination) => {
        const search = searchTerm.toLowerCase();

        return Object.values(destination).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Destinations</h2>

                <button className="new-admin-button" onClick={() => setIsNewDestinationModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredDestinations}
                columns={[
                    { key: "name", label: "Destination Name" }, { key: "owner_name", label: "Owner Name" }, { key: "address", label: "Address" }, { key: "city", label: "City" },
                    { key: "warehouse_location", label: "Warehouse Location" }, { key: "lifecycle", label: "Life Cycle" },
                    { key: "status", label: "Status", render: (destination) => <span className={destination.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{destination.status}</span> },
                ]}
                toolbar={
                    <div className="tenant-users-filters">

                        <div className="tanent-users-search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />

                            <i className="fa fa-search"></i>
                        </div>

                    </div>
                }tableClassName="tanent-users-table"
                wrapperClassName="tanent-users-table-wrapper"
                renderActions={() => (
                    <Actions
                        onDelete={() => setIsDeleteModalOpen(true)}
                        menuItems={destinationActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewDestinationModalOpen && (
                <UserFormModal
                    title="Add Destination"
                    fields={fields}
                    showImage={false}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    onClose={() => setIsNewDestinationModalOpen(false)}
                    onSubmit={() => {
                        setIsNewDestinationModalOpen(false);
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
                        toastr.success("Terminal deleted successfully.", "Success");
                    }}
                />
            )}
        </div>
    );
}

export default Destination;
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";
function Disposal() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewDisposalModalOpen, setIsNewDisposalModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("address");
    const disposalFacilityActionItems = [
        {
            label: "View",
            icon: "fa-eye",
            onClick: () => {
                console.log("View disposal facility");
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

    const disposal = [
        {
            name: "Disposals",
            address: "2100 Brookwood Drive, Little Rock, AR, USA",
            "latitude_longitude": "39.74135,-105.02942",
            status: "Active",
        },
        {
            name: "Disposal Facility",
            address: "4700 West 116th Avenue, Westminster, CO, USA",
            "latitude_longitude": "39.74135,-105.02942",
            status: "Inactive",
        },
        {
            name: "Disposal O&G",
            address: "123 Main Street, Houston, TX, USA",
            "latitude_longitude": "29.7604,-95.3698",
            status: "Active",
        },
    ];

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        {name: "name", label: "Name", required: true, placeholder: "Disposal Facility Name", type: "text", fullWidth: true },
        { name: "address", label: "Address", type: "location", required: true, placeholder: "Enter full address", fullWidth: true },
    ];

    const filteredDisposalFacilities = disposal.filter((disposal) => {
        const search = searchTerm.toLowerCase();

        return Object.values(disposal).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Disposal Facilities</h2>

                <button className="new-admin-button" onClick={() => setIsNewDisposalModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredDisposalFacilities}
                columns={[
                    { key: "name", label: "Name" },{ key: "address", label: "Address" }, { key: "latitude_longitude", label: "Latitude/Longitude" },
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
                        menuItems={disposalFacilityActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewDisposalModalOpen && (
                <UserFormModal
                    title="Add Disposal Facility"
                    fields={fields}
                    showImage={false}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    onClose={() => setIsNewDisposalModalOpen(false)}
                    onSubmit={() => {
                        setIsNewDisposalModalOpen(false);
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
                        toastr.success("Disposal facility deleted successfully.", "Success");
                    }}
                />
            )}
        </div>
    );
}

export default Disposal;
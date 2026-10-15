import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function ProductType() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewProductTypeModalOpen, setIsNewProductTypeModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("address");
    const productTypeActionItems = [
        {
            label: "View",
            icon: "fa-eye",
            onClick: () => {
                console.log("View product type");
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

    const productType = [
        {
            name: "Chemical",
            status: "Active",
        },
        {
            name: "Equipment",
            status: "Active",
        },
        {
            name: "Proppant",
            status: "Inactive",
        },
        {
            name: "Dry Bulk",
            status: "Active",
        },
    ];

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        {name: "name", label: "Name", required: true, placeholder: "Product Type", type: "text", value: true, fullWidth: true },
        {name: "is_private", label: "Type", required: true, placeholder: "Select", type: "select", options: ["Public", "Private"], placeeholder:"Select", value: true },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active" },
    ];

    const filteredProductTypes = productType.filter((productType) => {
        const search = searchTerm.toLowerCase();

        return Object.values(productType).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Product Types</h2>

                <button className="new-admin-button" onClick={() => setIsNewProductTypeModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredProductTypes}
                columns={[
                    { key: "name", label: "Product Type" },
                    { key: "status", label: "Status", render: (productType) => <span className={productType.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{productType.status}</span> },
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
                        menuItems={productTypeActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewProductTypeModalOpen && (
                <UserFormModal
                    title="Add Product Type"
                    fields={fields}
                    showImage={false}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    onClose={() => setIsNewProductTypeModalOpen(false)}
                    onSubmit={() => {
                        setIsNewProductTypeModalOpen(false);
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
                        toastr.success("Product Type deleted successfully.", "Success");
                    }}
                />
            )}
        </div>
    );
}

export default ProductType;
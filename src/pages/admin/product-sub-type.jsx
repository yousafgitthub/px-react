import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function ProductSubType() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewProductSubTypeModalOpen, setIsNewProductSubTypeModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("address");
    const productSubTypeActionItems = [
        {
            label: "View",
            icon: "fa-eye",
            onClick: () => {
                console.log("View product sub type");
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

    const productSubType = [
        {
            name: "Dry Chemical",
            product_type: "Chemical",
            status: "Active",
        },
        {
            name: "Dry Chemical",
            product_type: "Equipment",
            status: "Active",
        },
        {
            name: "Loaded Boxes",
            product_type: "Chemical",
            status: "Inactive",
        },
        {
            name: "Rolling Stock",
            product_type: "Equipment",
            status: "Active",
        },
    ];

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        {name: "name", label: "Name", required: true, placeholder: "Product Sub Type", type: "text", value: true, fullWidth: true },
        {name: "parent_id", label: "Product Type", required: true, placeholder: "Select", type: "select", options: ["Chemical", "Equipment", "Proppant", "Dry Bulk"], placeeholder:"Select", value: true },
        {name: "is_private", label: "Type", required: true, placeholder: "Select", type: "select", options: ["Public", "Private"], placeeholder:"Select", value: true },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active" },
    ];

    const filteredProductSubTypes = productSubType.filter((productSubType) => {
        const search = searchTerm.toLowerCase();

        return Object.values(productSubType).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Product Sub Types</h2>

                <button className="new-admin-button" onClick={() => setIsNewProductSubTypeModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredProductSubTypes}
                columns={[
                    { key: "name", label: "Product Sub Type" },
                    { key: "product_type", label: "Product Type" },
                    { key: "status", label: "Status", render: (productSubType) => <span className={productSubType.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{productSubType.status}</span> },
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
                        menuItems={productSubTypeActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewProductSubTypeModalOpen && (
                <UserFormModal
                    title="Add Product Sub Type"
                    fields={fields}
                    showImage={false}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    onClose={() => setIsNewProductSubTypeModalOpen(false)}
                    onSubmit={() => {
                        setIsNewProductSubTypeModalOpen(false);
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
                        toastr.success("Product Sub Type deleted successfully.", "Success");
                    }}
                />
            )}
        </div>
    );
}

export default ProductSubType;
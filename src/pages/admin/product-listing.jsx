import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function ProductListing() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewProductListingModalOpen, setIsNewProductListingModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("address");
    const productListingActionItems = [
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

    const productListing = [
        {
            name: "	40/70 CRC",
            product_type: "Chemical",
            status: "Active",
        },
        {
            name: "100 mesh black",
            product_type: "Chemical",
            status: "Active",
        },
        {
            name: "40/70 Mesh White",
            product_type: "Chemical",
            status: "Inactive",
        },
        {
            name: "	40/70 Mesh Brown",
            product_type: "Chemical",
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

    const filteredProductListings = productListing.filter((productListing) => {
        const search = searchTerm.toLowerCase();

        return Object.values(productListing).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Product Listings</h2>

                <button className="new-admin-button" onClick={() => setIsNewProductListingModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredProductListings}
                columns={[
                    { key: "name", label: "Product" },
                    { key: "product_type", label: "Product Type" },
                    { key: "status", label: "Status", render: (productListing) => <span className={productListing.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{productListing.status}</span> },
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
                        menuItems={productListingActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewProductListingModalOpen && (
                <UserFormModal
                    title="Add Product"
                    fields={fields}
                    showImage={false}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    onClose={() => setIsNewProductListingModalOpen(false)}
                    onSubmit={() => {
                        setIsNewProductListingModalOpen(false);
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

export default ProductListing;
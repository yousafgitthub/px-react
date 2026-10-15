import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function ProductFamily() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewProductFamilyModalOpen, setIsNewProductFamilyModalOpen] = useState(false);
    const [locationType, setLocationType] = useState("address");
    const productFamilyActionItems = [
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

    const productFamily = [
        {
            name: "	30/170 Mesh",
            status: "Active",
        },
        {
            name: "Nitrogen",
            status: "Active",
        },
        {
            name: "30/70",
            status: "Inactive",
        },
        {
            name: "	40/70",
            status: "Active",
        },
    ];

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        {name: "name", label: "Name", required: true, placeholder: "Product Family", type: "text", value: true, fullWidth: true },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active", fullWidth: true },
    ];

    const filteredProductFamily = productFamily.filter((productFamily) => {
        const search = searchTerm.toLowerCase();

        return Object.values(productFamily).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Product Family</h2>

                <button className="new-admin-button" onClick={() => setIsNewProductFamilyModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredProductFamily}
                columns={[
                    { key: "name", label: "Product" },
                    { key: "status", label: "Status", render: (productFamily) => <span className={productFamily.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{productFamily.status}</span> },
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
                        menuItems={productFamilyActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewProductFamilyModalOpen && (
                <UserFormModal
                    title="Add Product Family"
                    fields={fields}
                    showImage={false}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    onClose={() => setIsNewProductFamilyModalOpen(false)}
                    onSubmit={() => {
                        setIsNewProductFamilyModalOpen(false);
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

export default ProductFamily;
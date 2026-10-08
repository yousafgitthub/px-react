import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function Terminal() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewTerminalModalOpen, setIsNewTerminalModalOpen] = useState(false);
    const terminalActionItems = [
        {
            label: "View",
            icon: "fa-eye",
            onClick: () => {
                console.log("View terminal");
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

    const terminal = [
        {
            name: "Admin Addition Test",
            address: "1950 West 17th Avenue, Denver, CO, USA",
            paperless: "Yes",
            qr_code: "No",
            mts: "No",
            status: "Active",
        },
        {
            name: "Bulk Logic",
            address: "2100 Brookwood Drive, Little Rock, AR, USA",
            paperless: "No",
            qr_code: "Yes",
            mts: "Yes",
            status: "Active",
        },
        {
            name: "Client Demos",
            address: "950 17th Street, Denver, CO, USA",
            paperless: "Yes",
            qr_code: "Yes",
            mts: "No",
            status: "Inactive",
        },
        {
            name: "Fellowship O&G",
            address: "Valinor Road, Hillsborough Township, NJ, USA",
            paperless: "No",
            qr_code: "No",
            mts: "No",
            status: "Active",
        },
    ];

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        { name: "name", label: "Terminal Name", type: "text", required: true, placeholder: "Enter Terminal name", fullWidth: true },
        { name: "address", label: "Address", type: "text", required: true, placeholder: "Enter full address", fullWidth: true },
        { name: "email", label: "Email address", type: "email", required: true, placeholder: "name@company.com" },
        { name: "password", label: "Password", type: "password", required: true, placeholder: "Abc@123" },
        { name: "phone", label: "Phone", type: "tel", placeholder: "+1 000 000 0000" },
        { name: "paperless", label: "Paperless", type: "checkbox", defaultValue: false },
        // When checked paperless
        {name: "paperless_provider", label: "", placeholder: "Select", type: "select", options: ["RFI Logics", "Railtronix"], showWhen: { field: "paperless", value: true }},
        {name: "qr_code", label: "QR Code", type: "checkbox", defaultValue: false },
        // When checked QR Code
        {name: "qr_code_type", label: "Data Format", type: "select", options: ["JSON", "Delimited", "EQR"], placeholder: "Select", showWhen: { field: "qr_code", value: true }},
        {name: "qr_code_delimited", label: "QR Code Delimited", type: "select", options: ['PIPE "|" ', 'Comma ","', 'Semicolon ";"', 'Colon ":"'], placeholder: "Select", showWhen: { field: "qr_code_type", value: "Delimited", dependsOn: { field: "qr_code", value: true } }},
        {name: "net-weight", label: "Net Weight", type: "text", showWhen: { field: "qr_code_type", value: ["JSON", "Delimited"], dependsOn: { field: "qr_code", value: true } }},
        {name: "gross-weight", label: "Gross Weight", type: "text", showWhen: { field: "qr_code_type", value: ["JSON", "Delimited"], dependsOn: { field: "qr_code", value: true } }},
        {name: "ticket-number", label: "Ticket Number", type: "text", showWhen: { field: "qr_code_type", value: ["JSON", "Delimited"], dependsOn: { field: "qr_code", value: true } }},
        {name: "unit", label: "Unit", type: "select", required: true, placeholder: "Select", options: ["Short ton", "Metric ton", "LBS", "KG"], showWhen: { field: "qr_code_type", value: ["JSON", "Delimited"], dependsOn: { field: "qr_code", value: true } }},
        {name: "mts", label: "MTS", type: "checkbox", defaultValue: false },
        // When checked MTS
        {name: "mts_customer_company_id", label: "Customer", placeholder: "Select", type: "select", required: true, options: [], showWhen: { field: "mts", value: true}}, 
        {name: "mts_site_id", label: "Site", placeholder: "Select", type: "select", required: true, options: [], showWhen: { field: "mts", value: true}},       
    ];

    const filteredTerminals = terminal.filter((terminal) => {
        const search = searchTerm.toLowerCase();

        return Object.values(terminal).some((value) =>
            String(value).toLowerCase().includes(search)
        );
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Terminals</h2>

                <button className="new-admin-button" onClick={() => setIsNewTerminalModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredTerminals}
                columns={[
                    { key: "name", label: "Terminal Name" }, { key: "address", label: "Address" }, { key: "paperless", label: "Paperless" },
                    { key: "qr_code", label: "QR Code" }, { key: "mts", label: "MTS" },
                    { key: "status", label: "Status", render: (terminal) => <span className={terminal.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{terminal.status}</span> },
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
                        menuItems={terminalActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewTerminalModalOpen && (
                <UserFormModal
                    title="Add Terminal"
                    fields={fields}
                    showImage={false}
                    onClose={() => setIsNewTerminalModalOpen(false)}
                    onSubmit={() => {
                        setIsNewTerminalModalOpen(false);
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

export default Terminal;
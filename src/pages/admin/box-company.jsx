
import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

const initialCompanies = [
    {
        id: 1,
        name: "Abraxas",
        type: "Operator",
        address: "Williston, ND, USA",
        status: "Active",
    },
    {
        id: 2,
        name: "Anschutz Corporation",
        type: "Operator",
        address: "555 17th Street, Denver, CO, USA",
        status: "Active",
    },
    {
        id: 3,
        name: "Antero Resources",
        type: "Operator",
        address: "1615 Wynkoop St, Denver, CO 80202, USA",
        status: "Active",
    },
    {
        id: 4,
        name: "Bulk Logic",
        type: "Company",
        address: "2100 Brookwood Drive, Little Rock, AR, USA",
        status: "Inactive",
    },
];

function CompanyListItem({ company, onDelete, onToggleStatus, onSelect, isSelected }) {
    const initials = company.name
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

    const actionItems = [
        {
            label: "Edit",
            icon: "fa-pencil",
            onClick: () => {
                console.log("Edit company:", company.id);
            },
        },
        {
            label: company.status === "Active" ? "Make Inactive" : "Make Active",
            icon: "fa-toggle-on",
            onClick: onToggleStatus,
        },
        {
            label: "Delete",
            icon: "fa-trash",
            onClick: onDelete,
        },
    ];

    return (
        <article className={`box-company-list-item ${isSelected ? "is-selected" : ""}`} onClick={onSelect}>
            <div className="box-company-avatar-wrap">
                <div className="box-company-avatar">{initials}</div>

                <span
                    className={`box-company-presence ${
                        company.status === "Active" ? "is-active" : "is-inactive"
                    }`}
                    title={company.status}
                    aria-label={company.status}
                />
            </div>

            <div className="box-company-information">
                <h3>{company.name}</h3>
                <span className="box-company-type">{company.type}</span>

                <div className="box-company-address">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>{company.address}</span>
                </div>
            </div>

            <div className="box-company-row-actions" onClick={(event) => event.stopPropagation()}>
                <Actions menuItems={actionItems} popupOnly/>
            </div>
        </article>
    );
}

function BoxCompany() {
    const [companies, setCompanies] = useState(initialCompanies);
    // const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [activeCompany, setActiveCompany] = useState(null);
    const [activeTab, setActiveTab] = useState("Details");
    const [viewMode, setViewMode] = useState("list");

    const fields = [
        { name: "name", label: "Company Name", type: "text", required: true, placeholder: "Enter company name", fullWidth: true },
        { name: "first_name", label: "First Name", type: "text", required: true, placeholder: "Enter frist name" },
        { name: "last_name", label: "Last Name", type: "text", required: true, placeholder: "Enter last name"},
        { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter email", fullWidth: true },
        { name: "address", label: "Company Address", type: "text", required: true, placeholder: "Enter address", fullWidth: true },
        { name: "phone", label: "Company Phone", type: "text", placeholder: "Enter phone number"},
        { name: "type", label: "Company Type", type: "select", options: ["Operator", "Company"]},
        { name: "is_premium", label: "Subscription Type", type: "select", options: ["Standard", "Premium"] },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"]},
    ];

    // const filteredCompanies = companies.filter((company) =>
    //     `${company.name} ${company.type} ${company.address} ${company.status}`
    //         .toLowerCase()
    //         .includes(searchTerm.toLowerCase())
    // );

    const toggleStatus = (company) => {
        setCompanies((current) =>
            current.map((item) =>
                item.id === company.id
                    ? {
                          ...item,
                          status:
                              item.status === "Active" ? "Inactive" : "Active",
                      }
                    : item
            )
        );

        toastr.success(
            `${company.name} status updated successfully.`,
            "Success"
        );
    };

    const confirmDelete = () => {
        if (!selectedCompany) return;

        const deletedId = selectedCompany.id;

        setCompanies((current) =>
            current.filter((company) => company.id !== deletedId)
        );

        if (activeCompany?.id === deletedId) {
            setActiveCompany(null);
            setViewMode("list");
        }

        setIsDeleteModalOpen(false);
        setSelectedCompany(null);
        toastr.success("Company deleted successfully.", "Success");
    };

    const createCompany = () => {
        setIsNewCompanyModalOpen(false);
        toastr.success("Company form submitted successfully.", "Success");
    };

    return (
        <div className="admin-users-page box-company-page">
            <div className="admin-users-header box-company-header">
                <div>
                    <h2>Companies</h2>
                </div>

                <button
                    type="button"
                    className="new-admin-button"
                    onClick={() => setIsNewCompanyModalOpen(true)}
                >
                    <i className="fa fa-plus" aria-hidden="true" />
                    New Company
                </button>
            </div>

            
            
            {viewMode === "list" ? (
                <section className="box-company-directory">
                    <div className="box-company-list">
                        {companies.map((company) => (
                            <CompanyListItem
                                key={company.id}
                                company={company}
                                onSelect={() => {
                                    setActiveCompany(company);
                                    setActiveTab("Details");
                                    setViewMode("detail");
                                }}
                                onToggleStatus={() => toggleStatus(company)}
                                onDelete={() => {
                                    setSelectedCompany(company);
                                    setIsDeleteModalOpen(true);
                                }}
                            />
                        ))}

                        {companies.length === 0 && (
                            <div className="box-company-empty">
                                <strong>No companies available</strong>
                            </div>
                        )}
                    </div>
                </section>
            ) : (
                <section className="box-company-workspace">
                    <aside className="box-company-sidebar">
                        <div className="box-company-list">
                            {companies.map((company) => (
                                <CompanyListItem
                                    key={company.id}
                                    company={company}
                                    isSelected={activeCompany?.id === company.id}
                                    onSelect={() => setActiveCompany(company)}
                                    onToggleStatus={() => toggleStatus(company)}
                                    onDelete={() => {
                                        setSelectedCompany(company);
                                        setIsDeleteModalOpen(true);
                                    }}
                                />
                            ))}
                        </div>
                    </aside>

                    <div className="box-company-main">
                        <div className="box-company-detail-header">
                            <button
                                type="button"
                                className="box-company-back-button"
                                onClick={() => setViewMode("list")}
                            >
                                <i className="fa fa-arrow-left" aria-hidden="true" />
                                Back
                            </button>

                            {/* <h3>{activeCompany?.name}</h3> */}
                        </div>

                        <div className="box-company-tabs">
                            <button
                                type="button"
                                className={activeTab === "Details" ? "active" : ""}
                                onClick={() => setActiveTab("Details")}
                            >
                                Details
                            </button>

                            <button
                                type="button"
                                className={activeTab === "Box" ? "active" : ""}
                                onClick={() => setActiveTab("Box")}
                            >
                                Box
                            </button>
                        </div>

                        {activeTab === "Details" && activeCompany && (
                            <div className="box-company-detail-panel">
                                <div className="box-company-logo-placeholder">
                                    <i className="fa fa-building" aria-hidden="true" />
                                </div>

                                <div className="box-company-detail-information">
                                    <h1>{activeCompany.name}</h1>
                                    <p className="box-company-detail-type">
                                        {activeCompany.type}
                                    </p>

                                    <div className="box-company-contact">
                                        <span>
                                            <i className="fa fa-map-marker" aria-hidden="true" />
                                            {activeCompany.address}
                                        </span>

                                        <span>
                                            <i className="fa fa-circle" aria-hidden="true" />
                                            {activeCompany.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "Box" && (
                            <div className="box-company-box-panel">
                                <h3>Box Listing</h3>

                                <div className="box-company-table-scroll">
                                    <table className="box-company-table">
                                        <thead>
                                            <tr>
                                                <th>Box No.</th>
                                                <th>Box Status Name</th>
                                                <th>Condition Name</th>
                                                <th>Capacity</th>
                                                <th>Weight</th>
                                                <th>Tracking Hardware</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="8" className="box-company-no-data">
                                                    No data available in table
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="box-company-table-footer">
                                    Showing 0 to 0 of 0 entries
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}




            {isNewCompanyModalOpen && (
                <UserFormModal
                    title="Add Company"
                    fields={fields}
                    showImage={false}
                    onClose={() => setIsNewCompanyModalOpen(false)}
                    onSubmit={createCompany}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedCompany(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
}

export default BoxCompany;

import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import Actions from "../../components/Actions";

function CarrierCompany() {
    const premiumTypes = ["Premium", "Standard"];
    const statuses = ["Active", "Inactive"];
    const [searchTerm, setSearchTerm] = useState("");
    const [premiumFilter, setPremiumFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false);
    const carrierActionItems = [
        {
            label: "Auto Login",
            icon: "fa-unlock-alt",
            onClick: () => {
                console.log("View carrier");
            },
        },
        {
            label: "Set Features",
            icon: "fa-pencil-alt",
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

    const carrierCompanies = [
        {
            carrierName: "Carrier",
            email: "carrier@gmail.com",
            state: "Colorado",
            country: "USA",
            type: "Premium",
            status: "Active",
        },
        {
            carrierName: "Carrier abc",
            email: "carrierabc@gmail.com",
            state: "California",
            country: "USA",
            type: "Standard",
            status: "Active",
        },
        {
            carrierName: "Carrier cdf",
            email: "carriercdf@gmail.com",
            state: "washington",
            country: "USA",
            type: "Premium",
            status: "Active",
        },
        {
            carrierName: "Carrier xyz",
            email: "carrierxyz@gmail.com",
            state: "new york",
            country: "USA",
            type: "Premium",
            status: "Active",
        },
    ];

    const hasActiveFilters = Boolean(premiumFilter || statusFilter);

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        { name: "companyName", label: "Company Name", type: "text", required: true, placeholder: "Enter company name", fullWidth: true },
         { name: "firstName", label: "First name", type: "text", required: true, placeholder: "Enter first name" },
        { name: "lastName", label: "Last name", type: "text", required: true, placeholder: "Enter last name" },
        { name: "email", label: "Email address", type: "email", required: true, placeholder: "name@company.com" },
        { name: "password", label: "Password", type: "password", required: true, placeholder: "Abc@123" },
        { name: "address", label: "Address", type: "text", placeholder: "Enter full address", fullWidth: true },
        { name: "phone", label: "Company Phone", type: "tel", placeholder: "+1 000 000 0000" },
        { name: "type", label: "Subscription Type", type: "select", options: ["Premium", "Standard"], defaultValue: "Standard" },
        { name: "legal_entity", label: "Legal Entity", type: "text", placeholder: "Enter legal entity" },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], defaultValue: "Active" },
    ];

    const filteredCompanies = carrierCompanies.filter((company) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch = company.carrierName.toLowerCase().includes(search) || company.email.toLowerCase().includes(search) || company.state.toLowerCase().includes(search) || company.country.toLowerCase().includes(search) || company.type.toLowerCase().includes(search) || company.status.toLowerCase().includes(search);

        const matchesPremium = premiumFilter === "" || company.type === premiumFilter;
        const matchesStatus = statusFilter === "" || company.status === statusFilter;

        return matchesSearch && matchesPremium && matchesStatus;
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Carrier Company</h2>

                <button className="new-admin-button" onClick={() => setIsNewCompanyModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredCompanies}
                columns={[
                    { key: "carrierName", label: "Carrier Name" }, { key: "email", label: "Email" }, { key: "state", label: "State" }, { key: "country", label: "Country" }, { key: "type", label: "Type" },
                    { key: "status", label: "Status", render: (company) => <span className={company.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{company.status}</span> },
                ]}
                toolbar={
                    <div className="tenant-users-filters">

                        {[
                            {
                                value: premiumFilter,
                                onChange: setPremiumFilter,
                                placeholder: "Type",
                                icon: "fa-star",
                                options: premiumTypes,
                            },
                            {
                                value: statusFilter,
                                onChange: setStatusFilter,
                                placeholder: "Select Status",
                                icon: "fa-toggle-on",
                                options: statuses,
                            },
                        ].map((filter) => (
                            <label className="tenant-filter-control" key={filter.placeholder}>
                                <span className="tenant-filter-select-wrap">

                                    <i
                                        className={`fa ${filter.icon} tenant-filter-icon`}
                                        aria-hidden="true"
                                    ></i>

                                    <select
                                        value={filter.value}
                                        onChange={(event) =>
                                            filter.onChange(event.target.value)
                                        }
                                        className="tenant-users-filter"
                                    >
                                        <option value="">
                                            {filter.placeholder}
                                        </option>

                                        {filter.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    <i
                                        className="fa fa-chevron-down tenant-filter-chevron"
                                        aria-hidden="true"
                                    ></i>

                                </span>
                            </label>
                        ))}

                        {hasActiveFilters && (
                            <button
                                type="button"
                                className="tenant-clear-filters"
                                onClick={() => {
                                    setPremiumFilter("");
                                    setStatusFilter("");
                                }}
                            >
                                Clear filters
                            </button>
                        )}

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
                        menuItems={carrierActionItems}
                    />
                )}
            />

            {/* Create Modal */}
            {isNewCompanyModalOpen && (
                <UserFormModal
                    title="Add Carrier Company"
                    fields={fields}
                    showImage={false}
                    onClose={() => setIsNewCompanyModalOpen(false)}
                    onSubmit={() => {
                        setIsNewCompanyModalOpen(false);
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
                        toastr.success("Company deleted successfully.", "Success");
                    }}
                />
            )}
        </div>
    );
}

export default CarrierCompany;
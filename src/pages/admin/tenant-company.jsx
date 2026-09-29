import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";
import UserDataTable from "../../components/UserDataTable";
import UserFormModal from "../../components/UserFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

function TenantCompany() {
    const companyTypes = ["Operator", "Company"];
    const premiumTypes = ["Premium", "Standard"];
    const statuses = ["Active", "Inactive"];
    const [searchTerm, setSearchTerm] = useState("");
    const [companyTypeFilter, setCompanyTypeFilter] = useState("");
    const [premiumFilter, setPremiumFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNewCompanyModalOpen, setIsNewCompanyModalOpen] = useState(false);

    const tenantCompanies = [
        {
            companyName: "Admin Addition Test",
            companyType: "Company",
            phone: "+1 234 567 890",
            address: "1950 West 17th Avenue, Denver, CO, USA",
            type: "Premium",
            status: "Active",
        },
        {
            companyName: "Bulk Logic",
            companyType: "Company",
            phone: "+1 234 567 891",
            address: "2100 Brookwood Drive, Little Rock, AR, USA",
            type: "Premium",
            status: "Active",
        },
        {
            companyName: "Client Demos",
            companyType: "Company",
            phone: "+1 234 567 892",
            address: "950 17th Street, Denver, CO, USA",
            type: "Standard",
            status: "Active",
        },
        {
            companyName: "Fellowship O&G",
            companyType: "Operator",
            phone: "+1 234 567 893",
            address: "Valinor Road, Hillsborough Township, NJ, USA",
            type: "Premium",
            status: "Active",
        },
    ];

    const hasActiveFilters = Boolean(companyTypeFilter || premiumFilter || statusFilter);

    const testing = () => { toastr.success("Company details submitted successfully.", "Success"); };

    const fields = [
        { name: "companyName", label: "Company Name", type: "text", required: true, placeholder: "Enter company name", fullWidth: true },
         { name: "firstName", label: "First name", type: "text", required: true, placeholder: "Enter first name" },
        { name: "lastName", label: "Last name", type: "text", required: true, placeholder: "Enter last name" },
        { name: "email", label: "Email address", type: "email", required: true, placeholder: "name@company.com" },
        { name: "password", label: "Password", type: "password", required: true, placeholder: "Abc@123" },
        { name: "address", label: "CompanyAddress", type: "text", placeholder: "Enter full address", fullWidth: true },
        { name: "phone", label: "Company Phone", type: "tel", placeholder: "+1 000 000 0000" },
        { name: "companyType", label: "Company Type", type: "select", options: ["Company", "Operator"], placeholder: "Select company type" },
        { name: "type", label: "Subscription Type", type: "select", options: ["Premium", "Standard"], placeholder: "Select type" },
        { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"], placeholder: "Select status" },
    ];

    const filteredCompanies = tenantCompanies.filter((company) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch = company.companyName.toLowerCase().includes(search) || company.companyType.toLowerCase().includes(search) || company.phone.toLowerCase().includes(search) || company.address.toLowerCase().includes(search) || company.type.toLowerCase().includes(search) || company.status.toLowerCase().includes(search);

        const matchesCompanyType = companyTypeFilter === "" || company.companyType === companyTypeFilter;
        const matchesPremium = premiumFilter === "" || company.type === premiumFilter;
        const matchesStatus = statusFilter === "" || company.status === statusFilter;

        return matchesSearch && matchesCompanyType && matchesPremium && matchesStatus;
    });

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="admin-users-header">
                <h2>Tenant Company</h2>

                <button className="new-admin-button" onClick={() => setIsNewCompanyModalOpen(true)}>
                    <i className="fa fa-plus"></i>
                    New
                </button>
            </div>

            <UserDataTable
                users={filteredCompanies}
                columns={[
                    { key: "companyName", label: "Company Name" }, { key: "companyType", label: "Company Type" }, { key: "phone", label: "Phone" }, { key: "address", label: "Address" }, { key: "type", label: "Type" },
                    { key: "status", label: "Status", render: (company) => <span className={company.status === "Active" ? "admin-status-active" : "admin-status-inactive"}>{company.status}</span> },
                ]}
                toolbar={
                    <div className="tenant-users-filters">

                        {[
                            {
                                value: companyTypeFilter,
                                onChange: setCompanyTypeFilter,
                                placeholder: "Company Type",
                                icon: "fa-building",
                                options: companyTypes,
                            },
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
                                    setCompanyTypeFilter("");
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
                renderActions={() => <><button className="admin-action-button" aria-label="Edit company"><i className="fa fa-pencil"></i></button><button className="admin-action-button" aria-label="Delete company" onClick={() => setIsDeleteModalOpen(true)}><i className="fa fa-trash"></i></button></>}
            />

            {/* Create Modal */}
            {isNewCompanyModalOpen && (
                <UserFormModal
                    title="Add Tenant Company"
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

export default TenantCompany;
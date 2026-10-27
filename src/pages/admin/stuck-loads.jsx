
import { useState } from "react";
import "../../css/dashboard.css";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import UserDataTable from "../../components/UserDataTable";

const companyOptions = [
    { id: "1", name: "Abraxas" },
    { id: "2", name: "Anschutz Corporation" },
    { id: "3", name: "Antero Resources" },
    { id: "4", name: "Bulk Logic" },
];

const initialStuckLoads = [
    {
        id: 1,
        company_id: "1",
        job_name: "Abraxas - Eagle Ford",
        load_no: "LD-1001",
    },
    {
        id: 2,
        company_id: "1",
        job_name: "Abraxas - Midland Basin",
        load_no: "LD-1002",
    },
    {
        id: 3,
        company_id: "1",
        job_name: "Abraxas - Delaware Basin",
        load_no: "LD-1003",
    },
    {
        id: 4,
        company_id: "2",
        job_name: "Anschutz - Wyoming",
        load_no: "LD-2001",
    },
    {
        id: 5,
        company_id: "2",
        job_name: "Anschutz - Colorado",
        load_no: "LD-2002",
    },
    {
        id: 6,
        company_id: "3",
        job_name: "Antero - Marcellus",
        load_no: "LD-3001",
    },
    {
        id: 7,
        company_id: "3",
        job_name: "Antero - Utica",
        load_no: "LD-3002",
    },
];

function StuckLoads() {
    const [companyId, setCompanyId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showResolveModal, setShowResolveModal] = useState(false);
    const [selectedLoad, setSelectedLoad] = useState(null);

    const search = searchTerm.trim().toLowerCase();

    const filteredLoads = initialStuckLoads.filter((load) => {
        const matchesCompany =
            companyId !== "" && load.company_id === companyId;

        const matchesSearch =
            !search ||
            load.job_name.toLowerCase().includes(search) ||
            load.load_no.toLowerCase().includes(search);

        return matchesCompany && matchesSearch;
    });

    const columns = [
        { key: "job_name", label: "Job Name" },
        { key: "load_no", label: "Load No." },
    ];

    const handleResolve = (load) => {
        setSelectedLoad(load);
        setShowResolveModal(true);
    };

    const confirmResolve = () => {
        if (!selectedLoad) return;

        // Placeholder until the actual Resolve API is connected.
        console.log("Resolve load:", selectedLoad);

        setShowResolveModal(false);
        setSelectedLoad(null);
    };

    return (
        <div className="admin-users-page stuck-loads-page">
            <div className="admin-users-header">
                <h2>Stuck Loads</h2>
            </div>

            <div className="stuck-loads-filter-row">
                <div className="stuck-loads-filter-field">
                    <label htmlFor="stuck-company">Company</label>

                    <select
                        id="stuck-company"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                    >
                        <option value="">Select Company</option>
                        {companyOptions.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>

                
                <div className="stuck-loads-filter-field stuck-loads-search">
                    <label htmlFor="stuck-search">Search</label>

                    <div className="stuck-loads-search-input">
                        <i className="fa fa-search" aria-hidden="true"></i>

                        <input
                            id="stuck-search"
                            type="search"
                            placeholder="Search job name or load no."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
            </div>

            <UserDataTable
                title="Stuck Loads Listing"
                rows={companyId ? filteredLoads : []}
                columns={columns}
                showActions={true}
                emptyMessage={
                    companyId
                        ? "No data available in table"
                        : "Select a company to view stuck loads."
                }
                tableClassName="admin-users-table"
                wrapperClassName="admin-users-table-wrapper"
                getRowKey={(row) => row.id}
                renderActions={(row) => (
                    <button
                        type="button"
                        className="stuck-loads-resolve-button"
                        onClick={() => handleResolve(row)}
                    >
                        Resolve
                    </button>
                )}
            />
            {showResolveModal && selectedLoad && (
                <ConfirmDeleteModal
                    onClose={() => {
                        setShowResolveModal(false);
                        setSelectedLoad(null);
                    }}
                    onConfirm={confirmResolve}
                    title="Resolve Stuck Load"
                    message={`Are you sure you want to resolve load ${selectedLoad.load_no}?`}
                    confirmText="Yes, Resolve"
                    icon="fa-check-circle"
                />
            )}
        </div>
    );
}

export default StuckLoads;

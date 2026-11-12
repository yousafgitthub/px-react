
import { useMemo, useState } from "react";

const FEATURE_GROUPS = [
    {
        title: "Reports & Data",
        description: "Reporting, analytics and data access",
        features: [
            "TMW Format Report",
            "Fuel Surcharge Regions",
            "District Permission",
            "On The Road Boxes",
            "Mapping PO Data",
            "Can Access Driver Statistics",
            "Hauling Reference Or Tags",
            "Job-Carrier Freight PO",
            "PO daily allocation",
            "PO Recognition in OCR",
            "SLxRRY",
        ],
    },
    {
        title: "Operations & Workflow",
        description: "Load management and operational controls",
        features: [
            "Consumption Report",
            "Notes Section",
            "Paperless Terminals",
            "Public API",
            "Main Carrier can perform Approve/Dispute on Loads",
            "Operator Price Setting",
            "Carrier Demurrage Approval",
            "TMS Integration",
            "Can Carrier/Driver mark delivered",
            "Allow Direct Delivery (Regular Loads)",
            "MTS Integration",
        ],
    },
    {
        title: "Company & Integrations",
        description: "Company permissions and specialized features",
        features: [
            "Prop-X - Company",
            "Carrier Permission",
            "ELD Carrier",
            "Silo Company",
            "Gross Weight",
            "Loadless Job",
            "Assign Demurrage Rate By Job",
            "Hauling Cost Templates",
            "POs Validation Fullbox",
            "Drivers can alter delivered load until confirmed/approved",
            "Refresh Rates",
        ],
    },
];

const ALL_FEATURES = FEATURE_GROUPS.flatMap((group) => group.features);

function CompanyFeaturesModal({ company, onClose, onSave }) {
    const [selectedFeatures, setSelectedFeatures] = useState(
        company.features || []
    );
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGroups = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return FEATURE_GROUPS.map((group) => ({
            ...group,
            features: group.features.filter((feature) =>
                feature.toLowerCase().includes(search)
            ),
        })).filter((group) => group.features.length > 0);
    }, [searchTerm]);

    const isAllSelected = ALL_FEATURES.every((feature) =>
        selectedFeatures.includes(feature)
    );

    const toggleFeature = (feature) => {
        setSelectedFeatures((previous) =>
            previous.includes(feature)
                ? previous.filter((item) => item !== feature)
                : [...previous, feature]
        );
    };

    const toggleAllFeatures = () => {
        setSelectedFeatures(isAllSelected ? [] : [...ALL_FEATURES]);
    };

    const handleSave = () => {
        onSave(selectedFeatures);
    };

    return (
        <div className="company-features-overlay" onMouseDown={onClose}>
            <div
                className="company-features-modal"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="company-features-header">
                    <div>
                        <h3>Manage Company Features</h3>
                        <p>Control which features this company can access.</p>
                    </div>

                    <button
                        type="button"
                        className="company-features-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <i className="fa fa-times" />
                    </button>
                </div>

                <div className="company-features-company">
                    <div className="company-features-company-info">
                        <div>
                            <span>Company</span>
                            <strong>{company.companyName}</strong>
                        </div>

                        <div>
                            <span>Company Type</span>
                            <strong>{company.companyType}</strong>
                        </div>

                        <div>
                            <span>Subscription</span>
                            <strong>{company.type}</strong>
                        </div>
                    </div>

                    <div className="company-features-selection">
                        <div>
                            <strong>{selectedFeatures.length}</strong>
                            <span> of {ALL_FEATURES.length} features enabled</span>
                        </div>

                        <button
                            type="button"
                            className="company-features-select-all"
                            onClick={toggleAllFeatures}
                        >
                            {isAllSelected ? "Clear All" : "Select All"}
                        </button>
                    </div>

                    <div className="company-features-progress">
                        <span
                            style={{
                                width: `${(selectedFeatures.length / ALL_FEATURES.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="company-features-toolbar">
                    <div className="company-features-search">
                        <i className="fa fa-search" />
                        <input
                            type="text"
                            placeholder="Search features..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                aria-label="Clear search"
                            >
                                <i className="fa fa-times" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="company-features-body">
                    {filteredGroups.length > 0 ? (
                        <div className="company-features-grid">
                            {filteredGroups.map((group) => (
                                <section
                                    className="company-feature-group"
                                    key={group.title}
                                >
                                    <div className="company-feature-group-heading">
                                        <h4>{group.title}</h4>
                                        <p>{group.description}</p>
                                    </div>

                                    <div className="company-feature-list">
                                        {group.features.map((feature) => {
                                            const checked = selectedFeatures.includes(feature);

                                            return (
                                                <label
                                                    className={`company-feature-item ${checked ? "selected" : ""}`}
                                                    key={feature}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => toggleFeature(feature)}
                                                    />

                                                    <span className="company-feature-checkbox">
                                                        <i className="fa fa-check" />
                                                    </span>

                                                    <span className="company-feature-name">
                                                        {feature}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="company-features-empty">
                            <i className="fa fa-search" />
                            <strong>No features found</strong>
                            <span>Try another search term.</span>
                        </div>
                    )}
                </div>

                <div className="company-features-footer">
                    <span>
                        {selectedFeatures.length} feature
                        {selectedFeatures.length !== 1 ? "s" : ""} selected
                    </span>

                    <div>
                        <button
                            type="button"
                            className="company-features-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="company-features-save"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyFeaturesModal;

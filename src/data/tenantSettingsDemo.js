/**
 * Tenant Settings navigation + Company Detail draft helpers.
 *
 * No tenant company-settings API exists in this React app.
 * Form values are local UI state only — Update does not persist to a backend.
 * Replace getInitialCompanyDetail() with a tenant profile GET when available.
 */
export const USE_TENANT_SETTINGS_DEMO = true;

export const DATE_FORMAT_OPTIONS = [
  "mm/dd/yyyy",
  "dd/mm/yyyy",
  "yyyy-mm-dd",
];

export const TIME_FORMAT_OPTIONS = ["12-Hour Day", "24-Hour Day"];

/**
 * Settings secondary nav — matches setting.png hierarchy.
 * Leaf items have an `id` used as the active section key.
 */
export const SETTINGS_NAV = [
  { id: "company-details", label: "Company Details" },
  { id: "products", label: "Products" },
  {
    id: "companies",
    label: "Companies",
    children: [
      { id: "operators", label: "Operators" },
      { id: "company", label: "Company" },
    ],
  },
  {
    id: "locations",
    label: "Locations",
    children: [
      { id: "terminals", label: "Terminals" },
      { id: "destinations", label: "Destinations" },
    ],
  },
  { id: "wells", label: "Wells" },
  { id: "fuel-surcharge", label: "Fuel Surcharge" },
  { id: "notes-template", label: "Notes Template" },
  {
    id: "map-po-data",
    label: "Map PO Data",
    children: [
      { id: "map-products", label: "Map Products" },
      { id: "map-terminals", label: "Map Terminals" },
      { id: "po-service-log", label: "PO Service Log" },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    children: [
      { id: "silo-assets", label: "Silo Assets" },
      { id: "hopper-assets", label: "Hopper Assets" },
      { id: "automation", label: "Automation" },
      { id: "sand-container-assets", label: "Sand Container Assets" },
      { id: "other-assets", label: "Other Assets" },
    ],
  },
  { id: "api-setup", label: "API Setup" },
  { id: "hauling-cost-templates", label: "Hauling Cost Templates" },
  {
    id: "users",
    label: "Users",
    children: [
      { id: "accounts", label: "Accounts" },
      { id: "crew", label: "Crew" },
      { id: "districts", label: "Districts" },
    ],
  },
  { id: "pumping-categories", label: "Pumping Categories" },
];

export const SETTINGS_SECTION_TITLES = {
  "company-details": "Company Detail",
  products: "Products",
  operators: "Operators",
  company: "Company",
  terminals: "Terminals",
  destinations: "Destinations",
  wells: "Wells",
  "fuel-surcharge": "Fuel Surcharge",
  "notes-template": "Notes Template",
  "map-products": "Map Products",
  "map-terminals": "Map Terminals",
  "po-service-log": "PO Service Log",
  "silo-assets": "Silo Assets",
  "hopper-assets": "Hopper Assets",
  automation: "Automation",
  "sand-container-assets": "Sand Container Assets",
  "other-assets": "Other Assets",
  "api-setup": "API Setup",
  "hauling-cost-templates": "Hauling Cost Templates",
  accounts: "Accounts",
  crew: "Crew",
  districts: "Districts",
  "pumping-categories": "Pumping Categories",
};

/**
 * Build initial Company Detail values from the auth session when possible.
 * Extra fields stay empty until a settings API provides them — do not treat
 * demo placeholders as persisted configuration.
 *
 * @param {{ tenant?: { name?: string }, email?: string } | null} user
 */
export function getInitialCompanyDetail(user) {
  return {
    companyName: user?.tenant?.name || "",
    address: "",
    phone: "",
    email: user?.email || "",
    dateFormat: DATE_FORMAT_OPTIONS[0],
    timeFormat: TIME_FORMAT_OPTIONS[0],
    photoUrl: "",
  };
}

/**
 * Optional visual demo seed to match setting.png layout review only.
 * Not used as production configuration.
 */
export function getCompanyDetailDemoSeed() {
  if (!USE_TENANT_SETTINGS_DEMO) {
    return null;
  }
  return {
    companyName: "Company 26 June",
    address: "Atlanta, GA, USA",
    phone: "738-484-9242",
    email: "testcompany@yopmail.com",
    dateFormat: "mm/dd/yyyy",
    timeFormat: "12-Hour Day",
    photoUrl: "",
  };
}

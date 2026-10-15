/**
 * Tenant Carriers frontend demo fixtures.
 *
 * DEMO MODE ONLY — never sent to APIs or written to a database.
 * Disable by setting USE_TENANT_CARRIERS_DEMO to false (or replace
 * getTenantCarriersDemoData() with a real tenant-scoped API client).
 */
export const USE_TENANT_CARRIERS_DEMO = true;

/** Carrier detail tabs — matches Carrier.png */
export const CARRIER_DETAIL_TABS = ["Detail", "Cost Setting", "Drivers"];

export const CARRIER_STATUS_OPTIONS = ["Active", "Inactive"];

function initialsFromName(name) {
  return String(name || "C")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Shape expected by the Carrier UI (ready to map from a future API).
 * @typedef {object} TenantCarrier
 * @property {string} id
 * @property {string} name
 * @property {string} initials
 * @property {string} status Active | Inactive
 * @property {string} statusClass success | danger
 * @property {string} location e.g. "Berkeley, CA, USA"
 * @property {string} contactPerson
 * @property {string} email
 * @property {"demo"|"draft"} [source]
 */

/**
 * @param {Partial<TenantCarrier> & { id: string, name: string }} overrides
 * @returns {TenantCarrier}
 */
export function createCarrierRecord(overrides) {
  const name = overrides.name;
  const status = overrides.status || "Active";
  return {
    id: overrides.id,
    name,
    initials: overrides.initials || initialsFromName(name),
    status,
    statusClass:
      overrides.statusClass || (status === "Active" ? "success" : "danger"),
    location: overrides.location || "",
    contactPerson: overrides.contactPerson || name,
    email: overrides.email || "",
    source: overrides.source || "demo",
  };
}

export function createTenantCarrierDraft(sequence = 1) {
  const name = `Demo Carrier ${sequence}`;
  return createCarrierRecord({
    id: `draft-carrier-${Date.now()}-${sequence}`,
    name,
    location: "Denver, CO, USA",
    contactPerson: name,
    email: `carrier${sequence}@example.com`,
    status: "Active",
    source: "draft",
  });
}

const DEMO_CARRIERS = [
  createCarrierRecord({
    id: "demo-carrier-a",
    name: "Carrier A",
    initials: "CA",
    location: "Berkeley, CA, USA",
    contactPerson: "Carrier A",
    email: "carriera@yopmail.com",
    status: "Active",
  }),
  createCarrierRecord({
    id: "demo-carrier-b",
    name: "ABC Hauling",
    initials: "AH",
    location: "Houston, TX, USA",
    contactPerson: "Alex Brooks",
    email: "ops@abchauling.example",
    status: "Active",
  }),
  createCarrierRecord({
    id: "demo-carrier-c",
    name: "West Line",
    initials: "WL",
    location: "Denver, CO, USA",
    contactPerson: "Morgan Lee",
    email: "dispatch@westline.example",
    status: "Active",
  }),
  createCarrierRecord({
    id: "demo-carrier-d",
    name: "Rapid Freight",
    initials: "RF",
    location: "Oklahoma City, OK, USA",
    contactPerson: "Sam Rivera",
    email: "sam@rapidfreight.example",
    status: "Inactive",
  }),
];

const DEMO_COST_SETTINGS = {
  "demo-carrier-a": [
    {
      id: "cost-a-1",
      lane: "Berkeley → Sacramento",
      rateType: "Per Load",
      rate: "$420",
      fuelSurcharge: "8%",
      effective: "2026-01-01",
    },
    {
      id: "cost-a-2",
      lane: "Berkeley → Stockton",
      rateType: "Per Ton",
      rate: "$18.50",
      fuelSurcharge: "8%",
      effective: "2026-01-01",
    },
  ],
  "demo-carrier-b": [
    {
      id: "cost-b-1",
      lane: "Houston → Midland",
      rateType: "Per Load",
      rate: "$890",
      fuelSurcharge: "10%",
      effective: "2026-02-15",
    },
  ],
  "demo-carrier-c": [
    {
      id: "cost-c-1",
      lane: "Denver → Pueblo",
      rateType: "Per Load",
      rate: "$510",
      fuelSurcharge: "7%",
      effective: "2026-03-01",
    },
  ],
  "demo-carrier-d": [],
};

const DEMO_DRIVERS = {
  "demo-carrier-a": [
    {
      id: "drv-a-1",
      name: "Jordan Hale",
      phone: "(510) 555-0142",
      truck: "TRK-204",
      status: "Active",
    },
    {
      id: "drv-a-2",
      name: "Casey Quinn",
      phone: "(510) 555-0198",
      truck: "TRK-311",
      status: "Active",
    },
  ],
  "demo-carrier-b": [
    {
      id: "drv-b-1",
      name: "Riley Stone",
      phone: "(713) 555-0104",
      truck: "TRK-088",
      status: "Active",
    },
  ],
  "demo-carrier-c": [
    {
      id: "drv-c-1",
      name: "Taylor Kim",
      phone: "(303) 555-0177",
      truck: "TRK-152",
      status: "Inactive",
    },
  ],
  "demo-carrier-d": [],
};

/**
 * Replace this function with a tenant-scoped carriers API client later.
 * Keep the return shape stable so CarriersWorkspace does not need a rewrite.
 *
 * @returns {{
 *   carriers: TenantCarrier[],
 *   costSettingsByCarrierId: Record<string, object[]>,
 *   driversByCarrierId: Record<string, object[]>
 * }}
 */
export function getTenantCarriersDemoData() {
  if (!USE_TENANT_CARRIERS_DEMO) {
    return {
      carriers: [],
      costSettingsByCarrierId: {},
      driversByCarrierId: {},
    };
  }

  return {
    carriers: DEMO_CARRIERS.map((carrier) => ({ ...carrier })),
    costSettingsByCarrierId: { ...DEMO_COST_SETTINGS },
    driversByCarrierId: { ...DEMO_DRIVERS },
  };
}

/**
 * Tenant PO Tracker frontend demo fixtures.
 *
 * DEMO MODE ONLY — never sent to APIs or written to a database.
 * No tenant PO Tracker API exists in this React app today.
 * Disable by setting USE_TENANT_PO_TRACKER_DEMO to false (or replace
 * getTenantPoTrackerDemoData() with a real tenant-scoped API client).
 */
export const USE_TENANT_PO_TRACKER_DEMO = true;

export const PO_DETAIL_TABS = ["Details", "Transactions"];

export const PO_STATUS_OPTIONS = ["Active", "Inactive"];

export const PO_GROUP_OPTIONS = [
  { value: "none", label: "None" },
  { value: "product", label: "Product" },
  { value: "terminal", label: "Terminal" },
  { value: "status", label: "Status" },
];

function initialsFromLabel(label) {
  const words = String(label || "PO")
    .replace(/^PO#:\s*/i, "")
    .split(/[\s/-]+/)
    .filter(Boolean);
  if (words.length === 0) {
    return "PO";
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function formatLbs(value) {
  return Number(value || 0).toLocaleString("en-US");
}

/**
 * @typedef {object} TenantPurchaseOrder
 * @property {string} id
 * @property {string} poNumber display title after "PO#: "
 * @property {string} initials
 * @property {string} product
 * @property {number} quantityLbs
 * @property {string} unit
 * @property {string} terminal
 * @property {string} status Active | Inactive
 * @property {string} statusClass
 * @property {number} consumedLbs
 * @property {number} remainingLbs
 * @property {number} loadsDelivered
 * @property {number} loadsOrdered
 * @property {number} loadsProgressPercent
 * @property {"demo"|"draft"} [source]
 */

/**
 * @param {Partial<TenantPurchaseOrder> & { id: string, poNumber: string }} overrides
 * @returns {TenantPurchaseOrder}
 */
export function createPurchaseOrderRecord(overrides) {
  const quantityLbs = Number(overrides.quantityLbs ?? 0);
  const consumedLbs = Number(overrides.consumedLbs ?? 0);
  const remainingLbs =
    overrides.remainingLbs != null
      ? Number(overrides.remainingLbs)
      : Math.max(0, quantityLbs - consumedLbs);
  const loadsOrdered = Number(overrides.loadsOrdered ?? 0);
  const loadsDelivered = Number(overrides.loadsDelivered ?? 0);
  const loadsProgressPercent =
    overrides.loadsProgressPercent != null
      ? Number(overrides.loadsProgressPercent)
      : loadsOrdered > 0
        ? Math.round((loadsDelivered / loadsOrdered) * 100)
        : 0;
  const status = overrides.status || "Active";

  return {
    id: overrides.id,
    poNumber: overrides.poNumber,
    initials: overrides.initials || initialsFromLabel(overrides.poNumber),
    product: overrides.product || "",
    quantityLbs,
    unit: overrides.unit || "LBS",
    terminal: overrides.terminal || "",
    status,
    statusClass:
      overrides.statusClass || (status === "Active" ? "success" : "danger"),
    consumedLbs,
    remainingLbs,
    loadsDelivered,
    loadsOrdered,
    loadsProgressPercent,
    source: overrides.source || "demo",
  };
}

export function createTenantPoDraft(sequence = 1) {
  const poNumber = `Demo PO ${sequence}`;
  return createPurchaseOrderRecord({
    id: `draft-po-${Date.now()}-${sequence}`,
    poNumber,
    product: "Demo Product",
    quantityLbs: 1000000,
    terminal: "Demo Terminal",
    consumedLbs: 0,
    loadsDelivered: 0,
    loadsOrdered: 0,
    loadsProgressPercent: 0,
    status: "Active",
    source: "draft",
  });
}

export function formatPoListSubtitle(po) {
  return `${formatLbs(po.quantityLbs)} ${po.unit} of ${po.product}`;
}

export function formatPoQuantityLabel(po) {
  return `${formatLbs(po.quantityLbs)} ${po.unit}`;
}

export { formatLbs };

const DEMO_PURCHASE_ORDERS = [
  createPurchaseOrderRecord({
    id: "demo-po-100-mesh-mts",
    poNumber: "100 Mesh MTS",
    initials: "MM",
    product: "100 Mesh Local",
    quantityLbs: 10000000,
    terminal: "Mobile-Delta MTS T",
    consumedLbs: 63300,
    remainingLbs: 9936700,
    loadsDelivered: 1,
    loadsOrdered: 6,
    loadsProgressPercent: 17,
    status: "Active",
  }),
  createPurchaseOrderRecord({
    id: "demo-po-40-70-mts",
    poNumber: "40/70 MTS",
    initials: "QE",
    product: "40/70 Premium",
    quantityLbs: 5000000,
    terminal: "Mobile-Delta MTS T",
    consumedLbs: 1250000,
    loadsDelivered: 4,
    loadsOrdered: 10,
    loadsProgressPercent: 40,
    status: "Active",
  }),
  createPurchaseOrderRecord({
    id: "demo-po-northern-frac",
    poNumber: "Northern Frac Sand",
    initials: "MF",
    product: "Northern White",
    quantityLbs: 2500000,
    terminal: "North Terminal",
    consumedLbs: 800000,
    loadsDelivered: 3,
    loadsOrdered: 8,
    loadsProgressPercent: 38,
    status: "Active",
  }),
  createPurchaseOrderRecord({
    id: "demo-po-mesh-local",
    poNumber: "Mesh Local Reserve",
    initials: "MD",
    product: "100 Mesh Local",
    quantityLbs: 7500000,
    terminal: "Denver Hub",
    consumedLbs: 0,
    loadsDelivered: 0,
    loadsOrdered: 12,
    loadsProgressPercent: 0,
    status: "Inactive",
  }),
];

const DEMO_TRANSACTIONS = {
  "demo-po-100-mesh-mts": [
    {
      id: "txn-1",
      date: "2026-10-12",
      type: "Delivery",
      ticket: "TKT-88421",
      quantityLbs: "45,000",
      status: "Posted",
    },
    {
      id: "txn-2",
      date: "2026-10-13",
      type: "Delivery",
      ticket: "TKT-88455",
      quantityLbs: "18,300",
      status: "Posted",
    },
  ],
  "demo-po-40-70-mts": [
    {
      id: "txn-3",
      date: "2026-10-10",
      type: "Delivery",
      ticket: "TKT-88001",
      quantityLbs: "50,000",
      status: "Posted",
    },
  ],
  "demo-po-northern-frac": [],
  "demo-po-mesh-local": [],
};

/**
 * Replace this function with a tenant-scoped PO Tracker API client later.
 * Keep the return shape stable so PoTrackerWorkspace does not need a rewrite.
 *
 * @returns {{
 *   purchaseOrders: TenantPurchaseOrder[],
 *   transactionsByPoId: Record<string, object[]>
 * }}
 */
export function getTenantPoTrackerDemoData() {
  if (!USE_TENANT_PO_TRACKER_DEMO) {
    return {
      purchaseOrders: [],
      transactionsByPoId: {},
    };
  }

  return {
    purchaseOrders: DEMO_PURCHASE_ORDERS.map((po) => ({ ...po })),
    transactionsByPoId: { ...DEMO_TRANSACTIONS },
  };
}

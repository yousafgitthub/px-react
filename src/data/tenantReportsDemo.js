/**
 * Tenant Reports frontend demo fixtures.
 * DEMO MODE ONLY — no reports API exists in this React app yet.
 */
export const USE_TENANT_REPORTS_DEMO = true;

export const REPORT_NAV_ITEMS = [
  { id: "loads-overview", label: "Loads Overview" },
  { id: "po-statistics", label: "PO Statistics" },
  { id: "avg-truck-times", label: "Average Truck Times" },
  { id: "avg-demurrage", label: "Average Demurrage" },
  { id: "reconciled-status", label: "Reconciled Status" },
];

export const REPORT_DEFINITIONS = {
  "loads-overview": {
    id: "loads-overview",
    label: "Loads Overview",
    columns: [
      { key: "jobName", label: "Job Name" },
      { key: "operatorName", label: "Operator Name" },
      { key: "terminal", label: "Terminal" },
      { key: "loadNo", label: "Load No" },
      { key: "carrier", label: "Carrier" },
      { key: "product", label: "Product" },
      { key: "driver", label: "Driver" },
      { key: "truckNo", label: "Truck No" },
      { key: "mileage", label: "Mileage" },
      { key: "deliveryDate", label: "Delivery Date" },
      { key: "scaleTicketNo", label: "Scale Ticket No." },
      { key: "totalHauling", label: "Total Hauling" },
      { key: "loadStatus", label: "Load Status" },
      { key: "po", label: "PO" },
    ],
    /** Volume field used for Load Volume KPI + CSV consistency */
    volumeKey: "totalHauling",
    emptyMessage: "No loads found for this report.",
  },
  "po-statistics": {
    id: "po-statistics",
    label: "PO Statistics",
    columns: [
      { key: "po", label: "PO" },
      { key: "jobName", label: "Job Name" },
      { key: "ordered", label: "Ordered" },
      { key: "delivered", label: "Delivered" },
      { key: "remaining", label: "Remaining" },
      { key: "loadCount", label: "No. of Loads" },
      { key: "status", label: "Status" },
    ],
    volumeKey: "delivered",
    countKey: "loadCount",
    emptyMessage: "No PO statistics found.",
  },
  "avg-truck-times": {
    id: "avg-truck-times",
    label: "Average Truck Times",
    columns: [
      { key: "terminal", label: "Terminal" },
      { key: "loadCount", label: "No. of Loads" },
      { key: "avgLoadMin", label: "Avg Load (min)" },
      { key: "avgUnloadMin", label: "Avg Unload (min)" },
      { key: "avgTransitMin", label: "Avg Transit (min)" },
      { key: "totalVolume", label: "Load Volume (LBS)" },
    ],
    volumeKey: "totalVolume",
    countKey: "loadCount",
    emptyMessage: "No truck time averages found.",
  },
  "avg-demurrage": {
    id: "avg-demurrage",
    label: "Average Demurrage",
    columns: [
      { key: "carrier", label: "Carrier" },
      { key: "loadCount", label: "No. of Loads" },
      { key: "avgHours", label: "Avg Hours" },
      { key: "incidents", label: "Incidents" },
      { key: "totalVolume", label: "Load Volume (LBS)" },
      { key: "cost", label: "Cost" },
    ],
    volumeKey: "totalVolume",
    countKey: "loadCount",
    emptyMessage: "No demurrage averages found.",
  },
  "reconciled-status": {
    id: "reconciled-status",
    label: "Reconciled Status",
    columns: [
      { key: "loadNo", label: "Load No" },
      { key: "jobName", label: "Job Name" },
      { key: "expected", label: "Expected" },
      { key: "actual", label: "Actual" },
      { key: "variance", label: "Variance" },
      { key: "status", label: "Status" },
    ],
    volumeKey: "actual",
    emptyMessage: "No reconciled loads found.",
  },
};

/** @deprecated use REPORT_DEFINITIONS['loads-overview'].columns */
export const LOADS_OVERVIEW_COLUMNS =
  REPORT_DEFINITIONS["loads-overview"].columns;

function loadRow(overrides) {
  return {
    id: overrides.id,
    jobName: overrides.jobName || "kilogram check M/H",
    operatorName: overrides.operatorName || "operator3",
    terminal: overrides.terminal || "EQR terminal - MT",
    loadNo: overrides.loadNo,
    carrier: overrides.carrier || "ABC Hauling",
    product: overrides.product || "40/70 Brown",
    driver: overrides.driver || "Alex Rivera",
    truckNo: overrides.truckNo || "TX-4481",
    mileage: overrides.mileage ?? "112.4",
    deliveryDate: overrides.deliveryDate || "",
    scaleTicketNo: overrides.scaleTicketNo || "",
    totalHauling: overrides.totalHauling || "45000",
    loadStatus: overrides.loadStatus || "Delivered",
    po: overrides.po || "PO-1001",
  };
}

function buildLoadsOverview() {
  const seeds = [
    {
      jobName: "blk-test",
      operatorName: "Op 6",
      terminal: "qr-enable",
      carrier: "Carrier A",
      product: "SFR-302",
      driver: "Juan Manuel",
      truckNo: "TX-1001",
      mileage: "678",
      totalHauling: "60880",
      po: "po-12",
    },
    {
      jobName: "Box-KG",
      operatorName: "operator3",
      terminal: "Mobile-Delta MTS T",
      carrier: "Carrier F",
      product: "100 Mesh Local",
      driver: "Checo Perez",
      truckNo: "TX-1002",
      mileage: "20.5",
      totalHauling: "45000",
      po: "100 Mesh MTS",
    },
    {
      jobName: "kilogram check M/H",
      operatorName: "operator3",
      terminal: "EQR terminal - MT",
      carrier: "ABC Hauling",
      product: "16/30 White",
      driver: "Alex Rivera",
      truckNo: "TX-4481",
      mileage: "98.2",
      totalHauling: "45000",
      po: "PO-1001",
    },
    {
      jobName: "Slurry-D Product-Wise Summary",
      operatorName: "Slurry Ops",
      terminal: "Slurry Yard",
      carrier: "West Line",
      product: "100 Mesh",
      driver: "Jordan Lee",
      truckNo: "OK-8810",
      mileage: "67.5",
      totalHauling: "42000",
      po: "PO-2104",
    },
    {
      jobName: "Load-T BTW Silo And Pile",
      operatorName: "Silo Ops",
      terminal: "cre paint energy",
      carrier: "Rapid Freight",
      product: "40/70 Brown",
      driver: "Pat Quinn",
      truckNo: "TX-7744",
      mileage: "88.6",
      totalHauling: "45000",
      po: "PO-1015",
    },
    {
      jobName: "Load-T Form P TO ALL Job",
      operatorName: "Form Ops",
      terminal: "Test terminal A",
      carrier: "ABC Hauling",
      product: "30/50 White",
      driver: "Chris Ng",
      truckNo: "NM-2201",
      mileage: "121.8",
      totalHauling: "38000",
      po: "PO-1008",
    },
  ];

  const statuses = ["Delivered", "Delivered", "At Terminal", "Ordered", "Delivered"];
  const rows = [];

  for (let index = 0; index < 32; index += 1) {
    const seed = seeds[index % seeds.length];
    const status = statuses[index % statuses.length];
    const hasDelivery = status === "Delivered";
    const day = String((index % 28) + 1).padStart(2, "0");
    const hour = 8 + (index % 10);
    const minute = String((index * 7) % 60).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = ((hour - 1) % 12) + 1;

    rows.push(
      loadRow({
        id: `rpt-${index + 1}`,
        ...seed,
        loadNo: String(index + 1),
        truckNo: `${seed.truckNo}-${index + 1}`,
        mileage: seed.mileage,
        totalHauling: hasDelivery ? seed.totalHauling : "0",
        loadStatus: status,
        deliveryDate: hasDelivery
          ? `10/${day}/2026 ${hour12}:${minute} ${ampm}`
          : "",
        scaleTicketNo: hasDelivery
          ? `TCK-${String(12381 + index).padStart(6, "0")}`
          : "",
      })
    );
  }

  return rows;
}

export function getTenantReportsDemoData() {
  const loadsOverview = buildLoadsOverview();

  return {
    "loads-overview": loadsOverview,
    "po-statistics": [
      {
        id: "po-1",
        po: "PO-1001",
        jobName: "kilogram check M/H",
        ordered: "250000",
        delivered: "180000",
        remaining: "70000",
        loadCount: 12,
        status: "Open",
      },
      {
        id: "po-2",
        po: "PO-2104",
        jobName: "Slurry-D Product-Wise Summary",
        ordered: "90000",
        delivered: "90000",
        remaining: "0",
        loadCount: 8,
        status: "Closed",
      },
      {
        id: "po-3",
        po: "PO-1015",
        jobName: "Load-T BTW Silo And Pile",
        ordered: "120000",
        delivered: "75000",
        remaining: "45000",
        loadCount: 7,
        status: "Open",
      },
      {
        id: "po-4",
        po: "MTS-po",
        jobName: "Box-KG",
        ordered: "60000",
        delivered: "60000",
        remaining: "0",
        loadCount: 5,
        status: "Closed",
      },
    ],
    "avg-truck-times": [
      {
        id: "att-1",
        terminal: "EQR terminal - MT",
        loadCount: 14,
        avgLoadMin: "42",
        avgUnloadMin: "28",
        avgTransitMin: "95",
        totalVolume: "630000",
      },
      {
        id: "att-2",
        terminal: "Slurry Yard",
        loadCount: 9,
        avgLoadMin: "38",
        avgUnloadMin: "31",
        avgTransitMin: "110",
        totalVolume: "378000",
      },
      {
        id: "att-3",
        terminal: "cre paint energy",
        loadCount: 9,
        avgLoadMin: "40",
        avgUnloadMin: "26",
        avgTransitMin: "88",
        totalVolume: "405000",
      },
    ],
    "avg-demurrage": [
      {
        id: "ad-1",
        carrier: "ABC Hauling",
        loadCount: 11,
        avgHours: "1.4",
        incidents: "3",
        totalVolume: "495000",
        cost: "$420",
      },
      {
        id: "ad-2",
        carrier: "Rapid Freight",
        loadCount: 8,
        avgHours: "0.8",
        incidents: "1",
        totalVolume: "360000",
        cost: "$160",
      },
      {
        id: "ad-3",
        carrier: "West Line",
        loadCount: 7,
        avgHours: "1.1",
        incidents: "2",
        totalVolume: "294000",
        cost: "$275",
      },
      {
        id: "ad-4",
        carrier: "Carrier A",
        loadCount: 6,
        avgHours: "0.5",
        incidents: "0",
        totalVolume: "270000",
        cost: "$0",
      },
    ],
    "reconciled-status": [
      {
        id: "rs-1",
        loadNo: "1",
        jobName: "blk-test",
        expected: "60880",
        actual: "60880",
        variance: "0",
        status: "Matched",
      },
      {
        id: "rs-2",
        loadNo: "3",
        jobName: "kilogram check M/H",
        expected: "45000",
        actual: "45000",
        variance: "0",
        status: "Matched",
      },
      {
        id: "rs-3",
        loadNo: "16",
        jobName: "Slurry-D Product-Wise Summary",
        expected: "42000",
        actual: "41250",
        variance: "-750",
        status: "Open",
      },
      {
        id: "rs-4",
        loadNo: "15",
        jobName: "Box-KG",
        expected: "45000",
        actual: "45000",
        variance: "0",
        status: "Matched",
      },
      {
        id: "rs-5",
        loadNo: "22",
        jobName: "Load-T BTW Silo And Pile",
        expected: "45000",
        actual: "44800",
        variance: "-200",
        status: "Open",
      },
    ],
  };
}

export function getReportDefinition(reportId) {
  return REPORT_DEFINITIONS[reportId] || REPORT_DEFINITIONS["loads-overview"];
}

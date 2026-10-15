/**
 * Tenant Jobs frontend demo fixtures.
 *
 * DEMO MODE ONLY — never sent to APIs or written to a database.
 * Disable by setting USE_TENANT_JOBS_DEMO to false (or replace
 * getTenantJobsDemoData() with a real tenant-scoped API client).
 */
export const USE_TENANT_JOBS_DEMO = true;

/** Job detail tabs — single row including Users. */
export const JOB_DETAIL_TABS = [
  "Details",
  "Loads",
  "Assets",
  "Usage",
  "Inventory",
  "History",
  "Reconcile",
  "KPI",
  "Drivers",
  "Users",
];

/** Stable demo numbers derived from a job id (frontend-only). */
function demoSeed(jobId) {
  let hash = 0;
  const text = String(jobId || "demo");
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 100000;
  }
  return hash;
}

export const LOAD_COLUMNS = [
  "Load",
  "Carrier",
  "Truck/Trailer",
  "Stage",
  "Product",
  "PO",
  "Weight",
  "Terminal",
  "Ticket No.",
  "Status Time",
  "Status",
];

function loadRow(overrides) {
  return {
    id: overrides.id,
    load: overrides.load,
    carrier: overrides.carrier || "Demo Carrier",
    truckTrailer: overrides.truckTrailer || "T-100 / TR-20",
    stage: overrides.stage || "Transit",
    product: overrides.product || "Sand",
    po: overrides.po || "PO-1001",
    weight: overrides.weight || "45,000 lbs",
    terminal: overrides.terminal || "North Terminal",
    ticketNo: overrides.ticketNo || "TKT-0001",
    statusTime: overrides.statusTime || "2026-10-14 09:15",
    status: overrides.status || "In Transit",
  };
}

export const JOB_GROUP_OPTIONS = [
  { value: "none", label: "None" },
  { value: "basin", label: "Basin" },
  { value: "crew", label: "Crew" },
  { value: "jobType", label: "Job Type" },
  { value: "district", label: "District" },
];

const DEMO_JOBS = [
  {
    id: "demo-job-kg-check",
    name: "kilogram check M/H",
    initials: "KC",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Permian",
    crew: "Crew A",
    jobType: "Bulk",
    district: "Central",
    operator: "operator3",
    operatorLabel: "Op 6",
    company: "Allusers",
    companyLabel: "Company 26June",
    locationName: "cre paint energy",
    locationRegion: "Texas, USA",
    latitude: "31.9685988",
    longitude: "-99.9018131",
    terminal: "EQR terminal - MT",
    destination: "cre paint energy",
    notes: "Screenshot-aligned Details demo job.",
    source: "demo",
  },
  {
    id: "demo-job-001",
    name: "blk-test",
    initials: "BT",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Permian",
    crew: "Crew A",
    jobType: "Bulk",
    district: "West",
    operator: "PropX Operator",
    operatorLabel: "Op 1",
    company: "Demo Tenant Company",
    companyLabel: "Company BulkCo",
    locationName: "Bulk Yard Midland",
    locationRegion: "Texas, USA",
    latitude: "31.9973",
    longitude: "-102.0779",
    terminal: "Bulk Terminal A",
    destination: "Pad 12",
    notes: "Demo job for block testing.",
    source: "demo",
  },
  {
    id: "demo-job-002",
    name: "Slurry-D Product-Wise Summary",
    initials: "SP",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Eagle Ford",
    crew: "Crew B",
    jobType: "Slurry",
    district: "South",
    operator: "Slurry Ops",
    operatorLabel: "Op 2",
    company: "Demo Tenant Company",
    companyLabel: "Company SlurryInc",
    locationName: "Eagle Ford Site",
    locationRegion: "Texas, USA",
    latitude: "28.9783",
    longitude: "-98.4850",
    terminal: "Slurry Yard",
    destination: "Well D-4",
    notes: "Product-wise slurry summary demo.",
    source: "demo",
  },
  {
    id: "demo-job-003",
    name: "Slxrry-T Load Transfer",
    initials: "SL",
    status: "Pending",
    statusClass: "warning",
    group: "Ungrouped",
    basin: "Permian",
    crew: "Crew B",
    jobType: "Transfer",
    district: "West",
    operator: "Transfer Desk",
    company: "Demo Tenant Company",
    terminal: "Transfer Hub",
    destination: "Silo 3",
    notes: "Load transfer demo job.",
    source: "demo",
  },
  {
    id: "demo-job-004",
    name: "Load-T Form P TO ALL Job",
    initials: "LF",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Bakken",
    crew: "Crew C",
    jobType: "Load",
    district: "North",
    operator: "Form Ops",
    company: "Demo Tenant Company",
    terminal: "Form P",
    destination: "ALL Pads",
    notes: "Form P to all destinations demo.",
    source: "demo",
  },
  {
    id: "demo-job-005",
    name: "Load-T BTW H And P Graf...",
    initials: "LH",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Permian",
    crew: "Crew A",
    jobType: "Load",
    district: "West",
    operator: "Haul Ops",
    company: "Demo Tenant Company",
    terminal: "Hub H",
    destination: "Pad Graf",
    notes: "Between Hub and Pad Graf demo.",
    source: "demo",
  },
  {
    id: "demo-job-006",
    name: "Load-T BTW H And P Wer...",
    initials: "LW",
    status: "Pending",
    statusClass: "warning",
    group: "Ungrouped",
    basin: "Permian",
    crew: "Crew A",
    jobType: "Load",
    district: "Central",
    operator: "Haul Ops",
    company: "Demo Tenant Company",
    terminal: "Hub H",
    destination: "Pad Wer",
    notes: "Between Hub and Pad Wer demo.",
    source: "demo",
  },
  {
    id: "demo-job-007",
    name: "Load-T BTW Silo And Pile",
    initials: "LS",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Eagle Ford",
    crew: "Crew C",
    jobType: "Transfer",
    district: "South",
    operator: "Silo Ops",
    company: "Demo Tenant Company",
    terminal: "Silo Complex",
    destination: "Pile Yard",
    notes: "Silo to pile transfer demo.",
    source: "demo",
  },
  {
    id: "demo-job-008",
    name: "Load-T BTW Bulk and Pile",
    initials: "LB",
    status: "Inactive",
    statusClass: "danger",
    group: "Ungrouped",
    basin: "Bakken",
    crew: "Crew B",
    jobType: "Bulk",
    district: "North",
    operator: "Bulk Ops",
    company: "Demo Tenant Company",
    terminal: "Bulk Dock",
    destination: "Pile 7",
    notes: "Bulk and pile demo.",
    source: "demo",
  },
  {
    id: "demo-job-009",
    name: "parent child reports rates",
    initials: "PC",
    status: "Active",
    statusClass: "success",
    group: "Ungrouped",
    basin: "Permian",
    crew: "Crew C",
    jobType: "Report",
    district: "Central",
    operator: "Rates Admin",
    company: "Demo Tenant Company",
    terminal: "Main Yard",
    destination: "Reporting Pad",
    notes: "Parent/child reporting rates demo.",
    source: "demo",
  },
];

const DEMO_LOADS_BY_JOB = {
  "demo-job-001": {
    transit: [
      loadRow({
        id: "tr-1",
        load: "L-10021",
        carrier: "ABC Hauling",
        truckTrailer: "101 / 501",
        stage: "En Route",
        product: "40/70 Sand",
        po: "PO-4401",
        weight: "48,200 lbs",
        terminal: "Bulk Terminal A",
        ticketNo: "TKT-8821",
        statusTime: "2026-10-14 08:42",
        status: "In Transit",
      }),
      loadRow({
        id: "tr-2",
        load: "L-10022",
        carrier: "Rapid Freight",
        truckTrailer: "215 / 612",
        stage: "Departed",
        product: "100 Mesh",
        po: "PO-4402",
        weight: "46,800 lbs",
        terminal: "Bulk Terminal A",
        ticketNo: "TKT-8822",
        statusTime: "2026-10-14 09:05",
        status: "In Transit",
      }),
    ],
    destination: [
      loadRow({
        id: "ds-1",
        load: "L-10010",
        carrier: "ABC Hauling",
        truckTrailer: "088 / 404",
        stage: "At Pad",
        product: "40/70 Sand",
        po: "PO-4390",
        weight: "47,100 lbs",
        terminal: "Bulk Terminal A",
        ticketNo: "TKT-8801",
        statusTime: "2026-10-14 07:55",
        status: "At Destination",
      }),
    ],
    delivered: [
      loadRow({
        id: "dl-1",
        load: "L-09991",
        carrier: "West Line",
        truckTrailer: "044 / 301",
        stage: "Complete",
        product: "30/50 Sand",
        po: "PO-4300",
        weight: "45,500 lbs",
        terminal: "Bulk Terminal A",
        ticketNo: "TKT-8700",
        statusTime: "2026-10-13 18:20",
        status: "Delivered",
      }),
      loadRow({
        id: "dl-2",
        load: "L-09992",
        carrier: "West Line",
        truckTrailer: "045 / 302",
        stage: "Complete",
        product: "40/70 Sand",
        po: "PO-4301",
        weight: "46,200 lbs",
        terminal: "Bulk Terminal A",
        ticketNo: "TKT-8701",
        statusTime: "2026-10-13 19:10",
        status: "Delivered",
      }),
    ],
  },
};

function defaultLoadsForJob(job) {
  return {
    transit: [
      loadRow({
        id: `${job.id}-tr-1`,
        load: `L-${job.id.slice(-3)}01`,
        carrier: "Demo Carrier Co",
        terminal: job.terminal,
        product: "Sand Blend",
        status: "In Transit",
      }),
    ],
    destination: [
      loadRow({
        id: `${job.id}-ds-1`,
        load: `L-${job.id.slice(-3)}02`,
        carrier: "Pad Logistics",
        terminal: job.terminal,
        stage: "Waiting",
        status: "At Destination",
        statusTime: "2026-10-14 10:00",
      }),
    ],
    delivered: [
      loadRow({
        id: `${job.id}-dl-1`,
        load: `L-${job.id.slice(-3)}03`,
        carrier: "Demo Carrier Co",
        terminal: job.terminal,
        stage: "Complete",
        status: "Delivered",
        statusTime: "2026-10-13 16:45",
      }),
    ],
  };
}

function buildTabTables(job) {
  return {
    assets: [
      { id: `${job.id}-a1`, name: "Silo Unit 4", type: "Silo", status: "Available", location: job.terminal },
      { id: `${job.id}-a2`, name: "Box Trailer 12", type: "Box", status: "In Use", location: job.destination },
    ],
    babyBeast: [
      { id: `${job.id}-b1`, unit: "BB-01", stage: "Active", rate: "120 TPH", notes: "Demo baby beast unit" },
      { id: `${job.id}-b2`, unit: "BB-02", stage: "Standby", rate: "0 TPH", notes: "Reserve unit" },
    ],
    usage: [
      { id: `${job.id}-u1`, period: "Today", product: "40/70 Sand", used: "210 tons", remaining: "90 tons" },
      { id: `${job.id}-u2`, period: "Yesterday", product: "100 Mesh", used: "175 tons", remaining: "125 tons" },
    ],
    inventory: [
      { id: `${job.id}-i1`, sku: "INV-401", product: "40/70 Sand", onHand: "320 tons", location: "Silo 1" },
      { id: `${job.id}-i2`, sku: "INV-402", product: "100 Mesh", onHand: "180 tons", location: "Silo 2" },
    ],
    history: [
      { id: `${job.id}-h1`, time: "2026-10-14 08:00", event: "Job activated", user: job.operator },
      { id: `${job.id}-h2`, time: "2026-10-13 17:40", event: "Load delivered", user: "System" },
      { id: `${job.id}-h3`, time: "2026-10-13 09:15", event: "Job created", user: job.operator },
    ],
    reconcile: [
      { id: `${job.id}-r1`, ticket: "TKT-8700", expected: "45,500", actual: "45,480", variance: "-20", status: "Matched" },
      { id: `${job.id}-r2`, ticket: "TKT-8701", expected: "46,200", actual: "46,210", variance: "+10", status: "Review" },
    ],
    kpi: [
      { id: `${job.id}-k1`, metric: "On-time delivery", value: "94%", target: "90%" },
      { id: `${job.id}-k2`, metric: "Avg cycle time", value: "2.4 hrs", target: "3.0 hrs" },
      { id: `${job.id}-k3`, metric: "Loads completed", value: "18", target: "20" },
    ],
    drivers: [
      { id: `${job.id}-d1`, name: "John Reyes", phone: "+1 555 0101", status: "On Load", truck: "101" },
      { id: `${job.id}-d2`, name: "Maria Chen", phone: "+1 555 0102", status: "Available", truck: "215" },
    ],
    users: [
      { id: `${job.id}-us1`, name: "Tenant Admin", email: "admin@tenant.com", role: "Company Admin", status: "Active" },
      { id: `${job.id}-us2`, name: job.operator, email: "ops@tenant.demo", role: "Operator", status: "Active" },
    ],
  };
}

function buildJobDetails(job) {
  const seed = demoSeed(job.id);
  const deliveredLoads = 20 + (seed % 40);
  const totalLoads = deliveredLoads + 8 + (seed % 15);
  const assignedDrivers = seed % 5;
  const orderedDrivers = assignedDrivers + (seed % 4);
  const poDelivered = 150000 + seed * 17;
  const poTotal = poDelivered + 800000 + seed * 41;

  // Screenshot-aligned demo metrics for the reference Details job only.
  const screenshotSummary =
    job.id === "demo-job-kg-check"
      ? {
          loadsDelivered: 32,
          loadsTotal: 12510,
          driversAssigned: 0,
          driversOrdered: 0,
          poDeliveredLbs: 2131806,
          poTotalLbs: 1103191848,
        }
      : null;

  return {
    operatorLabel: job.operatorLabel || `Op ${(seed % 9) + 1}`,
    companyLabel: job.companyLabel || job.company || "Demo Company",
    locationName: job.locationName || job.destination || job.terminal || "Demo Site",
    locationRegion: job.locationRegion || "Texas, USA",
    latitude: job.latitude || (31.5 + (seed % 100) / 100).toFixed(7),
    longitude: job.longitude || (-99.5 - (seed % 100) / 100).toFixed(7),
    statusLabel: job.status || "Active",
    summary: screenshotSummary || {
      loadsDelivered: deliveredLoads,
      loadsTotal: totalLoads,
      driversAssigned: assignedDrivers,
      driversOrdered: orderedDrivers,
      poDeliveredLbs: poDelivered,
      poTotalLbs: poTotal,
    },
    terminals: [
      {
        id: `${job.id}-term-1`,
        terminalName: job.terminal || "EQR terminal - MT",
        approvedMileage:
          job.id === "demo-job-kg-check"
            ? "20.5"
            : (10 + (seed % 20) + 0.5).toFixed(1),
      },
      {
        id: `${job.id}-term-2`,
        terminalName: "Test terminal A",
        approvedMileage:
          job.id === "demo-job-kg-check"
            ? "10.5"
            : (5 + (seed % 12) + 0.5).toFixed(1),
      },
    ],
    // Empty by default to match admin empty DataTables state in the screenshot.
    pumpingStatusLog: [],
  };
}

function buildLoadsDashboard(job) {
  const statusRows = [
    {
      id: `${job.id}-ls-1`,
      productName: "16/30 White",
      terminal: "MTS Test Terminal",
      accepted: 2,
      atTerminal: 1,
      inTransit: 3,
      atDestination: 0,
      delivered: 4,
    },
    {
      id: `${job.id}-ls-2`,
      productName: "16/30 Resin",
      terminal: "novateus park",
      accepted: 1,
      atTerminal: 0,
      inTransit: 2,
      atDestination: 1,
      delivered: 5,
    },
    {
      id: `${job.id}-ls-3`,
      productName: "100 Mesh",
      terminal: "Stark Terminal",
      accepted: 0,
      atTerminal: 2,
      inTransit: 1,
      atDestination: 0,
      delivered: 3,
    },
    {
      id: `${job.id}-ls-4`,
      productName: "100 Mesh Native",
      terminal: "Hi Crush-Kermit, TX test",
      accepted: 3,
      atTerminal: 1,
      inTransit: 4,
      atDestination: 2,
      delivered: 6,
    },
  ];

  const totals = statusRows.reduce(
    (acc, row) => ({
      accepted: acc.accepted + row.accepted,
      atTerminal: acc.atTerminal + row.atTerminal,
      inTransit: acc.inTransit + row.inTransit,
      atDestination: acc.atDestination + row.atDestination,
      delivered: acc.delivered + row.delivered,
    }),
    { accepted: 0, atTerminal: 0, inTransit: 0, atDestination: 0, delivered: 0 }
  );

  return {
    metricMode: "# of Trucks",
    metricOptions: ["# of Trucks", "# of Loads", "Tons"],
    statusRows,
    statusTotals: totals,
    driverCount: 1,
    carriers: ["All carriers", "ABC Hauling", "Rapid Freight", "West Line"],
    loadedBoxes: 0,
    dailyAllocation: [
      {
        id: `${job.id}-da-1`,
        poNumber: "NV park 16/30",
        dailyAllocation: "250,000 LBS",
        rollover: "12,000 LBS",
        totalRemaining: "180,000 LBS",
        ordered: "70,000 LBS",
        accepted: "40,000 LBS",
        atTerminal: "15,000 LBS",
        totalNotPulled: "45,000 LBS",
        totalPulled: "25,000 LBS",
      },
      {
        id: `${job.id}-da-2`,
        poNumber: "KG-Native",
        dailyAllocation: "120,000 KG",
        rollover: "5,000 KG",
        totalRemaining: "88,000 KG",
        ordered: "32,000 KG",
        accepted: "18,000 KG",
        atTerminal: "8,000 KG",
        totalNotPulled: "22,000 KG",
        totalPulled: "10,000 KG",
      },
      {
        id: `${job.id}-da-3`,
        poNumber: `${job.name.slice(0, 12)} PO`,
        dailyAllocation: "90,000 LBS",
        rollover: "0 LBS",
        totalRemaining: "54,000 LBS",
        ordered: "36,000 LBS",
        accepted: "20,000 LBS",
        atTerminal: "6,000 LBS",
        totalNotPulled: "26,000 LBS",
        totalPulled: "10,000 LBS",
      },
    ],
  };
}

/**
 * Returns a deep-cloned demo dataset for the tenant Jobs UI.
 * Returns an empty list when demo mode is disabled.
 */
export function getTenantJobsDemoData() {
  if (!USE_TENANT_JOBS_DEMO) {
    return {
      jobs: [],
      loadsByJobId: {},
      tablesByJobId: {},
      dashboardByJobId: {},
      detailsByJobId: {},
    };
  }

  const jobs = DEMO_JOBS.map((job) => ({ ...job }));
  const loadsByJobId = {};
  const tablesByJobId = {};
  const dashboardByJobId = {};
  const detailsByJobId = {};

  jobs.forEach((job) => {
    const loads = DEMO_LOADS_BY_JOB[job.id] || defaultLoadsForJob(job);
    loadsByJobId[job.id] = {
      transit: loads.transit.map((row) => ({ ...row })),
      destination: loads.destination.map((row) => ({ ...row })),
      delivered: loads.delivered.map((row) => ({ ...row })),
    };
    tablesByJobId[job.id] = buildTabTables(job);
    dashboardByJobId[job.id] = buildLoadsDashboard(job);
    detailsByJobId[job.id] = buildJobDetails(job);
  });

  return {
    jobs,
    loadsByJobId,
    tablesByJobId,
    dashboardByJobId,
    detailsByJobId,
  };
}

export function createTenantJobDraft(index) {
  const name = `Demo Draft Job ${index}`;
  return {
    id: `demo-draft-${Date.now()}-${index}`,
    name,
    initials: "DJ",
    status: "Pending",
    statusClass: "warning",
    group: "Ungrouped",
    basin: "Ungrouped",
    crew: "Ungrouped",
    jobType: "Draft",
    district: "Ungrouped",
    operator: "Demo Operator",
    company: "Demo Tenant Company",
    terminal: "",
    destination: "",
    notes: "Demo-only draft. Not persisted to any API or database.",
    source: "demo-draft",
  };
}

export function createEmptyLoadsDashboard() {
  return {
    metricMode: "# of Trucks",
    metricOptions: ["# of Trucks", "# of Loads", "Tons"],
    statusRows: [],
    statusTotals: {
      accepted: 0,
      atTerminal: 0,
      inTransit: 0,
      atDestination: 0,
      delivered: 0,
    },
    driverCount: 0,
    carriers: ["All carriers"],
    loadedBoxes: 0,
    dailyAllocation: [],
  };
}

export function createEmptyJobDetails(job = {}) {
  return buildJobDetails({
    id: job.id || `draft-${Date.now()}`,
    name: job.name || "Demo Draft Job",
    operator: job.operator || "Demo Operator",
    company: job.company || "Demo Tenant Company",
    terminal: job.terminal || "",
    destination: job.destination || "",
    status: job.status || "Pending",
  });
}

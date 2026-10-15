/**
 * Tenant Box Management frontend demo fixtures.
 * DEMO MODE ONLY — never sent to APIs or written to a database.
 */
export const USE_TENANT_BOX_DEMO = true;

export const BOX_SETTINGS_NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "inventory", label: "Box Inventory" },
  { id: "management", label: "Box Management" },
  { id: "history", label: "Box History" },
  { id: "on-the-road", label: "On The Road" },
  { id: "stage-report", label: "Stage Report" },
  { id: "service-report", label: "Service Report" },
];

export const BOX_JOB_FILTERS = [
  { value: "all", label: "All Jobs" },
  { value: "kg-check", label: "kilogram check M/H" },
  { value: "slurry", label: "Slurry-D Product-Wise Summary" },
  { value: "blk-test", label: "blk-test" },
];

export const BOX_INTERVAL_OPTIONS = [
  { value: "1-Hour", label: "1-Hour" },
  { value: "6-Hour", label: "6-Hour" },
  { value: "12-Hour", label: "12-Hour" },
  { value: "1-Day", label: "1-Day" },
];

function seed(text) {
  let hash = 0;
  const value = String(text || "box");
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
}

export function getTenantBoxDemoData() {
  const kpis = {
    activeBoxes: 25,
    boxesInCirculation: 25,
    boxesOutOfService: 0,
  };

  const truckCounts = [
    { label: "Sep 30 12 AM", value: 0 },
    { label: "Oct 1 12 AM", value: 0 },
    { label: "Oct 1 12 PM", value: 0 },
    { label: "Oct 2 12 AM", value: 0 },
    { label: "Oct 2 12 PM", value: 0 },
    { label: "Oct 3 12 AM", value: 0 },
    { label: "Oct 3 12 PM", value: 0 },
    { label: "Oct 4 12 AM", value: 0 },
    { label: "Oct 4 12 PM", value: 0 },
    { label: "Oct 5 12 AM", value: 0 },
    { label: "Oct 5 12 PM", value: 0 },
    { label: "Oct 6 12 AM", value: 0 },
    { label: "Oct 6 12 PM", value: 0 },
    { label: "Oct 7 12 AM", value: 0 },
    { label: "Oct 7 12 PM", value: 0 },
    { label: "Oct 8 12 AM", value: 0 },
    { label: "Oct 8 12 PM", value: 0 },
    { label: "Oct 9 12 AM", value: 0 },
    { label: "Oct 9 12 PM", value: 0 },
    { label: "Oct 10 12 AM", value: 0 },
    { label: "Oct 10 12 PM", value: 0 },
    { label: "Oct 11 12 AM", value: 0 },
    { label: "Oct 11 12 PM", value: 0 },
    { label: "Oct 12 12 AM", value: 0 },
    { label: "Oct 12 12 PM", value: 0 },
    { label: "Oct 13 12 AM", value: 0 },
    { label: "Oct 13 12 PM", value: 0 },
    { label: "Oct 14 12 AM", value: 0 },
  ];

  const inventory = [
    {
      id: "bx-1",
      boxId: "BX-1001",
      type: "Sand Box",
      status: "Active",
      location: "EQR terminal - MT",
      job: "kilogram check M/H",
    },
    {
      id: "bx-2",
      boxId: "BX-1002",
      type: "Sand Box",
      status: "In Circulation",
      location: "cre paint energy",
      job: "Slurry-D Product-Wise Summary",
    },
    {
      id: "bx-3",
      boxId: "BX-1003",
      type: "Box Trailer",
      status: "Active",
      location: "Slurry Yard",
      job: "blk-test",
    },
  ];

  const management = inventory.map((row, index) => ({
    id: `mgmt-${row.id}`,
    boxId: row.boxId,
    assignedTo: index % 2 === 0 ? "Crew A" : "Crew B",
    lastService: `2026-0${(index % 9) + 1}-12`,
    capacity: `${40 + (seed(row.id) % 20)} tons`,
    status: row.status,
  }));

  const history = [
    {
      id: "hist-1",
      time: "2026-10-14 08:12",
      boxId: "BX-1001",
      event: "Loaded",
      user: "operator3",
    },
    {
      id: "hist-2",
      time: "2026-10-13 16:40",
      boxId: "BX-1002",
      event: "In Transit",
      user: "driver.alex",
    },
    {
      id: "hist-3",
      time: "2026-10-12 11:05",
      boxId: "BX-1003",
      event: "Serviced",
      user: "tenant.admin",
    },
  ];

  const onTheRoad = [
    {
      id: "otr-1",
      boxId: "BX-1002",
      truck: "TX-4481",
      driver: "Alex Rivera",
      destination: "Eagle Ford Site",
      eta: "2026-10-14 18:30",
    },
  ];

  const stageReport = [
    {
      id: "st-1",
      stage: "At Terminal",
      boxes: 8,
      tons: "320",
      job: "kilogram check M/H",
    },
    {
      id: "st-2",
      stage: "In Transit",
      boxes: 6,
      tons: "240",
      job: "Slurry-D Product-Wise Summary",
    },
    {
      id: "st-3",
      stage: "On Site",
      boxes: 11,
      tons: "440",
      job: "All Jobs",
    },
  ];

  const serviceReport = [
    {
      id: "svc-1",
      boxId: "BX-1003",
      serviceType: "Inspection",
      completed: "2026-10-12",
      nextDue: "2026-11-12",
      status: "Complete",
    },
    {
      id: "svc-2",
      boxId: "BX-1001",
      serviceType: "Repair",
      completed: "—",
      nextDue: "2026-10-20",
      status: "Scheduled",
    },
  ];

  return {
    kpis,
    truckCounts,
    dateRangeLabel: "09/30/2026 - 10/14/2026",
    inventory,
    management,
    history,
    onTheRoad,
    stageReport,
    serviceReport,
  };
}

/**
 * Add Job modal configuration (frontend-only).
 * No create-job API exists in this React app — form data stays local.
 */

/** Display order matches Add Job Job Type dropdown (addjob.png). */
export const ADD_JOB_TYPES = [
  { value: "Bulk / Pneumatic", label: "Bulk / Pneumatic" },
  { value: "Box", label: "Box" },
  { value: "PropX Box", label: "PropX Box" },
  { value: "Silo", label: "Silo" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Slurry", label: "SLxRRY" },
  { value: "Piles", label: "Piles" },
];

/**
 * Central tab configuration by Job Type.
 * Settings is always first. Permissions and Terminal are separate tabs
 * (permission.png + terinal list.png).
 */
export function getAddJobTabs(jobType) {
  const afterProducts = (() => {
    switch (jobType) {
      case "Silo":
        return ["Silos"];
      case "Hybrid":
        return ["Hopper"];
      default:
        return [];
    }
  })();

  return [
    "Settings",
    "Wells",
    "Roles",
    "Products",
    ...afterProducts,
    "Carrier",
    "Permissions",
    "Terminal",
    "Notes",
    "Pictures",
  ];
}

/** Demo dropdown options only — replace with API lists when available. */
export const ADD_JOB_DEMO_OPTIONS = {
  destinations: ["Select destination", "Well Pad A", "Well Pad B", "North Yard"],
  useApptTime: ["No", "Yes"],
  crews: ["Select Crew", "Crew Alpha", "Crew Beta", "Crew Gamma"],
  basins: ["Select Basin", "Permian", "Eagle Ford", "DJ Basin"],
  checkInTypes: ["Select Check In Type", "Manual", "Automatic", "QR"],
  regions: ["Select Region", "West", "Central", "East"],
  frostLaw: ["No", "Yes"],
  companies: ["Select Company", "Demo Tenant Company", "Operator Co"],
  products: ["100 Mesh", "16/30 Resin", "100 Mesh Native", "16/30 White"],
  productUnits: ["LBS", "ST", "Tons"],
  siloBelts: ["Select Silo Belt", "Belt A", "Belt B", "Belt C", "Belt North"],
};

let idCounter = 1;
function nextId(prefix) {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function createEmptyWell(index = 1) {
  return {
    id: nextId("well"),
    name: `Well ${index}`,
    apiNumber: "",
    status: "Active",
  };
}

export function createEmptyProductRow(overrides = {}) {
  return {
    id: nextId("product"),
    product: overrides.product || "",
    unitCode: overrides.unitCode || "LBS",
    padDesign: overrides.padDesign || "",
    poNumber: overrides.poNumber || "",
    currentPoVolume: overrides.currentPoVolume || "",
    preFillVolume: overrides.preFillVolume || "",
    poAllocation: overrides.poAllocation || "",
    avgLoadWeight: overrides.avgLoadWeight || "",
    perUnitRate: overrides.perUnitRate || "",
    poStatus: overrides.poStatus || "Active",
  };
}

export function createEmptyCarrierRow(overrides = {}) {
  return {
    id: nextId("carrier"),
    carrier: overrides.carrier || "",
    haulingCost: overrides.haulingCost || "",
    status: overrides.status || "Active",
  };
}

export function createEmptyRateSheet(overrides = {}) {
  return {
    id: nextId("rate"),
    haulingCost: overrides.haulingCost || "",
    status: overrides.status || "Active",
  };
}

export function createEmptyPermissionRow(overrides = {}) {
  return {
    id: nextId("perm"),
    carrier: overrides.carrier || "",
    loadDeliverCarrier: overrides.loadDeliverCarrier ?? true,
    loadDeliverDriver: overrides.loadDeliverDriver ?? true,
    loadUpdateDriver: overrides.loadUpdateDriver ?? false,
  };
}

export function createEmptyTerminalRow(overrides = {}) {
  return {
    id: nextId("terminal"),
    terminal: overrides.terminal || "",
    approvedMileage: overrides.approvedMileage || "0.00",
    approvedLoadTime: overrides.approvedLoadTime || "0",
    approvedUnloadTime: overrides.approvedUnloadTime || "0",
    approvedTransitTime: overrides.approvedTransitTime || "0",
  };
}

export function createEmptyHopperRow(overrides = {}) {
  return {
    id: nextId("hopper"),
    serialNumber: overrides.serialNumber || "",
    capacity: overrides.capacity || "",
  };
}

/**
 * One Silo Belt row in the Add Job → Silo tab section.
 * Frontend form state only until a job/silo-belt API exists.
 */
export function createEmptySiloBelt() {
  return {
    id: nextId("belt"),
    siloBelt: "",
    siloCapacity: "0",
  };
}

/**
 * Optional visual demo seed for tabs (matches screenshots for UI review).
 * Not production data — local form state only.
 */
export function getAddJobTabDemoSeed() {
  return {
    wells: [
      createEmptyWell(1),
      { ...createEmptyWell(2), name: "Well Pad North", apiNumber: "API-100" },
    ],
    operatorRateSheets: [],
    companyRateSheets: [],
    companyRateCompany: "",
    products: [
      createEmptyProductRow({
        product: "100 Mesh",
        padDesign: "25000000",
        poNumber: "100 Mesh Eqr ST",
        currentPoVolume: "117400469",
        preFillVolume: "23",
        poAllocation: "24432423",
        avgLoadWeight: "2500",
        perUnitRate: "6",
      }),
      createEmptyProductRow({
        product: "16/30 Resin",
        padDesign: "234213432",
        poNumber: "NV park 16/30",
        currentPoVolume: "34075573",
        preFillVolume: "24",
        poAllocation: "23423423",
        avgLoadWeight: "345",
        perUnitRate: "8",
      }),
      createEmptyProductRow({
        product: "100 Mesh Native",
        padDesign: "3434",
        poNumber: "KG-Native - ref_kg_1",
        currentPoVolume: "89474384",
        preFillVolume: "32",
        poAllocation: "234234325",
        avgLoadWeight: "2500",
        perUnitRate: "12",
      }),
      createEmptyProductRow({
        product: "16/30 White",
        padDesign: "3434",
        poNumber: "MTS-po",
        currentPoVolume: "1856719",
        preFillVolume: "35",
        poAllocation: "43",
        avgLoadWeight: "2500",
        perUnitRate: "34",
      }),
    ],
    carriers: [
      createEmptyCarrierRow({
        carrier: "Carrier A",
        haulingCost: "Boxes - All Basin ( Flat )",
      }),
      createEmptyCarrierRow({
        carrier: "CarrierAex",
        haulingCost: "Hopper - Haynesville Basin ( Per ST )",
      }),
    ],
    permissionFlags: {
      updateLoadTimeStamps: false,
      updateLoadStatus: true,
      updateProductOrPo: false,
      cancelLoads: false,
    },
    permissions: [
      createEmptyPermissionRow({ carrier: "Carrier A" }),
      createEmptyPermissionRow({ carrier: "CarrierAex" }),
      createEmptyPermissionRow({ carrier: "Carrier F" }),
    ],
    terminals: [
      createEmptyTerminalRow({
        terminal: "Hi Crush- Kermit, TX test",
        approvedMileage: "10.00",
      }),
      createEmptyTerminalRow({
        terminal: "MTS Test Terminal",
        approvedMileage: "77.00",
      }),
      createEmptyTerminalRow({
        terminal: "Stark Terminal",
        approvedMileage: "10.00",
      }),
    ],
    notesByType: {
      special: "",
      accepted: "",
      terminal: "",
      inTransit: "",
      atDest: "",
    },
    pictures: [null, null],
    siloBelts: [createEmptySiloBelt()],
    hoppers: [
      createEmptyHopperRow({
        serialNumber: "hopperX",
        capacity: "200000.00",
      }),
    ],
  };
}

export function createEmptyAddJobForm(sequence = 1) {
  const seed = getAddJobTabDemoSeed();
  return {
    jobName: `Demo Draft Job ${sequence}`,
    jobType: "Bulk / Pneumatic",
    startDate: "",
    endDate: "",
    destination: "",
    loadsRequirements: "",
    useApptTime: "No",
    checkInType: "",
    carrierPo: "",
    district: "",
    crew: "",
    region: "",
    freightPo: "",
    frostLaw: "No",
    basin: "",
    stagesPerDay: "",
    status: "Pending",
    operator: "operator3",
    ...seed,
  };
}

/**
 * Map a list/detail job record into Add Job form state for Edit mode.
 * Uses job.addJobDraft when present; otherwise maps top-level job fields.
 */
export function normalizeAddJobType(jobType) {
  if (!jobType) {
    return "Bulk / Pneumatic";
  }
  if (jobType === "Bulk" || jobType === "Pneumatic") {
    return "Bulk / Pneumatic";
  }
  if (jobType === "SLxRRY") {
    return "Slurry";
  }
  const known = ADD_JOB_TYPES.some((type) => type.value === jobType);
  return known ? jobType : "Bulk / Pneumatic";
}

export function buildAddJobFormFromJob(job) {
  const draft = job?.addJobDraft || {};
  const emptySeed = {
    wells: [],
    operatorRateSheets: [],
    companyRateSheets: [],
    companyRateCompany: "",
    products: [],
    carriers: [],
    permissionFlags: {
      updateLoadTimeStamps: false,
      updateLoadStatus: false,
      updateProductOrPo: false,
      cancelLoads: false,
    },
    permissions: [],
    terminals: [],
    notesByType: {
      special: "",
      accepted: "",
      terminal: "",
      inTransit: "",
      atDest: "",
    },
    pictures: [null, null],
    siloBelts: [createEmptySiloBelt()],
    hoppers: [],
  };

  const notesByType =
    draft.notesByType ||
    (job?.notes
      ? {
          special: job.notes,
          accepted: "",
          terminal: "",
          inTransit: "",
          atDest: "",
        }
      : emptySeed.notesByType);

  return {
    ...emptySeed,
    ...draft,
    jobName: job?.name || "",
    jobType: normalizeAddJobType(job?.jobType || draft.jobType),
    startDate: draft.startDate || "",
    endDate: draft.endDate || "",
    destination: draft.destination || job?.destination || "",
    loadsRequirements: draft.loadsRequirements || "",
    useApptTime: draft.useApptTime || "No",
    checkInType: draft.checkInType || "",
    carrierPo: draft.carrierPo || "",
    district: draft.district || job?.district || "",
    crew: draft.crew || job?.crew || "",
    region: draft.region || "",
    freightPo: draft.freightPo || "",
    frostLaw: draft.frostLaw || "No",
    basin: draft.basin || job?.basin || "",
    stagesPerDay: draft.stagesPerDay || "",
    status: job?.status || draft.status || "Pending",
    operator: job?.operator || draft.operator || "",
    notesByType,
    wells: draft.wells || emptySeed.wells,
    operatorRateSheets: draft.operatorRateSheets || emptySeed.operatorRateSheets,
    companyRateSheets: draft.companyRateSheets || emptySeed.companyRateSheets,
    companyRateCompany:
      draft.companyRateCompany || emptySeed.companyRateCompany,
    products: draft.products || emptySeed.products,
    carriers: draft.carriers || emptySeed.carriers,
    permissionFlags: draft.permissionFlags || emptySeed.permissionFlags,
    permissions: draft.permissions || emptySeed.permissions,
    terminals:
      draft.terminals ||
      (job?.terminal
        ? [
            {
              id: `terminal-from-job-${job.id}`,
              terminal: job.terminal,
              approvedMileage: "0.00",
              approvedLoadTime: "0",
              approvedUnloadTime: "0",
              approvedTransitTime: "0",
            },
          ]
        : emptySeed.terminals),
    siloBelts:
      draft.siloBelts?.length > 0 ? draft.siloBelts : emptySeed.siloBelts,
    hoppers: draft.hoppers || emptySeed.hoppers,
    pictures: draft.pictures || emptySeed.pictures,
  };
}

/**
 * Strip type-incompatible fields before treating data as "active" for a job type.
 */
export function sanitizeAddJobPayload(form) {
  const tabs = getAddJobTabs(form.jobType);
  const payload = { ...form };

  if (!tabs.includes("Silos")) {
    payload.siloBelts = [];
  } else {
    payload.siloBelts = (form.siloBelts || []).filter(
      (belt) =>
        String(belt.siloBelt || "").trim() ||
        (String(belt.siloCapacity ?? "").trim() !== "" &&
          String(belt.siloCapacity).trim() !== "0")
    );
  }

  if (!tabs.includes("Hopper")) {
    payload.hoppers = [];
  }

  return payload;
}

export function formatNumberDisplay(value) {
  const number = Number(String(value).replace(/,/g, ""));
  if (!Number.isFinite(number)) {
    return value || "";
  }
  return number.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(number) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

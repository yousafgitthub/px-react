import {
  ACCOUNT_TYPES,
  AUTH_STORAGE_KEY,
  LEGACY_LOGIN_KEY,
} from "./constants";

/**
 * Demo account directory — stands in for a real login API response.
 * Account type / role / tenant identity come from this resolved profile,
 * not from ad-hoc email checks in route guards or UI.
 *
 * Backend gap: px-react has no live auth API wired; pxapis only exposes
 * a generic Sanctum login without PropX tenant roles. Replace
 * resolveAccountProfile() with a real API call when available.
 */
const DEMO_ACCOUNT_PROFILES = {
  "admin@tenant.com": {
    id: "user-tenant-admin",
    email: "admin@tenant.com",
    firstName: "Tenant",
    lastName: "Admin",
    displayName: "Tenant Admin",
    accountType: ACCOUNT_TYPES.TENANT,
    role: "Company Admin",
    tenant: {
      id: "tenant-demo-1",
      name: "Demo Tenant Company",
    },
    permissions: [
      "tenant.overview",
      "tenant.jobs",
      "tenant.map",
      "tenant.box-management",
      "tenant.slicer-report",
      "tenant.carrier",
      "tenant.po-tracker",
      "tenant.settings",
      "tenant.help",
    ],
  },
};

function buildDefaultSuperAdminProfile(email) {
  return {
    id: "user-super-admin",
    email,
    firstName: "Admin",
    lastName: "User",
    displayName: "admin_user",
    accountType: ACCOUNT_TYPES.SUPER_ADMIN,
    role: "Super Admin",
    tenant: null,
    permissions: ["admin.*"],
  };
}

function resolveAccountProfile(email) {
  const normalized = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNT_PROFILES[normalized] ||
    buildDefaultSuperAdminProfile(normalized)
  );
}

export function getHomePathForUser(user) {
  if (!user) {
    return "/login";
  }

  if (user.accountType === ACCOUNT_TYPES.TENANT) {
    return "/tenant/";
  }

  return "/admin";
}

export function isTenantUser(user) {
  return user?.accountType === ACCOUNT_TYPES.TENANT;
}

export function isSuperAdminUser(user) {
  return user?.accountType === ACCOUNT_TYPES.SUPER_ADMIN;
}

export function userHasPermission(user, permission) {
  if (!user?.permissions?.length) {
    return false;
  }

  if (user.permissions.includes("admin.*")) {
    return true;
  }

  return user.permissions.includes(permission);
}

export function readStoredSession() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function writeStoredSession(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(LEGACY_LOGIN_KEY, "true");
}

export function clearStoredSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(LEGACY_LOGIN_KEY);
  localStorage.removeItem("activePage");
}

/**
 * Authenticate with credentials. Returns a session user profile including
 * accountType, role, and tenant — the source of truth for redirects and guards.
 */
export async function loginWithCredentials(email, password) {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    const error = new Error("Email and password are required.");
    error.code = "VALIDATION";
    throw error;
  }

  // No live PropX auth API is connected yet; resolve a demo profile instead.
  const user = resolveAccountProfile(trimmedEmail);
  writeStoredSession(user);
  return user;
}

export function logoutSession() {
  clearStoredSession();
}

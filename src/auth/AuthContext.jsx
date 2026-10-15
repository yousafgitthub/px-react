import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import {
  getHomePathForUser,
  isSuperAdminUser,
  isTenantUser,
  loginWithCredentials,
  logoutSession,
  readStoredSession,
  userHasPermission,
} from "./authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredSession());

  const login = useCallback(async (email, password) => {
    const sessionUser = await loginWithCredentials(email, password);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(() => {
    logoutSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isTenant: isTenantUser(user),
      isSuperAdmin: isSuperAdminUser(user),
      homePath: getHomePathForUser(user),
      hasPermission: (permission) => userHasPermission(user, permission),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

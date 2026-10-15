import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { ACCOUNT_TYPES } from "../../auth/constants";

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export function RequireAccountType({ accountType, children }) {
  const { isAuthenticated, user, homePath } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (user.accountType !== accountType) {
    return <Navigate to={homePath} replace />;
  }

  return children;
}

export function RequireTenant({ children }) {
  return (
    <RequireAccountType accountType={ACCOUNT_TYPES.TENANT}>
      {children}
    </RequireAccountType>
  );
}

export function RequireSuperAdmin({ children }) {
  return (
    <RequireAccountType accountType={ACCOUNT_TYPES.SUPER_ADMIN}>
      {children}
    </RequireAccountType>
  );
}

export function GuestOnly({ children }) {
  const { isAuthenticated, homePath } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={homePath} replace />;
  }

  return children;
}

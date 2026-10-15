import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { ACCOUNT_TYPES } from "../auth/constants";
import { getHomePathForUser } from "../auth/authService";
import "../css/App.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      const fallbackPath = getHomePathForUser(user);
      const redirectTo = location.state?.from;

      // Only honor a deep-link return path when it matches the user's home area.
      const canUseReturnPath =
        typeof redirectTo === "string" &&
        ((user.accountType === ACCOUNT_TYPES.TENANT &&
          redirectTo.startsWith("/tenant")) ||
          (user.accountType === ACCOUNT_TYPES.SUPER_ADMIN &&
            redirectTo.startsWith("/admin")));

      navigate(canUseReturnPath ? redirectTo : fallbackPath, { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-card">
        <div className="login-logo">
          <img src="/login-images/logo.png" alt="PropX Connect" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              id="email"
              required
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span className="custom-checkbox"></span>
              <span>Keep me logged in</span>
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

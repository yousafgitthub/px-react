import { useState } from "react";
import "../css/App.css";

function Login({ onLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            return;
        }

        onLogin();
    };

    return (
        <div className="login-page">
            <div className="login-overlay"></div>

            <div className="login-card">
                <div className="login-logo">
                    <img src="/login-images/logo.png" alt="PropX Connect" />
                </div>
                {/* login form start */}
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="text" id="email" required name="email" placeholder="Enter email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter password" value={password} required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button" className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                            </button>

                        </div>
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <span className="custom-checkbox"></span>
                            <span>Keep me logged in</span>
                        </label>
                        <a href="#" className="forgot-password"> Forgot Password? </a>

                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                {/* login form end */}
            </div>
        </div>
    );
}

export default Login;
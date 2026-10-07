import { useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "../../css/dashboard.css";

function ProfileSettings() {
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "",
        phone: "+1 234 567 890",
        role_id: "Super Admin",
        status: "Active",
    });

    const [imagePreview, setImagePreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [passwordData, setPasswordData] = useState({currentPassword: "", newPassword: "", confirmPassword: ""});
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const fields = [
        {
            name: "firstName",
            label: "First name",
            type: "text",
            required: true,
            placeholder: "Enter first name",
        },
        {
            name: "lastName",
            label: "Last name",
            type: "text",
            required: true,
            placeholder: "Enter last name",
        },
        {
            name: "email",
            label: "Email address",
            type: "email",
            required: true,
            placeholder: "name@company.com",
        },
        {
            name: "phone",
            label: "Phone number",
            type: "tel",
            placeholder: "+1 000 000 0000",
        },
        {
            name: "role_id",
            label: "Type",
            type: "select",
            options: ["Super Admin"],
        },
        {
            name: "status",
            label: "Status",
            type: "select",
            options: ["Active", "Inactive"],
        },
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = (event) => {
        event.preventDefault();

        if (!passwordData.currentPassword) {
            toastr.error("Please enter your current password.");
            return;
        }

        if (!passwordData.newPassword) {
            toastr.error("Please enter your new password.");
            return;
        }

        if (!passwordData.confirmPassword) {
            toastr.error("Please confirm your new password.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toastr.error("New password and confirm password do not match.");
            return;
        }

        console.log("Change password:", passwordData);

        toastr.success(
            "Password changed successfully.",
            "Success"
        );
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        setImagePreview(
            file ? URL.createObjectURL(file) : ""
        );

        setFormData((prev) => ({
            ...prev,
            profileImage: file || "",
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);

        const hasErrors = fields.some(
            (field) =>
                field.required &&
                !String(formData[field.name] || "").trim()
        );

        if (hasErrors) {
            return;
        }

        console.log("Updated profile:", formData);

        toastr.success(
            "Profile details updated successfully.",
            "Success"
        );
    };

    return (
        <div className="admin-users-page">

            <div className="admin-users-header">
                <div className="profile-settings-tabs">
                    <button
                        type="button"
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile Details
                    </button>

                    <button
                        type="button"
                        className={activeTab === "password" ? "active" : ""}
                        onClick={() => setActiveTab("password")}
                    >
                        Change Password
                    </button>
                </div>
            </div>

            <div className="profile-settings-card">
                 {activeTab === "profile" ? (

                    <form noValidate onSubmit={handleSubmit}>

                        <div className="user-form-grid">

                            {/* Profile Image */}
                            <label className="user-image-upload">
                                <input
                                    type="file"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />

                                <span className="user-image-upload-circle">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Selected user profile"
                                        />
                                    ) : (
                                        <i
                                            className="fa fa-cloud-upload"
                                            aria-hidden="true"
                                        ></i>
                                    )}
                                </span>

                                <span className="user-image-upload-text">
                                    Upload profile image
                                </span>

                                <span className="user-image-upload-hint">
                                    JPG, PNG, or WEBP
                                </span>
                            </label>

                            {/* Fields */}
                            {fields.map((field) => {
                                const hasError =
                                    formSubmitted &&
                                    field.required &&
                                    !String(
                                        formData[field.name] || ""
                                    ).trim();

                                return (
                                    <label
                                        key={field.name}
                                        className={
                                            field.fullWidth
                                                ? "user-form-full"
                                                : ""
                                        }
                                    >
                                        {field.label}

                                        {field.type === "select" ? (
                                            <select
                                                name={field.name}
                                                value={
                                                    formData[field.name] || ""
                                                }
                                                onChange={handleInputChange}
                                                className={
                                                    hasError
                                                        ? "field-error"
                                                        : ""
                                                }
                                            >
                                                {field.placeholder && (
                                                    <option
                                                        value=""
                                                        disabled
                                                    >
                                                        {field.placeholder}
                                                    </option>
                                                )}

                                                {field.options?.map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        ) : field.type === "password" ? (
                                            <div className="password-input-wrapper">

                                                <input
                                                    required={field.required}
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name={field.name}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    value={
                                                        formData[field.name] ||
                                                        ""
                                                    }
                                                    onChange={
                                                        handleInputChange
                                                    }
                                                    className={
                                                        hasError
                                                            ? "field-error"
                                                            : ""
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    aria-label={
                                                        showPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                >
                                                    <i
                                                        className={
                                                            showPassword
                                                                ? "fa fa-eye"
                                                                : "fa fa-eye-slash"
                                                        }
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>

                                            </div>
                                        ) : (
                                            <input
                                                required={field.required}
                                                type={
                                                    field.type || "text"
                                                }
                                                name={field.name}
                                                placeholder={
                                                    field.placeholder
                                                }
                                                value={
                                                    formData[field.name] ||
                                                    ""
                                                }
                                                onChange={
                                                    handleInputChange
                                                }
                                                className={
                                                    hasError
                                                        ? "field-error"
                                                        : ""
                                                }
                                            />
                                        )}

                                        {hasError && (
                                            <span className="field-error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </label>
                                );
                            })}

                        </div>

                        <div className="profile-form-actions">

                            <button
                                type="submit"
                                className="new-admin-button"
                            >
                                <i className="fa fa-save"></i>
                                Save
                            </button>

                        </div>

                    </form>
                ) : (
                    <form noValidate onSubmit={handlePasswordSubmit}>
                        <div className="user-form-grid">

                            {/* Current Password */}
                            <label>
                                Current Password

                                <div className="password-input-wrapper">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        name="currentPassword"
                                        placeholder="Enter current password"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                                    >
                                        <i className={showCurrentPassword ? "fa fa-eye" : "fa fa-eye-slash"}aria-hidden="true">
                                        </i>
                                    </button>
                                </div>
                            </label>

                            {/* New Password */}
                            <label>
                                New Password

                                <div className="password-input-wrapper">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        placeholder="Enter new password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>setShowNewPassword(!showNewPassword)}
                                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                                    >
                                        <i className={showNewPassword ? "fa fa-eye" : "fa fa-eye-slash"}aria-hidden="true">
                                        </i>
                                    </button>
                                </div>
                            </label>

                            {/* Confirm Password */}
                            <label>
                                Confirm Password

                                <div className="password-input-wrapper">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm new password"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>setShowConfirmPassword(!showConfirmPassword)}
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        <i
                                            className={ showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
                            </label>

                        </div>

                        <div className="profile-form-actions">
                            <button
                                type="submit"
                                className="new-admin-button"
                            >
                                <i className="fa fa-key"></i>
                                Change Password
                            </button>
                        </div>

                    </form>
                )}

            </div>

        </div>
    );
}

export default ProfileSettings;
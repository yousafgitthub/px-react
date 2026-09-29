import { useState } from "react";

function UserFormModal({ title, fields, onClose, onSubmit, showImage = true, initialData = {} }) {
    const [formData, setFormData] = useState(initialData);
    const [imagePreview, setImagePreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        setImagePreview(file ? URL.createObjectURL(file) : "");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const hasErrors = fields.some(
            (field) => field.required && !String(formData[field.name] || "").trim()
        );

        if (hasErrors) {
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="user-modal-backdrop" onMouseDown={onClose}>
            <section className="user-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
                <div className="user-modal-header">
                    <div>
                        <p className="user-modal-eyebrow">{title}</p>
                    </div>

                    <button type="button" className="user-modal-close" aria-label="Close form" onClick={onClose}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>

                <form noValidate onSubmit={handleSubmit}>
                    <div className="user-form-grid">

                        {showImage && (
                            <label className="user-image-upload">
                                <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
                                <span className="user-image-upload-circle">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Selected user profile" />
                                    ) : (
                                        <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                                    )}
                                </span>
                                <span className="user-image-upload-text">Upload profile image</span>
                                <span className="user-image-upload-hint">JPG, PNG, or WEBP</span>
                            </label>
                        )}

                        {fields.map((field) => {
                            const hasError = formSubmitted && field.required && !String(formData[field.name] || "").trim();

                            return (
                                <label key={field.name} className={field.fullWidth ? "user-form-full" : ""}>
                                    {field.label}

                                    {field.type === "select" ? (
                                        <select name={field.name} value={formData[field.name] || ""} onChange={handleInputChange} className={hasError ? "field-error" : ""}>
                                            {field.placeholder && <option value="" disabled>{field.placeholder}</option>}
                                            {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
                                        </select>
                                    ) : field.type === "password" ? (
                                        <div className="password-input-wrapper">
                                            <input required={field.required} type={showPassword ? "text" : "password"} name={field.name} placeholder={field.placeholder} value={formData[field.name] || ""} onChange={handleInputChange} className={hasError ? "field-error" : ""} />
                                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
                                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <input required={field.required} type={field.type || "text"} name={field.name} placeholder={field.placeholder} value={formData[field.name] || ""} onChange={handleInputChange} className={hasError ? "field-error" : ""} />
                                    )}

                                    {hasError && <span className="field-error-message">This field is required</span>}
                                </label>
                            );
                        })}
                    </div>

                    <div className="user-modal-actions">
                        <button type="button" className="user-modal-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="new-admin-button">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default UserFormModal;
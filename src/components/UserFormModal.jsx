import { useState } from "react";

function UserFormModal({ title, fields, onClose, onSubmit, showImage = true, initialData = {}, locationType, setLocationType }) {
    const [formData, setFormData] = useState(initialData);
    const [imagePreview, setImagePreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox" && ["paperless", "qr_code", "mts"].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                paperless: name === "paperless" ? checked : false,
                qr_code: name === "qr_code" ? checked : false,
                mts: name === "mts" ? checked : false,
            }));

            return;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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
                            const shouldShow =
                            !field.showWhen ||
                            (
                                (
                                    Array.isArray(field.showWhen.value)
                                        ? field.showWhen.value.includes(formData[field.showWhen.field])
                                        : formData[field.showWhen.field] === field.showWhen.value
                                ) &&
                                (
                                    !field.showWhen.dependsOn ||
                                    formData[field.showWhen.dependsOn.field] === field.showWhen.dependsOn.value
                                )
                            );
                            if (!shouldShow) {
                                return null;
                            }

                            
                            const hasError = formSubmitted && field.required && (
                                field.type === "location"
                                ? locationType === "coordinates"
                                    ? (
                                        !String(formData.longitude || "").trim() ||
                                        !String(formData.latitude || "").trim()
                                    )
                                    : !String(formData.address || "").trim()
                                : !String(formData[field.name] || "").trim()
                            );

                            if (field.type === "checkbox") {
                                return (
                                    <label key={field.name} className="user-form-checkbox">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            checked={formData[field.name] || false}
                                            onChange={handleInputChange}
                                        />
                                        <span>{field.label}</span>
                                    </label>
                                );
                            }
                            if (field.type === "location") {
                                return (
                                    <label
                                        key={field.name}
                                        className={field.fullWidth ? "user-form-full" : ""}
                                    >
                                        <div className="location-field-label">
                                            <span>{locationType === "address" ? "Address" : "Coordinates"}</span>

                                            <button
                                                type="button"
                                                className="location-dropdown-button"
                                                onClick={() => setLocationType(
                                                    locationType === "address" ? "coordinates" : "address"
                                                )}
                                            >
                                                <i className="fa fa-chevron-down"></i>
                                            </button>
                                        </div>

                                        {locationType === "address" ? (
                                            <input
                                                required={field.required}
                                                type="text"
                                                name="address"
                                                placeholder={field.placeholder}
                                                value={formData.address || ""}
                                                onChange={handleInputChange}
                                                className={hasError ? "field-error" : ""}
                                            />
                                       
                                        ) : (
                                            
                                            <div className="coordinates-fields">
                                                <div className="coordinate-field">
                                                    <input
                                                        type="text"
                                                        name="longitude"
                                                        placeholder="Longitude"
                                                        value={formData.longitude || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                    {formSubmitted && !String(formData.longitude || "").trim() && (
                                                        <span className="field-error-message">Longitude is required</span>
                                                    )}
                                                </div>

                                                <div className="coordinate-field">
                                                    <input
                                                        type="text"
                                                        name="latitude"
                                                        placeholder="Latitude"
                                                        value={formData.latitude || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                    {formSubmitted && !String(formData.latitude || "").trim() && (
                                                        <span className="field-error-message">Latitude is required</span>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    className="coordinates-map-button"
                                                    title="Show location on map"
                                                    aria-label="Show location on map"
                                                    onClick={() => setShowMap(true)}
                                                >
                                                    <i className="fa fa-crosshairs" aria-hidden="true"></i>
                                                </button>
                                            </div>

                                        )}

                                        {hasError && locationType === "address" && (
                                            <span className="field-error-message">
                                                This field is required
                                            </span>
                                        )}
                                    </label>
                                );
                            }
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
                                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
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
                    <br></br>
                    {showMap &&
                        String(formData.longitude || "").trim() &&
                        String(formData.latitude || "").trim() &&
                        Number.isFinite(Number(formData.longitude)) &&
                        Number.isFinite(Number(formData.latitude)) &&
                        Math.abs(Number(formData.longitude)) <= 180 &&
                        Math.abs(Number(formData.latitude)) <= 90 && (
                        <div className="coordinates-map">
                            <iframe
                                title="Terminal location map"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                loading="lazy"
                                src={`https://maps.google.com/maps?q=${formData.latitude},${formData.longitude}&z=15&output=embed`}
                                allowFullScreen
                            />
                        </div>
                    )}


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
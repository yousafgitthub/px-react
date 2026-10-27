
function ConfirmDeleteModal({
    onClose,
    onConfirm,
    title = "Delete Record",
    message = "Are you sure you want to delete this record?",
    confirmText = "Yes, Delete",
    icon = "fa-trash",
}) {
    return (
        <div className="delete-modal-backdrop" onMouseDown={onClose}>
            <section
                className="delete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="delete-modal-icon">
                    <i className={`fa ${icon}`} aria-hidden="true"></i>
                </div>

                <h3 id="delete-modal-title">{title}</h3>

                <p>{message}</p>

                <div className="delete-modal-actions">
                    <button
                        type="button"
                        className="delete-modal-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="delete-modal-confirm"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ConfirmDeleteModal;

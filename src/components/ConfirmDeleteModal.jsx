function ConfirmDeleteModal({ onClose, onConfirm }) {
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
                    <i className="fa fa-trash"></i>
                </div>

                <h3 id="delete-modal-title">Delete user?</h3>

                <p>
                    Are you sure you want to delete this user?
                    <br />
                    This action cannot be undone.
                </p>

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
                        Yes, Delete
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ConfirmDeleteModal;
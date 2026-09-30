import { useEffect, useRef, useState } from "react";

function Actions({ onDelete, menuItems = [] }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="company-actions">

            <button
                className="admin-action-button"
                aria-label="Edit"
            >
                <i className="fa fa-pencil"></i>
            </button>

            <button
                className="admin-action-button"
                aria-label="Delete"
                onClick={onDelete}
            >
                <i className="fa fa-trash"></i>
            </button>

            <div
                className="company-more-actions"
                ref={menuRef}
            >

                <button
                    type="button"
                    className="admin-action-button"
                    aria-label="More actions"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="fa fa-ellipsis-v"></i>
                </button>

                {menuOpen && (
                    <div className="company-actions-popup">

                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="company-action-item"
                                onClick={() => {
                                    item.onClick?.();
                                    setMenuOpen(false);
                                }}
                            >
                                <i className={`fa ${item.icon}`}></i>

                                <span>
                                    {item.label}
                                </span>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Actions;
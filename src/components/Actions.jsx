
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Actions({ onDelete, menuItems = [], popupOnly = false }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [popupStyle, setPopupStyle] = useState(null);

    const menuRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useLayoutEffect(() => {
        if (!menuOpen || !menuRef.current || !popupRef.current) return;

        const updatePopupPosition = () => {
            if (!menuRef.current || !popupRef.current) return;

            const buttonRect = menuRef.current.getBoundingClientRect();
            const popup = popupRef.current;

            // Find the table's scrollable wrapper
            let parent = menuRef.current.parentElement;
            let boundaryTop = 0;
            let boundaryBottom = window.innerHeight;

            while (parent && parent !== document.body) {
                const style = window.getComputedStyle(parent);

                if (
                    ["auto", "scroll", "hidden"].includes(style.overflowY) ||
                    ["auto", "scroll", "hidden"].includes(style.overflow)
                ) {
                    const rect = parent.getBoundingClientRect();

                    boundaryTop = Math.max(0, rect.top);
                    boundaryBottom = Math.min(window.innerHeight, rect.bottom);
                    break;
                }

                parent = parent.parentElement;
            }

            const popupHeight = popup.scrollHeight;
            const popupWidth = popup.offsetWidth;

            const spaceAbove = Math.max(
                0,
                buttonRect.top - boundaryTop - 5
            );

            const spaceBelow = Math.max(
                0,
                boundaryBottom - buttonRect.bottom - 5
            );

            // Choose the direction with enough space,
            // otherwise use the side with more available space.
            const openUpward =
                spaceBelow < Math.min(popupHeight, 250) &&
                spaceAbove > spaceBelow;

            const availableSpace = openUpward
                ? spaceAbove
                : spaceBelow;

            const maxHeight = Math.max(
                40,
                Math.min(popupHeight, 250, availableSpace)
            );

            const left = Math.max(
                5,
                Math.min(
                    buttonRect.right - popupWidth,
                    window.innerWidth - popupWidth - 5
                )
            );

            const top = openUpward
                ? buttonRect.top - maxHeight - 5
                : buttonRect.bottom + 5;

            setPopupStyle({
                position: "fixed",
                top: `${top}px`,
                left: `${left}px`,
                maxHeight: `${maxHeight}px`,
                visibility: "visible",
                zIndex: 99999,
            });
        };

        updatePopupPosition();

        window.addEventListener("resize", updatePopupPosition);
        document.addEventListener("scroll", updatePopupPosition, true);

        return () => {
            window.removeEventListener("resize", updatePopupPosition);
            document.removeEventListener("scroll", updatePopupPosition, true);
        };
    }, [menuOpen, menuItems.length]);

    return (
        <div className="company-actions">

            {!popupOnly && (
                <>
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
                </>
            )}

            <div className="company-more-actions" ref={menuRef}>

                <button
                    type="button"
                    className="admin-action-button"
                    aria-label="More actions"
                    onClick={() => {
                        setPopupStyle(null);
                        setMenuOpen(!menuOpen);
                    }}
                >
                    <i className="fa fa-ellipsis-v"></i>
                </button>

                {menuOpen && createPortal(
                    <div
                        ref={popupRef}
                        className="company-actions-popup"
                        style={{
                            ...popupStyle,
                            visibility: popupStyle ? "visible" : "hidden",
                        }}
                    >
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

                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>,
                    document.body
                )}

            </div>
        </div>
    );
}

export default Actions;

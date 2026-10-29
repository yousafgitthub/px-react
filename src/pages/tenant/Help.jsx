
import { useState } from "react";
import toastr from "toastr";
import UserFormModal from "../../components/UserFormModal";

function Help() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fields = [
        {name: "from_email", label: "Email", type: "email", placeholder: "name@company.com", required: true },
        {name: "help_type", label: "Type", type: "select", required: true, options: ["General", "Job", "Settings"], placeholder: "Select" },
        {name: "question", label: "Description", type: "textarea", placeholder: "Describe the issue or assistance you need...", required: true, fullWidth: true},
        {name: "attachment", label: "Attachment", type: "file", required: false, accept: "image/*,video/*,application/pdf", hint: "Upload screenshots, videos, or PDF documents.", fullWidth: true},
    ];

    const handleClose = () => {
        window.history.back();
    };

    const handleSubmit = (formData) => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        // Connect your Help API here.
        console.log("Help request:", formData);

        toastr.success("Help request submitted successfully.");

        setIsSubmitting(false);
        handleClose();
    };

    return (
        <UserFormModal
            title="Submit a Help Request"
            fields={fields}
            onClose={handleClose}
            onSubmit={handleSubmit}
            showImage={false}
            initialData={{
                email: "",
                type: "General",
                description: "",
                attachment: null,
            }}
        />
    );
}

export default Help;

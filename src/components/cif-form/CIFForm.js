import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicField from "./DynamicField";
import { CIF_SCHEMA } from "./cifSchema";

const CIFForm = () => {

    const navigate = useNavigate();

    const schema = CIF_SCHEMA({ canWrite: true });

    const sections = Object.keys(schema);

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});


    /* ================= VALIDATION ================= */

    const validateField = (
        section,
        name,
        value,
        field
    ) => {

        if (field.required && !value)
            return `${field.label} is required`;

        if (field.validate) {

            const sectionData =
                formData?.[section] || {};

            const error =
                field.validate(value, sectionData);

            if (error)
                return error;
        }

        return "";

    };


    /* ================= HANDLE CHANGE ================= */

    const handleChange = (
        section,
        name,
        value,
        field
    ) => {

        const updatedSection = {
            ...formData?.[section],
            [name]: value
        };

        const updatedForm = {
            ...formData,
            [section]: updatedSection
        };

        setFormData(updatedForm);

        const error =
            validateField(
                section,
                name,
                value,
                field
            );

        setErrors(prev => ({
            ...prev,
            [section]: {
                ...prev?.[section],
                [name]: error
            }
        }));

    };


    /* ================= SUBMIT ================= */

    const handleSubmit = () => {

        let hasError = false;

        const allErrors = {};

        sections.forEach(sectionKey => {

            const section = schema[sectionKey];

            const sectionErrors = {};

            Object.entries(section)
                .filter(([key]) => key !== "title")
                .forEach(([name, field]) => {

                    const value =
                        formData?.[sectionKey]?.[name];

                    const error =
                        validateField(
                            sectionKey,
                            name,
                            value,
                            field
                        );

                    if (error)
                        hasError = true;

                    sectionErrors[name] = error;

                });

            allErrors[sectionKey] =
                sectionErrors;

        });

        setErrors(allErrors);

        if (!hasError) {

            console.log(
                "Complete CIF Data:",
                formData
            );

            navigate(
                "/identification",
                {
                    state: formData
                }
            );

        }

    };


    /* ================= UI ================= */

    return (

         <div className="bg-secondary px-8 pt-8">
            {/* <div className="min-h-[85vh] bg-background rounded-lg shadow-lg p-8 space-y-6"> */}
            <div className="h-[85vh] bg-background rounded-lg shadow-lg p-8 flex flex-col gap-6">

            {/* <div className="bg-background rounded-lg shadow-lg p-8 flex flex-col gap-8 "> */}
            <div className="overflow-y-auto pr-2 pl-1 custom-scrollbar scroll-smooth">

                {

                    sections.map(sectionKey => {

                        const section =
                            schema[sectionKey];

                        return (

                            <div key={sectionKey} className="pt-5">

                                {/* Section Title */}

                                <h2 className="text-2xl text-primary font-semibold mb-6 border-b border-primary-light pb-2">

                                    {section.title}

                                </h2>


                                {/* Fields */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {

                                        Object.entries(section)
                                            .filter(([key]) => key !== "title")
                                            .map(([name, field]) => (

                                                <DynamicField
                                                    key={name}
                                                    section={sectionKey}
                                                    name={name}
                                                    field={field}
                                                    value={
                                                        formData?.[sectionKey]?.[name]
                                                    }
                                                    error={
                                                        errors?.[sectionKey]?.[name]
                                                    }
                                                    onChange={handleChange}
                                                />

                                            ))

                                    }

                                </div>

                            </div>

                        );

                    })

                }


                {/* Submit Button */}

                <div className="flex justify-end mt-6">

                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Submit
                    </button>

                </div>
                </div>
            </div>

        </div>

    );

};

export default CIFForm;

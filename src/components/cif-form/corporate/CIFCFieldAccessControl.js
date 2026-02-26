import { useEffect, useState } from "react";
import { CIFC_SCHEMA } from "./cifcSchema";

import { saveCIFCPermissions, fetchCIFCPermissions } from "../../../api/api.auth";

const buildFieldPermissions = (schema) => {

    const permissions = [];

    Object.entries(schema).forEach(([sectionKey, section]) => {

        const sectionObj = {
            section: sectionKey,
            title: section.title || sectionKey,
            subsections: []
        };

        Object.entries(section)
            .filter(([key]) => key !== "title")
            .forEach(([subKey, subSection]) => {

                if (!subSection || typeof subSection !== "object") return;

                const subObj = {
                    subsection: subKey,
                    title: subSection.title || subKey,
                    fields: []
                };

                Object.entries(subSection)
                    .filter(([key]) => key !== "title")
                    .forEach(([fieldKey, field]) => {

                        if (!field || typeof field !== "object") return;

                        subObj.fields.push({
                            fieldName: fieldKey,
                            label: field.label || fieldKey,
                            hide: field.hide ?? false
                        });

                    });

                sectionObj.subsections.push(subObj);

            });

        permissions.push(sectionObj);

    });

    return permissions;
};


const CIFCFieldAccessControl = ({ canWrite = true }) => {

    const [permissions, setPermissions] = useState([]);

    const [openSections, setOpenSections] = useState({ 0: true });
    const [openSubsections, setOpenSubsections] = useState({});

    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const fetchedPermissions = await fetchCIFCPermissions();

                console.log("Fetched Permissions:", fetchedPermissions);

                // Generate schema dynamically using fetched permissions
                const updatedSchema = CIFC_SCHEMA({ permissions: fetchedPermissions?.data  });

                // Build permissions array from schema
                const builtPermissions = buildFieldPermissions(updatedSchema);

                setPermissions(builtPermissions);
            } catch (err) {
                console.error("Error loading CIFR permissions:", err);
            }
        };

        loadPermissions();
    }, []);

    /* ---------- Toggle Section ---------- */

    const toggleSection = (sectionIndex) => {

        setOpenSections(prev => ({
            ...prev,
            [sectionIndex]: !prev[sectionIndex]
        }));

    };
    const toggleSubsection = (sectionIndex, subIndex) => {

        const key = `${sectionIndex}-${subIndex}`;

        setOpenSubsections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));

    };
    /* ---------- Toggle Field ---------- */

    const toggleField = (sectionIndex, subIndex, fieldIndex) => {

        const updated = [...permissions];

        updated[sectionIndex]
            .subsections[subIndex]
            .fields[fieldIndex]
            .hide =
            !updated[sectionIndex]
                .subsections[subIndex]
                .fields[fieldIndex]
                .hide;

        setPermissions(updated);
    };

    /* ---------- Save ---------- */

    const handleSave = async () => {

        const payload = [];

        permissions.forEach(section => {

            section.subsections.forEach(sub => {

                sub.fields.forEach(field => {

                    payload.push({
                        section: sub.subsection,
                        field: field.fieldName,
                        hide: field.hide
                    });

                });

            });

        });

        console.log("SAVE THIS TO API:", payload);

        const res = await saveCIFCPermissions(payload);

        console.log("Save Response:", res);
        alert("Permissions saved successfully");
    };

    return (

        <div className="bg-secondary px-8 pt-8">

            <div className="h-[85vh] bg-background rounded-lg shadow-lg p-8 flex flex-col gap-6">

                {/* Header */}
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                        CIF Field Access Control
                    </h2>

                    <p className="text-sm text-muted mt-1">
                        Manage visibility of CIF form fields
                    </p>
                </div>

                {/* Table */}
                <div className="custom-scrollbar overflow-y-auto rounded-xl border border-border">

                    <table className="w-full text-sm">

                        <thead className="bg-input sticky top-0 z-10">

                            <tr>
                                <th className="w-[80%] px-6 py-3 text-left font-semibold text-primary-dark ">
                                    Field
                                </th>

                                <th className="w-[20%] px-6 py-3 text-center font-semibold text-primary-dark">
                                    Visible
                                </th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-border">



                            {permissions.map((section, sIndex) => (

                                <>

                                    {/* SECTION */}
                                    <tr
                                        key={section.section}
                                        className="bg-gray-300 cursor-pointer"
                                        onClick={() => toggleSection(sIndex)}
                                    >
                                        <td className="px-6 py-3 font-semibold">
                                            <div className="flex justify-between items-center">
                                                {section.title}

                                            </div>
                                        </td>
                                        <td className="text-center">
                                            {/* empty cell to maintain column alignment */}

                                            <span>
                                                {openSections[sIndex] ? "▲" : "▼"}
                                            </span>
                                        </td>
                                    </tr>


                                    {/* SUBSECTIONS */}
                                    {openSections[sIndex] && section.subsections.map((sub, subIndex) => {

                                        const subKey = `${sIndex}-${subIndex}`;

                                        return (

                                            <>

                                                {/* SUBSECTION HEADER */}
                                                <tr
                                                    key={sub.subsection}
                                                    className="bg-gray-200 cursor-pointer"
                                                    onClick={() => toggleSubsection(sIndex, subIndex)}
                                                >
                                                    <td colSpan="2" className="px-6 py-3 pl-10 flex justify-between">

                                                        {sub.title}


                                                    </td>

                                                    <td className="text-center">
                                                        <span>
                                                            {openSubsections[subKey] ? "▲" : "▼"}
                                                        </span>
                                                        {/* empty cell to maintain column alignment */}
                                                    </td>
                                                </tr>


                                                {/* FIELDS */}
                                                {openSubsections[subKey] && sub.fields.map((field, fIndex) => (

                                                    <tr key={field.fieldName}>

                                                        <td className="px-6 py-3 pl-16">
                                                            └ {field.label}
                                                        </td>

                                                        <td className="text-center">

                                                            <input
                                                                type="checkbox"
                                                                checked={!field.hide}
                                                                onChange={() =>
                                                                    toggleField(sIndex, subIndex, fIndex)
                                                                }
                                                            />

                                                        </td>

                                                    </tr>

                                                ))}

                                            </>

                                        );

                                    })}

                                </>

                            ))}


                        </tbody>

                    </table>

                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-4">

                    <button
                        onClick={handleSave}
                        disabled={!canWrite}
                        className={`px-8 py-2.5 rounded-lg text-sm font-medium transition shadow
              ${canWrite
                                ? "bg-primary text-inverse hover:bg-primary-dark"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Save Permissions
                    </button>

                </div>

            </div>

        </div>

    );

};

export default CIFCFieldAccessControl;

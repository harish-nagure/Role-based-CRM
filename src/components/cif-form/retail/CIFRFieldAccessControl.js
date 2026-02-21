import { useEffect, useState } from "react";
import { CIFR_SCHEMA } from "./cifrSchema";

import { saveCIFRPermissions, fetchCIFRPermissions } from "../../../api/api.auth";

const buildFieldPermissions = (schema) => {

    const permissions = [];

    Object.entries(schema).forEach(([sectionKey, section]) => {

        const sectionObj = {
            section: sectionKey,
            title: section.title || sectionKey,
            fields: []
        };

        Object.entries(section)
            .filter(([key]) => key !== "title")
            .forEach(([fieldKey, field]) => {

                sectionObj.fields.push({
                    fieldName: fieldKey,
                    label: field.label,
                    hide: field.hide ?? false
                });

            });

        permissions.push(sectionObj);

    });

    return permissions;
};

const CIFRFieldAccessControl = ({ canWrite = true }) => {

    const [permissions, setPermissions] = useState([]);

    const [openSections, setOpenSections] = useState({ 0: true });


    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const fetchedPermissions = await fetchCIFRPermissions();

                console.log("Fetched Permissions:", fetchedPermissions);

                // Generate schema dynamically using fetched permissions
                const updatedSchema = CIFR_SCHEMA({ permissions: fetchedPermissions?.data });

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

    /* ---------- Toggle Field ---------- */

    const toggleField = (sectionIndex, fieldIndex) => {

        const updated = [...permissions];

        updated[sectionIndex].fields[fieldIndex].hide =
            !updated[sectionIndex].fields[fieldIndex].hide;

        setPermissions(updated);

    };

    /* ---------- Save ---------- */

    const handleSave = async () => {

        // const payload = {};

        // permissions.forEach(section => {

        //   payload[section.section] = {};

        //   section.fields.forEach(field => {

        // //  CIFR_SCHEMA[section.section][field.fieldName].hide = field.hide;
        //     payload[section.section][field.fieldName] = {
        //       label: field.label,
        //       hide: field.hide
        //     };

        //   });

        // });

        const payload = [];

        permissions.forEach(section => {
            section.fields.forEach(field => {
                payload.push({
                    section: section.section,
                    field: field.fieldName,
                    hide: field.hide
                });
            });
        });

        console.log(payload);
        // localStorage.setItem("CIF_PERMISSIONS", JSON.stringify(payload));

        console.log("SAVE THIS TO API:", payload);

        try {
            const res = await saveCIFRPermissions(payload);

            console.log("API Response:", res);
            alert(res?.data?.message || "Permissions saved! Check console for payload.");
        } catch (err) {
            console.error("Error saving permissions:", err);
            const message =
                err.response?.data?.message ||
                "Something went wrong";
            alert(message);
        }

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

                                    {/* Section Header */}
                                    <tr
                                        key={section.section}
                                        className="bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                                        onClick={() => toggleSection(sIndex)}
                                    >

                                        <td
                                            colSpan="2"
                                            className="px-6 py-4 font-medium text-foreground"
                                        >

                                            <div className="flex justify-between">

                                                {section.title}

                                                <span className="text-muted">
                                                    {openSections[sIndex] ? "▲" : "▼"}
                                                </span>

                                            </div>

                                        </td>

                                    </tr>

                                    {/* Fields */}
                                    {openSections[sIndex] &&
                                        section.fields.map((field, fIndex) => (

                                            <tr
                                                key={field.fieldName}
                                                className="hover:bg-input transition"
                                            >

                                                <td className="px-6 py-3 pl-12 text-muted">
                                                    └ {field.label}
                                                </td>

                                                <td className="px-6 py-3 text-center">

                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 accent-primary cursor-pointer"
                                                        checked={!field.hide}
                                                        disabled={!canWrite}
                                                        onChange={() =>
                                                            toggleField(sIndex, fIndex)
                                                        }
                                                    />

                                                </td>

                                            </tr>

                                        ))}

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

export default CIFRFieldAccessControl;

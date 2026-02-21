import React, { useState, useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import DynamicField from "../DynamicField";
import { CIFC_SCHEMA } from "./cifcSchema";
import SelectType from "../SelectType";
import { fetchCIFRPermissions } from "../../../api/api.auth";

const CIFCForm = () => {

    const sectionRefs = useRef({});


    const navigate = useNavigate();

    // const schema = CIFR_SCHEMA({ canWrite: true });
    const [schema, setSchema] = useState({});

    // console.log("Generated Schema:", schema);

    const sections = Object.keys(schema);

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const [showForm, setShowForm] = useState(true);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [selectTypeData, setSelectTypeData] = useState({
        functionType: "",
        cifNumber: ""
    });

    console.log("Form Data:", selectTypeData, formData, errors);
    // const location = useLocation();

    // const mode = location.pathname.split("/").pop();

    // console.log("mode:", mode);

    // useEffect(() => {
    //     setShowForm(false);
    //     handleReset();
    // }, [mode]);

    //
    const [permissions, setPermissions] = useState([]);


    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const perms = await fetchCIFRPermissions();
                setPermissions(perms.data); // save permissions
                setSchema(CIFC_SCHEMA({ canWrite: true, permissions: perms.data }));

            } catch (err) {
                console.error("Error loading permissions:", err);

                setSchema(CIFC_SCHEMA({ canWrite: true, permissions: [] }));
            }
        };
        loadPermissions();
    }, [])
    /* ================= SELECT TYPE HANDLER ================= */

    const handleSelectType = async (data) => {

        setSelectTypeData(data);

        setFormData(prev => ({
            ...prev,
            meta: {
                functionType: data.functionType,
                cifNumber: data.cifNumber,
                functionTypeName: data.functionTypeName
            }
        }));

        if (data.functionType === "") {
            setFormData({});
            setShowForm(false);
            return;
        }

        // ADD MODE
        if (data.functionType.startsWith("A")) {
            setFormData({});
            setShowForm(true);
            return;
        }

        // OTHER MODES → NEED CIF
        if (data.cifNumber) {
            try {
                setLoading(true);

                // Example API call
                // const res = await fetch(`/api/cif/${data.cifNumber}`);
                // const apiData = await res.json();

                const apiData = {};

                setFormData(prev => ({
                    ...prev,
                    ...apiData,
                    meta: {
                        functionType: data.functionType,
                        cifNumber: data.cifNumber,
                        functionTypeName: data.functionTypeName
                    }
                }));
                setShowForm(true);

            } catch (err) {
                alert("Invalid CIF or not found");
                setShowForm(false);
            } finally {
                setLoading(false);
            }
        }
    };


    const validateField = (
        section,
        name,
        value,
        field
    ) => {
        const sectionData = formData?.[section] || {};

        const isRequired =
            typeof field.required === "function"
                ? field.required(sectionData)
                : field.required;

        if (isRequired && !value) {
            return `${field.label} is required`;
        }
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


        //Address Sync
        if (section === "presentAddress" && name === "sameAsPermanent") {

            if (value === "yes") {

                const permanent = formData?.permanentAddress || {};

                updatedForm.presentAddress = {
                    ...updatedForm.presentAddress,
                    sameAsPermanent: "yes",
                    addressLine1: permanent.addressLine1 || "",
                    addressLine2: permanent.addressLine2 || "",
                    houseNo: permanent.houseNo || "",
                    city: permanent.city || "",
                    stateProvinceRegion:
                        permanent.stateProvinceRegion || "",
                    countryOfResidence:
                        permanent.countryOfResidence || "",
                    postalCode: permanent.postalCode || ""
                };
            }
            else {
                updatedForm.presentAddress = {
                    sameAsPermanent: "no"
                };

            }

        }

        if (section === "permanentAddress" && formData?.presentAddress?.sameAsPermanent === "yes") {

            const permanent = {
                ...formData.permanentAddress,
                [name]: value
            };

            updatedForm.presentAddress = {
                sameAsPermanent: "yes",

                addressLine1: permanent.addressLine1 || "",
                addressLine2: permanent.addressLine2 || "",
                houseNo: permanent.houseNo || "",
                city: permanent.city || "",
                stateProvinceRegion:
                    permanent.stateProvinceRegion || "",
                countryOfResidence:
                    permanent.countryOfResidence || "",
                postalCode: permanent.postalCode || ""
            };

        }

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
    const scrollToSection = (sectionKey) => {
        console.log("Scrolling to section:", sectionKey);
        sectionRefs.current[sectionKey]?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
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

    const handleReset = () => {
        setFormData({});
        setErrors({});
    };

    /* ================= UI ================= */

    return (
        <>


            <div className="flex items-center justify-between gap-6 px-8">
                {showForm && (
                    <>
                        <div className="bg-background rounded-lg shadow-md p-4 w-full flex items-center justify-between px-10">

                            <div className="flex gap-4 items-center">
                                {/* <div> */}
                                <h1 className="text-xl font-semibold text-primary">
                                    CRM-CIF Retail Customer
                                </h1>

                                <p className="text-primary font-semibold">
                                    Function Type: <span className="font-medium">{selectTypeData.functionType} - {selectTypeData.functionTypeName}</span>
                                </p>

                                {selectTypeData.cifNumber && (
                                    <p className="text-primary font-semibold">
                                        CIF Number: <span className="font-medium">{selectTypeData.cifNumber}</span>
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setFormData({});
                                    setErrors({});
                                    setSelectTypeData({ functionType: "", cifNumber: "", functionTypeName: "" });
                                }}
                                className="px-4 py-2 bg-muted text-white rounded hover:bg-gray-600 transition"
                            >
                                Go back
                            </button>

                        </div>
                    </>
                )}

            </div>


            <div className={`bg-secondary px-8 ${showForm ? "pt-2" : "pt-8"}`}>
                {/* <div className="bg-secondary px-8 pt-8"> */}
                {/* <div className="min-h-[85vh] bg-background rounded-lg shadow-lg p-8 space-y-6"> */}
                <div className="h-[85vh] bg-background rounded-lg shadow-lg p-8 flex flex-col">

                    {!showForm && (
                        <SelectType onSubmit={handleSelectType} />
                    )}
                    {loading && (
                        <div className="text-primary font-medium">
                            Loading CIF data...
                        </div>
                    )}


                    {/* placed here */}


                    {showForm && (
                        <>
                            {/* <div className="bg-background rounded-lg shadow-lg p-8 flex flex-col gap-8 "> */}
                            <div className="overflow-y-auto pr-2 pl-1 custom-scrollbar scroll-smooth">
                                {/* HEADER BAR */}
                                {showForm && (

                                    <div>

                                        {/* CLICKABLE SECTION NAV */}
                                        <div className="flex justify-between gap-0.5 w-full">

                                            {sections.map(sectionKey => (

                                                <button
                                                    key={sectionKey}
                                                    onClick={() => scrollToSection(sectionKey)}
                                                    className="px-4 py-2 bg-primary-light w-full text-white rounded hover:bg-primary transition"
                                                >
                                                    {schema[sectionKey].title}
                                                </button>

                                            ))}

                                        </div>

                                    </div>

                                )}


                                {



                                    sections.map(sectionKey => {

                                        const section = schema[sectionKey];

                                        return (

                                            <div key={sectionKey}

                                                ref={(el) => sectionRefs.current[sectionKey] = el}
                                                className="pt-5">

                                                {/* Header Nav Title */}


                                                <h2 className="text-xl font-semibold mb-4">
                                                    {/* <h2 className="text-2xl text-primary font-semibold mb-6 border-b border-primary-light pb-2"> */}

                                                    {section.title}

                                                </h2>


                                                {/* Fields */}

                                                {Object.entries(section)
                                                    .filter(([key]) => key !== "title")
                                                    .map(([innerKey, innerSection]) => (

                                                        <div key={innerKey} className="mb-8">

                                                            {/* <h2 className="text-xl font-semibold mb-4"> */}

                                                            <h2 className="text-2xl text-primary font-semibold mb-6 border-b border-primary-light pb-2">
                                                                {innerSection.title}
                                                            </h2>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                                                {

                                                                    Object.entries(innerSection)
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
                                                                                formData={formData}

                                                                            />

                                                                        ))

                                                                }

                                                            </div>
                                                        </div>

                                                    ))}
                                            </div>

                                        );

                                    })

                                }


                                {/* Submit Button */}

                                <div className="flex justify-start mt-6">

                                    <button
                                        onClick={handleSubmit}
                                        className="px-6 py-2 bg-primary-light text-white rounded hover:bg-primary transition"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-2 bg-muted text-white rounded hover:bg-gray-600 ml-4"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </>

    );

};

export default CIFCForm;



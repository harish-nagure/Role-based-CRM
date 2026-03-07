import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicField from "../DynamicField";
import { CIFC_SCHEMA } from "./cifcSchema";
import SelectType from "../SelectType";
import { fetchCIFRPermissions, fetchSearcherValueCorporate } from "../../../api/api.auth";
import { List } from "lucide-react";

const CIFCForm = () => {

    const sectionRefs = useRef({});
    const navigate = useNavigate();
    const location = useLocation();

    /* ================= STATE ================= */

    const [schema, setSchema] = useState({});
    const sections = Object.keys(schema);

    const [searchResults, setSearchResults] = useState({});
    const [formData, setFormData] = useState({
        BenficiaryDetails: {
            OwnerShipDetails: []
        },
        DirectorsDetails: {
            ListOfDirectorsDetails: []
        }
    });

    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectTypeData, setSelectTypeData] = useState({
        functionType: "",
        cifNumber: "",
        customerType: ""
    });

    const [permissions, setPermissions] = useState([]);
    const [step, setStep] = useState(0);

    /* ✅ FIXED VARIABLES */
    const currentSectionKey = sections[step];
    const currentSection = schema[currentSectionKey];

    const mode = location.pathname.split("/").pop();

    /* ================= LOAD PERMISSIONS ================= */

    useEffect(() => {

        const loadPermissions = async () => {

            try {

                const perms = await fetchCIFRPermissions();

                setPermissions(perms.data);

                setSchema(
                    CIFC_SCHEMA({
                        canWrite: true,
                        permissions: []
                    })
                );

            } catch (err) {

                console.error(err);

                setSchema(
                    CIFC_SCHEMA({
                        canWrite: true,
                        permissions: []
                    })
                );
            }
        };

        loadPermissions();

    }, []);

    /* ================= LOAD SESSION ================= */

    useEffect(() => {
        const savedBeneficiary = sessionStorage.getItem("BenficiaryDetails");
        const savedDirectors =
            JSON.parse(sessionStorage.getItem("DirectorsDetails"));

        if (savedBeneficiary) {
            const parsed = JSON.parse(savedBeneficiary);
            setFormData(prev => ({
                ...prev,
                BenficiaryDetails: {
                    ...prev.BenficiaryDetails,
                    OwnerShipDetails: parsed?.OwnerShipDetails || []
                }
            }));

            if (parsed?.OwnerShipDetails?.length > 0) {
                setShowForm(true);
            }

        }

        if (savedDirectors) {
            setFormData(prev => ({
                ...prev,
                DirectorsDetails: {
                    ...prev.DirectorsDetails,
                    ListOfDirectorsDetails: savedDirectors?.ListOfDirectorsDetails || []
                }
            }));
        }
        console.log("Form Data:", formData);
    }, []);


    /* ================= RESET ON MODE CHANGE ================= */

    useEffect(() => {

        setShowForm(false);
        // handleReset();

    }, [mode]);

    /* ================= SELECT TYPE ================= */

    const handleSelectType = (data) => {

        setSelectTypeData(data);

        if (!data.functionType) {

            setShowForm(false);
            return;
        }

        setShowForm(true);

        setFormData(prev => ({
            ...prev,
            meta: data
        }));
    };


    /* ================= VALIDATION ================= */

    const validateField = (section, name, value, field) => {

        const sectionData = formData?.[section] || {};

        const required =
            typeof field.required === "function"
                ? field.required(sectionData)
                : field.required;

        if (required && !value)
            return `${field.label} is required`;

        if (field.validate)
            return field.validate(value, sectionData);

        return "";
    };

    /* ================= HANDLE CHANGE ================= */

    const handleChange = (section, subSection, name, value, field) => {

        console.log("Changed:", {
            section,
            subSection,
            name,
            value,
            field
        });

        let updatedValue = value;

        /* checkbox fix */
        if (field.type === "checkbox") {

            const currentValues =
                formData?.[section]?.[subSection]?.[name] || [];

            updatedValue = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
        }


        /* base update */
        let updatedForm = {

            ...formData,

            [section]: {

                ...formData?.[section],

                [subSection]: {

                    ...formData?.[section]?.[subSection],

                    [name]: updatedValue
                }
            }
        };


        /* ================= PRESENT ADDRESS COPY ================= */

        if (
            section === "GeneralDetails" &&
            subSection === "presentAddress" &&
            name === "sameAsPermanent"
        ) {

            if (updatedValue === "yes") {

                const permanent =
                    formData?.GeneralDetails?.permanentAddress || {};

                updatedForm.GeneralDetails.presentAddress = {

                    ...updatedForm.GeneralDetails.presentAddress,

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

                updatedForm.GeneralDetails.presentAddress = {

                    sameAsPermanent: "no",

                    addressLine1: "",
                    addressLine2: "",
                    houseNo: "",
                    city: "",
                    stateProvinceRegion: "",
                    countryOfResidence: "",
                    postalCode: ""
                };
            }
        }


        /* ================= PERMANENT ADDRESS AUTO SYNC ================= */

        if (
            section === "GeneralDetails" &&
            subSection === "permanentAddress" &&
            formData?.GeneralDetails?.presentAddress?.sameAsPermanent === "yes"
        ) {

            const permanent = {

                ...formData.GeneralDetails.permanentAddress,

                [name]: updatedValue
            };

            updatedForm.GeneralDetails.presentAddress = {

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


        /* save */
        setFormData(updatedForm);

        console.log("Updated Form:", formData);


        /* validation */
        const error =
            validateField(section, name, updatedValue, field);

        setErrors(prev => ({

            ...prev,

            [section]: {

                ...prev?.[section],

                [subSection]: {

                    ...prev?.[section]?.[subSection],

                    [name]: error
                }
            }
        }));

    };

    /* ================= NAVIGATION ================= */

    // const handleNext = () => {

    //     if (!currentSectionKey) return;
    //     console.log("fdg", currentSectionKey);

    //     if (currentSectionKey === "BenficiaryDetails") {

    //         if (formData?.BenficiaryDetails?.OwnerShipDetails?.length === 0) {
    //             alert("Please add at least one owner");
    //             return;
    //         }
    //         setStep(prev => prev + 1);
    //         return;
    //     }
    //     let hasError = false;
    //     const sectionErrors = {};

    //     Object.entries(currentSection)
    //         .filter(([key]) => key !== "title")
    //         .forEach(([innerKey, innerSection]) => {

    //             Object.entries(innerSection)
    //                 .filter(([key]) => key !== "title")
    //                 .forEach(([name, field]) => {

    //                     const value =
    //                         formData?.[currentSectionKey]?.[name];

    //                     const error =
    //                         validateField(
    //                             currentSectionKey,
    //                             name,
    //                             value,
    //                             field
    //                         );

    //                     if (error)
    //                         hasError = true;

    //                     sectionErrors[name] = error;
    //                 });
    //         });

    //     setErrors(prev => ({
    //         ...prev,
    //         [currentSectionKey]: sectionErrors
    //     }));

    //     if (!hasError)
    //         setStep(prev => prev + 1);
    // };

    const handleNext = () => {

        let hasError = false;

        const allErrors = {};

        sections.forEach(sectionKey => {

            const section = schema[sectionKey];

            const sectionErrors = {};

            Object.entries(section)
                .filter(([key]) => key !== "title")
                .forEach(([subSectionKey, subSection]) => {

                    sectionErrors[subSectionKey] = {};

                    Object.entries(subSection)
                        .filter(([key]) => key !== "title")
                        .forEach(([name, field]) => {

                            const value =
                                formData?.[sectionKey]?.[subSectionKey]?.[name];

                            const error =
                                validateField(
                                    sectionKey,
                                    name,
                                    value,
                                    field
                                );

                            if (error) hasError = true;

                            sectionErrors[subSectionKey][name] = error;

                        });

                });

            allErrors[sectionKey] = sectionErrors;

        });

        setErrors(allErrors);

        if (!hasError) {

            console.log("Complete CIF Data:", formData);

            setStep(prev => prev + 1);

        }

    };
    const handlePrevious = () => {

        setStep(prev => prev - 1);
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
                .forEach(([subSectionKey, subSection]) => {

                    sectionErrors[subSectionKey] = {};

                    Object.entries(subSection)
                        .filter(([key]) => key !== "title")
                        .forEach(([name, field]) => {

                            const value =
                                formData?.[sectionKey]?.[subSectionKey]?.[name];

                            const error =
                                validateField(
                                    sectionKey,
                                    name,
                                    value,
                                    field
                                );

                            if (error) hasError = true;

                            sectionErrors[subSectionKey][name] = error;

                        });

                });

            allErrors[sectionKey] = sectionErrors;

        });

        setErrors(allErrors);

        if (!hasError) {

            console.log("Complete CIF Data:", formData);

            navigate("/identification", {
                state: formData
            });

        }

    };

    /* ================= RESET ================= */

    const handleReset = () => {

        setFormData({
            BenficiaryDetails: {
                OwnerShipDetails: []
            }
        });

        setErrors({});
        setStep(0);
    };
    const parseFinacleResponse = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        const customData = xmlDoc.getElementsByTagName("executeFinacleScript_CustomData")[0];
        const recCount = parseInt(
            customData.getElementsByTagName("recCount")[0]?.textContent || 0
        );

        const result = [];

        for (let i = 1; i <= recCount; i++) {
            const value = customData.getElementsByTagName(`value_${i}`)[0]?.textContent;
            const label = customData.getElementsByTagName(`localetext_${i}`)[0]?.textContent;
            const rating = customData.getElementsByTagName(`rating_${i}`)[0]?.textContent;
            const ratingType = customData.getElementsByTagName(`ratingtype_${i}`)[0]?.textContent;

            if (value && label) {
                result.push({
                    value,
                    label,
                    rating,
                    ratingType
                });
            }
        }

        return result;
    };

    const handleSearch = async ({ searchKey, searchText, section, subSection, name }) => {
        try {
            const xmlResponse = await fetchSearcherValueCorporate(searchKey);
            console.log("XML" + xmlResponse);
            const parsedData = parseFinacleResponse(xmlResponse);
            console.log("Data json" + parsedData[0])
            console.log("Parsed Data JSON:", JSON.stringify(parsedData, null, 2));

            //     const parsedData = [{
            //     "value": "ALAP",
            //     "label": "ALAPPUZHA",
            //     "rating": "ALAPPUZHA",
            //     "ratingType": "CITY"
            //   },
            //   {
            //     "value": "ALBA",
            //     "label": "ALBANY",
            //     "rating": "ALBANY",
            //     "ratingType": "CITY"
            //   },
            //   {
            //     "value": "ALBU",
            //     "label": "ALBUQUERQUE",
            //     "rating": "ALBUQUERQUE",
            //     "ratingType": "CITY"
            //   },
            //   {
            //     "value": "ALBU1",
            //     "label": "ALBURY WODONGA",
            //     "rating": "ALBURY WODONGA",
            //     "ratingType": "CITY"
            //   },
            //   {
            //     "value": "ALIC",
            //     "label": "ALICE SPRINGS",
            //     "rating": "ALICE SPRINGS",
            //     "ratingType": "CITY"
            //   }] 
            console.log("parsedData" + searchKey, searchText, section, name, subSection)

            const filtered = parsedData.filter(item =>
                item.label.toLowerCase().includes(searchText.toLowerCase())
            );

            console.log("Fileter" + filtered)
            setSearchResults(prev => ({
                ...prev,
                [`${section}.${subSection}.${name}`]: filtered
            }));

            console.log("Search Results:", searchResults);
        } catch (error) {
            console.error(error);
        }
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
                                    CRM-CIF {selectTypeData.customerType} Customer
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

                    {showForm && currentSectionKey && currentSection && (
                        <>


                            <div>

                                {/* CLICKABLE SECTION NAV */}
                                <div className="flex justify-between gap-0.5 w-full">

                                    {sections.map(sectionKey => (

                                        <button
                                            key={sectionKey}
                                            onClick={() => {
                                                const index = sections.indexOf(sectionKey);
                                                if (index !== -1) setStep(index);
                                            }}
                                            // className="px-4 py-2 bg-primary-light w-full text-white rounded hover:bg-primary transition active:bg-white active:text-primary active:font-semibold    "

                                            className={`px-4 py-2 w-full rounded transition-all duration-200
                                                    ${step === sections.indexOf(sectionKey)
                                                    ? "bg-primary text-white font-semibold shadow-lg"
                                                    : "bg-primary-light text-white hover:bg-primary"
                                                }`}
                                        >
                                            {schema[sectionKey].title}
                                        </button>

                                    ))}

                                </div>

                            </div>


                            <div className="overflow-y-auto pr-2 pl-1 custom-scrollbar scroll-smooth">


                                <div
                                    ref={el =>
                                        sectionRefs.current[currentSectionKey] = el
                                    }
                                    className="pt-6"
                                >

                                    {/* SECTION TITLE */}
                                    <h2 className="text-xl font-semibold mb-4">

                                        {currentSection.title}
                                    </h2>

                                    {/* INNER SECTIONS */}

                                    {Object.entries(currentSection)
                                        .filter(([key]) => key !== "title")
                                        .map(([innerKey, innerSection]) => (

                                            <div key={innerKey} className="mb-6">

                                                <h2 className="text-2xl text-primary font-semibold mb-6 border-b border-primary-light pb-2">
                                                    {innerSection.title}
                                                </h2>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                                    {Object.entries(innerSection)
                                                        .filter(([key]) => key !== "title")
                                                        .map(([name, field]) => (

                                                            <DynamicField
                                                                key={name}
                                                                section={currentSectionKey}      // main section
                                                                subSection={innerKey}
                                                                // section={innerKey}
                                                                name={name}
                                                                field={{
                                                                    ...field,
                                                                    onSearch: handleSearch
                                                                }}
                                                                value={
                                                                    formData?.[currentSectionKey]?.[innerKey]?.[name] || ""
                                                                }
                                                                error={
                                                                    errors?.[currentSectionKey]?.[innerKey]?.[name]
                                                                }
                                                                onChange={handleChange}
                                                                formData={formData}
                                                                setFormData={setFormData}
                                                                // onSearch={handleSearch}   
                                                                searchResults={searchResults}
                                                                setSearchResults={setSearchResults}
                                                            />

                                                        ))}

                                                </div>

                                                {/* BENEFICIARY LIST */}
                                                {currentSectionKey === "BenficiaryDetails" && (

                                                    <div className="mt-6 border rounded-lg p-4 bg-gray-50">

                                                        <h3 className="text-lg font-semibold mb-3">
                                                            Beneficial Owners List
                                                        </h3>

                                                        <table className="w-full border-collapse border border-gray-300">

                                                            <thead>
                                                                <tr className="bg-gray-200">
                                                                    <th className="border p-2">Name</th>
                                                                    <th className="border p-2">Designation</th>
                                                                    <th className="border p-2">ID No</th>
                                                                    <th className="border p-2">Country</th>
                                                                    <th className="border p-2">DOB</th>
                                                                    <th className="border p-2">Address</th>
                                                                    <th className="border p-2">Source</th>
                                                                    <th className="border p-2">Delete Flag</th>

                                                                    <th className="border p-2">Actions</th>

                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {formData?.BenficiaryDetails?.OwnerShipDetails?.length > 0 && (
                                                                    <>
                                                                        {formData.BenficiaryDetails.OwnerShipDetails.map((owner, index) => (

                                                                            <tr key={index} className="text-center">

                                                                                <td className="border p-2">{owner.name}</td>
                                                                                <td className="border p-2">{owner.desgination}</td>
                                                                                <td className="border p-2">{owner.idNo}</td>
                                                                                <td className="border p-2">{owner.idIssueCountry}</td>
                                                                                <td className="border p-2">{owner.dob}</td>
                                                                                <td className="border p-2">{owner.currentAddress}</td>
                                                                                <td className="border p-2">
                                                                                    {owner.sourceOfBO?.join(", ")}
                                                                                </td>
                                                                                <td className="border p-2">
                                                                                    {owner.delFlag ? "Yes" : "No"}
                                                                                </td>
                                                                                <td className="border p-2">
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            const updatedOwners = [...formData.BenficiaryDetails.OwnerShipDetails];
                                                                                            const owner = updatedOwners[index];
                                                                                            // Pre-fill this owner data into a form
                                                                                            setFormData(prev => ({
                                                                                                ...prev,
                                                                                                BenficiaryDetails: {
                                                                                                    ...prev.BenficiaryDetails,
                                                                                                    ...owner,
                                                                                                    editingOwnerIndex: index,

                                                                                                },
                                                                                            }));



                                                                                            // Optional: scroll to a form or open a modal

                                                                                            updatedOwners.splice(index, 1);
                                                                                            setFormData(prev => ({
                                                                                                ...prev,
                                                                                                BenficiaryDetails: {
                                                                                                    ...prev.BenficiaryDetails,
                                                                                                    OwnerShipDetails: updatedOwners
                                                                                                }
                                                                                            }));
                                                                                        }}
                                                                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            // Remove the owner at this index
                                                                                            const updatedOwners = [...formData.BenficiaryDetails.OwnerShipDetails];
                                                                                            updatedOwners.splice(index, 1);
                                                                                            setFormData(prev => ({
                                                                                                ...prev,
                                                                                                BenficiaryDetails: {
                                                                                                    ...prev.BenficiaryDetails,
                                                                                                    OwnerShipDetails: updatedOwners
                                                                                                }
                                                                                            }));

                                                                                            const updatedSessionData = {
                                                                                                ...JSON.parse(sessionStorage.getItem("BenficiaryDetails")),
                                                                                                OwnerShipDetails: updatedOwners
                                                                                            };
                                                                                            sessionStorage.setItem("BenficiaryDetails", JSON.stringify(updatedSessionData));

                                                                                        }}
                                                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                                                                    >
                                                                                        Delete
                                                                                    </button>


                                                                                </td>

                                                                            </tr>

                                                                        ))}
                                                                    </>
                                                                )}
                                                            </tbody>

                                                        </table>

                                                    </div>

                                                )}
                                                {/* Directors Details */}
                                                {currentSectionKey === "DirectorsDetails" && (

                                                    <div className="mt-6 border rounded-lg p-4 bg-gray-50">

                                                        <h3 className="text-lg font-semibold mb-3">
                                                            List Of Directors
                                                        </h3>

                                                        <table className="w-full border-collapse border border-gray-300">

                                                            <thead>
                                                                <tr className="bg-gray-200">
                                                                    <th className="border p-2">Name</th>
                                                                    <th className="border p-2">Designation</th>
                                                                    <th className="border p-2">ID No</th>
                                                                    <th className="border p-2">Address</th>
                                                                    <th className="border p-2">PEP Indicator</th>
                                                                    <th className="border p-2">Delete Flag</th>

                                                                    <th className="border p-2">Actions</th>

                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {formData?.DirectorsDetails?.ListOfDirectorsDetails?.length > 0 && (
                                                                    <>
                                                                        {formData.DirectorsDetails.ListOfDirectorsDetails.map((director, index) => (

                                                                            <tr key={index} className="text-center">

                                                                                <td className="border p-2">{director.name}</td>
                                                                                <td className="border p-2">{director.desgination}</td>
                                                                                <td className="border p-2">{director.idNo}</td>
                                                                                <td className="border p-2">{director.currentAddress}</td>
                                                                                <td className="border p-2">
                                                                                    {director.pepIndicator}
                                                                                </td>
                                                                                <td className="border p-2">
                                                                                    {director.delFlag ? "Yes" : "No"}
                                                                                </td>
                                                                                <td className="border p-2">
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            const updatedDirectors = [...formData.DirectorsDetails.ListOfDirectorsDetails];
                                                                                            const director = updatedDirectors[index];
                                                                                            // Pre-fill this owner data into a form
                                                                                            setFormData(prev => ({
                                                                                                ...prev,
                                                                                                DirectorsDetails: {
                                                                                                    ...prev.DirectorsDetails,
                                                                                                    ...director,
                                                                                                    editingDirectorIndex: index,

                                                                                                },
                                                                                            }));



                                                                                            // Optional: scroll to a form or open a modal

                                                                                            updatedDirectors.splice(index, 1);
                                                                                            setFormData(prev => ({
                                                                                                ...prev,
                                                                                                DirectorsDetails: {
                                                                                                    ...prev.DirectorsDetails,
                                                                                                    ListOfDirectorsDetails: updatedDirectors
                                                                                                }
                                                                                            }));
                                                                                        }}
                                                                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            // Remove the owner at this index
                                                                                            const updatedDirectors = [...formData.DirectorsDetails.ListOfDirectorsDetails];
                                                                                            updatedDirectors.splice(index, 1);
                                                                                            setFormData(prev => ({
                                                                                                ...prev,
                                                                                                DirectorsDetails: {
                                                                                                    ...prev.DirectorsDetails,
                                                                                                    ListOfDirectorsDetails: updatedDirectors
                                                                                                }
                                                                                            }));

                                                                                            const updatedSessionData = {
                                                                                                ...JSON.parse(sessionStorage.getItem("DirectorsDetails")),
                                                                                                ListOfDirectorsDetails: updatedDirectors
                                                                                            };
                                                                                            sessionStorage.setItem("DirectorsDetails", JSON.stringify(updatedSessionData));

                                                                                        }}
                                                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                                                                    >
                                                                                        Delete
                                                                                    </button>


                                                                                </td>

                                                                            </tr>

                                                                        ))}
                                                                    </>
                                                                )}
                                                            </tbody>

                                                        </table>

                                                    </div>

                                                )}


                                            </div>

                                        ))}


                                    {/* NAV BUTTONS */}

                                    <div className="flex justify-between items-center mt-8 border-t pt-6">

                                        {/* Previous */}
                                        <button
                                            onClick={handlePrevious}
                                            disabled={step === 0}
                                            className={`px-6 py-2 rounded transition-all duration-200 font-medium
                                            ${step === 0
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
                                                }`}
                                        >
                                            ← Previous
                                        </button>


                                        {/* Next / Submit */}
                                        {step < sections.length - 1 ? (

                                            <button
                                                onClick={handleNext}
                                                className="px-6 py-2 rounded bg-primary-light text-white font-medium
                                                hover:bg-primary transition-all duration-200 shadow-sm"
                                            >
                                                Next →
                                            </button>

                                        ) : (

                                            <button
                                                onClick={handleSubmit}
                                                className="px-6 py-2 rounded bg-primary text-white font-semibold
                                                hover:bg-primary-dark transition-all duration-200 shadow-sm"
                                            >
                                                ✓ Submit
                                            </button>

                                        )}

                                    </div>

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
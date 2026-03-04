import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicField from "../DynamicField";
import { CIFR_SCHEMA } from "./cifrSchema";
import SelectType from "../SelectType";
import { fetchCIFRPermissions,fetchSearcherValue } from "../../../api/api.auth";

const CIFRForm = () => {

    const navigate = useNavigate();

    // const schema = CIFR_SCHEMA({ canWrite: true });
    const [schema, setSchema] = useState({});
    const [searchResults, setSearchResults] = useState({});

    // console.log("Generated Schema:", schema);

    const sections = Object.keys(schema);

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [selectTypeData, setSelectTypeData] = useState({
        functionType: "",
        cifNumber: "",
        customerType: ""
    });

    const location = useLocation();

    const mode = location.pathname.split("/").pop();

    console.log("mode:", mode);

    useEffect(() => {
        setShowForm(false);
        handleReset();
    }, [mode]);


    console.log("Form Data:", selectTypeData, formData, errors);

    //eslint-disable-next-line
    const [permissions, setPermissions] = useState([]);

    //permissions loader
    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const perms = await fetchCIFRPermissions();
                setPermissions(perms.data); // save permissions
                setSchema(CIFR_SCHEMA({ canWrite: true, permissions: perms.data }));

            } catch (err) {
                console.error("Error loading permissions:", err);
            }
        };
        loadPermissions();
    }, [])



    /* ================= SELECT TYPE HANDLER ================= */
    //Forms display
    const handleSelectType = async (data) => {


        setSelectTypeData(data);

        setFormData(prev => ({
            ...prev,
            meta: {
                functionType: data.functionType,
                cifNumber: data.cifNumber,
                functionTypeName: data.functionTypeName,
                customerType: data.customerType
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
                        functionTypeName: data.functionTypeName,
                        customerType: data.customerType
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

    //Validation
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



    // const handleSearch = async ({ searchKey, searchText, section, name }) => {

    //     try {

    //         // const res = await api.post("/search", {
    //         //     key: searchKey,
    //         //     value: searchText
    //         // });

    //          const res = {
    //         data: [
    //             "Mumbai",
    //             "Pune",
    //             "Delhi",
    //             "Chennai",
    //             "Bangalore"
    //         ]
    //     };
    //         const filtered = res.data.filter(item =>
    //         item.toLowerCase().includes(searchText.toLowerCase())
    //     );

    //     console.log("Filtered result:", filtered,searchKey);

    //     // ✅ set dropdown results correctly
    //     setSearchResults(prev => ({
    //         ...prev,
    //         [`${section}.${name}`]: filtered
    //     }));

    //     } catch (error) {
    //         console.error(error);
    //     }

    // };

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
// const handleSearch = async ({ searchKey, searchText, section, name }) => {
// const data = [
//   {
//     searchValue: "place_of_issue",
//     data: [
//       "Mumbai",
//       "Pune",
//       "Delhi",
//       "Chennai",
//       "Bangalore",
//       "Delhi",
//       "Chennai",
//       "Bangalore"
//     ]
//   },
//   {
//     searchValue: "city",
//     data: [
//       "USA",
//       "London",
//       "India"
//     ]
//   },{
//     searchValue: "country",
//     data: [
//       "USA",
//       "London",
//       "India"
//     ]
//   }
// ];
//   try {

//     // find matching searchValue
//     const res = await fetchSearcherValue(searchKey);

//     console.log("Harish"+res);

//     const matched = data.find(item => item.searchValue === searchKey);

//     if (!matched) {
//       setSearchResults(prev => ({
//         ...prev,
//         [`${section}.${name}`]: []
//       }));
//       return;
//     }

//     // filter results
//     const filtered = matched.data.filter(item =>
//       item.toLowerCase().includes(searchText.toLowerCase())
//     );

//     console.log("Filtered result:", filtered, searchKey);

//     setSearchResults(prev => ({
//       ...prev,
//       [`${section}.${name}`]: filtered
//     }));

//   } catch (error) {
//     console.error(error);
//   }

// };
const handleSearch = async ({ searchKey, searchText, section, name }) => {
  try {
    const xmlResponse = await fetchSearcherValue(searchKey);
console.log("XML"+xmlResponse);
    const parsedData = parseFinacleResponse(xmlResponse);
    console.log("Data json"+parsedData[0])
    console.log("Parsed Data JSON:", JSON.stringify(parsedData, null, 2));
    const filtered = parsedData.filter(item =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );
    
    console.log("Fileter"+filtered)
    setSearchResults(prev => ({
      ...prev,
      [`${section}.${name}`]: filtered
    }));

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
                                                                    field={{
                                                                        ...field,
                                                                        onSearch: handleSearch
                                                                    }}
                                                                    value={
                                                                        formData?.[sectionKey]?.[name]
                                                                    }
                                                                    error={
                                                                        errors?.[sectionKey]?.[name]
                                                                    }
                                                                    onChange={handleChange}
                                                                    formData={formData}
                                                                    searchResults={searchResults}
                                                                    setSearchResults={setSearchResults}
                                                                />

                                                            ))

                                                    }

                                                </div>

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

export default CIFRForm;



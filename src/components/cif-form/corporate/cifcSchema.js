
export const CIFC_SCHEMA = ({ canWrite = false, permissions = [] }) => {

    const getHideValue = (section, field) => {
        const perm = permissions.find(
            (p) => p.section === section && p.field === field
        );

        console.log(`Checking hide for ${section} - ${field}:`, perm);
        return perm ? perm.hide : false; // default false if not found
    };


    return {
        GeneralDetails: {

            title: "General Details",

            IdentificationDetails: {

                title: "Identification Details",

                documentType: {
                    hide: getHideValue("IdentificationDetails", "documentType"),
                    label: "Document Type",
                    type: "select",
                    required: true,
                    placeholder: "Select Document",
                    options: [
                        { label: "Select Document", value: "" },
                        { label: "Passport", value: "passport" },
                        { label: "Aadhar", value: "aadhar" },
                        { label: "PAN", value: "pan" }
                    ],


                    validate: (value) => {
                        if (!value) return;
                        const validTypes = ["passport", "aadhar", "pan"];
                        if (!validTypes.includes(value))
                            return "Invalid Document Type";
                    }
                },

                documentNumber: {
                    hide: getHideValue("IdentificationDetails", "documentNumber"),
                    label: "Document Number",
                    type: "text",
                    required: true,
                    placeholder: "Enter Document Number",


                    validate: (value, form) => {
                        if (!value) return;
                        if (form.documentType === "passport" && value.length !== 9)
                            return "Passport number must be 9 characters";
                        if (form.documentType === "aadhar" && value.length !== 12)
                            return "Aadhar number must be 12 digits";
                        if (form.documentType === "pan" && value.length !== 10)
                            return "PAN number must be 10 characters";
                    }
                },

                placeOfIssue: {
                    hide: getHideValue("IdentificationDetails", "placeOfIssue"),
                    label: "Place Of Issue",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (!value) return;
                        if (value.length < 3)
                            return "Place of Issue must be at least 3 characters";
                    }
                },

                countryOfIssue: {
                    hide: getHideValue("IdentificationDetails", "countryOfIssue"),
                    label: "Country Of Issue",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (!value) return;
                        if (value.length < 3)
                            return "Country of Issue must be at least 3 characters";
                    }
                },

                issueDate: {
                    hide: getHideValue("IdentificationDetails", "issueDate"),
                    label: "Issue Date",
                    type: "date",
                    required: true,

                    validate: (value) => {
                        if (!value) return;
                        const today = new Date().toISOString().split("T")[0];

                        if (value > today)
                            return "Issue Date cannot be future date";
                    }
                },

                expiryDate: {
                    hide: getHideValue("IdentificationDetails", "expiryDate"),
                    label: "Expiry Date",
                    type: "date",
                    required: true,

                    validate: (value, form) => {

                        if (!value) return;

                        const today = new Date().toISOString().split("T")[0];

                        if (value < today)
                            return "Expiry Date cannot be past date";

                        if (form.issueDate && value <= form.issueDate)
                            return "Expiry must be greater than Issue Date";


                    }
                },

                issuingAuthority: {
                    hide: getHideValue("IdentificationDetails", "issuingAuthority"),
                    label: "Issuing Authority",
                    type: "text",
                    required: true
                },

                documentFile: {
                    hide: getHideValue("IdentificationDetails", "documentFile"),
                    label: "Upload Document",
                    type: "file",
                    required: true,
                    accept: ".pdf,.png,.jpg,.jpeg",
                    validate: (value) => {
                        if (!value) return;
                        const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
                        if (!allowedTypes.includes(value.type))
                            return "Only PDF, PNG, JPG files are allowed";
                        if (value.size > 5 * 1024 * 1024)
                            return "File size must be less than 5MB";
                    }
                }

            },

            generalInformation: {

                title: "General Information",

                firstName: {
                    hide: getHideValue("generalInformation", "firstName"),
                    label: "First Name",
                    type: "text",
                    required: true
                },

                middleName: {
                    hide: getHideValue("generalInformation", "middleName"),
                    label: "Middle Name",
                    type: "text"
                },

                lastName: {
                    hide: getHideValue("generalInformation", "lastName"),
                    label: "Last Name",
                    type: "text",
                    required: true
                },

                shortName: {
                    hide: getHideValue("generalInformation", "shortName"),
                    label: "Short Name",
                    type: "text"
                },




                gender: {
                    hide: getHideValue("generalInformation", "gender"),
                    label: "Gender",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select Gender", value: "" },
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" }
                    ]
                },

                dateOfBirth: {
                    hide: getHideValue("generalInformation", "dateOfBirth"),
                    label: "Date Of Birth",
                    type: "date",
                    required: true
                },

                birthCountry: {
                    hide: getHideValue("generalInformation", "birthCountry"),
                    label: "Birth Country",
                    type: "text",
                    required: true
                },

                minorIndicator: {
                    label: "Minor Indicator",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select", value: "" },
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },

                nonResidentIndicator: {
                    label: "Non Resident Indicator",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select", value: "" },
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },

                nonResidentDate: {
                    label: "Non Resident Date",
                    type: "date",
                    required: (form) => form.nonResidentIndicator === "yes" ? true : false,
                    validate: (value, form) => {
                        if (form.nonResidentIndicator === "yes" && !value)
                            return "Non Resident Date is required";

                        if (value) {
                            const today = new Date().toISOString().split("T")[0];
                            if (value > today)
                                return "Date cannot be future";
                        }
                    }
                },
                primarySolid: {
                    label: "Primary SOLID",
                    type: "text",
                    required: true
                },
            },

            primaryIntroducerDetails: {

                title: "Primary Introducer Details",

                cifType: {
                    label: "CIF Type",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select CIF Type", value: "" },
                        { label: "Individual", value: "individual" },
                        { label: "Corporate", value: "corporate" },
                        { label: "Retail", value: "retail" }
                    ]
                },

                bankRelationship: {
                    label: "Bank Relationship Type",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select Relationship", value: "" },
                        { label: "Customer", value: "customer" },
                        { label: "No", value: "no" }
                    ]
                },

                cifId: {
                    label: "CIF ID",
                    type: "text",
                    required: true
                },
                nameOnCIF: {
                    label: "Name on CIF",
                    type: "text",
                    required: true
                }
            },

            permanentAddress: {

                title: "Permanent Address",

                addressLine1: {
                    label: "Address Line 1",
                    type: "text",
                    required: true
                },

                addressLine2: {
                    label: "Address Line 2",
                    type: "text"
                },

                houseNo: {
                    label: "House No",
                    type: "text",
                    required: true
                },

                city: {
                    label: "City",
                    type: "text",
                    required: true
                },

                stateProvinceRegion: {
                    label: "State/Province/Region",
                    type: "text",
                    required: true
                },



                countryOfResidence: {
                    label: "Country of Residence",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select Country", value: "" },
                        { label: "India", value: "india" },
                        { label: "USA", value: "usa" }
                    ]
                },

                postalCode: {
                    label: "Postal Code",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 7)
                            return "Postal Code must be between 4 and 7 characters";
                    }
                }
            },

            presentAddress: {

                title: "Present Address",

                sameAsPermanent: {
                    label: "Same as Permanent Address",
                    type: "radio",
                    required: true,
                    options: [
                        { label: "Select", value: "" },
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },

                blank: {
                    label: "",
                    type: "blank"
                },

                addressLine1: {
                    label: "Address Line 1",
                    type: "text",
                    required: true
                },

                addressLine2: {
                    label: "Address Line 2",
                    type: "text",
                    required: true
                },

                houseNo: {
                    label: "House No",
                    type: "text",
                    require: true
                },

                city: {
                    label: "City",
                    type: "text",
                    required: true
                },

                stateProvinceRegion: {
                    label: "State/Province/Region",
                    type: "text",
                    required: true
                },

                countryOfResidence: {
                    label: "Country of Residence",
                    type: "select",
                    required: true,
                    options: [
                        { label: "Select Country", value: "" },
                        { label: "India", value: "india" },
                        { label: "USA", value: "usa" }
                    ]
                },

                postalCode: {
                    label: "Postal Code",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 7)
                            return "Postal Code must be between 4 and 7 characters";
                    }
                }

            },
        },

        BenficiaryDetails: {

            title: "Beneficiary Details",

            OwnerShipDetails: {
                title: "Benefical Owner",
                name: {
                    label: "Name",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "Name must be between 4 and 50 characters";
                    }
                },
                desgination: {
                    label: "Designation",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "Designation must be between 4 and 50 characters";
                    }
                },
                idNo: {
                    label: "ID Number",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "ID Number must be between 4 and 50 characters";
                    }
                },

                idIssueCountry: {
                    label: "ID Issue Country",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "ID Issue Country must be between 4 and 50 characters";
                    }
                },

                dob: {
                    label: "Date of Birth",
                    type: "date",
                    required: true,
                    validate: (value) => {
                        if (!value) return;

                        const today = new Date().toISOString().split("T")[0];

                        if (value > today)
                            return "Date of birth cannot be past date";

                        if (new Date().getFullYear() - new Date(value).getFullYear() < 18)
                            return "Minimum age should be 18 years";
                    }
                },

                currentAddress: {
                    label: "Current Address",
                    type: "text",
                    required: true,
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "Current Address must be between 4 and 50 characters";
                    }
                },

                sourceOfBO: {
                    label: "Source of BO",
                    type: "checkbox",
                    required: true,

                    options: [
                        { label: "Equity", value: "equity" },
                        { label: "Effective Control", value: "effective_control" },
                        { label: "Other", value: "other" }
                    ],

                    validate: (value) => {
                        if (!value || value.length === 0)
                            return "Please select at least one Source of BO";
                    }
                },

                delFlag: {
                    label: "Delete Flag",
                    type: "checkbox",

                    options: [
                        { label: "", value: true }
                    ],

                },

                // add: {
                //     label: "Add",
                //     type: "button",
                //     variant: "primary", // optional
                //     onClick: ({ formData, setFormData }) => {

                //         // get section safely
                //         const beneficiary = formData.BenficiaryDetails || {};

                //         // create new owner object
                //         const newOwner = {
                //             name: beneficiary.name || "",
                //             desgination: beneficiary.desgination || "",
                //             idNo: beneficiary.idNo || "",
                //             idIssueCountry: beneficiary.idIssueCountry || "",
                //             dob: beneficiary.dob || "",
                //             currentAddress: beneficiary.currentAddress || "",
                //             sourceOfBO: beneficiary.sourceOfBO || [],
                //             delFlag: beneficiary.delFlag || false
                //         };


                //         // ensure OwnerShipDetails is array
                //         const owners = Array.isArray(beneficiary.OwnerShipDetails)
                //             ? beneficiary.OwnerShipDetails
                //             : [];

                //         // update formData properly
                //         setFormData({
                //             ...formData,

                //             BenficiaryDetails: {

                //                 ...beneficiary,

                //                 OwnerShipDetails: [
                //                     ...owners,
                //                     newOwner
                //                 ],

                //                 // clear input fields after add
                //                 name: "",
                //                 desgination: "",
                //                 idNo: "",
                //                 idIssueCountry: "",
                //                 dob: "",
                //                 currentAddress: "",
                //                 sourceOfBO: [],
                //                 delFlag: []

                //             }

                //         });

                //     }
                // }

                add: {
                    label: "Add",
                    type: "button",
                    variant: "primary",
                    onClick: ({ formData, setFormData }) => {

                        // ✅ Safely get beneficiary section
                        const beneficiary = formData.BenficiaryDetails || {};
                        const owners = Array.isArray(beneficiary.OwnerShipDetails) ? beneficiary.OwnerShipDetails : [];

                        // Fields to validate
                        const fields = ["name", "desgination", "idNo", "idIssueCountry", "dob", "currentAddress", "sourceOfBO"];

                        // Validation rules (same as schema)
                        // for (let field of fields) {
                        //     const value = beneficiary[field];

                        //     // Required check
                        //     if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
                        //         alert(`${field} is required`);
                        //         return;
                        //     }

                        //     // Custom field validations
                        //     switch(field) {
                        //         case "name":
                        //         case "desgination":
                        //         case "idNo":
                        //         case "idIssueCountry":
                        //         case "currentAddress":
                        //             if (value.length < 4 || value.length > 50) {
                        //                 alert(`${field} must be between 4 and 50 characters`);
                        //                 return;
                        //             }
                        //             break;

                        //         case "dob":
                        //             if (!value) {
                        //                 alert("Date of Birth is required");
                        //                 return;
                        //             }
                        //             const today = new Date().toISOString().split("T")[0];
                        //             if (value > today) {
                        //                 alert("Date of birth cannot be a future date");
                        //                 return;
                        //             }
                        //             if (new Date().getFullYear() - new Date(value).getFullYear() < 18) {
                        //                 alert("Minimum age should be 18 years");
                        //                 return;
                        //             }
                        //             break;

                        //         case "sourceOfBO":
                        //             if (!Array.isArray(value) || value.length === 0) {
                        //                 alert("Please select at least one Source of BO");
                        //                 return;
                        //             }
                        //             break;

                        //         case "delFlag":
                        //             if (value === undefined || value === null) {
                        //                 alert("Delete Flag is required");
                        //                 return;
                        //             }
                        //             break;
                        //     }
                        // }

                        // ✅ If all validations pass, create new owner
                        const newOwner = {
                            name: beneficiary.name || "",
                            desgination: beneficiary.desgination || "",
                            idNo: beneficiary.idNo || "",
                            idIssueCountry: beneficiary.idIssueCountry || "",
                            dob: beneficiary.dob || "",
                            currentAddress: beneficiary.currentAddress || "",
                            sourceOfBO: beneficiary.sourceOfBO || [],
                            delFlag: beneficiary?.delFlag || false
                        };

                         const updatedOwners = [...owners, newOwner];
                         const updatedBeneficiary = {
    ...beneficiary,
    OwnerShipDetails: updatedOwners,
    name: "",
    desgination: "",
    idNo: "",
    idIssueCountry: "",
    dob: "",
    currentAddress: "",
    sourceOfBO: [],
    delFlag: false
};
                        // Update formData with new owner
                        // setFormData({
                        //     ...formData,
                        //     BenficiaryDetails: {
                        //         ...beneficiary,
                        //         OwnerShipDetails: updatedOwners,

                        //         // Clear input fields after adding
                        //         name: "",
                        //         desgination: "",
                        //         idNo: "",
                        //         idIssueCountry: "",
                        //         dob: "",
                        //         currentAddress: "",
                        //         sourceOfBO: [],
                        //         delFlag: false
                        //     }
                        // });
                        setFormData(prev => ({
    ...prev,
    BenficiaryDetails: updatedBeneficiary
}));
                         sessionStorage.setItem("BenficiaryDetails", JSON.stringify(updatedBeneficiary));
                        alert("Beneficial Owner Added Successfully ✅");
                    }
                }

            }

        },

        DirectorsDetails: {
            title: "Directors Details",
        }



    }
};







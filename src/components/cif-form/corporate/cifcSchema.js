export const CIFC_SCHEMA = ({ canWrite = false, permissions = [] }) => {

    const getHideValue = (section, field) => {
        const perm = permissions.find(
            (p) => p.section === section && p.field === field
        );

        // console.log(`Checking hide for ${section} - ${field}:`, perm);
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
                    required: true && !getHideValue("IdentificationDetails", "documentType"),
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
                    required: true && !getHideValue("IdentificationDetails", "documentNumber"),
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
                    type: "search",
                    searchValue:"city",
                    required: true && !getHideValue("IdentificationDetails", "placeOfIssue"),
                    validate: (value) => {
                        if (!value) return;
                        if (value.length < 3)
                            return "Place of Issue must be at least 3 characters";
                    }
                },

                countryOfIssue: {
                    hide: getHideValue("IdentificationDetails", "countryOfIssue"),
                    label: "Country Of Issue",
                    type: "search",
                    searchValue:"coun",
                    required: true && !getHideValue("IdentificationDetails", "countryOfIssue"),
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
                    required: true && !getHideValue("IdentificationDetails", "issueDate"),

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
                    required: true && !getHideValue("IdentificationDetails", "expiryDate"),

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
                    required: true && !getHideValue("IdentificationDetails", "issuingAuthority"),
                },

                documentFile: {
                    hide: getHideValue("IdentificationDetails", "documentFile"),
                    label: "Upload Document",
                    type: "file",
                    required: true && !getHideValue("IdentificationDetails", "documentFile"),
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
                    required: true && !getHideValue("generalInformation", "firstName"),
                },

                middleName: {
                    hide: getHideValue("generalInformation", "middleName"),
                    label: "Middle Name",
                    type: "text",
                    required:false && !getHideValue(""),
                },

                lastName: {
                    hide: getHideValue("generalInformation", "lastName"),
                    label: "Last Name",
                    type: "text",
                    required: true && !getHideValue("generalInformation", "lastName"),
                },

                shortName: {
                    hide: getHideValue("generalInformation", "shortName"),
                    label: "Short Name",
                    type: "text",
                    required:false && !getHideValue(""),
                },




                gender: {
                    hide: getHideValue("generalInformation", "gender"),
                    label: "Gender",
                    type: "select",
                    required: true && !getHideValue("generalInformation", "gender"),
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
                    required: true && !getHideValue("generalInformation", "dateOfBirth"),
                },

                birthCountry: {
                    hide: getHideValue("generalInformation", "birthCountry"),
                    label: "Birth Country",
                    type: "search",
                    searchValue:"coun",
                    required: true && !getHideValue("generalInformation", "birthCountry"),
                },

                minorIndicator: {
                    hide: getHideValue("generalInformation", "minorIndicator"),
                    label: "Minor Indicator",
                    type: "select",
                    required: true && !getHideValue("generalInformation", "birthCountry"),
                    options: [
                        { label: "Select", value: "" },
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },

                nonResidentIndicator: {
                    hide: getHideValue("generalInformation", "nonResidentIndicator"),
                    label: "Non Resident Indicator",
                    type: "select",
                    required: true && !getHideValue("generalInformation", "nonResidentIndicator"),
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
                    hide:getHideValue("generalInformation", "primarySolid"),
                    label: "Primary SOLID",
                    type: "search",
                    searchValue:"serout",
                    required: true && !getHideValue("generalInformation", "primarySolid"),
                },
            },

            primaryIntroducerDetails: {

                title: "Primary Introducer Details",

                cifType: {
                    hide:getHideValue("primaryIntroducerDetails","cifType"),
                    label: "CIF Type",
                    type: "select",
                    required: true && !getHideValue("primaryIntroducerDetails","cifType"),
                    options: [
                        { label: "Select CIF Type", value: "" },
                        { label: "Individual", value: "individual" },
                        { label: "Corporate", value: "corporate" },
                        { label: "Retail", value: "retail" }
                    ]
                },

                bankRelationship: {
                    hide:getHideValue("primaryIntroducerDetails","bankRelationship"),
                    label: "Bank Relationship Type",
                    type: "select",
                    required: true && !getHideValue("primaryIntroducerDetails","bankRelationship"),
                    options: [
                        { label: "Select Relationship", value: "" },
                        { label: "Customer", value: "customer" },
                        { label: "No", value: "no" }
                    ]
                },

                cifId: {
                    hide:getHideValue("primaryIntroducerDetails","cifId"),
                    label: "CIF ID",
                    type: "text",
                    required: true && !getHideValue("primaryIntroducerDetails","cifId"),
                },
                nameOnCIF: {
                     hide:getHideValue("primaryIntroducerDetails"," nameOnCIF"),
                    label: "Name on CIF",
                    type: "text",
                    required: true && !getHideValue("primaryIntroducerDetails"," nameOnCIF"),
                }
            },

            permanentAddress: {

                title: "Permanent Address",

                addressLine1: {
                    hide: getHideValue("permanentAddress","addressLine1"),
                    label: "Address Line 1",
                    type: "text",
                    required: true && !getHideValue("permanentAddress","addressLine1"),
                },

                addressLine2: {
                     hide: getHideValue("permanentAddress","addressLine2"),
                    label: "Address Line 2",
                    type: "text",
                    required:false && !getHideValue(""),
                },

                houseNo: {
                    hide:getHideValue("permanentAddress","houseNo"),
                    label: "House No",
                    type: "text",
                    required: true && !getHideValue("permanentAddress","houseNo"),
                },

                city: {
                    hide:getHideValue("permanentAddress","city"),
                    label: "City",
                    type: "search",
                    searchValue:"city",
                    required: true && !getHideValue("permanentAddress","city"),
                },

                stateProvinceRegion: {
                    hide:getHideValue("permanentAddress","stateProvinceRegion"),
                    label: "State/Province/Region",
                    type: "search",
                    searchValue:"state",
                    required: true && !getHideValue("permanentAddress","stateProvinceRegion"),
                },



                countryOfResidence: {
                    hide:getHideValue("permanentAddress","countryOfResidence"),
                    label: "Country of Residence",
                    type: "search",
                    searchValue:"coun",
                    required: true && !getHideValue("permanentAddress","countryOfResidence"),
                    options: [
                        { label: "Select Country", value: "" },
                        { label: "India", value: "india" },
                        { label: "USA", value: "usa" }
                    ]
                },

                postalCode: {
                    hide:getHideValue("permanentAddress","postalCode"),
                    label: "Postal Code",
                    type: "text",
                    required: true && !getHideValue("permanentAddress","postalCode"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 7)
                            return "Postal Code must be between 4 and 7 characters";
                    }
                }
            },

            presentAddress: {

                title: "Present Address",

                sameAsPermanent: {
                    hide:getHideValue("presentAddress","sameAsPermanent"),
                    label: "Same as Permanent Address",
                    type: "radio",
                    required: true && !getHideValue("presentAddress","sameAsPermanent"),
                    options: [
                        { label: "Select", value: "" },
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },

                blank: {
                    hide:getHideValue("presentAddress","blank"),
                    label: "",
                    type: "blank",
                    required:false && getHideValue(""),
                },

                addressLine1: {
                    hide:getHideValue("presentAddress","addressLine1"),
                    label: "Address Line 1",
                    type: "text",
                    required: true && !getHideValue("presentAddress","addressLine1"),
                },

                addressLine2: {
                    hide: getHideValue("presentAddress","addressLine2"),
                    label: "Address Line 2",
                    type: "text",
                    required: true && !getHideValue("presentAddress","addressLine2"),
                },

                houseNo: {
                    hide:getHideValue("presentAddress","houseNo"),
                    label: "House No",
                    type: "text",
                    require: true && !getHideValue("presentAddress","houseNo"),
                },

                city: {
                     hide:getHideValue("presentAddress","city"),
                    label: "City",
                    type: "search",
                    searchValue:"city",
                    required: true && !getHideValue("presentAddress","city"),
                },

                stateProvinceRegion: {
                    hide:getHideValue("presentAddress","stateProvinceRegion"),
                    label: "State/Province/Region",
                    type: "search",
                    searchValue:"state",
                    required: true && !getHideValue("presentAddress","stateProvinceRegion"),
                },

                countryOfResidence: {
                    hide:getHideValue("presentAddress","countryOfResidence"),
                    label: "Country of Residence",
                    type: "search",
                    searchValue:"coun",
                    required: true && !getHideValue("presentAddress","countryOfResidence"),
                    options: [
                        { label: "Select Country", value: "" },
                        { label: "India", value: "india" },
                        { label: "USA", value: "usa" }
                    ]
                },

                postalCode: {
                    hide:getHideValue("presentAddress","postalCode"),
                    label: "Postal Code",
                    type: "text",
                    required: true && !getHideValue("presentAddress","postalCode"),
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
                    hide:getHideValue("BenficiaryDetails","name"),
                    required: true && !getHideValue("BenficiaryDetails","OwnerShipDetails"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "Name must be between 4 and 50 characters";
                    }
                },
                desgination: {
                    hide:getHideValue("BenficiaryDetails","desgination"),
                    label: "Designation",
                    type: "text",
                    required: true && !getHideValue("BenficiaryDetails","desgination"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "Designation must be between 4 and 50 characters";
                    }
                },
                idNo: {
                    hide: getHideValue("BenficiaryDetails","idNo"),
                    label: "ID Number",
                    type: "text",
                    required: true && !getHideValue("BenficiaryDetails","idNo"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "ID Number must be between 4 and 50 characters";
                    }
                },

                idIssueCountry: {
                    hide:getHideValue("BenficiaryDetails","idIssueCountry"),
                    label: "ID Issue Country",
                    type: "search",
                    searchValue:"",
                    required: true && !getHideValue("BenficiaryDetails","idIssueCountry"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "ID Issue Country must be between 4 and 50 characters";
                    }
                },

                dob: {
                    hide:getHideValue("BenficiaryDetails","dob"),
                    label: "Date of Birth",
                    type: "date",
                    required: true && !getHideValue("BenficiaryDetails","dob"),
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
                    hide:getHideValue("BenficiaryDetails","currentAddress"),
                    label: "Current Address",
                    type: "text",
                    required: true && !getHideValue("BenficiaryDetails","currentAddress"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50)
                            return "Current Address must be between 4 and 50 characters";
                    }
                },

                sourceOfBO: {
                    hide: getHideValue("BenficiaryDetails","sourceOfBO"),
                    label: "Source of BO",
                    type: "checkbox",
                    required: true && !getHideValue("BenficiaryDetails","sourceOfBO"),

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
                    label: "",
                    type: "checkbox",

                    options: [
                        { label: "Delete Flag", value: true }
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
                        for (let field of fields) {
                            const value = beneficiary[field];

                            // Required check
                            if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
                                alert(`${field} is required`);
                                return;
                            }
                            // eslint-disable-next-line
                            switch (field) {
                                case "name":
                                case "desgination":
                                case "idNo":
                                case "idIssueCountry":
                                case "currentAddress":
                                    if (value.length < 4 || value.length > 50) {
                                        alert(`${field} must be between 4 and 50 characters`);
                                        return;
                                    }
                                    break;

                                case "dob":
                                    if (!value) {
                                        alert("Date of Birth is required");
                                        return;
                                    }
                                    const today = new Date().toISOString().split("T")[0];
                                    if (value > today) {
                                        alert("Date of birth cannot be a future date");
                                        return;
                                    }
                                    if (new Date().getFullYear() - new Date(value).getFullYear() < 18) {
                                        alert("Minimum age should be 18 years");
                                        return;
                                    }
                                    break;

                                case "sourceOfBO":
                                    if (!Array.isArray(value) || value.length === 0) {
                                        alert("Please select at least one Source of BO");
                                        return;
                                    }
                                    break;

                                case "delFlag":
                                    if (value === undefined || value === null) {
                                        alert("Delete Flag is required");
                                        return;
                                    }
                                    break;
                            }
                        }

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


            ListOfDirectorsDetails: {

                title: "List of Directors Details",
                name: {
                    hide:getHideValue(" ListOfDirectorsDetails","name"),
                    label: "Name",
                    type: "text",
                    required: true && !getHideValue(" ListOfDirectorsDetails","name"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50) {
                            return "Name must be between 4 and 50 characters";
                        }
                    }
                },

                idNo: {
                    hide:getHideValue(" ListOfDirectorsDetails","idNo"),
                    label: "ID No",
                    type: "text",
                    required: true && !getHideValue(" ListOfDirectorsDetails","idNo"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50) {
                            return "ID No must be between 4 and 50 characters";
                        }
                    }
                },

                desgination: {
                    hide:getHideValue(" ListOfDirectorsDetails","desgination"),
                    label: "Designation",
                    type: "text",
                    required: true && !getHideValue(" ListOfDirectorsDetails","desgination"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50) {
                            return "Designation must be between 4 and 50 characters";
                        }
                    }
                },
                currentAddress: {
                    hide:getHideValue(" ListOfDirectorsDetails","currentAddress"),
                    label: "Current Address",
                    type: "text",
                    required: true && !getHideValue(" ListOfDirectorsDetails","currentAddress"),
                    validate: (value) => {
                        if (value.length < 4 || value.length > 50) {
                            return "Current Address must be between 4 and 50 characters";
                        }
                    }
                },

                pepIndicator: {
                    label: "PEP Indicator",
                    type: "radio",
                    options: [
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ],
                },

                delFlag: {
                    label: "",
                    type: "checkbox",
                    options: [
                        { label: "Delete Flag", value: true }
                    ]
                },

                add: {
                    label: "Add",
                    type: "button",
                    variant: "primary",

                    onClick: ({ formData, setFormData }) => {

                        // ✅ Safely get Directors section
                        const directorsSection = formData.DirectorsDetails || {};

                        // ✅ Get existing director list
                        const directorList =
                            Array.isArray(directorsSection.ListOfDirectorsDetails)
                                ? directorsSection.ListOfDirectorsDetails
                                : [];

                        // Fields to validate
                        const fields = [
                            "name",
                            "idNo",
                            "desgination",
                            "currentAddress",
                            "pepIndicator"
                        ];

                        // ✅ Validation
                        for (let field of fields) {

                            const value = directorsSection[field];

                            if (!value || (Array.isArray(value) && value.length === 0)) {
                                alert(`${field} is required`);
                                return;
                            }

                            if (
                                ["name", "idNo", "desgination", "currentAddress"].includes(field)
                            ) {
                                if (value.length < 4 || value.length > 50) {
                                    alert(`${field} must be between 4 and 50 characters`);
                                    return;
                                }
                            }
                        }

                        // ✅ Create new director object
                        const newDirector = {
                            name: directorsSection.name || "",
                            idNo: directorsSection.idNo || "",
                            desgination: directorsSection.desgination || "",
                            currentAddress: directorsSection.currentAddress || "",
                            pepIndicator: directorsSection.pepIndicator || "",
                            delFlag: directorsSection?.delFlag || false
                        };

                        // ✅ Add to ListOfDirectorsDetails array
                        const updatedList = [...directorList, newDirector];

                        const updatedDirectorsSection = {

                            ...directorsSection,

                            ListOfDirectorsDetails: updatedList,

                            // Reset fields after add
                            name: "",
                            idNo: "",
                            desgination: "",
                            currentAddress: "",
                            pepIndicator: "",
                            delFlag: false

                        };

                        // ✅ Update state
                        setFormData(prev => ({
                            ...prev,
                            DirectorsDetails: updatedDirectorsSection
                        }));

                        // ✅ Save to sessionStorage
                        sessionStorage.setItem(
                            "DirectorsDetails",
                            JSON.stringify(updatedDirectorsSection)
                        );

                        alert("Director Added Successfully ✅");
                    }
                }
            }
        }



    }
};
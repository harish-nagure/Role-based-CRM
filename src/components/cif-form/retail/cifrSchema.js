// schema.js


export const CIFR_SCHEMA = ({ canWrite = false, permissions = [] }) => {

  const getHideValue = (section, field) => {
    const perm = permissions.find(
      (p) => p.section === section && p.field === field
    );

    console.log(`Checking hide for ${section} - ${field}:`, perm);
    return perm ? perm.hide : false; // default false if not found
  };


  return {
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
        required: true && !getHideValue("IdentificationDetails", "placeOfIssue"),
         searchValue: "city",
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
        searchValue: "coun",
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

      personTitle:{
        hide: getHideValue("generalInformation", "personTitle"),
        label: "Person Title",
        type: "search",
        // searchValue:"titl","PERSONSALUTATION ",
        searchValue:"titl",
        required: true && !getHideValue("generalInformation", "personTitle"),
      },

      firstName: {
        hide: getHideValue("generalInformation", "firstName"),
        label: "First Name",
        type: "text",
        required: true && !getHideValue("generalInformation", "firstName"),
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
        required: true && !getHideValue("generalInformation", "lastName"),
      },

      shortName: {
        hide: getHideValue("generalInformation", "shortName"),
        label: "Short Name",
        type: "text"
      },

blank: {
        label: "",
        type: "blank"
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
        // COUNTRY 
        searchValue:"coun",
        required: true && !getHideValue("generalInformation", "birthCountry"),
      },
      minorIndicator: {
        hide: getHideValue("generalInformation", "minorIndicator"),
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

      staffIndicator: {
         hide: getHideValue("generalInformation", "staffIndicator"),
        label: "Staff Indicator",
        type: "select",
        required: true && !getHideValue("generalInformation", "staffIndicator"),
        options: [
          { label: "Select", value: "" },
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]
      },

      staffId:{
        
        label: "Staff ID",
        type: "text",
        required: (form) => form.staffIndicator === "yes" ? true : false,
        validate: (value, form) => {
          if (form.staffIndicator === "yes" && !value)
            return "Staff ID is required";
        } 
      },

      primarySolid: {
         hide: getHideValue("generalInformation", "primarySolid"),
        label: "Primary SOLID",
        type: "search",
        // SERVICE_OUTLET
        searchValue:"SEROUT",
        required: true && !("generalInformation", "primarySolid"),
      },

      segment:{
       hide: getHideValue("generalInformation", "segment"),
        label: "Segment",
        type: "search",
        // SEGMENTATION_CLASS
        searchValue:"SEGME",
        required: true && !getHideValue("generalInformation", "segment"),
      },

      subSegment: {
        hide:getHideValue("generalInformation", "subSegment"),
        label: "Sub Segment",
        type: "search",
        // SUB_SEGMENT
        searchValue:"SUBSEGME",
        required: true && !getHideValue("generalInformation", "subSegment"),
      },

      taxTable: {
        hide:getHideValue("generalInformation", "taxTable"),
        label: "Tax deduction at sourcetable",
        type: "search",
        // TAX_SLAB
        searchValue:"TAX",
        required: true && !getHideValue("generalInformation", "taxTable"),
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
       hide: getHideValue("primaryIntroducerDetails","cifId"),
        label: "CIF ID",
        type: "text",
        required: true && !getHideValue("primaryIntroducerDetails","cifId"),
      },
      nameOnCIF: {
        hide: getHideValue("primaryIntroducerDetails","nameOnCIF"),
        label: "Name on CIF",
        type: "text",
        required: true && !getHideValue("primaryIntroducerDetails","nameOnCIF"),
      }
    },

    permanentAddress: {

      title: "Permanent Address",

      addressLine1: {
        hide: getHideValue("permanentAddress","title"),
        label: "Address Line 1",
        type: "text",
        required: true && !getHideValue("permanentAddress","title"),
      },

      addressLine2: {
        hide:getHideValue("permanentAddress","addressLine2"),
        label: "Address Line 2",
        type: "text",
        required:false && !getHideValue("permanentAddress","addressLine2"),
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
        
      },

      postalCode: {
        hide: getHideValue("permanentAddress","postalCode"),
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
        hide: getHideValue("presentAddress","sameAsPermanent"),
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
       hide: getHideValue("presentAddress","blank"),
        label: "",
        type: "blank",
        required:false && !getHideValue(""),
      },

      addressLine1: {
        hide: getHideValue("presentAddress","addressLine1"),
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
        hide: getHideValue("presentAddress","houseNo"),
        label: "House No",
        type: "text",
        require: true && !getHideValue("presentAddress","houseNo"),
      },

      city: {
        hide: getHideValue("presentAddress","city"),
        label: "City",
        type: "search",
        searchValue:"city",
        required: true & !getHideValue("presentAddress","city"),
      },

      stateProvinceRegion: {
       hide: getHideValue("presentAddress","stateProvinceRegion"),
        label: "State/Province/Region",
        type: "search",
        searchValue:"state",
        required: true && !getHideValue("presentAddress","stateProvinceRegion"),
      },

      countryOfResidence: {
        hide: getHideValue("presentAddress","countryOfResidence"),
        label: "Country of Residence",
        type: "search",
        searchValue:"coun",
        required: true && !getHideValue("presentAddress","countryOfResidence"),
      },

      postalCode: {
        hide: getHideValue("presentAddress"," postalCode"),
        label: "Postal Code",
        type: "text",
        required: true && !getHideValue("presentAddress"," postalCode"),
        validate: (value) => {
          if (value.length < 4 || value.length > 7)
            return "Postal Code must be between 4 and 7 characters";
        }
      }

    },

    nrbAddress: {

      title: "NRB Address",

      addressLine1: {
        hide: getHideValue("nrbAddress","addressLine1"),
        label: "Address Line 1",
        type: "text",
        required: true && !getHideValue("nrbAddress","addressLine1"),
      },

      addressLine2: {
        hide: getHideValue("nrbAddress","addressLine2"),
        label: "Address Line 2",
        type: "text",
        required:false && !getHideValue(""),
      },

      streetNo: {
        hide:getHideValue("nrbAddress","streetNo"),
        label: "Street No",
        type: "text",
        required: true && !getHideValue("nrbAddress","streetNo"),
      },

      city: {
        hide: getHideValue("nrbAddress","city"),
        label: "City",
        type: "search",
        searchValue:"city",
        required: true && !getHideValue("nrbAddress","city"),
      },

      countryOfResidence: {
        hide: getHideValue("nrbAddress","countryOfResidence"),
        label: "Country of Residence",
        type: "search",
        searchValue:"coun",
        required: true && !getHideValue("nrbAddress","countryOfResidence"),
        // options: [
        //   { label: "Select Country", value: "" },
        //   { label: "India", value: "india" },
        //   { label: "USA", value: "usa" }
        // ]
      },

      postalCode: {
        hide: getHideValue("nrbAddress","postalCode"),
        label: "Postal Code",
        type: "text",
        required: true && !getHideValue("nrbAddress","postalCode"),
        validate: (value) => {
          if (value.length < 4 || value.length > 7)
            return "Postal Code must be between 4 and 7 characters";
        }
      }
    },

    phoneDetails: {

      title: "Phone Details",

      primaryPhoneNumber: {
        hide: getHideValue("phoneDetails","primaryPhoneNumber"),
        label: "Primary Phone Number",
        type: "text",
        required: true && !getHideValue("phoneDetails","primaryPhoneNumber"),
        validate: (value) => {
          if (!/^\d{10}$/.test(value))
            return "Phone number must be 10 digits";
        }
      },

      secondaryPhoneNumber: {
        hide: getHideValue("phoneDetails","secondaryPhoneNumber"),
        label: "Secondary Phone Number",
        type: "text",
        required:false && !getHideValue(""),
        validate: (value) => {
          if (value && !/^\d{10}$/.test(value))
            return "Phone number must be 10 digits";
        }
      }
    },

    emailDetails: {

      title: "Email Details",

      emailId: {
        hide: getHideValue("emailDetails","emailId"),
        label: "Email",
        type: "text",
        required: true && !getHideValue("emailDetails","emailId"),
        validate: (value) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Invalid email address";
        }
      },

      alternateEmailId: {
         hide: getHideValue("emailDetails","alternateEmailId"),
        label: "Alternate Email",
        type: "text",
        required:false && !getHideValue(""),
        validate: (value) => {
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Invalid email address";
        }
      },
    },

    currency:{
      title: "Currency",
      ccy:{
        hide:getHideValue("currency","ccy"),
        label: "CCY",
        type:"search",
        required: true && !getHideValue("currency","ccy"),
        // CURRENCY
        searchValue:"crcy",
      },
      creditDiscount:{
        hide:getHideValue("currency","creditDiscount"),
        label:"Credit Discount pcnt",
        type:"text",
        required:true && !getHideValue("currency","creditDiscount"),
      
      },
      debitDiscount:{
         hide:getHideValue("currency","debitDiscount"),
        label:"Debit Discount pcnt",
        type:"text",
        required:true && !getHideValue("currency","debitDiscount"),
      
      },
       withoutholdingTaxDiscount:{
        hide: getHideValue("currency","withoutholdingTaxDiscount"),
        label:"Withoutholding Tax pcnt",
        type:"text",
        required:true && !getHideValue("currency","withoutholdingTaxDiscount"),
      
      },
       withoutholdingTaxFloorLimit:{
        hide:getHideValue("currency","withoutholdingTaxFloorLimit"),
        label:"Withoutholding Tax Floor Limit",
        type:"text",
        required:true && !getHideValue("currency","withoutholdingTaxFloorLimit"),
      
      },
       preferentialexpiryDate:{
        hide:getHideValue("currency","preferentialexpiryDate"),
        label:"Preferential Expiry Date ",
        type:"date",
        required:true && !getHideValue("currency","preferentialexpiryDate"),
      
      },
    
    },
    generalDetails: {

      title: "General Details",
      nationality: {
        hide:getHideValue("generalDetails","nationality"),
        label: "Nationality",
        type: "search",
        // NATIONALITY

        searchValue:"NATN",
        required: true && !getHideValue("generalDetails","nationality"),
      },
      resdingCountry: {
        hide:getHideValue("generalDetails","resdingCountry"),
        label: "Residing Country",
        type: "search",
        // COUNTRY
        searchValue:"coun",
        required: true && !getHideValue("generalDetails","resdingCountry"),
      },
      martialStatus: {
        hide:getHideValue("generalDetails","martialStatus"),
        label: "Marital Status",
        type: "select",
        required: true && !getHideValue("generalDetails","martialStatus"),
        options: [
          { label: "Select", value: "" },
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
          { label: "Widowed", value: "widowed" }
        ]
      },
      spouseName: {
       
        label: "Spouse Name",
        type: "text",
        required: (form) => form.martialStatus === "married" ? true : false,
        validate: (value, form) => {
          if (form.martialStatus === "married" && !value)
            return "Spouse Name is required";
        }
      },
      spouseNumber: {
        label: "Spouse Number",
        type: "text",
        required: (form) => form.martialStatus === "married" ? true : false,
        validate: (value, form) => {
          if (form.martialStatus === "married") {
            if (!value) return "Spouse Number is required";
            if (!/^\d{10}$/.test(value))
              return "Phone number must be 10 digits";
          }
        }
      },
    },

    employmentDetails: {

      title: "Employment Details",
      occupation: {
        hide: getHideValue("employmentDetails","occupation"),
        label: "Occupation",
        type: "search",
        // CONTACT_OCCUPATION

        searchValue:"OCCU",
        required: true && !getHideValue("employmentDetails","occupation"),
      },
      
      employerName: {
        hide:getHideValue("employmentDetails","employerName"),
        label: "Employer Name",
        type: "text",
        required: true && !getHideValue("employmentDetails","employerName"),
      },

      officeAddress: {
        hide: getHideValue("employmentDetails","officeAddress"),
        label: "Office Address",
        type: "text",
        required: true && !getHideValue("employmentDetails","officeAddress"),
      },
    },

    incomeDetails: {

      title: "Income Details",
      annualIncome: {
        hide:getHideValue("incomeDetails","annualIncome"),
        label: "Annual Income",
        type: "text",
        required: true && !getHideValue("incomeDetails","annualIncome"),
      },
      
      sourceOfIncome: {
       hide: getHideValue("incomeDetails","sourceOfIncome"),
        label: "Source of Income",
        type: "text",
        required: true && !getHideValue("incomeDetails","sourceOfIncome"),
      },
    },

    BankDetails: {
      title: "Bank Details",
      bankName: {
        hide:getHideValue("BankDetails","bankName"),
        label: "Bank Name",
        type: "text",
        required: true && !getHideValue("BankDetails","bankName"),
      },
      branchName: {
        hide:getHideValue("BankDetails","branchName"),
        label: "Branch Name",
        type: "text",
        required: true && !getHideValue("BankDetails","branchName"),
      },
    },
  }
};

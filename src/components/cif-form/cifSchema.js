// schema.js

export const CIF_SCHEMA = ({ canWrite }) => ( {

  IdentificationDetails: {

    title: "Identification Details",

    documentType: {
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
      label: "Expiry Date",
      type: "date",
      required: true,

      validate: (value, form) => {

        if (!value) return;

        if (form.issueDate && value <= form.issueDate)
          return "Expiry must be greater than Issue Date";
      }
    },

    issuingAuthority: {
      label: "Issuing Authority",
      type: "text",
      required: true
    },

    documentFile: {
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
      label: "First Name",
      type: "text",
      required: true
    },

    middleName: {
      label: "Middle Name",
      type: "text"
    },

    lastName: {
      label: "Last Name",
      type: "text",
      required: true
    },

    dateOfBirth: {
      label: "Date Of Birth",
      type: "date",
      required: true
    },

    gender: {
      label: "Gender",
      type: "select",
      required: true,
      options: [
        { label: "Select Gender", value: "" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ]
    },

    email: {
      label: "Email",
      type: "email",
      required: true,
      validate: (value) => {
        if (!value.includes("@"))
          return "Invalid email";
      }
    },

    mobile: {
      label: "Mobile",
      type: "tel",
      required: true,
      validate: (value) => {
        if (value.length !== 10)
          return "Mobile must be 10 digits";
      }
    }

  }




});

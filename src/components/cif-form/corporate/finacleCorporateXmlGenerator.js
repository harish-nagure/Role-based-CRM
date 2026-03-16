export const finacleCorporateXmlGenerator = (schema, formData) => {

  const groups = {};

  const processSection = (sectionKey, section) => {

    Object.keys(section).forEach((fieldKey) => {

      const field = section[fieldKey];

      // Skip if xml mapping not present
      if (!field?.xmlTag || !field?.xmlParent) return;

      const value = formData?.[sectionKey]?.[fieldKey];

      // Ignore empty values
      if (value === undefined || value === null || value === "") return;

      // Create parent group if not present
      if (!groups[field.xmlParent]) {
        groups[field.xmlParent] = [];
      }

      // Push XML tag
      groups[field.xmlParent].push(
        `<${field.xmlTag}>${value}</${field.xmlTag}>`
      );
    });

  };

  // Loop through schema sections
  Object.keys(schema).forEach((sectionKey) => {

    const section = schema[sectionKey];

    if (typeof section === "object") {
      processSection(sectionKey, section);
    }

  });

  // Extract groups
  const corpDataXML = (groups["corpCustomerData"] || []).join("\n");
  const addrXML = (groups["corpAddressData"] || []).join("\n");
  const phoneXML = (groups["corpPhoneEmailData"] || []).join("\n");
  const docXML = (groups["corpEntityDocData"] || []).join("\n");
  const financialXML = (groups["corpFinancialData"] || []).join("\n");
  const prefXML = (groups["corpPreferenceData"] || []).join("\n");
  const ownerXML = (groups["corpBeneficialOwnerData"] || []).join("\n");

  // Generate FIXML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<FIXML xmlns="http://www.finacle.com/fixml"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

<Body>

<createCorporateCustomerRequest>

<createCorporateCustomerRq>

<CorpCustDetails>

<corpCustomerData>
${corpDataXML}
</corpCustomerData>

<corpAddressData>
${addrXML}
</corpAddressData>

<corpPhoneEmailData>
${phoneXML}
</corpPhoneEmailData>

<corpEntityDocData>
${docXML}
</corpEntityDocData>

<corpFinancialData>
${financialXML}
</corpFinancialData>

<corpPreferenceData>
${prefXML}
</corpPreferenceData>

<corpBeneficialOwnerData>
${ownerXML}
</corpBeneficialOwnerData>

</CorpCustDetails>

</createCorporateCustomerRq>

</createCorporateCustomerRequest>

</Body>

</FIXML>`;

  return xml;
};
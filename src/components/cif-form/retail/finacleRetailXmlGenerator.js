// export const generateFinacleXMLRetail = (data) => {

// const formatDate = (date) => {
//   if (!date) return "";
//   return new Date(date).toISOString().split(".")[0] + ".000";
// };

// return `<?xml version="1.0" encoding="UTF-8"?>
// <FIXML xmlns="http://www.finacle.com/fixml"
// xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

// <Header>
// <RequestHeader>
// <MessageKey>
// <RequestUUID>${Date.now()}</RequestUUID>
// <ServiceRequestId>RetCustAdd</ServiceRequestId>
// <ServiceRequestVersion>10.2</ServiceRequestVersion>
// <ChannelId>CRM</ChannelId>
// </MessageKey>

// <RequestMessageInfo>
// <BankId>01</BankId>
// <MessageDateTime>${formatDate(new Date())}</MessageDateTime>
// </RequestMessageInfo>

// <Security>
// <Token>
// <PasswordToken>
// <UserId></UserId>
// <Password></Password>
// </PasswordToken>
// </Token>
// </Security>

// </RequestHeader>
// </Header>

// <Body>

// <RetCustAddRequest>
// <RetCustAddRq>

// <CustDtls>
// <CustData>

// <Gender>${data.generalInformation?.gender || ""}</Gender>
// <Salutation>${data.generalInformation?.personTitle || ""}</Salutation>
// <LastName>${data.generalInformation?.lastName || ""}</LastName>
// <ShortName>${data.generalInformation?.shortName || ""}</ShortName>

// <DateOfBirth>${formatDate(data.generalInformation?.dateOfBirth)}</DateOfBirth>

// <PrimarySolId>${data.generalInformation?.primarySolid || ""}</PrimarySolId>
// <SegmentationClass>${data.generalInformation?.segment || ""}</SegmentationClass>
// <SubSegment>${data.generalInformation?.subSegment || ""}</SubSegment>
// <TaxDeductionTable>${data.generalInformation?.taxTable || ""}</TaxDeductionTable>

// <ccy>${data.currency?.ccy || ""}</ccy>

// <AddrDtls>
// <AddrCategory>Work</AddrCategory>
// <AddrLine1>${data.permanentAddress?.addressLine1 || ""}</AddrLine1>
// <City>${data.permanentAddress?.city || ""}</City>
// <State>${data.permanentAddress?.stateProvinceRegion || ""}</State>
// <Country>${data.permanentAddress?.countryOfResidence || ""}</Country>
// <PostalCode>${data.permanentAddress?.postalCode || ""}</PostalCode>
// </AddrDtls>

// <PhoneEmailDtls>
// <PhoneEmailType>COMMPH1</PhoneEmailType>
// <PhoneNumCountryCode>91</PhoneNumCountryCode>
// <PhoneNumLocalCode>${data.phoneDetails?.primaryPhoneNumber || ""}</PhoneNumLocalCode>
// <PhoneOrEmail>PHONE</PhoneOrEmail>
// <PrefFlag>Y</PrefFlag>
// </PhoneEmailDtls>

// </CustData>
// </CustDtls>

// <RelatedDtls>

// <EntityDoctData>
// <CountryOfIssue>${data.IdentificationDetails?.countryOfIssue || ""}</CountryOfIssue>
// <DocCode>${data.IdentificationDetails?.documentType || ""}</DocCode>
// <IssueDt>${formatDate(data.IdentificationDetails?.issueDate)}</IssueDt>
// <PlaceOfIssue>${data.IdentificationDetails?.placeOfIssue || ""}</PlaceOfIssue>
// <ReferenceNum>${data.IdentificationDetails?.documentNumber || ""}</ReferenceNum>
// </EntityDoctData>

// <PsychographicData>
// <PsychographMiscData>
// <StrText10>${data.currency?.ccy || ""}</StrText10>
// <Type>CURRENCY</Type>
// </PsychographMiscData>
// </PsychographicData>

// </RelatedDtls>

// </RetCustAddRq>
// </RetCustAddRequest>

// </Body>

// </FIXML>`;
// };



export const generateFinacleXMLRetail = (schema, formData) => {

  const groups = {};

  Object.keys(schema).forEach(sectionKey => {

    const section = schema[sectionKey];

    Object.keys(section).forEach(fieldKey => {

      const field = section[fieldKey];

      if (!field.xmlTag || !field.xmlParent) return;

      const value = formData?.[sectionKey]?.[fieldKey];

      if (!value) return;

      if (!groups[field.xmlParent]) {
        groups[field.xmlParent] = [];
      }

      groups[field.xmlParent].push(
        `<${field.xmlTag}>${value}</${field.xmlTag}>`
      );

    });

  });

  const custDataXML = (groups["CustData"] || []).join("\n");
  const addrXML = (groups["AddrDtls"] || []).join("\n");
  const docXML = (groups["EntityDoctData"] || []).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<FIXML xmlns="http://www.finacle.com/fixml">
<Body>
<RetCustAddRequest>
<RetCustAddRq>

<CustDtls>
<CustData>

<AddrDtls>
${addrXML}
</AddrDtls>

${custDataXML}

</CustData>
</CustDtls>

<RelatedDtls>

<EntityDoctData>
${docXML}
</EntityDoctData>

</RelatedDtls>

</RetCustAddRq>
</RetCustAddRequest>
</Body>
</FIXML>`;
};
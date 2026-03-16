// <?xml version="1.0" encoding="UTF-8"?>
// <FIXML xsi:schemaLocation="http://www.finacle.com/fixml RetCustAdd.xsd"  xmlns="http://www.finacle.com/fixml"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//     <Header>
//         <RequestHeader>
//             <MessageKey>
//                 <RequestUUID>20250221131533</RequestUUID>
//                 <ServiceRequestId>RetCustAdd</ServiceRequestId>
//                 <ServiceRequestVersion>10.2</ServiceRequestVersion>
//                 <ChannelId>CRM</ChannelId>
//                 <LanguageId></LanguageId>
//             </MessageKey>
//             <RequestMessageInfo>
//                 <BankId>01</BankId>
//                 <TimeZone></TimeZone>
//                 <EntityId></EntityId>
//                 <EntityType></EntityType>
//                 <ArmCorrelationId></ArmCorrelationId>
//                 <MessageDateTime>04-05-2023T03:15:33.605</MessageDateTime>
//             </RequestMessageInfo>
//             <Security>
//                 <Token>
//                     <PasswordToken>
//                         <UserId></UserId>
//                         <Password></Password>
//                     </PasswordToken>
//                 </Token>
//                 <FICertToken></FICertToken>
//                 <RealUserLoginSessionId></RealUserLoginSessionId>
//                 <RealUser></RealUser>
//                 <RealUserPwd></RealUserPwd>
//                 <SSOTransferToken></SSOTransferToken>
//             </Security>
//         </RequestHeader>
//     </Header>
//     <Body></Body>
//     <RetCustAddRequest>
//         <RetCustAddRq>
//             <CustDtls>
//                 <CustData>
//                     <AddrDtls>
//                         <PrefFormat>FREE_TEXT_FORMAT</PrefFormat>
//                         <AddrCategory>Work</AddrCategory>
//                         <AddrLine1>dummy address, DUMMY</AddrLine1>
//                         <FreeTextLabel>Work</FreeTextLabel>
//                         <City>AARA</City>
//                         <State>TN</State>
//                         <Country>IN</Country>
//                         <PostalCode>123456</PostalCode>
//                         <StartDt>2023-05-04T00:00:00.000</StartDt>
//                         <PrefAddr>N</PrefAddr>
//                         <HoldMailFlag>N</HoldMailFlag>
//                     </AddrDtls>
//                     <AddrDtls>
//                         <PrefFormat>FREE_TEXT_FORMAT</PrefFormat>
//                         <AddrCategory>Mailing</AddrCategory>
//                         <AddrLine1>dummy address, DUMMY</AddrLine1>
//                         <FreeTextLabel>Mailing</FreeTextLabel>
//                         <City>AARA</City>
//                         <State>TN</State>
//                         <Country>IN</Country>
//                         <PostalCode>123456</PostalCode>
//                         <StartDt>2023-05-04T00:00:00.000</StartDt>
//                         <PrefAddr>Y</PrefAddr>
//                         <HoldMailFlag>N</HoldMailFlag>
//                     </AddrDtls>
//                     <Gender>M</Gender>
//                     <Salutation>MR.</Salutation>
//                     <LastName>WHITESTONE</LastName>
//                     <ShortName>WS</ShortName>
//                     <PrefName>WHITESTONE</PrefName>
//                     <BirthDt>24</BirthDt>
//                     <BirthMonth>03</BirthMonth>
//                     <BirthYear>04</BirthYear>
//                     <DateOfBirth>24-03-2004T00:00:00.000</DateOfBirth>
//                     <IsMinor>N</IsMinor>
//                     <MinorToMajorDt>24-03-2022T00:00:00.000</MinorToMajorDt>
//                     <IsCustNRE>N</IsCustNRE>
//                     <StaffFlag>N</StaffFlag>
//                     <PrimarySolId>1001</PrimarySolId>
//                     <SegmentationClass>001</SegmentationClass>
//                     <SubSegment>001</SubSegment>
//                     <TradeFinFlag>N</TradeFinFlag>
//                     <Region>LKOCL</Region>
//                     <TaxDeductionTable>T10</TaxDeductionTable>
//                     <ccy>INR</ccy>
//                     <purgeFlag>N</purgeFlag>
//                     <enableCRMalert>N</enableCRMalert>
//                     <IsEbankingEnabled>N</IsEbankingEnabled>
//                     <Manager>UBSADMIN</Manager>
//                     <RelationshipOpeningDt>2023-05-04T00:00:00.000</RelationshipOpeningDt>
//                     <NativeLanguageCode>INFENG</NativeLanguageCode>
//                     <Language>INFENG</Language>
//                     <DefaultAddrType>Work</DefaultAddrType>
//                     <PrefEmailType>HOMEEML</PrefEmailType>
//                     <PrefPhoneType>COMMPH1</PrefPhoneType>
//                     <PhoneEmailDtls>
//                         <PhoneEmailType>COMMPH1</PhoneEmailType>
//                         <PhoneNumCountryCode>91</PhoneNumCountryCode>
//                         <PhoneNumLocalCode>1234567890</PhoneNumLocalCode>
//                         <PhoneOrEmail>PHONE</PhoneOrEmail>
//                         <PrefFlag>Y</PrefFlag>
//                     </PhoneEmailDtls>
//                 </CustData>
//             </CustDtls>
//             <RelatedDtls>
//                 <DemographicData>
//                     <Nationality>MIGR</Nationality>
//                     <MaritalStatus>UNMAR</MaritalStatus>
//                     <EmploymentStatus>Employed</EmploymentStatus>
//                 </DemographicData>
//                 <EntityDoctData>
//                     <CountryOfIssue>IN</CountryOfIssue>
//                     <DocCode>AADHA</DocCode>
//                     <IssueDt>2023-05-04T00:00:00.000</IssueDt>
//                     <TypeCode>AADHAR</TypeCode>
//                     <EntityType>CIFRetCust</EntityType>
//                     <PlaceOfIssue>AARA</PlaceOfIssue>
//                     <ReferenceNum>123456789012</ReferenceNum>
//                     <Type>CIF</Type>
//                     <preferredUniqueId>Y</preferredUniqueId>
//                 </EntityDoctData>
//                 <PsychographicData>
//                     <PsychographMiscData>
//                         <StrText10>INR</StrText10>
//                         <Type>CURRENCY</Type>
//                     </PsychographMiscData>
//                     <preferred_Locale>en_US</preferred_Locale>
//                 </PsychographicData>
//             </RelatedDtls>
//         </RetCustAddRq>
//         <RetCustAdd_CustomData />
//     </RetCustAddRequest>
// </FIXML>



<?xml version="1.0" encoding="UTF-8"?>
<FIXML xsi:schemaLocation="http://www.finacle.com/fixml createCorporateCustomer.xsd"  xmlns="http://www.finacle.com/fixml"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Header>
        <RequestHeader>
            <MessageKey>
                <RequestUUID>Req_0608559980</RequestUUID>
                <ServiceRequestId>createCorporateCustomer</ServiceRequestId>
                <ServiceRequestVersion>10.2</ServiceRequestVersion>
                <ChannelId>COR</ChannelId>
                <LanguageId></LanguageId>
            </MessageKey>
            <RequestMessageInfo>
                <BankId>01</BankId>
                <TimeZone></TimeZone>
                <EntityId></EntityId>
                <EntityType></EntityType>
                <ArmCorrelationId></ArmCorrelationId>
                <MessageDateTime>2023-02-06T20:59:21.000</MessageDateTime>
            </RequestMessageInfo>
            <Security>
                <Token>
                    <PasswordToken>
                        <UserId></UserId>
                        <Password></Password>
                    </PasswordToken>
                </Token>
                <FICertToken></FICertToken>
                <RealUserLoginSessionId></RealUserLoginSessionId>
                <RealUser></RealUser>
                <RealUserPwd></RealUserPwd>
                <SSOTransferToken></SSOTransferToken>
            </Security>
        </RequestHeader>
    </Header>
    <Body>
        <createCorporateCustomerRequest>
            <CorpCustDetails>
                <corpCustomerDtlsData>
                    <corpCustomerData>
                        <corporate_name>AJ</corporate_name>
                        <short_name>A</short_name>
                        <status_desc>Active</status_desc>
                        <entityclass>002</entityclass>
                        <entity_type>Customer</entity_type>
                        <lang_desc>USA (English)</lang_desc>
                        <createdBySystemID>FIVUSR</createdBySystemID>
                        <cust_const></cust_const>
                        <segment>001</segment>
                        <subsegment>001</subsegment>
                        <trade_services_availed>N</trade_services_availed>
                        <primaryRM_ID></primaryRM_ID>
                        <remarks>AJ</remarks>
                        <relationship_type>003</relationship_type>
                        <sector>001</sector>
                        <subsector>001</subsector>
                        <dsaid></dsaid>
                        <source_of_funds>12</source_of_funds>
                        <relationship_createdby>AJ1</relationship_createdby>
                        <crncy_Code>INR</crncy_Code>
                        <nativeLangCode>ENGLISH</nativeLangCode>
                        <cust_hlth>1</cust_hlth>
                        <keycontact_personname>fghj</keycontact_personname>
                        <relationship_startdate>2022-12-21T00:00:00.000</relationship_startdate>
                        <priority>001</priority>
                        <legalentity_type>999</legalentity_type>
                        <business_type>001</business_type>
                        <principle_placeoperation>IN</principle_placeoperation>
                        <primary_service_center>1001</primary_service_center>
                        <date_of_incorporation>2022-12-21T00:00:00.000</date_of_incorporation>
                        <region>LKOCL</region>
                        <registration_number>123456</registration_number>
                        <taxid>1212</taxid>
                        <average_annualincome>1000</average_annualincome>
                        <isEbankingEnabled>N</isEbankingEnabled>
                        <primaryRMLOGIN_ID>11561</primaryRMLOGIN_ID>
                        <notes>AJ</notes>
                        <defaultaddresstype>REGISTERED</defaultaddresstype>
                        <defaultaddresstype>Mailing</defaultaddresstype>
                        <relationship_type>002</relationship_type>
                        <remarks>AJ</remarks>
                        <corpAddressData>
                            <address_line1>dummy address, DUMMY</address_line1>
                            <address_line2>Poo Nagar</address_line2>
                            <address_line3>Errappatti</address_line3>
                            <addresscategory>REGISTERED</addresscategory>
                            <building_level>3</building_level>
                            <cellno>9080052100</cellno>
                            <cellnocitycode>11</cellnocitycode>
                            <cellnocountrycode>91</cellnocountrycode>
                            <cellnolocalcode>562</cellnolocalcode>
                            <city>MYSO</city>
                            <country>IN</country>
                            <faxno>12</faxno>
                            <faxno2>12</faxno2>
                            <faxnocitycode>22</faxnocitycode>
                            <faxnocitycode2>22</faxnocitycode2>
                            <faxnocountrycode>922</faxnocountrycode>
                            <faxnocountrycode2>922</faxnocountrycode2>
                            <faxnolocalcode>5241</faxnolocalcode>
                            <faxnolocalcode2>541</faxnolocalcode2>
                            <house_no>528</house_no>
                            <isAddressProofRcvd>N</isAddressProofRcvd>
                            <locality_name>THAR</locality_name>
                            <mailstop>N</mailstop>
                            <name>CHINNA</name>
                            <preferredAddress>N</preferredAddress>
                            <preferredFormat>FREE_TEXT_FORMAT</preferredFormat>
                            <premise_name>GHANDI</premise_name>
                            <start_date>2026-02-19T00:00:00.000</start_date>
                            <state>AS</state>
                            <street_name>MG ROAD</street_name>
                            <street_no>12 ST</street_no>
                            <suburb>3</suburb>
                            <town>CHENNAI</town>
                            <zip>23442</zip>
                            <FreeTextLabel>Free Text Address</FreeTextLabel>
                            <holdMailFlag>Y</holdMailFlag>
                            <holdMailReason>notes</holdMailReason>
                            <holdMailInitiatedBy>CUSTOMER</holdMailInitiatedBy>
                            <isAddressVerified>N</isAddressVerified>
                            <BusinessCenterCode>1011</BusinessCenterCode>
                        </corpAddressData>
                        <corpAddressData>
                            <address_line1>dummy address, DUMMY</address_line1>
                            <address_line2>Poo Nagar</address_line2>
                            <address_line3>Errappatti</address_line3>
                            <addresscategory>Mailing</addresscategory>
                            <building_level>3</building_level>
                            <cellno>9080052100</cellno>
                            <cellnocitycode>11</cellnocitycode>
                            <cellnocountrycode>91</cellnocountrycode>
                            <cellnolocalcode>562</cellnolocalcode>
                            <city>MYSO</city>
                            <country>IN</country>
                            <faxno>12</faxno>
                            <faxno2>12</faxno2>
                            <faxnocitycode>22</faxnocitycode>
                            <faxnocitycode2>22</faxnocitycode2>
                            <faxnocountrycode>922</faxnocountrycode>
                            <faxnocountrycode2>922</faxnocountrycode2>
                            <faxnolocalcode>5241</faxnolocalcode>
                            <faxnolocalcode2>541</faxnolocalcode2>
                            <house_no>528</house_no>
                            <isAddressProofRcvd>N</isAddressProofRcvd>
                            <locality_name>THAR</locality_name>
                            <mailstop>N</mailstop>
                            <name>CHINNA</name>
                            <preferredAddress>Y</preferredAddress>
                            <preferredFormat>FREE_TEXT_FORMAT</preferredFormat>
                            <premise_name>GHANDI</premise_name>
                            <start_date>2026-02-19T00:00:00.000</start_date>
                            <state>AS</state>
                            <street_name>MG ROAD</street_name>
                            <street_no>12 ST</street_no>
                            <suburb>3</suburb>
                            <town>CHENNAI</town>
                            <zip>23442</zip>
                            <FreeTextLabel>Mailing</FreeTextLabel>
                            <holdMailFlag>Y</holdMailFlag>
                            <holdMailReason>notes</holdMailReason>
                            <holdMailInitiatedBy>CUSTOMER</holdMailInitiatedBy>
                            <isAddressVerified>N</isAddressVerified>
                            <BusinessCenterCode>1011</BusinessCenterCode>
                        </corpAddressData>
                        <corpGroupHouseHoldData>
                            <flag>N</flag>
                            <grouphouseholdcode>CIFHH22</grouphouseholdcode>
                            <grouphouseholdname>CINFRELLA</grouphouseholdname>
                            <shareholding_in_percentage>79</shareholding_in_percentage>
                            <GroupId>RAM</GroupId>
                        </corpGroupHouseHoldData>
                        <corpPhoneEmailData>
                            <phoneemailtype>CELLPH</phoneemailtype>
                            <phonenocitycode>0</phonenocitycode>
                            <phonenocountrycode>88</phonenocountrycode>
                            <phonenolocalcode>123456</phonenolocalcode>
                            <phoneoremail>PHONE</phoneoremail>
                            <preferredflag>Y</preferredflag>
                        </corpPhoneEmailData>
                        <countryofprincipaloperation>BT</countryofprincipaloperation>
                        <createdBySystemID>FIVUSR</createdBySystemID>
                        <crncy_Code>INR</crncy_Code>
                        <cust_const>ASS</cust_const>
                        <cust_creation_mode>Y</cust_creation_mode>
                        <cust_grp>GRP1</cust_grp>
                        <cust_grp_desc>GRP1</cust_grp_desc>
                        <cust_hlth>1</cust_hlth>
                        <cust_stat_chg_date>2026-02-21T00:00:00.000</cust_stat_chg_date>
                        <entity_type>CUSTOMER</entity_type>
                        <entityclass>MIGR</entityclass>
                        <keycontact_personname>KABILAN</keycontact_personname>
                        <lang_desc>USA (English)</lang_desc>
                        <legalentity_type>999</legalentity_type>
                        <nativeLangCode>ENGLISH</nativeLangCode>
                        <negative_flag>Y</negative_flag>
                        <negative_notes>NEGATIVE</negative_notes>
                        <negative_reason>DATA NOTES</negative_reason>
                        <notes>DATA NOTES</notes>
                        <primary_service_center>MIGR</primary_service_center>
                        <region>NCRCL</region>
                        <registration_number>123456789</registration_number>
                        <relationship_createdby>UBSADMIN</relationship_createdby>
                        <sector>011</sector>
                        <segment>005</segment>
                        <short_name>A</short_name>
                        <source_of_funds>MIGRATION</source_of_funds>
                        <subsector>011</subsector>
                        <subsegment>005</subsegment>
                        <taxid>980798</taxid>
                        <trade_services_availed>N</trade_services_availed>
                        <primaryRMLOGIN_ID>UBSADMIN</primaryRMLOGIN_ID>
                        <isEbankingEnabled>N</isEbankingEnabled>
                        <defaultaddresstype>REGISTERED</defaultaddresstype>
                        <isdummy>N</isdummy>
                        <islamic_banking_customer>N</islamic_banking_customer>
                        <otherlimits>0</otherlimits>
                        <preferredCalendar>00</preferredCalendar>
                        <preferredEmail>K1234@GMAIL.COM</preferredEmail>
                        <preferredEmailType>HOMEEML</preferredEmailType>
                        <preferredPhone>9080052100</preferredPhone>
                        <relationship_type>999</relationship_type>
                        <remarks>Data Remarks</remarks>
                        <riskProfileExpiryDate>2026-05-31T00:00:00.000</riskProfileExpiryDate>
                        <primaryparentcompany>IN</primaryparentcompany>
                        <custdepositsinotherbanks>0</custdepositsinotherbanks>
                        <customer_asset_classification>S</customer_asset_classification>
                        <customer_rating>MIGR</customer_rating>
                        <defaultaddresstype>REGISTERED</defaultaddresstype>
                        <delinquency_flag>N</delinquency_flag>
                        <document_received_flag>N</document_received_flag>
                        <dsaid>UBSADMIN</dsaid>
                        <incrementaldateupdate>2026-02-18T00:00:00.000</incrementaldateupdate>
                        <introd_name>White</introd_name>
                        <is_swift_code_of_bank>N</is_swift_code_of_bank>
                        <primaryRM_ID>UBSADMIN</primaryRM_ID>
                        <principle_placeoperation>IN</principle_placeoperation>
                        <priority>MIGR</priority>
                        <record_status>A</record_status>
                        <riskProfileScore>0</riskProfileScore>
                        <routeRuleForUser>4</routeRuleForUser>
                        <secondaryRM_ID>5</secondaryRM_ID>
                        <short_name_native>Kabi</short_name_native>
                        <stagename>mod</stagename>
                        <startdate>2026-02-01T00:00:00.000</startdate>
                        <status>999</status>
                        <status_desc>Active</status_desc>
                        <suspend_flag>Y</suspend_flag>
                        <suspend_notes>Created Cif Suspend</suspend_notes>
                        <suspend_reason>Bad Activity</suspend_reason>
                        <tds_tbl_desc>T00</tds_tbl_desc>
                        <tertiaryRMLogin_ID>UBSADMIN</tertiaryRMLogin_ID>
                        <totalfundbase>0</totalfundbase>
                        <totalnonfundbase>0</totalnonfundbase>
                        <uniquegroupflag>Y</uniquegroupflag>
                        <website_address>https://wss-finadm</website_address>
                        <countryOfIncorporation>IN</countryOfIncorporation>
                        <ForeignAccTaxReportingReq>Y</ForeignAccTaxReportingReq>
                        <ForeignTaxReportingCountry>IN</ForeignTaxReportingCountry>
                        <LastForeignTaxReviewDate>2026-02-01T00:00:00.000</LastForeignTaxReviewDate>
                        <NextForeignTaxReviewDate>2026-03-31T00:00:00.000</NextForeignTaxReviewDate>
                        <External_System_Pricing>N</External_System_Pricing>
                        <Relationship_Pricing_ID>UBSADMIN</Relationship_Pricing_ID>
                        <Tax_Rate_Table_Code>999</Tax_Rate_Table_Code>
                        <Tax_Exmpt_Start_Date>2026-02-21T00:00:00.000</Tax_Exmpt_Start_Date>
                        <No_Tax_Recal_Beyond_Date>2026-02-17T00:00:00.000</No_Tax_Recal_Beyond_Date>
                        <FatcaRemarks>FactRemarks</FatcaRemarks>
                        <corpMiscInfoData>
                            <amount1>100</amount1>
                            <amount2>100</amount2>
                            <amount3>100</amount3>
                            <amount4>100</amount4>
                            <date1>2026-02-21T00:00:00.000</date1>
                            <date2>2026-02-21T00:00:00.000</date2>
                            <employeeID>1176</employeeID>
                            <employerID>1176</employerID>
                            <int1>10</int1>
                            <type>CURRENCY</type>
                            <Str1>INR</Str1>
                            <Str2>INR</Str2>
                            <Str3>INR</Str3>
                            <Str4>INR</Str4>
                            <Str5>INR</Str5>
                            <Str12>INR</Str12>
                            <Str14>INR</Str14>
                            <Str16>INR</Str16>
                            <Str17>INR</Str17>
                            <Str18>INR</Str18>
                            <Str19>INR</Str19>
                            <Str20>INR</Str20>
                            <Str21>INR</Str21>
                            <Str22>INR</Str22>
                            <Str23>INR</Str23>
                            <Str24>INR</Str24>
                            <Str25>INR</Str25>
                            <Str26>INR</Str26>
                            <Str27>INR</Str27>
                            <Str28>Y</Str28>
                            <Str29>Y</Str29>
                            <Str30>Y</Str30>
                            <Str31>Y</Str31>
                            <Str32>Y</Str32>
                            <Str33>INR</Str33>
                            <Str34>INR</Str34>
                            <Str35>INR</Str35>
                            <Str37>INR</Str37>
                            <Str38>INR</Str38>
                            <Str39>INR</Str39>
                            <Str40>INR</Str40>
                            <Str41>INR</Str41>
                            <Str42>INR</Str42>
                            <Str43>INR</Str43>
                            <Str44>INR</Str44>
                            <Str45>INR</Str45>
                            <Str46>INR</Str46>
                            <Str47>INR</Str47>
                            <Str48>INR</Str48>
                            <Str49>INR</Str49>
                            <Str50>INR</Str50>
                            <Date3>2026-02-21T00:00:00.000</Date3>
                            <EntityType>CUSTOMER</EntityType>
                        </corpMiscInfoData>
                    </corpCustomerData>
                </corpCustomerDtlsData>
                <corpRelatedData>
                    <preferencesData>
                        <beneficialOwnerData>
                            <FirstNameAlt1>kabilan</FirstNameAlt1>
                            <last_nameAlt1>nill</last_nameAlt1>
                            <first_nameAlt1>nill</first_nameAlt1>
                            <first_name>SANGAVI</first_name>
                            <dob>2026-02-21T00:00:00.000</dob>
                            <ciftype>RETAIL</ciftype>
                            <entity_type>customer</entity_type>
                            <middle_nameAlt1>kabialrt</middle_nameAlt1>
                            <entitykey>R0034952</entitykey>
                            <percentagebenefited>12</percentagebenefited>
                            <middle_name>kabi</middle_name>
                            <salutation>MS.</salutation>
                            <DeleteFlag>n</DeleteFlag>
                            <BeneficialOwnerID>1234567789</BeneficialOwnerID>
                            <corporate_name>AJ</corporate_name>
                            <last_name>RAMAMOORTHI</last_name>
                        </beneficialOwnerData>
                        <corpEntityDocumentData>
                            <countryOfIssue>IN</countryOfIssue>
                            <docCode>TAXRE</docCode>
                            <docIssueDate>2022-12-21T00:00:00.000</docIssueDate>
                            <docTypeCode>CORPINCOMPROOF</docTypeCode>
                            <entityType>CIFRetCust</entityType>
                            <placeOfIssue>NICO</placeOfIssue>
                            <referenceNumber>1234</referenceNumber>
                            <scanRequired>N</scanRequired>
                            <type>CIF</type>
                            <preferredUniqueId>Y</preferredUniqueId>
                            <idIssuedOrganisation>Income Tax Department</idIssuedOrganisation>
                        </corpEntityDocumentData>
                        <custEntityDocumentData ismultirec='Y'>
                            <ISDOCVERIFIED>N</ISDOCVERIFIED>
                            <REFNO>1234</REFNO>
                        </custEntityDocumentData>
                        <corpPrefMiscData>
                            <amount1>10000</amount1>
                            <amount2>20000</amount2>
                            <amount3>30000</amount3>
                            <amount4>40000</amount4>
                            <date1>2099-12-31T00:00:00.000</date1>
                            <date2>2099-12-31T00:00:00.000</date2>
                            <int1>100</int1>
                            <str1>INR</str1>
                            <str10>INR</str10>
                            <str11>INR</str11>
                            <str12>INR</str12>
                            <str13>INR</str13>
                            <str14>INR</str14>
                            <str15>INR</str15>
                            <str16>INR</str16>
                            <str17>INR</str17>
                            <str18>INR</str18>
                            <str19>INR</str19>
                            <str2>INR</str2>
                            <str20>INR</str20>
                            <str21>INR</str21>
                            <str22>INR</str22>
                            <str23>INR</str23>
                            <str24>INR</str24>
                            <str25>INR</str25>
                            <str26>INR</str26>
                            <str27>INR</str27>
                            <str28>N</str28>
                            <str29>N</str29>
                            <str3>INR</str3>
                            <str30>N</str30>
                            <str31>N</str31>
                            <str32>N</str32>
                            <str33>INR</str33>
                            <str34>INR</str34>
                            <str35>INR</str35>
                            <str36>INR</str36>
                            <str37>INR</str37>
                            <str38>INR</str38>
                            <str39>INR</str39>
                            <str4>INR</str4>
                            <str40>INR</str40>
                            <str41>INR</str41>
                            <str42>INR</str42>
                            <str5>KABILAN</str5>
                            <str6>INR</str6>
                            <str7>INR</str7>
                            <str8>INR</str8>
                            <str9>INR</str9>
                            <type>CURRENCY</type>
                        </corpPrefMiscData>
                        <cust_floor_limit_tds>0</cust_floor_limit_tds>
                        <cust_pref_till_date>2026-08-31T00:00:00.000</cust_pref_till_date>
                        <description>Description</description>
                        <do_not_email>N</do_not_email>
                        <do_not_mail>N</do_not_mail>
                        <do_not_phone>N</do_not_phone>
                        <entity_type>CUSTOMER</entity_type>
                        <frequency>2</frequency>
                        <frequency_holidaystatus>N</frequency_holidaystatus>
                        <frequency_startdate>2026-02-21T00:00:00.000</frequency_startdate>
                        <frequency_weekday>W</frequency_weekday>
                        <holdmail_enddate>2026-03-31T00:00:00.000</holdmail_enddate>
                        <holdmail_flag>N</holdmail_flag>
                        <holdmail_startdate>2026-02-21T00:00:00.000</holdmail_startdate>
                        <lastprinteddate>2026-02-21T00:00:00.000</lastprinteddate>
                        <loansstatementtype>P</loansstatementtype>
                        <mode_of_dispatch>N</mode_of_dispatch>
                        <printnextduedate>2026-03-31T00:00:00.000</printnextduedate>
                        <statement_type>p</statement_type>
                        <tds_exmpt_end_date>2026-08-31T00:00:00.000</tds_exmpt_end_date>
                        <tds_exmpt_ref_num>12345678</tds_exmpt_ref_num>
                        <tds_exmpt_rmks>exmpt Remarks</tds_exmpt_rmks>
                        <tds_exmpt_submit_date>2026-02-21T00:00:00.000</tds_exmpt_submit_date>
                        <tdsstatementtype>n</tdsstatementtype>
                        <Pricing_Effective_Date>2026-02-21T00:00:00.000</Pricing_Effective_Date>
                        <Pricing_Review_Date>2026-02-21T00:00:00.000</Pricing_Review_Date>
                        <obligor>FRIEND</obligor>
                        <pdriskrating>5</pdriskrating>
                        <lossdefprcnt>3</lossdefprcnt>
                        <probdefprcnt>6</probdefprcnt>
                        <regulatoryrating>8</regulatoryrating>
                        <seniority>MAJOR</seniority>
                        <exposurecategory>MAILING</exposurecategory>
                        <wholesaleexposubcat>0</wholesaleexposubcat>
                        <revenuesize>24</revenuesize>
                        <totalassets>6</totalassets>
                        <nextreviewdate>2026-03-31T00:00:00.000</nextreviewdate>
                        <msgreviewdate>2026-03-27T00:00:00.000</msgreviewdate>
                        <msgexpirydate>2026-04-28T00:00:00.000</msgexpirydate>
                        <custmessage>CUST MESSAGE</custmessage>
                        <iscustnamedisclosure>N</iscustnamedisclosure>
                        <securityindicator>0</securityindicator>
                        <isconglomerate>N</isconglomerate>
                        <investment>0</investment>
                        <industrycode>12345</industrycode>
                    </preferencesData>
                    <corpBaselData>
                        <creditRatingData>
                            <ratingdate>2026-02-21T00:00:00.000</ratingdate>
                        </creditRatingData>
                    </corpBaselData>
                    <tradeFinanceData>
                        <trade_Finance_ID>12345678</trade_Finance_ID>
                        <deleteFlag>N</deleteFlag>
                        <CautionStat>N</CautionStat>
                        <CentralBankId>01</CentralBankId>
                        <City>AARA</City>
                        <ContractLimit>0</ContractLimit>
                        <CountryDesc>IN</CountryDesc>
                        <CreatedFrom>A</CreatedFrom>
                        <CorpName>AJ</CorpName>
                        <CurrDesc>INR</CurrDesc>
                        <CustFlag>N</CustFlag>
                        <CustNative>IN</CustNative>
                        <DCMmarginPercentage>0</DCMmarginPercentage>
                        <DCNextNumCode>001</DCNextNumCode>
                        <DCNextNumCodeRCode>011</DCNextNumCodeRCode>
                        <DCSanctionExpDt>2026-02-21T00:00:00.000</DCSanctionExpDt>
                        <DCSanctionIngAuth>UBSADMIN</DCSanctionIngAuth>
                        <EntityCreationFlag>N</EntityCreationFlag>
                        <EntityType>CUSTOMER</EntityType>
                        <ExpImpInd>B</ExpImpInd>
                        <FaxNum>1234567</FaxNum>
                        <FCSanctionIngAuth>UBSADMIN</FCSanctionIngAuth>
                        <HundredPercentFlag>Y</HundredPercentFlag>
                        <IndividualCorpFlag>C</IndividualCorpFlag>
                        <InlandTradeAllowed>Y</InlandTradeAllowed>
                        <LeasingLiabilities>N</LeasingLiabilities>
                        <Name>KABILAN</Name>
                        <PartyConst>N</PartyConst>
                        <PartyType>CUSTOMER</PartyType>
                        <Phone>9080052100</Phone>
                        <ProductionCycle>0</ProductionCycle>
                        <Rmks>DATA REMARKS</Rmks>
                        <ReviewDt>2026-03-31T00:00:00.000</ReviewDt>
                        <SpecialCustFlag>Y</SpecialCustFlag>
                        <SSIFlag>N</SSIFlag>
                        <StateDesc>SATTE  DESC</StateDesc>
                        <Telex>221</Telex>
                        <TradeAuthorityCode>98765432</TradeAuthorityCode>
                        <PostalCode>636807</PostalCode>
                    </tradeFinanceData>
                    <corpFinancialData>
                        <invest_shares_units>20</invest_shares_units>
                        <legal_details>MIGRATION</legal_details>
                        <legal_status>MIGR</legal_status>
                        <numberof_employees>0</numberof_employees>
                        <ocb_since>2026-02-21T00:00:00.000</ocb_since>
                        <outstandingMortgage>10</outstandingMortgage>
                        <period>9</period>
                        <property>001</property>
                        <sharehld_flg>N</sharehld_flg>
                        <tot_share_investment>20</tot_share_investment>
                        <total_amount_held>1000</total_amount_held>
                        <type_of_statement>MIG</type_of_statement>
                        <EntityType>CUSTOMER</EntityType>
                        <financialDetailsData>
                            <ciftype>RETAIL</ciftype>
                            <date1>2026-02-01T00:00:00.000</date1>
                            <date10>2026-02-02T00:00:00.000</date10>
                            <date2>2026-02-03T00:00:00.000</date2>
                            <date3>2026-02-04T00:00:00.000</date3>
                            <date4>2026-02-05T00:00:00.000</date4>
                            <date5>2026-02-06T00:00:00.000</date5>
                            <date6>2026-02-06T00:00:00.000</date6>
                            <date7>2026-02-06T00:00:00.000</date7>
                            <date8>2026-02-06T00:00:00.000</date8>
                            <date9>2026-02-06T00:00:00.000</date9>
                            <entitykey>R0034952</entitykey>
                            <entitytype>CUSTOMER</entitytype>
                            <amount1>200</amount1>
                            <amount10>10</amount10>
                            <amount11>3</amount11>
                            <amount12>10</amount12>
                            <amount13>10</amount13>
                            <amount14>10</amount14>
                            <amount15>10</amount15>
                            <amount16>10</amount16>
                            <amount17>10</amount17>
                            <amount18>10</amount18>
                            <amount19>10</amount19>
                            <amount2>10</amount2>
                            <amount20>10</amount20>
                            <amount21>10</amount21>
                            <amount22>10</amount22>
                            <amount23>10</amount23>
                            <amount24>10</amount24>
                            <amount25>10</amount25>
                            <amount26>10</amount26>
                            <amount27>10</amount27>
                            <amount28>10</amount28>
                            <amount29>10</amount29>
                            <amount3>10</amount3>
                            <amount30>10</amount30>
                            <amount4>10</amount4>
                            <amount5>10</amount5>
                            <amount6>10</amount6>
                            <amount7>10</amount7>
                            <amount8>10</amount8>
                            <amount9>10</amount9>
                            <entitykey>R0034952</entitykey>
                            <entitytype>CUSTOMER</entitytype>
                            <financedetail_type>FIN_DET</financedetail_type>
                            <flag1>Y</flag1>
                            <flag2>Y</flag2>
                            <flag3>Y</flag3>
                            <flag4>Y</flag4>
                            <flag5>Y</flag5>
                            <int10>100</int10>
                            <int11>100</int11>
                            <int12>100</int12>
                            <int13>100</int13>
                            <int14>100</int14>
                            <int15>100</int15>
                            <int2>100</int2>
                            <int3>100</int3>
                            <int4>100</int4>
                            <int5>100</int5>
                            <int6>100</int6>
                            <int9>100</int9>
                            <str11>INR</str11>
                            <str12>INR</str12>
                            <str13>INR</str13>
                            <str14>INR</str14>
                            <str15>INR</str15>
                            <str16>INR</str16>
                            <str17>INR</str17>
                            <str18>INR</str18>
                            <str19>INR</str19>
                            <str2>INR</str2>
                            <str20>INR</str20>
                            <str21>Y</str21>
                            <str22>Y</str22>
                            <str23>Y</str23>
                            <str24>Y</str24>
                            <str25>Y</str25>
                            <str28>INR</str28>
                            <str29>INR</str29>
                            <str30>INR</str30>
                            <str4>INR</str4>
                            <str6>INR</str6>
                            <str9>INR</str9>
                        </financialDetailsData>
                    </corpFinancialData>
                </corpRelatedData>
            </CorpCustDetails>
        </createCorporateCustomerRequest>
        <createCorporateCustomer_CustomData>
		</createCorporateCustomer_CustomData>
    </Body>
</FIXML>
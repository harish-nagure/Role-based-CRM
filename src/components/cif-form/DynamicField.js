
// import React, { useRef, useEffect } from "react";
// import { Upload, TextSearch } from "lucide-react";

// const DynamicField = ({
//   section,
//   subSection,
//   name,
//   field,
//   value,
//   error,
//   onChange,
//   formData,
//   hide,
//   setFormData,
//   searchResults = {},
//   setSearchResults
// }) => {
//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setSearchResults(prev => ({
//           ...prev,
//           [`${section}.${name}`]: []
//         }));
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [section, name, setSearchResults]);

//   // console.log("Dynamic Field:", section, name, field, value, error);

//   const sectionData = formData?.[section] || {};

//   const isRequired =
//     typeof field.required === "function"
//       ? field.required(sectionData)
//       : field.required;


//   const commonClass = `
//     w-full px-4 py-2 border rounded-lg
//     ${error
//       ? "border-error focus:outline-none focus:ring-1 focus:ring-error focus:border-error"
//       : "border-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
//     }`;

//   // const handleChange = (e) => {
//   //   const val =
//   //     field.type === "file"
//   //       ? e.target.files[0]
//   //       : e.target.value;

//   //   onChange(section, name, val, field);
//   // };

//   const handleChange = (e) => {
//   const val =
//     field.type === "file"
//       ? e.target.files[0]
//       : e.target.value;

//   onChange(section, subSection, name, val, field);
// };

//   const isDisabled =
//     subSection === "presentAddress" &&
//     name !== "sameAsPermanent" &&
//     formData?.[section]?.presentAddress?.sameAsPermanent === "yes";
//   if (field.hide) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col gap-1">

//       {/* <label className="text-sm font-medium">
//         {field.label}
//         {field.required && (
//           <span className="text-red-500 ml-1">*</span>
//         )}
//       </label> */}
//       <label className="text-sm font-medium">
//         {field.type === "button" ? "" : field.label}
//         {isRequired && (
//           <span className="text-error ml-1">*</span>
//         )}
//       </label>


//       {/* SELECT */}
//       {field.type === "select" && (
//         <select
//           className={commonClass}
//           value={value || ""}
//           onChange={handleChange}
//         >
//           {field.options.map((opt, i) => (
//             <option key={i} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       )}

//       {/* FILE (NEW PROFESSIONAL DESIGN) */}
//       {field.type === "file" && (
//         <div className="w-full">

//           {/* Hidden real input */}
//           <input
//             type="file"
//             accept={field.accept}
//             id={`${section}-${subSection}-${name}`}
//             className="hidden"
//             onChange={handleChange}
//           />

//           {/* Custom UI */}
//           <label
//             htmlFor={`${section}-${subSection}-${name}`}
//             className={`${commonClass} flex items-center justify-between cursor-pointer transition`}
//           >

//             {/* Left side */}
//             <div className="flex items-center gap-2 py-1">

//               <Upload className="w-4 h-4 text-gray-500" />

//               <span className="text-xs text-gray-700 truncate max-w-[200px]">
//                 {value?.name || field.placeholder || "Choose file"}
//               </span>

//             </div>

//             {/* Right side */}
//             <span className="text-xs text-gray-500">
//               Browse
//             </span>

//           </label>

//         </div>
//       )}

//       {/* RADIO */}
//       {field.type === "radio" && (
//         <div className="flex gap-6 mt-1">

//           {field.options
//             .filter(opt => opt.value !== "") // optional: remove Select option
//             .map((opt, i) => {

//               const id = `${section}-${name}-${opt.value}`;

//               return (
//                 <label
//                   key={i}
//                   htmlFor={id}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >

//                   <input
//                     id={id}
//                     type="radio"
//                     name={`${section}-${name}`}
//                     value={opt.value}
//                     checked={value === opt.value}
//                     onChange={handleChange}
//                     className="w-4 h-4 text-primary border-muted focus:ring-primary"
//                   />

//                   <span className="text-sm">
//                     {opt.label}
//                   </span>

//                 </label>
//               );

//             })}

//         </div>
//       )}

//       {field.type === "checkbox" && (
//         <div className="flex flex-col gap-3 mt-2">

//           {(field.options || []).map((opt, i) => {

//             const id = `${section}-${name}-${opt.value}`;

//             const isChecked = Array.isArray(value)
//               ? value.includes(opt.value)
//               : false;

//             return (
//               <label
//                 key={i}
//                 htmlFor={id}
//                 className="flex items-center gap-2 cursor-pointer"
//               >

//                 <input
//                   id={id}
//                   type="checkbox"
//                   checked={isChecked}
//                   // onChange(section, name, opt.value, field)
//                   onChange={() => onChange(section, subSection, name, opt.value, field)}
//                   className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
//                 />

//                 <span className="text-sm text-gray-700">
//                   {opt.label}
//                 </span>

//               </label>
//             );
//           })}

//         </div>
//       )}

//       {field.type === "button" && (

//         <div className="flex items-end">

//           <button
//             type="button"
//             onClick={() =>
//               field.onClick?.({
//                 section,
//                 name,
//                 formData,
//                 setFormData
//               })
//             }
//             className={`
//         px-8 py-2
//         rounded-md
//         text-base font-medium
//          hover:bg-primary-dark
//         active:scale-95
//         transition-all
//         ${field.variant === "secondary"
//                 ? "bg-gray-500 text-white hover:bg-gray-600"
//                 : "bg-primary text-white hover:bg-primary-dark"}
//       `}
//           >

//             {field.label}

//           </button>

//         </div>

//       )}
//       {/* INPUT */}
//       {["text", "date", "email", "tel"].includes(field.type) && (
//         <input
//           type={field.type}
//           value={value || ""}
//           className={commonClass}
//           onChange={handleChange}
//           placeholder={field.placeholder || ""}
//           disabled={isDisabled}
//         />
//       )}
//       {/* SEARCH FIELD */}
//       {/* {field.type === "search" && (
//         <div className="relative" ref={wrapperRef}>

//           <input
//             type="text"
//             value={value || ""}
//             className={commonClass}
//             placeholder={field.placeholder || "Search..."}
//             onFocus={() => {
//               // fetch all values when clicked
//               field.onSearch?.({
//                 searchKey: field.searchValue,
//                 searchText: "",
//                 section,
//                 name
//               });
//             }}

//             onChange={(e) => {

//               const val = e.target.value;

//               onChange(section, name, val, field);

//               if (val.length > 0) {
//                 field.onSearch?.({
//                   searchKey: field.searchValue,
//                   searchText: val,
//                   section,
//                   name
//                 });
//               }

//             }}
//           />

//           <div className="relative">
//             <TextSearch />
//           </div>

//           {searchResults.length > 0 && (
//             <div className="absolute z-50 bg-white w-full rounded shadow max-h-40 overflow-auto">

//               {searchResults.map((item, index) => (

//                 <div
//                   key={index}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     onChange(section, name, item, field);
//                     setSearchResults(prev => ({
//                       ...prev,
//                       [`${section}.${name}`]: []
//                     }));



//                   }}

//                 >
//                   {item}
//                 </div>

//               ))}

//             </div>
//           )}

//         </div>
//       )} */}
// {field.type === "search" && (
//   <div className="relative w-full" ref={wrapperRef}>

//     {/* Input Wrapper */}
//     <div className="relative">

//       {/* Search Icon */}
//       <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
//         <TextSearch size={20} />
//       </div>

//       {/* Input */}
//       <input
//         type="text"
//         value={value || ""}
//         placeholder={field.placeholder || "Search..."}
//         disabled={isDisabled}
//         className={commonClass}
//         onFocus={() => {
//           field.onSearch?.({
//             searchKey: field.searchValue,
//             searchText: "",
//             section,
//             subSection,
//             name
//           });
//         }}
//         onChange={(e) => {
//           const val = e.target.value;

//           // onChange(section, name, val, field);
//           onChange(section, subSection, name, val, field);

//           field.onSearch?.({
//             searchKey: field.searchValue,
//             searchText: val,
//             section,
//             name
//           });
//         }}
//       />
//     </div>

//     {/* Dropdown */}
//     {searchResults?.[`${section}.${name}`]?.length > 0 && (
//       <div
//         className="absolute mt-1 w-full z-50 bg-white border border-muted 
//         rounded-lg shadow-md max-h-48 overflow-y-auto custom-scrollbar"
//       >
//         {searchResults[`${section}.${name}`].map((item) => (
//           <div
//             key={item.value}
//             className="
//               px-4 py-2 text-sm
//               cursor-pointer
//               transition-all duration-150 ease-in-out
//               hover:text-primary
//               hover:bg-[#7a809660]
//             "
//             onClick={() => {
//               // ✅ Put selected label in input
//               // onChange(section, name, item.label, field);
//               onChange(section, subSection, name, item.label, field);

//               // ✅ Optional: store value separately if needed
//               // setFormData(prev => ({
//               //   ...prev,
//               //   [`${name}_code`]: item.value
//               // }));

//               // ✅ Clear dropdown
//               setSearchResults(prev => ({
//                 ...prev,
//                 [`${section}.${name}`]: []
//               }));
//             }}
//           >
//             {item.label}
//           </div>
//         ))}
//       </div>
//     )}

//   </div>
// )}
//       {error && (
//         <span className="text-error text-xs">
//           {error}
//         </span>
//       )}

//     </div>
//   );
// };

// export default DynamicField;


import React, { useRef, useEffect } from "react";
import { Upload, TextSearch } from "lucide-react";

const DynamicField = ({
  section,
  subSection = "",
  name,
  field,
  value,
  error,
  onChange,
  formData,
  hide,
  setFormData,
  searchResults = {},
  setSearchResults
}) => {
const [isOptionSelected, setIsOptionSelected] = useState(false);
  const wrapperRef = useRef(null);

  // ✅ Safe subsection
  const safeSubSection = subSection || "";

  // ✅ Generate search key
  const searchKey = safeSubSection
    ? `${section}.${safeSubSection}.${name}`
    : `${section}.${name}`;

  console.log(searchKey);
  // Close dropdown on outside click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {

        setSearchResults(prev => ({
          ...prev,
          [searchKey]: []
        }));

      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [searchKey, setSearchResults]);

  const sectionData = formData?.[section] || {};

  const isRequired =
    typeof field.required === "function"
      ? field.required(sectionData)
      : field.required;

  const commonClass = `
    w-full px-4 py-2 border rounded-lg
    ${error
      ? "border-error focus:outline-none focus:ring-1 focus:ring-error focus:border-error"
      : "border-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
    }`;

  // const handleChange = (e) => {

  //   const val =
  //     field.type === "file"
  //       ? e.target.files[0]
  //       : e.target.value;

  //   onChange(section, name, val, field);

  // };

  const handleChange = (e, optionValue = null) => {

    let val;

    switch (field.type) {

      case "file":
        val = e.target.files?.[0] || null;
        break;

      case "checkbox":

        let currentValues = Array.isArray(value) ? [...value] : [];

        if (e.target.checked) {
          currentValues.push(optionValue);
        } else {
          currentValues = currentValues.filter(v => v !== optionValue);
        }

        val = currentValues;
        break;

      case "radio":
        val = e.target.value;
        break;

      case "search":
        val = e.target.value;
        break;

      default:
        val = e.target.value;

    }

    onChange(section, safeSubSection, name, val, field);
  };
  const isDisabled =
    safeSubSection === "presentAddress" &&
    name !== "sameAsPermanent" &&
    formData?.[section]?.presentAddress?.sameAsPermanent === "yes";

  if (field.hide) return null;

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium">
        {field.type === "button" ? "" : field.label}
        {isRequired && (
          <span className="text-error ml-1">*</span>
        )}
      </label>

      {/* SELECT */}
      {field.type === "select" && (
        <select
          className={commonClass}
          value={value || ""}
          onChange={handleChange}
        >
          {field.options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* FILE */}
      {field.type === "file" && (

        <div className="w-full">

          <input
            type="file"
            accept={field.accept}
            id={`${section}-${safeSubSection}-${name}`}
            className="hidden"
            onChange={handleChange}
          />

          <label
            htmlFor={`${section}-${safeSubSection}-${name}`}
            className={`${commonClass} flex items-center justify-between cursor-pointer`}
          >

            <div className="flex items-center gap-2 py-1">

              <Upload className="w-4 h-4 text-gray-500" />

              <span className="text-xs text-gray-700 truncate max-w-[200px]">
                {value?.name || field.placeholder || "Choose file"}
              </span>

            </div>

            <span className="text-xs text-gray-500">
              Browse
            </span>

          </label>

        </div>

      )}

      {/* RADIO */}
      {field.type === "radio" && (

        <div className="flex gap-6 mt-1">

          {field.options
            .filter(opt => opt.value !== "")
            .map((opt, i) => {

              const id = `${section}-${name}-${opt.value}`;

              return (

                <label
                  key={i}
                  htmlFor={id}
                  className="flex items-center gap-2 cursor-pointer"
                >

                  <input
                    id={id}
                    type="radio"
                    name={`${section}-${name}`}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-muted focus:ring-primary"
                  />

                  <span className="text-sm">
                    {opt.label}
                  </span>

                </label>

              );

            })}

        </div>

      )}

      {/* CHECKBOX */}
      {field.type === "checkbox" && (
        <div className="flex flex-col gap-3 mt-2">

          {(field.options || []).map((opt, i) => {

            const id = `${section}-${name}-${opt.value}`;

            const isChecked = Array.isArray(value)
              ? value.includes(opt.value)
              : false;

            return (
              <label
                key={i}
                htmlFor={id}
                className="flex items-center gap-2 cursor-pointer"
              >

                <input
                  id={id}
                  type="checkbox"
                  checked={isChecked}
                  // onChange={(e) => {

                  //   let newValue = Array.isArray(value) ? [...value] : [];

                  //   if (e.target.checked) {
                  //     newValue.push(opt.value);
                  //   } else {
                  //     newValue = newValue.filter(v => v !== opt.value);
                  //   }

                  //   onChange(section, name, newValue, field);
                  // }}
                  onChange={(e) => handleChange(e, opt.value)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />

                <span className="text-sm text-gray-700">
                  {opt.label}
                </span>

              </label>
            );
          })}

        </div>
      )}

      {/* BUTTON */}
      {field.type === "button" && (

        <div className="flex items-end">

          <button
            type="button"
            onClick={() =>
              field.onClick?.({
                section,
                subSection: safeSubSection,
                name,
                formData,
                setFormData
              })
            }
            className={`
              px-8 py-2
              rounded-md
              text-base font-medium
              hover:bg-primary-dark
              active:scale-95
              transition-all
              ${field.variant === "secondary"
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-primary text-white hover:bg-primary-dark"}
            `}
          >
            {field.label}
          </button>

        </div>

      )}

      {/* INPUT */}
      {["text", "date", "email", "tel"].includes(field.type) && (

        <input
          type={field.type}
          value={value || ""}
          className={commonClass}
          onChange={handleChange}
          placeholder={field.placeholder || ""}
          disabled={isDisabled}
        />

      )}

      {/* SEARCH */}
      {field.type === "search" && (

        <div className="relative w-full" ref={wrapperRef}>

          <div className="relative">

            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <TextSearch size={20} />
            </div>

            <input
              type="text"
              value={value || ""}
              placeholder={field.placeholder || "Search..."}
              disabled={isDisabled}
              className={commonClass}

              onFocus={() => {
                field.onSearch?.({
                  searchKey: field.searchValue,
                  searchText: "",
                  section,
                  subSection: safeSubSection,
                  name
                });
              }}

              onChange={(e) => {

                const val = e.target.value;

                handleChange(e);

                field.onSearch?.({
                  searchKey: field.searchValue,
                  searchText: val,
                  section,
                  subSection: safeSubSection,
                  name
                });

              }}
              onBlur={() => {
                if (field.required && !searchResults?.[searchKey]?.some(i => i.label === value)) {
                  onChange(section, safeSubSection, name, "", field);
                }
              }}
            />

          </div>

          {searchResults?.[searchKey]?.length > 0 && (

            <div className="absolute mt-1 w-full z-50 bg-white border border-muted rounded-lg shadow-md max-h-48 overflow-y-auto">

              {searchResults[searchKey].map((item) => (

                <div
                  key={item.value}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {

                    if (subSection) {

                      onChange(section, subSection, name, item.label, field);

                    } else {
                      onChange(section, name, item.label, field);
                    }


                    setSearchResults(prev => ({
                      ...prev,
                      [searchKey]: []
                    }));

                  }}
                >
                  {item.label}
                </div>

              ))}

            </div>

          )}

        </div>

      )}

      {error && (
        <span className="text-error text-xs">
          {error}
        </span>
      )}

    </div>
  );
};

export default DynamicField;
// const DynamicField = ({
//   section,
//   name,
//   field,
//   value,
//   error,
//   onChange
// }) => {

//   const commonClass = `
//     w-full px-4 py-2 border rounded-lg
//     ${error ? "border-error focus:outline-none focus:ring-1 focus:ring-error focus:border-error" 
//       : "border-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"

//     }`;

//   const handleChange = (e) => {
//     const val =
//       field.type === "file"
//         ? e.target.files[0]
//         : e.target.value;

//     onChange(section, name, val, field);
//   };

//   return (
//     <div className="flex flex-col gap-1">

//       <label className="text-sm font-medium">
//         {field.label}
//         {field.required && (
//           <span className="text-red-500 ml-1">*</span>
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

//       {/* FILE */}
//       {field.type === "file" && (
//         <input
//           type="file"
//           accept={field.accept}
//           className={commonClass}
//           onChange={handleChange}
//           placeholder={field.placeholder || ""}
//         />
//       )}

//       {/* INPUT */}
//       {["text", "date", "email", "tel"].includes(field.type) && (
//         <input
//           type={field.type}
//           value={value || ""}
//           className={commonClass}
//           onChange={handleChange}
//           placeholder={field.placeholder || ""}
//         />
//       )}

//       {error && (
//         <span className="text-error text-xs">
//           {error}
//         </span>
//       )}
//     </div>
//   );
// };

// export default DynamicField;


import { Upload } from "lucide-react";

const DynamicField = ({
  section,
  name,
  field,
  value,
  error,
  onChange,
  formData,
  hide
}) => {

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

  const handleChange = (e) => {
    const val =
      field.type === "file"
        ? e.target.files[0]
        : e.target.value;

    onChange(section, name, val, field);
  };

  const isDisabled =
  section === "presentAddress" &&
  name !== "sameAsPermanent" &&
  formData?.presentAddress?.sameAsPermanent === "yes";

  if (field.hide) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">

      {/* <label className="text-sm font-medium">
        {field.label}
        {field.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label> */}
      <label className="text-sm font-medium">
        {field.label}
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

      {/* FILE (NEW PROFESSIONAL DESIGN) */}
      {field.type === "file" && (
        <div className="w-full">

          {/* Hidden real input */}
          <input
            type="file"
            accept={field.accept}
            id={`${section}-${name}`}
            className="hidden"
            onChange={handleChange}
          />

          {/* Custom UI */}
          <label
            htmlFor={`${section}-${name}`}
            className={`${commonClass} flex items-center justify-between cursor-pointer transition`}
          >

            {/* Left side */}
            <div className="flex items-center gap-2 py-1">

              <Upload className="w-4 h-4 text-gray-500" />

              <span className="text-xs text-gray-700 truncate max-w-[200px]">
                {value?.name || field.placeholder || "Choose file"}
              </span>

            </div>

            {/* Right side */}
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
            .filter(opt => opt.value !== "") // optional: remove Select option
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

      {error && (
        <span className="text-error text-xs">
          {error}
        </span>
      )}

    </div>
  );
};

export default DynamicField;


import React, { useRef, useEffect } from "react";
import { Upload, TextSearch } from "lucide-react";

const DynamicField = ({
  section,
  subSection,
  name,
  field,
  value,
  error,
  onChange,
  formData,
  hide,
  setFormData,
  searchResults = [],
  setSearchResults
}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchResults(prev => ({
          ...prev,
          [`${section}.${name}`]: []
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [section, name, setSearchResults]);

  // console.log("Dynamic Field:", section, name, field, value, error);

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
    subSection === "presentAddress" &&
    name !== "sameAsPermanent" &&
    formData?.[section]?.presentAddress?.sameAsPermanent === "yes";
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

      {/* FILE (NEW PROFESSIONAL DESIGN) */}
      {field.type === "file" && (
        <div className="w-full">

          {/* Hidden real input */}
          <input
            type="file"
            accept={field.accept}
            id={`${section}-${subSection}-${name}`}
            className="hidden"
            onChange={handleChange}
          />

          {/* Custom UI */}
          <label
            htmlFor={`${section}-${subSection}-${name}`}
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
                  onChange={() => onChange(section, name, opt.value, field)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />

                <span className="text-sm text-gray-700">
                  {opt.label}
                </span>

              </label>
            );
          })}

        </div>
      )}

      {field.type === "button" && (

        <div className="flex items-end">

          <button
            type="button"
            onClick={() =>
              field.onClick?.({
                section,
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
      {/* SEARCH FIELD */}
      {/* {field.type === "search" && (
        <div className="relative" ref={wrapperRef}>

          <input
            type="text"
            value={value || ""}
            className={commonClass}
            placeholder={field.placeholder || "Search..."}
            onFocus={() => {
              // fetch all values when clicked
              field.onSearch?.({
                searchKey: field.searchValue,
                searchText: "",
                section,
                name
              });
            }}

            onChange={(e) => {

              const val = e.target.value;

              onChange(section, name, val, field);

              if (val.length > 0) {
                field.onSearch?.({
                  searchKey: field.searchValue,
                  searchText: val,
                  section,
                  name
                });
              }

            }}
          />

          <div className="relative">
            <TextSearch />
          </div>
          
          {searchResults.length > 0 && (
            <div className="absolute z-50 bg-white w-full rounded shadow max-h-40 overflow-auto">

              {searchResults.map((item, index) => (

                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onChange(section, name, item, field);
                    setSearchResults(prev => ({
                      ...prev,
                      [`${section}.${name}`]: []
                    }));



                  }}

                >
                  {item}
                </div>

              ))}

            </div>
          )}

        </div>
      )} */}

      {field.type === "search" && (
        <div className="relative w-full" ref={wrapperRef}>

          {/* Input Wrapper */}
          <div className="relative">

            {/* Search Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <TextSearch size={20} />
            </div>

            {/* Input */}
            <input
              type="text"
              value={value || ""}
              placeholder={field.placeholder || "Search..."}
              disabled={isDisabled}
              className={`${commonClass}`}
              onFocus={() => {
                field.onSearch?.({
                  searchKey: field.searchValue,
                  searchText: "",
                  section,
                  name
                });
              }}
              onChange={(e) => {
                const val = e.target.value;

                onChange(section, name, val, field);

                field.onSearch?.({
                  searchKey: field.searchValue,
                  searchText: val,
                  section,
                  name
                });
              }}
            />

          </div>

          {/* Dropdown */}
          {searchResults?.length > 0 && (
            <div className="absolute mt-1 w-full z-50 bg-white border border-muted 
            rounded-lg shadow-md max-h-48 overflow-y-auto custom-scrollbar">
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className="
                    px-4 py-2 text-sm
                    cursor-pointer
                    transition-all duration-150 ease-in-out
                    hover:text-primary
                    hover:bg-[#7a809660]
                  "
                  onClick={() => {
                    onChange(section, name, item, field);

                    setSearchResults(prev => ({
                      ...prev,
                      [`${section}.${name}`]: []
                    }));
                  }}
                >
                  {item}
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

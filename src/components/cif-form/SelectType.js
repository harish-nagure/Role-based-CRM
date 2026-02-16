import React, { useState } from "react";

const SelectType = ({ onSubmit }) => {

    const [functionType, setFunctionType] = useState("");
    const [cifNumber, setCifNumber] = useState("");
    const [errors, setErrors] = useState({});

    const functionTypeOptions = [
        { code: "A", label: "Add" },
        { code: "P", label: "Modify" },
        { code: "B", label: "Bulk Modify" },
        { code: "X", label: "Cancel" },
        { code: "V", label: "Verify" },
        { code: "I", label: "Inquiry" }
    ];

    const cifRequiredTypes = ["P", "B", "X", "V", "I"];

    /* ================= VALIDATE ================= */

    const handleGo = () => {

        const newErrors = {};

        if (!functionType)
            newErrors.functionType = "Function Type is required";

        if (cifRequiredTypes.includes(functionType)) {

            if (!cifNumber)
                newErrors.cifNumber = "CIF Number is required";

            else if (!/^\d{6,}$/.test(cifNumber))
                newErrors.cifNumber = "Minimum 6 digits required";

        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            onSubmit({
                functionType,
                cifNumber
            });

        }

    };

    const handleClear = () => {

        setFunctionType("");
        setCifNumber("");
        setErrors({});

        onSubmit({
            functionType: "",
            cifNumber: ""
        });

    };

    /* ================= UI ================= */

    return (

        <div className="w-full">

            {/* Header */}
            <h2 className="text-2xl text-primary font-semibold mb-6 border-b border-primary-light pb-2">
                CRM-CIF Retail Customer
            </h2>


            {/* Inputs Row */}
            <div className="flex items-start gap-6">

                {/* Function Type */}
                <div className="flex flex-col w-[260px]">

                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Function Type <span className="text-red-500">*</span>
                    </label>

                    <select
                        value={functionType}
                        onChange={(e) => {
                            setFunctionType(e.target.value);
                            setCifNumber("");
                            setErrors({});
                        }}
                        className={`
                            w-full h-[42px] px-4 border rounded-lg bg-white focus:outline-none focus:ring-1 transition
                            ${errors.functionType
                                ? "border-error focus:ring-error focus:border-error"
                                : "border-muted focus:ring-primary focus:border-primary"
                            }
                        `}
                    >

                        <option value="">
                            Select Function Type
                        </option>

                        {functionTypeOptions.map(item => (
                            <option key={item.code} value={item.code}>
                                {item.code} — {item.label}
                            </option>
                        ))}

                    </select>

                    <div className="h-[16px] mt-1">
                        {errors.functionType && (
                            <span className="text-error text-xs">
                                {errors.functionType}
                            </span>
                        )}
                    </div>

                </div>


                {/* CIF Number */}
                <div className="flex flex-col w-[260px]">

                    <label className="text-sm font-medium text-gray-700 mb-1">
                        CIF Number
                        {cifRequiredTypes.includes(functionType) &&
                            <span className="text-red-500"> *</span>
                        }
                    </label>

                    <input
                        value={cifNumber}
                        onChange={(e) =>
                            setCifNumber(e.target.value)
                        }
                        placeholder="Enter CIF Number"
                        disabled={!cifRequiredTypes.includes(functionType)}
                        className={`
                            w-full h-[42px] px-4 border rounded-lg bg-white focus:outline-none
                            focus:ring-1 transition disabled:bg-gray-100 disabled:cursor-not-allowed
                            ${errors.cifNumber
                                ? "border-error focus:ring-error focus:border-error"
                                : "border-muted focus:ring-primary focus:border-primary"
                            }
                        `}
                    />

                    <div className="h-[16px] mt-1">
                        {errors.cifNumber && (
                            <span className="text-error text-xs">
                                {errors.cifNumber}
                            </span>
                        )}
                    </div>

                </div>

            </div>


            {/* Buttons */}
            <div className="mt-4 flex items-center">

                <button
                    onClick={handleGo}
                    className="
                        px-8 py-2.5 bg-primary-light hover:bg-primary text-white font-medium rounded-lg shadow-sm transition"
                >
                    Check
                </button>

                <button
                    onClick={handleClear}
                    className="ml-4 px-6 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition"
                >
                    Clear
                </button>

            </div>

        </div>

    );

};

export default SelectType;
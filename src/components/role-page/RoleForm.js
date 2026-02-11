import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  Type,
  AlignLeft,
  AlertCircle
} from "lucide-react";

const RoleForm = ({ open, onClose, onSubmit, role }) => {

  /* ================= STATE ================= */
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({
        name: role?.name || "",
        description: role?.description || "",
      });
      setErrors({});
    }
  }, [role, open]);

  if (!open) return null;

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Role name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Role name must be at least 3 characters";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear field error while typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // onSubmit(form); 
    onSubmit({
    id: role?.id,
    name: form.name,
    description: form.description,
  });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-background w-full max-w-lg rounded-lg shadow-xl border border-border">

        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-lg font-semibold">
              {role ? "Edit Role" : "Create New Role"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-muted hover:text-text transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Role Name */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Role Name <span className="text-error">*</span>
            </label>

            <div className="relative">
              <Type className="absolute left-3 top-3 text-muted w-4 h-4" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="System Administrator"
                className={`w-full pl-10 pr-4 py-2 rounded-md bg-input border 
                  ${errors.name ? "border-error" : "border-border"}
                  focus:ring-1 focus:ring-primary focus:outline-none`}
              />
            </div>

            {errors.name && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Description <span className="text-error">*</span>
            </label>

            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 text-muted w-4 h-4" />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe role responsibilities"
                rows="3"
                className={`w-full pl-10 pr-4 py-2 rounded-md bg-input border 
                  ${errors.description ? "border-error" : "border-border"}
                  focus:ring-1 focus:ring-primary focus:outline-none resize-none`}
              />
            </div>

            {errors.description && (
              <p className="text-error text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-border text-text hover:bg-input transition"
            >
              Cancel
            </button>

            <button
                title={`${role ? "Update Role" : "Create Role"}`}
              type="submit"
              className="px-5 py-2 rounded-md bg-primary-light hover:bg-foreground text-inverse font-semibold transition"
            >
              {role ? "Update Role" : "Create Role"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RoleForm;

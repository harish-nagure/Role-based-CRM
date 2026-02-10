import { useState } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
  RotateCcw
} from "lucide-react";

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    username: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    const newErrors = {};

    if (!formData.firstname)
      newErrors.firstname = "First name is required";

    if (!formData.lastname)
      newErrors.lastname = "Last name is required";

    if (!formData.emailid) {
      newErrors.emailid = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailid)) {
      newErrors.emailid = "Enter a valid email address";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Minimum 4 characters required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters required";
    }

    if (!formData.role)
      newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Create User Payload:", formData);
  };

  const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      emailid: "",
      username: "",
      password: "",
      role: "",
    });
    setErrors({});
  };

  return (
    
    <div className="min-h-screen bg-secondary p-8">
      <div className="mx-auto bg-background rounded-lg shadow-lg p-8 space-y-6">
        

      {/* HEADER */}
      <div className="flex items-start gap-4 mb-10">
        <div className="p-3 bg-secondary rounded-xl">
          <UserPlus className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-text">
            Create New Account
          </h2>
          <p className="text-muted mt-1">
            Add a new user to the system with role-based access
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-10">

        {/* First Name + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium">
              First Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              className={`w-full mt-2 rounded-lg border px-4 py-3 bg-input
                ${errors.firstname ? "border-error" : "border-border"}
                focus:ring-1 focus:ring-primary`}
            />
            {errors.firstname && (
              <p className="text-error text-xs mt-1">{errors.firstname}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">
              Last Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className={`w-full mt-2 rounded-lg border px-4 py-3 bg-input
                ${errors.lastname ? "border-error" : "border-border"}
                focus:ring-1 focus:ring-primary`}
            />
            {errors.lastname && (
              <p className="text-error text-xs mt-1">{errors.lastname}</p>
            )}
          </div>
        </div>

        {/* Email + Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium">
              Email <span className="text-error">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.emailid}
              onChange={(e) =>
                setFormData({ ...formData, emailid: e.target.value })
              }
              className={`w-full mt-2 rounded-lg border px-4 py-3 bg-input
                ${errors.emailid ? "border-error" : "border-border"}
                focus:ring-1 focus:ring-primary`}
            />
            {errors.emailid && (
              <p className="text-error text-xs mt-1">{errors.emailid}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">
              User Role <span className="text-error">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className={`w-full mt-2 rounded-lg border px-4 py-3 bg-input
                ${errors.role ? "border-error" : "border-border"}
                focus:ring-1 focus:ring-primary`}
            >
              <option value="">Choose a role</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="USER">User</option>
            </select>
            {!errors.role && (
            <p className="text-xs text-muted mt-1">
              Select the appropriate role for this user
            </p>)}
            {errors.role && (
              <p className="text-error text-xs mt-1">{errors.role}</p>
            )}
          </div>
        </div>

        {/* Username + Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium">
              Username <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={`w-full mt-2 rounded-lg border px-4 py-3 bg-input
                ${errors.username ? "border-error" : "border-border"}
                focus:ring-1 focus:ring-primary`}
            />
            {!errors.role && (
            <p className="text-xs text-muted mt-1">
              Minimum 4 characters, alphanumeric
            </p>)}
            {errors.username && (
              <p className="text-error text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">
              Password <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full mt-2 rounded-lg border px-4 py-3 pr-10 bg-input
                  ${errors.password ? "border-error" : "border-border"}
                  focus:ring-1 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {!errors.role && (
            <p className="text-xs text-muted mt-1">
              Minimum 8 characters required
            </p>
          )}       
            {errors.password && (
              <p className="text-error text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 pt-6 border-t border-border">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary-light text-inverse px-6 py-3 rounded-lg hover:bg-primary transition"
          >
            <UserPlus size={16} />
            Create Account
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 text-muted hover:text-primary transition"
          >
            <RotateCcw size={16} />
            Reset Form
          </button>
        </div>

      </form>

    </div>
    </div>
  );
};

export default CreateUser;

import React from "react";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  UserPlus,
  RotateCcw
} from "lucide-react";
import { fetchAllRoles, createUser, updateUser } from "../../api.auth";

const CreateUser = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    username: "",
    password: "",
    roleId: null,
  });
  const location = useLocation();
  const editUser = location.state?.user;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await fetchAllRoles();
        console.log(res.data);
        setRoles(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    loadRoles();
  }, [])

  useEffect(() => {
    if (editUser) {
      setFormData({
        id: editUser.id,
        firstname: editUser.firstname,
        lastname: editUser.lastname,
        emailid: editUser.emailid,
        username: editUser.username,
        password: "",
        roleId: editUser.role?.id ? Number(editUser.role.id) : null,
      });
    }
  }, [editUser]);

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

    if (!formData.password && !editUser) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8 && !editUser) {
      newErrors.password = "Minimum 8 characters required";
    }

    if (!formData.roleId)
      newErrors.roleId = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Create User Payload:", formData);



    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      emailid: formData.emailid,
      username: formData.username,
      roleId: Number(formData.roleId),
      ...(!editUser && { password: formData.password })
      // ❌ DO NOT send password if unchanged
    };
    try {
      // const res = await createUser(payload);
      const res = editUser ?
        await updateUser(formData.id, payload)
        : await createUser(payload);
      console.log(res);
      alert(res.message);
      navigate('/dashboard/users');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
      console.error(error);

    }

  };

  const handleReset = () => {
    setFormData({
      id: "",
      firstname: "",
      lastname: "",
      emailid: "",
      username: "",
      password: "",
      roleId: null,
    });
    setErrors({});
  };




  return (

    <div className="bg-secondary px-8 pt-8">
      <div className="min-h-[85vh] mx-auto bg-background rounded-lg shadow-lg p-8 space-y-6">

        {/* HEADER */}
        <div className="flex items-start gap-4 mb-10">
          <div className="p-3 bg-secondary rounded-xl">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text">
              {!editUser ? 'Create New' : 'Update'} Account
            </h2>
            <p className="text-muted mt-1">
              {!editUser ? 'Add' : 'Update'} a new user to the system with role-based access
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}
          className="custom-scrollbar space-y-10 max-h-[60vh] overflow-y-auto pr-2"
        >

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
                value={formData.roleId}
                onChange={(e) =>
                  setFormData({ ...formData, roleId: Number(e.target.value) })
                }
                className={`w-full mt-2 rounded-lg border px-4 py-3 bg-input
                ${errors.role ? "border-error" : "border-border"}
                focus:ring-1 focus:ring-primary`}
              >
                <option value="">Choose a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
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
                  disabled={editUser}
                  className={`w-full mt-2 rounded-lg border px-4 py-3 pr-10 bg-input
                  ${errors.password ? "border-error" : "border-border"}
                  focus:ring-1 focus:ring-primary
                  ${editUser ? "opacity-60 cursor-not-allowed" : ""}`}
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
              {!editUser ? 'Create' : 'Update'} Account
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

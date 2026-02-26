import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { login } from "../../api/api.auth"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchMenusByRole } from "../../api/api.auth";  

// Important for login navigation: Find the first accessible menu and navigate to it
const findFirstAccessibleMenu = (menus) => {
  for (const menu of menus) {
    if (menu.canRead && menu.path) {
      return menu;
    }

    if (menu.children && menu.children.length > 0) {
      const childMenu = findFirstAccessibleMenu(menu.children);
      if (childMenu) return childMenu;
    }
  }

  // Nothing found
  return null;
};


const Login = () => {
  const { loginUser } = useAuth();
  const { menus } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      username: formData.username,
      password: formData.password,
    };

    console.log("Login Payload:", payload);
    try {
      const res = await login(payload);

      console.log(res);

      await loginUser({
        token: res.token,
        role: res.role,
        roleId: res.roleId,
      });

      alert("Login successful!" + (res.role ? ` Logged in as ${res.role}` : ""));

      try {

        const response = await fetchMenusByRole(res.roleId);
        console.log(response.data);
        const menuToNavigate = findFirstAccessibleMenu(response.data || menus);
        console.log("First accessible menu:", menuToNavigate);
        if (menuToNavigate) {
          navigate(`/dashboard/${menuToNavigate.path}`);
        } else {
          alert("No accessible menu found!");
        }
      } catch (error) {
        console.log(error);
      }


    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong";
      setErrors({
        form: message
      });
      alert(message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-serif text-primary">
            CRM Login
          </h1>
          {/* <p className="text-sm text-muted mt-1">
            Secure Access Control Management
          </p> */}
          {errors.form && (
            <p className="text-error text-sm mt-1">
              {errors.form}
            </p>
          )}
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Username <span className="text-error">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter your user name"
              className={`w-full px-4 py-3 rounded-md bg-input border ${errors.username ? "border-error" : "border-border"
                } focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.username && (
              <p className="text-error text-xs mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Password <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-md bg-input border ${errors.password ? "border-error" : "border-border"
                  } focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-muted"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-primary-light hover:bg-foreground text-inverse font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Security Info */}
        {/* <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-success" />
            <div>
              <p className="font-medium text-text">SSL Encrypted</p>
              <p className="text-xs">256-bit encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" />
            <div>
              <p className="font-medium text-text">Secure Access</p>
              <p className="text-xs">Role-based authentication</p>
            </div>
          </div>
        </div> */}

        {/* <div className="mt-5 flex justify-center text-sm text-muted">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <p className="font-medium text-text">Verified</p>
              <p className="text-xs">Enterprise grade security</p>
            </div>
          </div>
        </div> */}

        <button
          type="submit"
          onClick={() => { navigate("/dashboard/forms") }}
          className="w-full py-3 rounded-md bg-primary-light hover:bg-foreground text-inverse font-semibold transition"
        >
          CIF FORMS
        </button>

      </div>
    </div>
  );
};

export default Login;

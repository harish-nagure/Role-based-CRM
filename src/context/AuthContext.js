import { createContext, useContext, useEffect, useState } from "react";
import { fetchMenusByRole } from "../api.auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== LOGIN ===== */
  const loginUser = async ({ token, role }) => {
    console.log(role," dsf ",token)
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);

    setToken(token);
    setRole(role);

    const menuRes = await fetchMenusByRole(role);
    setMenus(menuRes);
    setLoading(false);
  };

  /* ===== RESTORE SESSION ===== */
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");

    if (!storedToken || !storedRole) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    setRole(storedRole);

    fetchMenusByRole(storedRole)
      .then(setMenus)
      .finally(() => setLoading(false));
  }, []);

  /* ===== LOGOUT ===== */
  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setRole(null);
    setMenus([]);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, menus, loading, loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

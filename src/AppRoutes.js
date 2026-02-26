import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

/* ---------- PUBLIC ---------- */
import Login from "./components/login-page/Login";
import NotFound from "./components/NotFound";

/* ---------- LAYOUT ---------- */
import DashboardLayout from "./components/dashboard/DashboardLayout";

/* ---------- PAGES ---------- */
// import Dashboard from "./components/dashboard/Dashboard";
import UserConfigurationPage from "./components/user-page/UserConfigurationPage";
import CreateUser from "./components/user-page/CreateUser";
import RoleConfigurationPage from "./components/role-page/RoleConfigurationPage";
import MenuAccessControl from "./components/menu-premission/MenuAccessControl";

//Retail
import CIFRForm from "./components/cif-form/retail/CIFRForm";
import CIFRFieldAccessControl from "./components/cif-form/retail/CIFRFieldAccessControl";

//Corporate
import CIFCForm from "./components/cif-form/corporate/CIFCForm";
import CIFCFieldAccessControl from "./components/cif-form/corporate/CIFCFieldAccessControl";


/* ---------- PATH → COMPONENT MAP ---------- */
const COMPONENT_MAP = {
  // main: Dashboard,
  "users": UserConfigurationPage,
  "create-user": CreateUser,
  "roles": RoleConfigurationPage,
  "menu-access": MenuAccessControl,
  // retail
  "cifr-form": CIFRForm,
  "cifr-field-access": CIFRFieldAccessControl,
  "r-a-add": CIFRForm,
  "r-p-modify": CIFRForm,
  "r-b-modify":CIFRForm,
  "r-v-verify": CIFRForm,
  "r-x-cancel": CIFRForm,
  "r-i-inquire":CIFRForm,

  // corporate
  "cifc-field-access":CIFCFieldAccessControl,
  "c-a-add":CIFCForm,
  "c-p-modify":CIFCForm,
  "c-b-modify":CIFCForm,
  "c-v-verify":CIFCForm,
  "c-x-cancel":CIFCForm,
  "c-i-inquiry":CIFCForm,

  
};

/* ---------- NOT AUTHORIZED ---------- */
// const NotAuthorized = () => (
//   <div className="h-screen flex items-center justify-center text-xl font-semibold">
//     ❌ You are not authorized to access this page
//   </div>
// );

/* ---------- FLATTEN MENU ---------- */
const flattenMenus = (menus = []) => {
  const result = [];

  menus.forEach(menu => {
    if (menu.path) result.push(menu);
    if (menu.children?.length) {
      result.push(...flattenMenus(menu.children));
    }
  });

  return result;
};

/* ---------- PROTECTED ROUTE ---------- */
const ProtectedRoute = ({ canRead, children }) => {
  return canRead ? children : <Navigate to="/not-authorized" replace />;
};

/* ---------- APP ROUTES ---------- */
const AppRoutes = () => {
  const { menus, loading } = useAuth();

  if (loading) return null;

  const flatMenus = flattenMenus(menus);

  console.log("Rutes: ", flatMenus);
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/login-screen" element={<Login />} />
        <Route path="/not-authorized" element={<NotFound />} />

        {/* ---------- DASHBOARD ---------- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
    
        {/* Demoo */}
        <Route path="forms" element={<CIFCForm />} />


          {flatMenus.map(menu => {
            const Component = COMPONENT_MAP[menu.path];
            if (!Component) return null;

            return (
              <Route
                key={menu.id}
                path={menu.path}
                element={
                  <ProtectedRoute canRead={menu.canRead}>
                    <Component canWrite={menu.canWrite} />
                  </ProtectedRoute>
                }
              />
            );
          })}

        </Route>



        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

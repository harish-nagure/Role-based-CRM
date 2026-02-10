import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from './components/login-page/Login';
import CreateUser from "./components/login-page/CreateUser";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import RoleConfigurationPage from "./components/role-page/RoleConfigurationPage";
import MenuAccessControl from "./components/menu-premission/MenuAccessControl"


const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = sessionStorage.getItem("userRole");

  if (!role) {
    console.log("sd", role)
    return <Navigate to="/login-screen" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/*" replace />;
  }

  return children;
};


const NotAuthorized = () => (
  <div className="h-screen flex items-center justify-center text-xl font-semibold">
    ❌ You are not authorized to access this page
  </div>
);

const Routes = () => {
  return (
    <>
    {/* <Sidebar/> */}
    {/* <BrowserRouter>
      <RouterRoutes>
  
        {/* Public Routes */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/login-screen" element={<Login />} />
        <Route path="create-user" element={<CreateUser/>}/>
        <Route path="dashboard" element={<DashboardLayout/>}/> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

        {/* Manager Only */}
        {/* <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route path */}
{/* 
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

      </RouterRoutes>
    </BrowserRouter> */} 

    <BrowserRouter>
  <RouterRoutes>

    {/* Public */}
    <Route path="/" element={<Login />} />
    <Route path="/login-screen" element={<Login />} />

    {/* Dashboard Layout */}
    <Route path="dashboard" element={<DashboardLayout />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      <Route path="create-user" element={<CreateUser />} />
       <Route path="roles" element={<RoleConfigurationPage />} />
       <Route path="menu-access" element={<MenuAccessControl/>}/>
       
      {/*<Route path="settings" element={<Settings />} /> */}
    </Route>

    <Route path="*" element={<NotFound />} />
  </RouterRoutes>
</BrowserRouter>

    </>
  );
};

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       {/* <ErrorBoundary> */}
//       {/* <ScrollToTop /> */}
//       <RouterRoutes>
//         {/* Define your route here */}
//         <Route path="/" element={<Login />} />
//         <Route path="*" element={<NotFound />} />
//       </RouterRoutes>
//       {/* </ErrorBoundary> */}
//     </BrowserRouter>
//   );
// };

export default Routes;

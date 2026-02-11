import { Outlet } from "react-router-dom";
import Sidebar from "../navagation/Siderbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-secondary">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};


export default DashboardLayout;

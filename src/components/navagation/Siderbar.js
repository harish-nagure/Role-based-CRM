import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Shield,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
// import { useMenu } from "../../context/MenuContext";
import { useAuth } from "../../context/AuthContext";

const iconMap = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  UserPlus: <UserPlus size={18} />,
  Shield: <Shield size={18} />,
};

// const Navigation = ({ collapsed }) => {
//   const { menus, loading, logout } = useAuth();
//   if (loading) return null;
//   return (
//     <>
//       {/* Navigation */}
//       <nav className="flex-1 px-2 py-4 space-y-1">
//         {menus.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-md transition-all
//               ${isActive
//                 ? "bg-background text-primary shadow-sm"
//                 : "text-inverse hover:bg-primary-light"
//               }`
//             }
//           >
//             {iconMap[item.icon]}
//             {!collapsed && (
//               <span className="text-sm font-medium">
//                 {item.name}
//               </span>
//             )}
//           </NavLink>
//         ))}
//       </nav>
//     </>
//   );
// }
const Navigation = ({ collapsed }) => {
  const { menus, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);

  if (loading) return null;

  return (
    <nav className="flex-1 px-2 py-4 space-y-1">
      {menus.map((menu) => {
        if (!menu.canRead) return null;

        const hasChildren = menu.children?.length > 0;
        const isOpen = openMenu === menu.name;

        return (
          <div key={menu.name}>
            {/* Parent Menu */}
            <button
              onClick={() =>
                setOpenMenu(isOpen ? null : menu.name)
              }
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-md
              text-inverse hover:bg-primary-light transition ${isOpen ? "bg-primary-light" : ""} `}
            >
              
              {iconMap[menu.icon]}

              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-left">
                    
                    {menu.name}
                  </span>
                  {hasChildren && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  )}
                </>
              )}
            </button>

            {/* Sub Menus */}
            {hasChildren && isOpen && !collapsed && (
              <div className="ml-8 mt-1 space-y-1">
                {menu.children.map((child) =>
                  child.canRead ? (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-sm transition
                        ${isActive
                          ? "bg-background text-primary"
                          : "text-inverse/80 hover:bg-primary-light"
                        }`
                      }
                    >
                      {iconMap[child.icon]}
                      {child.name}
                    </NavLink>
                  ) : null
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`h-screen bg-primary text-inverse shadow-lg flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-primary-light">
        {!collapsed && (
          <h1 className="text-lg font-serif tracking-wide text-white">
            CRM Panel
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-primary-light transition"
        >
          <Menu size={20} />
        </button>
      </div>


      <Navigation collapsed={collapsed} />

      {/* Footer */}
      <div className="px-4 py-4 border-t border-primary-light">
        <button
          className="flex items-center gap-3 w-full px-4 py-3 rounded-md
          text-inverse hover:bg-primary-light transition"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

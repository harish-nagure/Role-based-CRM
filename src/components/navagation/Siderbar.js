import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Shield,
  LogOut,
  Menu,
  ChevronDown,
  FileText,
  ClipboardList,
  ContactRound,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const iconMap = {
  //Dashboard
  LayoutDashboard: <LayoutDashboard size={20} />,
  //User
  Users: <Users size={20} />,
  ContactRound: <ContactRound size={18} />,
  //
  UserPlus: <UserPlus size={18} />,
  Shield: <Shield size={18} />,
  //Corporate
  ClipboardList: <ClipboardList size={18} />,
  FileText: <FileText size={20} />
};

const Navigation = ({ collapsed }) => {
  const { menus, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);
  console.log(menus)
  if (loading) return null;

  return (
    <nav className="flex-1 px-2 py-4 space-y-1">
      {menus.map((menu) => {
        if (!menu.canRead) return null;

        const hasChildren = (menu.children || []).length > 0;
        const isOpen = openMenu === menu.name;

        /* ----------------- PARENT WITH CHILDREN ----------------- */
        if (hasChildren) {
          return (
            <div key={menu.name}>
              <button
                onClick={() =>
                  setOpenMenu(isOpen ? null : menu.name)
                }
                className={`flex w-full items-center gap-3 px-4 py-3 rounded-md
                text-inverse hover:bg-primary-light transition
                ${isOpen ? "bg-primary-light" : ""}`}
              >
                {iconMap[menu.icon]}

                {!collapsed && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">
                      {menu.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {menu.children.map(
                    (child) =>
                      child.canRead && (
                        <NavLink
                          key={child.id}
                          to={`/dashboard/${child.path}`}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition
                            ${isActive
                              ? "bg-background text-primary"
                              : "text-inverse/80 hover:bg-primary-light"
                            }`
                          }
                        >
                          {child.icon && iconMap[child.icon]}
                          <span>{child.name}</span>
                        </NavLink>
                      )
                  )}
                </div>
              )}
            </div>
          );
        }

        /* ----------------- PARENT WITHOUT CHILDREN ----------------- */
        return (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md transition
              ${isActive
                ? "bg-background text-primary"
                : "text-inverse hover:bg-primary-light"
              }`
            }
          >
            {iconMap[menu.icon]}
            {!collapsed && (
              <span className="text-sm font-medium">
                {menu.name}
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <aside
      className={`min-h-screen bg-primary text-inverse shadow-lg flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
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
      <div className="px-4 py-2 border-t border-primary-light">
        <button
          className="flex items-center gap-3 w-full px-4 py-3 rounded-md
          text-inverse hover:bg-primary-light transition"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

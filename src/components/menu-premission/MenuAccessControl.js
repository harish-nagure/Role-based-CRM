import { useEffect, useState } from "react";
import { fetchAllRoles, saveMenusByRole, fetchMenusByRole } from "../../api/api.auth";

const MenuAccessControl = ({ canWrite = false }) => {
  // const {menus,loading} = useAuth();
  console.log(canWrite);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);

  /* ---------- INIT ---------- */
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await fetchAllRoles();
        console.log(res.data);
        setRoles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRoles();
  }, [])



  useEffect(() => {
    const loadMenus = async () => {
      if (!role) {
        setPermissions([]);
        return;
      }

      const res = await fetchMenusByRole(role);

      setPermissions(
        res?.data.map(menu => ({
          ...menu,
          menuId: menu.id,
          canRead: !!menu.canRead,
          canWrite: !!menu.canWrite,
          canBoth: menu.canRead && menu.canWrite,
          children: menu.children?.map(child => ({
            ...child,
            menuId: child.id,
            canRead: !!child.canRead,
            canWrite: !!child.canWrite,
          })),
        }))
      );
    };

    loadMenus();
  }, [role]);

  /* ---------- HELPERS ---------- */
  const syncBoth = (menu) => {
    menu.canBoth = menu.canRead && menu.canWrite;
  };

  /* ---------- TOGGLES ---------- */
  const toggleParent = (index, type) => {
    const updated = [...permissions];
    const parent = updated[index];

    parent[type] = !parent[type];

    parent.children?.forEach(child => {
      child[type] = parent[type];
    });

    syncBoth(parent);
    setPermissions(updated);
  };

  const toggleBoth = (index) => {
    const updated = [...permissions];
    const parent = updated[index];
    const value = !parent.canBoth;

    parent.canBoth = value;
    parent.canRead = value;
    parent.canWrite = value;

    parent.children?.forEach(child => {
      child.canRead = value;
      child.canWrite = value;
    });

    setPermissions(updated);
  };

  const toggleChild = (pIndex, cIndex, type) => {
    const updated = [...permissions];
    const parent = updated[pIndex];
    const child = parent.children[cIndex];



    if (type === "canRead") {
      child.canRead = !child.canRead;
    }

    if (type === "canWrite") {
      child.canWrite = !child.canWrite;
    }

    if (type === "both") {
      const value = !(child.canRead && child.canWrite);
      child.canRead = value;
      child.canWrite = value;
    }

    parent.canRead = parent.children.every(c => c.canRead);
    parent.canWrite = parent.children.every(c => c.canWrite);
    parent.canBoth = parent.canRead && parent.canWrite;

    syncBoth(parent);
    setPermissions(updated);
  };

  /* ---------- SAVE ---------- */
  const handleSave = async () => {
    if (!role) {
      setError("Role is required");
      return;
    }

    console.log("Payload:", { role, permissions });
    const payload = {
      roleId: role,
      permissions
    }
    console.log(payload)
    try {
      const res = await saveMenusByRole(payload);
      console.log(res);
      alert("Permissions saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary px-8 pt-8">
      {/* <div className="min-h-[85vh] bg-background rounded-lg shadow-lg p-8 space-y-6"> */}
      <div className="h-[85vh] bg-background rounded-lg shadow-lg p-8 flex flex-col gap-6">

        {/* Header + Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">

          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Menu Access Control
            </h2>
            <p className="text-sm text-muted mt-1">
              Manage read and write access for application navigation
            </p>
          </div>

          {/* Role Selection */}
          <div className="flex items-center gap-4">
            <label className="block text-base whitespace-nowrap text-primary font-medium">
              Select Role:
            </label>

            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
              }}
              disabled={!canWrite}
              className="w-72 rounded-lg border border-border bg-input px-4 py-2.5
                 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
            >
              <option value="">Choose role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            {error && <p className="text-error text-xs mt-2">{error}</p>}
          </div>
        </div>

        {/* Permissions Table */}
        {role && (
          <div className="custom-scrollbar overflow-y-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-input sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-primary-dark">
                    Menu
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-primary-dark">
                    Read
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-primary-dark">
                    Write
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-primary-dark">
                    Both
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {permissions.map((menu, mIndex) => (
                  <>

                    {/* Parent */}
                    <tr
                      key={menu.name}
                      className="bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {menu.name}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-primary cursor-pointer"
                          checked={menu.canRead}
                          // disabled={!canWrite}
                          onChange={() => toggleParent(mIndex, "canRead")}
                        />
                      </td>

                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-primary cursor-pointer"
                          checked={menu.canWrite}

                          onChange={() => toggleParent(mIndex, "canWrite")}
                        />
                      </td>

                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-primary cursor-pointer"
                          checked={menu.canBoth}
                          onChange={() => toggleBoth(mIndex)}
                        />
                      </td>
                    </tr>

                    {/* Children */}
                    {menu.children?.map((child, cIndex) => (
                      <tr key={child.path} className="hover:bg-input transition">
                        <td className="px-6 py-3 pl-12 text-muted">
                          └ {child.name}
                        </td>

                        <td className="px-6 py-3 text-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-primary cursor-pointer"
                            checked={child.canRead}
                            onChange={() =>
                              toggleChild(mIndex, cIndex, "canRead")
                            }
                          />
                        </td>

                        <td className="px-6 py-3 text-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-primary cursor-pointer"
                            checked={child.canWrite}
                            onChange={() =>
                              toggleChild(mIndex, cIndex, "canWrite")
                            }
                          />
                        </td>

                        <td className="px-6 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={child.canRead && child.canWrite}
                            className="h-4 w-4 accent-primary cursor-pointer"

                            onChange={() => toggleChild(mIndex, cIndex, "both")}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Save */}
        {role && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSave}
              disabled={!canWrite}
              className={`px-8 py-2.5 rounded-lg text-sm font-medium transition shadow
              ${canWrite
                  ? "bg-primary text-inverse hover:bg-primary-dark"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Save Permissions
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default MenuAccessControl;

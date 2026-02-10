import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const MenuAccessControl = () => {
   const { menus, loading } = useAuth();
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState("");

  // Load menus AFTER role selection
  useEffect(() => {
    if (role) {
      setPermissions(
        menus.map(menu => ({
          ...menu,
          canRead: menu.canRead || false,
          canWrite: menu.canWrite || false,
          children: menu.children?.map(child => ({
            ...child,
            canRead: child.canRead || false,
            canWrite: child.canWrite || false,
          })),
        }))
      );
    } else {
      setPermissions([]);
    }
  }, [role,menus]);

  const toggleParent = (index, type) => {
    const updated = [...permissions];
    updated[index][type] = !updated[index][type];

    if (updated[index].children) {
      updated[index].children.forEach(child => {
        child[type] = updated[index][type];
      });
    }

    setPermissions(updated);
  };

  const toggleChild = (pIndex, cIndex, type) => {
    const updated = [...permissions];
    updated[pIndex].children[cIndex][type] =
      !updated[pIndex].children[cIndex][type];

    setPermissions(updated);
  };

  const handleSave = () => {
    if (!role) {
      setError("Role is required");
      return;
    }

    console.log("Payload:", {
      role,
      menus,
    });

    alert("Permissions saved successfully");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow">

      {/* Header */}
      <h2 className="text-xl font-semibold">Menu Access Control</h2>
      <p className="text-sm text-gray-500 mb-6">
        Configure navigation permissions for each role
      </p>

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block font-medium mb-1">
          Select Role <span className="text-red-500">*</span>
        </label>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setError("");
          }}
          className="border rounded-md px-4 py-2 w-64"
        >
          <option value="">Choose role</option>
          <option value="ADMIN">Admin</option>
          <option value="RETAIL">Retail User</option>
          <option value="CORPORATE">Corporate User</option>
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Menu Table */}
      {role && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Menu</th>
              <th className="border px-4 py-2 text-center">Can Read</th>
              <th className="border px-4 py-2 text-center">Can Write</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu, mIndex) => (
              <tbody key={menu.name}>
                {/* Parent */}
                <tr className="bg-gray-50 font-medium w-screen">
                  <td className="w-full border px-4 py-2">{menu.name}</td>
                  <td className="w-full px-4 border text-center">
                    <input
                      type="checkbox"
                      checked={menu.canRead}
                      onChange={() => toggleParent(mIndex, "canRead")}
                    />
                  </td>
                  <td className="w-full px- border text-center">
                    <input
                      type="checkbox"
                      checked={menu.canWrite || false}
                      onChange={() => toggleParent(mIndex, "canWrite")}
                    />
                  </td>
                </tr>

                {/* Children */}
                {menu.children?.map((child, cIndex) => (
                  <tr key={child.path}>
                    <td className="border px-4 py-2 pl-10 text-gray-600">
                      └ {child.name}
                    </td>
                    <td className="border text-center">
                      <input
                        type="checkbox"
                        checked={child.canRead}
                        onChange={() =>
                          toggleChild(mIndex, cIndex, "canRead")
                        }
                      />
                    </td>
                    <td className="border text-center">
                      <input
                        type="checkbox"
                        checked={child.canWrite}
                        onChange={() =>
                          toggleChild(mIndex, cIndex, "canWrite")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </tbody>
        </table>
      )}

      {/* Save Button */}
      {role && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800"
          >
            Save Permissions
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuAccessControl;

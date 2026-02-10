import api from "./api";

/* ================= LOGIN ================= */
export const login = async (data) => {
  try {
    const response = await api.post("/auth/login", data);

    const loginData = response.data?.data;

    if (loginData?.token) {
      // ✅ Use sessionStorage (matches interceptor)
      sessionStorage.setItem("token", loginData.token);
      sessionStorage.setItem("user", loginData.username);
      sessionStorage.setItem("role", loginData.role);
    }

    return loginData;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/* ================= FETCH MENUS ================= */
export const fetchMenusByRole = async (role) => {
  // ✅ fallback menus (ONLY if backend fails)
  // const fallbackMenus = [
  //   {
  //     name: "Dashboard",
  //     path: "main",
  //     icon: "LayoutDashboard",
  //     canRead: true,
  //     canWrite: false,
  //   },
  //   {
  //     name: "Create User",
  //     path: "create-user",
  //     icon: "UserPlus",
  //     canRead: true,
  //     canWrite: true,
  //   },
  //   {
  //     name: "Create Roles",
  //     path: "create-roles",
  //     icon: "Shield",
  //     canRead: true,
  //     canWrite: true,
  //   },
  // ];
const fallbackMenus = [
  {
    name: "Dashboard",
    path: "main",
    icon: "LayoutDashboard",
    canRead: true,
    canWrite: false,
  },
  {
    name: "User Management",
    icon: "Users",
    canRead: true,
    children: [
      {
        name: "Create User",
        path: "create-user",
        // icon: "Users",
        canRead: true,
        canWrite: true,
      },
      {
        name: "User List",
        path: "users",
        canRead: false,
        canWrite: false,
      },
      {
        name: "Role List",
        path: "roles",
        canRead: true,
        canWrite: false,
      },
      {
        name: "Menu Access",
        path: "menu-access",
        canRead: true,
        canWrite: true,
      },
    ],
  },
];

  try {
    const res = await api.get(`/menus/${role}`);

    // ✅ safe return
    return res?.data?.length ? res.data : fallbackMenus;
  } catch (error) {
    console.error("Menu fetching failed, using fallback menus");
    return fallbackMenus;
  }
};

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
export const fetchMenusByRole = async (roleId) => {
  const fallbackMenus = [
    {
      name: "Dashboard",
      path: "main",
      icon: "LayoutDashboard",
      canRead: true,
      canWrite: false,
      children: [], // always define children
    },
    {
      name: "User Management",
      icon: "Users",
      canRead: true,
      children: [
        {
          name: "User Directory",
          path: "users",
          canRead: true,
          canWrite: true,
          children: [], // in case you expand further
        },
        {
          name: "User Creation",
          path: "create-user",
          canRead: true,
          canWrite: true,
          children: [],
        },
        {
          name: "Role Management",
          path: "roles",
          canRead: true,
          canWrite: false,
          children: [],
        },
        {
          name: "Menu Permissions",
          path: "menu-access",
          canRead: true,
          canWrite: true,
          children: [],
        },
      ],
    },
  ];

  try {
    const res = await api.get(`/permissions/${roleId}`);
    // return res?.data?.length ? res.data : fallbackMenus;
    //  return fallbackMenus;
    return res.data;
  } catch (error) {
    console.error("Menu fetching failed, using fallback menus", error);
    return fallbackMenus;
  }
};


export const saveMenusByRole = async (payload) => {
  try{
    const res = await api.post(`/permissions/save`,payload);
    return res; 
  }catch(error){
    console.error("Menu fetching failed, using fallback menus");
     throw error;
  }
}

//Roless
export const createRole = async (data) => {
  try {
    const response = await api.post("/roles/create", data);
    return response.data;
  } catch (error) {
    console.error("Create role error:", error);
    throw error;
  }
}


export const updateRole = async (id, data) => {
  try {
    const response = await api.put(`/roles/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update role error:", error);
    throw error;
  }
}

export const fetchAllRoles = async () => {
  try {
    const response = await api.get(`/roles/fetch`);
    return response.data;
  } catch (error) {
    console.error("Error in Role Fetching:", error);
    throw error;
  }
}


export const deleteRole = async (id) => {
  try {
    const response = await api.delete(`/roles/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in Role Deletion:", error);
    throw error;
  }
}


//User
export const createUser = async (data) => {
  try {
    const response = await api.post("/auth/signin", data);
    return response.data;
  } catch (error) {
    console.error("Create User error:", error);
    throw error;
  }
}

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/auth/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update User error:", error);
    throw error;
  }
}

export const fetchAllUsers = async () => {
  try {
    const response = await api.get(`/auth/fetch`);
    return response.data;
  } catch (error) {
    console.error("Error in Role Fetching:", error);
    throw error;
  }
}


export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/auth/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in Role Deletion:", error);
    throw error;
  }
}

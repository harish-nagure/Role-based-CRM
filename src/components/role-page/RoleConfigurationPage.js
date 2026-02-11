import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  CalendarDays
} from "lucide-react";
import RoleForm from "./RoleForm";
import { createRole, updateRole, fetchAllRoles, deleteRole } from "../../api.auth";

/* ================= HEADER ================= */
const RoleHeader = ({ onAdd, canWrite }) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-semibold flex items-center gap-2 text-primary">
        <ShieldCheck className="w-6 h-6" />
        Role Configuration
      </h2>
      <p className="text-muted mt-1">
        Manage system roles and permissions
      </p>
    </div>

    <button
      title={
        canWrite
          ? "Create a new role"
          : "You don't have permission to create roles"
      }
      onClick={onAdd}
      disabled={!canWrite}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition border
      ${canWrite
          ? "bg-primary-light border-primary text-inverse hover:bg-foreground hover:border-primary"
          : "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
    >
      <Plus className="w-4 h-4" />
      Add Role
    </button>

  </div>
);

/* ================= ROLE CARD ================= */
const RoleCard = ({ role, onEdit, onDelete, canWrite }) => (
  <div className="bg-background border border-border rounded-lg p-6 flex justify-between items-start hover:shadow transition max-w-full w-full">
    {/* Left Section */}
    <div className="flex flex-col gap-3 max-w-[60%]">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono bg-input px-2 py-1 rounded-full text-muted border border-muted">
          {role.name.slice(0, 2).toUpperCase()}
        </span>
        <h3 className="text-lg font-semibold text-text truncate">
          {role.name}
        </h3>
      </div>

      <p className="text-muted mt-2 break-words overflow-hidden whitespace-pre-wrap max-w-full">
        {role.description}
      </p>

      <p className="text-sm text-muted mt-3 flex items-center gap-1">
        <CalendarDays className="w-4 h-4" />
        Created on {new Date(role.createdAt).toLocaleDateString()}
      </p>
    </div>

    {/* Right Section: Buttons */}
    <div className="flex  gap-2 ml-4 shrink-0">
      <button
        title={`Edit role ${role.name}`}
        onClick={onEdit}
        disabled={!canWrite}
        className={`border px-3 py-2 rounded-md text-sm flex items-center gap-1 transition
        ${canWrite
            ? "border-border hover:bg-input"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
      >
        <Pencil className="w-4 h-4" />
        Edit
      </button>

      <button
        title={`Delete role ${role.name}`}
        onClick={onDelete}
        disabled={!canWrite}
        className={`border px-3 py-2 rounded-md text-sm flex items-center gap-1 transition
        ${canWrite
            ? "border-error text-error hover:bg-error/10"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>

    </div>
  </div>
);


/* ================= PAGE ================= */
const RoleConfigurationPage = ({ canWrite = false }) => {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleAdd = () => {
    if (!canWrite) return;
    setSelectedRole(null);
    setModalOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleonClose = () => {
    setSelectedRole(null)
    setModalOpen(false)
  }
  const handleDelete = async (role) => {
    if (!canWrite) return;
    if (!window.confirm(`Delete role "${role.name}"?`)) return;

    const res = await deleteRole(role.id);
    alert(res.message);
    setRoles(prev => prev.filter(r => r.id !== role.id));
  };

  const handleSubmit = async (data) => {
    if (!canWrite) return;
    console.log(selectedRole ? "UPDATE ROLE" : "CREATE ROLE", data);

    const payload = {
      name: data.name,
      description: data.description,
    };

    try {
      if (!selectedRole) {

        const res = await createRole(payload);
        console.log("Role created:", res);

        setRoles((prev) => [...prev, res.data]);

        alert(res?.message);

      } else {
        // UPDATE
        const res = await updateRole(data.id, payload);
        console.log("Role Updated:", res);

        setRoles((prev) =>
          prev.map((role) => (role.id === data.id ? res.data : role))
        );
        alert(res?.message);
      }

      setModalOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };


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

  return (
    <div className="bg-secondary px-8 pt-8">
      {/* <div className="min-h-[85vh] mx-auto bg-background rounded-lg shadow-lg p-8 space-y-6"> */}

      <div className="h-[85vh] bg-background rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <RoleHeader onAdd={handleAdd} canWrite={canWrite} />

        {/* <div className="space-y-4"> */}

        <div className=" custom-scrollbar overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map(role => (
              <RoleCard
                key={role.id}
                role={role}
                onEdit={() => handleEdit(role)}
                onDelete={() => handleDelete(role)}
                canWrite={canWrite}
              />
            ))}
          </div>
        </div>
      </div>

      <RoleForm
        open={modalOpen}
        role={selectedRole}
        onClose={handleonClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RoleConfigurationPage;

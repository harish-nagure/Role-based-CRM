import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  CalendarDays
} from "lucide-react";
import RoleForm from "./RoleForm";

/* ================= HEADER ================= */
const RoleHeader = ({ onAdd }) => (
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
      title="Create a new role"
      onClick={onAdd}
      className="bg-primary-light border hover:bg-foreground hover:border-primary text-inverse px-4 py-2 rounded-lg flex items-center gap-2 transition"
    >
      <Plus className="w-4 h-4" />
      Add Role
    </button>
  </div>
);

/* ================= ROLE CARD ================= */
const RoleCard = ({ role, onEdit, onDelete }) => (
  <div className="bg-background border border-border rounded-lg p-6 flex justify-between items-start hover:shadow transition">
    <div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono bg-input px-2 py-1 rounded text-muted">
          {role.code}
        </span>
        <h3 className="text-lg font-semibold text-text">
          {role.name}
        </h3>
      </div>

      <p className="text-muted mt-2">
        {role.description}
      </p>

      <p className="text-xs text-muted mt-3 flex items-center gap-1">
        <CalendarDays className="w-3 h-3" />
        Created on {role.createdAt}
      </p>
    </div>

    <div className="flex gap-2">
      <button
        title="Edit role details"
        onClick={onEdit}
        className="border border-border px-3 py-2 rounded-md text-sm flex items-center gap-1 hover:bg-input transition"
      >
        <Pencil className="w-4 h-4" />
        {/* Edit */}
      </button>

      <button
        onClick={onDelete}
        title="Delete this role"
        className="border border-error text-error px-3 py-2 rounded-md text-sm flex items-center gap-1 hover:bg-error/10 transition"
      >
        <Trash2 className="w-4 h-4" />
        {/* Delete */}
      </button>
    </div>
  </div>
);

/* ================= MOCK DATA ================= */
const initialRoles = [
  {
    code: "ADM001",
    name: "System Administrator",
    description: "Full system access with all administrative privileges",
    createdAt: "15 Jan 2025",
  },
  {
    code: "RTL001",
    name: "Retail Banking User",
    description: "Customer account management and transaction processing",
    createdAt: "20 Jan 2025",
  },
  {
    code: "CRP001",
    name: "Corporate Banking User",
    description: "Corporate operations with maker-checker workflow",
    createdAt: "01 Feb 2025",
  },
];

/* ================= PAGE ================= */
const RoleConfigurationPage = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleAdd = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleDelete = (role) => {
    if (!window.confirm(`Delete role "${role.name}"?`)) return;
    setRoles(prev => prev.filter(r => r.code !== role.code));
  };

  const handleSubmit = (data) => {
    console.log(selectedRole ? "UPDATE ROLE" : "CREATE ROLE", data);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="mx-auto bg-background rounded-lg shadow-lg p-8 space-y-6">
        <RoleHeader onAdd={handleAdd} />

        <div className="space-y-4">
          {roles.map(role => (
            <RoleCard
              key={role.code}
              role={role}
              onEdit={() => handleEdit(role)}
              onDelete={() => handleDelete(role)}
            />
          ))}
        </div>
      </div>

      <RoleForm
        open={modalOpen}
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default RoleConfigurationPage;

import { useEffect, useState } from "react";
import { Mail, Pencil, Trash2, UserPlus, ShieldUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    fetchAllUsers,
    deleteUser
} from "../../api.auth";

/* ================= HEADER ================= */
const UserHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-primary">
                    <UserPlus className="w-6 h-6" />
                    User Management
                </h2>
                <p className="text-muted mt-1">
                    Manage system users and role assignments
                </p>
            </div>

            <button
                onClick={() => navigate("/dashboard/create-user")}
                className="bg-primary-light border hover:bg-foreground hover:border-primary text-inverse px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
                <UserPlus size={16} />
                Add User
            </button>
        </div>
    );
};

/* ================= USER CARD ================= */
const UserCard = ({ user, onEdit, onDelete, canWrite }) => {
    return (
        <div className="bg-background border border-border rounded-lg p-6 flex justify-between items-start hover:shadow transition max-w-full w-full">
            {/* Left Section */}
            <div className="flex flex-col gap-3 max-w-[60%]">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono bg-input px-2 py-1 rounded-full text-muted border border-muted">
                        {user.firstname.slice(0, 1).toUpperCase()}{user.lastname.slice(0, 1).toUpperCase()}
                    </span>
                    <h3 className="text-lg font-semibold text-text truncate">
                        {user.firstname} {user.lastname}
                    </h3>
                </div>


                <p className="text-sm text-muted mt-3 flex items-center gap-1">
                    {/* <p className="text-muted mt-2 break-words overflow-hidden whitespace-pre-wrap max-w-full"> */}
                    <Mail size={18} className="text-foreground" />
                    {user.emailid}
                </p>

                <p className="text-sm text-primary-light mt-3 flex items-center gap-1">
                    <ShieldUser size={18} />

                    <span className="font-medium">
                        {user.role?.name || "N/A"}
                    </span>
                </p>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex  gap-2 ml-4 shrink-0">
                <button
                    title={
                        canWrite
                            ? `Edit role ${user.firstname}`
                            : "You don't have permission to edit"
                    }
                    onClick={() => canWrite && onEdit(user)}
                    disabled={!canWrite}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition border
                        ${canWrite
                            ? "border-border hover:bg-input"
                            : "border-gray-300 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>

                <button
                    title={
                        canWrite
                            ? `Delete role ${user.firstname}`
                            : "You don't have permission to delete"
                    }
                    onClick={() => canWrite && onDelete(user.id)}
                    disabled={!canWrite}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 transition border
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
}

/* ================= PAGE ================= */
const UserConfigurationPage = ({ canWrite = false }) => {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await fetchAllUsers();
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        console.log(id)
        if (!window.confirm("Delete this user?", id)) return;

        try {
            const res = await deleteUser(id);
            console.log(res, " ", id);
            setUsers(prev => prev.filter(u => u.id !== id));
            alert(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (user) => {
        console.log("fdddd", user)
        navigate("/dashboard/create-user", {
            state: { user }
        })
    }

    return (
        <div className="bg-secondary px-8 pt-8">
            {/* <div className="min-h-[85vh] bg-background rounded-lg shadow-lg p-8 space-y-6"> */}
            <div className="h-[85vh] bg-background rounded-lg shadow-lg p-8 flex flex-col gap-6">

                <UserHeader />

                <div className="flex-1 custom-scrollbar overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {users.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                canWrite={canWrite}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserConfigurationPage;

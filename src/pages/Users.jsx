import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Search,
  CheckCircle,
  Ban,
  UserCheck,
  Users as UsersIcon,
} from "lucide-react";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin_users/");
      const data = response.data;

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const verifyWorker = async (id) => {
    try {
      const response = await api.post(`/verify_worker/${id}/`);
      if (response.status === 200 || response.status === 201) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const suspendUser = async (id) => {
    try {
      const response = await api.post(`/suspend_user/${id}/`);
      if (response.status === 200 || response.status === 201) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activateUser = async (id) => {
    try {
      const response = await api.post(`/activate_user/${id}/`);
      if (response.status === 200 || response.status === 201) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: Colors.typography }}
            >
              Users Management
            </h1>

            <p
              className="mt-1 text-sm font-medium"
              style={{ color: Colors.placeholder }}
            >
              Manage workers and customers.
            </p>
          </div>

          <div
            className="px-4 py-2 rounded-xl flex items-center gap-2 font-semibold shadow-sm"
            style={{
              backgroundColor: "rgba(90, 153, 76, 0.15)",
              color: Colors.placeholder,
            }}
          >
            <UsersIcon size={18} />
            <span>{users.length} Users</span>
          </div>
        </div>

        {/* Search */}
        <div
          className="p-4 rounded-2xl shadow-sm border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-3.5"
              style={{ color: Colors.placeholder }}
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-slate-300/80 rounded-xl focus:outline-none transition-all text-sm"
              style={{
                color: Colors.typography,
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        </div>

        {/* Users Table */}
        <div
          className="rounded-2xl shadow-sm overflow-hidden border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          {loading ? (
            <div className="p-20 flex justify-center">
              <div
                className="h-10 w-10 border-4 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: Colors.background,
                  borderTopColor: "transparent",
                }}
              ></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="border-b text-left text-xs uppercase tracking-wider font-semibold"
                    style={{
                      backgroundColor: "rgba(15, 34, 54, 0.03)",
                      color: Colors.placeholder,
                      borderColor: "rgba(15, 34, 54, 0.08)",
                    }}
                  >
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Verified</th>
                    <th className="text-center px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/60">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-black/[0.02]"
                    >
                      {/* Avatar & Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm"
                            style={{ backgroundColor: Colors.placeholder }}
                          >
                            {user.full_name?.charAt(0) || "U"}
                          </div>

                          <div>
                            <p
                              className="font-semibold"
                              style={{ color: Colors.typography }}
                            >
                              {user.full_name}
                            </p>

                            <p
                              className="text-xs"
                              style={{ color: Colors.placeholder }}
                            >
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td
                        className="px-6 py-4"
                        style={{ color: Colors.typography }}
                      >
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span
                          className="capitalize font-medium px-2.5 py-1 rounded-md text-xs"
                          style={{
                            backgroundColor: "rgba(15, 34, 54, 0.06)",
                            color: Colors.typography,
                          }}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Active Status */}
                      <td className="px-6 py-4">
                        {user.is_active ? (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: "rgba(90, 153, 76, 0.15)",
                              color: Colors.placeholder,
                            }}
                          >
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Suspended
                          </span>
                        )}
                      </td>

                      {/* Verification Status */}
                      <td className="px-6 py-4">
                        {user.is_verified ? (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: "rgba(15, 34, 54, 0.1)",
                              color: Colors.typography,
                            }}
                          >
                            Verified
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                          {!user.is_verified && user.role === "worker" && (
                            <button
                              onClick={() => verifyWorker(user.id)}
                              className="text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all hover:brightness-110"
                              style={{ backgroundColor: Colors.background }}
                            >
                              <CheckCircle size={14} />
                              Verify
                            </button>
                          )}

                          {user.is_active ? (
                            <button
                              onClick={() => suspendUser(user.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
                            >
                              <Ban size={14} />
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() => activateUser(user.id)}
                              className="text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all hover:brightness-110"
                              style={{ backgroundColor: Colors.typography }}
                            >
                              <UserCheck size={14} />
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-12 font-medium"
                        style={{ color: Colors.placeholder }}
                      >
                        No users found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
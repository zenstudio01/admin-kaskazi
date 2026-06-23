import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Search,
  CheckCircle,
  Ban,
  UserCheck,
  Users as UsersIcon,
} from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/api";

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${API_URL}/admin_users/`
      );

      const data = await response.json();

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
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.role
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const verifyWorker = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/verify_worker/${id}/`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const suspendUser = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/suspend_user/${id}/`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activateUser = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/activate_user/${id}/`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
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
            <h1 className="text-3xl font-bold text-[#062E5B]">
              Users Management
            </h1>

            <p className="text-slate-500 mt-1">
              Manage workers and customers.
            </p>
          </div>

          <div className="bg-orange-100 px-4 py-2 rounded-xl flex items-center gap-2">
            <UsersIcon size={18} />
            <span className="font-semibold">
              {users.length} Users
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F57C00] outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 flex justify-center">
              <div className="h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4">
                      User
                    </th>
                    <th className="text-left px-6 py-4">
                      Email
                    </th>
                    <th className="text-left px-6 py-4">
                      Role
                    </th>
                    <th className="text-left px-6 py-4">
                      Status
                    </th>
                    <th className="text-left px-6 py-4">
                      Verified
                    </th>
                    <th className="text-center px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                            {user.name?.charAt(0)}
                          </div>

                          <div>
                            <p className="font-medium">
                              {user.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="capitalize">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {user.is_active ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                            Suspended
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {user.is_verified ? (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            Verified
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 flex-wrap">
                          {!user.is_verified &&
                            user.role ===
                              "worker" && (
                              <button
                                onClick={() =>
                                  verifyWorker(
                                    user.id
                                  )
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                              >
                                <CheckCircle
                                  size={16}
                                />
                                Verify
                              </button>
                            )}

                          {user.is_active ? (
                            <button
                              onClick={() =>
                                suspendUser(
                                  user.id
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                            >
                              <Ban size={16} />
                              Suspend
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                activateUser(
                                  user.id
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                            >
                              <UserCheck
                                size={16}
                              />
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
                        className="text-center py-10 text-slate-500"
                      >
                        No users found
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
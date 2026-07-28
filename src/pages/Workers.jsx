import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BadgeCheck,
  ShieldAlert,
  Search,
  Clock3,
} from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Workers() {
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchWorkers = async () => {
    try {
      const response = await api.get("/admin/workers/");
      const data = response.data.workers || [];

      setWorkers(data);
      setFilteredWorkers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    const filtered = workers.filter(
      (worker) =>
        worker.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        worker.email?.toLowerCase().includes(search.toLowerCase()) ||
        worker.profession?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredWorkers(filtered);
  }, [search, workers]);

  const totalWorkers = workers.length;
  const verifiedWorkers = workers.filter((worker) => worker.verified).length;
  const pendingWorkers = workers.filter((worker) => !worker.verified).length;
  const availableWorkers = workers.filter((worker) => worker.is_available).length;

  const getVerificationBadge = (verified) => {
    return verified ? (
      <span
        className="px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: "rgba(90, 153, 76, 0.15)",
          color: Colors.placeholder,
        }}
      >
        Verified
      </span>
    ) : (
      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
        Pending
      </span>
    );
  };

  const getAvailabilityBadge = (available) => {
    return available ? (
      <span
        className="px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: "rgba(15, 34, 54, 0.1)",
          color: Colors.typography,
        }}
      >
        Available
      </span>
    ) : (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
        Busy
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div
            className="h-12 w-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: Colors.background,
              borderTopColor: "transparent",
            }}
          ></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: Colors.typography }}
          >
            Workers Management
          </h1>

          <p
            className="mt-1 text-sm font-medium"
            style={{ color: Colors.placeholder }}
          >
            Review, verify and manage all workers.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Workers */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Total Workers
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {totalWorkers}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <Users style={{ color: Colors.typography }} size={26} />
              </div>
            </div>
          </div>

          {/* Verified Workers */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Verified
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.background }}
                >
                  {verifiedWorkers}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(90, 153, 76, 0.12)" }}
              >
                <BadgeCheck style={{ color: Colors.background }} size={26} />
              </div>
            </div>
          </div>

          {/* Pending Workers */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Pending
                </p>

                <h2 className="text-3xl font-bold mt-2 text-amber-600">
                  {pendingWorkers}
                </h2>
              </div>

              <div className="bg-amber-100 p-3 rounded-xl">
                <ShieldAlert className="text-amber-600" size={26} />
              </div>
            </div>
          </div>

          {/* Available Workers */}
          <div
            className="rounded-2xl shadow-sm p-5 border"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Available
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {availableWorkers}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <Clock3 style={{ color: Colors.typography }} size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="rounded-2xl shadow-sm p-4 border"
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
              placeholder="Search workers..."
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

        {/* Workers Table */}
        <div
          className="rounded-2xl shadow-sm overflow-hidden border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
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
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Profession</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4">Hourly Rate</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Availability</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/60">
                {filteredWorkers.map((worker) => (
                  <tr
                    key={worker.id}
                    className="transition-colors hover:bg-black/[0.02]"
                  >
                    {/* Worker Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.profile_image || "/avatar-placeholder.png"}
                          alt={worker.full_name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />

                        <div>
                          <h3
                            className="font-semibold"
                            style={{ color: Colors.typography }}
                          >
                            {worker.full_name}
                          </h3>

                          <p
                            className="text-xs"
                            style={{ color: Colors.placeholder }}
                          >
                            {worker.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Profession */}
                    <td
                      className="px-6 py-4 font-medium"
                      style={{ color: Colors.typography }}
                    >
                      {worker.profession}
                    </td>

                    {/* Experience */}
                    <td
                      className="px-6 py-4"
                      style={{ color: Colors.typography }}
                    >
                      {worker.experience_years} Years
                    </td>

                    {/* Hourly Rate */}
                    <td
                      className="px-6 py-4 font-semibold"
                      style={{ color: Colors.background }}
                    >
                      KES {Number(worker.hourly_rate).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getVerificationBadge(worker.verified)}
                    </td>

                    {/* Availability */}
                    <td className="px-6 py-4">
                      {getAvailabilityBadge(worker.is_available)}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/workers/${worker.id}`)}
                        className="text-white px-3.5 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
                        style={{ backgroundColor: Colors.typography }}
                      >
                        View Documents
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredWorkers.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-12 font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      No workers found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
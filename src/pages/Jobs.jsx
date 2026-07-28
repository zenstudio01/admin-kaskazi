import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Briefcase,
  Search,
  Clock3,
  CheckCircle,
  XCircle,
} from "lucide-react";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await api.get(`/admin_jobs/`);
      const data = response.data;

      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.client?.toLowerCase().includes(search.toLowerCase()) ||
        job.worker?.toLowerCase().includes(search.toLowerCase()) ||
        job.status?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredJobs(filtered);
  }, [search, jobs]);

  const activeJobs = jobs.filter((job) => job.status === "active").length;
  const completedJobs = jobs.filter((job) => job.status === "completed").length;
  const cancelledJobs = jobs.filter((job) => job.status === "cancelled").length;

  const totalRevenue = jobs.reduce(
    (sum, job) => sum + Number(job.budget || 0),
    0
  );

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "rgba(90, 153, 76, 0.15)",
              color: Colors.placeholder,
            }}
          >
            Completed
          </span>
        );

      case "active":
      case "in_progress":
        return (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "rgba(15, 34, 54, 0.1)",
              color: Colors.typography,
            }}
          >
            Active
          </span>
        );

      case "cancelled":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            Cancelled
          </span>
        );

      default:
        return (
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
            {status}
          </span>
        );
    }
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
            Jobs Management
          </h1>

          <p
            className="mt-1 text-sm font-medium"
            style={{ color: Colors.placeholder }}
          >
            Monitor all jobs created on Kaskazi.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Jobs */}
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
                  Total Jobs
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {jobs.length}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <Briefcase style={{ color: Colors.typography }} size={26} />
              </div>
            </div>
          </div>

          {/* Active Jobs */}
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
                  Active Jobs
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {activeJobs}
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

          {/* Completed Jobs */}
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
                  Completed Jobs
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.background }}
                >
                  {completedJobs}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(90, 153, 76, 0.12)" }}
              >
                <CheckCircle style={{ color: Colors.background }} size={26} />
              </div>
            </div>
          </div>

          {/* Cancelled Jobs */}
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
                  Cancelled
                </p>

                <h2 className="text-3xl font-bold mt-2 text-red-600">
                  {cancelledJobs}
                </h2>
              </div>

              <div className="bg-red-100 p-3 rounded-xl">
                <XCircle className="text-red-600" size={26} />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Banner */}
        <div
          className="rounded-2xl p-6 text-white shadow-md"
          style={{
            background: `linear-gradient(135deg, ${Colors.typography} 0%, ${Colors.placeholder} 100%)`,
          }}
        >
          <p className="text-xs uppercase tracking-wider font-semibold opacity-80">
            Total Job Value
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Ksh {totalRevenue.toLocaleString()}
          </h2>

          <p className="mt-2 text-sm opacity-80">
            Combined value of all jobs.
          </p>
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
              placeholder="Search jobs..."
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

        {/* Jobs Table */}
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
                    <th className="px-6 py-4">Job</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Worker</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Created</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/60">
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="transition-colors hover:bg-black/[0.02]"
                    >
                      {/* Job Title */}
                      <td
                        className="px-6 py-4 font-semibold"
                        style={{ color: Colors.typography }}
                      >
                        {job.title}
                      </td>

                      {/* Client */}
                      <td
                        className="px-6 py-4"
                        style={{ color: Colors.typography }}
                      >
                        {job.client}
                      </td>

                      {/* Worker */}
                      <td className="px-6 py-4">
                        {job.worker ? (
                          <span style={{ color: Colors.typography }}>
                            {job.worker}
                          </span>
                        ) : (
                          <span
                            className="italic text-xs"
                            style={{ color: Colors.placeholder }}
                          >
                            Not Assigned
                          </span>
                        )}
                      </td>

                      {/* Budget */}
                      <td
                        className="px-6 py-4 font-semibold"
                        style={{ color: Colors.background }}
                      >
                        KES {Number(job.budget || 0).toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(job.status)}
                      </td>

                      {/* Created Date */}
                      <td
                        className="px-6 py-4 text-xs font-medium"
                        style={{ color: Colors.placeholder }}
                      >
                        {new Date(job.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}

                  {filteredJobs.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-12 font-medium"
                        style={{ color: Colors.placeholder }}
                      >
                        No jobs found matching your search.
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
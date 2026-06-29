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

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await api.get(
        `/admin_jobs/`
      );

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
        job.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.client
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.worker
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        job.status
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredJobs(filtered);
  }, [search, jobs]);

  const activeJobs = jobs.filter(
    (job) => job.status === "active"
  ).length;

  const completedJobs = jobs.filter(
    (job) => job.status === "completed"
  ).length;

  const cancelledJobs = jobs.filter(
    (job) => job.status === "cancelled"
  ).length;

  const totalRevenue = jobs.reduce(
    (sum, job) => sum + Number(job.budget),
    0
  );

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Completed
          </span>
        );

      case "active":
      case "in_progress":
        return (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Active
          </span>
        );

      case "cancelled":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            Cancelled
          </span>
        );

      default:
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            {status}
          </span>
        );
    }
  };


  if (loading) {
      return (
        <AdminLayout>
          <div className="flex justify-center items-center h-[70vh]">
            <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </AdminLayout>
      );
    }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#062E5B]">
            Jobs Management
          </h1>

          <p className="text-slate-500 mt-1">
            Monitor all jobs created on Kaskazi.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">
                  Total Jobs
                </p>

                <h2 className="text-3xl font-bold">
                  {jobs.length}
                </h2>
              </div>

              <div className="bg-orange-100 p-3 rounded-xl">
                <Briefcase
                  className="text-orange-600"
                  size={26}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">
                  Active Jobs
                </p>

                <h2 className="text-3xl font-bold text-blue-600">
                  {activeJobs}
                </h2>
              </div>

              <div className="bg-blue-100 p-3 rounded-xl">
                <Clock3
                  className="text-blue-600"
                  size={26}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">
                  Completed Jobs
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  {completedJobs}
                </h2>
              </div>

              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle
                  className="text-green-600"
                  size={26}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">
                  Cancelled
                </p>

                <h2 className="text-3xl font-bold text-red-600">
                  {cancelledJobs}
                </h2>
              </div>

              <div className="bg-red-100 p-3 rounded-xl">
                <XCircle
                  className="text-red-600"
                  size={26}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-r from-[#062E5B] to-[#0A427F] rounded-2xl p-6 text-white">
          <p className="opacity-80">
            Total Job Value
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Ksh {totalRevenue.toLocaleString()}
          </h2>

          <p className="mt-2 opacity-70">
            Combined value of all jobs.
          </p>
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
              placeholder="Search jobs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#F57C00]"
            />
          </div>
        </div>

        {/* Table */}
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
                      Job
                    </th>
                    <th className="text-left px-6 py-4">
                      Client
                    </th>
                    <th className="text-left px-6 py-4">
                      Worker
                    </th>
                    <th className="text-left px-6 py-4">
                      Budget
                    </th>
                    <th className="text-left px-6 py-4">
                      Status
                    </th>
                    <th className="text-left px-6 py-4">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium">
                        {job.title}
                      </td>

                      <td className="px-6 py-4">
                        {job.client}
                      </td>

                      <td className="px-6 py-4">
                        {job.worker || (
                          <span className="text-slate-400">
                            Not Assigned
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 font-semibold text-green-600">
                        KES{" "}
                        {Number(
                          job.budget
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(
                          job.status
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(
                          job.created_at
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}

                  {filteredJobs.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-slate-500"
                      >
                        No jobs found.
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
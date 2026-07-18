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
        worker.full_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        worker.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        worker.profession
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredWorkers(filtered);
  }, [search, workers]);

  const totalWorkers = workers.length;

  const verifiedWorkers = workers.filter(
    (worker) => worker.verified
  ).length;

  const pendingWorkers = workers.filter(
    (worker) => !worker.verified
  ).length;

  const availableWorkers = workers.filter(
    (worker) => worker.is_available
  ).length;

  const getVerificationBadge = (verified) => {
    return verified ? (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
        Verified
      </span>
    ) : (
      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
        Pending
      </span>
    );
  };

  const getAvailabilityBadge = (available) => {
    return available ? (
      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
        Available
      </span>
    ) : (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
        Busy
      </span>
    );
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
            Workers Management
          </h1>

          <p className="text-slate-500 mt-1">
            Review, verify and manage all workers.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">
                  Total Workers
                </p>

                <h2 className="text-3xl font-bold">
                  {totalWorkers}
                </h2>

              </div>

              <div className="bg-orange-100 p-3 rounded-xl">

                <Users
                  className="text-orange-600"
                  size={26}
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">
                  Verified
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  {verifiedWorkers}
                </h2>

              </div>

              <div className="bg-green-100 p-3 rounded-xl">

                <BadgeCheck
                  className="text-green-600"
                  size={26}
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">
                  Pending
                </p>

                <h2 className="text-3xl font-bold text-yellow-600">
                  {pendingWorkers}
                </h2>

              </div>

              <div className="bg-yellow-100 p-3 rounded-xl">

                <ShieldAlert
                  className="text-yellow-600"
                  size={26}
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">
                  Available
                </p>

                <h2 className="text-3xl font-bold text-blue-600">
                  {availableWorkers}
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

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-sm p-4">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search workers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Workers Table */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Worker
                  </th>

                  <th className="px-6 py-4 text-left">
                    Profession
                  </th>

                  <th className="px-6 py-4 text-left">
                    Experience
                  </th>

                  <th className="px-6 py-4 text-left">
                    Hourly Rate
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Availability
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredWorkers.map((worker) => (

                  <tr
                    key={worker.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={worker.profile_image}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <div>

                          <h3 className="font-semibold">
                            {worker.full_name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {worker.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4">
                      {worker.profession}
                    </td>

                    <td className="px-6 py-4">
                      {worker.experience_years} Years
                    </td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      KES {Number(worker.hourly_rate).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {getVerificationBadge(worker.verified)}
                    </td>

                    <td className="px-6 py-4">
                      {getAvailabilityBadge(worker.is_available)}
                    </td>

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          navigate(`/workers/${worker.id}`)
                        }
                        className="bg-[#062E5B] hover:bg-[#0B3D75] text-white px-4 py-2 rounded-lg"
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
                      className="text-center py-10 text-slate-500"
                    >
                      No workers found.
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
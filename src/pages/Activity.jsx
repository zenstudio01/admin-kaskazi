import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Activity,
  Briefcase,
  Clock3,
  CheckCircle,
  Search,
} from "lucide-react";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const response = await api.get("/recent_activity/");
      const data = response.data;

      setActivities(data);
      setFilteredActivities(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const filtered = activities.filter(
      (activity) =>
        activity.title?.toLowerCase().includes(search.toLowerCase()) ||
        activity.status?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredActivities(filtered);
  }, [search, activities]);

  const activeJobs = activities.filter(
    (activity) => activity.status === "active"
  ).length;

  const completedJobs = activities.filter(
    (activity) => activity.status === "completed"
  ).length;

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
            Recent Activities
          </h1>

          <p
            className="mt-1 text-sm font-medium"
            style={{ color: Colors.placeholder }}
          >
            Track the latest activities happening in Kaskazi.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Total Activities */}
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
                  Total Activities
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {activities.length}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <Activity style={{ color: Colors.typography }} size={26} />
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
              placeholder="Search activities..."
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

        {/* Activity Timeline */}
        <div
          className="rounded-2xl shadow-sm p-6 border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          <div className="space-y-5">
            {filteredActivities.map((activity, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-slate-200/60 pb-5 last:border-none last:pb-0"
              >
                <div
                  className="p-3 rounded-2xl h-fit shrink-0"
                  style={{ backgroundColor: "rgba(15, 34, 54, 0.06)" }}
                >
                  <Briefcase style={{ color: Colors.typography }} size={22} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center gap-2">
                    <h3
                      className="font-semibold text-base"
                      style={{ color: Colors.typography }}
                    >
                      {activity.title}
                    </h3>

                    {getStatusBadge(activity.status)}
                  </div>

                  <p
                    className="text-sm mt-1"
                    style={{ color: Colors.placeholder }}
                  >
                    A new job activity was recorded.
                  </p>

                  <p
                    className="text-xs font-medium mt-2"
                    style={{ color: Colors.placeholder }}
                  >
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <p
                className="text-center py-10 font-medium"
                style={{ color: Colors.placeholder }}
              >
                No activities found.
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
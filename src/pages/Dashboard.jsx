import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  Users,
  Briefcase,
  CreditCard,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react";
import api from "../api/api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin_dashboard/");

      const data = response.data;

      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: dashboard?.total_users || 0,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Workers",
      value: dashboard?.total_workers || 0,
      icon: Briefcase,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Jobs",
      value: dashboard?.total_jobs || 0,
      icon: Activity,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Payments",
      value: `KES ${dashboard?.total_payments || 0}`,
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
  ];

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
            Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Welcome back to Kaskazi Administration.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-500 text-sm">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-slate-800">
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center ${stat.color}`}
                  >
                    <Icon size={26} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Activity className="text-orange-500" />
              <h2 className="text-lg font-semibold">
                Recent Activity
              </h2>
            </div>

            <div className="space-y-4">
              {dashboard?.recent_activity?.length > 0 ? (
                dashboard.recent_activity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-3 border-b pb-3"
                  >
                    <div className="w-3 h-3 mt-2 rounded-full bg-orange-500"></div>

                    <div>
                      <p className="font-medium text-slate-700">
                        {activity.message}
                      </p>

                      <p className="text-xs text-slate-400">
                        {activity.created_at}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">
                  No recent activity.
                </p>
              )}
            </div>
          </div>

          {/* Quick Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-500" />
                <h2 className="font-semibold">
                  Platform Overview
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-sm">
                    Verified Workers
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {dashboard?.verified_workers || 0}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Pending Verification
                  </p>

                  <h3 className="text-2xl font-bold text-orange-500">
                    {dashboard?.pending_workers || 0}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Average Rating
                  </p>

                  <div className="flex items-center gap-2">
                    <Star
                      className="text-yellow-500"
                      fill="currentColor"
                    />

                    <span className="text-2xl font-bold">
                      {dashboard?.average_rating || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-gradient-to-r from-[#062E5B] to-[#0A427F] text-white rounded-2xl p-6">
              <p className="opacity-80">
                Total Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2">
                KES {dashboard?.total_payments || 0}
              </h2>

              <p className="mt-3 text-sm opacity-70">
                Platform earnings from completed
                transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
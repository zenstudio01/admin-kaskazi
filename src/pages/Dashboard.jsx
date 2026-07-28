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
import Colors from "../constants/colors";

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
      badgeBg: "rgba(15, 34, 54, 0.08)",
      iconColor: Colors.typography,
    },
    {
      title: "Total Workers",
      value: dashboard?.total_workers || 0,
      icon: Briefcase,
      badgeBg: "rgba(90, 153, 76, 0.12)",
      iconColor: Colors.background,
    },
    {
      title: "Total Jobs",
      value: dashboard?.total_jobs || 0,
      icon: Activity,
      badgeBg: "rgba(61, 114, 59, 0.12)",
      iconColor: Colors.placeholder,
    },
    {
      title: "Payments",
      value: `Ksh ${dashboard?.revenue || 0}`,
      icon: CreditCard,
      badgeBg: "rgba(15, 34, 54, 0.08)",
      iconColor: Colors.typography,
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div 
            className="h-12 w-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ 
              borderColor: Colors.background, 
              borderTopColor: "transparent" 
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
            Dashboard
          </h1>

          <p 
            className="mt-1 text-sm font-medium"
            style={{ color: Colors.placeholder }}
          >
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
                className="rounded-2xl p-5 shadow-sm border transition-shadow hover:shadow-md"
                style={{ 
                  backgroundColor: Colors.primary,
                  borderColor: "rgba(15, 34, 54, 0.08)"
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p 
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: Colors.placeholder }}
                    >
                      {stat.title}
                    </p>

                    <h2 
                      className="text-3xl font-bold mt-2"
                      style={{ color: Colors.typography }}
                    >
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
                    style={{ backgroundColor: stat.badgeBg, color: stat.iconColor }}
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
          <div 
            className="lg:col-span-2 rounded-2xl shadow-sm p-6 border"
            style={{ 
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)"
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Activity style={{ color: Colors.background }} size={22} />
              <h2 
                className="text-lg font-bold"
                style={{ color: Colors.typography }}
              >
                Recent Activity
              </h2>
            </div>

            <div className="space-y-4">
              {dashboard?.recent_activity?.length > 0 ? (
                dashboard.recent_activity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-3 border-b pb-3.5 last:border-b-0 last:pb-0"
                    style={{ borderColor: "rgba(15, 34, 54, 0.08)" }}
                  >
                    <div 
                      className="w-2.5 h-2.5 mt-2 rounded-full shrink-0"
                      style={{ backgroundColor: Colors.background }}
                    ></div>

                    <div>
                      <p 
                        className="font-medium text-sm leading-relaxed"
                        style={{ color: Colors.typography }}
                      >
                        {activity.message}
                      </p>

                      <p 
                        className="text-xs mt-0.5"
                        style={{ color: Colors.placeholder }}
                      >
                        {activity.created_at}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p 
                  className="text-sm font-medium"
                  style={{ color: Colors.placeholder }}
                >
                  No recent activity.
                </p>
              )}
            </div>
          </div>

          {/* Quick Summary Section */}
          <div className="space-y-6">
            {/* Platform Overview */}
            <div 
              className="rounded-2xl p-6 shadow-sm border"
              style={{ 
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)"
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp style={{ color: Colors.background }} size={20} />
                <h2 
                  className="font-bold text-lg"
                  style={{ color: Colors.typography }}
                >
                  Platform Overview
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <p 
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: Colors.placeholder }}
                  >
                    Verified Workers
                  </p>

                  <h3 
                    className="text-2xl font-bold mt-1"
                    style={{ color: Colors.typography }}
                  >
                    {dashboard?.verified_workers || 0}
                  </h3>
                </div>

                <div>
                  <p 
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: Colors.placeholder }}
                  >
                    Pending Verification
                  </p>

                  <h3 
                    className="text-2xl font-bold mt-1"
                    style={{ color: Colors.background }}
                  >
                    {dashboard?.pending_workers || 0}
                  </h3>
                </div>

                <div>
                  <p 
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: Colors.placeholder }}
                  >
                    Average Rating
                  </p>

                  <div className="flex items-center gap-2">
                    <Star
                      className="text-amber-400"
                      fill="currentColor"
                      size={22}
                    />

                    <span 
                      className="text-2xl font-bold"
                      style={{ color: Colors.typography }}
                    >
                      {dashboard?.average_rating || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div 
              className="text-white rounded-2xl p-6 shadow-md"
              style={{ 
                background: `linear-gradient(135deg, ${Colors.typography} 0%, ${Colors.placeholder} 100%)`
              }}
            >
              <p className="text-xs uppercase tracking-wider font-semibold opacity-80">
                Total Revenue
              </p>

              <h2 className="text-4xl font-bold mt-2">
                Ksh {dashboard?.revenue || 0}
              </h2>

              <p className="mt-3 text-sm opacity-80 leading-relaxed">
                Platform earnings from completed transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
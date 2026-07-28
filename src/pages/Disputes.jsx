import { useState } from "react";
import {
  Search,
  AlertTriangle,
  Eye,
  CheckCircle2,
  XCircle,
  Clock3,
  User,
  Briefcase,
  DollarSign,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import Colors from "../constants/colors";

export default function Disputes() {
  const [search, setSearch] = useState("");

  const [disputes, setDisputes] = useState([
    {
      id: 1001,
      customer: "John Kamau",
      worker: "Mary Wanjiku",
      service: "Electrical Repair",
      amount: "KES 3,500",
      status: "Pending",
      priority: "High",
      reason: "Worker did not arrive after payment was confirmed.",
      date: "Today",
    },
    {
      id: 1002,
      customer: "Brian Otieno",
      worker: "Peter Mwangi",
      service: "Plumbing",
      amount: "KES 2,800",
      status: "Investigating",
      priority: "Medium",
      reason: "Customer claims work was incomplete.",
      date: "Yesterday",
    },
    {
      id: 1003,
      customer: "Sarah Njeri",
      worker: "David Maina",
      service: "House Cleaning",
      amount: "KES 1,500",
      status: "Resolved",
      priority: "Low",
      reason: "Refund requested after cancellation.",
      date: "2 days ago",
    },
  ]);

  const filtered = disputes.filter(
    (item) =>
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.worker.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase())
  );

  const resolveDispute = (id) => {
    setDisputes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Resolved" } : item
      )
    );
  };

  const rejectDispute = (id) => {
    setDisputes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Resolved":
        return {
          backgroundColor: "rgba(90, 153, 76, 0.15)",
          color: Colors.placeholder,
        };

      case "Investigating":
        return {
          backgroundColor: "rgba(15, 34, 54, 0.1)",
          color: Colors.typography,
        };

      case "Rejected":
        return {
          backgroundColor: "rgba(220, 38, 38, 0.12)",
          color: "#DC2626",
        };

      default: // Pending
        return {
          backgroundColor: "rgba(217, 119, 6, 0.15)",
          color: "#B45309",
        };
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-amber-100 text-amber-800";

      default:
        return "bg-emerald-100 text-emerald-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header & Quick Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: Colors.typography }}
            >
              Dispute Management
            </h1>

            <p
              className="mt-1 text-sm font-medium"
              style={{ color: Colors.placeholder }}
            >
              Review and resolve reported customer-worker disputes.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Total Disputes */}
            <div
              className="rounded-2xl px-5 py-3 border shadow-sm min-w-[120px]"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.placeholder }}
              >
                Total
              </p>
              <h2
                className="text-2xl font-bold mt-1"
                style={{ color: Colors.typography }}
              >
                {disputes.length}
              </h2>
            </div>

            {/* Pending */}
            <div
              className="rounded-2xl px-5 py-3 border shadow-sm min-w-[120px]"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Pending
              </p>
              <h2 className="text-2xl font-bold mt-1 text-amber-700">
                {disputes.filter((d) => d.status === "Pending").length}
              </h2>
            </div>

            {/* Resolved */}
            <div
              className="rounded-2xl px-5 py-3 border shadow-sm min-w-[120px]"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: Colors.placeholder }}
              >
                Resolved
              </p>
              <h2
                className="text-2xl font-bold mt-1"
                style={{ color: Colors.background }}
              >
                {disputes.filter((d) => d.status === "Resolved").length}
              </h2>
            </div>
          </div>
        </div>

        {/* Search Bar */}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search disputes by customer, worker, or service..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300/80 outline-none text-sm transition-all"
              style={{
                color: Colors.typography,
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        </div>

        {/* Disputes Table */}
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
                  <th className="px-6 py-4">Dispute</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Worker</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/60">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-black/[0.02]"
                  >
                    {/* Dispute Info */}
                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        <AlertTriangle
                          className="text-amber-600 mt-0.5 shrink-0"
                          size={18}
                        />
                        <div>
                          <h3
                            className="font-semibold text-sm"
                            style={{ color: Colors.typography }}
                          >
                            {item.service}
                          </h3>
                          <p
                            className="text-xs leading-relaxed mt-0.5"
                            style={{ color: Colors.placeholder }}
                          >
                            {item.reason}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Customer */}
                    <td
                      className="px-6 py-4 font-medium"
                      style={{ color: Colors.typography }}
                    >
                      <div className="flex items-center gap-2">
                        <User
                          size={15}
                          style={{ color: Colors.placeholder }}
                        />
                        {item.customer}
                      </div>
                    </td>

                    {/* Worker */}
                    <td
                      className="px-6 py-4 font-medium"
                      style={{ color: Colors.typography }}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase
                          size={15}
                          style={{ color: Colors.placeholder }}
                        />
                        {item.worker}
                      </div>
                    </td>

                    {/* Amount */}
                    <td
                      className="px-6 py-4 font-semibold"
                      style={{ color: Colors.typography }}
                    >
                      <div className="flex items-center gap-1.5">
                        <DollarSign
                          size={15}
                          style={{ color: Colors.placeholder }}
                        />
                        {item.amount}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                        style={badgeColor(item.status)}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Priority Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${priorityColor(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    {/* Date */}
                    <td
                      className="px-6 py-4 text-xs font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {item.date}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          title="View Details"
                          className="p-2 rounded-xl border border-slate-200/80 bg-white transition-all hover:bg-slate-100/80 active:scale-95"
                          style={{ color: Colors.typography }}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => resolveDispute(item.id)}
                          title="Resolve Dispute"
                          className="p-2 rounded-xl border border-slate-200/80 bg-white transition-all hover:bg-emerald-50 active:scale-95"
                          style={{ color: Colors.background }}
                        >
                          <CheckCircle2 size={16} />
                        </button>

                        <button
                          onClick={() => rejectDispute(item.id)}
                          title="Reject Dispute"
                          className="p-2 rounded-xl border border-slate-200/80 bg-white text-red-600 transition-all hover:bg-red-50 active:scale-95"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-12 font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      No disputes found matching your query.
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
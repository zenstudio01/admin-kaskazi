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
      reason:
        "Worker did not arrive after payment was confirmed.",
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
      reason:
        "Customer claims work was incomplete.",
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
      reason:
        "Refund requested after cancellation.",
      date: "2 days ago",
    },
  ]);

  const filtered = disputes.filter(
    (item) =>
      item.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.worker
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.service
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const resolveDispute = (id) => {
    setDisputes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved" }
          : item
      )
    );
  };

  const rejectDispute = (id) => {
    setDisputes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Rejected" }
          : item
      )
    );
  };

  const badgeColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Investigating":
        return "bg-blue-100 text-blue-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <AdminLayout>
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dispute Management
          </h1>

          <p className="text-slate-500 mt-2">
            Review and resolve reported customer-worker disputes.
          </p>
        </div>

        <div className="flex gap-4">

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Disputes
            </p>
            <h2 className="text-3xl font-bold text-orange-500">
              {disputes.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>
            <h2 className="text-3xl font-bold text-red-500">
              {
                disputes.filter(
                  (d) => d.status === "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Resolved
            </p>
            <h2 className="text-3xl font-bold text-green-500">
              {
                disputes.filter(
                  (d) => d.status === "Resolved"
                ).length
              }
            </h2>
          </div>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search disputes..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left">

              <th className="p-5">Dispute</th>
              <th>Customer</th>
              <th>Worker</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-5">

                  <div className="flex items-start gap-3">

                    <AlertTriangle
                      className="text-orange-500 mt-1"
                      size={20}
                    />

                    <div>

                      <h3 className="font-semibold">
                        {item.service}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.reason}
                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <User size={16} />

                    {item.customer}

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <Briefcase size={16} />

                    {item.worker}

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <DollarSign size={16} />

                    {item.amount}

                  </div>

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <Clock3 size={15} />

                    {item.date}

                  </div>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200">
                      <Eye size={18} className="text-blue-600" />
                    </button>

                    <button
                      onClick={() =>
                        resolveDispute(item.id)
                      }
                      className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />
                    </button>

                    <button
                      onClick={() =>
                        rejectDispute(item.id)
                      }
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                    >
                      <XCircle
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
    </AdminLayout>
  );
}
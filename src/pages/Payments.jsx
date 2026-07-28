import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  CreditCard,
  Search,
  CheckCircle,
  XCircle,
  Wallet,
  TrendingUp,
} from "lucide-react";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const response = await api.get(`/admin_payments/`);
      const data = response.data;

      setPayments(data);
      setFilteredPayments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    const filtered = payments.filter(
      (payment) =>
        payment.method?.toLowerCase().includes(search.toLowerCase()) ||
        payment.status?.toLowerCase().includes(search.toLowerCase()) ||
        payment.receipt?.toLowerCase().includes(search.toLowerCase()) ||
        String(payment.job_id).includes(search)
    );

    setFilteredPayments(filtered);
  }, [search, payments]);

  const completedPayments = payments.filter(
    (payment) => payment.status === "completed"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "failed"
  ).length;

  const totalAmount = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.revenue || 0),
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

      case "failed":
        return (
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            Failed
          </span>
        );

      case "pending":
        return (
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
            Pending
          </span>
        );

      default:
        return (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "rgba(15, 34, 54, 0.08)",
              color: Colors.typography,
            }}
          >
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
            Payments Management
          </h1>

          <p
            className="mt-1 text-sm font-medium"
            style={{ color: Colors.placeholder }}
          >
            Monitor all transactions made through Kaskazi.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">
          {/* Total Payments */}
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
                  Total Payments
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {payments.length}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <CreditCard style={{ color: Colors.typography }} size={24} />
              </div>
            </div>
          </div>

          {/* Total Amount */}
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
                  Total Processed
                </p>

                <h2
                  className="text-2xl font-bold mt-2"
                  style={{ color: Colors.background }}
                >
                  KES {totalAmount.toLocaleString()}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(90, 153, 76, 0.12)" }}
              >
                <Wallet style={{ color: Colors.background }} size={24} />
              </div>
            </div>
          </div>

          {/* Platform Revenue */}
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
                  Revenue
                </p>

                <h2
                  className="text-2xl font-bold mt-2"
                  style={{ color: Colors.background }}
                >
                  KES {totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(90, 153, 76, 0.12)" }}
              >
                <TrendingUp style={{ color: Colors.background }} size={24} />
              </div>
            </div>
          </div>

          {/* Successful */}
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
                  Successful
                </p>

                <h2
                  className="text-3xl font-bold mt-2"
                  style={{ color: Colors.typography }}
                >
                  {completedPayments}
                </h2>
              </div>

              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <CheckCircle style={{ color: Colors.typography }} size={24} />
              </div>
            </div>
          </div>

          {/* Failed */}
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
                  Failed
                </p>

                <h2 className="text-3xl font-bold mt-2 text-red-600">
                  {failedPayments}
                </h2>
              </div>

              <div className="bg-red-100 p-3 rounded-xl">
                <XCircle className="text-red-600" size={24} />
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
            Total Money Processed
          </p>

          <h2 className="text-4xl font-bold mt-2">
            KES {totalAmount.toLocaleString()}
          </h2>

          <p className="mt-2 text-sm opacity-80">
            Combined value of all payments processed through the system.
          </p>
        </div>

        {/* Search Input */}
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
              placeholder="Search by method, status, receipt, or Job ID..."
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

        {/* Table */}
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
                  <th className="px-6 py-4">Job ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Receipt</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/60">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition-colors hover:bg-black/[0.02]"
                  >
                    {/* Job ID */}
                    <td
                      className="px-6 py-4 font-semibold"
                      style={{ color: Colors.typography }}
                    >
                      #{payment.job_id}
                    </td>

                    {/* Amount */}
                    <td
                      className="px-6 py-4 font-semibold"
                      style={{ color: Colors.background }}
                    >
                      KES {Number(payment.amount || 0).toLocaleString()}
                    </td>

                    {/* Method */}
                    <td
                      className="px-6 py-4 font-medium"
                      style={{ color: Colors.typography }}
                    >
                      {payment.method}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(payment.status)}
                    </td>

                    {/* Receipt */}
                    <td
                      className="px-6 py-4 text-xs font-mono"
                      style={{ color: Colors.typography }}
                    >
                      {payment.receipt || (
                        <span
                          className="italic font-sans"
                          style={{ color: Colors.placeholder }}
                        >
                          N/A
                        </span>
                      )}
                    </td>

                    {/* Created Date */}
                    <td
                      className="px-6 py-4 text-xs font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      {new Date(payment.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {filteredPayments.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-12 font-medium"
                      style={{ color: Colors.placeholder }}
                    >
                      No payments found matching your search criteria.
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
import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  CheckCircle2,
  MessageSquare,
  UserPlus,
  Briefcase,
  AlertTriangle,
  Filter,
  CornerUpLeft,
  X,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api";
import Colors from "../constants/colors";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Modal State handling
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/get_admin_notifications_dashboard/");
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.total_unread || 0);
    } catch (err) {
      console.error("Error fetching administrative notifications feed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkAsRead = async (id) => {
    // Optimistic UI state updates
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await api.post(`/admin/inquiry/${id}/resolve/`);
    } catch (err) {
      console.error(err);
      fetchData(); // rollback on network error
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await api.post(`/reply_to_user_inquiry/${replyTarget.id}/`, {
        message: replyText,
      });
      setReplyText("");
      setReplyTarget(null);
      fetchData();
      alert("Notification response pushed to client successfully!");
    } catch (err) {
      alert("Could not deliver notification payload to database.");
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.message?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getIcon = (type) => {
    switch (type) {
      case "worker":
        return <UserPlus style={{ color: Colors.typography }} size={22} />;
      case "booking":
        return <Briefcase style={{ color: Colors.typography }} size={22} />;
      case "review":
        return <MessageSquare style={{ color: Colors.background }} size={22} />;
      default:
        return <AlertTriangle className="text-amber-600" size={22} />;
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
        {/* Header & Quick Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: Colors.typography }}
            >
              Notifications
            </h1>
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: Colors.placeholder }}
            >
              Monitor activities happening across Kaskazi.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Total Notifications Card */}
            <div
              className="rounded-2xl px-5 py-3 border shadow-sm flex items-center gap-3.5"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <div
                className="p-2.5 rounded-xl"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.08)" }}
              >
                <Bell style={{ color: Colors.typography }} size={22} />
              </div>
              <div>
                <h3
                  className="font-bold text-lg leading-none"
                  style={{ color: Colors.typography }}
                >
                  {notifications.length}
                </h3>
                <p
                  className="text-xs font-semibold mt-1 uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Total
                </p>
              </div>
            </div>

            {/* Unread Card */}
            <div
              className="rounded-2xl px-5 py-3 border shadow-sm flex items-center gap-3.5"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <div
                className="p-2.5 rounded-xl"
                style={{ backgroundColor: "rgba(90, 153, 76, 0.12)" }}
              >
                <CheckCircle2 style={{ color: Colors.background }} size={22} />
              </div>
              <div>
                <h3
                  className="font-bold text-lg leading-none"
                  style={{ color: Colors.background }}
                >
                  {unreadCount}
                </h3>
                <p
                  className="text-xs font-semibold mt-1 uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  Unread
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="rounded-2xl shadow-sm p-4 border"
          style={{
            backgroundColor: Colors.primary,
            borderColor: "rgba(15, 34, 54, 0.08)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-3.5"
                style={{ color: Colors.placeholder }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300/80 outline-none text-sm transition-all"
                style={{
                  color: Colors.typography,
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative shrink-0">
              <Filter
                size={18}
                className="absolute left-4 top-3.5"
                style={{ color: Colors.placeholder }}
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-11 pr-10 py-2.5 rounded-xl border border-slate-300/80 outline-none bg-white text-sm font-medium transition-all"
                style={{ color: Colors.typography }}
              >
                <option value="all">All Items</option>
                <option value="worker">Workers</option>
                <option value="booking">Bookings</option>
                <option value="review">Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Listing */}
        <div className="space-y-4">
          {filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl shadow-sm p-5 flex justify-between items-start border transition-all ${
                item.read
                  ? "border-slate-200/80 opacity-80"
                  : "border-l-4 border-l-[#5A994C] shadow-md"
              }`}
              style={{
                backgroundColor: Colors.primary,
                borderColor: item.read
                  ? "rgba(15, 34, 54, 0.08)"
                  : undefined,
              }}
            >
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(15, 34, 54, 0.06)" }}
                >
                  {getIcon(item.type)}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3
                      className="font-bold text-base"
                      style={{ color: Colors.typography }}
                    >
                      {item.title}
                    </h3>
                    {!item.read && (
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(90, 153, 76, 0.15)",
                          color: Colors.placeholder,
                        }}
                      >
                        New
                      </span>
                    )}
                  </div>

                  <p
                    className="text-sm mt-1 max-w-2xl leading-relaxed"
                    style={{ color: Colors.typography }}
                  >
                    {item.message}
                  </p>

                  <div
                    className="flex gap-5 mt-2.5 text-xs font-medium"
                    style={{ color: Colors.placeholder }}
                  >
                    <span>From: {item.sender || "System"}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReplyTarget(item)}
                  title="Reply as Notification"
                  className="p-2 rounded-xl border border-slate-200/80 bg-white transition-all hover:bg-slate-100/80 active:scale-95"
                  style={{ color: Colors.typography }}
                >
                  <CornerUpLeft size={18} />
                </button>

                {!item.read && (
                  <button
                    onClick={() => handleMarkAsRead(item.id)}
                    title="Mark as resolved"
                    className="p-2 rounded-xl border border-slate-200/80 bg-white transition-all hover:bg-slate-100/80 active:scale-95"
                    style={{ color: Colors.background }}
                  >
                    <CheckCircle2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div
              className="rounded-2xl p-16 text-center border"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <Bell
                className="mx-auto"
                size={52}
                style={{ color: Colors.placeholder }}
              />
              <h2
                className="mt-4 text-lg font-semibold"
                style={{ color: Colors.typography }}
              >
                No notifications found
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: Colors.placeholder }}
              >
                There are no matching events or alerts at this time.
              </p>
            </div>
          )}
        </div>

        {/* REPLY MODAL OVERLAY */}
        {replyTarget && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div
              className="rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 border"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: Colors.typography }}
                  >
                    Dispatch Notification Reply
                  </h2>
                  <p
                    className="text-xs font-medium mt-1"
                    style={{ color: Colors.placeholder }}
                  >
                    Replying to {replyTarget.sender || "User"} regarding "
                    {replyTarget.title}"
                  </p>
                </div>

                <button
                  onClick={() => setReplyTarget(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSendReply} className="mt-5">
                <textarea
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type message that user sees inside their notifications tray..."
                  className="w-full border border-slate-300/80 rounded-xl p-3 h-32 outline-none focus:ring-2 text-sm leading-relaxed resize-none bg-white"
                  style={{
                    color: Colors.typography,
                  }}
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setReplyTarget(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white text-xs font-semibold transition hover:bg-slate-100"
                    style={{ color: Colors.typography }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-white text-xs font-semibold shadow-sm transition hover:brightness-110 active:scale-[0.98]"
                    style={{ backgroundColor: Colors.typography }}
                  >
                    Send Response
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
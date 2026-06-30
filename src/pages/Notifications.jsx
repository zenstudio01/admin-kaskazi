import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  CheckCircle2,
  Trash2,
  MessageSquare,
  UserPlus,
  Briefcase,
  AlertTriangle,
  Filter,
  CornerUpLeft,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api"; // Your Axios connection point

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
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.total_unread);
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
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    try {
      await api.post(`/admin/inquiry/${id}/resolve/`);
    } catch (err) {
      console.error(err);
      fetchData(); // rollback on network break
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await api.post(`/reply_to_user_inquiry/${replyTarget.id}/`, { message: replyText });
      setReplyText("");
      setReplyTarget(null);
      fetchData(); // Refresh payload
      alert("Notification response pushed to client successfully!");
    } catch (err) {
      alert("Could not deliver notification payload to database.");
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getIcon = (type) => {
    switch (type) {
      case "worker": return <UserPlus className="text-blue-500" size={22} />;
      case "booking": return <Briefcase className="text-orange-500" size={22} />;
      case "review": return <MessageSquare className="text-green-500" size={22} />;
      default: return <AlertTriangle className="text-red-500" size={22} />;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-100 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>
            <p className="text-slate-500 mt-2">Monitor activities happening across Kaskazi.</p>
          </div>

          <div className="flex items-center gap-3 mt-5 md:mt-0">
            <div className="bg-white rounded-xl px-5 py-4 shadow-sm flex items-center gap-3">
              <Bell className="text-orange-500" />
              <div>
                <h3 className="font-bold text-lg">{notifications.length}</h3>
                <p className="text-sm text-slate-500">Total</p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-5 py-4 shadow-sm flex items-center gap-3">
              <CheckCircle2 className="text-green-500" />
              <div>
                <h3 className="font-bold text-lg">{unreadCount}</h3>
                <p className="text-sm text-slate-500">Unread</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="relative">
              <Filter size={18} className="absolute left-4 top-4 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-11 pr-10 py-3 rounded-xl border border-slate-200 outline-none bg-white"
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
              className={`bg-white rounded-2xl shadow-sm p-6 flex justify-between items-start border-l-4 transition ${
                item.read ? "border-slate-200 opacity-75" : "border-orange-500 shadow-md"
              }`}
            >
              <div className="flex gap-4">
                <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center">
                  {getIcon(item.type)}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                    {!item.read && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-semibold">New</span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-2 max-w-2xl">{item.message}</p>
                  <div className="flex gap-6 mt-3 text-sm text-slate-400">
                    <span>From: {item.sender}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex gap-2">
                <button
                  onClick={() => setReplyTarget(item)}
                  title="Reply as Notification"
                  className="text-orange-500 hover:bg-orange-50 p-2 rounded-xl border border-slate-100"
                >
                  <CornerUpLeft size={20} />
                </button>
                {!item.read && (
                  <button
                    onClick={() => handleMarkAsRead(item.id)}
                    className="text-green-600 hover:bg-green-50 p-2 rounded-xl"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* REPLY MODAL OVERLAY */}
        {replyTarget && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <h2 className="text-xl font-bold text-slate-800">Dispatch Notification Reply</h2>
              <p className="text-sm text-slate-400 mt-1">Replying to {replyTarget.sender} regarding "{replyTarget.title}"</p>
              
              <form onSubmit={handleSendReply} className="mt-4">
                <textarea
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type message that client user sees instantly inside their notifications tray..."
                  className="w-full border border-slate-200 rounded-xl p-3 h-32 outline-none focus:border-orange-500 text-slate-700 resize-none"
                />
                
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setReplyTarget(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                  >
                    Send Response
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <Bell className="mx-auto text-slate-300" size={60} />
            <h2 className="mt-4 text-xl font-semibold text-slate-700">No events found</h2>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
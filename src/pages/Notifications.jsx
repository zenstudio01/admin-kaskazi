import { useState } from "react";
import {
  Bell,
  Search,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  MessageSquare,
  UserPlus,
  Briefcase,
  Filter,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Worker Registration",
      message: "John Mwangi has registered as an Electrician.",
      type: "worker",
      read: false,
      time: "2 mins ago",
      sender: "John Mwangi",
    },
    {
      id: 2,
      title: "New Booking",
      message: "A customer booked Jane for Plumbing services.",
      type: "booking",
      read: false,
      time: "10 mins ago",
      sender: "System",
    },
    {
      id: 3,
      title: "New Review",
      message: "A customer left a 5-star review.",
      type: "review",
      read: true,
      time: "1 hour ago",
      sender: "Customer",
    },
    {
      id: 4,
      title: "System Alert",
      message: "Database backup completed successfully.",
      type: "system",
      read: true,
      time: "Yesterday",
      sender: "Server",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const unread = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : item.type === filter;

    return matchesSearch && matchesFilter;
  });

  const getIcon = (type) => {
    switch (type) {
      case "worker":
        return <UserPlus className="text-blue-500" size={22} />;

      case "booking":
        return <Briefcase className="text-orange-500" size={22} />;

      case "review":
        return <MessageSquare className="text-green-500" size={22} />;

      default:
        return (
          <AlertTriangle
            className="text-red-500"
            size={22}
          />
        );
    }
  };

  return (
    <AdminLayout>
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor activities happening across Kaskazi.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-5 md:mt-0">

          <div className="bg-white rounded-xl px-5 py-4 shadow-sm flex items-center gap-3">
            <Bell className="text-orange-500" />

            <div>
              <h3 className="font-bold text-lg">
                {notifications.length}
              </h3>

              <p className="text-sm text-slate-500">
                Total
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl px-5 py-4 shadow-sm flex items-center gap-3">
            <CheckCircle2 className="text-green-500" />

            <div>
              <h3 className="font-bold text-lg">
                {unread}
              </h3>

              <p className="text-sm text-slate-500">
                Unread
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none"
            />

          </div>

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-11 pr-10 py-3 rounded-xl border outline-none bg-white"
            >
              <option value="all">All</option>
              <option value="worker">Workers</option>
              <option value="booking">Bookings</option>
              <option value="review">Reviews</option>
              <option value="system">System</option>
            </select>

          </div>

        </div>

      </div>

      {/* Notifications */}

      <div className="space-y-4">

        {filteredNotifications.map((item) => (

          <div
            key={item.id}
            className={`bg-white rounded-2xl shadow-sm p-6 flex justify-between items-start border-l-4 ${
              item.read
                ? "border-slate-300"
                : "border-orange-500"
            }`}
          >

            <div className="flex gap-4">

              <div className="bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center">
                {getIcon(item.type)}
              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h3 className="font-bold text-lg text-slate-800">
                    {item.title}
                  </h3>

                  {!item.read && (
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}

                </div>

                <p className="text-slate-600 mt-2">
                  {item.message}
                </p>

                <div className="flex gap-6 mt-3 text-sm text-slate-400">
                  <span>From: {item.sender}</span>
                  <span>{item.time}</span>
                </div>

              </div>

            </div>

            <div className="flex gap-3">

              {!item.read && (
                <button
                  onClick={() => markAsRead(item.id)}
                  className="text-green-600 hover:bg-green-50 p-2 rounded-lg"
                >
                  <CheckCircle2 size={20} />
                </button>
              )}

              <button
                onClick={() => deleteNotification(item.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
              >
                <Trash2 size={20} />
              </button>

            </div>

          </div>

        ))}

      </div>

      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Bell
            className="mx-auto text-slate-300"
            size={60}
          />
          <h2 className="mt-4 text-xl font-semibold text-slate-700">
            No notifications found
          </h2>
          <p className="text-slate-500 mt-2">
            There are no notifications matching your search.
          </p>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
import { useMemo, useState, useEffect } from "react";
import {
  Search,
  Shield,
  Clock3,
  User,
  Briefcase,
  AlertTriangle,
  Eye,
  CheckCircle2,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api";
import Colors from "../constants/colors";

export default function ChatMonitoring() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [metrics, setMetrics] = useState({
    activeChats: 0,
    reported: 0,
    totalToday: 0,
  });
  const [loading, setLoading] = useState(true);

  // Load Real-time Data directly from Django DB
  useEffect(() => {
    async function fetchMonitorData() {
      try {
        setLoading(true);
        const response = await api.get("/chat/admin_chat_monitoring_list/");
        setConversations(response.data.conversations || []);
        setMetrics(
          response.data.metrics || { activeChats: 0, reported: 0, totalToday: 0 }
        );

        // Auto select first database item if nothing is focused yet
        if (response.data.conversations?.length > 0) {
          setSelectedChat(response.data.conversations[0].id);
        }
      } catch (err) {
        console.error("Failed to collect monitoring telemetry metrics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMonitorData();
  }, []);

  const filtered = useMemo(() => {
    return conversations.filter(
      (c) =>
        c.client?.toLowerCase().includes(search.toLowerCase()) ||
        c.worker?.toLowerCase().includes(search.toLowerCase()) ||
        c.service?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, conversations]);

  const current = filtered.find((c) => c.id === selectedChat) || filtered[0];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center">
            <div
              className="h-12 w-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-3"
              style={{
                borderColor: Colors.background,
                borderTopColor: "transparent",
              }}
            ></div>
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: Colors.placeholder }}
            >
              Securing remote feed pipelines...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: Colors.typography }}
            >
              Chat Monitoring
            </h1>
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: Colors.placeholder }}
            >
              Monitor active conversations between customers and workers safely in real-time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Active Chats */}
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
                Active Chats
              </p>
              <h2
                className="text-2xl font-bold mt-1"
                style={{ color: Colors.typography }}
              >
                {metrics.activeChats}
              </h2>
            </div>

            {/* Reported */}
            <div
              className="rounded-2xl px-5 py-3 border shadow-sm min-w-[120px]"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider text-red-600"
              >
                Reported
              </p>
              <h2 className="text-2xl font-bold mt-1 text-red-600">
                {metrics.reported}
              </h2>
            </div>

            {/* Total Today */}
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
                Total Today
              </p>
              <h2
                className="text-2xl font-bold mt-1"
                style={{ color: Colors.background }}
              >
                {metrics.totalToday}
              </h2>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column Feed */}
          <div
            className="rounded-2xl shadow-sm overflow-hidden border flex flex-col"
            style={{
              backgroundColor: Colors.primary,
              borderColor: "rgba(15, 34, 54, 0.08)",
            }}
          >
            {/* Search Input */}
            <div className="p-4 border-b border-slate-200/80 bg-white">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3.5 top-3"
                  style={{ color: Colors.placeholder }}
                />
                <input
                  placeholder="Search conversation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-200/80 rounded-xl py-2 pl-10 pr-4 outline-none text-sm transition-all"
                  style={{
                    color: Colors.typography,
                    backgroundColor: Colors.primary,
                  }}
                />
              </div>
            </div>

            {/* Conversations List Feed */}
            <div className="h-[650px] overflow-y-auto divide-y divide-slate-200/60">
              {filtered.length === 0 ? (
                <p
                  className="text-center py-12 text-xs font-medium uppercase tracking-wider"
                  style={{ color: Colors.placeholder }}
                >
                  No active discussions found.
                </p>
              ) : (
                filtered.map((chat) => {
                  const isSelected = selectedChat === chat.id;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`w-full text-left p-4 transition-all ${
                        isSelected
                          ? "border-r-4"
                          : "hover:bg-black/[0.02]"
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? "rgba(15, 34, 54, 0.05)"
                          : "transparent",
                        borderRightColor: isSelected
                          ? Colors.typography
                          : "transparent",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3
                            className="font-semibold text-sm"
                            style={{ color: Colors.typography }}
                          >
                            {chat.client}
                          </h3>
                          <p
                            className="text-xs font-medium"
                            style={{ color: Colors.placeholder }}
                          >
                            Worker: {chat.worker}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <span
                            className="text-white text-[10px] px-2 py-0.5 rounded-full font-bold"
                            style={{ backgroundColor: Colors.typography }}
                          >
                            {chat.unread}
                          </span>
                        )}
                      </div>

                      <p
                        className="text-xs mt-2 truncate font-normal"
                        style={{ color: Colors.typography }}
                      >
                        {chat.lastMessage}
                      </p>

                      <div className="flex justify-between items-center mt-3">
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: Colors.placeholder }}
                        >
                          {chat.lastSeen}
                        </span>

                        {chat.reported ? (
                          <span className="text-red-600 flex items-center gap-1 text-[11px] font-semibold">
                            <AlertTriangle size={13} /> Reported
                          </span>
                        ) : (
                          <span
                            className="flex items-center gap-1 text-[11px] font-semibold"
                            style={{ color: Colors.background }}
                          >
                            <CheckCircle2 size={13} /> Normal
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Message Logs */}
          {current ? (
            <div
              className="lg:col-span-2 rounded-2xl shadow-sm border flex flex-col overflow-hidden"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              {/* Active Conversation Header */}
              <div className="border-b border-slate-200/80 p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2
                    className="font-bold text-lg"
                    style={{ color: Colors.typography }}
                  >
                    {current.client}
                  </h2>
                  <div
                    className="flex flex-wrap gap-4 mt-1.5 text-xs font-medium"
                    style={{ color: Colors.placeholder }}
                  >
                    <span className="flex items-center gap-1.5">
                      <User size={14} /> Customer
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} /> {current.worker}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={14} /> {current.service}
                    </span>
                  </div>
                </div>

                <button
                  className="px-4 py-2 rounded-xl font-semibold text-xs text-white shadow-sm transition hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
                  style={{ backgroundColor: Colors.typography }}
                >
                  <Eye size={16} /> View Booking
                </button>
              </div>

              {/* Messages Body Feed */}
              <div
                className="flex-1 p-6 h-[520px] overflow-y-auto"
                style={{ backgroundColor: "rgba(15, 34, 54, 0.02)" }}
              >
                {current.messages?.length === 0 ? (
                  <p
                    className="text-center py-12 text-xs font-medium"
                    style={{ color: Colors.placeholder }}
                  >
                    Empty message stream logs.
                  </p>
                ) : (
                  current.messages?.map((msg) => {
                    const isClient = msg.sender === "client";
                    return (
                      <div
                        key={msg.id}
                        className={`mb-4 flex ${
                          isClient ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-md px-4 py-3 rounded-2xl text-sm shadow-xs border ${
                            isClient
                              ? "bg-white border-slate-200/80 rounded-tl-none"
                              : "text-white rounded-tr-none border-transparent"
                          }`}
                          style={{
                            backgroundColor: isClient
                              ? "#ffffff"
                              : Colors.typography,
                            color: isClient ? Colors.typography : "#ffffff",
                          }}
                        >
                          <p className="leading-relaxed">{msg.text}</p>
                          <p
                            className={`text-[10px] mt-1.5 text-right font-medium ${
                              isClient ? "text-slate-400" : "opacity-75"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Control Panel */}
              <div className="border-t border-slate-200/80 p-4 bg-white flex flex-wrap justify-between items-center gap-3">
                <div className="flex gap-2">
                  <button className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 font-semibold text-xs text-white transition shadow-xs">
                    Flag Conversation
                  </button>

                  <button
                    className="px-4 py-2.5 rounded-xl border border-slate-300/80 bg-white font-semibold text-xs transition hover:bg-slate-100"
                    style={{ color: Colors.typography }}
                  >
                    Export Chat
                  </button>
                </div>

                <button
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white transition shadow-xs flex items-center gap-2"
                  style={{ backgroundColor: Colors.placeholder }}
                >
                  <Shield size={16} /> Admin Notes
                </button>
              </div>
            </div>
          ) : (
            <div
              className="lg:col-span-2 rounded-2xl shadow-sm border flex items-center justify-center p-12 text-center"
              style={{
                backgroundColor: Colors.primary,
                borderColor: "rgba(15, 34, 54, 0.08)",
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: Colors.placeholder }}
              >
                Select a live thread to monitor from the dashboard catalog feed.
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
import { useMemo, useState, useEffect } from "react";
import {
  Search,
  MessageCircle,
  Shield,
  Clock3,
  User,
  Briefcase,
  AlertTriangle,
  Eye,
  CheckCircle2,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/api"; // Ensure you point to your central Axios configuration instance

export default function ChatMonitoring() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [metrics, setMetrics] = useState({ activeChats: 0, reported: 0, totalToday: 0 });
  const [loading, setLoading] = useState(true);

  // Load Real-time Data directly from Django DB
  useEffect(() => {
    async function fetchMonitorData() {
      try {
        setLoading(true);
        const response = await api.get("/chat/admin_chat_monitoring_list/");
        setConversations(response.data.conversations);
        setMetrics(response.data.metrics);
        
        // Auto select first database item if nothing is focused yet
        if (response.data.conversations.length > 0) {
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
        c.client.toLowerCase().includes(search.toLowerCase()) ||
        c.worker.toLowerCase().includes(search.toLowerCase()) ||
        c.service.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, conversations]);

  const current = filtered.find((c) => c.id === selectedChat) || filtered[0];

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Securing remote feed pipelines...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Chat Monitoring</h1>
            <p className="text-slate-500 mt-2">
              Monitor active conversations between customers and workers safely in real-time.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white rounded-xl shadow-sm px-5 py-4">
              <p className="text-sm text-slate-500 font-medium">Active Chats</p>
              <h2 className="text-3xl font-bold text-orange-500">{metrics.activeChats}</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-5 py-4">
              <p className="text-sm text-slate-500 font-medium">Reported</p>
              <h2 className="text-3xl font-bold text-red-500">{metrics.reported}</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-5 py-4">
              <p className="text-sm text-slate-500 font-medium">Total Today</p>
              <h2 className="text-3xl font-bold text-green-500">{metrics.totalToday}</h2>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column Feed */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-4 text-slate-400" />
                <input
                  placeholder="Search conversation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl py-3 pl-11 pr-4 outline-none transition"
                />
              </div>
            </div>

            <div className="h-[700px] overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-slate-400 mt-12 text-sm">No active discussions found.</p>
              ) : (
                filtered.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full text-left p-5 border-b hover:bg-orange-50/50 transition ${
                      selectedChat === chat.id ? "bg-orange-50 border-r-4 border-r-orange-500" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">{chat.client}</h3>
                        <p className="text-sm text-slate-500">{chat.worker}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 h-5 rounded-full flex items-center justify-center font-bold">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-2 truncate font-normal">
                      {chat.lastMessage}
                    </p>
                    <div className="flex justify-between mt-3">
                      <span className="text-xs text-slate-400">{chat.lastSeen}</span>
                      {chat.reported ? (
                        <span className="text-red-500 flex items-center gap-1 text-xs font-medium">
                          <AlertTriangle size={14} /> Reported
                        </span>
                      ) : (
                        <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
                          <CheckCircle2 size={14} /> Normal
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right Message Logs */}
          {current ? (
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm flex flex-col">
              <div className="border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-xl text-slate-800">{current.client}</h2>
                  <div className="flex gap-6 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-slate-400" /> Customer
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase size={16} className="text-slate-400" /> {current.worker}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 size={16} className="text-slate-400" /> {current.service}
                    </span>
                  </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
                  <Eye size={18} /> View Booking
                </button>
              </div>

              {/* Messages Body Scroll */}
              <div className="flex-1 p-6 bg-slate-50 h-[560px] overflow-y-auto">
                {current.messages.length === 0 ? (
                  <p className="text-center text-slate-400 py-12">Empty message stream logs.</p>
                ) : (
                  current.messages.map((msg) => (
                    <div key={msg.id} className={`mb-5 flex ${msg.sender === "client" ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-md px-5 py-3 rounded-2xl shadow-xs ${
                        msg.sender === "client" ? "bg-white text-slate-800 rounded-tl-none border border-slate-100" : "bg-orange-500 text-white rounded-tr-none"
                      }`}>
                        <p className="text-[15px] leading-relaxed">{msg.text}</p>
                        <p className={`text-[10px] mt-1.5 text-right ${msg.sender === "client" ? "text-slate-400" : "text-orange-100"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Actions */}
              <div className="border-t p-5 flex justify-between bg-white rounded-b-2xl">
                <div className="flex gap-3">
                  <button className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 font-medium text-white transition shadow-xs">
                    Flag Conversation
                  </button>
                  <button className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-medium text-slate-700 transition">
                    Export Chat
                  </button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition shadow-xs">
                  <Shield size={18} /> Admin Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm flex items-center justify-center p-12">
              <p className="text-slate-400 font-medium">Select a live thread to monitor from the dashboard catalog feed.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
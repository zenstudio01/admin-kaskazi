import { useMemo, useState } from "react";
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

export default function ChatMonitoring() {
  const [search, setSearch] = useState("");

  const [selectedChat, setSelectedChat] = useState(1);

  const conversations = [
    {
      id: 1,
      client: "John Kamau",
      worker: "Mary Wanjiku",
      service: "Electrician",
      status: "Active",
      reported: false,
      lastMessage: "I'll arrive at 2PM.",
      lastSeen: "2 mins ago",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Hello, are you available today?",
          time: "10:12 AM",
        },
        {
          id: 2,
          sender: "worker",
          text: "Yes, I am.",
          time: "10:14 AM",
        },
        {
          id: 3,
          sender: "client",
          text: "I'll need electrical wiring fixed.",
          time: "10:15 AM",
        },
        {
          id: 4,
          sender: "worker",
          text: "I'll arrive at 2PM.",
          time: "10:20 AM",
        },
      ],
    },

    {
      id: 2,
      client: "Brian Otieno",
      worker: "Peter Mwangi",
      service: "Plumber",
      status: "Completed",
      reported: true,
      lastMessage: "This worker never arrived.",
      lastSeen: "Yesterday",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "client",
          text: "Where are you?",
          time: "3:20 PM",
        },
        {
          id: 2,
          sender: "worker",
          text: "I'm on the way.",
          time: "3:30 PM",
        },
        {
          id: 3,
          sender: "client",
          text: "This worker never arrived.",
          time: "5:10 PM",
        },
      ],
    },
  ];

  const filtered = useMemo(() => {
    return conversations.filter(
      (c) =>
        c.client.toLowerCase().includes(search.toLowerCase()) ||
        c.worker.toLowerCase().includes(search.toLowerCase()) ||
        c.service.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const current =
    filtered.find((c) => c.id === selectedChat) || filtered[0];

  return (
    <AdminLayout>
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Chat Monitoring
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor conversations between customers and workers.
          </p>

        </div>

        <div className="flex gap-4">

          <div className="bg-white rounded-xl shadow-sm px-5 py-4">
            <p className="text-sm text-slate-500">
              Active Chats
            </p>
            <h2 className="text-3xl font-bold text-orange-500">
              36
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm px-5 py-4">
            <p className="text-sm text-slate-500">
              Reported
            </p>
            <h2 className="text-3xl font-bold text-red-500">
              4
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm px-5 py-4">
            <p className="text-sm text-slate-500">
              Total Today
            </p>
            <h2 className="text-3xl font-bold text-green-500">
              215
            </h2>
          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <div className="p-5 border-b">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />

              <input
                placeholder="Search conversation..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none"
              />

            </div>

          </div>

          <div className="h-[700px] overflow-y-auto">

            {filtered.map((chat) => (

              <button
                key={chat.id}
                onClick={() =>
                  setSelectedChat(chat.id)
                }
                className={`w-full text-left p-5 border-b hover:bg-orange-50 transition ${
                  selectedChat === chat.id
                    ? "bg-orange-50"
                    : ""
                }`}
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-semibold">
                      {chat.client}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {chat.worker}
                    </p>

                  </div>

                  {chat.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {chat.unread}
                    </span>
                  )}

                </div>

                <p className="text-sm text-slate-500 mt-2 truncate">
                  {chat.lastMessage}
                </p>

                <div className="flex justify-between mt-3">

                  <span className="text-xs text-slate-400">
                    {chat.lastSeen}
                  </span>

                  {chat.reported ? (
                    <span className="text-red-500 flex items-center gap-1 text-xs">
                      <AlertTriangle size={14} />
                      Reported
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center gap-1 text-xs">
                      <CheckCircle2 size={14} />
                      Normal
                    </span>
                  )}

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Right */}

        {current && (

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm flex flex-col">

            {/* Top */}

            <div className="border-b p-6 flex justify-between items-center">

              <div>

                <h2 className="font-bold text-xl">
                  {current.client}
                </h2>

                <div className="flex gap-6 mt-2 text-sm text-slate-500">

                  <span className="flex items-center gap-2">
                    <User size={16} />
                    Customer
                  </span>

                  <span className="flex items-center gap-2">
                    <Briefcase size={16} />
                    {current.worker}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {current.service}
                  </span>

                </div>

              </div>

              <button className="bg-orange-500 text-white px-5 py-3 rounded-xl flex items-center gap-2">

                <Eye size={18} />

                View Booking

              </button>

            </div>

            {/* Messages */}

            <div className="flex-1 p-6 bg-slate-50 overflow-y-auto">

              {current.messages.map((msg) => (

                <div
                  key={msg.id}
                  className={`mb-5 flex ${
                    msg.sender === "client"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >

                  <div
                    className={`max-w-md px-5 py-3 rounded-2xl ${
                      msg.sender === "client"
                        ? "bg-white"
                        : "bg-orange-500 text-white"
                    }`}
                  >

                    <p>{msg.text}</p>

                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === "client"
                          ? "text-slate-400"
                          : "text-orange-100"
                      }`}
                    >
                      {msg.time}
                    </p>

                  </div>

                </div>

              ))}

            </div>

            {/* Footer */}

            <div className="border-t p-5 flex justify-between">

              <div className="flex gap-3">

                <button className="px-5 py-3 rounded-xl bg-red-500 text-white">
                  Flag Conversation
                </button>

                <button className="px-5 py-3 rounded-xl bg-slate-200">
                  Export Chat
                </button>

              </div>

              <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">

                <Shield size={18} />

                Admin Notes

              </button>

            </div>

          </div>

        )}

      </div>
    </div>
    </AdminLayout>
  );
}
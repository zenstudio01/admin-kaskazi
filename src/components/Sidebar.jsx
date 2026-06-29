import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  Star,
  Activity,
  LogOut,
  MessageCircle,
  Bell,
  ShieldAlert
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: Users,
      path: "/users",
    },
    {
      name: "Jobs",
      icon: Briefcase,
      path: "/jobs",
    },
    {
      name: "Payments",
      icon: CreditCard,
      path: "/payments",
    },
    {
      name: "Reviews",
      icon: Star,
      path: "/reviews",
    },
    {
      name: "Activity",
      icon: Activity,
      path: "/activity",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      name: "Chat Monitoring",
      icon: MessageCircle,
      path: "/chat-monitoring",
    },
    {
      name: "Disputes",
      icon: ShieldAlert,
      path: "/disputes",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token"); 
    localStorage.removeItem("refresh_token"); 
    localStorage.removeItem("admin"); 
    navigate("/");
  };

  return (
    <aside className="w-72 bg-[#062E5B] text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">

          <div>
            <h1 className="font-bold text-2xl">KASKAZI</h1>
            <p className="text-xs text-slate-300">
              Skilled workers near you
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#F57C00] text-white"
                        : "hover:bg-white/10"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
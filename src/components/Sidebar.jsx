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
import Colors from "../constants/colors";
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
      name: "Workers",
      icon: Users,
      path: "/workers",
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
    <aside 
      className="w-72 flex flex-col shadow-xl min-h-screen"
      style={{ backgroundColor: Colors.typography, color: Colors.primary }}
    >
      {/* Header / Logo */}
      <div 
        className="p-6 border-b"
        style={{ borderColor: "rgba(247, 248, 247, 0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-bold text-2xl tracking-wide">KASKAZI</h1>
            <p className="text-xs opacity-70 mt-0.5">
              Skilled workers near you
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? Colors.background : "transparent",
                    color: Colors.primary,
                  })}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "shadow-md font-semibold"
                        : "hover:bg-white/10 opacity-80 hover:opacity-100"
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
      <div 
        className="p-4 border-t"
        style={{ borderColor: "rgba(247, 248, 247, 0.1)" }}
      >
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 opacity-80 hover:opacity-100"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
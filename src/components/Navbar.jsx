import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Colors from "../constants/colors";

export default function Navbar() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("admin");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleNotifications = () => {
    navigate("/notifications");
  };

  return (
    <header 
      className="px-6 py-4 flex items-center justify-between border-b shadow-sm"
      style={{ 
        backgroundColor: Colors.primary, 
        borderColor: "rgba(15, 34, 54, 0.1)" 
      }}
    >
      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-3 transition-colors"
          style={{ color: Colors.placeholder }}
        />

        <input
          type="text"
          placeholder="Search users, jobs, payments..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300/80 focus:outline-none transition-all shadow-sm"
          style={{
            color: Colors.typography,
            backgroundColor: "#ffffff",
          }}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button 
          onClick={handleNotifications} 
          className="relative p-2 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Notifications"
        >
          <Bell
            size={22}
            style={{ color: Colors.typography }}
          />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-300/60">
          <UserCircle2
            size={38}
            style={{ color: Colors.typography }}
          />

          <div>
            <h4 
              className="font-semibold text-sm leading-tight"
              style={{ color: Colors.typography }}
            >
              {user?.user_name || "Admin"}
            </h4>

            <p 
              className="text-xs mt-0.5"
              style={{ color: Colors.placeholder }}
            >
              Super Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
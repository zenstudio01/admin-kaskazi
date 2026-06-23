import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search users, jobs, payments..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F57C00]"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell
            size={22}
            className="text-slate-600"
          />

          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle2
            size={40}
            className="text-[#062E5B]"
          />

          <div>
            <h4 className="font-semibold text-slate-800">
              Admin
            </h4>

            <p className="text-xs text-slate-500">
              Super Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}